import { NextResponse } from "next/server";

import {
  defaultEffectiveDate,
  isUsableEffectiveDate,
  planYearFor,
} from "@/lib/acaPlanYear";
import { toBoolean, toNumber, toText } from "@/lib/coerce";
import { hsRequest, logUpstreamError, toPublicError } from "@/lib/healthsherpa";
import { clientKey, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/aca/quotes
 *
 * The browser never sends a HealthSherpa payload. It sends plain values, we
 * validate every one of them, and we build the upstream request here. That is
 * deliberate: if we forwarded the client body we would be letting anyone set
 * page.size to 500 and turn our key into a free bulk plan-data endpoint.
 */

const RELATIONSHIPS = new Set(["primary", "spouse", "dependent"]);
const METAL_LEVELS = new Set([
  "bronze",
  "expanded_bronze",
  "silver",
  "gold",
  "platinum",
  "catastrophic",
]);
const PLAN_TYPES = new Set(["hmo", "ppo", "epo", "pos", "indemnity"]);
const SORT_FIELDS = new Set(["premium", "deductible", "moop"]);

const MAX_APPLICANTS = 12;
const MAX_PAGE_SIZE = 50;

function isBool(value) {
  return value === true || value === false;
}

function isInt(value, min, max) {
  return Number.isInteger(value) && value >= min && value <= max;
}

/**
 * Validate the browser payload and return the HealthSherpa request body.
 * Returns { errors } instead of throwing so we can report every problem at
 * once rather than making the consumer discover them one at a time.
 */
function buildQuoteRequest(input) {
  const errors = {};

  const zip = String(input?.zip_code ?? "").trim();
  const fips = String(input?.fips_code ?? "").trim();
  const state = String(input?.state ?? "").trim().toUpperCase();

  if (!/^\d{5}$/.test(zip)) {
    errors.zip_code = "Enter a five-digit ZIP code.";
  }

  if (!/^\d{5}$/.test(fips)) {
    errors.fips_code = "Select a county before requesting quotes.";
  }

  if (state && !/^[A-Z]{2}$/.test(state)) {
    errors.state = "State must be a two-letter code.";
  }

  const applicantsInput = Array.isArray(input?.applicants) ? input.applicants : [];

  if (applicantsInput.length === 0) {
    errors.applicants = "Add at least one person to quote.";
  } else if (applicantsInput.length > MAX_APPLICANTS) {
    errors.applicants = `Quotes are limited to ${MAX_APPLICANTS} people.`;
  }

  const applicants = [];
  let primaryCount = 0;

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

    if (relationship === "primary") {
      primaryCount += 1;
    }

    applicants.push({
      member_id: `applicant-${index + 1}`,
      age,
      relationship,
      uses_tobacco: isBool(person?.uses_tobacco) ? person.uses_tobacco : false,
      ...(isBool(person?.pregnant) ? { pregnant: person.pregnant } : {}),
    });
  });

  if (applicants.length > 0 && primaryCount !== 1) {
    errors.applicants = "Exactly one person must be marked as the primary applicant.";
  }

  const householdSize = Number(input?.household_size ?? applicants.length);

  if (!isInt(householdSize, 1, 20)) {
    errors.household_size = "Household size must be between 1 and 20.";
  } else if (householdSize < applicants.length) {
    errors.household_size = "Household size cannot be smaller than the number of people quoted.";
  }

  // Income is optional for a quote, but without it there is no subsidy
  // estimate, so the UI should push hard for it.
  let annualIncome = null;

  if (input?.annual_income !== undefined && input?.annual_income !== null && input?.annual_income !== "") {
    const parsed = Number(input.annual_income);

    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 10_000_000) {
      errors.annual_income = "Enter a household income between $0 and $10,000,000.";
    } else {
      annualIncome = Math.round(parsed);
    }
  }

  const effectiveDate = isUsableEffectiveDate(input?.effective_date)
    ? input.effective_date
    : defaultEffectiveDate();

  if (input?.effective_date && !isUsableEffectiveDate(input.effective_date)) {
    errors.effective_date = "Choose a coverage start date within the next two years.";
  }

  const metalLevels = Array.isArray(input?.metal_levels)
    ? input.metal_levels.filter((level) => METAL_LEVELS.has(level))
    : [];

  const planTypes = Array.isArray(input?.plan_types)
    ? input.plan_types.filter((type) => PLAN_TYPES.has(type))
    : [];

  const sortField = SORT_FIELDS.has(input?.sort_field) ? input.sort_field : "premium";
  const sortDirection = input?.sort_direction === "desc" ? "desc" : "asc";

  const pageNumber = isInt(Number(input?.page_number), 1, 50) ? Number(input.page_number) : 1;
  const requestedSize = Number(input?.page_size);
  const pageSize = isInt(requestedSize, 1, MAX_PAGE_SIZE) ? requestedSize : 20;

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const body = {
    context: {
      product: "aca",
      exchange: "on_exchange",
      coverage_family: "medical",
      coverage_type: "medical",
      plan_year: planYearFor(effectiveDate),
    },
    location: {
      zip_code: zip,
      fips_code: fips,
      ...(state ? { state } : {}),
    },
    household: {
      household_size: householdSize,
      effective_date: effectiveDate,
      ...(annualIncome !== null ? { annual_income: annualIncome } : {}),
      applicants,
    },
    sort: { field: sortField, direction: sortDirection },
    page: { number: pageNumber, size: pageSize },
  };

  if (metalLevels.length > 0 || planTypes.length > 0) {
    body.filters = {
      medical: {
        ...(metalLevels.length > 0 ? { metal_levels: metalLevels } : {}),
        ...(planTypes.length > 0 ? { plan_types: planTypes } : {}),
      },
    };
  }

  return { body, meta: { effectiveDate, sortField, sortDirection } };
}

