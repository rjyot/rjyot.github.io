import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export function Skills() {
  return (
    <section id="skills" className="bg-ink px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          title="Skills"
          lede="The stack named on the public GitHub profile. No guessed ratings."
        />
        <div className="space-y-10">
          {site.skills.map((group) => (
            <Reveal key={group.id}>
              <h3 className="text-lg font-semibold text-blue-bright">{group.label}</h3>
              <ul className="mt-3 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="bg-ink px-4 py-5 font-display text-2xl font-semibold tracking-tight transition-colors duration-200 hover:bg-blue hover:text-ink md:text-3xl"
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
