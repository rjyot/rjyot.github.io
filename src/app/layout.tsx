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

const title = "Ryan Jyothis · Software Engineering";
const ogImage = {
  url: `${site.origin}/og.png`,
  width: 1200,
  height: 630,
  alt: "Ryan Jyothis. I build apps. I break them too. Open to internships from July 2027.",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: title,
    template: "%s · Ryan Jyothis",
  },
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  applicationName: site.name,
  alternates: { canonical: `${site.origin}/` },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title,
    description: site.description,
    url: `${site.origin}/`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [ogImage.url],
  },
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
