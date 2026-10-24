import { isPlaceholder } from "@/content/site";
import { isDev, published } from "@/lib/publish";
import { cn } from "@/lib/utils";

function todoClass(value: string) {
  return value.includes("TODO(Ryan)") ? "text-amber" : undefined;
}

export function NeedsCopy({ className }: { className?: string }) {
  if (!isDev) return null;
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
  const text = published(value);
  if (!text) return null;
  if (!isPlaceholder(value)) {
    return <span className={cn(todoClass(text), className)}>{text}</span>;
  }

  return (
    <span className={className}>
      <NeedsCopy className="mr-2 align-middle" />
      <span>{text}</span>
    </span>
  );
}

export function Paragraph({ value, className }: { value: string; className?: string }) {
  const text = published(value);
  if (!text) return null;
  if (!isPlaceholder(value)) {
    return <p className={cn(todoClass(text), className)}>{text}</p>;
  }

  return (
    <p className={className}>
      <NeedsCopy className="mb-2" />
      <span className="block">{text}</span>
    </p>
  );
}
