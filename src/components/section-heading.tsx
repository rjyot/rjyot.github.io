import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  title,
  lede,
  className,
  as: Heading = "h2",
}: {
  index: string;
  title: string;
  lede?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <header className={cn("rise mb-8 max-w-3xl", className)}>
      <p className="text-lg font-semibold text-amber">{index}</p>
      <Heading
        tabIndex={Heading === "h1" ? -1 : undefined}
        className="mt-2 font-display text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
      >
        {title}
      </Heading>
      {lede ? <p className="mt-4 max-w-[38rem] text-paper">{lede}</p> : null}
    </header>
  );
}
