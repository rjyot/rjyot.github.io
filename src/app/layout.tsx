import type { Metadata } from "next";
import { Bricolage_Grotesque, Lexend } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";

import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
  weight: ["600", "700", "800"],
});

const body = Lexend({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Ryan Jyothis · Software Engineering",
    template: "%s · Ryan Jyothis",
  },
  description: `${site.tagline} MEng student at Queen's University Belfast, open to summer 2027 software engineering internships in the UK and Ireland.`,
  authors: [{ name: site.name, url: site.github }],
  applicationName: site.name,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-ink text-paper">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
