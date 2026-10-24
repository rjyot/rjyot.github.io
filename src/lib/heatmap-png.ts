import { crc32, deflateSync } from "node:zlib";

import type { ContributionDay } from "@/lib/github-contributions";

const LEVEL = ["#1e4068", "#2a62c4", "#3d7eff", "#9ec0ff", "#f4f7fb"] as const;
const CELL = 11;
const GAP = 3;

function chunk(type: string, data: Buffer) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const name = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])) >>> 0);
  return Buffer.concat([length, name, data, crc]);
}

function encodePng(width: number, height: number, rgba: Buffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const start = y * (width * 4 + 1);
    raw[start] = 0;
    rgba.copy(raw, start + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    signature,
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function paint(pixels: Buffer, width: number, x: number, y: number, color: string) {
  const red = Number.parseInt(color.slice(1, 3), 16);
  const green = Number.parseInt(color.slice(3, 5), 16);
  const blue = Number.parseInt(color.slice(5, 7), 16);
  for (let row = 0; row < CELL; row += 1) {
    for (let column = 0; column < CELL; column += 1) {
      const index = ((y + row) * width + (x + column)) * 4;
      pixels[index] = red;
      pixels[index + 1] = green;
      pixels[index + 2] = blue;
      pixels[index + 3] = 255;
    }
  }
}

export function heatmapPng(weeks: Array<Array<ContributionDay | null>>) {
  const columns = weeks.length;
  const width = columns * CELL + Math.max(0, columns - 1) * GAP;
  const height = 7 * CELL + 6 * GAP;
  const pixels = Buffer.alloc(width * height * 4);
  weeks.forEach((week, column) => {
    week.forEach((day, row) => {
      if (!day) return;
      paint(pixels, width, column * (CELL + GAP), row * (CELL + GAP), LEVEL[day.level]);
    });
  });
  return {
    src: `data:image/png;base64,${encodePng(width, height, pixels).toString("base64")}`,
    width,
    height,
  };
}

export const heatmapLegend = LEVEL;
