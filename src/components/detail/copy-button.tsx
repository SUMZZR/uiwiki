"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

type CopyButtonProps = {
  copied: boolean;
  onCopy: () => void;
  label?: string;
  inverted?: boolean;
};

export function CopyButton({ copied, onCopy, label = "Copy", inverted = false }: CopyButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onCopy}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={`inline-flex min-h-11 min-w-24 items-center justify-center gap-2 rounded-full px-4 text-xs font-bold transition-colors ${inverted ? "bg-lime text-[#111111] hover:bg-lemon" : "bg-foreground text-background hover:bg-foreground/85"}`}
      aria-label={copied ? "Copied to clipboard" : label}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="copied" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="inline-flex items-center gap-2">
            <Check className="size-4" aria-hidden /> Copied
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
            <Copy className="size-4" aria-hidden /> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
