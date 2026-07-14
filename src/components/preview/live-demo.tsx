"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LiveError, LivePreview, LiveProvider } from "react-live";

import { DemoErrorBoundary, DemoFallback } from "@/components/preview/demo-error-boundary";

type LiveDemoProps = {
  code: string;
  replayKey?: number;
  className?: string;
};

export function LiveDemo({ code, replayKey = 0, className }: LiveDemoProps) {
  return (
    <DemoErrorBoundary key={replayKey} fallback={<DemoFallback />}>
      <LiveProvider code={code} scope={{ React, motion }}>
        <div className={className}>
          <LivePreview />
        </div>
        <LiveError className="m-3 rounded-xl bg-pink/50 p-3 font-mono text-[11px] leading-5 text-foreground" />
      </LiveProvider>
    </DemoErrorBoundary>
  );
}
