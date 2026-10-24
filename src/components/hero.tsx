import { HeroCanvasSlot } from "@/components/static-field";
import { buttonVariants } from "@/components/ui/button-styles";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="flex min-h-[100svh] flex-col bg-ink lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="flex flex-1 flex-col justify-end px-5 pb-8 pt-28 md:px-10 lg:justify-center lg:py-28">
        <p className="text-lg font-semibold text-blue-bright">Belfast</p>
        <h1 className="mt-4 font-display text-[clamp(4.25rem,11vw,8.25rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
          {site.firstName}
          <br />
          {site.lastName}
        </h1>
        <p className="hero-headline mt-6 max-w-[14ch] text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold leading-snug text-paper">
          {site.tagline}
        </p>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{site.study}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className={buttonVariants({ size: "lg" })} data-magnetic>
            See the work
          </a>
          <a href="#contact" className={buttonVariants({ size: "lg", variant: "outline" })} data-magnetic>
            Get in touch
          </a>
          <a
            href={site.github}
            className="inline-flex h-14 items-center text-lg font-semibold text-blue-bright underline underline-offset-4"
          >
            GitHub
          </a>
        </div>
        <p className="mt-8 max-w-xl text-lg text-paper">{site.availability}.</p>
        <p className="mt-2 text-lg text-muted">UK and Ireland.</p>
      </div>
      <HeroCanvasSlot />
    </section>
  );
}
