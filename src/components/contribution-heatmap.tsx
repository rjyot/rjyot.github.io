import type { ContributionDay } from "@/lib/github-contributions";
import { heatmapLegend, heatmapPng } from "@/lib/heatmap-png";

function weeksOf(days: ContributionDay[]) {
  const first = new Date(`${days[0].date}T00:00:00Z`);
  const cells: Array<ContributionDay | null> = [...Array(first.getUTCDay()).fill(null), ...days];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: Array<Array<ContributionDay | null>> = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }
  return weeks;
}

export function ContributionHeatmap({ days }: { days: ContributionDay[] }) {
  const weeks = weeksOf(days);
  const image = heatmapPng(weeks);

  return (
    <div className="mt-6">
      <div
        role="region"
        tabIndex={0}
        aria-label="Contribution calendar for the last year"
        className="overflow-x-auto pb-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-bright"
      >
        {/* The squares are one image so the year grid does not add hundreds of nodes. */}
        <img
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          className="h-auto max-w-none"
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-lg text-muted">
        <span>Less</span>
        {heatmapLegend.map((color) => (
          <span key={color} aria-hidden="true" className="block h-4 w-4" style={{ background: color }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
