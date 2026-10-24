"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { useMotion } from "@/components/motion-provider";

export function Counter({ value }: { value: number }) {
  const motionOn = useMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!motionOn || !inView || !ref.current) return;
    const from = value > 50 ? value - 12 : 0;
    const controls = animate(from, value, {
      duration: value > 50 ? 1.15 : 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, motionOn, value]);

  return <span ref={ref}>{value}</span>;
}
