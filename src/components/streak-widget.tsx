import { githubStreak, site } from "@/content/site";

function formatUpdated(iso: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/London",
    timeZoneName: "short",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const pick = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `Updated ${pick("hour")}:${pick("minute")} ${pick("timeZoneName")}, ${pick("day")} ${pick("month")} ${pick("year")}`;
}

export function StreakWidget() {
  const streak = githubStreak;

  return (
    <article className="flex min-h-48 flex-col justify-between border-t-4 border-blue bg-ink p-6">
      <div>
        <h3 className="font-display text-3xl font-extrabold tracking-tight">GitHub</h3>
        {streak ? (
          <>
            <p className="mt-5 text-lg text-paper">
              Current streak: {streak.days} days. Days are counted on the Europe/London boundary, the same
              day GitHub uses for this profile.
            </p>
            <p className="mt-3 text-lg text-muted">
              <time dateTime={streak.asOf}>{formatUpdated(streak.asOf)}</time>
            </p>
          </>
        ) : (
          <p className="mt-5 text-lg text-paper">See my activity on GitHub.</p>
        )}
      </div>
      <a
        href={site.github}
        className="mt-5 text-lg font-semibold text-blue-bright underline underline-offset-4"
      >
        rjyot on GitHub
      </a>
    </article>
  );
}
