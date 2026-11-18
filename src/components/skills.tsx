import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="bg-ink px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          title="Skills"
          lede="The tools I build with."
        />
        <div className="space-y-10">
          {site.skills.map((group) => (
            <Reveal key={group.id}>
              <h3 className="text-lg font-semibold text-blue-bright">{group.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-ink px-4 py-4 font-display text-2xl font-semibold tracking-tight transition-colors duration-200 hover:border-blue hover:bg-blue hover:text-ink md:text-3xl"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
