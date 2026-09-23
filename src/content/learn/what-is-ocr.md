---
title: "What Is OCR and How Does It Work With PDFs?"
description: "OCR (optical character recognition) turns pictures of text into real, searchable text. Here's how it works and where to get it free."
summary: "OCR (Optical Character Recognition) looks at an image of a page, recognises the letters, and adds real text to the PDF. It turns a scanned PDF into one you can search, copy and convert to Word."
order: 6
updated: 2026-09-23
related: ["make-scanned-pdf-searchable", "cant-copy-text-from-pdf", "convert-pdf-to-word"]
faqs:
  - q: "Is OCR 100% accurate?"
    a: "No. On clean, 300 DPI printed text modern OCR is typically above 98–99% accurate. Accuracy drops with handwriting, low resolution, skewed pages, unusual fonts, stamps or poor lighting."
  - q: "Can OCR read handwriting?"
    a: "Modern cloud OCR (Google, Microsoft, Apple) can read neat handwriting reasonably well, but results are much less reliable than for printed text."
  - q: "Does OCR change how my scan looks?"
    a: "Usually not. Most tools keep the original image and place an invisible text layer behind it, so the page looks the same but becomes searchable."
---

## The problem OCR solves

A scanned page is just a photo. To a computer, the word "Invoice" in a scan is a pattern of pixels, no different from a picture of a cat. OCR analyses those pixels and works out which characters they represent.

## How OCR works (simplified)

1. **Clean up:** straighten (deskew) the page, remove specks, increase contrast.
2. **Layout analysis:** find columns, paragraphs, lines and tables.
3. **Recognition:** identify each character or word, today mostly with neural networks.
4. **Language check:** use dictionaries and language models to fix likely mistakes ("rn" vs "m").
5. **Output:** add an invisible text layer to the PDF, or export to Word/text.

## Free ways to OCR a PDF

| Tool | Platform | Notes |
|---|---|---|
| **Google Drive / Docs** | Browser | Upload PDF, right-click > Open with Google Docs. Gives editable text, loses layout |
| **Microsoft Word** | Windows/Mac | Opening a scanned PDF in Word runs OCR automatically |
| **Apple Live Text** | Mac, iPhone, iPad | Select text directly in scans and photos in Preview, Photos and Files |
| **Adobe Scan** | iPhone/Android | Scans with the camera and OCRs automatically |
| **Microsoft Lens** | iPhone/Android | Scan to searchable PDF or Word |
| **OCRmyPDF** | Windows/Mac/Linux (free, open source) | Adds a text layer while keeping the original scan; runs locally |

## Tips for better OCR results

- Scan at **300 DPI**. Lower loses detail, higher rarely helps.
- Use **black & white or greyscale** for text documents.
- Keep pages **straight and flat**, with even lighting and no shadows (phone scans).
- Set the correct **language** in the OCR tool.
- Always **proof-read** numbers, names and amounts. OCR errors are most costly there.
