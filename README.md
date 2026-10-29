# Ryan Jyothis

Personal site for Ryan Jyothis, a Software Engineering student at Queen's University Belfast (2024–present). It is a static Next.js site aimed at summer 2027 internships in the UK and Ireland, from July 2027.

The page is built to stay readable: Lexend for body text, short blocks, high contrast, and a calm-motion mode. The name and the line "I build apps. I break them too." are static HTML. Motion lives in `public/enhance.js`: a particle field and custom cursor that start after the page loads, scroll reveals, magnetic buttons, a horizontal project gallery, and page transitions. The static export drops the Next.js hydration runtime and inlines the stylesheet, so the first paint is the HTML itself.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317).

`npm run build` also needs Python 3 with Pillow and the `tesseract` binary on PATH (CI installs `python3-pil` and `tesseract-ocr`).

```bash
npm run lint
npm run build
```

`npm run build` writes a static site to `out/`. It also draws the Open Graph images from `src/content/og-cards.json` with `scripts/render-og.py`: one flat navy template, a big white title, a small tag underneath, and `ryan · rjyot` in the corner. Social tags use the absolute origin in `site.origin` (`https://rjyot.github.io`). Change that string if the public host is different.

`TODO(Ryan)` markers, placeholder copy, and anything a flag has turned off stay visible in `npm run dev`. A dev-only banner counts what still needs Ryan, and can show the list or hide for now. The production build strips that banner and the draft copy, and `scripts/guard-production.mjs` fails the build if any of it is still in the HTML, JSON, or Open Graph images.

The GitHub heatmap is fetched at build time from the public contribution API and written into the page and `/api/github-contributions.json`. No token is used. If that fetch fails, the card falls back to a link. Pinned repositories are not shown. The chest-press goal stays out of the build until `showChestPressGoal` in `src/content/fitness.ts` is set to true and `ChestPressGoal` is rendered. Pattern statuses are saved to `status-history/` on each build. "Patterns moved up this week" stays hidden until a week of those snapshots exists. The Brewstige café-owner count, letter of interest, and paying client stay hidden until `showCafeClaims` in `src/content/site.ts` is set to true.

## Change your CV

There is no CV PDF in `public/` or `assets/`, and no PDF is linked. The CV is the printable page `src/app/cv/page.tsx`, served at `/cv/`. The hero "CV" link in `src/components/hero.tsx` points at `/cv/`. `cvHref` in `src/content/site.ts` is `null`. Leave it that way until Ryan picks which CV is public.

To change the page, edit `src/app/cv/page.tsx`, keep the route at `/cv/`, and rebuild:

```bash
npm run build
```

## Edit the copy

All public copy is in [`src/content/site.ts`](src/content/site.ts).

Search for `PLACEHOLDER` and `TODO(Ryan)`. Replace those strings with real copy. Do not invent employers, grades, awards, dates, or metrics. Do not add a degree title or a graduation year. The study line stays `Software Engineering, Queen's University Belfast (2024–present).`

Facts already filled in come from the public GitHub profile. The only GitHub URL on the site is [github.com/rjyot](https://github.com/rjyot). Other repositories are private, so project pages do not link to them. Brewstige is the Expo / React Native café app. LeetCode patterns and the Arabic word of the day live in [`src/content/learning.ts`](src/content/learning.ts).

To publish an email, set `email` in `site.ts` to the address. Until then the hero and contact section show `TODO(Ryan)` and do not invent a mailto link. The hero CV link goes to `/cv/`. Do not point it at a PDF until Ryan picks which CV is public.

The About section shows one photograph of Belfast, credited in [`src/content/photos.ts`](src/content/photos.ts). The skyline is Thomas Nugent, CC BY-SA 2.0, via Geograph. There is no photo of Ryan and no Brewstige screenshot. Those slots stay as `TODO(Ryan): a real photo` and `TODO(Ryan): app screenshot`. Do not drop in café stock, generated art, or the Expo template icon.

## Motion

- The name and headline are in the first HTML. They do not scramble and they do not start at opacity 0.
- The hero particle field and the custom cursor start after the window `load` event, then on idle, and only when motion is allowed. A static dot field shows before that, and it stays if WebGL fails or motion is off.
- The system setting `prefers-reduced-motion: reduce` turns motion off.
- The **Calm motion** control does the same for this browser and remembers the choice. It cannot override the system setting.

Calm mode skips smooth scroll, the custom cursor, the WebGL field, and the pinned gallery. The words stay on the page.

## Deploy

### GitHub Pages

This site is published from `main` by [`.github/workflows/pages.yml`](.github/workflows/pages.yml). The workflow installs Pillow and Tesseract, runs `npm run build`, and deploys the `out/` folder. In the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The public URL is [https://rjyot.github.io](https://rjyot.github.io).

### Vercel

Import the repository. Framework preset: Next.js. The build command is `npm run build`. This project sets `output: "export"`, so Vercel serves the static `out/` directory. No environment variables are required.

### Any static host

```bash
npm install
npm run build
```

Upload the `out/` folder. Project pages are pre-rendered at `/work/brewstige/`, `/work/zeto/`, and `/work/next/`.
