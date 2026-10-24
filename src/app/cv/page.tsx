import type { Metadata } from "next";

import { PrintCvButton } from "@/components/print-cv-button";
import { site } from "@/content/site";
import { isDev } from "@/lib/publish";

export const metadata: Metadata = {
  title: "CV",
  description: "Ryan Jyothis. Software engineering placement, Citi. From July 2027.",
  alternates: { canonical: `${site.origin}/cv/` },
};

export default function CvPage() {
  return (
    <main id="content" className="bg-ink px-5 pt-24 pb-16">
      <div className="no-print mx-auto mb-6 flex max-w-[210mm] justify-end">
        <PrintCvButton />
      </div>
      <article className="cv-sheet mx-auto w-full max-w-[210mm]">
        <header>
          <h1>Ryan Jyothis</h1>
          <p>{site.citiLine}</p>
          <p>from July 2027</p>
        </header>

        <p className="cv-study">Software Engineering, Queen&apos;s University Belfast, 2024 – present</p>

        <section>
          <h2>Brewstige</h2>
          <p>I co-founded Brewstige and led the frontend, a loyalty app for small cafés that points you to quieter ones.</p>
        </section>

        <section>
          <h2>Team App</h2>
        </section>

        <div className="cv-contact">
          <p>
            <a href={site.github}>github.com/rjyot</a>
          </p>
          {site.email ? (
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          ) : isDev ? (
            <p>TODO(Ryan): email address</p>
          ) : null}
        </div>
      </article>
    </main>
  );
}
