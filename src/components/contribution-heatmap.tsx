import type { ContributionDay } from "@/lib/github-contributions";

const LEVEL = ["#1e4068", "#2a62c4", "#3d7eff", "#9ec0ff", "#f4f7fb"] as const;

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

  return (
    <div className="mt-6">
      <div
        tabIndex={0}
        aria-label="Contribution calendar for the last year"
        className="overflow-x-auto pb-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-bright"
      >
        <div className="flex w-max gap-[3px]" aria-hidden="true">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) =>
                day ? (
                  <span
                    key={day.date}
                    title={`${day.date}: ${day.count}`}
                    className="block h-[11px] w-[11px]"
                    style={{ background: LEVEL[day.level] }}
                  />
                ) : (
                  <span key={`empty-${weekIndex}-${dayIndex}`} className="block h-[11px] w-[11px]" />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-lg text-muted">
        <span>Less</span>
        {LEVEL.map((color) => (
          <span key={color} aria-hidden="true" className="block h-4 w-4" style={{ background: color }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
