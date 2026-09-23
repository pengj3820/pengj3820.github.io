---
title: "PyMuPDF Tutorial: Read, Edit and Convert PDFs in Python"
description: "A practical PyMuPDF guide with tested code: extract text, tables and images, render pages, merge, split, watermark, redact, encrypt and compress PDFs."
summary: "PyMuPDF (import pymupdf) is the fastest all-round Python PDF library. Install it with pip install pymupdf, open a file with pymupdf.open(), then use page.get_text(), page.find_tables(), page.get_pixmap() and doc.insert_pdf() for most everyday tasks. Note its AGPL license before using it in closed-source software."
order: 1
tags: ["Python", "PyMuPDF"]
updated: 2026-09-23
related: ["cant-copy-text-from-pdf", "merge-pdf-files", "convert-pdf-to-jpg", "how-to-compress-a-pdf"]
faqs:
  - q: "What's the difference between fitz and pymupdf?"
    a: "They are the same library. Older code uses import fitz (named after MuPDF's original graphics engine). Since version 1.24.3 the recommended import is import pymupdf, and the fitz alias is deprecated: it still works but prints a warning and will be removed."
  - q: "Can PyMuPDF read scanned PDFs?"
    a: "It opens them, but get_text() returns nothing because the pages are images. Run OCR first, for example with PaddleOCR or OCRmyPDF, and PyMuPDF can then read the text layer."
  - q: "Is PyMuPDF free for commercial use?"
    a: "It is dual-licensed: free under the GNU AGPL v3, which requires you to release your source code if you distribute the software or offer it as a network service, or under a paid commercial licence from Artifex. For permissive licensing, consider pypdf (BSD) or pdfplumber (MIT)."
  - q: "Why is some extracted text in the wrong order?"
    a: "PDFs store text in drawing order, not reading order. Use page.get_text(sort=True) to sort blocks top-left to bottom-right, or page.get_text('blocks') to handle columns yourself."
---

PyMuPDF is a Python binding for **MuPDF**, the fast C library behind many PDF viewers. It reads, renders and edits PDFs, and also opens XPS, EPUB and image files.

Every snippet below was run against **PyMuPDF 1.28.2** on Python 3.11.

## Install

```bash
pip install pymupdf
```

Prebuilt wheels are available for Windows, macOS and Linux, so there's nothing to compile.

```python
import pymupdf

print(pymupdf.__doc__)  # PyMuPDF 1.28.2: Python bindings for the MuPDF 1.28.2 library.
```

> **`import fitz` vs `import pymupdf`:** older tutorials use `import fitz`. It still works but is deprecated and prints a warning. Use `import pymupdf` in new code; the functions are identical. More: [fitz vs pymupdf](/developers/pymupdf-import-fitz/).

## Open a PDF and read its metadata

```python
import pymupdf

doc = pymupdf.open("input.pdf")
print(doc.page_count)          # 3
print(doc.metadata["format"])  # PDF 1.7
print(doc.is_encrypted)        # False
```

Pages are zero-based: `doc[0]` is the first page. You can also loop with `for page in doc:`. Use `with pymupdf.open(...) as doc:` to close the file automatically.

## Extract text

```python
import pymupdf

with pymupdf.open("input.pdf") as doc:
    for page in doc:
        print(f"--- page {page.number + 1} ---")
        print(page.get_text())
```

Save the whole document to a text file:

```python
with pymupdf.open("input.pdf") as doc:
    text = "\n".join(page.get_text() for page in doc)

with open("output.txt", "w", encoding="utf-8") as f:
    f.write(text)
```

### Text with positions

`get_text("blocks")` returns paragraphs with their coordinates, useful for columns, headers and footers:

```python
page = doc[0]
for x0, y0, x1, y1, text, block_no, block_type in page.get_text("blocks"):
    print(round(x0), round(y0), text.strip())
```

Other modes include `"words"` (every word with its box), `"dict"` (fonts, sizes, colours) and `"html"`.

### Search for text

`search_for()` returns a rectangle for every match:

```python
for page in doc:
    for rect in page.search_for("Total due"):
        print(page.number + 1, rect)
# 1 Rect(72.0, 117.1, 122.0, 133.6)
```

## Extract tables

```python
page = doc[0]
tables = page.find_tables()
for table in tables:
    print(table.extract())
# [['Item', 'Qty', 'Price'], ['Paper', '2', '10.00'], ['Ink', '1', '30.00']]
```

With pandas installed, `table.to_pandas()` returns a DataFrame. Table detection works best on tables with visible ruling lines.

## Extract images

```python
import os
import pymupdf

doc = pymupdf.open("input.pdf")
os.makedirs("images", exist_ok=True)

for page in doc:
    for img in page.get_images(full=True):
        xref = img[0]
        info = doc.extract_image(xref)
        path = f"images/page{page.number + 1}_{xref}.{info['ext']}"
        with open(path, "wb") as f:
            f.write(info["image"])
```

This saves the embedded images at their original resolution and format (JPEG, PNG and so on).

## Convert pages to images (PNG/JPG)

