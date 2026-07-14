import { writeFile } from "node:fs/promises";
import path from "node:path";

import type { Category } from "../src/lib/categories";
import { ideaSchema } from "./lib/idea-pool";

const titles: Record<Category, string[]> = {
  buttons: ["Split Label Launch Button", "Pressure Ring Button", "Sliding Icon CTA", "Hold to Confirm Control", "Elastic Arrow Button", "Segmented Choice Button", "Paper Fold Button", "Orbit Badge Button", "Progress Border Button", "Directional Wipe Button", "Stacked Shadow Button", "Micro Burst Favorite Button"],
  cards: ["Cursor Reveal Case Study Card", "Foldout Pricing Card", "Pinned Note Card", "Layered Notification Card", "Rotating Testimonial Card", "Expandable Team Card", "Before After Product Card", "Focus Window Media Card", "Calendar Heatmap Card", "Sliding Comparison Card", "Peek Under Article Card", "Milestone Route Card"],
  inputs: ["Elastic Tag Input", "Inline Validation Field", "Voice Pulse Search Field", "Unit Scrubber Input", "Smart Date Range Field", "Password Strength Ladder", "Expandable Filter Input", "Tokenized People Picker", "Range Spotlight Slider", "Segmented Currency Input", "Autosizing Message Composer", "Accessible Color Value Input"],
  navigation: ["Sliding Rail Navigation", "Expandable Sidebar Markers", "Corner Command Dock", "Context Trail Navigation", "Circular Step Navigator", "Collapsing Article Index", "Floating Section Compass", "Swipeable Mobile Tabs", "Progressive Disclosure Menu", "Keyboard Grid Navigator", "Stacked Page Switcher", "Reading Position Header"],
  loaders: ["Folding Square Loader", "Breathing Type Loader", "Domino Trail Loader", "Scanning Line Loader", "Morphing Logo Placeholder", "Bouncing Baseline Loader", "Radial Segment Loader", "Tumbling Tile Loader", "Soft Focus Loader", "Counting Dot Loader", "Packet Transfer Loader", "Growing Path Loader"],
  "text-effects": ["Editorial Line Mask Reveal", "Wave Baseline Headline", "Rolling Word Carousel", "Character Weight Pulse", "Cursor Typed Annotation", "Outline to Solid Headline", "Vertical Word Slot", "Highlight Sweep Sentence", "Responsive Arc Label", "Kern Expansion Title", "Footnote Popover Text", "Number Odometer Metric"],
  backgrounds: ["Reactive Crosshair Field", "Editorial Margin Canvas", "Floating Sticker Canvas", "Blueprint Measurement Grid", "Soft Radar Field", "Offset Checker Canvas", "Constellation Link Field", "Halftone Focus Canvas", "Topographic Line Field", "Modular Block Canvas", "Punched Paper Field", "Drifting Dash Pattern"],
  transitions: ["Stack Push Page Transition", "Diagonal Block Transition", "Index Stamp Route Transition", "Accordion Content Swap", "Circular Mask Route Reveal", "Panel Handoff Transition", "Vertical Slice Transition", "Paper Slide Route Change", "Scale Through Transition", "Navigation Origin Reveal", "Content Depth Crossfade", "Card to Canvas Transition"],
  "scroll-effects": ["Scroll Pinned Number Story", "Horizontal Feature Chapters", "Scroll Activated Comparison", "Sticky Quote Sequence", "Image Crop Scroll Reveal", "Viewport Edge Progress", "Scrolling Label Conveyor", "Depth Layer Product Story", "Section Color Marker", "Scroll Snap Process Cards", "Reading Rhythm Highlighter", "Sticky Caption Swap"],
  misc: ["Undo Action Snackbar", "Presence Avatar Cluster", "Expandable Help Beacon", "Reaction Burst Picker", "Keyboard Shortcut Coach", "Connection Quality Indicator", "Saving State Chip", "Drag Drop Target", "Floating Selection Toolbar", "Inline Success Stamp", "Activity Pulse Marker", "Compact Share Sheet"],
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
}

const ideas = Object.entries(titles).flatMap(([category, categoryTitles]) =>
  categoryTitles.map((title) => ideaSchema.parse({
    id: slugify(title),
    title,
    category,
    brief: `Create an original ${title} pattern with one clear primary interaction, precise motion parameters, a light Bento-compatible composition, responsive behavior, and a reduced-motion state.`,
    status: "available",
  })),
);

async function main() {
  await writeFile(
    path.join(process.cwd(), "content", "ideas.json"),
    `${JSON.stringify({ version: 1, ideas }, null, 2)}\n`,
    "utf8",
  );

  console.log(`Seeded ${ideas.length} ideas.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
