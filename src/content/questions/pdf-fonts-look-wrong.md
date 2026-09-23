---
title: "PDF Fonts Look Wrong or Show Strange Characters"
description: "Fix PDFs that display the wrong font, boxes, question marks or garbled characters."
answer: "The PDF usually doesn't embed its fonts, so your viewer substitutes others. Try opening it in a different viewer (Chrome, Edge, Acrobat Reader). If you made the PDF, re-export it with fonts embedded. If you received it, ask the sender to do the same."
category: edit
updated: 2026-09-23
related: ["cant-copy-text-from-pdf", "pdf-wont-open", "pdf-prints-incorrectly"]
learn: ["fonts-in-pdf", "pdf-versions-and-pdf-a"]
faqs:
  - q: "Why do Chinese or Japanese characters show as boxes in a PDF?"
    a: "The CJK font isn't embedded and your device lacks it. In Adobe Acrobat Reader, install the free Asian font pack when prompted, or ask the creator to embed fonts."
  - q: "Why does my PDF look fine on my computer but wrong on others?"
    a: "Your computer has the fonts installed, so the PDF looks correct there even though they aren't embedded. Other computers don't have them. Re-export with fonts embedded."
---

## Quick fixes if you received the PDF

1. **Try another viewer.** Chrome, Edge, Firefox, Preview and Acrobat Reader each handle font substitution differently.
2. **Update your reader.** Old versions may not support newer font formats.
3. **Adobe Acrobat Reader + Asian fonts.** Reader offers to download language packs for Chinese, Japanese and Korean.
4. **Ask the sender** for a copy exported with embedded fonts, or as PDF/A (which requires embedding).

## If you created the PDF

- **Word:** File > Save As > PDF. Fonts are embedded by default. If you used "Print to PDF", switch to Save As.
- **Word options:** File > Options > Save > *Embed fonts in the file*.
- **Check font licences:** some fonts forbid embedding, and the PDF generator silently substitutes them. Switch to a font that allows embedding.
- **Export as PDF/A** to force full embedding.
- **Last resort:** convert text to outlines/curves in design software. It looks right everywhere, but the text is no longer searchable.

## How to check the fonts

In **Adobe Acrobat Reader:** File > Properties > **Fonts** tab. Every font should say *(Embedded)* or *(Embedded Subset)*. Anything without it is the likely culprit.
