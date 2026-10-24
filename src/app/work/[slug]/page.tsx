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

  return {
    title: project.name,
    description: isPlaceholder(project.summary)
      ? `${project.name} is listed on Ryan Jyothis's site. The summary is not written yet.`
      : project.summary,
  };
}

export default async function WorkPage(props: WorkPageProps) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return <WorkArticle project={project} />;
}
