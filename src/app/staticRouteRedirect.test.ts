import { describe, expect, it } from "vitest";

import {
  STATIC_ROUTE_REDIRECT_PARAM,
  getStaticRouteRedirectTarget,
} from "./staticRouteRedirect";

describe("getStaticRouteRedirectTarget", () => {
  it("returns null when there is no redirect param", () => {
    expect(getStaticRouteRedirectTarget("https://example.com/")).toBeNull();
  });

  it("restores the original route path", () => {
    expect(
      getStaticRouteRedirectTarget(
        `https://example.com/?${STATIC_ROUTE_REDIRECT_PARAM}=%2Fexercises`,
      ),
    ).toBe("/exercises");
  });

  it("preserves the redirected route query string and hash", () => {
    expect(
      getStaticRouteRedirectTarget(
        `https://example.com/?${STATIC_ROUTE_REDIRECT_PARAM}=%2Fexercises%3Fsearch%3Drow%23details`,
      ),
    ).toBe("/exercises?search=row#details");
  });

  it("keeps unrelated root query params when restoring the route", () => {
    expect(
      getStaticRouteRedirectTarget(
        `https://example.com/?utm_source=instagram&${STATIC_ROUTE_REDIRECT_PARAM}=%2Fexercises`,
      ),
    ).toBe("/exercises?utm_source=instagram");
  });
});
