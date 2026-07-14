"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Moon, RefreshCw, Sun } from "lucide-react";
import { motion } from "framer-motion";

const LiveDemo = dynamic(
  () => import("@/components/preview/live-demo").then((module) => module.LiveDemo),
  { ssr: false },
);

type PreviewStageProps = {
  code: string;
  title: string;
};

export function PreviewStage({ code, title }: PreviewStageProps) {
  const [replayKey, setReplayKey] = useState(0);
  const [darkBackground, setDarkBackground] = useState(false);

  return (
    <section className="overflow-hidden rounded-[24px] border border-line bg-white p-3 shadow-[0_2px_16px_rgba(0,0,0,0.04)]" aria-label={`${title} interactive preview`}>
      <div className="flex items-center justify-between px-2 pb-3 pt-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.13em] text-muted">Live preview</p>
          <p className="mt-1 text-xs text-copy">Interactive · resize-safe</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setDarkBackground((value) => !value)} className="grid size-11 place-items-center rounded-full border border-line bg-white text-foreground transition-transform hover:-translate-y-0.5" aria-label={darkBackground ? "Use light preview background" : "Use dark preview background"}>
            {darkBackground ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
          </button>
          <motion.button type="button" whileTap={{ rotate: -55, scale: .9 }} onClick={() => setReplayKey((value) => value + 1)} className="grid size-11 place-items-center rounded-full bg-foreground text-white" aria-label="Replay animation">
            <RefreshCw className="size-4" aria-hidden />
          </motion.button>
        </div>
      </div>
      <div className={`grid min-h-[480px] place-items-center overflow-hidden rounded-[20px] p-4 transition-colors sm:min-h-[620px] ${darkBackground ? "bg-foreground" : "bg-surface-muted"}`}>
        <LiveDemo code={code} replayKey={replayKey} className="w-full [&>div]:min-h-[420px] sm:[&>div]:min-h-[560px]" />
      </div>
    </section>
  );
}
