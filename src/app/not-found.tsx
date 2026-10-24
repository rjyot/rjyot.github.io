import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="content" className="bg-ink px-5 py-32 md:px-10">
      <p className="text-lg font-semibold text-amber">404</p>
      <h1 className="mt-3 max-w-xl font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">
        That page is not here.
      </h1>
      <p className="mt-6 max-w-md">The link might be old. The work lives on the home page.</p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </main>
  );
}
