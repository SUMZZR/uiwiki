import Fuse, { type IFuseOptions } from "fuse.js";

import type { Category } from "@/lib/categories";

export type SearchEntry = {
  slug: string;
  title: string;
  category: Category;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
};

export const searchOptions: IFuseOptions<SearchEntry> = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "tags", weight: 0.3 },
    { name: "category", weight: 0.2 },
  ],
  threshold: 0.35,
  distance: 80,
  ignoreLocation: true,
  includeScore: true,
};

export function createSearchIndex(entries: SearchEntry[]) {
  return new Fuse(entries, searchOptions);
}
