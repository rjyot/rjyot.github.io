import Image from "next/image";

import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" className="bg-panel px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div className="relative max-w-[240px] pb-3 pr-3">
            <div className="absolute top-3 left-3 h-full w-full bg-blue" aria-hidden="true" />
            <Image
              src="/ryan-avatar.png"
              alt="Portrait of Ryan Jyothis"
              width={420}
              height={420}
              className="relative aspect-square w-full object-cover"
            />
          </div>
        </Reveal>
        <div>
          <SectionHeading index="02" title="About" />
          <div className="max-w-[38rem] space-y-4">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <dl className="mx-auto mt-16 grid max-w-6xl gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {site.stats.map((stat) => (
          <div key={stat.id} className="bg-panel px-5 py-6">
            <dt className="text-lg text-muted">{stat.label}</dt>
            <dd className="mt-2 font-display text-5xl font-extrabold tracking-tight text-paper md:text-6xl">
              <Counter value={stat.value} />
            </dd>
            <dd className="mt-2 text-lg text-blue-bright">{stat.hint}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
