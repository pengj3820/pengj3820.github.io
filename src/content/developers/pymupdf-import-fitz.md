---
title: "PyMuPDF: \"The fitz API is deprecated\" and \"No module named 'fitz'\""
description: "Should you import fitz or pymupdf? Fix the fitz deprecation warning, 'No module named fitz', and conflicts caused by installing the wrong 'fitz' package."
summary: "fitz is PyMuPDF's old import name. Install the library with pip install pymupdf (never pip install fitz) and write import pymupdf. The functions are identical, so you can usually just change the import line."
order: 15
tags: ["Error fix", "PyMuPDF"]
updated: 2026-09-23
related: []
faqs:
  - q: "Why was PyMuPDF called fitz?"
    a: "MuPDF's rendering library was originally named Fitz. PyMuPDF kept the name for its Python module for many years before adding the clearer import pymupdf in version 1.24.3."
  - q: "Can I keep using import fitz for now?"
    a: "Yes, it still works in 1.28 but prints a deprecation warning and will be removed in a future release. Switching is a one-line change, so it's worth doing now."
---

## The messages

```text
warning: The `fitz` API is deprecated and will be removed in future. Use `import pymupdf` instead.
```

```text
ModuleNotFoundError: No module named 'fitz'
```

## Background: one library, two names

**PyMuPDF** is installed as `pymupdf` but was historically imported as `fitz`, after MuPDF's original graphics engine. Since version 1.24.3 the recommended import is `pymupdf`. With **PyMuPDF 1.28.2**, `import fitz` still works but prints the deprecation warning above. We checked that `fitz.open` and `pymupdf.open` are the same function.

## Fix the deprecation warning

Change the import. Nothing else needs to change:

```python
# Before
import fitz
doc = fitz.open("input.pdf")

# After
import pymupdf
doc = pymupdf.open("input.pdf")
```

For a large codebase you can switch gradually with an alias:

```python
import pymupdf as fitz   # no warning; replace fitz.* calls over time
```

## Fix "No module named 'fitz'" or "No module named 'pymupdf'"

PyMuPDF isn't installed in the Python environment you're running. Install the right package:

```bash
pip install pymupdf
```

Then make sure you're using the same interpreter you installed into:

```bash
python -m pip install pymupdf   # installs for exactly this python
python -c "import pymupdf; print(pymupdf.__doc__)"
```

In Jupyter, run `%pip install pymupdf` in a cell so it installs into the notebook's kernel.

## Don't `pip install fitz`

It's tempting, because the error mentions `fitz`, but **`fitz` on PyPI is not PyMuPDF**. For years it was an unrelated package that broke imports; today the name is held by the PyMuPDF maintainers as an empty placeholder (version 0.0.0). Either way it won't give you PyMuPDF.

If you installed it, clean up:

```bash
pip uninstall -y fitz
pip install --force-reinstall pymupdf
```

## Also check for a local file named `fitz.py` or `pymupdf.py`

A file in your project with the same name as the library shadows it, causing confusing errors like `module 'pymupdf' has no attribute 'open'`. Rename your file (and delete any `__pycache__` folder next to it).

## Next

- [PyMuPDF tutorial](/developers/pymupdf-tutorial/)
- [Python PDF libraries compared](/developers/python-pdf-libraries-compared/)
