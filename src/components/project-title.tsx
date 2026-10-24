import { ViewTransition } from "react";

import type { Project } from "@/content/site";

export function ProjectTitle({ project, as }: { project: Project; as: "h1" | "h3" }) {
  const Tag = as;

  return (
    <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
      <Tag className="font-display text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
        {project.name}
      </Tag>
    </ViewTransition>
  );
}
