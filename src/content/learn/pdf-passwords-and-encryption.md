---
title: "PDF Passwords, Permissions and Encryption"
description: "The two kinds of PDF passwords, what permissions like 'no printing' really do, and how strong PDF encryption is."
summary: "PDFs can have two passwords: an open password (required to view the file, and actually encrypts it) and a permissions password (restricts printing, copying or editing, but is easy to bypass). Use AES-256 encryption and a long password for sensitive files."
order: 8
updated: 2026-09-23
related: ["remove-pdf-password", "password-protect-a-pdf", "cant-copy-text-from-pdf"]
faqs:
  - q: "Can a forgotten PDF open password be recovered?"
    a: "Only by guessing it. With modern AES-256 encryption and a strong password, that is practically impossible. Old PDFs using 40-bit RC4 encryption can be cracked quickly. Always contact the sender first."
  - q: "Does a permissions password really stop people copying my PDF?"
    a: "No. It relies on software choosing to respect it. Many tools ignore it, and anyone can take screenshots. Treat it as a polite request, not security."
---

## Two different passwords

| | Open password (user password) | Permissions password (owner password) |
|---|---|---|
| **What it does** | Must be entered to view the file | Restricts printing, copying, editing, form filling |
| **Is the content encrypted?** | Yes, unreadable without the password | Content is encrypted but readable by anyone |
| **How strong?** | Strong with AES-256 and a good password | Weak, easily bypassed by many tools |
| **Typical use** | Bank statements, payslips, confidential reports | Discouraging edits to published documents |

A PDF can have one, both, or neither.

## Encryption strengths

| Method | PDF version | Strength |
|---|---|---|
| RC4 40-bit | 1.1+ | Broken, crackable in minutes |
| RC4 128-bit | 1.4+ | Outdated |
| AES 128-bit | 1.6+ | Good |
| **AES 256-bit** | 1.7 ext. / 2.0 | Recommended |

The encryption is only as strong as the **password**. A 6-digit number (like a birth date, often used by banks) can be guessed quickly by software. Use 12+ random characters for truly sensitive files.

## Common real-world patterns

- **Banks and payroll** often use your date of birth, account number digits or ID number as the open password. The email usually explains the format.
- **Published reports** may carry "no copy / no print" permissions.

## Good practice

- Send the password through a **different channel** than the file (e.g. text message vs email).
- Prefer AES-256 when your tool offers a choice.
- For long-term archives, avoid encryption: PDF/A forbids it, and lost passwords mean lost documents.

Next: [How to password-protect a PDF](/questions/password-protect-a-pdf/) · [How to remove a PDF password](/questions/remove-pdf-password/)
