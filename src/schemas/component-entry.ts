import { z } from "zod";

import { categories } from "@/lib/categories";

const promptWordCount = (value: string) =>
  value.trim().split(/\s+/u).filter(Boolean).length;

export const componentEntrySchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case"),
  title: z.string().min(3).max(80),
  category: z.enum(categories),
  tags: z.array(z.string().min(2).max(32)).min(2).max(8),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  prompt: z.string().superRefine((value, context) => {
    const words = promptWordCount(value);
    if (words < 200 || words > 400) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Prompt must contain 200–400 words; received ${words}`,
      });
    }
  }),
  code: z.object({
    react: z.string().min(80),
    css: z.string().min(40).optional(),
  }),
  demoCode: z.string().min(80),
  source: z.string().refine(
    (value) =>
      value === "original" || /^inspired-by-https?:\/\/.+/u.test(value),
    "Source must be original or inspired-by-<url>",
  ),
  createdAt: z.string().datetime({ offset: true }),
});

export type ComponentEntry = z.infer<typeof componentEntrySchema>;

export const componentEntriesSchema = z.array(componentEntrySchema).superRefine(
  (entries, context) => {
    const seen = new Set<string>();
    entries.forEach((entry, index) => {
      if (seen.has(entry.slug)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate slug: ${entry.slug}`,
          path: [index, "slug"],
        });
      }
      seen.add(entry.slug);
    });
  },
);
