import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { hsRequest, logUpstreamError, toPublicError } from "@/lib/healthsherpa";
import { isUsableEffectiveDate, planYearFor, defaultEffectiveDate } from "@/lib/acaPlanYear";
import { recordEnrollmentSession } from "@/lib/leadSink";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { brand } from "@/lib/brand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/aca/enrollment-sessions
 *
 * Hands a shopper off to HealthSherpa to complete their own enrollment, with
 * EveryHealth credited as the agent.
 *
 * Why this endpoint needs more care than the quote route:
 *
 *   1. It rejects unsupported fields ANYWHERE in the body with a 400. We
 *      therefore build the payload from an explicit allowlist and never pass
 *      through anything the browser sent.
 *   2. Every field inside `context` is required — product, exchange,
 *      coverage_family, coverage_type, plan_year, flow, locale.
 *   3. An applicant may carry `age` OR `date_of_birth`, never both. We send
 *      age, which is all the quoter collects.
 *   4. At most one primary and one spouse. Dependents can be many.
 *   5. `campaign` is only legal when flow is self_service.
 *   6. Address-level fields (address, city) are rejected inside `location`.
 *   7. `external_id` is echoed back and forwarded for CRM correlation, and
 *      must not contain PII — so it is a generated UUID, nothing else.
 */

const FLOWS = new Set(["self_service", "agent_assisted"]);
const RELATIONSHIPS = new Set(["primary", "spouse", "dependent"]);
const MAX_APPLICANTS = 12;

function isInt(value, min, max) {
  return Number.isInteger(value) && value >= min && value <= max;
}

function buildSessionRequest(input) {
  const errors = {};

  const flow = FLOWS.has(input?.flow) ? input.flow : "self_service";

  const zip = String(input?.zip_code ?? "").trim();
  const fips = String(input?.fips_code ?? "").trim();
  const state = String(input?.state ?? "").trim().toUpperCase();
  const planId = String(input?.plan_id ?? "").trim();

  if (zip && !/^\d{5}$/.test(zip)) {
    errors.zip_code = "ZIP code must be five digits.";
  }

  if (fips && !/^\d{5}$/.test(fips)) {
    errors.fips_code = "County code must be five digits.";
  }

  if (state && !/^[A-Z]{2}$/.test(state)) {
    errors.state = "State must be a two-letter code.";
  }

  // The endpoint requires at least one of location.state or a top-level
  // plan_id. Without either it is a 400, so catch it here.
  if (!state && !planId) {
    errors.plan_id = "We need either a plan or a state to start enrollment.";
  }

  const effectiveDate = isUsableEffectiveDate(input?.effective_date)
    ? input.effective_date
    : defaultEffectiveDate();

  const applicantsInput = Array.isArray(input?.applicants) ? input.applicants : [];
  const applicants = [];
  let primaryCount = 0;
  let spouseCount = 0;

  applicantsInput.slice(0, MAX_APPLICANTS).forEach((person, index) => {
    const age = Number(person?.age);
    const relationship = String(person?.relationship ?? "").trim();

    if (!isInt(age, 0, 130)) {
      errors[`applicants[${index}].age`] = "Enter an age between 0 and 130.";
      return;
    }

    if (!RELATIONSHIPS.has(relationship)) {
      errors[`applicants[${index}].relationship`] = "Select how this person is related.";
      return;
    }

    if (relationship === "primary") primaryCount += 1;
    if (relationship === "spouse") spouseCount += 1;

    // age only — sending date_of_birth alongside it is a 400.
    applicants.push({
      relationship,
      age,
      uses_tobacco: person?.uses_tobacco === true,
    });
  });

  if (applicants.length === 0) {
    errors.applicants = "Add at least one person before enrolling.";
  }

  if (primaryCount !== 1) {
    errors.applicants = "Exactly one person must be the primary applicant.";
  }

  if (spouseCount > 1) {
    errors.applicants = "Only one spouse can be included.";
  }

  // Contact identity. Required for agent_assisted, since the whole point of
  // that flow is an agent picking the lead up and calling them. Never sent on
  // self_service — the shopper enters their own details on HealthSherpa.
  let client = null;

  if (flow === "agent_assisted") {
    const firstName = String(input?.client?.first_name ?? "").trim();
    const lastName = String(input?.client?.last_name ?? "").trim();
    const email = String(input?.client?.email ?? "").trim();
    const phone = String(input?.client?.phone_number ?? "").replace(/\D/g, "");

    if (firstName.length < 1 || firstName.length > 60) {
      errors["client.first_name"] = "Enter a first name.";
    }

    if (lastName.length < 1 || lastName.length > 60) {
      errors["client.last_name"] = "Enter a last name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors["client.email"] = "Enter a valid email address.";
    }

    if (phone.length < 10 || phone.length > 11) {
      errors["client.phone_number"] = "Enter a 10-digit phone number.";
    }

    if (!errors["client.first_name"] && !errors["client.last_name"]) {
      client = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone,
      };
    }
  }

  const householdSize = Number(input?.household_size ?? applicants.length);

  if (!isInt(householdSize, 1, 20)) {
    errors.household_size = "Household size must be between 1 and 20.";
  }

  let annualIncome = null;

  if (input?.annual_income !== undefined && input?.annual_income !== null && input?.annual_income !== "") {
    const parsed = Number(input.annual_income);

    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 10_000_000) {
      errors.annual_income = "Enter a valid household income.";
    } else {
      annualIncome = Math.round(parsed);
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Not PII, echoed back to us, and the join key for policy-status readback
  // later. Keep it opaque.
  const sessionId = randomUUID();
  const externalId = `everyhealth-quoter-${sessionId}`;

  const body = {
    external_id: externalId,
    context: {
      product: "aca",
      exchange: "on_exchange",
      coverage_family: "medical",
      coverage_type: "medical",
      plan_year: planYearFor(effectiveDate),
      flow,
      locale: "en-US",
    },
    household: {
      household_size: householdSize,
      ...(annualIncome !== null ? { annual_income: annualIncome } : {}),
      applicants,
    },
  };

  if (client) {
    body.client = client;
  }

  if (planId) {
    body.plan_id = planId;
  }

  // location accepts zip_code, fips_code and state ONLY. Address-level
  // fields are rejected outright.
  const location = {};
  if (zip) location.zip_code = zip;
  if (fips) location.fips_code = fips;
  if (state) location.state = state;

  if (Object.keys(location).length > 0) {
    body.location = location;
  }

  return { body, sessionId, externalId, flow, client };
}

