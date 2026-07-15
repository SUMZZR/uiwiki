import type { Metadata } from "next";
import { History } from "lucide-react";

import { ComingSoonPage } from "@/components/shell/coming-soon-page";

export const metadata: Metadata = { title: "Changelog" };

export default function ChangelogPage() {
  return (
    <ComingSoonPage
      eyebrow="Resources"
      title="Changelog"
      description="New patterns, library refinements, and notable improvements will be collected here as Vibehoarder keeps growing."
      icon={History}
    />
  );
}
