# Ryan Jyothis

Personal site for Ryan Jyothis, an MEng Software Engineering student at Queen's University Belfast. It is a static Next.js site aimed at summer 2027 software engineering internships in the UK and Ireland.

The page is built to stay readable: Lexend for body text, short blocks, high contrast, and a calm-motion mode. Motion lives in a cursor-reactive particle field, scroll reveals, text scramble, magnetic buttons, a pinned project gallery, and page transitions.

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

`npm run build` writes a static site to `out/`.

## Edit the copy

All public copy is in [`src/content/site.ts`](src/content/site.ts).

Search for `PLACEHOLDER`. Replace those strings with real copy. Do not invent employers, grades, awards, dates, or metrics. If a number is not known, leave the value as a `PLACEHOLDER` string. The UI marks those lines with "Needs copy".

Facts already filled in come from the public GitHub profile README: [github.com/rjyot/rjyot](https://github.com/rjyot/rjyot). Brewstige is the Expo / React Native café app at [github.com/rjyot/brewstige](https://github.com/rjyot/brewstige).

To publish an email, set `email` in that file to the address. Until then the contact section does not invent a mailto link.

## Motion

- The hero particle field loads after the first paint, and only when motion is allowed. A static dot field shows before that, and it stays if WebGL fails.
- The system setting `prefers-reduced-motion: reduce` turns motion off.
- The **Calm motion** control does the same for this browser and remembers the choice. It cannot override the system setting.

Calm mode skips smooth scroll, the custom cursor, the WebGL field, scramble and split text, the pinned gallery, and the counters' count-up. The words stay on the page.

## Deploy

### Vercel

Import the repository. Framework preset: Next.js. The build command is `npm run build`. This project sets `output: "export"`, so Vercel serves the static `out/` directory. No environment variables are required.

### Any static host

```bash
npm install
npm run build
```

Upload the `out/` folder. Project pages are pre-rendered at `/work/brewstige/`, `/work/zeto/`, and `/work/next/`.
