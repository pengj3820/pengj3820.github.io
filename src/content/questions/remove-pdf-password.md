---
title: "How to Remove a Password From a PDF"
description: "Unlock a PDF you have the password for, remove printing or copying restrictions, and what to do if you forgot the password."
answer: "If you know the password: open the PDF, enter it, then save an unprotected copy — in Chrome use Print > Save as PDF; in Mac Preview use File > Export and untick Encrypt; in Adobe Acrobat use Protect > Remove Security. If you forgot the open password, the only real options are asking the sender or trying password recovery on your own file."
category: security
popular: true
updated: 2026-09-23
related: ["password-protect-a-pdf", "cant-copy-text-from-pdf", "pdf-wont-open"]
learn: ["pdf-passwords-and-encryption"]
faqs:
  - q: "Is it legal to remove a PDF password?"
    a: "Removing the password from your own documents, or documents you're authorised to use (like your bank statement), is fine. Bypassing protection on documents you don't have rights to may violate copyright law or terms of use."
  - q: "My bank statement PDF asks for a password. What is it?"
    a: "Banks usually explain the format in the email: often a combination like your date of birth (DDMMYYYY) or the last digits of your account or ID number."
---

## First: which password is it?

- **Asked for a password to open the file** → *open password*. You must know it.
- **Opens fine, but can't print, copy or edit** → *permissions password*. Usually easy to remove.

Learn more: [PDF passwords and encryption](/learn/pdf-passwords-and-encryption/).

## Remove an open password you know

### Chrome (any computer, free)
1. Drag the PDF into Chrome and enter the password.
2. Press **Ctrl+P / Cmd+P**, then Destination: **Save as PDF**.
3. Save. The new copy has no password.

### Mac Preview
1. Open the PDF and enter the password.
2. **File > Export…**, then **untick "Encrypt"** (or open **Permissions…** and remove the password).
3. Save with a new name.

### Adobe Acrobat (Pro)
**Tools > Protect > Encrypt > Remove Security**, then Save.

### iPhone
Open in Files, enter the password, then Share > **Print**, pinch outward on the preview > Share > Save to Files.

## Remove printing, copying or editing restrictions

- **Chrome's Print > Save as PDF** often works, since the output has no restrictions. If printing is disabled, the option may be blocked.
- **Online "unlock PDF" tools** remove permissions passwords when you confirm you have the right to do so.

## Forgot the open password?

1. **Ask the sender.** For bank, payroll or government PDFs, look for the password format in the original email or on their website.
2. **Try likely candidates** you would have used.
3. **Password recovery tools** try millions of guesses. This works well for old, weak (40-bit RC4) encryption or short passwords, and is practically impossible against AES-256 with a strong password.

There is no legitimate "master key" for encrypted PDFs.
