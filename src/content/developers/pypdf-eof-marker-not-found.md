---
title: "Fix pypdf \"EOF marker not found\" (PdfReadError)"
description: "Why pypdf and PyPDF2 raise 'EOF marker not found' or 'Stream has ended unexpectedly', and how to detect, avoid and repair broken PDF files in Python."
summary: "The file isn't a complete PDF: it was truncated during download, it's an HTML error page saved with a .pdf name, or it's still being written. Check that the file starts with %PDF- and has a sensible size, re-download it properly, or repair it with PyMuPDF or qpdf."
order: 10
tags: ["Error fix", "pypdf"]
updated: 2026-09-23
related: ["pdf-wont-open"]
faqs:
  - q: "Why do I get 'Stream has ended unexpectedly' instead of 'EOF marker not found'?"
    a: "Current pypdf versions only log 'EOF marker not found' as a warning by default and keep trying, then usually fail later with PdfStreamError: Stream has ended unexpectedly. Older PyPDF2 versions, and pypdf with strict=True, raise PdfReadError: EOF marker not found straight away. The cause is the same."
  - q: "Can I just ignore the error?"
    a: "Only if the missing part isn't needed. A truncated file is missing data, usually the cross-reference table at the end, so some pages or objects may be gone. Repairing rebuilds what can be recovered; re-downloading gets you the complete file."
---

## The error

Depending on your version and settings, you'll see one of these:

```text
pypdf.errors.PdfReadError: EOF marker not found
```

```text
WARNING: EOF marker not found
pypdf.errors.PdfStreamError: Stream has ended unexpectedly
```

A valid PDF must end with the line `%%EOF`. pypdf reads the file from the end to find it; if it isn't there, the file is incomplete or isn't a PDF at all.

We reproduced both messages with **pypdf 6.19**: the default mode logs the warning and then raises `PdfStreamError`, while `PdfReader(..., strict=True)` raises `PdfReadError: EOF marker not found`. Older **PyPDF2** raised `PdfReadError` by default.

## The three usual causes

1. **Truncated download.** The connection dropped, a size limit cut the file off, or you read the response before it finished.
2. **It isn't a PDF.** A login page, "access denied" page or 404 page was saved with a `.pdf` name. pypdf then also logs `invalid pdf header: b'<!DOC'`.
3. **The file is still being written** by another process, such as a scanner, a sync client or a job that hasn't finished.

## Step 1: check what you actually have

```python
import os

def looks_like_pdf(path):
    with open(path, "rb") as f:
        return f.read(5) == b"%PDF-"

print(os.path.getsize("input.pdf"), looks_like_pdf("input.pdf"))
```

- **0 bytes or a few KB** for a document that should be larger means a failed download. (An empty file raises `EmptyFileError: Cannot read an empty file` instead.)
- **Doesn't start with `%PDF-`** means it's something else. Open it in a text editor; you'll often see HTML.

## Step 2: download PDFs properly

Most cases come from download code that doesn't check the response:

```python
import requests

resp = requests.get(url, timeout=60)
resp.raise_for_status()                      # fail on 403/404/500 instead of saving the error page
if not resp.content.startswith(b"%PDF-"):
    raise ValueError(f"Not a PDF: {resp.headers.get('Content-Type')}")

with open("input.pdf", "wb") as f:
    f.write(resp.content)
```

If the server needs cookies or a login, you'll get an HTML page with status 200. The `%PDF-` check catches that too.

## Step 3: repair a damaged file

If the file is a real but truncated PDF, **PyMuPDF** can often rebuild it:

```python
import pymupdf

doc = pymupdf.open("truncated.pdf")
print(doc.page_count, doc.is_repaired)   # 3 True
doc.save("repaired.pdf", garbage=3, deflate=True)
```

In our test, a PDF cut off at 50% opened in PyMuPDF with `is_repaired == True`, all pages and text intact, and the saved copy then loaded in pypdf even with `strict=True`.

**qpdf** (`qpdf damaged.pdf repaired.pdf`) is another option for files with a broken cross-reference table, but it's less forgiving with truncation. On the same half-truncated test file, qpdf 11.9 gave up with `unable to find trailer dictionary while recovering damaged file`, while PyMuPDF recovered everything. Try PyMuPDF first.

If neither tool can open the file, the missing data is simply gone. Get a fresh copy from the source.

## Related

- [PyMuPDF tutorial](/developers/pymupdf-tutorial/)
- Not a developer? See [PDF won't open? How to fix it](/questions/pdf-wont-open/).
