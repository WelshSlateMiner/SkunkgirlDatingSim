#!/usr/bin/env python3
"""Key Ronnie's expression and pose JPGs to transparent WebP next to them (same matte as ronnie_spray.py).

Usage: python3 scripts/ronnie_portraits.py
Writes public/art/ronnie/<outfit>/<name>.webp for every <name>.jpg.
"""
from pathlib import Path
import sys
import tempfile

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ronnie_spray import key_file  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
HEIGHT = 1650

for raw in sorted((ROOT / "public/art/ronnie").glob("*/*.jpg")):
    dst = raw.with_suffix(".webp")
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / "keyed.png"
        key_file(raw, png)
        out = Image.open(png)
        if out.height > HEIGHT:
            out = out.resize((round(out.width * HEIGHT / out.height), HEIGHT), Image.LANCZOS)
        out.save(dst, "WEBP", quality=90, method=6)
    print("wrote", dst.relative_to(ROOT), out.size)
