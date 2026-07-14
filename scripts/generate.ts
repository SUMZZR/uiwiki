import { writeFile } from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

import { componentEntriesSchema, componentEntrySchema, type ComponentEntry } from "../src/schemas/component-entry";
import { getAllComponents } from "../src/lib/content";
import { askClaude, parseJsonResponse } from "./lib/anthropic";
import { entryGenerationPrompt, generationSystemPrompt, ideaReplenishmentPrompt } from "./lib/generation-prompts";
import { ideaSchema, pickIdeas, readIdeaPool, writeIdeaPool } from "./lib/idea-pool";
import { qualityCheckEntry } from "./lib/quality-check";

const BATCH_SIZE = 3;
const MAX_ATTEMPTS = 3;
const REPLENISH_AT = 24;

async function replenishIdeas() {
  const pool = await readIdeaPool();
  const response = await askClaude(generationSystemPrompt, ideaReplenishmentPrompt, 8_000);
  const additions = z.array(ideaSchema).min(30).parse(parseJsonResponse<unknown>(response));
  const knownIds = new Set(pool.ideas.map((idea) => idea.id));
  const unique = additions.filter((idea) => !knownIds.has(idea.id));
  pool.ideas.push(...unique);
  await writeIdeaPool(pool);
  return pool;
}

async function generateEntry(idea: ReturnType<typeof pickIdeas>[number], existingSlugs: string[]) {
  let feedback = "";
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const raw = await askClaude(
        generationSystemPrompt,
        entryGenerationPrompt(idea, existingSlugs, feedback),
      );
      const entry = componentEntrySchema.parse(parseJsonResponse<unknown>(raw));
      if (entry.category !== idea.category) throw new Error("Generated category does not match the idea");
      if (existingSlugs.includes(entry.slug)) throw new Error(`Duplicate slug: ${entry.slug}`);
      await qualityCheckEntry(entry);
      return entry;
    } catch (error) {
      feedback = error instanceof Error ? error.message.slice(0, 2_000) : String(error);
      if (attempt === MAX_ATTEMPTS) {
        throw new Error(`Failed ${idea.id} after ${MAX_ATTEMPTS} attempts: ${feedback}`);
      }
    }
  }
  throw new Error("Unreachable generation state");
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const existing = await getAllComponents();
  let pool = await readIdeaPool();
  const availableCount = pool.ideas.filter((idea) => idea.status === "available").length;

  if (dryRun) {
    const ideas = pickIdeas(pool, BATCH_SIZE, new Set(existing.map((entry) => entry.title.toLowerCase())));
    if (ideas.length < BATCH_SIZE) throw new Error("Idea pool cannot supply a complete batch");
    console.log(`Dry run ready: ${existing.length} entries, ${availableCount} available ideas.`);
    console.log(ideas.map((idea) => `${idea.category}: ${idea.title}`).join("\n"));
    return;
  }

  if (availableCount < REPLENISH_AT) pool = await replenishIdeas();
  const excludedTitles = new Set(existing.map((entry) => entry.title.toLowerCase()));
  const ideas = pickIdeas(pool, BATCH_SIZE, excludedTitles);
  if (ideas.length < BATCH_SIZE) throw new Error("Idea pool cannot supply a complete batch");

  const generated: ComponentEntry[] = [];
  for (const idea of ideas) {
    const knownSlugs = [...existing, ...generated].map((entry) => entry.slug);
    generated.push(await generateEntry(idea, knownSlugs));
  }

  componentEntriesSchema.parse([...existing, ...generated]);
  const contentDirectory = path.join(process.cwd(), "content", "components");
  await Promise.all(generated.map((entry) => writeFile(
    path.join(contentDirectory, `${entry.slug}.json`),
    `${JSON.stringify(entry, null, 2)}\n`,
    "utf8",
  )));

  const usedAt = new Date().toISOString();
  const usedIds = new Set(ideas.map((idea) => idea.id));
  pool.ideas = pool.ideas.map((idea) => usedIds.has(idea.id)
    ? { ...idea, status: "used" as const, usedAt }
    : idea);
  await writeIdeaPool(pool);
  console.log(`Generated ${generated.length} validated entries: ${generated.map((entry) => entry.slug).join(", ")}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
