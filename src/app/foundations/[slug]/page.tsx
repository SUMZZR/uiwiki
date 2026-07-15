import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoonPage } from "@/components/shell/coming-soon-page";
import { foundationPages } from "@/lib/site-nav";

type FoundationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return foundationPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: FoundationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = foundationPages.find((item) => item.slug === slug);
  return page ? { title: page.title } : {};
}

export default async function FoundationPage({ params }: FoundationPageProps) {
  const { slug } = await params;
  const page = foundationPages.find((item) => item.slug === slug);

  if (!page) notFound();

  return (
    <ComingSoonPage
      eyebrow="Foundations"
      title={page.title}
      description="This foundation is already part of the Vibehoarder roadmap. The navigation and route are ready for the full reference when it lands."
      icon={page.icon}
    />
  );
}
