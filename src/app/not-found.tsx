import type { Metadata } from "next";

import { buttonVariants } from "@/components/ui/button-styles";
import { ogCard, ogImage } from "@/content/og";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const card = ogCard("404");
const image = ogImage("404");
const title = card.title;
const description = card.tag;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: `${site.origin}/404.html` },
  openGraph: {
    title,
    description,
    url: `${site.origin}/404.html`,
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image.url],
  },
};

export default function NotFound() {
  return (
    <main id="content" className="bg-ink px-5 py-32 md:px-10">
      <p className="text-lg font-semibold text-amber">404</p>
      <h1
        tabIndex={-1}
        className="mt-3 max-w-xl font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl"
      >
        I broke this page.
      </h1>
      <p className="mt-6 max-w-md">The link might be old. The work lives on the home page.</p>
      <a href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        Back home
      </a>
    </main>
  );
}
