import { ProjectTitle } from "@/components/project-title";
import { ScreenshotFrame } from "@/components/screenshot-frame";
import { SectionHeading } from "@/components/section-heading";
import { NeedsCopy, Paragraph, TextValue } from "@/components/text-value";
import { buttonVariants } from "@/components/ui/button-styles";
import { isPlaceholder, site, type Project } from "@/content/site";
import { cn } from "@/lib/utils";

export function Projects({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="projects" tabIndex={-1} className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <SectionHeading
          index="04"
          title="Projects"
          lede="Brewstige and Zeto are the projects on record. The third card is an open slot."
          as={heading}
        />
        <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2">
          {site.projects.map((project) => (
            <li key={project.slug}>
              <a
                href={`/work/${project.slug}/`}
                className="text-lg text-blue-bright underline underline-offset-4"
              >
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="project-gallery" data-gallery>
        <div className="project-progress mx-auto mb-4 hidden w-full max-w-6xl items-center gap-4 px-5 md:px-10 lg:flex">
          <span data-gallery-index className="font-display text-lg font-semibold text-amber">
            01
          </span>
          <span className="text-lg text-muted">/ {String(site.projects.length).padStart(2, "0")}</span>
          <div className="h-0.5 flex-1 bg-line" aria-hidden="true">
            <div data-gallery-bar className="h-full origin-left bg-blue" style={{ transform: "scaleX(0)" }} />
          </div>
          <button type="button" data-gallery-step="-1" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-4")}>
            Prev
          </button>
          <button type="button" data-gallery-step="1" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-4")}>
            Next
          </button>
        </div>
        <div className="project-viewport" data-gallery-viewport>
          <div className="project-track px-5 md:px-10 lg:px-0">
            {site.projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      id={project.slug === "brewstige" ? "brewstige" : `project-${project.slug}`}
      tabIndex={project.slug === "brewstige" ? -1 : undefined}
      className={cn(
        "project-card flex min-h-[28rem] flex-col bg-panel p-6 md:p-8",
        project.placeholder ? "border border-dashed border-amber" : "card-offset",
      )}
    >
      <div className="flex items-center justify-between gap-4 text-lg">
        <span className="font-semibold text-amber">{String(index + 1).padStart(2, "0")}</span>
        {isPlaceholder(project.year) ? <TextValue value={project.year} /> : <span>{project.year}</span>}
      </div>
      <div className="mt-8">
        <a href={`/work/${project.slug}/`} className="inline-block">
          <ProjectTitle project={project} as="h3" />
        </a>
      </div>
      {project.screenshotNote ? (
        <div className="mt-6">
          <ScreenshotFrame note={project.screenshotNote} />
        </div>
      ) : null}
      <Paragraph value={project.summary} className="mt-6 max-w-[32rem]" />
      <Paragraph value={project.context} className="mt-3 max-w-[32rem] text-muted" />
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li key={item} className="border border-line px-3 py-1 text-lg">
            {isPlaceholder(item) ? <NeedsCopy /> : item}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        <a href={`/work/${project.slug}/`} className={buttonVariants()}>
          Case note
        </a>
        <p className="self-center text-lg text-muted">Private repository.</p>
      </div>
    </article>
  );
}
