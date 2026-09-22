import { NextResponse } from "next/server";

import { hsRequest, logUpstreamError, toPublicError } from "@/lib/healthsherpa";
import { clientKey, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/aca/counties?zip_code=33064
 *
 * Resolves a ZIP to its county choices so the quote request can carry a FIPS
 * code. A ZIP that crosses county lines returns more than one, and the
 * consumer has to pick — premiums differ by county.
 */

// ZIP-to-county mapping is effectively static, so cache hard. This survives
// warm Lambda invocations; the Cache-Control header below lets CloudFront
// serve most of these without ever reaching this function.
const cache = new Map();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_CACHE_ENTRIES = 2_000;

function cached(zip) {
  const hit = cache.get(zip);

  if (!hit) return null;

  if (Date.now() >= hit.expiresAt) {
    cache.delete(zip);
    return null;
  }

  return hit.counties;
}

function remember(zip, counties) {
  if (cache.size > MAX_CACHE_ENTRIES) {
    cache.clear();
  }

  cache.set(zip, { counties, expiresAt: Date.now() + CACHE_TTL_MS });
}

function jsonError(status, code, message) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function GET(request) {
  const limited = rateLimit(`counties:${clientKey(request)}`, {
    limit: 40,
    windowMs: 60_000,
  });

  if (!limited.ok) {
    return NextResponse.json(
      {
        error: {
          code: "rate_limited",
          message: "Too many lookups. Wait a moment and try again.",
        },
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  const zip = (request.nextUrl.searchParams.get("zip_code") || "").trim();

  if (!/^\d{5}$/.test(zip)) {
    return jsonError(400, "invalid_request", "Enter a five-digit ZIP code.");
  }

  const hit = cached(zip);

  if (hit) {
    return NextResponse.json(
      { counties: hit },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  }

  try {
    const payload = await hsRequest(`/v1/reference/counties?zip_code=${zip}`);

    const counties = (payload?.counties ?? [])
      .filter((county) => county?.fips_code && county?.name)
      .map((county) => ({
        fips_code: county.fips_code,
        name: county.name,
        state: county.state ?? null,
      }));

    if (counties.length === 0) {
      return jsonError(
        404,
        "not_found",
        "We could not find a county for that ZIP code. Double-check it and try again."
      );
    }

    remember(zip, counties);

    return NextResponse.json(
      { counties },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch (error) {
    logUpstreamError("counties", error);

    const { status, body } = toPublicError(error);

    if (status === 404) {
      body.error.message =
        "We could not find a county for that ZIP code. Double-check it and try again.";
    }

    return NextResponse.json(body, { status });
  }
}
