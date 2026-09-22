import { google } from "googleapis";

/**
 * Lead sink for HealthSherpa enrollment sessions.
 *
 * Design rule, and the reason this file exists rather than inline calls:
 * delivery is best-effort and failure-isolated. A shopper is mid-handoff when
 * this runs. If Sheets is slow, GHL is down, or the office endpoint is
 * unreachable, that is our problem and must never become theirs. Nothing in
 * here throws, and every destination is bounded by its own timeout.
 *
 * Destinations are read from environment variables. To add the office server
 * later, set OFFICE_LEAD_WEBHOOK_URL — no code change needed.
 */

const DELIVERY_TIMEOUT_MS = 6_000;

/**
 * Credentials. Prefer the correctly-scoped names; fall back to the legacy
 * NEXT_PUBLIC_ ones so this keeps working until those are renamed.
 * NEXT_PUBLIC_ inlines values into the browser bundle — a service account
 * private key should never carry that prefix.
 */
function serviceAccount() {
  const email = process.env.GOOGLE_CLIENT_EMAIL || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY || process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) return null;

  return { client_email: email, private_key: rawKey.replace(/\\n/g, "\n") };
}

function timestamp() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * One row per session, in a fixed column order. Append-only: add new columns
 * on the right, never reorder, or historical rows stop lining up.
 */
function toSheetRow(record) {
  return [
    timestamp(),
    record.externalId ?? "",
    record.flow ?? "",
    record.client?.first_name ?? "",
    record.client?.last_name ?? "",
    record.client?.email ?? "",
    record.client?.phone_number ?? "",
    record.zipCode ?? "",
    record.fipsCode ?? "",
    record.state ?? "",
    record.planId ?? "",
    record.planYear ?? "",
    record.householdSize ?? "",
    record.annualIncome ?? "",
    (record.applicantAges ?? []).join(", "),
    // Agent-assisted sessions need an agent to open this signed in. Blank for
    // self-service, where the shopper follows their own link.
    record.agentUrl ?? "",
  ];
}

async function deliverToSheet(record) {
  const credentials = serviceAccount();
  const spreadsheetId = process.env.HEALTHSHERPA_LEADS_SHEET_ID;
  const tab = process.env.HEALTHSHERPA_LEADS_SHEET_TAB || "health_sherpa_agent_assist";

  if (!credentials || !spreadsheetId) {
    return { destination: "sheet", skipped: "not configured" };
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:P`,
    valueInputOption: "RAW",
    requestBody: { values: [toSheetRow(record)] },
  });

  return { destination: "sheet", ok: true };
}

async function deliverToWebhook(name, url, record) {
  if (!url) return { destination: name, skipped: "not configured" };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`${name} responded ${response.status}`);
  }

  return { destination: name, ok: true };
}

/**
 * Fan out to every configured destination.
 *
 * Awaited rather than fired and forgotten: on Lambda, work left running after
 * the response is sent can be frozen or killed mid-flight. Each destination
 * carries its own timeout, and allSettled means one failure cannot take down
 * the others or the request.
 */
export async function recordEnrollmentSession(record) {
  const results = await Promise.allSettled([
    deliverToSheet(record),
    deliverToWebhook("gohighlevel", process.env.GHL_LEAD_WEBHOOK_URL, record),
    deliverToWebhook("office", process.env.OFFICE_LEAD_WEBHOOK_URL, record),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") {
      // Logged, never rethrown. The shopper's handoff already succeeded.
      console.error(
        "[lead-sink] delivery failed",
        JSON.stringify({
          external_id: record.externalId,
          reason: result.reason?.message ?? String(result.reason),
        })
      );
    }
  });

  return results;
}
