import { getGithubContributions } from "@/lib/github-contributions";

export const dynamic = "force-static";

export async function GET() {
  const activity = await getGithubContributions();
  if (!activity) {
    return Response.json({
      login: "rjyot",
      total: null,
      from: null,
      to: null,
      asOf: null,
      days: null,
    });
  }
  return Response.json(activity);
}
