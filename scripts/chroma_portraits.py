#!/usr/bin/env python3
"""Edge-flood chroma key so interior reds (the bow) stay intact."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path("/workspace")
OUT = ROOT / "public/art/izzy"
OUT.mkdir(parents=True, exist_ok=True)

NAMES = [
    "embarrassed",
    "happy",
    "flirty",
    "laughing",
    "suspicious",
    "shy",
    "angry",
    "infodump",
    "spray",
    "lounge",
    "work",
    "dress",
    "sleep",
    "campus",
    "lingerie",
]


def flood_from_edges(is_bg: np.ndarray) -> np.ndarray:
    h, w = is_bg.shape
    out = np.zeros((h, w), dtype=bool)
    stack: list[tuple[int, int]] = []
    for x in range(w):
        if is_bg[0, x]:
            stack.append((0, x))
        if is_bg[h - 1, x]:
            stack.append((h - 1, x))
    for y in range(h):
        if is_bg[y, 0]:
            stack.append((y, 0))
        if is_bg[y, w - 1]:
            stack.append((y, w - 1))
    while stack:
        y, x = stack.pop()
        if x < 0 or x >= w or y < 0 or y >= h or out[y, x] or not is_bg[y, x]:
            continue
        # Scanline fill
        xl = x
        while xl > 0 and is_bg[y, xl - 1] and not out[y, xl - 1]:
            xl -= 1
        xr = x
        while xr + 1 < w and is_bg[y, xr + 1] and not out[y, xr + 1]:
            xr += 1
        out[y, xl : xr + 1] = True
        for nx in range(xl, xr + 1):
            if y > 0 and is_bg[y - 1, nx] and not out[y - 1, nx]:
                stack.append((y - 1, nx))
            if y + 1 < h and is_bg[y + 1, nx] and not out[y + 1, nx]:
                stack.append((y + 1, nx))
    return out


def key_file(src: Path, dst: Path) -> None:
    im = Image.open(src).convert("RGBA")
    arr = np.array(im).astype(np.float32)
    rgb = arr[:, :, :3]
    h, w, _ = arr.shape
    border = np.concatenate(
        [rgb[0, :, :], rgb[-1, :, :], rgb[:, 0, :], rgb[:, -1, :]], axis=0
    )
    bg = np.median(border, axis=0)
    dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
    tight = dist < 32
    loose = dist < 48
    mask = flood_from_edges(loose)
    # Enclosed leftover holes of near-bg color (between arm and body).
    holes = tight & ~mask
    if holes.any():
        mask = mask | flood_from_edges(holes | mask) & tight
        mask = mask | holes
    alpha = np.where(mask, 0.0, 255.0)
    # Feather along the matte edge.
    binary = Image.fromarray((~mask).astype(np.uint8) * 255)
    soft = binary.filter(ImageFilter.GaussianBlur(radius=1.6))
    alpha = np.array(soft).astype(np.float32)
    alpha = np.where(mask & (dist < 18), 0.0, alpha)
    arr[:, :, 3] = alpha
    # Despill rose fringe on the silhouette.
    fringe = (~mask) & (dist < 70) & (arr[:, :, 0] > arr[:, :, 1] + 40)
    arr[:, :, 0] = np.where(fringe, arr[:, :, 0] * 0.72 + arr[:, :, 1] * 0.28, arr[:, :, 0])
    out = Image.fromarray(arr.astype(np.uint8), "RGBA")
    bbox = out.getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        pad = 8
        out = out.crop(
            (max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad))
        )
    out.save(dst, "PNG", optimize=True)
    a = np.array(out)[:, :, 3]
    print(
        f"{dst.name}: size={out.size} transparent={(a < 12).mean():.2%} "
        f"opaque={(a > 240).mean():.2%}"
    )


def main() -> None:
    for name in NAMES:
        src = OUT / f"{name}.png"
        if not src.exists():
            print("missing", name)
            continue
        key_file(src, src)


if __name__ == "__main__":
    main()
