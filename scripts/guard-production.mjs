/**
 * Fail the production build if TODO(Ryan), draft copy, or flagged-off
 * content appears anywhere in the shipped output: HTML, JSON, or OG images.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");

function filesUnder(dir, extensions) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...filesUnder(full, extensions));
    else if (extensions.some((extension) => entry.name.endsWith(extension))) files.push(full);
  }
  return files;
}

function readOutput(file) {
  if (file.endsWith(".png")) {
    const text = execFileSync("tesseract", [file, "stdout", "--psm", "6"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    if (text.trim().length < 8) {
      throw new Error(`could not read text from ${file}`);
    }
    return text;
  }
  return readFileSync(file, "utf8");
}

function flagOff(file, name) {
  const source = readFileSync(path.join(root, file), "utf8");
  return new RegExp(`${name}\\s*:\\s*false`).test(source);
}

function visibleText(html) {
  const withoutCode = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  const labelled = [...withoutCode.matchAll(/\b(?:alt|aria-label|content|title)="([^"]*)"/gi)].map(
    (match) => match[1],
  );
  const text = withoutCode.replace(/<[^>]+>/g, " ");
  return `${text} ${labelled.join(" ")}`.replace(/\s+/g, " ");
}

const alwaysForbidden = [
  /TODO\(Ryan\)/i,
  /\bPLACEHOLDER\b/,
  /Needs copy/i,
  /built the Supabase backend/i,
  /\bMEng\b/,
  /\bBEng\b/,
  /\b2029\b/,
];

const bannerForbidden = [
  /data-dev-banner/,
  /things still need Ryan/,
  /thing still needs Ryan/,
  /Nothing left for Ryan/,
  /Hidden on the live site/,
  /Hide for now/,
  /Show list/,
  /Hide list/,
];

const flagged = [];
if (flagOff("src/content/fitness.ts", "showFootball")) {
  flagged.push([/playing football/i, "football copy"]);
  flagged.push([/play football/i, "football copy"]);
  flagged.push([/Twice a week/i, "football copy"]);
}
if (flagOff("src/content/fitness.ts", "showSessionCount")) {
  flagged.push([/\b4 sessions\b/, "session count"]);
  flagged.push([/Volume per session/i, "session chart"]);
  flagged.push([/Bar chart of weight lifted per gym session/i, "session chart"]);
  flagged.push([/3,374|\b3374\b/, "session chart"]);
  flagged.push([/2,870|\b2870\b/, "session chart"]);
  flagged.push([/3,377|\b3377\b/, "session chart"]);
  flagged.push([/\b14 Oct\b/i, "session chart"]);
  flagged.push([/\b14 October\b/i, "session chart"]);
  flagged.push([/\b16 October\b/i, "session chart"]);
  flagged.push([/\b23 October\b/i, "session chart"]);
}
if (flagOff("src/content/fitness.ts", "showChestPressGoal")) {
  flagged.push([/75 kg/i, "chest-press goal"]);
  flagged.push([/chest press goal/i, "chest-press goal"]);
}
if (flagOff("src/content/site.ts", "showRealWorldImpact")) {
  flagged.push([/Best Real World Impact/i, "hack award"]);
  flagged.push([/runner-up/i, "hack award"]);
}
if (flagOff("src/content/site.ts", "showCafeClaims")) {
  flagged.push([/13 Belfast café owners/i, "café claims"]);
  flagged.push([/paying client/i, "café claims"]);
  flagged.push([/letter of interest/i, "café claims"]);
}
if (flagOff("src/content/learning.ts", "showCounts")) {
  flagged.push([/cards seen/i, "learning counts"]);
  flagged.push([/notes in the deck/i, "learning counts"]);
}

const failures = [];
const outputs = [
  ...filesUnder(outDir, [".html", ".json"]),
  ...filesUnder(path.join(outDir, "og"), [".png"]),
];
for (const file of outputs) {
  const raw = readOutput(file);
  const text = file.endsWith(".html") ? `${raw}\n${visibleText(raw)}` : raw;
  const rel = path.relative(root, file);
  for (const pattern of alwaysForbidden) {
    if (pattern.test(text)) failures.push(`${rel} still contains ${pattern}`);
  }
  for (const pattern of bannerForbidden) {
    if (pattern.test(text)) failures.push(`${rel} still contains the dev banner (${pattern})`);
  }
  for (const [pattern, label] of flagged) {
    if (pattern.test(text)) failures.push(`${rel} still contains flagged-off ${label} (${pattern})`);
  }
}

if (failures.length > 0) {
  console.error("Production guard failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`production guard passed (${outputs.length} html, json, and og files)`);
