import { HeroCanvasSlot } from "@/components/static-field";
import { buttonVariants } from "@/components/ui/button-styles";
import { site } from "@/content/site";
import { isDev, published } from "@/lib/publish";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="bg-ink lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="flex flex-col px-5 pt-24 pb-8 md:px-10 lg:justify-center lg:py-20">
        <p className="font-display text-lg font-semibold text-blue-bright">{site.who}</p>
        <h1
          tabIndex={-1}
          className="mt-3 font-display text-[3.5rem] leading-[0.88] font-extrabold tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]"
        >
          {site.firstName}
          <br />
          {site.lastName}
        </h1>
        <p className="hero-headline mt-4 max-w-[18ch] text-2xl font-semibold leading-snug text-paper lg:text-3xl">
          {site.tagline}
        </p>
        <p className="mt-4 max-w-xl text-lg text-paper">{site.citiLine}</p>
        <p className="mt-2 max-w-xl text-lg">
          <a href="/work/brewstige/" className="font-semibold text-blue-bright underline underline-offset-4">
            {site.proof}
          </a>
        </p>
        {published(site.proofTodo) ? (
          <p className="mt-2 max-w-xl text-lg text-amber">{published(site.proofTodo)}</p>
        ) : null}
        <p className="mt-3 max-w-xl text-lg text-paper">{site.availability}.</p>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-lg">
          <a href="/cv/" className="inline-flex min-h-11 items-center font-semibold text-blue-bright underline underline-offset-4">
            CV
          </a>
          <a href={site.github} className="inline-flex min-h-11 items-center font-semibold text-blue-bright underline underline-offset-4">
            GitHub
          </a>
          {site.email ? (
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Summer 2027 internship")}`}
              className="font-semibold text-blue-bright underline underline-offset-4"
            >
              Email
            </a>
          ) : isDev ? (
            <span className="font-semibold text-amber">{published(`Email · ${site.emailNote}`)}</span>
          ) : null}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className={cn(buttonVariants({ size: "lg" }), "h-11 min-h-11 px-4")}
            data-magnetic
          >
            See the work
          </a>
          <a
            href="#contact"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 min-h-11 px-4")}
            data-magnetic
          >
            Get in touch
          </a>
        </div>
      </div>
      <HeroCanvasSlot />
    </section>
  );
}
