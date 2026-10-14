#!/usr/bin/env python3
"""Key Ronnie's spray poses to transparent WebP, same edge-flood matte as chroma_spray.py.

Usage: python3 scripts/ronnie_spray.py <outfit> <kind> <raw.jpg> [<outfit> <kind> <raw.jpg> ...]
Writes public/art/ronnie/<outfit>/spray-<kind>.webp, trimmed and scaled to HEIGHT px tall
so every pose matches. Feed it upscaled raws (Real-ESRGAN) so this is a downscale.
"""
from pathlib import Path
import sys
import tempfile

import numpy as np
from PIL import Image, ImageFilter

sys.path.insert(0, str(Path(__file__).resolve().parent))
from chroma_portraits import flood_from_edges  # noqa: E402


def key_file(src: Path, dst: Path) -> None:
    """Edge-flood matte like chroma_portraits.key_file, tuned for a white background.

    Differences: enclosed near-white regions are kept (white trainers and tank tops are not holes),
    and edge pixels are un-mixed from the background so dark tail fur has no white halo.
    """
    arr = np.array(Image.open(src).convert("RGB")).astype(np.float32)
    h, w, _ = arr.shape
    border = np.concatenate([arr[0], arr[-1], arr[:, 0], arr[:, -1]], axis=0)
    bg = np.median(border, axis=0)
    dist = np.sqrt(((arr - bg) ** 2).sum(axis=2))
    mask = flood_from_edges(dist < 40)
    soft = Image.fromarray((~mask).astype(np.uint8) * 255).filter(ImageFilter.MinFilter(3))
    alpha = np.array(soft.filter(ImageFilter.GaussianBlur(radius=1.4))).astype(np.float32) / 255.0
    a = np.clip(alpha, 1e-3, 1.0)[..., None]
    edge = (alpha > 0) & (alpha < 1)
    rgb = np.where(edge[..., None], np.clip((arr - bg * (1 - a)) / a, 0, 255), arr)
    out = Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), "RGBA")
    bbox = out.getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        out = out.crop((max(0, x0 - 8), max(0, y0 - 8), min(w, x1 + 8), min(h, y1 + 8)))
    out.save(dst, "PNG")

ROOT = Path(__file__).resolve().parent.parent
OUTFITS = {"athletic", "casual"}
HEIGHT = 1800
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
        out = Image.open(png)
        if out.height != HEIGHT:
            out = out.resize((round(out.width * HEIGHT / out.height), HEIGHT), Image.LANCZOS)
        out.save(dst, "WEBP", quality=90, method=6)
    print("wrote", dst.relative_to(ROOT))
