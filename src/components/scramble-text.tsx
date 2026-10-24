"use client";

import { useEffect, useState } from "react";

import { useMotion } from "@/components/motion-provider";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function ScrambleLine({ text, className }: { text: string; className?: string }) {
  const motion = useMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!motion) return;

    let frame = 0;
    const total = 16;
    const id = window.setInterval(() => {
      frame += 1;
      const progress = frame / total;
      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < text.length * progress) return text[index];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(next);
      if (frame >= total) window.clearInterval(id);
    }, 42);

    return () => window.clearInterval(id);
  }, [motion, text]);

  return (
    <span aria-hidden="true" className={className}>
      {motion ? display : text}
    </span>
  );
}
