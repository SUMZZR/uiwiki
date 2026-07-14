import type { Idea } from "./idea-pool";

export const generationSystemPrompt = `You are a meticulous senior UI engineer creating original entries for an open UI pattern library. Return only valid JSON, never Markdown. Generated code must be deterministic, accessible, responsive, and safe to execute in a restricted preview. Do not copy a named product or copyrighted interface.`;

export function entryGenerationPrompt(idea: Idea, existingSlugs: string[], feedback?: string) {
  return `Generate one component entry for this idea:
${JSON.stringify(idea)}

Do not use any existing slug: ${existingSlugs.join(", ")}.
Return exactly this JSON shape:
{
  "slug": "lowercase-kebab-case",
  "title": "...",
  "category": "${idea.category}",
  "tags": ["2-8 concise tags"],
  "difficulty": "beginner|intermediate|advanced",
  "prompt": "200-400 English words with visual description, exact interaction, duration/easing/spring values, responsive behavior, accessibility, reduced motion, and quality constraints",
  "code": {
    "react": "complete paste-ready TypeScript React client component importing only React and/or framer-motion",
    "css": "complete CSS-only approximation with a suggested HTML markup comment"
  },
  "demoCode": "a self-contained JSX expression for react-live, normally an IIFE returning one element; it may reference React and motion from scope but must not import/export, access browser globals, perform network calls, use random values, inject HTML, or create uncleared timers",
  "source": "original",
  "createdAt": "${new Date().toISOString()}"
}

Visual system: light #FFFFFF/#F4F5F6 surfaces, #111111 primary text, #4A4A4F body text, 20-24px radii, hairline #ECECEE borders, extremely soft shadows, and at most two accents chosen from #D8F34E, #F5E642, #53E8D4, #FF9950, #C5BFF0, #F5C9D4. Cards must use solid fills, never gradients. The demo must render meaningful static HTML on the server and fit both a 320px preview and a large detail stage.
${feedback ? `Previous attempt failed. Correct these issues: ${feedback}` : ""}`;
}

export const ideaReplenishmentPrompt = `Return a JSON array of 60 original UI effect ideas evenly distributed across buttons, cards, inputs, navigation, loaders, text-effects, backgrounds, transitions, scroll-effects, and misc. Each item must have id (unique kebab-case), title, category, brief (one precise sentence), and status set to available. Avoid brand references and avoid minor renames of common ideas.`;
