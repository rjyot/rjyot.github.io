import { isPlaceholder } from "@/content/site";
import { cn } from "@/lib/utils";

export function NeedsCopy({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block border border-amber px-2 py-0.5 text-base font-semibold text-amber",
        className,
      )}
    >
      Needs copy
    </span>
  );
}

export function TextValue({ value, className }: { value: string; className?: string }) {
  if (!isPlaceholder(value)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      <NeedsCopy className="mr-2 align-middle" />
      <span>{value}</span>
    </span>
  );
}

export function Paragraph({ value, className }: { value: string; className?: string }) {
  if (!isPlaceholder(value)) {
    return <p className={className}>{value}</p>;
  }

  return (
    <p className={className}>
      <NeedsCopy className="mb-2" />
      <span className="block">{value}</span>
    </p>
  );
}
