---
title: "AI Tools for Parsing PDFs: Docling, Marker, MinerU, olmOCR and More"
description: "A comparison of open-source AI document parsers for turning PDFs into Markdown or JSON for LLMs and RAG: what each is best at, hardware needs and licences."
summary: "For most RAG pipelines start with Docling (MIT, runs on CPU). Choose Marker or MinerU for high-quality Markdown from papers and books, olmOCR when you have a big GPU and difficult scans, and PyMuPDF4LLM or MarkItDown when your PDFs are born-digital and speed matters. Check model licences before commercial use."
order: 5
tags: ["AI", "LLM", "RAG", "OCR"]
updated: 2026-09-23
related: ["make-scanned-pdf-searchable"]
faqs:
  - q: "Do I need an AI parser, or is PyMuPDF enough?"
    a: "If your PDFs are born-digital with simple layouts (reports, invoices, contracts), fast text extractors like PyMuPDF4LLM or MarkItDown are enough. AI parsers pay off with scans, multi-column scientific papers, complex tables, formulas and mixed layouts."
  - q: "Can I use these tools commercially?"
    a: "The code of most tools here is open source under MIT or Apache 2.0, but check the model weights separately. Marker and Surya weights are free only for research, personal use and startups under $5M in funding or revenue; MinerU uses its own licence based on Apache 2.0 with extra conditions; PyMuPDF4LLM is AGPL-3.0."
  - q: "Which one runs without a GPU?"
    a: "Docling, PyMuPDF4LLM, MarkItDown and Unstructured run on CPU. Marker, Surya and MinerU run on CPU but are much faster on a GPU. olmOCR is built around a 7-billion-parameter vision model and needs a recent NVIDIA GPU with at least 12 GB of memory, or a remote inference server."
---

Classic PDF libraries read the text that's stored in a PDF. **AI document parsers** go further: they look at each page like a person would, detecting headings, columns, tables, formulas and reading order, and they OCR scanned pages. The result is clean Markdown or JSON that LLMs and RAG pipelines can use directly.

## At a glance

| Tool | Best at | Hardware | Code licence | Model licence notes |
|---|---|---|---|---|
| **Docling** | All-round conversion, tables, many formats | CPU (GPU optional) | MIT | Per-model licences |
| **Marker** | High-quality Markdown from papers and books | CPU, GPU or Apple Silicon | Apache-2.0 | Weights: free for research, personal use and startups under $5M |
| **Surya** | OCR, layout, reading order, tables (90+ languages) | CPU, GPU or Apple Silicon | Apache-2.0 | Same terms as Marker |
| **MinerU** | Scientific and Chinese documents, formulas | CPU works; GPU recommended | MinerU Open Source License (Apache 2.0 + conditions) | See licence |
| **olmOCR** | Hard scans, handwriting, old documents | NVIDIA GPU, 12 GB+ | Apache-2.0 | Model by AI2 |
| **Unstructured** | Pre-processing pipelines, many file types | CPU | Apache-2.0 | |
| **PyMuPDF4LLM** | Fast Markdown from born-digital PDFs | CPU | AGPL-3.0 | No AI models |
| **MarkItDown** | Very fast conversion of Office files and PDFs | CPU | MIT | No AI models |

Licence details come from each project's repository as of September 2026. They change, so re-check before shipping.

## Docling

Originally from IBM Research, Docling converts PDF, Word, PowerPoint, HTML and images into a structured document that exports to Markdown, HTML or JSON. It includes layout analysis, table-structure recognition and OCR, and plugs into LangChain and LlamaIndex.

```python
from docling.document_converter import DocumentConverter

result = DocumentConverter().convert("paper.pdf")
print(result.document.export_to_markdown())
```

Command line: `docling paper.pdf`. There's also an optional vision-language-model pipeline (`--pipeline vlm`) for the hardest pages.

**Choose it when:** you want one dependable default for mixed documents and a permissive licence.

## Marker

Marker produces some of the cleanest Markdown for **academic papers and books**: equations become LaTeX, tables are preserved, and headers and footers are removed. It can also output JSON, HTML or pre-split chunks.

```bash
pip install marker-pdf
marker_single paper.pdf --output_format markdown
```

**Watch out:** the code is Apache-2.0, but the model weights use a modified OpenRAIL-M licence that is free only for research, personal use and startups under $5M in funding or revenue.

## Surya

The OCR and layout engine behind Marker, usable on its own: text detection and recognition in 90+ languages, layout analysis, reading-order detection and table recognition. Pick it when you need the building blocks rather than finished Markdown. Same licence terms as Marker.

## MinerU

From OpenDataLab (Shanghai AI Lab). Strong on **scientific papers, formulas and Chinese-language documents**, with outputs in Markdown and JSON. The base install runs on CPU; larger configurations need a GPU with 8 GB+ of memory.

**Licence:** the "MinerU Open Source License", based on Apache 2.0 with additional conditions. Read it before commercial use.

## olmOCR

From the Allen Institute for AI (AI2). It uses a 7-billion-parameter vision-language model to linearise difficult pages (scans, handwriting, tables, equations) into clean text and Markdown. It was built to process millions of PDFs for LLM training data.

```bash
pip install olmocr[gpu] --extra-index-url https://download.pytorch.org/whl/cu128
olmocr ./workspace --markdown --pdfs document.pdf
```

**Hardware:** a recent NVIDIA GPU with at least 12 GB of memory, or point it at a remote inference server.

## Unstructured

A toolkit for turning PDFs, emails, HTML, Office files and more into structured elements (titles, paragraphs, tables) for LLM pipelines. Popular as the pre-processing step in LangChain and similar frameworks. Apache-2.0.

## Fast, non-AI options

When your PDFs are **born-digital** (created by software rather than scanned), you often don't need AI at all:

- **PyMuPDF4LLM:** Markdown with headings and tables, about 0.2 s per page in our test.
- **MarkItDown:** about 30× faster in our test, but no headings and no OCR for scanned pages.

Code and benchmarks: [How to convert PDF to Markdown for LLMs](/developers/pdf-to-markdown-for-llms/).

## How to choose

1. **Test with your own documents.** Parser quality depends heavily on document type. Take 10 to 20 representative files and compare outputs side by side.
2. **Split the workload.** Use a fast extractor for born-digital pages and send only scanned or complex pages to an AI parser.
3. **Mind the licences.** For commercial or closed-source products, prefer MIT and Apache-2.0 tools whose models are also permissively licensed, or budget for a commercial licence.
4. **Consider hardware and cost.** GPU-based parsers are more accurate on hard pages but far more expensive to run at scale.

## Related

- [How to OCR a PDF with PaddleOCR](/developers/paddleocr-pdf-ocr/)
- [Python PDF libraries compared](/developers/python-pdf-libraries-compared/)
- [The best free and open-source PDF tools](/questions/best-free-open-source-pdf-tools/) (desktop apps for everyday use)
