import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mt-12 flex max-w-[1680px] flex-col gap-4 border-t border-line px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10">
      <p>Vibehoarder — hoarding UI patterns worth stealing for your next vibe coding session.</p>
      <div className="flex gap-5">
        <Link href="/about" className="font-semibold text-copy hover:text-foreground">About</Link>
        <span className="font-mono text-xs">Growing every day</span>
      </div>
    </footer>
  );
}
