import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-6 text-center">
      <div><span className="mx-auto grid size-16 place-items-center rounded-full bg-lemon font-display text-2xl font-bold text-[#111111]">404</span><h1 className="mt-6 font-display text-5xl font-bold tracking-tight">Nothing rendered here.</h1><p className="mt-3 text-copy">Try searching the component library instead.</p><Link href="/" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-sm font-bold text-background">Back to Vibehoarder</Link></div>
    </main>
  );
}
