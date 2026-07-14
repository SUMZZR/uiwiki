import { BentoGrid, type PreviewEntry } from "@/components/home/bento-grid";
import { Hero } from "@/components/home/hero";
import { getAllComponents } from "@/lib/content";
import { categories } from "@/lib/categories";

export default async function Home() {
  const entries = await getAllComponents();
  const previews: PreviewEntry[] = entries.map(({ slug, title, category, tags, difficulty, demoCode }) => ({
    slug,
    title,
    category,
    tags,
    difficulty,
    demoCode,
  }));

  return (
    <main className="ambient-shell mx-auto min-h-screen max-w-[1440px] px-4 py-4 sm:px-8 sm:py-8">
      <Hero componentCount={entries.length} categoryCount={categories.length} />
      <BentoGrid entries={previews} />
    </main>
  );
}
