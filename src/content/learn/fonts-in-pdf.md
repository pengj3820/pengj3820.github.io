---
title: "Fonts in PDF Files: Embedding and Subsetting"
description: "How PDFs store fonts, what 'embedded' and 'subset' mean, and why missing fonts cause garbled or substituted text."
summary: "A well-made PDF embeds the fonts it uses, so text displays correctly on every device. If a font isn't embedded, the reader substitutes another one, which can change spacing or produce garbled characters."
order: 4
updated: 2026-09-23
related: ["pdf-fonts-look-wrong", "cant-copy-text-from-pdf", "how-to-edit-a-pdf"]
faqs:
  - q: "How do I check which fonts a PDF uses?"
    a: "In Adobe Acrobat Reader choose File > Properties > Fonts. Each font is listed as 'Embedded', 'Embedded Subset', or not embedded."
  - q: "Why can't I edit text in a PDF even with an editor?"
    a: "If the font is only a subset, it may contain only the characters used in the document. Typing a new letter that isn't in the subset forces the editor to use a different font."
---

## Why fonts matter in a PDF

A PDF says "draw the letter *A* using font *X* at this position". If font *X* is inside the file, every device draws the same *A*. If it isn't, the reader must **guess** a replacement.

## Three ways a font can be stored

| Status | Meaning | Result |
|---|---|---|
| **Embedded** | The whole font file is inside the PDF | Always correct, larger file |
| **Embedded subset** | Only the characters actually used are included | Correct and small. The most common setting |
| **Not embedded** | Only the font's *name* is stored | Looks right only if the reader's computer has that font |

Subset fonts show up with a random prefix like `ABCDEF+Calibri`. That's normal.

## What goes wrong when fonts aren't embedded

- Text appears in a different font (often Arial, Helvetica or Courier).
- Lines overflow, overlap or wrap differently.
- Symbols, Asian characters or special glyphs turn into boxes (☐) or random characters.
- Print shops and PDF/A validators reject the file.

## The "copy gives gibberish" problem

Even with an embedded font, copying text can produce nonsense like `ÿþ¤¢`. That happens when the PDF lacks a **ToUnicode map**, the table that tells software which real letter each glyph represents. The page *looks* fine but the computer doesn't know what the characters mean. See [Can't copy text from a PDF](/questions/cant-copy-text-from-pdf/).

## How to make sure fonts are embedded

- **Word (Windows):** File > Options > Save > tick *Embed fonts in the file*. Saving as PDF from Word embeds fonts by default.
- **LibreOffice:** Export as PDF embeds fonts automatically.
- **Print to PDF drivers** (Microsoft Print to PDF, macOS Save as PDF) embed fonts.
- For print or archiving, save as **PDF/A** or **PDF/X**, which require embedding.
