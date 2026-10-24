/**
 * Public contribution calendar for rjyot.
 * Fetched at build time. No token is read, and nothing here is sent to the client
 * except the day counts rendered into the HTML and the static JSON route.
 * Pinned repositories stay off this payload: most of them are private.
 */

const SOURCE = "https://github-contributions-api.jogruber.de/v4/rjyot?y=last";
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubActivity = {
  login: "rjyot";
  total: number;
  from: string;
  to: string;
  asOf: string;
  days: ContributionDay[];
};

export function parseGithubContributions(value: unknown, asOf: string): GithubActivity | null {
  if (!value || typeof value !== "object") return null;
  const contributions = (value as { contributions?: unknown }).contributions;
  if (!Array.isArray(contributions) || contributions.length < 7) return null;

  const days: ContributionDay[] = [];
  for (const item of contributions) {
    if (!item || typeof item !== "object") return null;
    const day = item as { date?: unknown; count?: unknown; level?: unknown };
    if (typeof day.date !== "string" || !DATE.test(day.date)) return null;
    if (typeof day.count !== "number" || !Number.isInteger(day.count) || day.count < 0) return null;
    if (day.level !== 0 && day.level !== 1 && day.level !== 2 && day.level !== 3 && day.level !== 4) {
      return null;
    }
    days.push({ date: day.date, count: day.count, level: day.level });
  }

  const total = days.reduce((sum, day) => sum + day.count, 0);
  if (!Number.isFinite(total)) return null;

  return {
    login: "rjyot",
    total,
    from: days[0].date,
    to: days[days.length - 1].date,
    asOf,
    days,
  };
}

export async function getGithubContributions(): Promise<GithubActivity | null> {
  try {
    const response = await fetch(SOURCE, {
      cache: "force-cache",
      headers: { accept: "application/json", "user-agent": "RyanPersonalSite/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    return parseGithubContributions(await response.json(), new Date().toISOString());
  } catch {
    return null;
  }
}
