import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

import { categories } from "../../src/lib/categories";

export const ideaSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/u),
  title: z.string().min(4).max(80),
  category: z.enum(categories),
  brief: z.string().min(20).max(500),
  status: z.enum(["available", "used"]),
  usedAt: z.string().datetime().optional(),
});

const poolSchema = z.object({
  version: z.literal(1),
  ideas: z.array(ideaSchema),
});

export type Idea = z.infer<typeof ideaSchema>;
export type IdeaPool = z.infer<typeof poolSchema>;

const poolPath = path.join(process.cwd(), "content", "ideas.json");

export async function readIdeaPool() {
  return poolSchema.parse(JSON.parse(await readFile(poolPath, "utf8")));
}

export async function writeIdeaPool(pool: IdeaPool) {
  const validated = poolSchema.parse(pool);
  await writeFile(poolPath, `${JSON.stringify(validated, null, 2)}\n`, "utf8");
}

export function pickIdeas(pool: IdeaPool, count: number, excludedTitles: Set<string>) {
  return pool.ideas.filter(
    (idea) => idea.status === "available" && !excludedTitles.has(idea.title.toLowerCase()),
  ).slice(0, count);
}
