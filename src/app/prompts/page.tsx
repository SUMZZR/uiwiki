import type { Metadata } from "next";
import { MessageSquareText } from "lucide-react";

import { ComingSoonPage } from "@/components/shell/coming-soon-page";

export const metadata: Metadata = { title: "Prompts Guide" };

export default function PromptsPage() {
  return (
    <ComingSoonPage
      eyebrow="Library"
      title="Prompts Guide"
      description="A practical field guide to describing intent, interaction, constraints, and polish so AI coding tools produce interfaces that feel deliberate."
      icon={MessageSquareText}
    />
  );
}
