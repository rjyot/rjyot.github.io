import { CreditedPhoto } from "@/components/credited-photo";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { belfastPhotos } from "@/content/photos";
import { site } from "@/content/site";

export function About({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="about" tabIndex={-1} className="bg-panel px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div>
            <div className="relative max-w-[240px] pb-3 pr-3">
              <div className="absolute top-3 left-3 h-full w-full bg-blue" aria-hidden="true" />
              <div className="relative flex aspect-square w-full items-end bg-ink p-4">
                <p className="text-lg text-amber">TODO(Ryan): a real photo.</p>
              </div>
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHeading index="02" title="About" className="mb-5" as={heading} />
          <div className="rise max-w-[38rem] space-y-4">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl">
        <p className="max-w-[38rem] text-lg text-muted">
          Photographs of Belfast. These are not pictures of Ryan, and they are not the app.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {belfastPhotos.map((photo) => (
            <CreditedPhoto key={photo.id} photo={photo} />
          ))}
        </div>
      </div>

      <dl className="mx-auto mt-14 grid max-w-6xl gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {site.facts.map((fact) => (
          <div key={fact.id} className="bg-panel px-5 py-6">
            <dt className="text-lg text-muted">{fact.label}</dt>
            <dd
              className={
                fact.value.startsWith("TODO")
                  ? "mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-amber md:text-4xl"
                  : "mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-paper md:text-4xl"
              }
            >
              {fact.value}
            </dd>
            <dd className="mt-2 text-lg text-blue-bright">{fact.hint}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
