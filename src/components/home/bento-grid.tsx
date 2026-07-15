"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { categories, categoryLabels, type Category } from "@/lib/categories";

const LiveDemo = dynamic(
  () => import("@/components/preview/live-demo").then((module) => module.LiveDemo),
  { ssr: false },
);

export type PreviewEntry = {
  slug: string;
  title: string;
  category: Category;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  demoCode: string;
};

type BentoGridProps = { entries: PreviewEntry[] };

const PAGE_SIZE = 12;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isNear };
}

function ComponentCard({ entry, index }: { entry: PreviewEntry; index: number }) {
  const [replayKey, setReplayKey] = useState(0);
  const { ref, isNear } = useNearViewport();
  const isWide = index % 7 === 0 || index % 7 === 4;
  const isDark = index % 8 === 6;
  const isAccent = index % 8 === 3;

  const replay = () => setReplayKey((current) => current + 1);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onHoverStart={replay}
      className={`group min-w-0 overflow-hidden rounded-[24px] border border-line p-3 shadow-[0_2px_16px_rgba(0,0,0,0.04)] ${isWide ? "md:col-span-2" : ""} ${isDark ? "bg-foreground" : isAccent ? "bg-lemon" : "bg-white"}`}
    >
      <div ref={ref} className="min-h-[220px] overflow-hidden rounded-[20px] bg-surface-muted">
        {isNear ? (
          <LiveDemo code={entry.demoCode} replayKey={replayKey} className="h-full min-h-[220px] [&>div]:h-full" />
        ) : (
          <div className="grid min-h-[220px] place-items-center">
            <span className="size-8 animate-pulse rounded-full bg-line" aria-label="Preview loading" />
          </div>
        )}
      </div>
      <div className={`flex items-end justify-between gap-4 px-2 pb-2 pt-4 ${isDark ? "text-white" : "text-foreground"}`}>
        <div className="min-w-0">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${isDark ? "bg-lime text-foreground" : "bg-surface-muted text-copy"}`}>
            {categoryLabels[entry.category]}
          </span>
          <h2 className="mt-2 truncate font-display text-xl font-bold tracking-tight">{entry.title}</h2>
        </div>
        <Link href={`/c/${entry.slug}`} onFocus={replay} aria-label={`Open ${entry.title}`} className={`grid size-11 shrink-0 place-items-center rounded-full transition-transform group-hover:rotate-6 ${isDark ? "bg-lime text-foreground" : "bg-foreground text-white"}`}>
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}

export function BentoGrid({ entries }: BentoGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filteredEntries = activeCategory === "all"
    ? entries
    : entries.filter((entry) => entry.category === activeCategory);
  const visibleEntries = filteredEntries.slice(0, visibleCount);
  const remainingCount = filteredEntries.length - visibleEntries.length;

  const selectCategory = (category: Category | "all") => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="mt-7" aria-label="Pattern library">
      <div className="sticky top-16 z-30 border-y border-line/80 bg-white/88 backdrop-blur-xl md:top-0">
        <div className="hide-scrollbar mx-auto flex max-w-[1680px] gap-2 overflow-x-auto px-4 py-3 sm:px-7 lg:px-10" aria-label="Filter by category">
          <button type="button" onClick={() => selectCategory("all")} aria-pressed={activeCategory === "all"} className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-bold transition-colors ${activeCategory === "all" ? "bg-foreground text-white" : "border border-line bg-white text-copy hover:bg-surface-muted"}`}>
            All · {entries.length}
          </button>
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => selectCategory(category)} aria-pressed={activeCategory === category} className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-bold transition-colors ${activeCategory === category ? "bg-foreground text-white" : "border border-line bg-white text-copy hover:bg-surface-muted"}`}>
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1680px] px-4 sm:px-7 lg:px-10">
        <motion.div key={activeCategory} variants={gridVariants} initial="hidden" animate="visible" className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] gap-3">
          {visibleEntries.map((entry, index) => <ComponentCard key={entry.slug} entry={entry} index={index} />)}
        </motion.div>

        <div className="mt-8 flex flex-col items-center gap-3 pb-8" aria-live="polite">
          <p className="text-xs font-semibold text-muted">
            Showing {visibleEntries.length} of {filteredEntries.length} patterns
          </p>
          {remainingCount > 0 ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
              className="inline-flex min-h-12 items-center rounded-full bg-foreground px-6 text-sm font-bold text-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              Load more · {Math.min(PAGE_SIZE, remainingCount)}
            </motion.button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
