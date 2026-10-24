import { buttonVariants } from "@/components/ui/button-styles";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

const linkClass =
  "text-lg text-paper underline-offset-4 hover:underline aria-[current=true]:text-blue-bright";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink" style={{ viewTransitionName: "site-header" }}>
      <div className="flex h-16 items-center justify-between gap-4 px-5 md:px-10">
        <a href="/#content" className="font-display text-xl font-extrabold tracking-tight">
          RJ
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.id} href={`/#${item.id}`} className={linkClass} data-section-link={item.id}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }), "hidden h-11 px-4 lg:inline-flex")}
            data-calm
            aria-pressed="false"
          >
            Calm motion
          </button>

          <details className="menu lg:hidden">
            <summary className={cn(buttonVariants({ variant: "outline" }), "h-11 cursor-pointer list-none px-4")}>
              Menu
            </summary>
            <div className="menu-panel">
              <div className="flex items-center justify-between">
                <p className="font-display text-2xl font-extrabold">Menu</p>
                <button
                  type="button"
                  className={cn(buttonVariants({ variant: "outline" }), "h-11 px-4")}
                  data-menu-close
                >
                  Close
                </button>
              </div>
              <p id="menu-description" className="mt-3 max-w-sm text-lg text-muted">
                Jump to a section. {site.availability}.
              </p>
              <nav className="mt-8 flex flex-col" aria-label="Sections">
                {nav.map((item, index) => (
                  <a
                    key={item.id}
                    href={`/#${item.id}`}
                    data-section-link={item.id}
                    className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-extrabold text-paper"
                  >
                    <span className="text-lg font-semibold text-amber">{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                ))}
              </nav>
              <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }), "mt-8 h-11 px-4")}
                data-calm
                aria-pressed="false"
              >
                Calm motion
              </button>
              <p className="mt-3 max-w-sm text-lg text-muted" data-calm-note>
                Calm motion turns off the field, smooth scroll, and the custom cursor.
              </p>
            </div>
          </details>
        </div>
      </div>
      <div className="h-0.5 bg-line" aria-hidden="true">
        <div id="scroll-progress" className="h-full origin-left bg-blue" />
      </div>
    </header>
  );
}
