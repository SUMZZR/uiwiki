import { ArrowDownRight, Sparkles } from "lucide-react";

type HeroProps = {
  componentCount: number;
  categoryCount: number;
};

export function Hero({ componentCount, categoryCount }: HeroProps) {
  return (
    <section className="grid gap-3 lg:grid-cols-[1.55fr_.75fr]" aria-labelledby="hero-title">
      <div className="relative overflow-hidden rounded-[24px] bg-foreground px-6 py-9 text-white sm:px-10 sm:py-12 lg:min-h-[410px]">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground">
            <Sparkles className="size-3.5" aria-hidden />
            Built for AI coding
          </span>
          <span className="font-mono text-xs text-white/50">EST. 2026</span>
        </div>
        <h1 id="hero-title" className="mt-16 max-w-4xl font-display text-[clamp(3.3rem,8vw,7.25rem)] font-bold leading-[0.84] tracking-[-0.065em]">
          See it.
          <br />
          Prompt it.
          <br />
          <span className="text-lime">Ship it.</span>
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
          Interactive UI patterns with precise prompts and paste-ready React code. Made for the moment between an idea and a working interface.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <div className="flex min-h-48 flex-col justify-between rounded-[24px] bg-lime p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.12em]">Components</span>
            <ArrowDownRight className="size-6" aria-hidden />
          </div>
          <strong className="font-display text-7xl font-bold tracking-[-0.065em]">{componentCount}</strong>
        </div>
        <div className="flex min-h-48 flex-col justify-between rounded-[24px] border border-line bg-white p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Categories</span>
            <span className="size-4 rounded-full bg-cyan" aria-hidden />
          </div>
          <div>
            <strong className="font-display text-7xl font-bold tracking-[-0.065em]">{categoryCount}</strong>
            <p className="mt-2 text-sm text-copy">From tiny feedback states to full-page transitions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
