import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkArticle } from "@/components/work-article";
import { ogCard, ogImage } from "@/content/og";
import { getProject, isPlaceholder, isPublicProject, site } from "@/content/site";
import { published } from "@/lib/publish";

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects
    .filter((project) => process.env.NODE_ENV === "development" || isPublicProject(project))
    .map((project) => ({ slug: project.slug }));
}

type WorkPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: WorkPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };

  const card = ogCard(project.slug);
  const image = ogImage(project.slug);
  const title = published(card.title) ?? published(project.name) ?? "Project";
  const description =
    published(isPlaceholder(project.summary) ? card.tag : project.summary) ?? title;
  const url = `${site.origin}/work/${project.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
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

export default async function WorkPage(props: WorkPageProps) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return <WorkArticle project={project} />;
}
