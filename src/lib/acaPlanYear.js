/**
 * Effective date and plan year helpers.
 *
 * Two rules that matter:
 *   1. Never hardcode a calendar year anywhere. Plan year is always derived
 *      from the effective date, and the effective date is always computed at
 *      request time. A hardcoded 2026 will silently quote stale plans the
 *      moment open enrollment rolls over.
 *   2. All arithmetic is in UTC. Amplify's compute Lambdas run in UTC, so
 *      using local-time date math means "first of next month" can land on the
 *      wrong month for anyone east of us late in the evening.
 */

/** Format a Date as YYYY-MM-DD using UTC fields. */
export function toIsoDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/** First day of the month after `now`, as YYYY-MM-DD. */
export function firstOfNextMonth(now = new Date()) {
  return toIsoDate(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)));
}

/**
 * The effective date we pre-fill in the form.
 *
 * The consumer can change it; this just needs to be the right guess most of
 * the time. The windows below follow the usual federal marketplace calendar:
 *
 *   Nov 1 – Dec 15   OEP for next year, coverage starts Jan 1
 *   Dec 16 – Jan 15  past the Jan 1 cutoff, next start is Feb 1
 *   rest of year     special enrollment territory, first of next month
 *
 * CMS shifts these dates, and state-based marketplaces run their own
 * calendars. Cross-check against src/data/enrollmentPeriods.js before each
 * open enrollment and adjust here if they disagree.
 */
export function defaultEffectiveDate(now = new Date()) {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth(); // 0 = January
  const day = now.getUTCDate();

  // November 1 through December 15
  if (month === 10 || (month === 11 && day <= 15)) {
    return `${year + 1}-01-01`;
  }

  // December 16 through December 31
  if (month === 11) {
    return `${year + 1}-02-01`;
  }

  // January 1 through January 15
  if (month === 0 && day <= 15) {
    return `${year}-02-01`;
  }

  return firstOfNextMonth(now);
}

/** Plan year is always the year of the effective date. */
export function planYearFor(effectiveDate) {
  return Number(effectiveDate.slice(0, 4));
}

/**
 * Accept a YYYY-MM-DD string only if it is a real date and lands somewhere
 * sane — not in the past, not years out. Guards against a caller sending
 * "2026-02-31" or "9999-01-01" straight through to the plan year.
 */
export function isUsableEffectiveDate(value, now = new Date()) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(parsed.getTime()) || toIsoDate(parsed) !== value) {
    return false;
  }

  const earliest = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const latest = Date.UTC(now.getUTCFullYear() + 2, 0, 1);

  return parsed.getTime() >= earliest && parsed.getTime() <= latest;
}
