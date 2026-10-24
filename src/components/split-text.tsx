"use client";

import { motion } from "framer-motion";

import { useMotion } from "@/components/motion-provider";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function SplitText({
  text,
  className,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h2" | "h1" | "p";
}) {
  const motionOn = useMotion();

  if (!motionOn) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={cn("inline-block pb-[0.08em]")}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: index * 0.04, ease }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}
