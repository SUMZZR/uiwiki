"use client";

import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = { failed: boolean };

export class DemoErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("Demo preview failed", error, info.componentStack);
    }
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback ?? <DemoFallback />;
    }

    return this.props.children;
  }
}

export function DemoFallback() {
  return (
    <div className="grid min-h-44 place-items-center rounded-[20px] bg-surface-muted p-6 text-center">
      <div>
        <span className="mx-auto grid size-10 place-items-center rounded-full bg-pink text-lg" aria-hidden>
          ↻
        </span>
        <p className="mt-3 text-sm font-semibold text-foreground">Preview taking a breather</p>
        <p className="mt-1 text-xs text-muted">The prompt and source are still available.</p>
      </div>
    </div>
  );
}
