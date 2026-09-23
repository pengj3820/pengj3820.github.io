# PDF Fluid

Plain-English answers to every PDF problem. Static site built with [Astro](https://astro.build), searchable with [Pagefind](https://pagefind.app), hosted on GitHub Pages.

## Develop

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/ and builds the search index
```

## Content

- `src/content/learn/` – PDF basics lessons (Markdown)
- `src/content/questions/` – problem/solution guides (Markdown)

Each file's front matter holds the title, SEO description, quick answer, category, FAQs and related links. Add a new `.md` file and it appears on the site automatically.

## Settings

- `src/config.ts` – site name, categories, and the Google Analytics ID (`gaId`).
- `astro.config.mjs` – `site` is the canonical domain (https://pdffluid.com); `public/CNAME` holds the custom domain.
