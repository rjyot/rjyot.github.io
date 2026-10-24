"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type Lenis from "lenis";

import { useMotion } from "@/components/motion-provider";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const motion = useMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!motion) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (!fine || !wide) return;

    let destroyed = false;
    let instance: Lenis | null = null;
    let removeTicker: (() => void) | null = null;

    (async () => {
      const [{ default: LenisCtor }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (destroyed) return;

      gsap.registerPlugin(ScrollTrigger);
      instance = new LenisCtor({
        autoRaf: false,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -88 },
      });
      instance.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        instance?.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      removeTicker = () => gsap.ticker.remove(tick);
      setLenis(instance);
      ScrollTrigger.refresh();
    })();

    return () => {
      destroyed = true;
      removeTicker?.();
      instance?.destroy();
      setLenis(null);
    };
  }, [motion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
