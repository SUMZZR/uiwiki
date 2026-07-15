import type { MetadataRoute } from "next";

import { getAllComponents } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllComponents();
  const baseUrl = "https://uiwiki.dev";

  return [
    { url: baseUrl, priority: 1, changeFrequency: "daily" },
    { url: `${baseUrl}/about`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${baseUrl}/prompts`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${baseUrl}/changelog`, priority: 0.5, changeFrequency: "monthly" },
    ...["brand-guidelines", "grid-layout", "typography", "color-systems"].map((slug) => ({
      url: `${baseUrl}/foundations/${slug}`,
      priority: 0.4,
      changeFrequency: "monthly" as const,
    })),
    ...entries.map((entry) => ({
      url: `${baseUrl}/c/${entry.slug}`,
      lastModified: new Date(entry.createdAt),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];
}