/**
 * Flatten a plan into what the cards actually render.
 *
 * Every numeric goes through toNumber() rather than a bare Number.isFinite()
 * check, because HealthSherpa may send premiums and deductibles as strings.
 * A strict check turns "844.15" into null and quietly strips the pricing out
 * of every card while the rest of the plan looks fine.
 */
function shapePlan(plan) {
  const pricing = plan?.pricing ?? {};
  const details = plan?.details ?? {};
  const documents = plan?.documents ?? {};
  const network = plan?.network ?? {};

  const gross = toNumber(pricing.gross_premium);
  const net = toNumber(pricing.net_premium) ?? gross;

  return {
    id: toText(plan?.plan_id),
    variantId: toText(plan?.variant_id),
    name: toText(plan?.name) ?? "Plan",
    displayName: toText(plan?.display_name),
    issuer: toText(plan?.issuer?.name),
    issuerId: toText(plan?.issuer?.issuer_id),
    metalLevel: toText(details.metal_level),
    planType: toText(details.plan_type),
    hsaEligible: toBoolean(details.hsa_eligible),
    isStandardized: toBoolean(details.is_standardized),
    csrLevel: toText(details.csr_level),
    netPremium: net,
    grossPremium: gross,
    ehbPremium: toNumber(pricing.ehb_premium),
    subsidyApplied: toNumber(pricing.subsidy_applied),
    maxAptc: toNumber(pricing.max_aptc),
    currency: toText(pricing.currency) ?? "USD",
    // The API returns null here for on-exchange medical. ACA premiums are
    // monthly, so the fallback is safe — but it IS our assumption, not
    // theirs. If a non-monthly product ever shows up, revisit this.
    billingPeriod: toText(pricing.billing_period) ?? "monthly",
    deductibleIndividual: toNumber(details.deductible_individual),
    deductibleFamily: toNumber(details.deductible_family),
    moopIndividual: toNumber(details.moop_individual),
    moopFamily: toNumber(details.moop_family),
    // Plain-language cost-sharing lines straight from the carrier. These are
    // the most useful thing on a plan card after the premium.
    benefits: {
      primaryCare: toText(details.primary_care_summary),
      specialist: toText(details.specialist_summary),
      urgentCare: toText(details.urgent_care_summary),
      genericRx: toText(details.generic_rx_summary),
      adultDental: toText(details.adult_dental),
      childDental: toText(details.child_dental),
    },
    network: {
      id: toText(network.network_id),
      name: toText(network.name),
      type: toText(network.type),
    },
    documents: {
      sbc: toText(documents.sbc_url),
      formulary: toText(documents.formulary_url),
      brochure: toText(documents.brochure_url),
      // Provider search lives under network_url, not provider_directory_url.
      providerDirectory: toText(documents.network_url) ?? toText(network.network_url),
      planDetails: toText(documents.plan_details_url),
    },
    apiEnrollable: plan?.api_enrollable === true,
  };
}

export async function POST(request) {
  const limited = rateLimit(`quotes:${clientKey(request)}`, {
    limit: 15,
    windowMs: 60_000,
  });

  if (!limited.ok) {
    return NextResponse.json(
      {
        error: {
          code: "rate_limited",
          message: "Too many quote requests. Wait a moment and try again.",
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

  const { body, meta, errors } = buildQuoteRequest(input);

  if (errors) {
    return NextResponse.json(
      {
        error: {
          code: "invalid_request",
          message: "Some details need fixing before we can quote.",
          details: errors,
        },
      },
      { status: 400 }
    );
  }

  try {
    const payload = await hsRequest("/v1/quotes", { method: "POST", body });

    const plans = (payload?.plans ?? []).map(shapePlan);

    return NextResponse.json(
      {
        plans,
        meta: {
          resultCount: payload?.meta?.result_count ?? plans.length,
          pageNumber: payload?.meta?.page_number ?? body.page.number,
          pageSize: payload?.meta?.page_size ?? body.page.size,
          planYear: body.context.plan_year,
          effectiveDate: meta.effectiveDate,
          // The UI must disclose how results are ordered. Echo it back so the
          // disclosure line can never drift from the actual sort.
          sortField: meta.sortField,
          sortDirection: meta.sortDirection,
          subsidyEstimated: body.household.annual_income !== undefined,
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    logUpstreamError("quotes", error);

    const { status, body: errorBody } = toPublicError(error);

    return NextResponse.json(errorBody, { status });
  }
}
