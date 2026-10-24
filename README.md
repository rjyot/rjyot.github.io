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

`npm run build` writes a static site to `out/`.

## Edit the copy

All public copy is in [`src/content/site.ts`](src/content/site.ts).

Search for `PLACEHOLDER` and `TODO(Ryan)`. Replace those strings with real copy. Do not invent employers, grades, awards, dates, or metrics. Do not add a degree title or a graduation year. The study line stays `Software Engineering, Queen's University Belfast (2024–present).`

Facts already filled in come from the public GitHub profile. The only GitHub URL on the site is [github.com/rjyot](https://github.com/rjyot). Other repositories are private, so project pages do not link to them. Brewstige is the Expo / React Native café app. LeetCode patterns and the Arabic word of the day live in [`src/content/learning.ts`](src/content/learning.ts).

To publish an email, set `email` in `site.ts` to the address. Until then the contact section does not invent a mailto link.

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
