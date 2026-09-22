/**
 * Debug script — dumps ONE raw plan object straight from HealthSherpa, with
 * no shaping, so we can see the real field names and types.
 *
 * Run from the repo root:
 *   node --env-file=.env.local scripts/hs-raw-quote.mjs
 *
 * This is a throwaway diagnostic. Delete it when we are done, or leave it —
 * it contains no key, it reads one from the environment like everything else.
 */

const HS_ORIGIN = "https://api.one.healthsherpa.com";

const key = process.env.HEALTHSHERPA_API_KEY;

if (!key) {
  console.error("HEALTHSHERPA_API_KEY not found. Did you pass --env-file=.env.local ?");
  process.exit(1);
}

const body = {
  context: {
    product: "aca",
    exchange: "on_exchange",
    coverage_family: "medical",
    coverage_type: "medical",
    plan_year: 2026,
  },
  location: {
    zip_code: "33064",
    fips_code: "12011",
    state: "FL",
  },
  household: {
    household_size: 1,
    annual_income: 38000,
    effective_date: "2026-10-01",
    applicants: [
      {
        member_id: "applicant-1",
        age: 42,
        relationship: "primary",
        uses_tobacco: false,
      },
    ],
  },
  sort: { field: "premium", direction: "asc" },
  page: { number: 1, size: 1 },
};

const response = await fetch(`${HS_ORIGIN}/v1/quotes`, {
  method: "POST",
  headers: {
    "x-api-key": key,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify(body),
});

const payload = await response.json();

console.log(`\nHTTP ${response.status}\n`);

const plan = payload?.plans?.[0];

if (!plan) {
  console.log("No plans came back. Full payload:");
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("=== RAW PLAN ===");
console.log(JSON.stringify(plan, null, 2));

// The actual question: what JavaScript type is each value?
console.log("\n=== TYPES ===");

for (const section of ["pricing", "details"]) {
  const object = plan?.[section];

  if (!object) {
    console.log(`${section}: MISSING`);
    continue;
  }

  for (const [field, value] of Object.entries(object)) {
    console.log(`${section}.${field} = ${JSON.stringify(value)}  (${typeof value})`);
  }
}
