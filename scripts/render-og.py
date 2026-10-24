#!/usr/bin/env python3
"""One Open Graph template: flat navy, a small tag, a big title.

No gradient, no photo, no avatar. The domain line stays TODO(Ryan).
Fonts: Noto Sans Display and Inter, both SIL Open Font License 1.1.
"""

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
CARDS = json.loads((ROOT / "src/content/og-cards.json").read_text())
OUT = ROOT / "public" / "og"
TAG = ImageFont.truetype(ROOT / "assets/fonts/Inter-Medium.ttf", 28)
FOOT = ImageFont.truetype(ROOT / "assets/fonts/Inter-Medium.ttf", 26)

INK = (7, 17, 28)
BLUE = (61, 126, 255)
TAG_COLOR = (183, 208, 255)
PAPER = (244, 247, 251)
MUTED = (201, 214, 232)
WIDTH = 1200
HEIGHT = 630


def draw_tracked(draw, origin, text, font, fill, tracking):
    x, y = origin
    for character in text:
        draw.text((x, y), character, font=font, fill=fill)
        x += font.getlength(character) + tracking


def title_font(title):
    size = 108 if len(title) <= 16 else 88 if len(title) <= 28 else 72
    return ImageFont.truetype(ROOT / "assets/fonts/NotoSansDisplay-Bold.ttf", size)


def render(card):
    image = Image.new("RGB", (WIDTH, HEIGHT), INK)
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, 18, HEIGHT), fill=BLUE)
    draw_tracked(draw, (80, 168), card["tag"], TAG, TAG_COLOR, 6)
    font = title_font(card["title"])
    draw.text((80, 230), card["title"], font=font, fill=PAPER)
    draw.text((80, 548), "ryan · TODO(Ryan)", font=FOOT, fill=MUTED)
    # The field behind the type stays one flat colour.
    for y in (20, 300, 610):
        if image.getpixel((40, y)) != INK:
            raise SystemExit(f"{card['id']} background is not flat navy")
    if image.getpixel((8, 300)) != BLUE:
        raise SystemExit(f"{card['id']} accent bar is not flat blue")
    path = OUT / card["file"]
    image.save(path, "PNG")
    print(path.relative_to(ROOT), image.size)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for card in CARDS:
        render(card)


if __name__ == "__main__":
    main()
