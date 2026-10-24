import type { Project } from "@/content/site";

export function ProjectTitle({ project, as }: { project: Project; as: "h1" | "h3" }) {
  const Tag = as;

  return (
    <Tag
      className="font-display text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]"
      style={{ viewTransitionName: `project-${project.slug}` }}
    >
      {project.name}
    </Tag>
  );
}
