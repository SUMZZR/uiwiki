"use client";

import { Command, Search } from "lucide-react";
import Link from "next/link";

import { useSearch } from "@/components/search/search-provider";

export function Header() {
  const { openSearch } = useSearch();

  return (
    <header className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-5 sm:px-8">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full font-display text-lg font-bold tracking-tight">
        <span className="grid size-9 place-items-center rounded-full bg-foreground text-sm text-lime">UI</span>
        UIWiki
      </Link>
      <nav className="flex items-center gap-2" aria-label="Primary navigation">
        <Link href="/about" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-copy transition-colors hover:bg-surface-muted sm:inline-flex">
          About
        </Link>
        <button type="button" onClick={openSearch} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-3.5 text-sm font-semibold shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5" aria-label="Open search">
          <Search className="size-4" aria-hidden />
          <span className="hidden sm:inline">Search</span>
          <span className="hidden items-center gap-0.5 rounded-md bg-surface-muted px-1.5 py-1 font-mono text-[10px] text-muted sm:inline-flex">
            <Command className="size-2.5" aria-hidden />K
          </span>
        </button>
      </nav>
    </header>
  );
}
