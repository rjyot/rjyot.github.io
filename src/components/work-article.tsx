import { ProjectTitle } from "@/components/project-title";
import { ScreenshotFrame } from "@/components/screenshot-frame";
import { Paragraph, TextValue } from "@/components/text-value";
import { buttonVariants } from "@/components/ui/button-styles";
import { publicProjectHref, type Project } from "@/content/site";
import { isDev, published } from "@/lib/publish";

export function WorkArticle({ project }: { project: Project }) {
  const href = publicProjectHref(project.href);

  return (
    <main id="content" className="bg-ink px-5 pt-28 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <a href="/#projects" className="text-lg text-blue-bright underline underline-offset-4">
          Back to projects
        </a>
        <p className={`mt-8 text-lg font-semibold ${project.label ? "text-blue-bright" : "text-amber"}`}>
          {project.label ?? (project.placeholder ? "Open slot" : "Project")}
        </p>
        <div className="mt-3">
          <ProjectTitle project={project} as="h1" />
        </div>
        {project.held ? <p className="mt-4 text-lg text-muted">{project.held}</p> : null}
        {isDev && project.screenshotNote ? (
          <div className="mt-8">
            <ScreenshotFrame note={project.screenshotNote} shape="phone" />
          </div>
        ) : null}
        {project.contribution ? (
          <Paragraph value={project.contribution} className="mt-8 max-w-[38rem]" />
        ) : null}
        {published(project.contributionNote) ? (
          <p className="mt-4 max-w-[38rem] text-lg text-amber">{published(project.contributionNote)}</p>
        ) : null}
        <Paragraph
          value={project.summary}
          className={project.contribution ? "mt-4 max-w-[38rem]" : "mt-8 max-w-[38rem]"}
        />
        {project.points && project.points.length > 0 ? (
          <ul className="mt-6 max-w-[38rem] list-disc space-y-2 pl-5 text-lg marker:text-blue-bright">
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}
        <Paragraph value={project.context} className="mt-4 max-w-[38rem] text-muted" />
        {published(project.year) ? (
          <p className="mt-6 text-lg">
            <span className="text-muted">Year. </span>
            <TextValue value={project.year} />
          </p>
        ) : null}
        {project.stack.some((item) => published(item)) ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.filter((item) => published(item)).map((item) => (
              <li key={item} className="border border-line px-3 py-1 text-lg">
                <TextValue value={item} />
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <p className="text-lg text-muted">
            {href ? "External link." : "Private repository. This page does not link to code."}
          </p>
          {href ? (
            <a href={href} className={buttonVariants({ size: "lg", variant: "outline" })} rel="noreferrer">
              Open
            </a>
          ) : null}
          <a href="/#contact" className={buttonVariants({ size: "lg" })}>
            Get in touch
          </a>
        </div>
      </div>
    </main>
  );
}
