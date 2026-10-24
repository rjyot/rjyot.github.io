import type { Metadata } from "next";

import { ogCard, ogImage } from "@/content/og";
import { site } from "@/content/site";

export function pageMeta(id: string, path: string): Metadata {
  const card = ogCard(id);
  const image = ogImage(id);
  const url = `${site.origin}${path}`;
  return {
    title: card.title,
    description: card.tag,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      title: card.title,
      description: card.tag,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: card.title,
      description: card.tag,
      images: [image.url],
    },
  };
}
