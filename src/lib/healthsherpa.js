import { brand } from "@/lib/brand";

/**
 * HealthSherpa ONE API client.
 *
 * SERVER ONLY. Never import this from a "use client" component. The API key
 * must never reach the browser, appear in a NEXT_PUBLIC_ variable, or be
 * logged. The browser talks to /api/aca/* — those routes talk to HealthSherpa.
 *
 * Key is read from process.env.HEALTHSHERPA_API_KEY.
 *   - Local dev: add it to .env.local
 *   - Amplify:   add it to the console env vars AND to the grep list in
 *                amplify.yml, or Next's server runtime will not see it.
 *
 * Auth is the x-api-key header. NOT Authorization: Bearer.
 */

const HS_ORIGIN = "https://api.one.healthsherpa.com";
const REQUEST_TIMEOUT_MS = 12_000;

export class HealthSherpaError extends Error {
  constructor(message, { status, code, details } = {}) {
    super(message);
    this.name = "HealthSherpaError";
    this.status = status ?? 502;
    this.code = code ?? "upstream_error";
    this.details = details ?? null;
  }
}

function apiKey() {
  const key = process.env.HEALTHSHERPA_API_KEY;

  if (!key) {
    throw new HealthSherpaError("HEALTHSHERPA_API_KEY is not set", {
      status: 500,
      code: "missing_api_key",
    });
  }

  return key;
}

/**
 * Make an authenticated request to HealthSherpa.
 * Throws HealthSherpaError on any non-2xx response.
 */
export async function hsRequest(path, { method = "GET", body, headers = {} } = {}) {
  const response = await fetch(`${HS_ORIGIN}${path}`, {
    method,
    headers: {
      "x-api-key": apiKey(),
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });

  const raw = await response.text();
  let payload = null;

  try {
    payload = raw ? JSON.parse(raw) : null;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new HealthSherpaError(
      payload?.error?.message || `HealthSherpa responded ${response.status}`,
      {
        status: response.status,
        code: payload?.error?.code || "upstream_error",
        details: payload?.error?.details || null,
      }
    );
  }

  return payload;
}

/**
 * Log an upstream failure to CloudWatch with enough detail to debug, and
 * nothing that identifies a consumer. Never logs the API key.
 */
export function logUpstreamError(context, error) {
  const parts = {
    context,
    name: error?.name,
    status: error?.status,
    code: error?.code,
    message: error?.message,
  };

  // A 400 from HealthSherpa means WE built a bad payload — the field-level
  // details are the fastest way to find the bug, so keep them.
  if (error?.status === 400 && error?.details) {
    parts.details = error.details;
  }

  // A 403 is almost always the key: missing, not yet active, or not
  // authorized for this endpoint. Make it loud so it is obvious in the logs.
  if (error?.status === 403 || error?.code === "missing_api_key") {
    console.error("[healthsherpa] CHECK THE API KEY —", JSON.stringify(parts));
    return;
  }

  console.error("[healthsherpa]", JSON.stringify(parts));
}

/**
 * Translate an internal error into something safe to send to a browser.
 * Upstream error text is never passed through verbatim, because it can
 * describe our request shape or key state.
 */
export function toPublicError(error) {
  if (error?.name === "TimeoutError" || error?.name === "AbortError") {
    return {
      status: 504,
      body: {
        error: {
          code: "timeout",
          message: "Plan pricing is taking longer than usual. Try again in a moment.",
        },
      },
    };
  }

  if (!(error instanceof HealthSherpaError)) {
    return {
      status: 500,
      body: {
        error: {
          code: "internal_error",
          message: "Something went wrong on our end. Please try again.",
        },
      },
    };
  }

  const unavailable = {
    status: 503,
    body: {
      error: {
        code: "quoting_unavailable",
        message:
          `Live plan pricing is temporarily unavailable. Call ${brand.phoneDisplay} and a licensed agent can quote you directly.`,
      },
    },
  };

  switch (error.status) {
    case 400:
      // We sent something HealthSherpa rejected. That is our bug, not the
      // consumer's, so do not show them a validation dump.
      return {
        status: 502,
        body: {
          error: {
            code: "upstream_rejected",
            message: "We could not price plans for those details. Check the ZIP code and try again.",
          },
        },
      };

    case 404:
      return {
        status: 404,
        body: { error: { code: "not_found", message: error.message } },
      };

    case 429:
      return {
        status: 429,
        body: {
          error: {
            code: "rate_limited",
            message: "Too many quote requests right now. Wait a few seconds and try again.",
          },
        },
      };

    case 403:
    case 500:
    case 502:
    case 503:
    default:
      return unavailable;
  }
}
