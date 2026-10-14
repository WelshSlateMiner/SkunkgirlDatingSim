#!/usr/bin/env python3
"""Key Ronnie's spray poses to transparent WebP, same edge-flood matte as chroma_spray.py.

Usage: python3 scripts/ronnie_spray.py <outfit> <kind> <raw.jpg> [<outfit> <kind> <raw.jpg> ...]
Writes public/art/ronnie/<outfit>/spray-<kind>.webp
"""
from pathlib import Path
import sys
import tempfile

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
from chroma_portraits import key_file  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUTFITS = {"athletic", "casual"}
KINDS = {"defensive", "angry", "consent", "dominant"}

args = sys.argv[1:]
if not args or len(args) % 3:
    sys.exit(__doc__)
for i in range(0, len(args), 3):
    outfit, kind, raw = args[i : i + 3]
    assert outfit in OUTFITS and kind in KINDS, (outfit, kind)
    dst = ROOT / "public/art/ronnie" / outfit / f"spray-{kind}.webp"
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / "raw.png"
        Image.open(raw).convert("RGB").save(src)
        png = Path(tmp) / "keyed.png"
        key_file(src, png)
        Image.open(png).save(dst, "WEBP", quality=90, method=6)
    print("wrote", dst.relative_to(ROOT))
