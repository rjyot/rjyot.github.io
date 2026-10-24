#!/usr/bin/env python3
"""One Open Graph template.

Flat navy field, big white title, small tag underneath, ryan · rjyot in the corner.
No gradient, no photo, no avatar.
Fonts: Noto Sans Display and Inter, both SIL Open Font License 1.1.
"""

import json
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
CARDS = json.loads((ROOT / "src/content/og-cards.json").read_text())
OUT = ROOT / "public" / "og"
DISPLAY_PATH = ROOT / "assets/fonts/NotoSansDisplay-Bold.ttf"
SANS_PATH = ROOT / "assets/fonts/Inter-Medium.ttf"

INK = (7, 17, 28)
WHITE = (255, 255, 255)
TAG = (183, 208, 255)
MUTED = (201, 214, 232)
WIDTH = 1200
HEIGHT = 630
TEXT_WIDTH = 1040


def clean(text):
    """Production cards never draw TODO or PLACEHOLDER copy."""
    text = re.sub(r"TODO\(Ryan\)[^.]*(?:\.|$)", "", text)
    text = re.sub(r"PLACEHOLDER:[^.]*(?:\.|$)", "", text, flags=re.I)
    text = re.sub(r"\bPLACEHOLDER\b", "", text, flags=re.I)
    text = re.sub(r"\s+", " ", text).strip(" .·")
    if re.search(r"TODO\(Ryan\)|PLACEHOLDER", text, re.I):
        raise SystemExit(f"Open Graph text still contains a draft marker: {text}")
    return text


def wrap(text, font, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        if font.getlength(trial) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_title(title):
    size = 96
    while size >= 52:
        font = ImageFont.truetype(DISPLAY_PATH, size)
        lines = wrap(title, font, TEXT_WIDTH)
        if len(lines) <= 3:
            return font, lines, size
        size -= 4
    font = ImageFont.truetype(DISPLAY_PATH, 52)
    return font, wrap(title, font, TEXT_WIDTH), 52


def render(card):
    title = clean(card["title"]) or "Ryan Jyothis"
    tag = clean(card["tag"])
    image = Image.new("RGB", (WIDTH, HEIGHT), INK)
    draw = ImageDraw.Draw(image)
    font, lines, size = fit_title(title)
    y = 128
    for line in lines:
        draw.text((72, y), line, font=font, fill=WHITE)
        y += int(size * 1.08)
    y += 36
    tag_font = ImageFont.truetype(SANS_PATH, 34)
    for line in wrap(tag, tag_font, TEXT_WIDTH):
        draw.text((72, y), line, font=tag_font, fill=TAG)
        y += 46
    foot = ImageFont.truetype(SANS_PATH, 26)
    label = "ryan · rjyot"
    draw.text((WIDTH - 72 - foot.getlength(label), 560), label, font=foot, fill=MUTED)
    for sample_y in (24, 300, 610):
        if image.getpixel((36, sample_y)) != INK:
            raise SystemExit(f"{card['id']} background is not a flat colour")
    path = OUT / card["file"]
    image.save(path, "PNG")
    print(path.relative_to(ROOT), image.size, f"title {size}px", f"{len(lines)} lines")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for card in CARDS:
        render(card)


if __name__ == "__main__":
    main()
