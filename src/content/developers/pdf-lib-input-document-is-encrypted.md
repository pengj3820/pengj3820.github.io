---
title: "Fix pdf-lib \"Input document to PDFDocument.load is encrypted\""
description: "Why pdf-lib refuses encrypted PDFs, why ignoreEncryption: true produces broken files, and how to decrypt the PDF first so pdf-lib can edit it."
summary: "pdf-lib cannot decrypt PDFs. The ignoreEncryption: true option lets it load the file, but anything you save is corrupted. Decrypt the PDF first, with qpdf, pikepdf or PyMuPDF (using the password if it has one), then load the decrypted copy in pdf-lib."
order: 11
tags: ["Error fix", "pdf-lib", "JavaScript"]
updated: 2026-09-23
related: ["remove-pdf-password", "password-protect-a-pdf"]
faqs:
  - q: "Why is a PDF encrypted if it opens without a password?"
    a: "It has only an owner (permissions) password, which restricts printing or editing but lets anyone open it. The content is still encrypted, so pdf-lib reports it as encrypted. Tools like qpdf and pikepdf can remove this kind of encryption without a password."
  - q: "Can pdf-lib read text or render pages from an encrypted PDF?"
    a: "No. pdf-lib has no decryption support. For reading and rendering in JavaScript, use pdf.js, which can open encrypted PDFs (with the password if one is required)."
---

## The error

```text
Error: Input document to `PDFDocument.load` is encrypted. You can use
`PDFDocument.load(..., { ignoreEncryption: true })` if you wish to load the document anyways.
```

pdf-lib (tested with **1.17.1**) checks whether the PDF has an encryption dictionary and refuses to load it by default. This happens with both kinds of PDF protection:

- an **open (user) password**, where you need a password to view the file, and
- an **owner (permissions) password only**, where the file opens normally but printing or editing is restricted. Many bank statements and published reports are like this.

## Why `ignoreEncryption: true` is a trap

The error message suggests `ignoreEncryption: true`, and many answers online stop there. It does make the error go away:

```js
const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
doc.getPage(0).drawText('Hello');
const out = await doc.save();   // no error...
```

But **pdf-lib still can't decrypt anything**. It copies the encrypted objects as if they were plain data. We tested both kinds of encrypted input: pdf-lib loaded and saved them without complaint, and every output file was **corrupt** (MuPDF: `corrupt object stream`, no readable pages).

Only use `ignoreEncryption` if you need metadata such as the page count and never save the result.

## The fix: decrypt first, then use pdf-lib

### With qpdf (command line)

```bash
# Owner-password-only files: no password needed
qpdf --decrypt locked.pdf unlocked.pdf

# Files with an open password
qpdf --decrypt --password=THE_PASSWORD locked.pdf unlocked.pdf
```

### With pikepdf (Python, bundles qpdf)

```python
import pikepdf

with pikepdf.open("locked.pdf", password="THE_PASSWORD") as pdf:  # omit password for owner-only files
    pdf.save("unlocked.pdf")
```

### Then load it in pdf-lib

```js
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

const doc = await PDFDocument.load(fs.readFileSync('unlocked.pdf'));
doc.getPage(0).drawText('Hello', { x: 50, y: 50, size: 20 });
fs.writeFileSync('edited.pdf', await doc.save());
```

In our test, both decrypted files loaded normally, and the edited output kept the original text plus the new text.

Want the result protected again? Re-encrypt the final file with `qpdf --encrypt`, pikepdf, or [PyMuPDF](/developers/pymupdf-tutorial/#encrypt-and-decrypt). pdf-lib can't write encrypted PDFs.

## In the browser

If decryption must happen client-side, pdf-lib alone can't do it. The options are:

- decrypt on a server or in a build step with qpdf or pikepdf, or
- use a library with encryption support, such as a WebAssembly build of qpdf or MuPDF, before handing the bytes to pdf-lib.

## Only work with files you're allowed to modify

Removing a permissions password from your own documents, or documents you're authorised to edit, is fine. Bypassing restrictions on other people's documents may breach copyright or terms of use. Non-developers can see [How to remove a PDF password](/questions/remove-pdf-password/).
