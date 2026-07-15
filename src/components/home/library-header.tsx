import { Boxes, Layers3 } from "lucide-react";

type LibraryHeaderProps = {
  componentCount: number;
  categoryCount: number;
};

export function LibraryHeader({ componentCount, categoryCount }: LibraryHeaderProps) {
  return (
    <header className="border-b border-line pb-8" aria-labelledby="library-heading">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Pattern library</p>
      <div className="mt-3 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] xl:items-end">
        <div>
          <h1 id="library-heading" className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.045em]">
            Pick a starting point.
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-copy">
              <Boxes className="size-3.5 text-muted" aria-hidden />
              <strong className="font-mono text-foreground">{componentCount}</strong> Components
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-copy">
              <Layers3 className="size-3.5 text-muted" aria-hidden />
              <strong className="font-mono text-foreground">{categoryCount}</strong> Categories
            </span>
          </div>
        </div>
        <p className="max-w-xl text-sm leading-6 text-copy xl:justify-self-end xl:text-right">
          Every preview is live. Hover to replay, then open a pattern for its exact prompt and source.
        </p>
      </div>
    </header>
  );
}
