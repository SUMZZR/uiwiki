"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/shell/brand-mark";
import { Sidebar } from "@/components/shell/sidebar";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

type WikiShellProps = {
  children: React.ReactNode;
};

export function WikiShell({ children }: WikiShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-200 md:grid md:h-dvh md:grid-cols-[80px_minmax(0,1fr)] md:overflow-hidden lg:grid-cols-[272px_minmax(0,1fr)]">
      <div className="sticky top-0 z-40 hidden h-dvh min-h-0 border-r border-line bg-surface transition-colors duration-200 md:block">
        <Sidebar surface="rail" />
      </div>

      <div id="wiki-scroll" className="min-w-0 md:h-dvh md:overflow-y-auto md:overscroll-contain">
        <div className="fixed right-5 top-4 z-[60] hidden md:block">
          <ThemeSwitcher />
        </div>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur-xl transition-colors duration-200 md:hidden">
          <Link href="/" className="inline-flex items-center gap-3 rounded-lg font-display text-lg font-bold tracking-tight">
            <BrandMark />
            <span className="max-[359px]:hidden">Vibehoarder</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <button type="button" onClick={() => setDrawerOpen(true)} className="grid size-10 place-items-center rounded-full bg-surface-muted text-foreground transition-colors duration-200" aria-label="Open navigation" aria-expanded={drawerOpen}>
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </header>
        {children}
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] bg-surface transition-colors duration-200 md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 36 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <Sidebar surface="drawer" onClose={() => setDrawerOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
