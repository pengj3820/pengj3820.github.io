---
title: "How to OCR a PDF With PaddleOCR in Python"
description: "Extract text from scanned PDFs with PaddleOCR 3.x, then combine it with PyMuPDF to create a searchable PDF. Includes language setup, GPU, CLI and 2.x migration notes."
summary: "Install paddlepaddle and paddleocr, create PaddleOCR(lang='en'), and call ocr.predict() on an image or directly on a PDF. Each result has rec_texts, rec_scores and rec_boxes. To make a searchable PDF, render pages with PyMuPDF, OCR them, and write the recognised text back as an invisible layer."
order: 2
tags: ["Python", "PaddleOCR", "PyMuPDF", "OCR"]
updated: 2026-09-23
related: ["make-scanned-pdf-searchable", "cant-copy-text-from-pdf", "scan-document-to-pdf-with-phone"]
faqs:
  - q: "Is PaddleOCR free for commercial use?"
    a: "Yes. PaddleOCR and PaddlePaddle are released under the Apache 2.0 licence, which allows commercial use. If you combine it with PyMuPDF, note that PyMuPDF is AGPL unless you buy a commercial licence."
  - q: "Does PaddleOCR need a GPU?"
    a: "No. It runs on CPU. A GPU makes large batches much faster; install the GPU build of PaddlePaddle and pass device='gpu:0'."
  - q: "Why does my old PaddleOCR code break?"
    a: "PaddleOCR 3.0 changed the API. ocr.ocr() is deprecated in favour of ocr.predict(), results are objects with rec_texts, rec_scores and rec_boxes instead of nested lists, use_angle_cls became use_textline_orientation, and use_gpu was replaced by device."
  - q: "PaddleOCR vs Tesseract: which is better?"
    a: "PaddleOCR's deep-learning models are generally more accurate on photos, low-quality scans, rotated text and Chinese, Japanese and Korean text. Tesseract (used by OCRmyPDF) is lighter, easier to install and does well on clean printed documents."
  - q: "Why does PaddleOCR fail with 'No available model hosting platforms detected'?"
    a: "The first run downloads models, and none of the model hosts was reachable. Check your network or proxy, or set PADDLE_PDX_MODEL_SOURCE to a host you can reach: huggingface, modelscope, aistudio or bos."
---

**PaddleOCR** is Baidu's open-source OCR toolkit. It detects text lines in an image and recognises them with deep-learning models, and it handles 100+ languages, including Chinese, Japanese and Korean.

This guide targets **PaddleOCR 3.7** with **PaddlePaddle 3.3**. Version 3 changed the API substantially. If you're updating old code, jump to [Migrating from PaddleOCR 2.x](#migrating-from-paddleocr-2x).

## Install

PaddleOCR runs on top of the PaddlePaddle deep-learning framework, so install both:

```bash
pip install paddlepaddle paddleocr
```

This installs the CPU build. For NVIDIA GPUs, install the matching `paddlepaddle-gpu` build for your CUDA version using the selector on paddlepaddle.org.cn, then install `paddleocr`.

**First run downloads the models**, about a hundred megabytes, into `~/.paddlex/official_models`. Models come from Hugging Face by default. If Hugging Face is blocked or slow where you are, choose another source before running:

```bash
export PADDLE_PDX_MODEL_SOURCE=modelscope   # or: aistudio, bos, huggingface
```

## OCR an image

```python
from paddleocr import PaddleOCR

ocr = PaddleOCR(
    lang="en",
    use_doc_orientation_classify=False,  # skip whole-page rotation detection
    use_doc_unwarping=False,             # skip curved-page correction
    use_textline_orientation=False,      # skip upside-down line detection
)

for res in ocr.predict("page-1.png"):
    for text, score in zip(res["rec_texts"], res["rec_scores"]):
        print(f"{score:.2f}  {text}")
```

The three `use_*` flags turn off extra models. That's faster and fine for straight, flat scans. Turn them on for phone photos or pages that may be rotated.

