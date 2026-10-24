"use client";

import { useState } from "react";

const items = [
  { text: "TODO(Ryan): what to say about this placement.", file: "src/content/site.ts" },
  { text: "CV PDF · TODO(Ryan)", file: "src/content/site.ts" },
  { text: "Email · TODO(Ryan)", file: "src/content/site.ts" },
  { text: "TODO(Ryan): a real photo.", file: "src/components/about.tsx" },
  { text: "TODO(Ryan): app screenshot", file: "src/content/site.ts" },
  {
    text: "TODO(Ryan): the café-owner count, letter of interest, and paying client are not confirmed.",
    file: "src/content/site.ts",
  },
  {
    text: "TODO(Ryan): confirm the wording, and whether the camera fix is tested on a real Android phone.",
    file: "src/content/site.ts",
  },
  { text: "TODO(Ryan): Hack Belfast team size.", file: "src/content/site.ts" },
  { text: "TODO(Ryan): Best Real World Impact, runner-up", file: "src/content/site.ts" },
  { text: "TODO(Ryan): football", file: "src/components/fitness-panel.tsx" },
  { text: "TODO(Ryan): session count", file: "src/components/fitness-panel.tsx" },
  { text: "TODO(Ryan): 75 kg chest-press goal", file: "src/content/fitness.ts" },
  { text: "TODO(Ryan): glance over before launch.", file: "src/content/learning.ts" },
  { text: "PLACEHOLDER: one sentence on what Zeto does.", file: "src/content/site.ts" },
  { text: "PLACEHOLDER: one sentence on a project to add.", file: "src/content/site.ts" },
  { text: "PLACEHOLDER: start and end dates", file: "src/content/site.ts" },
  { text: "PLACEHOLDER: office location", file: "src/content/site.ts" },
  { text: "TODO(Ryan): learning counts", file: "src/content/learning.ts" },
] as const;

function bannerHeading(count: number) {
  if (count === 0) return "Nothing left for Ryan. Good to ship.";
  if (count === 1) return "1 thing still needs Ryan.";
  return `${count} things still need Ryan.`;
}

export function DevTodoBanner() {
  if (process.env.NODE_ENV !== "development") return null;
  return <DevTodoBannerPanel />;
}

function DevTodoBannerPanel() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  const count = items.length;

  return (
    <aside
      data-dev-banner
      className="fixed inset-x-0 bottom-0 z-50 border-t border-amber bg-ink px-4 py-3 text-base text-amber"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <p className="font-semibold text-paper">{bannerHeading(count)}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {count > 0 ? (
            <button
              type="button"
              className="font-semibold underline underline-offset-4"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Hide list" : "Show list"}
            </button>
          ) : null}
          <button
            type="button"
            className="font-semibold underline underline-offset-4"
            onClick={() => setHidden(true)}
          >
            Hide for now
          </button>
        </div>
      </div>
      <p className="mx-auto mt-1 max-w-6xl text-sm">Dev only. Hidden on the live site.</p>
      {open ? (
        <ul className="mx-auto mt-3 max-h-48 max-w-6xl space-y-1 overflow-auto">
          {items.map((item) => (
            <li key={`${item.file}:${item.text}`}>
              {item.text} · {item.file}
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
