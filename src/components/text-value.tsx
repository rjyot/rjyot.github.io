import { isPlaceholder } from "@/content/site";
import { cn } from "@/lib/utils";

function todoClass(value: string) {
  return value.includes("TODO(Ryan)") ? "text-amber" : undefined;
}

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
    return <span className={cn(todoClass(value), className)}>{value}</span>;
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
    return <p className={cn(todoClass(value), className)}>{value}</p>;
  }

  return (
    <p className={className}>
      <NeedsCopy className="mb-2" />
      <span className="block">{value}</span>
    </p>
  );
}
