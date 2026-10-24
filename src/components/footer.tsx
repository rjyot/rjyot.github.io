import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="font-display text-2xl font-extrabold">Ryan Jyothis</p>
        <p className="max-w-md text-lg text-muted">
          Belfast. Facts come from the{" "}
          <a href={site.profileReadme} className="text-blue-bright underline underline-offset-4">
            public GitHub profile
          </a>
          . Lines that start with PLACEHOLDER are waiting for copy.
        </p>
      </div>
    </footer>
  );
}
