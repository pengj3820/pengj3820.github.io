---
title: "Python PDF Libraries Compared: PyMuPDF vs pypdf vs pdfplumber (and OCR)"
description: "Which Python library should you use for PDFs? A practical comparison of PyMuPDF, pypdf, pdfplumber, PaddleOCR and OCRmyPDF: features, speed and licences."
summary: "Use PyMuPDF for speed and the widest feature set (if its AGPL licence works for you), pypdf for lightweight, pure-Python merging, splitting and encryption, and pdfplumber for precise table and layout extraction. For scanned PDFs, add OCR: PaddleOCR for accuracy and Asian languages, OCRmyPDF for one-command searchable PDFs."
order: 3
tags: ["Python", "PyMuPDF", "pypdf", "pdfplumber", "OCR"]
updated: 2026-09-23
related: ["cant-copy-text-from-pdf", "make-scanned-pdf-searchable", "convert-pdf-to-word"]
faqs:
  - q: "What's the best Python library to extract text from a PDF?"
    a: "PyMuPDF is the fastest and most accurate general-purpose choice. pdfplumber is slower but gives finer control over layout and tables. pypdf works everywhere with no compiled dependencies but its text extraction is more basic."
  - q: "What happened to PyPDF2?"
    a: "PyPDF2 was merged back into pypdf in 2022 and is no longer maintained. Use pypdf; most code only needs the import changed from PyPDF2 to pypdf."
  - q: "Which Python PDF libraries can I use in commercial, closed-source software?"
    a: "pypdf (BSD), pdfplumber (MIT) and PaddleOCR (Apache 2.0) have permissive licences. PyMuPDF is AGPL v3 unless you buy a commercial licence. OCRmyPDF is MPL 2.0, which allows use in closed-source software as long as you share changes you make to OCRmyPDF itself."
  - q: "Can any of these libraries read scanned PDFs?"
    a: "Not on their own. Scanned PDFs contain images, not text. You need OCR first, such as PaddleOCR or OCRmyPDF, after which any of the libraries can read the text."
---

There's no single "best" Python PDF library. Each is strong at different things. This page compares the five you're most likely to need.

## Quick recommendation

| If you need to… | Use |
|---|---|
| Do a bit of everything, fast | **PyMuPDF** |
| Merge, split, rotate or encrypt with no compiled dependencies | **pypdf** |
| Extract tables, or text with exact positions | **pdfplumber** |
| Read text from scans, especially Asian languages or photos | **PaddleOCR** |
| Turn scanned PDFs into searchable PDFs with one command | **OCRmyPDF** |

## Feature comparison

| | PyMuPDF | pypdf | pdfplumber |
|---|---|---|---|
| Extract text | ✅ Excellent | ✅ Basic | ✅ Very good, layout-aware |
| Extract tables | ✅ `find_tables()` | ❌ | ✅ Best-in-class |
| Extract images | ✅ | ✅ | ⚠️ Metadata and positions |
| Render pages to PNG/JPG | ✅ | ❌ | ⚠️ Via pypdfium2 (debugging) |
| Merge / split / rotate | ✅ | ✅ | ❌ |
| Add text, watermarks | ✅ | ⚠️ Stamp from another PDF | ❌ |
| True redaction | ✅ | ❌ | ❌ |
| Encrypt / decrypt | ✅ | ✅ | ⚠️ Open encrypted files only |
| Forms (read/fill) | ✅ | ✅ | ⚠️ Low-level access only |
| Pure Python | ❌ (C library) | ✅ | ✅ (with pdfminer.six) |
| Licence | AGPL v3 or commercial | BSD | MIT |

## Speed

A quick test: extracting text from a simple 300-page PDF on the same machine (one run, PyMuPDF 1.28.2, pypdf 6.19.0, pdfplumber 0.11.10):

| Library | Time |
|---|---|
| PyMuPDF | 0.21 s |
| pypdf | 0.89 s |
| pdfplumber | 2.9 s |

Real documents vary, but the order is typical: PyMuPDF is several times faster than pure-Python libraries, and pdfplumber trades speed for detail.

## PyMuPDF

The all-rounder, built on the MuPDF C engine.

```python
import pymupdf

doc = pymupdf.open("input.pdf")
print(doc[0].get_text())
```

- **Pros:** fastest; widest feature set, including rendering, redaction, annotations and table detection; handles damaged files well.
- **Cons:** AGPL licence for closed-source or SaaS use unless you buy a commercial licence.

Full guide: [PyMuPDF tutorial](/developers/pymupdf-tutorial/).

## pypdf

Pure Python, no compiled dependencies, permissive licence. The successor of PyPDF2.

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("input.pdf")
print(reader.pages[0].extract_text())

writer = PdfWriter()
for path in ["a.pdf", "b.pdf"]:
    writer.append(path)
writer.write("merged.pdf")
```

- **Pros:** installs anywhere (serverless, restricted environments); BSD licence; good for page manipulation, metadata, encryption and forms.
- **Cons:** slower; basic text extraction; can't render pages.

## pdfplumber

Built on pdfminer.six, designed for **extracting data** accurately.

```python
import pdfplumber

with pdfplumber.open("input.pdf") as pdf:
    page = pdf.pages[0]
    print(page.extract_text())
    print(page.extract_tables())
# [[['Item', 'Qty', 'Price'], ['Paper', '2', '10.00'], ['Ink', '1', '30.00']]]
```

- **Pros:** excellent table extraction with tunable settings; access to every character, line and rectangle with coordinates; visual debugging.
- **Cons:** slowest of the three; read-only, so it can't modify PDFs.

## OCR: PaddleOCR vs OCRmyPDF

None of the libraries above can read **scanned** PDFs, because those pages are images. You need OCR.

| | PaddleOCR | OCRmyPDF |
|---|---|---|
| Engine | Deep-learning models (PP-OCR) | Tesseract |
| Best at | Photos, poor scans, rotated text, Chinese/Japanese/Korean | Clean printed documents |
| Output | Text and boxes (you build the PDF) | Searchable PDF, ready to use |
| Setup | `pip install paddlepaddle paddleocr`, then downloads models | `pip install ocrmypdf`, plus Tesseract and Ghostscript installed on the system |
| GPU | Optional, much faster | Not used |
| Licence | Apache 2.0 | MPL 2.0 |

**OCRmyPDF** in one line:

```bash
ocrmypdf --language eng input.pdf output.pdf
```

**PaddleOCR** gives you text and coordinates to use however you like: see [How to OCR a PDF with PaddleOCR](/developers/paddleocr-pdf-ocr/), including a complete searchable-PDF script built with PyMuPDF.

## Common combinations

- **Text extraction pipeline:** PyMuPDF to read; if a page returns no text, send it to PaddleOCR.
- **Invoice or report data:** pdfplumber for tables, PyMuPDF for everything else.
- **LLM / RAG ingestion:** see [How to convert PDF to Markdown for LLMs](/developers/pdf-to-markdown-for-llms/) and [AI PDF parsing tools](/developers/ai-pdf-parsing-tools/).
- **Closed-source product:** pypdf plus pdfplumber, with PaddleOCR or OCRmyPDF for scans. All have permissive licences.
