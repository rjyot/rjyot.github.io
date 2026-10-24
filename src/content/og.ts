import cards from "@/content/og-cards.json";
import { site } from "@/content/site";
import { published } from "@/lib/publish";

export type OgCard = (typeof cards)[number];

export function ogCard(id: string): OgCard {
  const card = cards.find((item) => item.id === id);
  if (!card) throw new Error(`Missing OG card for ${id}. Add it to src/content/og-cards.json.`);
  return card;
}

export function ogImage(id: string) {
  const card = ogCard(id);
  return {
    url: `${site.origin}/og/${card.file}`,
    width: 1200,
    height: 630,
    alt: published(card.alt) ?? "Ryan Jyothis",
  };
}