### What's in a result

`predict()` returns one result per image (or per PDF page). The fields you'll use most:

| Field | Contents |
|---|---|
| `rec_texts` | List of recognised text lines |
| `rec_scores` | Confidence for each line, from 0 to 1 |
| `rec_boxes` | Axis-aligned boxes as `[x_min, y_min, x_max, y_max]` in image pixels |
| `rec_polys` | Four-corner polygons, useful for rotated text |
| `page_index` | Page number when the input is a PDF |

Results can also print and save themselves:

```python
for res in ocr.predict("page-1.png"):
    res.print()                  # pretty-print everything
    res.save_to_json("output")   # output/page-1_res.json
    res.save_to_img("output")    # image with boxes drawn on it
```

## OCR a PDF directly

`predict()` accepts a PDF path and processes every page:

```python
from paddleocr import PaddleOCR

ocr = PaddleOCR(lang="en", use_doc_orientation_classify=False,
                use_doc_unwarping=False, use_textline_orientation=False)

pages = []
for res in ocr.predict("scanned.pdf"):
    pages.append("\n".join(res["rec_texts"]))

with open("scanned.txt", "w", encoding="utf-8") as f:
    f.write("\n\n".join(pages))
```

PaddleOCR renders each PDF page internally at about 144 DPI. For small print, render the pages yourself at a higher resolution, as in the next section.

## OCR with PyMuPDF for full control

Rendering pages with [PyMuPDF](/developers/pymupdf-tutorial/) lets you choose the resolution, skip pages that already have text, and map results back to PDF coordinates.

```python
import numpy as np
import pymupdf
from paddleocr import PaddleOCR

DPI = 200


def page_to_image(page, dpi=DPI):
    """Render a PDF page to a BGR numpy array, the format PaddleOCR expects."""
    pix = page.get_pixmap(dpi=dpi, colorspace=pymupdf.csRGB, alpha=False)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, 3)
    return img[:, :, ::-1].copy()  # RGB -> BGR


ocr = PaddleOCR(lang="en", use_doc_orientation_classify=False,
                use_doc_unwarping=False, use_textline_orientation=False)

doc = pymupdf.open("scanned.pdf")
for page in doc:
    if page.get_text().strip():
        continue  # page already has real text, no OCR needed
    res = ocr.predict(page_to_image(page))[0]
    print(f"--- page {page.number + 1} ---")
    print("\n".join(res["rec_texts"]))
```

## Make a searchable PDF

This is the most useful end result: the page **looks exactly like the scan**, but you can search, select and copy its text. The trick is to write each recognised line back onto the page as **invisible text** (`render_mode=3`) at the position PaddleOCR found it.

```python
import numpy as np
import pymupdf
from paddleocr import PaddleOCR

DPI = 200
SCALE = 72 / DPI  # image pixels -> PDF points (1 point = 1/72 inch)


def page_to_image(page, dpi=DPI):
    pix = page.get_pixmap(dpi=dpi, colorspace=pymupdf.csRGB, alpha=False)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, 3)
    return img[:, :, ::-1].copy()


def add_text_layer(page, texts, boxes, fontname="helv"):
    """Write invisible text over each OCR box so the page becomes searchable."""
    for text, (x0, y0, x1, y1) in zip(texts, boxes):
        rect = pymupdf.Rect(x0, y0, x1, y1) * SCALE
        fontsize = rect.height * 0.8
        natural_width = pymupdf.get_text_length(text, fontname=fontname, fontsize=fontsize)
        if natural_width == 0:
            continue
        origin = pymupdf.Point(rect.x0, rect.y1 - rect.height * 0.2)
        stretch = pymupdf.Matrix(rect.width / natural_width, 1)  # fit the box width
        page.insert_text(
            origin, text, fontname=fontname, fontsize=fontsize,
            render_mode=3,  # 3 = invisible
            morph=(origin, stretch),
        )


ocr = PaddleOCR(lang="en", use_doc_orientation_classify=False,
                use_doc_unwarping=False, use_textline_orientation=False)

doc = pymupdf.open("scanned.pdf")
for page in doc:
    if page.get_text().strip():
        continue
    res = ocr.predict(page_to_image(page))[0]
    add_text_layer(page, res["rec_texts"], res["rec_boxes"])

doc.save("searchable.pdf", garbage=3, deflate=True)
```

