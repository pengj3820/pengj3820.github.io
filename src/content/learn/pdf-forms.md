---
title: "PDF Forms: Fillable Fields, AcroForms and XFA"
description: "How fillable PDF forms work, why some forms can't be filled in or saved, and the difference between AcroForm and XFA forms."
summary: "A fillable PDF form contains interactive fields (text boxes, checkboxes, dropdowns) that you can type into. Most use the universal AcroForm format. Some older government forms use XFA, which only works properly in Adobe Acrobat or Reader."
order: 9
updated: 2026-09-23
related: ["fill-out-pdf-form", "sign-a-pdf", "pdf-wont-open"]
faqs:
  - q: "Why does my PDF form say 'Please wait… If this message is not eventually replaced…'?"
    a: "That's an XFA form. Browsers and most PDF apps can't render XFA. Download the file and open it in the free Adobe Acrobat Reader desktop app."
  - q: "What does 'flattening' a form mean?"
    a: "Flattening converts filled-in fields into ordinary page content, so the answers can no longer be changed and look the same in every viewer. It's often done before sending or archiving."
---

## Two kinds of "forms"

1. **Fillable (interactive) forms** have real fields. Click and type.
2. **Flat forms** are just a document with lines and boxes printed on it. You need a tool that lets you add text on top (see [How to fill out a PDF form](/questions/fill-out-pdf-form/)).

## Field types

- Text fields (single-line, multi-line, formatted dates/numbers)
- Checkboxes and radio buttons
- Dropdowns and list boxes
- Signature fields
- Buttons (print, reset, submit)

Forms can also contain **JavaScript** for calculations ("total = sum of rows") and validation. Not every viewer runs it.

## AcroForm vs XFA

| | AcroForm | XFA |
|---|---|---|
| Standard | Part of ISO 32000 | Adobe proprietary; deprecated in PDF 2.0 |
| Works in browsers, Preview, phones | ✅ Yes | ❌ Usually not |
| Typical source | Most forms | Older government and corporate forms (made in Adobe LiveCycle) |

## Why forms go wrong

- **"Can't save my entries":** some older viewers only allow filling, not saving. Use Acrobat Reader, Edge, Chrome or Preview, which all save filled forms.
- **Entries disappear when opened elsewhere:** the viewer saved values without updating their appearance. Flatten the form or print it to PDF.
- **Calculations don't work:** the viewer doesn't support form JavaScript. Try Adobe Acrobat Reader.
- **The blank "Please wait…" page:** it's an XFA form. Open it in Adobe Acrobat Reader desktop.
