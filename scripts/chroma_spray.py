#!/usr/bin/env python3
from pathlib import Path
import shutil
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from chroma_portraits import key_file  # noqa: E402

ART = Path("/workspace/artifacts/imagine_images")
OUT = Path("/workspace/public/art/izzy")
STAGED = Path("/workspace/.grok/spray-raw")
STAGED.mkdir(parents=True, exist_ok=True)

MAP = {
    "spray-angry-casual": "aedd66fd-6f3b-4e73-b165-2de3860ab542.jpg",
    "spray-angry-lounge": "3c7f15bd-5e7e-480e-be10-94b18a4cd1a2.jpg",
    "spray-angry-work": "01f63d3c-9d38-4ee8-ba4d-2f809f78013e.jpg",
    "spray-angry-dress": "dec7bbb6-63e0-414e-9e0c-58ea661a579b.jpg",
    "spray-angry-campus": "5f797985-53ba-4145-aa1b-f6ac31adf4f2.jpg",
    "spray-angry-sleep": "79426ae9-58d9-4a60-9ae8-f5c5496c1904.jpg",
    "spray-angry-lingerie": "310be22b-0052-41ea-a2e8-804f723548ad.jpg",
    "spray-consent-casual": "562924a3-3c43-46aa-96bb-83ce067418bb.jpg",
    "spray-consent-lounge": "4b5719f3-ecd6-46fa-9c39-09e55affdce4.jpg",
    "spray-consent-work": "fe13872c-2396-4fb1-81d2-f0a87b5aea7e.jpg",
    "spray-consent-dress": "1e51a4dd-ac60-4ad0-b066-53aaa240b75d.jpg",
    "spray-consent-campus": "5e9fcf2d-7e07-41c2-a0ea-ffa896617cd5.jpg",
    "spray-consent-sleep": "58509e67-c03d-4d43-9e28-dee064ddaa4d.jpg",
    "spray-consent-lingerie": "f342f139-f3e0-4d56-ba57-c910e11273af.jpg",
}

for name, src in MAP.items():
    raw = ART / src
    if not raw.exists():
        print("missing", src)
        continue
    tmp = STAGED / f"{name}.png"
    shutil.copy(raw, tmp)
    key_file(tmp, OUT / f"{name}.png")
