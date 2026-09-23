---
title: "How PDF Compression Works"
description: "What actually happens when you 'compress' a PDF, the difference between lossless and lossy compression, and how much smaller files can get."
summary: "PDF compressors mainly shrink the images inside a file: they lower resolution (downsampling) and re-save them at lower quality. They also remove unused data and duplicate objects. Text-only PDFs are already small and barely shrink."
order: 7
updated: 2026-09-23
related: ["how-to-compress-a-pdf", "why-is-my-pdf-so-large", "pdf-too-large-to-email"]
faqs:
  - q: "Does compressing a PDF reduce quality?"
    a: "Lossless steps (removing unused data, optimising structure) don't. Lossy steps (downsampling and recompressing images) do, but at sensible settings like 150 DPI the difference is rarely visible on screen."
  - q: "Why did compressing my PDF barely change its size?"
    a: "The file is probably mostly text and vectors, which are already compact, or it was already compressed. Large embedded fonts or attachments can also be the culprit."
  - q: "Can I compress a PDF without uploading it?"
    a: "Yes. macOS Preview, Adobe Acrobat desktop, LibreOffice and the free Ghostscript tool all compress PDFs locally on your computer."
---

## Where PDF file size comes from

In a typical oversized PDF, **images account for 80–95% of the size**. The rest comes from fonts, page content, metadata and sometimes attachments or leftover editing history.

## Lossless compression (no quality loss)

- **Flate (ZIP) compression** of page content and data.
- **Object streams:** packing many small objects together (PDF 1.5+).
- **Removing** unused objects, duplicate images, thumbnails, metadata, old revisions from incremental saves.
- **Font subsetting:** keeping only the characters used.

Typical saving: **5–30%**.

## Lossy compression (smaller, some quality loss)

- **Downsampling:** reducing image resolution, e.g. from 600 DPI to 150 DPI. Halving DPI cuts pixel count to a quarter.
- **JPEG re-compression** at lower quality.
- **Colour conversion:** turning colour scans into greyscale or black-and-white.
- **Better codecs:** JBIG2 for black-and-white scans.

Typical saving on image-heavy files: **50–90%**.

## Choosing a compression level

| Level | Image resolution | Good for |
|---|---|---|
| Low / "high quality" | ~300 DPI | Printing |
| **Medium / "recommended"** | ~150 DPI | Email, uploads, on-screen reading |
| High / "extreme" | 72–100 DPI | Hitting strict size limits; may look blurry when zoomed |

## What compression can't do

- It can't make a **text-only** PDF dramatically smaller.
- It can't restore quality once it's lost. Always **keep your original**.
- Very aggressive compression can make small print or signatures unreadable. Check the result before sending.

Ready to shrink a file? Follow [How to compress a PDF](/questions/how-to-compress-a-pdf/).
