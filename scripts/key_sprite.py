#!/usr/bin/env python3
"""Chroma-key a studio sprite. Handles green screens and leftover rose/purple."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

from repair_portraits import flood, largest_component, magentaish, repair


def key_green(src: Path, dst: Path) -> None:
    im = Image.open(src).convert("RGBA")
    arr = np.array(im).astype(np.float32)
    rgb = arr[:, :, :3]
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    h, w, _ = arr.shape
    green = (g > 90) & (g > r + 25) & (g > b + 25)
    # also near-green wash
    green = green | ((g > 70) & (g > r * 1.15) & (g > b * 1.15) & (g > 55))
    kill = flood(green | (arr[:, :, 3] < 8))
    keep = ~kill
    keep = largest_component(keep)
    kimg = Image.fromarray(keep.astype(np.uint8) * 255)
    keep = np.array(kimg.filter(ImageFilter.MaxFilter(3))) > 0
    keep = keep & ~kill

    alpha = np.where(keep, 255.0, 0.0)
    # Green despill on edge
    trans = ~keep
    neigh = np.zeros_like(keep)
    neigh[1:] |= trans[:-1]
    neigh[:-1] |= trans[1:]
    neigh[:, 1:] |= trans[:, :-1]
    neigh[:, :-1] |= trans[:, 1:]
    fringe = keep & neigh & (g > r + 8) & (g > b + 8)
    g2 = np.where(fringe, np.minimum(g, (r + b) / 2 + 8), g)
    arr[:, :, 1] = g2
    binary = Image.fromarray(keep.astype(np.uint8) * 255)
    soft = binary.filter(ImageFilter.GaussianBlur(radius=0.7))
    alpha = np.minimum(alpha, np.array(soft).astype(np.float32))
    alpha = np.where(keep & ~neigh, 255.0, alpha)
    arr[:, :, 3] = alpha
    out = Image.fromarray(arr.astype(np.uint8), "RGBA")
    bbox = out.getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        pad = 6
        out = out.crop((max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad)))
    out.save(dst, "PNG", optimize=True)
    print("keyed", dst.name, out.size)


if __name__ == "__main__":
    import sys
    key_green(Path(sys.argv[1]), Path(sys.argv[2]))
