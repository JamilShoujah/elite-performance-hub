export const STATIC_ROUTE_REDIRECT_PARAM = "__redirect";

export function getStaticRouteRedirectTarget(currentUrl: string) {
  const url = new URL(currentUrl, "https://example.com");
  const redirectTarget = url.searchParams.get(STATIC_ROUTE_REDIRECT_PARAM);

  if (!redirectTarget) {
    return null;
  }

  url.searchParams.delete(STATIC_ROUTE_REDIRECT_PARAM);

  const remainingSearchParams = url.searchParams.toString();

  if (!remainingSearchParams) {
    return redirectTarget;
  }

  const [pathWithoutHash, hash = ""] = redirectTarget.split("#");
  const searchSeparator = pathWithoutHash.includes("?") ? "&" : "?";

  return `${pathWithoutHash}${searchSeparator}${remainingSearchParams}${
    hash ? `#${hash}` : ""
  }`;
}

export function restoreStaticRouteRedirect() {
  const redirectTarget = getStaticRouteRedirectTarget(window.location.href);

  if (!redirectTarget) {
    return;
  }

  window.history.replaceState(null, "", redirectTarget);
}
