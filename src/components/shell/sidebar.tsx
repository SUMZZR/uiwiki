"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Command, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSearch } from "@/components/search/search-provider";
import { BrandMark } from "@/components/shell/brand-mark";
import { siteNavGroups, type SiteNavItem } from "@/lib/site-nav";

type SidebarProps = {
  surface: "rail" | "drawer";
  onClose?: () => void;
};

function isItemActive(item: SiteNavItem, pathname: string) {
  if (item.href === "/") {
    return pathname === "/" || item.activePrefixes?.some((prefix) => pathname.startsWith(prefix));
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Sidebar({ surface, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { openSearch } = useSearch();
  const isDrawer = surface === "drawer";

  function handleSearch() {
    onClose?.();
    openSearch();
  }

  return (
    <LayoutGroup id={`site-nav-${surface}`}>
      <aside className="flex h-full min-h-0 flex-col bg-surface transition-colors duration-200" aria-label="Site navigation">
        <div className={`flex h-[73px] shrink-0 items-center border-b border-line px-5 ${isDrawer ? "justify-between" : "justify-center lg:justify-start"}`}>
          <Link href="/" onClick={onClose} className="inline-flex items-center gap-3 rounded-lg" aria-label="Vibehoarder home">
            <BrandMark />
            <span className={`font-display text-xl font-bold tracking-[-0.03em] ${isDrawer ? "block" : "hidden lg:block"}`}>
              Vibehoarder
            </span>
          </Link>
          {isDrawer ? (
            <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-full bg-surface-muted text-copy transition-colors hover:text-foreground" aria-label="Close navigation">
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </div>

        <nav className={`min-h-0 flex-1 px-3 py-6 ${isDrawer ? "overflow-y-auto" : "overflow-visible lg:overflow-y-auto"}`}>
          <div className="space-y-7">
            {siteNavGroups.map((group) => (
              <section key={group.label} aria-labelledby={`${surface}-${group.label}`}>
                <h2 id={`${surface}-${group.label}`} className={`mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted ${isDrawer ? "block" : "hidden lg:block"}`}>
                  {group.label}
                </h2>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = isItemActive(item, pathname);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        title={!isDrawer ? item.label : undefined}
                        className={`group relative flex min-h-11 items-center rounded-[10px] text-sm transition-colors ${isDrawer ? "justify-start gap-3 px-3" : "justify-center px-0 lg:justify-start lg:gap-3 lg:px-3"} ${item.soon && !active ? "text-muted" : "text-copy hover:text-foreground"}`}
                      >
                        {active ? (
                          <>
                            <motion.span layoutId={`active-bg-${surface}`} className="absolute inset-0 rounded-[10px] bg-lime/20" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                            <motion.span layoutId={`active-line-${surface}`} className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-lime" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                          </>
                        ) : (
                          <span className="absolute inset-0 rounded-[10px] bg-transparent transition-colors group-hover:bg-surface-muted" />
                        )}
                        <Icon className="relative z-10 size-[18px] shrink-0" strokeWidth={1.8} aria-hidden />
                        <span className={`relative z-10 min-w-0 flex-1 items-center justify-between gap-2 ${isDrawer ? "flex" : "hidden lg:flex"}`}>
                          <span className={`truncate ${active ? "font-bold text-foreground" : "font-medium"}`}>{item.label}</span>
                          {item.soon ? <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">Soon</span> : null}
                        </span>
                        {!isDrawer ? (
                          <span className="pointer-events-none absolute left-[calc(100%+10px)] z-50 hidden whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background shadow-lg group-hover:flex group-focus-visible:flex lg:hidden">
                            {item.label}{item.soon ? " · Soon" : ""}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </nav>

        <div className={`shrink-0 border-t border-line p-4 ${isDrawer ? "block" : "px-3 lg:p-4"}`}>
          <button
            type="button"
            onClick={handleSearch}
            className={`group relative flex min-h-11 w-full items-center rounded-full bg-surface-muted text-sm font-semibold text-copy transition-colors hover:text-foreground ${isDrawer ? "gap-3 px-4" : "justify-center px-0 lg:justify-start lg:gap-3 lg:px-4"}`}
            aria-label="Search patterns"
          >
            <Search className="size-4 shrink-0" aria-hidden />
            <span className={isDrawer ? "block" : "hidden lg:block"}>Search</span>
            <span className={`ml-auto items-center gap-0.5 rounded-full border border-line bg-surface px-2 py-1 font-mono text-[9px] text-muted ${isDrawer ? "inline-flex" : "hidden lg:inline-flex"}`}>
              <Command className="size-2.5" aria-hidden />K
            </span>
            {!isDrawer ? <span className="pointer-events-none absolute left-[calc(100%+10px)] z-50 hidden whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background shadow-lg group-hover:flex group-focus-visible:flex lg:hidden">Search · ⌘K</span> : null}
          </button>
          <p className={`mt-6 text-[13px] leading-5 text-muted ${isDrawer ? "block" : "hidden lg:block"}`}>
            Vibehoarder — hoarding every UI pattern worth stealing for your next vibe coding session.
          </p>
        </div>
      </aside>
    </LayoutGroup>
  );
}
