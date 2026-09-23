---
title: "How to Make a Scanned PDF Searchable (OCR)"
description: "Turn a scanned, image-only PDF into a searchable, copyable PDF for free with OCR."
answer: "Run OCR (optical character recognition). Free options: open the PDF in Google Docs or Microsoft Word to extract editable text, or use OCRmyPDF (free, offline) to add an invisible text layer while keeping the scan's look. Adobe Acrobat Pro and many online tools also offer 'OCR PDF'."
category: scan
updated: 2026-09-23
related: ["cant-copy-text-from-pdf", "change-text-in-pdf", "scan-document-to-pdf-with-phone", "convert-pdf-to-word"]
learn: ["what-is-ocr", "scanned-vs-text-pdf"]
faqs:
  - q: "Will OCR change the look of my scan?"
    a: "Tools that create a 'searchable PDF' (OCRmyPDF, Acrobat, most online OCR) keep the original image and add invisible text behind it. Google Docs and Word instead create a new, editable document."
  - q: "Which languages does OCR support?"
    a: "Major tools support 100+ languages, including Chinese, Japanese, Arabic and Cyrillic scripts. Select the right language for best accuracy."
---

## Two kinds of results

1. **Searchable PDF:** looks identical to the scan, but you can search and copy. Best for archiving.
2. **Editable text or Word:** the text is extracted into a new document you can edit. Best for reusing content.

## Free: Google Drive/Docs (editable text)

1. Upload the PDF to Google Drive.
2. Right-click > **Open with > Google Docs**.
3. The recognised text appears below each page image.

Works best for files under 2 MB and the first ~10 pages.

## Free: Microsoft Word (editable)

**File > Open** the scanned PDF. Word runs OCR and converts it into an editable document.

## Free and offline: OCRmyPDF (searchable PDF)

Open-source tool for Windows, Mac and Linux:

```
ocrmypdf --language eng input.pdf output.pdf
```

Keeps the original scan, adds a text layer, and can also deskew pages (`--deskew`) and optimise size (`--optimize 2`).

## For developers (Python)

Automating OCR in code? See [How to OCR a PDF with PaddleOCR](/developers/paddleocr-pdf-ocr/), which includes a script that builds a searchable PDF with PyMuPDF.

## Apple devices

On macOS 13+ and iOS 16+, **Live Text** lets you select text in scans directly in Preview and Files, without a permanent text layer.

## Paid / online

- **Adobe Acrobat Pro:** Scan & OCR > Recognize Text.
- **Online OCR tools:** upload and download a searchable PDF.

## Tips for better accuracy

- Scan at **300 DPI**, greyscale.
- Straighten pages and avoid shadows.
- Set the correct OCR **language**.
- Proof-read numbers and names.
