---
title: "Why Is My PDF So Large?"
description: "The six most common reasons a PDF file is huge, and how to check which one applies to yours."
answer: "Almost always it's the images: high-resolution scans, phone photos or uncompressed graphics. Other causes are embedded full fonts, attachments, and hidden editing history. Compressing images to about 150 DPI fixes most cases."
category: size
updated: 2026-09-23
related: ["how-to-compress-a-pdf", "pdf-too-large-to-email", "scan-document-to-pdf-with-phone"]
learn: ["images-in-pdf", "how-pdf-compression-works", "scanned-vs-text-pdf"]
faqs:
  - q: "What's a normal size for a PDF?"
    a: "A text document is typically 20–200 KB per page, less for simple text. A scanned page at 300 DPI is usually 100 KB–1 MB. Anything over 2–3 MB per page is worth compressing."
  - q: "Why did my PDF get bigger after I edited it?"
    a: "Many editors save changes 'incrementally', appending new data to the end of the file while keeping the old version inside. Use 'Save As' to a new file, or optimise or compress it, to rebuild it cleanly."
---

## 1. High-resolution scans or photos

The #1 cause. A phone camera photo can be 12–48 megapixels. Placing one on each page can make a 10-page PDF 50 MB or more. Scanners set to 600 DPI colour produce similar results.

**Fix:** [compress](/questions/how-to-compress-a-pdf/) at a medium level, or rescan at 300 DPI greyscale.

## 2. Images that weren't compressed

Some tools (especially screenshot-based or "print to image" workflows) store images losslessly, which can be 5–10× bigger than JPEG.

## 3. Colour when black-and-white would do

A colour scan of a text document stores three colour channels for what's really black ink on white paper.

**Fix:** scan in greyscale or black-and-white mode.

## 4. Fully embedded fonts

Large fonts, especially Chinese, Japanese and Korean fonts, can be several megabytes each if embedded completely instead of subset.

## 5. Attachments, layers and hidden data

PDFs can hold attached files, multiple layers, form data, thumbnails, metadata and JavaScript. Design software can also embed the full editing data (e.g. "Preserve Illustrator Editing Capabilities").

## 6. Incremental saves

Each save in some editors appends changes instead of rewriting the file, so old versions accumulate inside it.

## How to find the culprit

- **Divide size by pages.** 30 MB ÷ 10 pages = 3 MB/page means images.
- **Zoom test.** If pages look like photos when zoomed in, they're scans.
- **Acrobat Pro:** File > Save as Other > Optimized PDF > *Audit space usage* shows exactly what takes the space.
