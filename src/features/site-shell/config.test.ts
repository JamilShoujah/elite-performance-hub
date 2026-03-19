import { describe, expect, it } from "vitest";

import { resolveHomeHref, resolveSectionHref } from "./config";

describe("site-shell navigation helpers", () => {
  it("uses in-page anchors on the home route", () => {
    expect(resolveSectionHref("/", "contact")).toBe("#contact");
    expect(resolveHomeHref("/")).toBe("#top");
  });

  it("resolves back to the landing page from feature routes", () => {
    expect(resolveSectionHref("/exercises", "programs")).toBe("/#programs");
    expect(resolveHomeHref("/exercises")).toBe("/");
  });
});
