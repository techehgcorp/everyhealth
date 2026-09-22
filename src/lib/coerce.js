/**
 * Coercion helpers for upstream values.
 *
 * Why this exists: HealthSherpa can send numerics as JSON strings. A strict
 * Number.isFinite() check rejects "844.15" and silently turns every premium,
 * deductible and MOOP into null while the string fields sail through — which
 * is exactly the failure we hit. These helpers accept either form and refuse
 * anything that is not genuinely a number.
 */

/**
 * Coerce a value to a finite number, or null.
 * Accepts 844.15, "844.15", "$844.15" and "1,200". Rejects "", null,
 * undefined, "N/A", true, and objects.
 */
export function toNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[$,\s]/g, "");

    if (cleaned === "") return null;

    const parsed = Number(cleaned);

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

/** Coerce to boolean, or null when the value is genuinely absent. */
export function toBoolean(value) {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;

  return null;
}

/** Trimmed non-empty string, or null. */
export function toText(value) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  return trimmed === "" ? null : trimmed;
}

/**
 * Format cents-free currency for display. Returns null rather than "$NaN"
 * so callers can decide what an absent premium should look like.
 */
export function formatUsd(value, { decimals = 2 } = {}) {
  const amount = toNumber(value);

  if (amount === null) return null;

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** "expanded_bronze" -> "Expanded Bronze", "hmo" -> "HMO". */
export function humanizeLabel(value, { acronyms = ["hmo", "ppo", "epo", "pos", "hsa", "aptc", "csr"] } = {}) {
  const text = toText(value);

  if (text === null) return null;

  return text
    .split(/[_\s-]+/)
    .map((word) =>
      acronyms.includes(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}
