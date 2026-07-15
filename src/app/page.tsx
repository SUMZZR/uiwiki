import { BentoGrid, type PreviewEntry } from "@/components/home/bento-grid";
import { LibraryHeader } from "@/components/home/library-header";
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
    <main className="ambient-shell min-h-screen">
      <div className="mx-auto max-w-[1680px] px-4 pt-8 sm:px-7 sm:pt-10 lg:px-10 lg:pt-12">
        <LibraryHeader componentCount={entries.length} categoryCount={categories.length} />
      </div>
      <BentoGrid entries={previews} />
    </main>
  );
}
