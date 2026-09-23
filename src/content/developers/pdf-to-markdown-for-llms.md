---
title: "How to Convert PDF to Markdown for LLMs and RAG (Python)"
description: "Turn PDFs into clean Markdown for ChatGPT, Claude, LangChain or LlamaIndex pipelines with PyMuPDF4LLM, MarkItDown or Docling. Tested code, speed and scanned-PDF results."
summary: "For digital PDFs, pymupdf4llm.to_markdown('file.pdf') gives good Markdown with headings and tables in one line; MarkItDown is much faster but skips scanned pages. For complex layouts or scans, use a layout-aware tool such as Docling, and chunk the output by page or heading before embedding."
order: 4
tags: ["Python", "LLM", "RAG", "PyMuPDF4LLM", "MarkItDown", "Docling"]
updated: 2026-09-23
related: ["cant-copy-text-from-pdf", "make-scanned-pdf-searchable"]
faqs:
  - q: "Why convert PDFs to Markdown instead of plain text?"
    a: "Markdown keeps structure that plain text loses: headings, lists and tables. LLMs understand that structure well, and it lets you split documents into meaningful chunks, such as one section per chunk, which improves retrieval in RAG systems."
  - q: "Can't I just send the PDF to the LLM directly?"
    a: "Many LLM APIs now accept PDFs directly, which is great for one-off questions. For search over many documents (RAG), you still need to extract text once, chunk it and index it, and doing that locally is much cheaper than sending every page to a model."
  - q: "Which tool handles scanned PDFs?"
    a: "PyMuPDF4LLM runs Tesseract OCR automatically when it's installed. Docling, Marker, MinerU and olmocr are built for scans and complex layouts. MarkItDown's built-in PDF converter returns nothing for image-only pages."
---

LLMs read Markdown well, and Markdown keeps the **headings, lists and tables** that plain-text extraction flattens. This guide compares three popular Python converters on the same files, with code you can copy.

## Quick comparison

We converted a small invoice PDF (headings, text, a ruled table), an image-only scan of it, and a 300-page file on a laptop-class CPU:

| | PyMuPDF4LLM 1.28 | MarkItDown 0.1.8 | Docling |
|---|---|---|---|
| Headings | ✅ `# Invoice 2026-001` | ❌ plain lines | ✅ |
| Tables | ✅ Markdown table | ✅ Markdown table | ✅ (strong on complex tables) |
| Scanned page | ⚠️ Text via Tesseract; table garbled | ❌ Empty output | ✅ Built-in OCR |
| 300 pages | ~58 s (≈0.2 s/page) | ~2 s | Slower (runs AI models) |
| GPU needed | No | No | No (faster with one) |
| License | AGPL-3.0 | MIT | MIT (code) |

Docling downloads its AI models on first run, which our test environment couldn't do, so its column is based on the project's documentation rather than our own run.

**Rule of thumb:**
- Lots of **born-digital** PDFs, speed matters → **MarkItDown**
- Want **headings and structure** for chunking → **PyMuPDF4LLM**
- **Scans, multi-column papers, complex tables** → **Docling** (or see [AI PDF parsing tools](/developers/ai-pdf-parsing-tools/))

## PyMuPDF4LLM

```bash
pip install pymupdf4llm
```

```python
import pymupdf4llm

md = pymupdf4llm.to_markdown("input.pdf")
print(md)
```

Output from our test file:

```markdown
# Invoice 2026-001

Customer: Jane Doe Total due: $1,250.00

|Item|Qty|Price|
|---|---|---|
|Paper|2|10.00|
|Ink|1|30.00|
```

### One chunk per page

For RAG, `page_chunks=True` returns a list with one dictionary per page, including metadata you can store with each chunk:

```python
chunks = pymupdf4llm.to_markdown("input.pdf", page_chunks=True)
for c in chunks:
    print(c["metadata"]["page_number"], c["text"][:80])
```

Each item has the keys `metadata`, `toc_items`, `page_boxes` and `text`.

### OCR

If **Tesseract** is installed, PyMuPDF4LLM automatically OCRs pages that need it, and you'll see `Using Tesseract for OCR processing.` in the output. Pass `use_ocr=False` to turn this off. On our scan it recovered the text lines correctly but mangled the table, so for scan-heavy work consider Docling.

**License:** AGPL-3.0, like PyMuPDF. Closed-source commercial use needs a licence from Artifex.

## MarkItDown (Microsoft)

```bash
pip install 'markitdown[pdf]'
```

```python
from markitdown import MarkItDown

result = MarkItDown().convert("input.pdf")
print(result.text_content)
```

MarkItDown is a general converter for PDF, Word, PowerPoint, Excel, HTML and more, so it's handy when your documents aren't all PDFs. It was **about 30× faster** than PyMuPDF4LLM on our 300-page file. The trade-offs: headings come out as plain lines, and **image-only pages produce nothing**. Microsoft offers separate OCR add-ons for that.

**License:** MIT.

## Docling (for difficult documents)

```bash
pip install docling
```

```python
from docling.document_converter import DocumentConverter

result = DocumentConverter().convert("input.pdf")   # local path or URL
print(result.document.export_to_markdown())
```

Docling runs layout-analysis and table-structure models, so it handles **multi-column papers, complex tables and scans** far better than text-based converters. It downloads its models on first use and is slower; a GPU helps with large volumes. There's also a command line: `docling input.pdf`.

**License:** MIT for the code; individual models carry their own licences.

## Tips for RAG pipelines

1. **Check for scans first.** Pages where `page.get_text()` returns nothing need OCR. Route only those to the slow tools.
2. **Chunk by structure, not by fixed length.** Split on Markdown headings (`#`, `##`) or per page, and keep the page number in each chunk's metadata so answers can cite sources.
3. **Keep tables whole.** Don't cut a Markdown table in the middle; a half table confuses the model.
4. **Strip repeated headers and footers** (page numbers, running titles) before embedding; they add noise to every chunk.
5. **Spot-check the output.** Convert a few representative files and read the Markdown before processing thousands.

## Related

- [AI tools for parsing PDFs](/developers/ai-pdf-parsing-tools/): Marker, MinerU, olmocr, Surya and more
- [PyMuPDF tutorial](/developers/pymupdf-tutorial/)
- [How to OCR a PDF with PaddleOCR](/developers/paddleocr-pdf-ocr/)
