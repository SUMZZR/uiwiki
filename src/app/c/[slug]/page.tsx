import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { DetailWorkbench } from "@/components/detail/detail-workbench";
import { categoryLabels } from "@/lib/categories";
import { getAllComponents, getComponentBySlug } from "@/lib/content";

type DetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await getAllComponents();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getComponentBySlug(slug);

  if (!entry) return {};

  return {
    title: entry.title,
    description: `Copy the prompt or source code for ${entry.title}.`,
  };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const entry = await getComponentBySlug(slug);

  if (!entry) notFound();

  return (
    <main className="ambient-shell mx-auto min-h-screen max-w-[1360px] px-4 py-8 sm:px-8 sm:py-12 lg:px-10">
      <Link className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold text-copy transition-all duration-200 hover:-translate-y-0.5" href="/">
        <ArrowLeft className="size-4" aria-hidden /> All components
      </Link>
      <div className="mt-10 flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-lime px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#111111]">{categoryLabels[entry.category]}</span>
            <span className="inline-flex rounded-full bg-surface-muted px-3 py-1.5 text-xs font-bold capitalize text-copy">{entry.difficulty}</span>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold tracking-[-0.05em] sm:text-7xl">{entry.title}</h1>
        </div>
        <div className="flex max-w-md flex-wrap gap-2 lg:justify-end">
          {entry.tags.map((tag) => <span key={tag} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition-colors duration-200">#{tag}</span>)}
        </div>
      </div>
      <DetailWorkbench entry={entry} />
    </main>
  );
}
