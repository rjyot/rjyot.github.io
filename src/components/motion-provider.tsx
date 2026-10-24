"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "rj-motion";

type MotionContextValue = {
  /** True only after we know the preference, and the person wants motion. */
  motion: boolean;
  ready: boolean;
  osReduced: boolean;
  toggle: () => void;
};

const MotionContext = createContext<MotionContextValue>({
  motion: false,
  ready: false,
  osReduced: false,
  toggle: () => {},
});

export function useMotion() {
  return useContext(MotionContext).motion;
}

export function useMotionControls() {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [osReduced, setOsReduced] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const reduced = media.matches;
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      const nextEnabled = !reduced && stored !== "off";
      setOsReduced(reduced);
      setEnabled(nextEnabled);
      setReady(true);
      document.documentElement.dataset.motion = nextEnabled ? "on" : "off";
    };

    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const motion = ready && enabled && !osReduced;

  const toggle = useCallback(() => {
    if (osReduced) return;
    setEnabled((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        /* private mode */
      }
      document.documentElement.dataset.motion = next ? "on" : "off";
      return next;
    });
  }, [osReduced]);

  const value = useMemo(
    () => ({ motion, ready, osReduced, toggle }),
    [motion, ready, osReduced, toggle],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
