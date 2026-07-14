import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { SearchProvider } from "@/components/search/search-provider";
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
    default: "UIWiki — UI patterns for AI coding",
    template: "%s · UIWiki",
  },
  description:
    "Browse interactive UI patterns, then copy a production-ready prompt or source code.",
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
          <Header />
          {children}
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
