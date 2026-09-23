---
title: "Fix PaddleOCR \"No available model hosting platforms detected\" and \"Unknown argument: use_gpu\""
description: "Solve PaddleOCR 3.x model download failures by choosing a reachable model source or using local model folders, and update old 2.x arguments like use_gpu and use_angle_cls."
summary: "PaddleOCR 3.x downloads its models on first use and fails if none of its model hosts is reachable. Set PADDLE_PDX_MODEL_SOURCE to a host you can reach (huggingface, modelscope, aistudio or bos), or download the models once and point PaddleOCR at the local folders. 'Unknown argument: use_gpu' means 2.x-style code: use device='gpu:0' instead."
order: 14
tags: ["Error fix", "PaddleOCR", "OCR"]
updated: 2026-09-23
related: ["make-scanned-pdf-searchable"]
faqs:
  - q: "Where does PaddleOCR store downloaded models?"
    a: "In ~/.paddlex/official_models by default. Once the models are there, PaddleOCR runs without network access."
  - q: "How do I run PaddleOCR on a server with no internet access?"
    a: "Download the models on a machine that has access (run PaddleOCR once), copy the model folders to the server, and pass text_detection_model_dir and text_recognition_model_dir (plus the matching *_model_name values) when creating PaddleOCR."
---

## Error 1: model download fails

```text
Exception: No available model hosting platforms detected. Please check your network connection.
```

**PaddleOCR 3.x** (tested with 3.7.0) downloads its detection and recognition models the first time you create a `PaddleOCR(...)` object. It checks a list of model hosts and raises this error when **none** of them is reachable, which is common behind corporate proxies, in firewalled data centres, inside Docker containers without network access, and in regions where Hugging Face is blocked.

### Fix A: pick a model source you can reach

PaddleOCR supports four model hosts. Hugging Face is the default. Select another one with an environment variable:

```bash
export PADDLE_PDX_MODEL_SOURCE=modelscope   # or: huggingface, aistudio, bos
python your_script.py
```

Or set it in Python **before** importing PaddleOCR:

```python
import os
os.environ["PADDLE_PDX_MODEL_SOURCE"] = "modelscope"

from paddleocr import PaddleOCR
ocr = PaddleOCR(lang="en")
```

In mainland China, `modelscope`, `aistudio` or `bos` are usually faster than Hugging Face.

### Fix B: use a proxy

If your network requires a proxy, make sure Python can see it:

```bash
export HTTPS_PROXY=http://proxy.example.com:8080
```

### Fix C: run offline with local models

Download once on a connected machine by running PaddleOCR a single time. The models are saved in `~/.paddlex/official_models/`. Copy the folders you need to the offline machine and point PaddleOCR at them:

```python
from paddleocr import PaddleOCR

ocr = PaddleOCR(
    text_detection_model_name="PP-OCRv5_server_det",
    text_detection_model_dir="/models/PP-OCRv5_server_det",
    text_recognition_model_name="en_PP-OCRv5_mobile_rec",
    text_recognition_model_dir="/models/en_PP-OCRv5_mobile_rec",
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False,
)
```

Use the folder names you actually find in `~/.paddlex/official_models/`; they tell you the model names. When model names or folders are given, `lang` and `ocr_version` are ignored. Turning off the three optional models means you only need to copy the detection and recognition folders.

## Error 2: old 2.x arguments

```text
ValueError: Unknown argument: use_gpu
```

Your code was written for **PaddleOCR 2.x**. Version 3 renamed or removed several options:

| PaddleOCR 2.x | PaddleOCR 3.x |
|---|---|
| `use_gpu=True` | `device="gpu:0"` (or `"cpu"`) |
| `use_angle_cls=True` | `use_textline_orientation=True` |
| `ocr.ocr(img, cls=True)` | `ocr.predict(img)` |
| `result[0][i][1][0]` (text) | `res["rec_texts"][i]` |
| `show_log=False` | Removed |

`use_angle_cls` and `ocr.ocr()` still work in 3.x with a deprecation warning, but `use_gpu` fails immediately. We confirmed this with 3.7.0.

```python
# 3.x
from paddleocr import PaddleOCR

ocr = PaddleOCR(lang="en", device="gpu:0", use_textline_orientation=True)
for res in ocr.predict("page.png"):
    print(res["rec_texts"])
```

Note that `device="gpu:0"` also requires the **GPU build** of PaddlePaddle (`paddlepaddle-gpu`), not the default CPU package.

## Full guide

[How to OCR a PDF with PaddleOCR in Python](/developers/paddleocr-pdf-ocr/): installation, reading results, OCRing PDFs and building a searchable PDF.
