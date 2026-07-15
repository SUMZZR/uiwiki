import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Grid2X2,
  History,
  Info,
  LayoutGrid,
  MessageSquareText,
  Palette,
  SwatchBook,
  Type,
} from "lucide-react";

export type SiteNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  soon?: boolean;
  activePrefixes?: string[];
};

export type SiteNavGroup = {
  label: string;
  items: SiteNavItem[];
};

export const siteNavGroups: SiteNavGroup[] = [
  {
    label: "Library",
    items: [
      {
        label: "Patterns",
        href: "/",
        icon: Grid2X2,
        activePrefixes: ["/c/"],
      },
      {
        label: "Prompts Guide",
        href: "/prompts",
        icon: MessageSquareText,
      },
    ],
  },
  {
    label: "Foundations",
    items: [
      {
        label: "Brand Guidelines",
        href: "/foundations/brand-guidelines",
        icon: Palette,
        soon: true,
      },
      {
        label: "Grid & Layout",
        href: "/foundations/grid-layout",
        icon: LayoutGrid,
        soon: true,
      },
      {
        label: "Typography",
        href: "/foundations/typography",
        icon: Type,
        soon: true,
      },
      {
        label: "Color Systems",
        href: "/foundations/color-systems",
        icon: SwatchBook,
        soon: true,
      },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "About", href: "/about", icon: Info },
      { label: "Changelog", href: "/changelog", icon: History },
    ],
  },
];

export const foundationPages = [
  { slug: "brand-guidelines", title: "Brand Guidelines", icon: Palette },
  { slug: "grid-layout", title: "Grid & Layout", icon: Grid2X2 },
  { slug: "typography", title: "Typography", icon: FileText },
  { slug: "color-systems", title: "Color Systems", icon: SwatchBook },
] as const;
