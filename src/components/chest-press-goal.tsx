import { fitness, fitnessConfig } from "@/content/fitness";

const radius = 54;
const circumference = 2 * Math.PI * radius;

export function ChestPressGoal() {
  if (!fitnessConfig.showChestPressGoal) return null;

  const { label, start, current, target, unit, deadline } = fitness.goal;
  const span = target - start;
  const progress = span > 0 ? Math.min(1, Math.max(0, (current - start) / span)) : 0;
  const drawn = circumference * progress;
  const deadlineLabel = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${deadline}T00:00:00Z`));

  return (
    <article className="flex h-full flex-col border-t-4 border-blue bg-ink p-6" aria-label={label}>
      <h3 className="font-display text-3xl font-extrabold tracking-tight">{label}</h3>
      <div className="mt-6 flex items-center gap-6">
        <svg viewBox="0 0 140 140" className="h-36 w-36 shrink-0" aria-hidden="true">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#8aa0b8" strokeWidth="10" />
          <circle
            className="goal-arc"
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#3d7eff"
            strokeWidth="10"
            strokeLinecap="butt"
            transform="rotate(-90 70 70)"
            style={{
              strokeDasharray: `${circumference}`,
              strokeDashoffset: `${circumference - drawn}`,
              ["--goal-circ" as string]: `${circumference}`,
            }}
          />
        </svg>
        <div>
          <p className="font-display text-5xl font-extrabold tracking-tight text-paper">
            {current} {unit}
          </p>
          <p className="mt-2 text-lg text-paper">
            goal {target} {unit}
          </p>
          <p className="mt-1 text-lg text-muted">
            by <time dateTime={deadline}>{deadlineLabel}</time>
          </p>
        </div>
      </div>
    </article>
  );
}
