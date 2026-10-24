import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Paragraph, TextValue } from "@/components/text-value";
import { isPlaceholder, site } from "@/content/site";

export function Experience() {
  return (
    <section id="experience" className="bg-panel px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" title="Experience" lede="Work, Queen's, and two hackathons." />

        <ol className="relative space-y-10 border-l-2 border-blue pl-6 md:pl-10">
          {site.timeline.map((item) => (
            <li key={item.id}>
              <Reveal>
                <article>
                  <p className="text-lg font-semibold text-blue-bright">
                    {item.kind === "work" ? "Work" : "Education"}
                  </p>
                  <h3 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                    {item.href ? (
                      <a href={item.href} className="underline underline-offset-4" rel="noreferrer">
                        {item.org}
                      </a>
                    ) : (
                      item.org
                    )}
                  </h3>
                  {item.title ? (
                    <p className={item.title.includes("TODO(Ryan)") ? "mt-2 text-amber" : "mt-2 text-paper"}>
                      {item.title}
                    </p>
                  ) : null}
                  <p className="mt-2 text-lg text-muted">
                    <TextValue value={item.dates} />
                    <span aria-hidden="true"> · </span>
                    <TextValue value={item.location} />
                  </p>
                  <Paragraph value={item.summary} className="mt-4 max-w-[38rem]" />
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {site.awards.map((award) => (
            <Reveal key={award.id}>
              <article className="h-full border border-line bg-ink p-6">
                <p className="text-lg font-semibold text-amber">
                  {isPlaceholder(award.when) ? <TextValue value={award.when} /> : award.when}
                </p>
                <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight">{award.event}</h3>
                <p className="mt-3">{award.result}</p>
                <p className="mt-3 max-w-[36rem] text-muted">{award.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
