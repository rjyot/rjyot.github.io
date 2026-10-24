"use client";

import { CustomCursor } from "@/components/custom-cursor";
import { MotionProvider } from "@/components/motion-provider";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll>
        <CustomCursor />
        <Nav />
        {children}
      </SmoothScroll>
    </MotionProvider>
  );
}
