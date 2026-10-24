import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  title,
  lede,
  className,
}: {
  index: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <header className={cn("rise mb-8 max-w-3xl", className)}>
      <p className="text-lg font-semibold text-amber">{index}</p>
      <h2 className="mt-2 font-display text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
        {title}
      </h2>
      {lede ? <p className="mt-4 max-w-[38rem] text-paper">{lede}</p> : null}
    </header>
  );
}
