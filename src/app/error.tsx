"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="content" className="bg-ink px-5 py-32 md:px-10">
      <p className="text-lg font-semibold text-amber">Error</p>
      <h1 className="mt-3 max-w-xl font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">
        This page hit a snag.
      </h1>
      <p className="mt-6 max-w-md">Nothing else is wrong with the site. Try the page again.</p>
      <Button size="lg" className="mt-8" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  );
}
