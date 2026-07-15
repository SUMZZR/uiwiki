import type { LucideIcon } from "lucide-react";

type ComingSoonPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ComingSoonPage({ eyebrow, title, description, icon: Icon }: ComingSoonPageProps) {
  return (
    <main className="ambient-shell mx-auto min-h-[calc(100dvh-4rem)] max-w-[1280px] px-4 py-8 sm:px-8 sm:py-12 md:min-h-dvh lg:px-10">
      <section className="grid min-h-[68vh] place-items-center rounded-[24px] border border-line bg-surface p-8 text-center shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-colors duration-200">
        <div className="max-w-xl">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-lime/25 text-foreground">
            <Icon className="size-6" strokeWidth={1.7} aria-hidden />
          </span>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] sm:text-6xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-copy">{description}</p>
          <span className="mt-7 inline-flex rounded-full bg-surface-muted px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Coming soon</span>
        </div>
      </section>
    </main>
  );
}
