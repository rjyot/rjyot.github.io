"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion-provider";
import { cn } from "@/lib/utils";

export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const motionOn = useMotion();
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!motionOn || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const dx = (event.clientX - (bounds.left + bounds.width / 2)) * strength;
    const dy = (event.clientY - (bounds.top + bounds.height / 2)) * strength;
    ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      ref={ref}
      className={cn("magnetic", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hot"
    >
      {children}
    </div>
  );
}
