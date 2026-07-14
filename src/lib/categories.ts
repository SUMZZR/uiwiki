export const categories = [
  "buttons",
  "cards",
  "inputs",
  "navigation",
  "loaders",
  "text-effects",
  "backgrounds",
  "transitions",
  "scroll-effects",
  "misc",
] as const;

export type Category = (typeof categories)[number];

export const categoryLabels: Record<Category, string> = {
  buttons: "Buttons",
  cards: "Cards",
  inputs: "Inputs",
  navigation: "Navigation",
  loaders: "Loaders",
  "text-effects": "Text effects",
  backgrounds: "Backgrounds",
  transitions: "Transitions",
  "scroll-effects": "Scroll effects",
  misc: "Miscellaneous",
};
