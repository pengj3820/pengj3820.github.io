---
title: "How to Compress a PDF (Free, Any Device)"
description: "Make a PDF smaller for free on Windows, Mac, iPhone, Android or online — without ruining quality."
answer: "Use a free online compressor with the 'recommended' level, or on a Mac open the file in Preview and choose File > Export > Quartz Filter: Reduce File Size. For sensitive files, compress locally instead of uploading. Most image-heavy PDFs shrink 50–90%."
category: size
popular: true
updated: 2026-09-23
related: ["why-is-my-pdf-so-large", "pdf-too-large-to-email", "split-pdf"]
learn: ["how-pdf-compression-works", "images-in-pdf"]
faqs:
  - q: "How much can a PDF be compressed?"
    a: "Scanned and photo-heavy PDFs often shrink by 50–90%. Text-only PDFs are already compact and may only shrink by 5–20%."
  - q: "Is it safe to compress PDFs online?"
    a: "Reputable services delete files after a few hours, but your file is still uploaded to someone else's server. For contracts, IDs, medical or financial documents, prefer a method that runs on your own device."
  - q: "Why is my compressed PDF blurry?"
    a: "The compression level was too strong and images were reduced to a very low resolution. Go back to your original and use a medium ('recommended') level instead."
---

## Before you start

- **Keep the original.** Compression can't be undone.
- **Know your target.** Email limits are usually 20–25 MB; many upload portals want under 2–10 MB.
- **Check why it's big.** A scanned document shrinks a lot; a text-only file won't. See [Why is my PDF so large?](/questions/why-is-my-pdf-so-large/)

## Option 1: Online (any device, fastest)

1. Open a free online PDF compressor. Adobe, Smallpdf, iLovePDF and others offer one.
2. Upload your PDF.
3. Choose **Recommended / Medium** compression.
4. Download the result and open it to check readability.

> **Privacy tip:** avoid uploading sensitive documents such as passports, bank statements or medical records. Use one of the local options below.

## Option 2: Mac (built-in, free, offline)

1. Open the PDF in **Preview**.
2. Choose **File > Export…**
3. In **Quartz Filter**, select **Reduce File Size**.
4. Save with a new name.

The built-in filter can be very aggressive and make scans blurry. If the result looks bad, use an online tool at a medium setting instead.

## Option 3: Windows (offline)

Windows has no built-in PDF compressor, but you have free options:

- **Recreate the PDF from the source.** In Word, choose File > Save As > PDF and select **Minimum size (publishing online)**.
- **LibreOffice Draw** (free): open the PDF, then File > Export as PDF and set JPEG quality to about 75% and "Reduce image resolution" to 150 DPI.
- **Adobe Acrobat** (paid): File > Save as Other > Reduced Size PDF.

## Option 4: iPhone or Android

- Use your phone browser with an online compressor, as in Option 1.
- Or rescan the document at a lower quality. Many scanner apps have a "file size" or "quality" option.

## Option 5: Advanced — Ghostscript (free, any OS)

If you're comfortable with a command line, Ghostscript gives excellent results locally:

```
gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH -sOutputFile=small.pdf input.pdf
```

Use `/screen` for smallest, `/ebook` for balanced (≈150 DPI), `/printer` for high quality.

## Still too big?

- [Split the PDF](/questions/split-pdf/) into several parts.
- Send a **share link** (Google Drive, OneDrive, iCloud, Dropbox) instead of an attachment. See [PDF too large to email](/questions/pdf-too-large-to-email/).
