import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Paragraph, TextValue } from "@/components/text-value";
import { isPlaceholder, site } from "@/content/site";
import { published } from "@/lib/publish";

export function Experience({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="experience" tabIndex={-1} className="bg-panel px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" title="Experience" lede="Where I've worked, studied, and competed." as={heading} />

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
                  {published(item.title) ? (
                    <p className={item.title?.includes("TODO(Ryan)") ? "mt-2 text-amber" : "mt-2 text-paper"}>
                      {published(item.title)}
                    </p>
                  ) : null}
                  {published(item.dates) || published(item.location) ? (
                    <p className="mt-2 text-lg text-muted">
                      {published(item.dates) ? <TextValue value={item.dates} /> : null}
                      {published(item.dates) && published(item.location) ? (
                        <span aria-hidden="true"> · </span>
                      ) : null}
                      {published(item.location) ? <TextValue value={item.location} /> : null}
                    </p>
                  ) : null}
                  <Paragraph value={item.summary} className="mt-4 max-w-[38rem]" />
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {site.awards
            .filter((award) => award.id !== "dublin" && Boolean(published(award.event)))
            .map((award) => (
            <Reveal key={award.id}>
              <article className="h-full border border-line bg-ink p-6">
                {published(award.when) ? (
                  <p className="text-lg font-semibold text-amber">
                    {isPlaceholder(award.when) ? <TextValue value={award.when} /> : award.when}
                  </p>
                ) : null}
                <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight">{award.event}</h3>
                {published(award.result) ? (
                  <p className={award.result.includes("TODO(Ryan)") ? "mt-3 text-amber" : "mt-3"}>
                    {published(award.result)}
                  </p>
                ) : null}
                {published(award.detail) ? (
                  <p className="mt-3 max-w-[36rem] text-muted">{published(award.detail)}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
