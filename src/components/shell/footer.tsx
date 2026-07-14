import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mt-20 flex max-w-[1440px] flex-col gap-4 px-4 pb-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p>UIWiki — an open library for clearer AI-built interfaces.</p>
      <div className="flex gap-5">
        <Link href="/about" className="font-semibold text-copy hover:text-foreground">About</Link>
        <span className="font-mono text-xs">Growing every day</span>
      </div>
    </footer>
  );
}
