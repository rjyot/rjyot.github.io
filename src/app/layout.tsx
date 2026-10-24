import type { Metadata } from "next";
import { Bricolage_Grotesque, Lexend, Noto_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { site } from "@/content/site";

import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "optional",
  weight: ["600", "800"],
  adjustFontFallback: true,
  preload: true,
});

const body = Lexend({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "optional",
  weight: ["400", "600"],
  adjustFontFallback: true,
  preload: false,
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-family",
  display: "optional",
  weight: ["600"],
  adjustFontFallback: false,
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Ryan Jyothis · Software Engineering",
    template: "%s · Ryan Jyothis",
  },
  description: `${site.tagline} ${site.study} ${site.availability}. UK and Ireland.`,
  authors: [{ name: site.name, url: site.github }],
  applicationName: site.name,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-paper">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <script src="/enhance.js" defer />
      </body>
    </html>
  );
}
