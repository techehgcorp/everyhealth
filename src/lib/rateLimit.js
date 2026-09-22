/**
 * Best-effort rate limiting for public endpoints.
 *
 * Read this before you trust it: the counters live in the memory of ONE
 * Lambda instance. Amplify runs several, and they recycle, so a determined
 * attacker gets roughly (your limit x the number of warm instances). This
 * stops accidental loops, a stuck retry in someone's browser, and casual
 * scraping. It is not a security control.
 *
 * If the quoter draws real abuse, the right fix is an AWS WAF rate-based
 * rule in front of the Amplify distribution, scoped to /api/aca/*. That is
 * shared state and actually enforces a number.
 */

const buckets = new Map();
const MAX_TRACKED_KEYS = 5_000;

/**
 * Consume one token for `key`.
 * Returns { ok, remaining, retryAfterSeconds }.
 */
export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    // Crude eviction — the map is a cache, not a ledger, and clearing it
    // just means everyone gets a fresh window.
    if (buckets.size > MAX_TRACKED_KEYS) {
      buckets.clear();
    }

    buckets.set(key, { count: 1, resetAt: now + windowMs });

    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  entry.count += 1;

  if (entry.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  return { ok: true, remaining: limit - entry.count, retryAfterSeconds: 0 };
}

/**
 * Identify the caller. Behind CloudFront the first entry in x-forwarded-for
 * is the real client; everything after it is proxy hops.
 */
export function clientKey(request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }

  return request.headers.get("x-real-ip") || "unknown";
}
