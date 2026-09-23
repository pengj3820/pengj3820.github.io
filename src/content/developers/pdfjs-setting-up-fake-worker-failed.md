---
title: "Fix pdf.js \"Setting up fake worker failed\""
description: "Why PDF.js shows 'Setting up fake worker failed' or 'No GlobalWorkerOptions.workerSrc specified', and how to load the worker correctly in Vite, webpack or a plain HTML page."
summary: "pdf.js can't load its worker script (pdf.worker.mjs), usually because workerSrc isn't set or points to the wrong URL after bundling. Set pdfjsLib.GlobalWorkerOptions.workerSrc to the worker file from the same pdfjs-dist version, for example with Vite's ?url import or new URL(..., import.meta.url)."
order: 12
tags: ["Error fix", "pdf.js", "JavaScript"]
updated: 2026-09-23
related: ["pdf-wont-open"]
faqs:
  - q: "What is the 'fake worker'?"
    a: "pdf.js normally parses PDFs in a Web Worker so the page stays responsive. If the worker can't start, it falls back to a 'fake worker' that runs the same code on the main thread. That works but can freeze the page on large files, and if even the fallback can't load the worker code, you get 'Setting up fake worker failed'."
  - q: "Can I load the worker from a CDN?"
    a: "Yes, but the worker version must exactly match your pdfjs-dist version. Otherwise pdf.js throws 'The API version \"X\" does not match the Worker version \"Y\"'. Build the URL from pdfjsLib.version so they never drift apart."
  - q: "Why does getDocument say 'expected either data, range, or url parameter'?"
    a: "In current pdf.js versions getDocument takes an object, not a plain string. Use getDocument({ url: '/file.pdf' }) or getDocument({ data: uint8Array })."
---

## The errors

All of these come from the same root cause: **pdf.js can't load its worker script**, `pdf.worker.mjs`.

```text
Error: Setting up fake worker failed: "Failed to fetch dynamically imported module: https://example.com/assets/pdf.worker.mjs".
```

```text
Error: No "GlobalWorkerOptions.workerSrc" specified.
```

```text
Warning: Setting up fake worker.
```

We reproduced each one with **pdfjs-dist 6.3** in Chromium.

## What's going on

pdf.js is split into two files:

- `pdf.mjs`: the API you import.
- `pdf.worker.mjs`: the parser, which runs in a Web Worker.

You tell pdf.js where the worker lives with `GlobalWorkerOptions.workerSrc`. At load time:

1. It tries to start a real Web Worker from `workerSrc`.
2. If that fails, it logs **`Setting up fake worker.`** and tries to import the worker code into the main thread instead.
3. If that fails too, you get **`Setting up fake worker failed: "…"`**. The text in quotes is the real reason, usually a 404.

What we saw in testing:

| Setup | Result |
|---|---|
| `workerSrc` not set | `No "GlobalWorkerOptions.workerSrc" specified.` |
| Wrong `workerSrc`, but `pdf.worker.mjs` sits next to `pdf.mjs` | Warning, then it **silently runs on the main thread** (works, but slower) |
| Wrong `workerSrc`, and the code is bundled (no worker file next to it) | `Setting up fake worker failed: "Failed to fetch dynamically imported module…"` |
| Correct `workerSrc` | Works, no warning |

The second row is sneaky: everything seems fine, but parsing blocks your UI. If you see `Setting up fake worker.` in the console, fix it even if nothing is broken.

## Fix for Vite

Import the worker file as a URL so Vite copies it into the build:

```js
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const pdf = await pdfjsLib.getDocument({ url: '/sample.pdf' }).promise;
console.log(pdf.numPages);
```

## Fix for webpack 5 and other bundlers

The standard `new URL(…, import.meta.url)` pattern works in webpack 5, Vite, Rollup and esbuild-based setups:

```js
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
```

We built both versions with **Vite 8**: each emitted `pdf.worker.min-[hash].mjs` into `dist/assets/`, and the page loaded the PDF with no fake-worker warning.

## Fix for a plain HTML page (no bundler)

Copy `node_modules/pdfjs-dist/build/` to your site (for example as `/pdfjs/`) and point `workerSrc` at the worker in the same folder:

```html
<script type="module">
  import * as pdfjsLib from '/pdfjs/pdf.mjs';
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

  const pdf = await pdfjsLib.getDocument({ url: '/sample.pdf' }).promise;
  console.log(pdf.numPages);
</script>
```

## Using a CDN

Keep the API and worker versions identical by building the URL from `pdfjsLib.version`:

```js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
```

A mismatch (for example, API 6.x with a 4.x worker) fails with:

```text
The API version "6.3.289" does not match the Worker version "4.10.38".
```

## Checklist

- [ ] `workerSrc` is set **before** the first `getDocument()` call.
- [ ] The URL returns the worker file (check the Network tab for a 404).
- [ ] The worker comes from the **same pdfjs-dist version** as the API.
- [ ] You call `getDocument({ url })` or `getDocument({ data })` with an object.
- [ ] No `Setting up fake worker.` warning appears in the console.
