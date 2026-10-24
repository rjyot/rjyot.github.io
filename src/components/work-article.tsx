import Link from "next/link";

import { ProjectTitle } from "@/components/project-title";
import { Paragraph, TextValue } from "@/components/text-value";
import { Button } from "@/components/ui/button";
import { type Project } from "@/content/site";

export function WorkArticle({ project }: { project: Project }) {
  return (
    <main id="content" className="bg-ink px-5 pt-28 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          transitionTypes={["nav-back"]}
          className="text-lg text-blue-bright underline underline-offset-4"
        >
          Back to projects
        </Link>
        <p className="mt-8 text-lg font-semibold text-amber">
          {project.placeholder ? "Open slot" : "Project"}
        </p>
        <div className="mt-3">
          <ProjectTitle project={project} as="h1" />
        </div>
        <Paragraph value={project.summary} className="mt-8 max-w-[38rem]" />
        <Paragraph value={project.context} className="mt-4 max-w-[38rem] text-muted" />
        <p className="mt-6 text-lg">
          <span className="text-muted">Year. </span>
          <TextValue value={project.year} />
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item} className="border border-line px-3 py-1 text-lg">
              <TextValue value={item} />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          {project.href ? (
            <Button asChild size="lg">
              <a href={project.href} target="_blank" rel="noreferrer">
                Repository
              </a>
            </Button>
          ) : (
            <p className="text-lg text-muted">No public repository link yet.</p>
          )}
          <Button asChild size="lg" variant="outline">
            <Link href="/#contact" transitionTypes={["nav-back"]}>
              Get in touch
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