export async function POST(request) {
  const limited = rateLimit(`enroll:${clientKey(request)}`, {
    limit: 10,
    windowMs: 60_000,
  });

  if (!limited.ok) {
    return NextResponse.json(
      {
        error: {
          code: "rate_limited",
          message: "Too many attempts. Wait a moment and try again.",
        },
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  let input;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_request", message: "Request body must be JSON." } },
      { status: 400 }
    );
  }

  const { body, sessionId, externalId, flow, client, errors } = buildSessionRequest(input);

  if (errors) {
    return NextResponse.json(
      {
        error: {
          code: "invalid_request",
          message: "We could not start enrollment with those details.",
          details: errors,
        },
      },
      { status: 400 }
    );
  }

  try {
    const payload = await hsRequest("/v1/enrollment-sessions", {
      method: "POST",
      body,
      // Guards against a double-click creating two sessions. Keys are unique
      // within a 24-hour window upstream.
      headers: { "Idempotency-Key": sessionId },
    });

    const shoppingUrl = payload?.links?.shopping_url ?? null;
    const clientApplyUrl = payload?.links?.client_apply_url ?? null;

    if (!clientApplyUrl && !shoppingUrl) {
      throw new Error("Enrollment session returned no links");
    }

    const resolvedExternalId = payload?.external_id ?? externalId;

    // Persist the correlation. external_id comes back on policy-status
    // application rows, so this row is what later answers "which quoter
    // sessions became real enrollments". Never throws.
    await recordEnrollmentSession({
      externalId: resolvedExternalId,
      flow,
      client,
      zipCode: body.location?.zip_code ?? null,
      fipsCode: body.location?.fips_code ?? null,
      state: body.location?.state ?? null,
      planId: body.plan_id ?? null,
      planYear: body.context.plan_year,
      householdSize: body.household.household_size,
      annualIncome: body.household.annual_income ?? null,
      applicantAges: body.household.applicants.map((person) => person.age),
      agentUrl: flow === "agent_assisted" ? clientApplyUrl ?? shoppingUrl : null,
    });

    // agent_assisted links open a signed-in agent session, so they must not
    // reach the shopper's browser. They go to the lead sink for an agent to
    // pick up; the shopper just gets an acknowledgement.
    if (flow === "agent_assisted") {
      return NextResponse.json(
        { externalId: resolvedExternalId, flow, handoff: "agent" },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      {
        externalId: resolvedExternalId,
        flow,
        shoppingUrl,
        clientApplyUrl,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    logUpstreamError("enrollment-sessions", error);

    // A 403 here is flow-scoped: the key is fine for quoting but the
    // enrollment setup is not in the state this flow needs. Worth its own
    // message so it is not mistaken for a general outage.
    if (error?.status === 403) {
      return NextResponse.json(
        {
          error: {
            code: "enrollment_unavailable",
            message:
              `We could not start online enrollment just now. Call ${brand.phoneDisplay} and a licensed agent can enroll you directly.`,
          },
        },
        { status: 503 }
      );
    }

    const { status, body: errorBody } = toPublicError(error);

    return NextResponse.json(errorBody, { status });
  }
}
