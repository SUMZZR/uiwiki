import { describe, expect, it } from "vitest";

import { createSearchIndex } from "../src/lib/search-index";
import { getAllComponents } from "../src/lib/content";

describe("component search", () => {
  it("matches title, tags, and category fuzzily", async () => {
    const entries = await getAllComponents();
    const index = createSearchIndex(entries);

    expect(index.search("magnet").map((result) => result.item.slug)).toContain("magnetic-glow-button");
    expect(index.search("verification").map((result) => result.item.slug)).toContain("otp-wave-input");
    expect(index.search("loaders").slice(0, 3).every((result) => result.item.category === "loaders")).toBe(true);
  });
});
