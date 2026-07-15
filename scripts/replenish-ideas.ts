import { categories, type Category } from "../src/lib/categories";
import { readIdeaPool, writeIdeaPool } from "./lib/idea-pool";

const titles: Record<Category, string[]> = {
  buttons: [
    "Tension Toggle Button", "Corner Peel CTA", "Dual State Send Button", "Pulse Trail Action", "Sliding Counter Button",
    "Focus Halo Button", "Reversible Arrow CTA", "Split Progress Control", "Orbiting Label Button", "Compressed Icon Action",
    "Magnetic Caption Button", "Layered Confirm Action", "Elastic Corner Control", "Signal Sweep CTA", "Folded Icon Trigger",
    "Measured Hold Button", "Twin Track Action", "Radial Count Control", "Inline Handoff Button", "Stacked State CTA",
    "Sliding Intent Button", "Pivot Label Action", "Measured Corner CTA", "Layered Shortcut Trigger", "Focus Relay Button",
    "Elastic Count Capsule", "Pinned Confirm Control", "Orbiting Status Action", "Split Signal Button", "Tension Rail CTA",
    "Axis Lock Button", "Indexed Commit CTA", "Sliding Proof Action", "Layered Route Trigger", "Measured Pulse Control",
    "Pinned Shortcut CTA", "Folding Status Button", "Modular Send Control", "Counterweight Action", "Focus Track Button",
  ],
  cards: [
    "Layer Lens Data Card", "Folded Timeline Card", "Signal Stack Card", "Expandable Quote Dossier", "Pinned Comparison Card",
    "Metric Window Card", "Rotating Status Deck", "Reveal Rail Project Card", "Modular Profile Summary", "Focus Shift Media Card",
    "Offset Ledger Card", "Expandable Signal Brief", "Layered Milestone Card", "Pinned Insight Panel", "Sliding Annotation Card",
    "Modular Audit Summary", "Folded Resource Card", "Focus Rail Profile", "Measured Outcome Card", "Stacked Release Dossier",
    "Layered Research Card", "Pivot Insight Summary", "Measured Profile Dossier", "Sliding Evidence Panel", "Pinned Outcome Brief",
    "Modular Release Card", "Folded Audit Panel", "Focus Window Summary", "Offset Resource Dossier", "Stacked Signal Profile",
    "Indexed Evidence Card", "Sliding Metric Dossier", "Layered Decision Brief", "Measured Team Panel", "Pinned Release Summary",
    "Folding Resource Profile", "Modular Outcome Card", "Focus Track Dossier", "Offset Audit Summary", "Stacked Context Panel",
  ],
  inputs: [
    "Inline Token Search", "Confidence Meter Field", "Expandable Command Composer", "Stepped Quantity Scrubber", "Context Hint Input",
    "Segmented Time Field", "Voice Note Composer", "Accessible Gradient Stop Field", "Smart URL Inspector", "Validation Trail Input",
    "Inline Constraint Editor", "Layered Date Composer", "Accessible Range Matrix", "Expandable Filter Sentence", "Measured Search Field",
    "Token Relay Composer", "Context Aware Number Field", "Segmented Address Input", "Confidence Path Editor", "Keyboard Color Inspector",
    "Measured Token Editor", "Layered Time Composer", "Accessible Position Matrix", "Expandable Rule Builder", "Context Search Inspector",
    "Keyboard Range Composer", "Segmented Metric Field", "Confidence Note Editor", "Inline Date Resolver", "Focus Aware URL Field",
    "Indexed Search Composer", "Measured Duration Field", "Layered Token Resolver", "Keyboard Ratio Editor", "Confidence Route Input",
    "Segmented Unit Inspector", "Inline Constraint Builder", "Focus Aware Command Field", "Accessible Scale Composer", "Modular Query Editor",
  ],
  navigation: [
    "Orbit Section Navigator", "Stacked Breadcrumb Rail", "Focus Lens Tab Bar", "Expandable Map Legend", "Reading Chapter Dock",
    "Context Bubble Navigation", "Split Pane Switcher", "Keyboard Orbit Menu", "Progress Spine Navigation", "Adaptive Corner Tabs",
    "Measured Dock Navigation", "Layered Route Compass", "Expandable Chapter Strip", "Context Rail Tabs", "Pinned Section Switcher",
    "Keyboard Map Navigator", "Offset Page Index", "Focus Trail Breadcrumbs", "Modular Workspace Menu", "Adaptive Reading Compass",
    "Layered Section Dock", "Measured Route Tabs", "Expandable Workspace Index", "Pinned Reading Rail", "Context Page Compass",
    "Keyboard Chapter Map", "Offset Navigation Dossier", "Focus Path Menu", "Modular Breadcrumb Strip", "Adaptive Project Switcher",
    "Indexed Workspace Rail", "Layered Chapter Switcher", "Measured Context Tabs", "Pinned Route Menu", "Focus Track Breadcrumbs",
    "Keyboard Section Dossier", "Modular Page Compass", "Offset Project Dock", "Adaptive Reading Strip", "Expandable Signal Navigator",
  ],
  loaders: [
    "Ribbon Fold Loader", "Signal Relay Loader", "Nested Ring Counter", "Pathfinder Dot Loader", "Elastic Type Loader",
    "Stacked Tile Progress", "Scanning Grid Loader", "Packet Orbit Loader", "Breathing Bracket Loader", "Measured Step Loader",
    "Segment Relay Loader", "Folding Dot Counter", "Measured Wave Progress", "Offset Packet Loader", "Nested Tile Scanner",
    "Signal Ladder Progress", "Elastic Index Loader", "Ribbon Node Counter", "Orbiting Step Indicator", "Stacked Pulse Meter",
    "Measured Packet Relay", "Folding Signal Meter", "Nested Step Scanner", "Offset Ribbon Loader", "Elastic Dot Ladder",
    "Segment Orbit Progress", "Stacked Node Counter", "Path Relay Indicator", "Breathing Tile Meter", "Measured Index Scanner",
    "Indexed Ribbon Progress", "Layered Step Counter", "Measured Pulse Scanner", "Folding Route Loader", "Elastic Module Meter",
    "Stacked Signal Relay", "Breathing Index Counter", "Offset Node Scanner", "Segmented Path Loader", "Orbiting Tile Progress",
  ],
  "text-effects": [
    "Baseline Relay Headline", "Bracket Reveal Title", "Variable Width Sentence", "Counterweight Word Swap", "Editorial Index Reveal",
    "Split Axis Headline", "Tracking Pulse Label", "Margin Note Typewriter", "Number Grid Metric", "Underline Route Sentence",
    "Editorial Weight Relay", "Measured Word Cascade", "Split Baseline Statement", "Kinetic Index Caption", "Bracketed Metric Reveal",
    "Tracking Shift Headline", "Layered Number Sentence", "Margin Rail Quote", "Counterbalanced Title", "Modular Glyph Sequence",
    "Measured Caption Cascade", "Layered Weight Headline", "Split Index Sentence", "Editorial Route Quote", "Tracking Number Relay",
    "Bracketed Word Sequence", "Margin Axis Statement", "Counterweight Metric Title", "Modular Letter Reveal", "Baseline Signal Caption",
    "Indexed Phrase Relay", "Layered Number Caption", "Measured Axis Headline", "Bracketed Signal Title", "Editorial Metric Cascade",
    "Tracking Word Dossier", "Margin Route Sentence", "Counterweight Glyph Reveal", "Modular Baseline Quote", "Split Folio Statement",
  ],
  backgrounds: [
    "Measured Dot Atlas", "Offset Ruler Canvas", "Modular Contour Field", "Focus Ring Blueprint", "Sparse Label Matrix",
    "Paper Cutout Field", "Connected Dash Atlas", "Editorial Axis Canvas", "Quiet Coordinate Field", "Layered Registration Grid",
    "Offset Baseline Field", "Modular Paper Matrix", "Sparse Route Blueprint", "Measured Arc Canvas", "Quiet Signal Topography",
    "Layered Index Field", "Editorial Tick Atlas", "Connected Module Grid", "Focus Path Canvas", "Registration Dot Landscape",
    "Measured Signal Field", "Layered Paper Atlas", "Offset Route Matrix", "Quiet Arc Blueprint", "Connected Index Canvas",
    "Editorial Module Field", "Focus Dot Landscape", "Sparse Baseline Atlas", "Registration Path Grid", "Modular Tick Topography",
    "Indexed Arc Landscape", "Layered Coordinate Atlas", "Measured Module Blueprint", "Quiet Path Matrix", "Editorial Signal Field",
    "Sparse Route Canvas", "Registration Axis Topography", "Focus Tick Blueprint", "Offset Dot Dossier", "Connected Baseline Field",
  ],
  transitions: [
    "Corner Fold Route Transition", "Panel Relay Transition", "Index Card Route Swap", "Measured Curtain Transition", "Shared Token Handoff",
    "Split Canvas Reveal", "Depth Rail Transition", "Focus Window Route Change", "Stacked Sheet Crossfade", "Origin Marker Transition",
    "Measured Iris Transition", "Layered Panel Handoff", "Offset Sheet Reveal", "Pinned Route Expansion", "Signal Wipe Transition",
    "Modular Canvas Swap", "Folded Depth Change", "Index Rail Crossfade", "Focus Token Expansion", "Counterweight Route Reveal",
    "Layered Iris Handoff", "Measured Panel Swap", "Offset Canvas Expansion", "Pinned Token Reveal", "Signal Sheet Crossfade",
    "Modular Depth Wipe", "Folded Route Relay", "Index Marker Transition", "Focus Rail Expansion", "Counterbalanced Canvas Change",
    "Indexed Sheet Handoff", "Layered Focus Wipe", "Measured Route Fold", "Pinned Canvas Relay", "Signal Depth Expansion",
    "Modular Marker Reveal", "Offset Token Crossfade", "Counterweight Panel Swap", "Folding Index Transition", "Registration Rail Change",
  ],
  "scroll-effects": [
    "Sticky Metric Relay", "Scroll Framed Case Study", "Chapter Rail Reveal", "Depth Caption Sequence", "Measured Story Progress",
    "Pinned Comparison Chapters", "Scroll Activated Diagram", "Viewport Label Stack", "Native Snap Feature Rail", "Reading Margin Progress",
    "Sticky Annotation Relay", "Measured Chapter Canvas", "Scroll Linked Card Dossier", "Viewport Metric Ladder", "Native Snap Story Deck",
    "Pinned Signal Timeline", "Reading Axis Sequence", "Scroll Framed Blueprint", "Depth Marker Chapters", "Sticky Outcome Comparator",
    "Measured Story Ladder", "Pinned Annotation Timeline", "Scroll Linked Signal Deck", "Viewport Outcome Rail", "Native Snap Dossier",
    "Reading Metric Canvas", "Sticky Chapter Comparator", "Depth Index Sequence", "Scroll Framed Outcome", "Viewport Route Timeline",
    "Indexed Story Canvas", "Sticky Signal Dossier", "Reading Route Comparator", "Viewport Metric Sequence", "Native Snap Outcome Rail",
    "Pinned Context Timeline", "Depth Chapter Blueprint", "Scroll Framed Evidence", "Measured Viewport Ladder", "Reading Index Journey",
  ],
  misc: [
    "Compact Permission Prompt", "Presence Trail Badge", "Inline Retry Notice", "Expandable Status Capsule", "Selection Count Toolbar",
    "Accessible Reaction Dock", "Sync Conflict Banner", "Floating Context Hint", "Keyboard Mode Indicator", "Queued Upload Marker",
    "Inline Version Resolver", "Compact Activity Ledger", "Accessible Status Inspector", "Floating Shortcut Guide", "Queued Export Capsule",
    "Selection Summary Badge", "Expandable Audit Notice", "Keyboard Focus Coach", "Presence Conflict Resolver", "Measured Toast Queue",
    "Inline Activity Resolver", "Compact Selection Ledger", "Accessible Export Inspector", "Floating Focus Guide", "Queued Version Capsule",
    "Presence Summary Badge", "Expandable Shortcut Notice", "Keyboard Status Coach", "Measured Conflict Resolver", "Layered Toast Queue",
    "Indexed Activity Notice", "Compact Route Inspector", "Accessible Queue Summary", "Floating Status Resolver", "Keyboard Context Badge",
    "Measured Version Coach", "Layered Permission Capsule", "Presence Signal Ledger", "Expandable Retry Guide", "Selection Audit Toolbar",
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
