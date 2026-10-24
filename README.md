# Ryan Jyothis

Personal site for Ryan Jyothis, a Software Engineering student at Queen's University Belfast (2024–present). It is a static Next.js site aimed at summer 2027 internships in the UK and Ireland, from July 2027.

The page is built to stay readable: Lexend for body text, short blocks, high contrast, and a calm-motion mode. The name and the line "I build apps. I break them too." are static HTML. Motion lives in `public/enhance.js`: a particle field and custom cursor that start after the page loads, scroll reveals, magnetic buttons, a horizontal project gallery, and page transitions. The static export drops the Next.js hydration runtime and inlines the stylesheet, so the first paint is the HTML itself.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317).

```bash
npm run lint
npm run build
```

`npm run build` writes a static site to `out/`. It also draws the Open Graph images from `src/content/og-cards.json` with `scripts/render-og.py`: one flat navy template, a big white title, a small tag underneath, and `ryan · rjyot` in the corner. Social tags use the absolute origin in `site.origin` (`https://rjyot.github.io`). Change that string if the public host is different.

`TODO(Ryan)` markers, placeholder copy, and anything a flag has turned off stay visible in `npm run dev`. A dev-only banner counts what still needs Ryan, and can show the list or hide for now. The production build strips that banner and the draft copy, and `scripts/guard-production.mjs` fails the build if any of it is still in the HTML.

The GitHub heatmap is fetched at build time from the public contribution API and written into the page and `/api/github-contributions.json`. No token is used. If that fetch fails, the card falls back to a link. Pinned repositories are not shown. The chest-press goal stays out of the build until `showChestPressGoal` in `src/content/fitness.ts` is set to true and `ChestPressGoal` is rendered. Pattern statuses are saved to `status-history/` on each build. "Patterns moved up this week" stays hidden until a week of those snapshots exists. The Brewstige café-owner count, letter of interest, and paying client stay hidden until `showCafeClaims` in `src/content/site.ts` is set to true.

## Edit the copy

All public copy is in [`src/content/site.ts`](src/content/site.ts).

Search for `PLACEHOLDER` and `TODO(Ryan)`. Replace those strings with real copy. Do not invent employers, grades, awards, dates, or metrics. Do not add a degree title or a graduation year. The study line stays `Software Engineering, Queen's University Belfast (2024–present).`

Facts already filled in come from the public GitHub profile. The only GitHub URL on the site is [github.com/rjyot](https://github.com/rjyot). Other repositories are private, so project pages do not link to them. Brewstige is the Expo / React Native café app. LeetCode patterns and the Arabic word of the day live in [`src/content/learning.ts`](src/content/learning.ts).

To publish an email, set `email` in `site.ts` to the address. Until then the hero and contact section show `TODO(Ryan)` and do not invent a mailto link. Set `cvHref` to a real PDF path before the CV link goes live.

The About section shows two photographs of Belfast, credited in [`src/content/photos.ts`](src/content/photos.ts). The skyline is Thomas Nugent, CC BY-SA 2.0, via Geograph. The Lanyon Building is Man vyi, public domain, via Wikimedia Commons. There is no photo of Ryan and no Brewstige screenshot. Those slots stay as `TODO(Ryan): a real photo` and `TODO(Ryan): app screenshot`. Do not drop in café stock, generated art, or the Expo template icon.

## Motion

- The name and headline are in the first HTML. They do not scramble and they do not start at opacity 0.
- The hero particle field and the custom cursor start after the window `load` event, then on idle, and only when motion is allowed. A static dot field shows before that, and it stays if WebGL fails or motion is off.
- The system setting `prefers-reduced-motion: reduce` turns motion off.
- The **Calm motion** control does the same for this browser and remembers the choice. It cannot override the system setting.

Calm mode skips smooth scroll, the custom cursor, the WebGL field, and the pinned gallery. The words stay on the page.

## Deploy

### Vercel

Import the repository. Framework preset: Next.js. The build command is `npm run build`. This project sets `output: "export"`, so Vercel serves the static `out/` directory. No environment variables are required.

### Any static host

```bash
npm install
npm run build
```

Upload the `out/` folder. Project pages are pre-rendered at `/work/brewstige/`, `/work/zeto/`, and `/work/next/`.
