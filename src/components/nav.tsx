"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useLenis } from "@/components/smooth-scroll";
import { useMotionControls } from "@/components/motion-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { motion, ready, osReduced, toggle } = useMotionControls();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const onHome = pathname === "/";

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [lenis, open]);

  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? window.scrollY / height : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const nodes = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [onHome]);

  const calmLabel = osReduced ? "Motion off" : !ready || motion ? "Calm motion" : "Play motion";

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-5 md:px-10">
        {onHome ? (
          <a href="#content" className="font-display text-xl font-extrabold tracking-tight">
            RJ
          </a>
        ) : (
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="font-display text-xl font-extrabold tracking-tight"
          >
            RJ
          </Link>
        )}

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Sections">
          {nav.map((item) => (
            <SectionLink
              key={item.id}
              id={item.id}
              label={item.label}
              onHome={onHome}
              active={active === item.id}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-11 px-4 lg:inline-flex"
            aria-pressed={osReduced || (ready && !motion)}
            disabled={osReduced}
            onClick={toggle}
          >
            {calmLabel}
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-11 px-4 lg:hidden">
                Menu
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="menu-description">
              <div className="flex items-center justify-between">
                <DialogTitle className="font-display text-2xl font-extrabold">Menu</DialogTitle>
                <Button variant="outline" className="h-11 px-4" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
              <DialogDescription id="menu-description" className="mt-3 max-w-sm text-lg text-muted">
                Jump to a section. {site.availability}.
              </DialogDescription>
              <nav className="mt-10 flex flex-col" aria-label="Sections">
                {nav.map((item, index) => (
                  <SectionLink
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    onHome={onHome}
                    active={active === item.id}
                    large
                    index={String(index + 1).padStart(2, "0")}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </nav>
              <Button
                variant="outline"
                className="mt-10 w-fit"
                aria-pressed={osReduced || (ready && !motion)}
                disabled={osReduced}
                onClick={toggle}
              >
                {calmLabel}
              </Button>
              <p className="mt-3 max-w-sm text-lg text-muted">
                {osReduced
                  ? "Your system asked for reduced motion, so this site stays still."
                  : "Calm motion turns off the field, smooth scroll, and text effects."}
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="h-0.5 bg-line" aria-hidden="true">
        <div id="scroll-progress" className="h-full origin-left bg-blue" style={{ transform: "scaleX(0)" }} />
      </div>
    </header>
  );
}

function SectionLink({
  id,
  label,
  onHome,
  active,
  large = false,
  index,
  onNavigate,
}: {
  id: string;
  label: string;
  onHome: boolean;
  active: boolean;
  large?: boolean;
  index?: string;
  onNavigate?: () => void;
}) {
  const className = cn(
    "underline-offset-4 hover:underline",
    large ? "flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-extrabold" : "text-lg",
    active ? "text-blue-bright" : "text-paper",
  );

  const content = (
    <>
      {index ? <span className="text-lg font-semibold text-amber">{index}</span> : null}
      {label}
    </>
  );

  if (onHome) {
    return (
      <a href={`#${id}`} className={className} aria-current={active ? "true" : undefined} onClick={onNavigate}>
        {content}
      </a>
    );
  }

  return (
    <Link
      href={`/#${id}`}
      transitionTypes={["nav-back"]}
      className={className}
      onClick={onNavigate}
    >
      {content}
    </Link>
  );
}