Check the result:

```python
d = pymupdf.open("searchable.pdf")
print(d[0].search_for("Invoice"))  # returns the word's position on the page
```

The page coordinates are simple: the image was rendered at `DPI` pixels per inch and PDF units are 1/72 inch, so multiplying pixel boxes by `72 / DPI` gives PDF positions. Horizontal stretching makes each invisible line span its box, so selections line up with the visible text.

**For Chinese, Japanese or Korean text**, use one of PyMuPDF's built-in CJK fonts: `fontname="china-s"` (Simplified Chinese), `"china-t"` (Traditional), `"japan"` or `"korea"`. The default `helv` font only covers Latin characters.

> Prefer a ready-made tool? **OCRmyPDF** does all of this from the command line (`ocrmypdf input.pdf output.pdf`) using Tesseract. See [Make a scanned PDF searchable](/questions/make-scanned-pdf-searchable/).

## Filter low-confidence results

Drop lines PaddleOCR isn't sure about, which are often stamps, noise or handwriting:

```python
ocr = PaddleOCR(lang="en", text_rec_score_thresh=0.8)
```

Or filter after the fact:

```python
lines = [t for t, s in zip(res["rec_texts"], res["rec_scores"]) if s >= 0.8]
```

## Languages

Set `lang` to the document's language. Common codes:

| `lang` | Language |
|---|---|
| `ch` | Chinese and English (default when `lang` isn't set) |
| `en` | English |
| `chinese_cht` | Traditional Chinese |
| `japan` | Japanese |
| `korean` | Korean |
| `fr`, `de`, `es`, `it`, `pt`, `nl`… | Latin-script languages |
| `ru` | Russian (and other Cyrillic) |
| `ar` | Arabic |
| `hi` | Hindi (Devanagari) |

PaddleOCR picks the best model version for the language automatically. To pin one, pass `ocr_version="PP-OCRv5"` (supported: PP-OCRv3 to PP-OCRv6).

## Use a GPU

```python
ocr = PaddleOCR(lang="en", device="gpu:0")  # or "cpu"
```

This requires the GPU build of PaddlePaddle (see [Install](#install)).

## Command line

PaddleOCR also works without writing Python:

```bash
paddleocr ocr -i scanned.pdf --lang en --save_path ./output
```

Run `paddleocr ocr --help` to see all options.

## Migrating from PaddleOCR 2.x

Most tutorials online still show the 2.x API, which is deprecated in 3.x:

| PaddleOCR 2.x | PaddleOCR 3.x |
|---|---|
| `ocr.ocr(img, cls=True)` | `ocr.predict(img)` |
| `use_angle_cls=True` | `use_textline_orientation=True` |
| `use_gpu=True` | `device="gpu:0"` |
| Result: `[[box, (text, score)], …]` | Result object: `res["rec_texts"]`, `res["rec_scores"]`, `res["rec_boxes"]` |

`ocr.ocr()` and `use_angle_cls` still work in 3.x but print deprecation warnings.

## Troubleshooting

| Problem | Fix |
|---|---|
| `No available model hosting platforms detected` | Models can't be downloaded. Check your network, or set `PADDLE_PDX_MODEL_SOURCE` (see [Install](#install)) |
| Poor accuracy on small text | Render pages at 300 DPI instead of 200 |
| Garbled output on Chinese documents | You set `lang="en"`; use `ch` |
| Rotated or upside-down pages | Enable `use_doc_orientation_classify=True` |
| Slow on large PDFs | Turn off the optional models, use a GPU, or skip pages that already have text |
