---
title: "Can't Copy Text From a PDF? Here's Why and How to Fix It"
description: "Fix PDFs where text won't select, copies as gibberish, or copying is blocked by permissions."
answer: "There are three usual causes: the PDF is a scan (just an image — fix with OCR), copying is restricted by a permissions password, or the fonts lack Unicode mapping so text copies as gibberish. OCR solves the first and third; Google Docs or Word OCR are free options."
category: edit
popular: true
updated: 2026-09-23
related: ["make-scanned-pdf-searchable", "remove-pdf-password", "convert-pdf-to-word", "pdf-fonts-look-wrong"]
learn: ["scanned-vs-text-pdf", "what-is-ocr", "fonts-in-pdf"]
faqs:
  - q: "Why does copied PDF text have weird line breaks?"
    a: "PDFs store each line separately, so each line ends with a hard break when copied. Paste into a text editor and use find-and-replace to remove the line breaks, or paste into Word with 'Keep text only'."
  - q: "How can I copy text from a PDF on iPhone?"
    a: "Long-press the text in Files or Safari. If it's a scan, take a screenshot and use Live Text: open the screenshot in Photos and long-press the text."
---

## Step 1: Figure out which problem you have

| What happens | Cause | Jump to |
|---|---|---|
| Nothing highlights, or the whole page highlights like a picture | Scanned (image) PDF | Fix 1 |
| Text highlights but Copy is greyed out | Copy restriction | Fix 2 |
| Copy works but pastes as `ÿþ▯▯` or random symbols | Missing Unicode/font mapping | Fix 3 |
| Copy works but the text order is jumbled | Complex layout/columns | Fix 4 |

## Fix 1: Scanned PDF — run OCR

The page is a photo, so there's no text to copy yet.

- **Google Drive (free):** upload > right-click > *Open with Google Docs*. The text appears below the image.
- **Microsoft Word:** File > Open the PDF. Word runs OCR.
- **Mac/iPhone Live Text:** in Preview (macOS 13+) you can often select text in scans directly.
- **Screenshot trick:** screenshot the part you need, then use Live Text (Apple), Google Lens (Android/Chrome) or Windows Snipping Tool's *Text actions*.

More: [Make a scanned PDF searchable](/questions/make-scanned-pdf-searchable/).

## Fix 2: Copying is restricted

The author set a permissions password. If you're allowed to use the content:

- Open the PDF in **Google Chrome** and choose Print > **Save as PDF**. The new file often has no restrictions.
- Or ask the author for an unrestricted copy.

See [How to remove a PDF password](/questions/remove-pdf-password/). Respect copyright and your organisation's rules.

## Fix 3: Text pastes as gibberish

The PDF was made without a "ToUnicode" map, so the computer draws the right shapes but doesn't know which letters they are. The fix is to **treat it like a scan and OCR it**: Google Docs, Word or the screenshot method above.

## Fix 4: Jumbled order or broken lines

- Paste into Word with **Keep Text Only**, then clean up line breaks.
- For tables, try [converting the PDF to Word or Excel](/questions/convert-pdf-to-word/), which rebuilds structure.
