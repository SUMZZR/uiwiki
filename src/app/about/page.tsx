import { Bot, Code2, GitCommitHorizontal, ShieldCheck, Sparkles } from "lucide-react";

const flow = [
  { icon: Sparkles, title: "Ideas stay fresh", copy: "A curated pool spans all ten categories and replenishes itself before it runs low.", accent: "bg-lemon" },
  { icon: Bot, title: "Claude drafts", copy: "One request produces the prompt, React implementation, CSS fallback, and isolated live demo.", accent: "bg-cyan" },
  { icon: ShieldCheck, title: "Quality gates", copy: "Zod, TypeScript, static checks, and server rendering reject malformed entries before publication.", accent: "bg-pink" },
  { icon: GitCommitHorizontal, title: "Vercel ships", copy: "Three validated entries are committed to main; the existing Vercel integration handles deployment.", accent: "bg-lime" },
];

export default function AboutPage() {
  return (
    <main className="ambient-shell mx-auto min-h-screen max-w-[1360px] px-4 py-8 sm:px-8 sm:py-12 lg:px-10">
      <section className="grid gap-3 lg:grid-cols-[1.3fr_.7fr]">
        <div className="rounded-[24px] bg-foreground p-7 text-white sm:p-12">
          <span className="inline-flex rounded-full bg-lime px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground">About Vibehoarder</span>
          <h1 className="mt-16 max-w-4xl font-display text-[clamp(3.25rem,7vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.06em]">A visual vocabulary for the AI-first web.</h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/65">Vibehoarder closes the gap between seeing an interaction and describing it precisely enough for an AI coding tool to reproduce. Every pattern combines a live reference, a detailed English prompt, and source you can actually run.</p>
        </div>
        <div className="flex min-h-72 flex-col justify-between rounded-[24px] bg-purple p-7 sm:p-9">
          <Code2 className="size-9" aria-hidden />
          <div>
            <strong className="font-display text-6xl font-bold tracking-[-0.06em]">0</strong>
            <p className="mt-2 max-w-xs text-sm leading-6 text-copy">Databases, admin panels, or manual publishing steps. Content is versioned alongside the code.</p>
          </div>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="pipeline-title">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Daily content pipeline</p>
        <h2 id="pipeline-title" className="mt-2 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">Automatic, but never unchecked.</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {flow.map((step, index) => (
            <article key={step.title} className="flex min-h-72 flex-col justify-between rounded-[24px] border border-line bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between"><span className={`grid size-12 place-items-center rounded-2xl ${step.accent}`}><step.icon className="size-5" aria-hidden /></span><span className="font-mono text-xs text-muted">0{index + 1}</span></div>
              <div><h3 className="font-display text-2xl font-bold tracking-tight">{step.title}</h3><p className="mt-3 text-sm leading-6 text-copy">{step.copy}</p></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
