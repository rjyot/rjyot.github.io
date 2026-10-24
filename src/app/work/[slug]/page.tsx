import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkArticle } from "@/components/work-article";
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

  const description = isPlaceholder(project.summary)
    ? `${project.name} is listed on Ryan Jyothis's site. The summary is not written yet.`
    : project.summary;
  const pageTitle = `${project.name} · Ryan Jyothis`;
  const url = `${site.origin}/work/${project.slug}/`;

  return {
    title: project.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_GB",
      siteName: site.name,
      title: pageTitle,
      description,
      url,
      images: [
        {
          url: `${site.origin}/og.png`,
          width: 1200,
          height: 630,
          alt: `${project.name}. A project by Ryan Jyothis. Open to internships from July 2027.`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [`${site.origin}/og.png`],
    },
  };
}

export default async function WorkPage(props: WorkPageProps) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return <WorkArticle project={project} />;
}
