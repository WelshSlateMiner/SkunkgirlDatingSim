#!/usr/bin/env python3
"""Tighten mattes, kill magenta/pink backdrop leftovers, despill hair fringes."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path("/workspace/public/art/izzy")


def flood(seed: np.ndarray) -> np.ndarray:
    return flood_from_edges(seed)


def flood_from_edges(seed: np.ndarray) -> np.ndarray:
    h, w = seed.shape
    out = np.zeros((h, w), dtype=bool)
    stack: list[tuple[int, int]] = []

    def push(y: int, x: int) -> None:
        if 0 <= y < h and 0 <= x < w and seed[y, x] and not out[y, x]:
            out[y, x] = True
            stack.append((y, x))

    for x in range(w):
        push(0, x)
        push(h - 1, x)
    for y in range(h):
        push(y, 0)
        push(y, w - 1)
    while stack:
        y, x = stack.pop()
        push(y - 1, x)
        push(y + 1, x)
        push(y, x - 1)
        push(y, x + 1)
    return out


def flood_from(seed_mask: np.ndarray, allowed: np.ndarray) -> np.ndarray:
    h, w = allowed.shape
    out = np.zeros((h, w), dtype=bool)
    stack: list[tuple[int, int]] = []

    def push(y: int, x: int) -> None:
        if 0 <= y < h and 0 <= x < w and allowed[y, x] and not out[y, x]:
            out[y, x] = True
            stack.append((y, x))

    ys, xs = np.where(seed_mask & allowed)
    for y, x in zip(ys.tolist(), xs.tolist()):
        push(y, x)
    while stack:
        y, x = stack.pop()
        push(y - 1, x)
        push(y + 1, x)
        push(y, x - 1)
        push(y, x + 1)
    return out


def largest_component(keep: np.ndarray) -> np.ndarray:
    ys, xs = np.where(keep)
    if len(ys) == 0:
        return keep
    cy, cx = int(np.median(ys)), int(np.median(xs))
    if not keep[cy, cx]:
        d = (ys - cy) ** 2 + (xs - cx) ** 2
        i = int(np.argmin(d))
        cy, cx = int(ys[i]), int(xs[i])
    seed = np.zeros_like(keep)
    seed[cy, cx] = True
    main = flood_from(seed, keep)
    return main if main.any() else keep


def magentaish(r: np.ndarray, g: np.ndarray, b: np.ndarray) -> np.ndarray:
    mx = np.maximum(r, b)
    return (r > 70) & (b > 55) & (g + 28 < mx) & ((r + b) / 2 - g > 22)


def repair(src: Path, dst: Path) -> None:
    im = Image.open(src).convert("RGBA")
    arr = np.array(im).astype(np.float32)
    rgb = arr[:, :, :3]
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    a = arr[:, :, 3]
    h, w, _ = arr.shape

    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]], axis=0)
    bg = np.median(border, axis=0)
    dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
    mag = magentaish(r, g, b)
    sat = rgb.max(axis=2) - rgb.min(axis=2)

    # Backdrop: near-bg, magenta leftovers, or already-transparent.
    is_bg = (a < 18) | (dist < 38) | (mag & (a < 230) & (sat < 90))
    # Also treat very light pink wash as bg when it's near the canvas edge flood.
    is_bg = is_bg | ((r > 170) & (b > 140) & (g > 120) & (r > g + 15) & (a < 200))
    kill = flood(is_bg)

    keep = (a > 40) & ~kill
    keep = largest_component(keep)
    # Grow keep slightly so hair wisps survive, then re-knock flood bg.
    kimg = Image.fromarray(keep.astype(np.uint8) * 255)
    keep = np.array(kimg.filter(ImageFilter.MaxFilter(3))) > 0
    keep = keep & ~kill

    # Semi-transparent halo: if a pixel is weakly opaque and magenta/near-bg, drop it.
    halo = keep & ((a < 140) | (dist < 55) | (mag & (a < 210)))
    # Only drop halo on the silhouette (pixels with a transparent neighbor).
    trans = ~keep | (a < 12)
    neigh = np.zeros_like(halo)
    neigh[1:] |= trans[:-1]
    neigh[:-1] |= trans[1:]
    neigh[:, 1:] |= trans[:, :-1]
    neigh[:, :-1] |= trans[:, 1:]
    drop = halo & neigh
    keep = keep & ~drop
    fringe = keep & neigh & (magentaish(r, g, b) | ((r > g + 35) & (r > b + 10)))

    alpha = np.where(keep, np.clip(a, 0, 255), 0.0)
    binary = Image.fromarray((alpha > 20).astype(np.uint8) * 255)
    soft = binary.filter(ImageFilter.GaussianBlur(radius=0.8))
    alpha = np.minimum(alpha, np.array(soft).astype(np.float32))
    alpha = np.where(keep, np.maximum(alpha, np.where(a > 200, 255, alpha)), 0.0)

    # Interior leftover pink/purple specks in hair (not the rose bow).
    yx = np.arange(h)[:, None]
    hair_zone = yx < int(h * 0.48)
    bow = (r > 140) & (g < 90) & (b < 110) & (r > g + 50)
    junk = keep & hair_zone & mag & ~bow & (sat < 85)
    # Recolor junk toward nearby darker hair.
    r2 = np.where(junk | fringe, np.where(junk, np.minimum(r, g + 8), r * 0.55 + g * 0.45), r)
    b2 = np.where(junk | fringe, np.where(junk, np.minimum(b, g + 12), b * 0.50 + g * 0.50), b)
    g2 = np.where(junk, np.maximum(g, (r2 + b2) / 2 * 0.4), g)
    arr[:, :, 0] = r2
    arr[:, :, 1] = g2
    arr[:, :, 2] = b2
    arr[:, :, 3] = alpha

    out = Image.fromarray(arr.astype(np.uint8), "RGBA")
    bbox = out.getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        pad = 6
        out = out.crop((max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad)))
    out.save(dst, "PNG")
    aa = np.array(out)[:, :, 3]
    print(f"{dst.name}: {out.size} opaque={(aa > 240).mean():.1%} halo={(((aa > 8) & (aa < 140)).mean()):.2%}")


def main() -> None:
    for p in sorted(ROOT.glob("*.png")):
        repair(p, p)


if __name__ == "__main__":
    main()
