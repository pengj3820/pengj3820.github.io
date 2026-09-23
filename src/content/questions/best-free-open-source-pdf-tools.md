---
title: "The Best Free and Open-Source PDF Tools"
description: "Free, open-source PDF software for reading, merging, editing, signing, OCR and compressing PDFs on Windows, Mac and Linux, with no subscriptions or watermarks."
answer: "For most people: SumatraPDF (Windows) or Okular to read, PDFsam Basic to merge and split, Xournal++ to annotate and sign, and Stirling-PDF for an all-in-one toolbox. For power users, the free command-line tools qpdf, Ghostscript and OCRmyPDF handle repair, compression and OCR. All are open source, with no watermarks or subscriptions."
category: tools
popular: true
updated: 2026-09-23
related: ["merge-pdf-files", "how-to-compress-a-pdf", "make-scanned-pdf-searchable", "sign-a-pdf", "how-to-edit-a-pdf"]
learn: ["what-is-a-pdf", "what-is-ocr", "pdf-versions-and-pdf-a"]
faqs:
  - q: "Is there a completely free alternative to Adobe Acrobat?"
    a: "No single free app matches Acrobat Pro feature for feature, but a combination comes close: Stirling-PDF for most operations, LibreOffice Draw for editing text, Xournal++ for annotating and signing, and OCRmyPDF for OCR. For simply reading PDFs, any web browser or SumatraPDF is enough."
  - q: "What's the difference between free and open-source software?"
    a: "Free software costs nothing but may still show ads, add watermarks, limit features or collect data. Open-source software publishes its source code, so anyone can check what it does. It is almost always free, without watermarks or artificial limits."
  - q: "Are online PDF tools safe?"
    a: "Reputable services delete files after a few hours, but your document is still uploaded to someone else's server. For contracts, IDs and financial or medical records, use desktop software, or browser-based tools that process files locally."
  - q: "Which free PDF editor can change existing text?"
    a: "LibreOffice Draw is the best free option. It opens PDFs with every line as an editable text box. See our guide on how to change text in a PDF."
---

Every tool on this page is **open source**: the code is public, it costs nothing, and there are no watermarks, page limits or subscriptions. We've grouped them by what you want to do.

> **Download only from the official website or app store** listed for each project. Unofficial "free PDF editor" downloads are a common way to spread adware.

## Quick picks

| I want to… | Windows | Mac | Linux |
|---|---|---|---|
| Read PDFs | SumatraPDF, Okular | Preview (built in), Sioyek | Okular, Sioyek |
| Merge, split, rotate | PDFsam Basic | PDFsam Basic | PDFsam Basic, PDF Arranger |
| Annotate, draw, sign | Xournal++ | Xournal++ | Xournal++, Okular |
| Change existing text | LibreOffice Draw | LibreOffice Draw | LibreOffice Draw |
| Do everything in one place | Stirling-PDF | Stirling-PDF | Stirling-PDF |
| OCR scans, compress, repair | OCRmyPDF, qpdf, Ghostscript (command line) | same | same |

## PDF readers

### SumatraPDF (Windows)
A tiny, very fast reader that opens instantly, even for huge files. It also reads EPUB, MOBI and comic book files. There's no editing: it's purely for reading and printing, which is exactly why it's so light. **License:** GPL-3.0.

### Okular (Windows, Linux)
KDE's document viewer. Beyond reading, it can **highlight, add notes, fill forms and add a signature**, which makes it a solid everyday reader and light annotator. **License:** GPL.

### Sioyek (Windows, Mac, Linux)
Designed for **research papers and technical books**: it previews references and figures when you hover over them and keeps track of where you left off. **License:** GPL-3.0.

> Don't forget your browser: Chrome, Edge, Firefox and Safari all open PDFs, and Edge can add text, highlights and drawings. On a Mac, the built-in **Preview** app also merges, signs and annotates.

## Merge, split and reorganise

