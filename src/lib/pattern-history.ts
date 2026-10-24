import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { learning, type PatternStatus } from "@/content/learning";

const RANK: Record<PatternStatus, number> = {
  not_started: 0,
  learning: 1,
  mastered: 2,
};

type Snapshot = {
  date: string;
  patterns: { number: number; status: PatternStatus }[];
};

function historyDir() {
  return path.join(process.cwd(), "status-history");
}

/** Save today's pattern statuses. Comparison is by pattern number, not name. */
export function recordPatternSnapshot(date: string) {
  const dir = historyDir();
  mkdirSync(dir, { recursive: true });
  const snapshot: Snapshot = {
    date,
    patterns: learning.leetcode.patterns.map((pattern) => ({
      number: pattern.number,
      status: pattern.status,
    })),
  };
  writeFileSync(path.join(dir, `${date}.json`), `${JSON.stringify(snapshot, null, 2)}\n`);
}

function shiftDate(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * How many patterns rank higher than they did seven days ago.
 * Null until a week of build snapshots exists, and the caller hides the line.
 */
export function patternsMovedUp(today: string): number | null {
  const dir = historyDir();
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir)
    .filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/.test(name))
    .sort();
  if (files.length < 7) return null;
  const priorName = `${shiftDate(today, -7)}.json`;
  if (!files.includes(priorName)) return null;
  const prior = JSON.parse(readFileSync(path.join(dir, priorName), "utf8")) as Snapshot;
  const priorByNumber = new Map(prior.patterns.map((pattern) => [pattern.number, pattern.status]));
  let moved = 0;
  for (const pattern of learning.leetcode.patterns) {
    const before = priorByNumber.get(pattern.number);
    if (!before) continue;
    if (RANK[pattern.status] > RANK[before]) moved += 1;
  }
  return moved;
}
