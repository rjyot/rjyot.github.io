import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Paragraph } from "@/components/text-value";
import { site } from "@/content/site";

export function Now() {
  return (
    <section id="now" className="bg-panel px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          title="Now"
          lede="LeetCode patterns, Arabic, the gym, and a daily GitHub streak. Details stay blank until they are real."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {site.now.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="flex h-full flex-col border-t-4 border-blue bg-ink p-6">
                <div className="flex items-center gap-3">
                  <span className="now-dot" aria-hidden="true" />
                  <h3 className="font-display text-3xl font-extrabold tracking-tight">{item.title}</h3>
                </div>
                <Paragraph value={item.status} className="mt-5" />
                <Paragraph value={item.detail} className="mt-3 text-muted" />
                {item.id === "streak" ? (
                  <a
                    href={site.github}
                    className="mt-5 text-lg text-blue-bright underline underline-offset-4"
                  >
                    GitHub profile
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
