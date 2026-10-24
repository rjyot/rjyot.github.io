import { SplitText } from "@/components/split-text";
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
    <header className={cn("mb-10 max-w-3xl md:mb-14", className)}>
      <p className="mb-3 text-lg font-semibold text-amber">{index}</p>
      <SplitText
        text={title}
        className="font-display text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
      />
      {lede ? <p className="mt-5 max-w-[38rem] text-paper">{lede}</p> : null}
    </header>
  );
}
