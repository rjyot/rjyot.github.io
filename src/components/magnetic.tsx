"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

import { useMotion } from "@/components/motion-provider";

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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 16, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 170, damping: 16, mass: 0.35 });

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!motionOn || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hot"
    >
      {children}
    </motion.div>
  );
}
