import { isDev } from "@/lib/publish";
import { cn } from "@/lib/utils";

export function ScreenshotFrame({ note, shape = "wide" }: { note: string; shape?: "wide" | "phone" }) {
  if (!isDev) return null;
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-end border border-dashed border-amber bg-ink p-4",
        shape === "phone" ? "aspect-[9/16] max-w-[15rem]" : "h-40",
      )}
    >
      <p className="text-lg text-amber">{note}</p>
    </div>
  );
}
