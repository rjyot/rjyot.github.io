"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { Magnetic } from "@/components/magnetic";
import { useMotion } from "@/components/motion-provider";
import { ScrambleLine } from "@/components/scramble-text";
import { StaticField } from "@/components/static-field";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

const HeroField = dynamic(() => import("@/components/hero-field").then((mod) => mod.HeroField), {
  ssr: false,
});

class FieldBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function Hero() {
  const motion = useMotion();
  const [showField, setShowField] = useState(false);

  useEffect(() => {
    if (!motion) return;
    let cancelled = false;
    const start = () => {
      if (!cancelled) setShowField(true);
    };
    const id = window.setTimeout(start, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [motion]);

  return (
    <section className="flex min-h-[100svh] flex-col bg-ink lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="flex flex-1 flex-col justify-end px-5 pb-8 pt-28 md:px-10 lg:justify-center lg:py-28">
        <p className="text-lg font-semibold text-blue-bright">Belfast · Summer 2027</p>
        <h1
          aria-label={site.name}
          className="mt-4 font-display text-[clamp(4.25rem,11vw,8.25rem)] font-extrabold leading-[0.88] tracking-[-0.045em]"
        >
          <ScrambleLine text={site.firstName} className="block" />
          <ScrambleLine text={site.lastName} className="block" />
        </h1>
        <p className="mt-6 max-w-[16ch] text-[clamp(1.5rem,3vw,2.15rem)] leading-snug text-paper">
          {site.tagline}
        </p>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
          MEng Software Engineering at Queen&apos;s University Belfast.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Magnetic>
            <Button asChild size="lg">
              <a href="#projects">See the work</a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Get in touch</a>
            </Button>
          </Magnetic>
        </div>
        <p className="mt-8 max-w-md text-lg text-muted">{site.availability}.</p>
      </div>

      <div
        className="relative h-[30vh] border-t border-line bg-ink lg:h-auto lg:min-h-[100svh] lg:border-t-0 lg:border-l"
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          <StaticField />
        </div>
        {showField ? (
          <FieldBoundary>
            <HeroField />
          </FieldBoundary>
        ) : null}
      </div>
    </section>
  );
}
