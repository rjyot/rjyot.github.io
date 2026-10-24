import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export function Contact({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="contact" tabIndex={-1} className="bg-ink px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="07" title="Contact" lede={site.contactNote} as={heading} />
        <div className="border-t border-line">
          {site.contact.map((link) => (
            <a
              key={link.id}
              href={link.href}
              rel="noreferrer me"
              data-magnetic
              className="flex flex-col gap-1 border-b border-line py-6 md:flex-row md:items-baseline md:justify-between"
            >
              <span className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                {link.label}
              </span>
              <span className="text-lg text-blue-bright underline underline-offset-4">{link.handle}</span>
            </a>
          ))}
          {site.email ? (
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Summer 2027 internship")}`}
              className="flex flex-col gap-1 border-b border-line py-6 md:flex-row md:items-baseline md:justify-between"
            >
              <span className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Email</span>
              <span className="text-lg text-blue-bright underline underline-offset-4">{site.email}</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
