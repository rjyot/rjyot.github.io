import { Magnetic } from "@/components/magnetic";
import { SectionHeading } from "@/components/section-heading";
import { NeedsCopy } from "@/components/text-value";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="bg-ink px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="07" title="Contact" lede={site.contactNote} />
        <div className="border-t border-line">
          {site.contact.map((link) => (
            <Magnetic key={link.id} strength={0.08} className="border-b border-line">
              <a
                href={link.href}
                rel="noreferrer me"
                className="flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:justify-between"
              >
                <span className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                  {link.label}
                </span>
                <span className="text-lg text-blue-bright underline underline-offset-4">{link.handle}</span>
              </a>
            </Magnetic>
          ))}
          <div className="flex flex-col gap-3 border-b border-line py-6 md:flex-row md:items-baseline md:justify-between">
            <div>
              <p className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Email</p>
              <p className="mt-2 max-w-xl">{site.email ?? site.emailPlaceholder}</p>
            </div>
            {site.email ? (
              <a href={`mailto:${site.email}`} className="text-lg text-blue-bright underline underline-offset-4">
                {site.email}
              </a>
            ) : (
              <NeedsCopy />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