```python
doc = pymupdf.open("input.pdf")
for page in doc:
    pix = page.get_pixmap(dpi=150)
    pix.save(f"page-{page.number + 1}.png")
```

Use `dpi=300` for print quality, and a `.jpg` file name for smaller files. An A4 page at 150 DPI is 1240 × 1755 pixels.

## Merge PDFs

```python
import pymupdf

result = pymupdf.open()  # new, empty PDF
for path in ["a.pdf", "b.pdf"]:
    with pymupdf.open(path) as src:
        result.insert_pdf(src)
result.save("merged.pdf")
```

## Split a PDF

Extract a page range. `from_page` and `to_page` are zero-based and **inclusive**:

```python
src = pymupdf.open("input.pdf")

part = pymupdf.open()
part.insert_pdf(src, from_page=1, to_page=2)  # pages 2–3
part.save("pages-2-3.pdf")
```

One file per page:

```python
for i in range(src.page_count):
    single = pymupdf.open()
    single.insert_pdf(src, from_page=i, to_page=i)
    single.save(f"page-{i + 1}.pdf")
```

## Delete, reorder and rotate pages

```python
doc = pymupdf.open("input.pdf")
doc.delete_page(1)         # remove page 2
doc.select([1, 0])         # keep these pages, in this order
doc[0].set_rotation(90)    # rotate clockwise; 0, 90, 180 or 270
doc.save("edited.pdf")
```

## Add a text watermark

```python
doc = pymupdf.open("input.pdf")
for page in doc:
    center = pymupdf.Point(100, 500)
    page.insert_text(
        center, "CONFIDENTIAL",
        fontsize=60, color=(1, 0, 0), fill_opacity=0.25,
        morph=(center, pymupdf.Matrix(30)),  # tilt 30 degrees
        overlay=True,
    )
doc.save("watermarked.pdf")
```

Note that `morph` needs a `pymupdf.Point`; a plain tuple raises `AttributeError`.

## Redact (permanently remove) text

Unlike drawing a black box, redaction **deletes** the underlying text:

```python
doc = pymupdf.open("input.pdf")
for page in doc:
    for rect in page.search_for("Jane Doe"):
        page.add_redact_annot(rect, fill=(0, 0, 0))
    page.apply_redactions()
doc.save("redacted.pdf")
```

After saving, `"Jane Doe"` no longer appears in `get_text()`.

## Replace text

PDFs have no "find and replace". The practical approach is to redact the old text and write new text in its place:

```python
doc = pymupdf.open("input.pdf")
page = doc[0]
for rect in page.search_for("$1,250.00"):
    page.add_redact_annot(rect, text="$1,300.00", fontname="helv", fontsize=12, fill=(1, 1, 1))
page.apply_redactions()
doc.save("changed.pdf")
```

The replacement uses a standard font (Helvetica here), so it may not exactly match the original typeface. For a no-code approach, see [How to change text in a PDF](/questions/change-text-in-pdf/).

## Encrypt and decrypt

Add an open password with AES-256:

```python
doc = pymupdf.open("input.pdf")
doc.save(
    "protected.pdf",
    encryption=pymupdf.PDF_ENCRYPT_AES_256,
    owner_pw="owner-secret",
    user_pw="open-me",
    permissions=pymupdf.PDF_PERM_PRINT | pymupdf.PDF_PERM_ACCESSIBILITY,
)
```

Remove the password (when you know it):

```python
doc = pymupdf.open("protected.pdf")
if doc.needs_pass:
    doc.authenticate("open-me")  # returns 0 if the password is wrong
doc.save("unlocked.pdf", encryption=pymupdf.PDF_ENCRYPT_NONE)
```

## Compress a PDF

Lossless cleanup (removes unused objects, compresses streams):

```python
doc = pymupdf.open("input.pdf")
doc.save("smaller.pdf", garbage=4, deflate=True, clean=True)
```

Also downsample large images, which is where most of the size usually is:

```python
doc = pymupdf.open("input.pdf")
doc.rewrite_images(dpi_threshold=100, dpi_target=72, quality=60)
doc.ez_save("smaller.pdf")  # save() with sensible compression defaults
```

Learn why this works in [How PDF compression works](/learn/how-pdf-compression-works/).

## Read the table of contents

```python
print(doc.get_toc())
# [[1, 'Invoice 1', 1], [1, 'Invoice 2', 2], [1, 'Invoice 3', 3]]
```

Each entry is `[level, title, page_number]`. Use `doc.set_toc(...)` with the same format to write bookmarks.

## License: read this before shipping

PyMuPDF is **dual-licensed**:

- **GNU AGPL v3** (free). If you distribute your software or run it as a network service, you must publish your source code under a compatible licence.
- **Commercial licence** from Artifex (paid), which removes that requirement.

For personal scripts and internal tools that's usually fine. For closed-source products or SaaS, get a commercial licence or use a permissively licensed library. See [Python PDF libraries compared](/developers/python-pdf-libraries-compared/).

## Next steps

- Scanned PDFs have no text to extract. Add OCR with [PaddleOCR](/developers/paddleocr-pdf-ocr/).
- Official docs: pymupdf.readthedocs.io
