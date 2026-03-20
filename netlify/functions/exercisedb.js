const EXERCISE_DB_BASE_URL = "https://www.exercisedb.dev/api/v1";
const PUBLIC_PROXY_PATH_PREFIX = "/api/exercisedb";
const FUNCTION_PATH_PREFIX = "/.netlify/functions/exercisedb";
const CACHE_TTL_MS = 5 * 60 * 1000;
const responseCache = new Map();

function buildUpstreamUrl(rawUrl) {
  if (!rawUrl) {
    return null;
  }

  const incomingUrl = new URL(rawUrl);
  const matchedPrefix = [FUNCTION_PATH_PREFIX, PUBLIC_PROXY_PATH_PREFIX].find((prefix) =>
    incomingUrl.pathname.startsWith(prefix),
  );
  const upstreamPath = matchedPrefix
    ? incomingUrl.pathname.slice(matchedPrefix.length)
    : "";
  const normalizedUpstreamPath = upstreamPath.replace(/^\/+/, "");

  if (!normalizedUpstreamPath) {
    return null;
  }

  return new URL(
    `${normalizedUpstreamPath}${incomingUrl.search}`,
    `${EXERCISE_DB_BASE_URL}/`,
  ).toString();
}

function getCachedResponse(cacheKey) {
  const cachedEntry = responseCache.get(cacheKey);

  if (!cachedEntry) {
    return null;
  }

  if (cachedEntry.expiresAt <= Date.now()) {
    responseCache.delete(cacheKey);
    return null;
  }

  return cachedEntry;
}

function setCachedResponse(cacheKey, response) {
  if (responseCache.size >= 200) {
    const oldestCacheKey = responseCache.keys().next().value;

    if (oldestCacheKey) {
      responseCache.delete(oldestCacheKey);
    }
  }

  responseCache.set(cacheKey, {
    ...response,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function buildCacheHeaders(isSuccess) {
  return isSuccess
    ? {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
        "Netlify-CDN-Cache-Control":
          "public, s-maxage=300, stale-while-revalidate=600",
      }
    : {
        "Cache-Control": "public, max-age=15, s-maxage=15",
        "Netlify-CDN-Cache-Control": "public, s-maxage=15",
      };
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        Allow: "GET",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ success: false, message: "Method not allowed." }),
    };
  }

  const upstreamUrl = buildUpstreamUrl(event.rawUrl);

  if (!upstreamUrl) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ success: false, message: "Invalid ExerciseDB path." }),
    };
  }

  const cachedResponse = getCachedResponse(upstreamUrl);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: { Accept: "application/json" },
    });
    const responseBody = await upstreamResponse.text();
    const responseHeaders = {
      "Content-Type":
        upstreamResponse.headers.get("content-type") ?? "application/json; charset=utf-8",
      ...buildCacheHeaders(upstreamResponse.ok),
    };
    const retryAfter = upstreamResponse.headers.get("retry-after");

    if (retryAfter) {
      responseHeaders["Retry-After"] = retryAfter;
    }

    const response = {
      statusCode: upstreamResponse.status,
      headers: responseHeaders,
      body: responseBody,
    };

    if (upstreamResponse.ok) {
      setCachedResponse(upstreamUrl, response);
    }

    return response;
  } catch {
    return {
      statusCode: 502,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...buildCacheHeaders(false),
      },
      body: JSON.stringify({
        success: false,
        message: "ExerciseDB is unavailable right now.",
      }),
    };
  }
}
