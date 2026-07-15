import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/shell/footer";
import { SearchProvider } from "@/components/search/search-provider";
import { WikiShell } from "@/components/shell/wiki-shell";
import { getAllComponents } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uiwiki.dev"),
  title: {
    default: "Vibehoarder — UI patterns for vibe coding",
    template: "%s · Vibehoarder",
  },
  description:
    "Browse interactive UI patterns, then copy a production-ready prompt or source code.",
  openGraph: {
    title: "Vibehoarder — UI patterns for vibe coding",
    description: "Live UI patterns with precise AI prompts and paste-ready source.",
    siteName: "Vibehoarder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibehoarder — UI patterns for vibe coding",
    description: "Live UI patterns with precise AI prompts and paste-ready source.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const entries = await getAllComponents();
  const searchEntries = entries.map(({ slug, title, category, tags, difficulty }) => ({ slug, title, category, tags, difficulty }));

  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">
        <SearchProvider entries={searchEntries}>
          <WikiShell>
            {children}
            <Footer />
          </WikiShell>
        </SearchProvider>
      </body>
    </html>
  );
}
