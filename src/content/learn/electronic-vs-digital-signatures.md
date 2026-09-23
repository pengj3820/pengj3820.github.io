---
title: "Electronic vs Digital Signatures in PDFs"
description: "The difference between drawing your signature on a PDF and a cryptographic digital signature, and which one you need."
summary: "An electronic signature is any mark that shows intent to sign, such as a typed name or a drawn signature image. A digital signature is a cryptographic seal, backed by a certificate, that proves who signed and that the document hasn't changed since."
order: 10
updated: 2026-09-23
related: ["sign-a-pdf", "fill-out-pdf-form", "password-protect-a-pdf"]
faqs:
  - q: "Is a drawn signature on a PDF legally binding?"
    a: "In many countries, including the US (ESIGN Act, UETA) and the EU (eIDAS), simple electronic signatures are legally valid for most everyday contracts. Some documents (wills, certain property or court documents) have stricter rules. Check local requirements for important documents."
  - q: "Why does my PDF say 'At least one signature is invalid' or 'validity unknown'?"
    a: "Either the document was modified after signing, or your reader doesn't trust the certificate that was used. The second is common and doesn't necessarily mean the signature is fake."
---

## Electronic signature (e-signature)

Any electronic mark that shows you agree: a typed name, a drawn signature, an image of your handwritten signature, or clicking "I agree" in a signing service.

- Easy: works in Preview, Edge, Acrobat Reader, phones.
- Legally accepted for most everyday agreements in many countries.
- ❌ On its own, doesn't prove **who** signed or prevent later edits.

## Digital signature

A cryptographic signature created with a **certificate** (a digital ID). The PDF stores a mathematical fingerprint of the document, encrypted with the signer's private key.

- ✅ Proves the signer's identity (as verified by the certificate issuer).
- ✅ Detects **any** change made after signing.
- ✅ Can include a trusted timestamp.
- Requires a certificate: from a certificate authority, a national ID card (common in Europe) or a signing service.

## E-signature services

Services like DocuSign, Adobe Acrobat Sign and Dropbox Sign combine both: people sign electronically, and the service applies a digital signature plus an **audit trail** (emails, IP addresses, timestamps).

## Which one do you need?

| Situation | Recommended |
|---|---|
| Signing a lease, NDA or permission slip someone emailed you | Simple e-signature ([how to](/questions/sign-a-pdf/)) |
| Collecting signatures from several people | E-signature service |
| Government, tenders, regulated industries | Digital or qualified signature (check the requirement) |
| Proving a document hasn't changed | Digital signature |
