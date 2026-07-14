"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { CopyButton } from "@/components/detail/copy-button";
import { useCopy } from "@/hooks/use-copy";

type Tab = "prompt" | "react" | "css";

type SourceTabsProps = {
  prompt: string;
  reactCode: string;
  cssCode?: string;
};

const tabs: { id: Tab; label: string }[] = [
  { id: "prompt", label: "Prompt" },
  { id: "react", label: "React" },
  { id: "css", label: "CSS" },
];

export function SourceTabs({ prompt, reactCode, cssCode }: SourceTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("prompt");
  const { copied, copy } = useCopy();
  const value = activeTab === "prompt" ? prompt : activeTab === "react" ? reactCode : cssCode ?? "";
  const tokens = Math.ceil(prompt.length / 4);

  return (
    <section className="relative flex min-h-[680px] flex-col overflow-hidden rounded-[24px] bg-foreground text-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]" aria-label="Prompt and source code">
      <div className="border-b border-white/10 p-3">
        <div className="grid grid-cols-3 gap-1 rounded-full bg-white/8 p-1" role="tablist" aria-label="Source format">
          {tabs.map((tab) => (
            <button key={tab.id} id={`tab-${tab.id}`} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`panel-${tab.id}`} onClick={() => setActiveTab(tab.id)} className={`relative min-h-10 rounded-full px-3 text-xs font-bold transition-colors ${activeTab === tab.id ? "text-foreground" : "text-white/55 hover:text-white"}`}>
              {activeTab === tab.id && <motion.span layoutId="active-source-tab" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 320, damping: 28 }} />}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{activeTab === "prompt" ? `≈ ${tokens} tokens` : `${value.split("\n").length} lines`}</p>
          {activeTab === "prompt" && (
            <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Compatible AI tools">
              {["Claude", "GPT", "Cursor", "v0"].map((tool) => <span key={tool} className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold text-white/70">{tool}</span>)}
            </div>
          )}
        </div>
        <CopyButton copied={copied} onCopy={() => void copy(value)} inverted />
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-5 sm:p-6">
        <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0}>
          {activeTab === "prompt" ? (
            <p className="whitespace-pre-wrap text-sm leading-7 text-white/75">{prompt}</p>
          ) : value ? (
            <pre className="overflow-x-auto font-mono text-[12px] leading-6 text-white/70"><code>{value}</code></pre>
          ) : (
            <p className="text-sm text-white/60">A CSS-only alternative is not available for this interaction.</p>
          )}
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {copied && (
          <motion.div initial={{ y: 20, opacity: 0, scale: .94 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 12, opacity: 0 }} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-foreground shadow-[0_14px_40px_rgba(0,0,0,0.16)]">
            Copied. Go make something good.
          </motion.div>
        )}
      </div>
    </section>
  );
}
