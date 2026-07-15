"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";

import { categoryLabels } from "@/lib/categories";
import { createSearchIndex, type SearchEntry } from "@/lib/search-index";

type SearchContextValue = { openSearch: () => void };

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used inside SearchProvider");
  return context;
}

type SearchProviderProps = {
  entries: SearchEntry[];
  children: React.ReactNode;
};

export function SearchProvider({ entries, children }: SearchProviderProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const index = useMemo(() => createSearchIndex(entries), [entries]);
  const results = query.trim()
    ? index.search(query, { limit: 8 }).map((result) => result.item)
    : entries.slice(0, 8);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  function choose(entry: SearchEntry) {
    close();
    router.push(`/c/${entry.slug}`);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((value) => Math.min(value + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      choose(results[activeIndex]);
    }
  }

  return (
    <SearchContext.Provider value={{ openSearch: () => setOpen(true) }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-start justify-center bg-foreground/25 px-4 pt-[10vh] backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && close()}>
            <motion.div initial={{ y: -16, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -8, opacity: 0, scale: .98 }} transition={{ type: "spring", stiffness: 360, damping: 30 }} role="dialog" aria-modal="true" aria-label="Search UI patterns" className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-line bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition-colors duration-200">
              <div className="flex items-center gap-3 border-b border-line px-5">
                <Search className="size-5 text-muted" aria-hidden />
                <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={handleInputKeyDown} placeholder="Search components, tags, categories…" className="h-16 min-w-0 flex-1 border-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted" aria-controls="search-results" aria-activedescendant={results[activeIndex] ? `search-${results[activeIndex].slug}` : undefined} />
                <button type="button" onClick={close} className="grid size-10 place-items-center rounded-full bg-surface-muted" aria-label="Close search"><X className="size-4" aria-hidden /></button>
              </div>
              <div id="search-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
                {results.length > 0 ? results.map((entry, resultIndex) => (
                  <button id={`search-${entry.slug}`} role="option" aria-selected={activeIndex === resultIndex} key={entry.slug} type="button" onMouseEnter={() => setActiveIndex(resultIndex)} onClick={() => choose(entry)} className={`flex min-h-16 w-full items-center justify-between gap-4 rounded-[18px] px-4 text-left transition-colors ${activeIndex === resultIndex ? "bg-lime text-[#111111]" : "hover:bg-surface-muted"}`}>
                    <span className="min-w-0">
                      <strong className="block truncate font-display text-base tracking-tight">{entry.title}</strong>
                      <span className="mt-1 block text-xs text-copy">{categoryLabels[entry.category]} · {entry.tags.slice(0, 2).join(" · ")}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                  </button>
                )) : (
                  <div className="grid min-h-40 place-items-center p-6 text-center"><p className="text-sm text-copy">No match yet. Try a category like “loaders”.</p></div>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[11px] text-muted">
                <span>↑↓ Navigate · ↵ Open</span><span>Esc Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SearchContext.Provider>
  );
}
