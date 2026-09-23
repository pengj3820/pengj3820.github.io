---
title: "Fix OCRmyPDF \"page already has text! – aborting\" (PriorOcrFoundError)"
description: "Why OCRmyPDF stops with PriorOcrFoundError: page already has text, and when to use --mode skip, --mode force or --mode redo (--skip-text, --force-ocr, --redo-ocr)."
summary: "OCRmyPDF refuses to OCR a page that already contains text, to avoid duplicating it. Use --mode skip (--skip-text) to OCR only the pages without text, --mode redo (--redo-ocr) to replace an old OCR layer, or --mode force (--force-ocr) to rasterise everything and OCR from scratch."
order: 13
tags: ["Error fix", "OCRmyPDF", "OCR"]
updated: 2026-09-23
related: ["make-scanned-pdf-searchable", "cant-copy-text-from-pdf"]
faqs:
  - q: "Which option should I use for a folder of mixed PDFs?"
    a: "--mode skip (or --skip-text). Pages that already have text are copied unchanged, and only image-only pages are OCRed, so it's safe to run on anything."
  - q: "Does --force-ocr reduce quality?"
    a: "It converts vector text and graphics into images before OCR, so the page loses its crisp vector text and the file usually gets bigger. Use it only when the existing text is wrong or garbled, or when a text watermark blocks OCR."
  - q: "What exit code does OCRmyPDF return for this error?"
    a: "Exit code 6 (ExitCode.already_done_ocr). Scripts can check for it to tell 'already searchable' apart from real failures."
---

## The error

With **OCRmyPDF 17.12** you'll see:

```text
PriorOcrFoundError: page already has text! - aborting (use --force-ocr or --mode force to force OCR; see also help for --skip-text, --redo-ocr, and --mode)
```

Older versions print a shorter form:

```text
ERROR - 1: page already has text! – aborting (use --force-ocr to force OCR)
```

The process exits with **code 6** (`already_done_ocr`) and no output file is written.

## Why it happens

OCRmyPDF found text on at least one page. That text is either:

- **real "digital" text**, because the PDF was created by software such as Word or a browser rather than scanned, or
- **an existing OCR layer** added earlier by a scanner, Adobe Scan or a previous OCRmyPDF run.

OCRmyPDF can't always tell these apart, so by default it stops rather than risk adding a second, overlapping text layer.

## Choose the right option

OCRmyPDF 17 introduced a single `--mode` (`-m`) option. The older flags still work as aliases.

| Situation | Use | Old flag |
|---|---|---|
| Mixed files; OCR only pages without text | `--mode skip` | `--skip-text` |
| Old OCR is poor; replace it with fresh OCR | `--mode redo` | `--redo-ocr` |
| Existing text is garbled, or a text watermark blocks OCR | `--mode force` | `--force-ocr` |
| The file is already fully searchable | Nothing to do | |

```bash
# Safe default for batches: leave text pages alone, OCR the rest
ocrmypdf --mode skip input.pdf output.pdf

# Replace an existing (hidden) OCR layer, keep real digital text
ocrmypdf --mode redo input.pdf output.pdf

# Rasterise every page and OCR from scratch
ocrmypdf --mode force input.pdf output.pdf
```

We ran all three on a PDF with digital text: each completed and produced a valid, searchable output.

### What each mode actually does

- **skip:** pages with any text are copied into the output **unchanged**; pages without text are OCRed. Nothing is lost.
- **redo:** removes existing **invisible** OCR text and runs OCR again. Visible (printable) text is left untouched, so it also handles documents that mix digital pages and scans.
- **force:** turns each page, including vector text and graphics, into an image, then OCRs it. Quality and file size may suffer, so use it as a last resort.

## Check first: does it even need OCR?

If you're processing many files, skip the ones that are already searchable. A quick check with [PyMuPDF](/developers/pymupdf-tutorial/):

```python
import pymupdf

def pages_without_text(path):
    with pymupdf.open(path) as doc:
        return [p.number + 1 for p in doc if not p.get_text().strip()]

print(pages_without_text("input.pdf"))   # [] means every page already has text
```

## In scripts

Treat exit code 6 as "already done", not as a failure:

```bash
ocrmypdf input.pdf output.pdf
case $? in
  0) echo "OCR complete" ;;
  6) echo "Already has text, skipped" ;;
  *) echo "Failed" ;;
esac
```

In Python, the same constant is `ocrmypdf.ExitCode.already_done_ocr`.

## Related

- [How to OCR a PDF with PaddleOCR](/developers/paddleocr-pdf-ocr/): an alternative engine, strong on Asian languages and low-quality scans.
- Not a developer? See [Make a scanned PDF searchable](/questions/make-scanned-pdf-searchable/).
