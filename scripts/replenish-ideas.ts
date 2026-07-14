import { categories, type Category } from "../src/lib/categories";
import { readIdeaPool, writeIdeaPool } from "./lib/idea-pool";

const titles: Record<Category, string[]> = {
  buttons: [
    "Tension Toggle Button", "Corner Peel CTA", "Dual State Send Button", "Pulse Trail Action", "Sliding Counter Button",
    "Focus Halo Button", "Reversible Arrow CTA", "Split Progress Control", "Orbiting Label Button", "Compressed Icon Action",
  ],
  cards: [
    "Layer Lens Data Card", "Folded Timeline Card", "Signal Stack Card", "Expandable Quote Dossier", "Pinned Comparison Card",
    "Metric Window Card", "Rotating Status Deck", "Reveal Rail Project Card", "Modular Profile Summary", "Focus Shift Media Card",
  ],
  inputs: [
    "Inline Token Search", "Confidence Meter Field", "Expandable Command Composer", "Stepped Quantity Scrubber", "Context Hint Input",
    "Segmented Time Field", "Voice Note Composer", "Accessible Gradient Stop Field", "Smart URL Inspector", "Validation Trail Input",
  ],
  navigation: [
    "Orbit Section Navigator", "Stacked Breadcrumb Rail", "Focus Lens Tab Bar", "Expandable Map Legend", "Reading Chapter Dock",
    "Context Bubble Navigation", "Split Pane Switcher", "Keyboard Orbit Menu", "Progress Spine Navigation", "Adaptive Corner Tabs",
  ],
  loaders: [
    "Ribbon Fold Loader", "Signal Relay Loader", "Nested Ring Counter", "Pathfinder Dot Loader", "Elastic Type Loader",
    "Stacked Tile Progress", "Scanning Grid Loader", "Packet Orbit Loader", "Breathing Bracket Loader", "Measured Step Loader",
  ],
  "text-effects": [
    "Baseline Relay Headline", "Bracket Reveal Title", "Variable Width Sentence", "Counterweight Word Swap", "Editorial Index Reveal",
    "Split Axis Headline", "Tracking Pulse Label", "Margin Note Typewriter", "Number Grid Metric", "Underline Route Sentence",
  ],
  backgrounds: [
    "Measured Dot Atlas", "Offset Ruler Canvas", "Modular Contour Field", "Focus Ring Blueprint", "Sparse Label Matrix",
    "Paper Cutout Field", "Connected Dash Atlas", "Editorial Axis Canvas", "Quiet Coordinate Field", "Layered Registration Grid",
  ],
  transitions: [
    "Corner Fold Route Transition", "Panel Relay Transition", "Index Card Route Swap", "Measured Curtain Transition", "Shared Token Handoff",
    "Split Canvas Reveal", "Depth Rail Transition", "Focus Window Route Change", "Stacked Sheet Crossfade", "Origin Marker Transition",
  ],
  "scroll-effects": [
    "Sticky Metric Relay", "Scroll Framed Case Study", "Chapter Rail Reveal", "Depth Caption Sequence", "Measured Story Progress",
    "Pinned Comparison Chapters", "Scroll Activated Diagram", "Viewport Label Stack", "Native Snap Feature Rail", "Reading Margin Progress",
  ],
  misc: [
    "Compact Permission Prompt", "Presence Trail Badge", "Inline Retry Notice", "Expandable Status Capsule", "Selection Count Toolbar",
    "Accessible Reaction Dock", "Sync Conflict Banner", "Floating Context Hint", "Keyboard Mode Indicator", "Queued Upload Marker",
  ],
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
}

async function main() {
  const pool = await readIdeaPool();
  const existingIds = new Set(pool.ideas.map((idea) => idea.id));
  const additions = categories.flatMap((category) =>
    titles[category].map((title) => ({
      id: slugify(title),
      title,
      category,
      brief: `Create an original ${title} pattern with a distinctive interaction model, precise duration or spring parameters, a light Bento-compatible composition, responsive behavior, keyboard support, and a reduced-motion state.`,
      status: "available" as const,
    })),
  ).filter((idea) => !existingIds.has(idea.id));

  if (additions.length !== 100) {
    throw new Error(`Expected 100 unique new ideas; received ${additions.length}`);
  }

  pool.ideas.push(...additions);
  await writeIdeaPool(pool);
  console.log(`Added ${additions.length} original ideas; ${pool.ideas.filter((idea) => idea.status === "available").length} available.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
