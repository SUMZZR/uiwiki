import Link from "next/link";

export default function ComponentNotFound() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-6 text-center">
      <div>
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-pink font-display text-2xl font-bold">404</span>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-tight">Pattern not found.</h1>
        <p className="mt-3 text-copy">This component may have moved, but the library is still full of good starting points.</p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-sm font-bold text-background">Browse the library</Link>
      </div>
    </main>
  );
}
