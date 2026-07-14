import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import {
  componentEntriesSchema,
  componentEntrySchema,
  type ComponentEntry,
} from "@/schemas/component-entry";

const contentDirectory = path.join(process.cwd(), "content", "components");

export async function getAllComponents(): Promise<ComponentEntry[]> {
  const entries = await readdir(contentDirectory, { withFileTypes: true });
  const filenames = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort();

  const rawEntries = await Promise.all(
    filenames.map(async (filename) => {
      const raw = await readFile(path.join(contentDirectory, filename), "utf8");
      return componentEntrySchema.parse(JSON.parse(raw));
    }),
  );

  return componentEntriesSchema.parse(rawEntries);
}

export async function getComponentBySlug(slug: string) {
  const entries = await getAllComponents();
  return entries.find((entry) => entry.slug === slug) ?? null;
}
