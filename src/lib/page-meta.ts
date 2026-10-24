import type { Metadata } from "next";

import { ogCard, ogImage } from "@/content/og";
import { site } from "@/content/site";
import { published } from "@/lib/publish";

export function pageMeta(id: string, path: string): Metadata {
  const card = ogCard(id);
  const image = ogImage(id);
  const url = `${site.origin}${path}`;
  const title = published(card.title) ?? "Ryan Jyothis";
  const description = published(card.tag) ?? site.description;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      title,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
