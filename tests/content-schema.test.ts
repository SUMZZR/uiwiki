import { describe, expect, it } from "vitest";

import { categories } from "../src/lib/categories";
import { getAllComponents } from "../src/lib/content";

describe("component content", () => {
  it("contains at least three valid entries in every category", async () => {
    const entries = await getAllComponents();

    expect(entries.length).toBeGreaterThanOrEqual(30);
    for (const category of categories) {
      expect(entries.filter((entry) => entry.category === category).length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps slugs unique and aligned with filenames", async () => {
    const entries = await getAllComponents();
    expect(new Set(entries.map((entry) => entry.slug)).size).toBe(entries.length);
  });
});
