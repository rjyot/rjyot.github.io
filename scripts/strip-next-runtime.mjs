/**
 * The home page is static HTML. Motion is public/enhance.js.
 * Next still emits the React hydration runtime, and Lighthouse treats that
 * download as render delay. Drop those tags after export. Keep styles,
 * fonts, the Arabic day script, and enhance.js.
 */
import { readFileSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function inlineStyles(html) {
  return html.replace(/<link\b[^>]*\brel="stylesheet"[^>]*>/g, (tag) => {
    const href = tag.match(/\bhref="([^"]+)"/);
    if (!href) return tag;
    const urlPath = href[1].split("?")[0];
    if (!urlPath.startsWith("/_next/")) return tag;
    let css = readFileSync(path.join(outDir, urlPath), "utf8");
    css = css.replace(/url\(\.\.\/media\//g, "url(/_next/static/media/");
    css = css.replace(/<\/style/gi, "<\\/style");
    return `<style>${css}</style>`;
  });
}

function strip(html) {
  const withoutPreload = html.replace(/<link\b[^>]*>/g, (tag) => {
    if (/\brel="preload"/.test(tag) && /\bas="script"/.test(tag)) return "";
    return tag;
  });
  const withoutRuntime = withoutPreload.replace(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
    (full, attrs, body) => {
      if (/src="\/_next\/static\//.test(attrs)) return "";
      if (/__next_f|TURBOPACK/.test(body)) return "";
      return full;
    },
  );
  return inlineStyles(withoutRuntime);
}

const files = await htmlFiles(outDir);
let changed = 0;
for (const file of files) {
  const before = await readFile(file, "utf8");
  const after = strip(before);
  const leftover = [...after.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)]
    .map((match) => match[1])
    .filter((src) => src.includes("/_next/"));
  if (leftover.length > 0 || after.includes("__next_f")) {
    console.error(`${file} still has Next runtime: ${leftover.join(", ") || "__next_f"}`);
    process.exit(1);
  }
  if (!after.includes("/enhance.js")) {
    console.error(`${file} lost enhance.js`);
    process.exit(1);
  }
  if (!after.includes("<style>") || after.includes('rel="stylesheet"')) {
    console.error(`${file} did not inline its stylesheet`);
    process.exit(1);
  }
  if (after !== before) {
    await writeFile(file, after);
    changed += 1;
  }
}

console.log(`stripped Next runtime from ${changed} html files`);
