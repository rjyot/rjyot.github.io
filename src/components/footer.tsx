import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="font-display text-2xl font-extrabold">Ryan Jyothis</p>
        <p className="max-w-md text-lg text-muted">
          Belfast. The public GitHub link is the{" "}
          <a href={site.github} className="text-blue-bright underline underline-offset-4">
            rjyot profile
          </a>
          . Other repositories stay private. PLACEHOLDER and TODO(Ryan) lines are waiting on Ryan.
        </p>
      </div>
    </footer>
  );
}
