#!/usr/bin/env python3
"""Cut chroma-green fringe, despill outlines, inpaint leftover screen holes. Keeps the eyes."""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


def label(mask: np.ndarray) -> tuple[np.ndarray, int]:
    h, w = mask.shape
    out = np.zeros((h, w), np.int32)
    seen = np.zeros_like(mask)
    n = 0
    ys, xs = np.where(mask)
    for y, x in zip(ys.tolist(), xs.tolist()):
        if seen[y, x]:
            continue
        n += 1
        q = deque([(y, x)])
        seen[y, x] = True
        while q:
            cy, cx = q.popleft()
            out[cy, cx] = n
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ny, nx = cy + dy, cx + dx
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True
                    q.append((ny, nx))
    return out, n


def clean(path: Path) -> None:
    im = Image.open(path).convert("RGBA")
    arr = np.array(im)
    r = arr[:, :, 0].astype(np.int16)
    g = arr[:, :, 1].astype(np.int16)
    b = arr[:, :, 2].astype(np.int16)
    a = arr[:, :, 3]
    h, w = a.shape
    opaque = a > 16
    chroma = opaque & (g > 80) & (g > r + 24) & (g > b + 18)

    trans = Image.fromarray(((a < 24).astype(np.uint8) * 255))
    near = np.array(trans.filter(ImageFilter.MaxFilter(15))) > 0

    ys, xs = np.where(opaque)
    if len(ys) == 0:
        return
    top = int(ys.min())
    span = max(1, int(ys.max() - top))

    comp, n = label(chroma)
    eyes = np.zeros((h, w), dtype=bool)
    for i in range(1, n + 1):
        m = comp == i
        area = int(m.sum())
        if area < 30 or area > 900:
            continue
        yy, xx = np.where(m)
        bh = int(yy.max() - yy.min())
        bw = int(xx.max() - xx.min())
        if max(bh, bw) > 70:
            continue
        cy = float(yy.mean())
        if (cy - top) / span > 0.34:
            continue
        if (m & near).mean() > 0.35:
            continue
        eyes |= m

    spill = chroma & ~eyes
    fringe = spill & near & (g > 115) & (r < 125) & (b < 135)
    arr[fringe, 3] = 0

    rest = spill & (arr[:, :, 3] > 0) & ~fringe
    pulled = np.minimum(g, np.maximum(r, b) + 2)
    arr[rest, 1] = pulled[rest].astype(np.uint8)

    # Strong leftover screen color (not eyes): paint from nearby real pixels.
    r = arr[:, :, 0].astype(np.int16)
    gch = arr[:, :, 1].astype(np.int16)
    b = arr[:, :, 2].astype(np.int16)
    strong = (arr[:, :, 3] > 16) & ~eyes & (gch > 140) & (gch > r + 35) & (gch > b + 30)
    src = (arr[:, :, 3] > 16) & ~strong
    painted = 0
    ys2, xs2 = np.where(strong)
    for y, x in zip(ys2.tolist(), xs2.tolist()):
        y0, y1 = max(0, y - 6), min(h, y + 7)
        x0, x1 = max(0, x - 6), min(w, x + 7)
        patch = src[y0:y1, x0:x1]
        if not patch.any():
            arr[y, x, 3] = 0
            continue
        cols = arr[y0:y1, x0:x1][:, :, :3][patch]
        arr[y, x, :3] = cols.mean(axis=0).astype(np.uint8)
        painted += 1

    Image.fromarray(arr, "RGBA").save(path, "PNG", optimize=True)
    print(path.name, "fringe", int(fringe.sum()), "despill", int(rest.sum()), "inpaint", painted, "eyes", int(eyes.sum()))


if __name__ == "__main__":
    import sys

    for p in sys.argv[1:]:
        clean(Path(p))
