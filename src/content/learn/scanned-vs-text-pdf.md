---
title: "Scanned PDF vs Text PDF: What's the Difference?"
description: "Why some PDFs let you select and search text while others don't — and how to tell which kind you have."
summary: "A text PDF stores real characters you can select, search and copy. A scanned PDF stores only images of pages, so the computer sees pictures, not words — until you run OCR."
order: 3
updated: 2026-09-23
related: ["cant-copy-text-from-pdf", "make-scanned-pdf-searchable", "why-is-my-pdf-so-large"]
faqs:
  - q: "How can I quickly tell if a PDF is scanned?"
    a: "Try to select a single word with your cursor. If a whole-page rectangle is selected instead, or nothing is selected, it's an image-only (scanned) PDF. Pressing Ctrl+F / Cmd+F and finding nothing is another clue."
  - q: "Why are scanned PDFs so much bigger?"
    a: "Each page is stored as a full-page picture. A page of text is a few kilobytes; a page-sized image can be hundreds of kilobytes or several megabytes."
---

## Text PDF (a.k.a. "native" or "digital" PDF)

Created by software — Word, Google Docs, a browser's "Save as PDF", an accounting system. The file contains actual characters plus the font needed to draw them.

**You can:** select and copy text, search with Ctrl+F / Cmd+F, have it read aloud, convert it to Word reasonably well. Files are usually small.

## Scanned PDF (image-only PDF)

Created by a scanner, a phone scanning app or a fax. Each page is a **photo**. The file has no idea there are letters in it.

**You can't:** select, copy or search text; screen readers can't read it; converting to Word produces pictures, not editable text. Files are usually large.

## The third kind: scanned + OCR ("searchable PDF")

[OCR](/learn/what-is-ocr/) software recognises the letters in the image and adds an **invisible text layer** behind it. The page still looks like the original scan, but you can now search and copy. Many scanners and apps (Adobe Scan, Microsoft Lens, iPhone Notes) do this automatically.

## How to tell which one you have

1. **Select test:** Click and drag over a sentence. Individual words highlighted = text PDF.
2. **Search test:** Press Ctrl+F (Windows) or Cmd+F (Mac) and type a word you can see. No result = probably scanned.
3. **Zoom test:** Zoom to 400%. Text PDFs stay razor-sharp; scans become blurry or pixelated.
4. **Fonts test:** In Acrobat Reader go to File > Properties > Fonts. An empty list usually means image-only.

## Why it matters

| Problem | Likely cause |
|---|---|
| [Can't copy text](/questions/cant-copy-text-from-pdf/) | Scanned PDF (or copy restriction) |
| [PDF is huge](/questions/why-is-my-pdf-so-large/) | High-resolution scans |
| [PDF to Word gives images](/questions/convert-pdf-to-word/) | Scanned PDF without OCR |
