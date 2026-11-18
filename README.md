# rjyot.github.io

My personal website. Live at [rjyot.github.io](https://rjyot.github.io).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317). Site copy lives in `src/content/site.ts`.

## Build

```bash
npm run build
```

Needs Python 3 with Pillow and `tesseract` on PATH (used for the Open Graph images). Output goes to `out/`.

## Deploy

Pushing to `main` deploys via GitHub Actions (`.github/workflows/pages.yml`).

One-time setup: the repo must be **public** (free GitHub Pages doesn't serve private repos), and **Settings → Pages → Source** must be set to **GitHub Actions**.
