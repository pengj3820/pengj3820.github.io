---
title: "PDF Versions and PDF/A Explained"
description: "PDF 1.4, 1.7, 2.0, PDF/A, PDF/X, PDF/UA — what the versions and sub-standards mean and when they matter."
summary: "Most PDFs today are version 1.4–1.7 and open everywhere. Special sub-standards exist for specific jobs: PDF/A for long-term archiving, PDF/X for professional printing and PDF/UA for accessibility."
order: 2
updated: 2026-09-23
related: ["pdf-wont-open", "convert-word-to-pdf"]
faqs:
  - q: "How do I check which version a PDF is?"
    a: "In Adobe Acrobat Reader open File > Properties; the Description tab shows the PDF version. In macOS Preview use Tools > Show Inspector."
  - q: "Does a government portal asking for PDF/A mean a normal PDF won't work?"
    a: "Often, yes. Courts, tax offices and archives may reject uploads that aren't valid PDF/A. Microsoft Word can save directly as PDF/A via Save As > PDF > Options > 'PDF/A compliant'."
  - q: "Is PDF 2.0 widely supported?"
    a: "Yes, modern readers open PDF 2.0 files, but most software still creates 1.7 files because they are universally compatible."
---

## The main PDF versions

| Version | Year | Notable additions |
|---|---|---|
| 1.0–1.3 | 1993–1999 | Basics: text, images, links, then digital signatures |
| **1.4** | 2001 | Transparency. Still a common "safe" choice |
| 1.5–1.6 | 2003–2004 | Better compression (object streams), 3D, AES encryption |
| **1.7** | 2006 | Became ISO 32000-1 in 2008. The most common version today |
| **2.0** | 2017/2020 | ISO 32000-2. Cleaner spec, AES-256 only, better accessibility |

In practice you rarely need to care: any up-to-date reader opens all of them. Version issues mainly appear with **very old software** or strict upload portals.

## Sub-standards for special jobs

### PDF/A — archiving
PDF/A guarantees a file can be displayed exactly the same way **decades from now**. To achieve that it:

- requires all fonts to be embedded,
- forbids encryption, JavaScript, audio/video and external links to content,
- requires colour information to be defined precisely.

Governments, courts, universities and libraries often require PDF/A. Variants include PDF/A-1b, PDF/A-2b and PDF/A-3 (which allows attached files, used by e-invoices such as ZUGFeRD/Factur-X).

### PDF/X — printing
Used by print shops. It ensures colours (CMYK), bleed areas and fonts are print-ready.

### PDF/UA — accessibility
Ensures a PDF can be read by screen readers: proper tags, reading order, alt text for images.

## How to create a PDF/A

- **Microsoft Word:** File > Save As > PDF > Options > tick *PDF/A compliant*.
- **LibreOffice:** File > Export as PDF > tick *Archive (PDF/A, ISO 19005)*.
- **Adobe Acrobat Pro:** use the *Standards* or *Preflight* tool.