### PDFsam Basic (Windows, Mac, Linux)
The go-to free tool for **merging, splitting, rotating and extracting pages**. It can split by page ranges, bookmarks or file size, and it works entirely offline. The free edition is "Basic"; the paid "Enhanced" and "Visual" editions are separate products, so you don't need them for these tasks.

### PDF Arranger (Linux, Windows)
A simple visual editor: see every page as a thumbnail, then drag to **reorder, rotate, crop, delete** or combine pages from several files. **License:** GPL-3.0.

Step-by-step: [How to merge PDF files](/questions/merge-pdf-files/) · [How to split a PDF](/questions/split-pdf/)

## Annotate, fill and sign

### Xournal++ (Windows, Mac, Linux)
Open a PDF and **write, draw, highlight, add text or a signature**, then export a new PDF. It's especially good with a stylus or drawing tablet, so it's popular for marking up lecture slides and signing documents. **License:** GPL.

See also: [How to sign a PDF](/questions/sign-a-pdf/) · [How to fill out a PDF form](/questions/fill-out-pdf-form/)

## Edit existing text

### LibreOffice Draw (Windows, Mac, Linux)
Part of the free LibreOffice suite. It opens PDFs with each line as an editable text box, so you can **fix typos, change numbers and move elements**, then export back to PDF. Fonts not installed on your computer are substituted, so check the result. **License:** MPL-2.0.

Full walkthrough: [How to change text in a PDF](/questions/change-text-in-pdf/)

## All-in-one toolboxes

### Stirling-PDF (desktop app, browser or self-hosted)
The most complete open-source PDF toolbox: **50+ tools** for merging, splitting, converting, compressing, OCR, signing, redacting, watermarking and more. You can run it as a desktop app, or host it on your own computer or server with one Docker command, so **files never leave your machine**:

```bash
docker run -p 8080:8080 docker.stirlingpdf.com/stirlingtools/stirling-pdf
```

Then open `http://localhost:8080` in your browser. **License:** the core is MIT; some newer enterprise features are under a separate proprietary licence.

### BentoPDF (browser, self-hostable)
A privacy-focused toolkit that runs **entirely in your browser**: merging, splitting, editing and converting happen on your device, without uploading files. You can also host your own copy. **License:** AGPL-3.0.

## Command-line power tools

These have no graphical interface, but they are the engines behind many PDF apps and are unbeatable for batch jobs.

| Tool | Best for | Example | License |
|---|---|---|---|
| **OCRmyPDF** | Making scanned PDFs searchable | `ocrmypdf scan.pdf searchable.pdf` | MPL-2.0 |
| **qpdf** | Repairing damaged files, removing a known password, merging | `qpdf --decrypt --password=secret in.pdf out.pdf` | Apache-2.0 |
| **Ghostscript** | Compressing PDFs, converting to PDF/A | `gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -o small.pdf in.pdf` | AGPL-3.0 |
| **pdfcpu** | Merging, splitting, watermarking, encrypting, validating | `pdfcpu merge out.pdf a.pdf b.pdf` | Apache-2.0 |
| **Poppler utils** | Extracting text and images, splitting | `pdftotext in.pdf out.txt` | GPL |

On Mac, install them with Homebrew (`brew install ocrmypdf qpdf ghostscript`); on Linux, use your package manager.

Guides: [Make a scanned PDF searchable](/questions/make-scanned-pdf-searchable/) · [How to compress a PDF](/questions/how-to-compress-a-pdf/)

## Check PDF/A compliance

### veraPDF (Windows, Mac, Linux)
The reference open-source validator for **PDF/A** (archiving) and **PDF/UA** (accessibility). Use it when a court, university or government portal rejects your file as "not valid PDF/A". Learn more in [PDF versions and PDF/A](/learn/pdf-versions-and-pdf-a/).

## For developers

Building PDF features into your own software? See our [Python PDF libraries comparison](/developers/python-pdf-libraries-compared/) and [AI tools for parsing PDFs](/developers/ai-pdf-parsing-tools/).
