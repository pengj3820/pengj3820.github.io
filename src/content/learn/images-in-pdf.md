---
title: "Vector vs Raster: How Images Work in PDFs"
description: "Why some PDF graphics stay sharp at any zoom while others get blurry, and how image resolution drives file size."
summary: "PDFs contain two kinds of graphics: vector graphics (shapes described by math, always sharp and tiny) and raster images (grids of pixels, like photos and scans). Raster images are what usually make PDFs large or blurry."
order: 5
updated: 2026-09-23
related: ["why-is-my-pdf-so-large", "how-to-compress-a-pdf", "convert-pdf-to-jpg"]
faqs:
  - q: "What resolution should images in a PDF be?"
    a: "About 150 DPI is plenty for on-screen reading and email, 300 DPI for office printing, and 300 DPI or more for professional print. Anything above 300 DPI rarely adds visible quality but greatly increases size."
  - q: "Can I turn a blurry image in a PDF into a sharp one?"
    a: "No. Once detail is lost you can't recover it. You need the original high-resolution image or source document."
---

## Vector graphics

A vector graphic is a set of drawing instructions: "line from here to here", "circle with this radius", "fill with blue". Text, logos, charts and diagrams exported from Word, Excel, PowerPoint or design software are usually vectors.

- ✅ Perfectly sharp at any zoom level
- ✅ Tiny file size
- ✅ Text inside can remain selectable

## Raster images

A raster image is a grid of coloured pixels: photos, screenshots and every page of a scanned document.

- ❌ Becomes blurry or blocky when enlarged
- ❌ File size grows with resolution and colour depth
- ✅ The only way to store photographs

## What resolution (DPI) means

DPI (dots per inch) is how many pixels are packed into each inch of the printed page.

| DPI | Typical use | Approx. size of one colour A4/Letter page |
|---|---|---|
| 72–96 | Screen previews | 50–150 KB |
| **150** | On-screen reading, email | 150–400 KB |
| **300** | Office printing, OCR | 0.5–1.5 MB |
| 600 | Archival scans, fine print | 2–6 MB+ |

*(Sizes vary widely by content and compression.)*

## How images are compressed inside a PDF

- **JPEG (DCT):** Great for photos, lossy. Lower quality = smaller file.
- **Flate (ZIP):** Lossless, good for screenshots and graphics with flat colours.
- **JBIG2 / CCITT:** Very efficient for black-and-white scans.
- **JPEG 2000:** More efficient than JPEG but less widely used.

Compression tools mainly shrink PDFs by **lowering image resolution** (downsampling) and **re-compressing images**. See [How PDF compression works](/learn/how-pdf-compression-works/).
