import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkArticle } from "@/components/work-article";
import { ogCard, ogImage } from "@/content/og";
import { getProject, isPlaceholder, site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.map((project) => ({ slug: project.slug }));
}

type WorkPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: WorkPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };

  const card = ogCard(project.slug);
  const image = ogImage(project.slug);
  const description = isPlaceholder(project.summary)
    ? `${project.name} is listed on Ryan Jyothis's site. The summary is not written yet.`
    : project.summary;
  const url = `${site.origin}/work/${project.slug}/`;

  return {
    title: project.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
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

export default async function WorkPage(props: WorkPageProps) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return <WorkArticle project={project} />;
}
