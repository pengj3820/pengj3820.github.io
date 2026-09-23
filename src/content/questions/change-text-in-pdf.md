---
title: "How to Change Text in a PDF (Free and Paid Methods)"
description: "Fix a typo, update a name, date or number, or replace a sentence in a PDF, keeping the original font and layout."
answer: "To change existing text you need a tool that edits PDF text directly: Adobe Acrobat Pro (paid, best results), LibreOffice Draw (free, desktop) or an online PDF editor. For whole paragraphs, convert the PDF to Word, edit, and save it as a PDF again. Macs, iPhones and Android phones have no built-in way to change existing text; you can only cover it with a white box and type over it."
category: edit
updated: 2026-09-23
related: ["how-to-edit-a-pdf", "convert-pdf-to-word", "pdf-fonts-look-wrong", "make-scanned-pdf-searchable", "remove-pdf-password"]
learn: ["fonts-in-pdf", "scanned-vs-text-pdf", "what-is-a-pdf"]
faqs:
  - q: "Can I change text in a PDF without Adobe Acrobat?"
    a: "Yes. LibreOffice Draw (free, Windows/Mac/Linux) edits text line by line, Microsoft Word converts the PDF into an editable document, and many online PDF editors let you click existing text and retype it."
  - q: "Why does my edited text look different from the rest of the page?"
    a: "The original font is either not installed on your computer or only embedded as a subset that lacks the letters you typed. The editor then substitutes a similar font. Install the original font, or pick the closest match manually."
  - q: "Why can't I select the text I want to change?"
    a: "Either the PDF is a scan (the text is part of an image), or the file is protected against editing. Scans need OCR first; protected files need the permissions password removed, which you should only do if you're allowed to."
  - q: "Can I change text in a PDF on my iPhone or Android phone?"
    a: "Not with built-in apps. You can cover old text and type new text with the Markup tools, but real text editing needs an app such as Adobe Acrobat (subscription) or an online PDF editor opened in your phone's browser."
  - q: "Does editing a signed PDF break the signature?"
    a: "A digital signature becomes invalid the moment any content changes. That's by design: it proves the document hasn't been altered since signing. Ask the signer for a new signed version instead."
---

## Before you start: two quick checks

Editing existing PDF text only works when the PDF contains **real text**. Check two things first:

1. **Can you select a single word?** Click and drag over one word. If the whole page highlights like a photo, the PDF is a **scan**. Jump to [Changing text in a scanned PDF](#changing-text-in-a-scanned-pdf).
2. **Is editing locked?** If your editor says the document is protected or the edit tools are greyed out, the author set a permissions password. See [How to remove a PDF password](/questions/remove-pdf-password/).

> **Keep a copy of the original.** Some edits (especially converting to Word and back) can shift the layout, and you'll want to compare.

## Which method should you use?

| Your situation | Best method |
|---|---|
| Fix a typo, name, date or number, and keep the exact look | [Adobe Acrobat Pro](#method-1-adobe-acrobat-pro-best-results) or [LibreOffice Draw](#method-2-libreoffice-draw-free-windows-mac-linux) |
| Rewrite whole paragraphs or several pages | [Microsoft Word](#method-3-microsoft-word-for-bigger-rewrites) |
| One-off edit, no software to install | [Online PDF editor](#method-4-online-pdf-editors-no-install) |
| On a Mac, iPhone or Android with no extra apps | [Cover and retype](#method-5-cover-and-retype-any-device) |

## Method 1: Adobe Acrobat Pro (best results)

Acrobat Pro is paid, but Adobe offers a free trial. It's the most reliable way to change text while keeping the original font and spacing.

1. Open the PDF in **Adobe Acrobat Pro**.
2. Choose **Edit a PDF** (in some versions: **Tools > Edit PDF**). Boxes appear around every block of text.
3. **Click inside the text** you want to change, select the old words and type the new ones.
4. Use the **Format** panel on the right to adjust the font, size or colour if needed.
5. **File > Save As** to save a new copy.

If Acrobat detects a scanned page, it offers to run OCR (text recognition) first so the text becomes editable.

> The free **Adobe Acrobat Reader** can't change existing text. It can only add comments, text boxes and signatures.

## Method 2: LibreOffice Draw (free, Windows, Mac, Linux)

LibreOffice is a free office suite. Its **Draw** app opens PDFs as editable pages where every line of text is a separate text box.

1. Install **LibreOffice** from libreoffice.org.
2. Open the PDF with LibreOffice. It opens in **Draw** automatically.
3. **Double-click a line of text** to edit it, then retype.
4. **File > Export as PDF** to save your changes as a new PDF.

**Good to know:**
- Each line is its own box, so longer text doesn't wrap onto the next line. For small fixes that's fine; for rewriting paragraphs, use Word.
- If the original font isn't installed on your computer, LibreOffice substitutes another one. Check the result carefully.

## Method 3: Microsoft Word (for bigger rewrites)

Word converts the PDF into a normal, editable document, so text flows and wraps as you type.

1. In Word, choose **File > Open** and select the PDF.
2. Click **OK** when Word says it will convert the file.
3. Make your changes.
4. **File > Save As** and choose **PDF** as the file type.

**Good to know:**
- Simple documents (letters, reports, CVs) convert well. Complex layouts with columns, forms or many images may shift and need tidying up.
- No Word? **Google Docs** works the same way for free: upload the PDF to Google Drive, then right-click > **Open with > Google Docs**. It keeps the text but loses most of the layout.

More detail: [How to convert a PDF to Word](/questions/convert-pdf-to-word/).

## Method 4: Online PDF editors (no install)

Many online PDF editors let you click on existing text and retype it, right in your browser. This works on any device, including phones and Chromebooks.

1. Open an online PDF editor and upload your file.
2. Choose the **Edit** or **Text** tool and click on the text you want to change.
3. Retype, then download the edited PDF.

**Watch out for:**
- **Privacy.** Your file is uploaded to someone else's server. Don't use online editors for contracts, IDs, bank statements or medical records.
- **Free limits.** Free plans often limit the number of files, pages or edits per day, or add a watermark.

## Method 5: Cover and retype (any device)

When you can't edit the text itself, you can **hide it and type over it**. It works with free, built-in tools everywhere.

**Mac (Preview):**
1. Open the PDF in **Preview** and click the **Markup** (pen) icon.
2. Draw a **rectangle** over the old text. Set its border and fill to **white**.
3. Add a **text box** (the **T** icon) on top, type the new text, and match the font size.
4. **File > Save**.

**iPhone or iPad (Files app):** open the PDF, tap **Markup** > **+** > add a filled white **shape**, then **+** > **Text**.

**Windows (Microsoft Edge):** Edge can add text but has no filled shapes. Use the free **Adobe Acrobat Reader** instead: **Comment** > **Drawing tools** > rectangle with white fill, then **Fill & Sign** to add text.

> ⚠️ **Covering is not deleting.** The original text is still in the file underneath and can be copied or revealed. Never use this to hide confidential information. Use a proper **redaction** tool, such as Acrobat Pro's *Redact*, which permanently removes the content.

## Changing text in a scanned PDF

In a scan, the text is part of a picture, so there's nothing to edit yet. You have two options:

1. **Run OCR first**, then edit. OCR turns the picture of text into real text. Acrobat Pro does this automatically when you choose Edit PDF; Word and Google Docs do it when they open a scanned PDF. See [Make a scanned PDF searchable](/questions/make-scanned-pdf-searchable/).
2. **Cover and retype** ([Method 5](#method-5-cover-and-retype-any-device)). It's often quicker for a single word or number, but matching the look of a scan exactly is hard.

## How to match the original font

Edited text that looks slightly different from the rest of the page is the most common complaint. To get a better match:

1. **Find out which font the PDF uses.** In Adobe Acrobat Reader, go to **File > Properties > Fonts**. Names like `ABCDEF+Calibri` mean the font is Calibri.
2. **Install that font** on your computer if you don't have it, then reopen the PDF in your editor.
3. **Match size and colour.** Most body text is 9 to 12 pt and black or dark grey. Compare side by side at high zoom.

Why this happens: [Fonts in PDF files](/learn/fonts-in-pdf/).

## A note on responsible editing

Editing your own documents, drafts and forms is normal. Changing the content of official documents you received, such as invoices, bank statements, certificates or contracts, and presenting them as the original can be illegal. When a document issued by someone else is wrong, ask them for a corrected version.
