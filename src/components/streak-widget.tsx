import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { githubStreak, site } from "@/content/site";
import type { GithubActivity } from "@/lib/github-contributions";

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

function formatDay(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function StreakWidget({ activity }: { activity: GithubActivity | null }) {
  const streak = githubStreak;

  return (
    <article className="flex flex-col justify-between border-t-4 border-blue bg-ink p-6">
      <div>
        <h3 className="font-display text-3xl font-extrabold tracking-tight">GitHub</h3>
        {activity ? (
          <>
            <p className="mt-5 text-lg text-paper">{activity.total} contributions in the last year.</p>
            <p className="mt-3 text-lg text-muted">
              <time dateTime={activity.asOf}>{formatUpdated(activity.asOf)}</time>
              {". "}
              {formatDay(activity.from)} – {formatDay(activity.to)}.
            </p>
            <ContributionHeatmap days={activity.days} />
          </>
        ) : (
          <p className="mt-5 text-lg text-paper">See my activity on GitHub.</p>
        )}
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
        ) : null}
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
