"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useLenis } from "@/components/smooth-scroll";
import { useMotion } from "@/components/motion-provider";
import { ProjectTitle } from "@/components/project-title";
import { SectionHeading } from "@/components/section-heading";
import { NeedsCopy, Paragraph, TextValue } from "@/components/text-value";
import { Button } from "@/components/ui/button";
import { isPlaceholder, site, type Project } from "@/content/site";
import { cn } from "@/lib/utils";

export function Projects() {
  const motion = useMotion();
  const lenis = useLenis();
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<{ start: number; end: number; progress: number } | null>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !motion) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + Math.max(track.scrollWidth - window.innerWidth, 1),
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              triggerRef.current = self;
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
              if (indexRef.current) {
                const index = Math.round(self.progress * (site.projects.length - 1));
                indexRef.current.textContent = String(index + 1).padStart(2, "0");
              }
            },
          },
        });
        triggerRef.current = tween.scrollTrigger ?? null;
      }, section);

      setPinned(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
      triggerRef.current = null;
      setPinned(false);
    };
  }, [motion]);

  function step(direction: number) {
    const trigger = triggerRef.current;
    if (trigger) {
      const span = trigger.end - trigger.start;
      const progress = span > 0 ? (window.scrollY - trigger.start) / span : 0;
      const next = Math.min(Math.max(progress + direction / site.projects.length, 0), 1);
      const top = trigger.start + span * next;
      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: motion ? "smooth" : "auto" });
      return;
    }
    viewportRef.current?.scrollBy({
      left: direction * (viewportRef.current.clientWidth * 0.8),
      behavior: motion ? "smooth" : "auto",
    });
  }

  return (
    <section id="projects" className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <SectionHeading
          index="03"
          title="Projects"
          lede="Brewstige and Zeto are the projects on record. The third card is an open slot."
        />
        <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2">
          {site.projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                transitionTypes={["nav-forward"]}
                className="text-lg text-blue-bright underline underline-offset-4"
              >
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div ref={sectionRef} className={pinned ? "project-gallery is-pinned" : "project-gallery"}>
        <div className="project-progress mx-auto mb-4 hidden w-full max-w-6xl items-center gap-4 px-5 md:px-10 lg:flex">
          <span ref={indexRef} className="font-display text-lg font-semibold text-amber">
            01
          </span>
          <span className="text-lg text-muted">/ {String(site.projects.length).padStart(2, "0")}</span>
          <div className="h-0.5 flex-1 bg-line" aria-hidden="true">
            <div ref={barRef} className="h-full origin-left bg-blue" style={{ transform: "scaleX(0)" }} />
          </div>
          <Button variant="outline" className="h-11 px-4" onClick={() => step(-1)}>
            Prev
          </Button>
          <Button variant="outline" className="h-11 px-4" onClick={() => step(1)}>
            Next
          </Button>
        </div>
        <div ref={viewportRef} className="project-viewport">
          <div ref={trackRef} className="project-track px-5 md:px-10 lg:px-0">
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
        <Link href={`/work/${project.slug}`} transitionTypes={["nav-forward"]} className="inline-block">
          <ProjectTitle project={project} as="h3" />
        </Link>
      </div>
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
        <Button asChild>
          <Link href={`/work/${project.slug}`} transitionTypes={["nav-forward"]}>
            Case note
          </Link>
        </Button>
        {project.href ? (
          <Button asChild variant="outline">
            <a href={project.href} target="_blank" rel="noreferrer">
              Repository
            </a>
          </Button>
        ) : (
          <p className="self-center text-lg text-muted">No public repository.</p>
        )}
      </div>
    </article>
  );
}
