/**
 * Fail the production build if shipped HTML still shows drafts,
 * TODO(Ryan) markers, or copy that a flag has turned off.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");

function htmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
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

const alwaysForbidden = [/TODO\(Ryan\)/i, /\bPLACEHOLDER\b/i, /Needs copy/i];

const flagged = [];
if (flagOff("src/content/fitness.ts", "showFootball")) {
  flagged.push([/playing football/i, "football copy"]);
  flagged.push([/play football/i, "football copy"]);
  flagged.push([/Twice a week/i, "football copy"]);
}
if (flagOff("src/content/fitness.ts", "showSessionCount")) {
  flagged.push([/\b4 sessions\b/, "session count"]);
}
if (flagOff("src/content/fitness.ts", "showChestPressGoal")) {
  flagged.push([/75 kg/i, "chest-press goal"]);
  flagged.push([/chest press goal/i, "chest-press goal"]);
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
for (const file of htmlFiles(outDir)) {
  const text = visibleText(readFileSync(file, "utf8"));
  const rel = path.relative(root, file);
  for (const pattern of alwaysForbidden) {
    if (pattern.test(text)) failures.push(`${rel} still contains ${pattern}`);
  }
  for (const [pattern, label] of flagged) {
    if (pattern.test(text)) failures.push(`${rel} still contains flagged-off ${label}`);
  }
}

if (failures.length > 0) {
  console.error("Production guard failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`production guard passed (${htmlFiles(outDir).length} html files)`);
