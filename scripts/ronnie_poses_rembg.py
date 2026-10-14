"""Clean cutouts for Ronnie's squat and yoga poses with rembg (isnet-general-use + alpha matting).
Run from the repo root in a venv with: pip install "rembg[cpu]" pillow
Usage: python scripts/ronnie_poses_rembg.py isnet-general-use
"""
import sys
from PIL import Image
from rembg import remove, new_session
sess = new_session(sys.argv[1])
for name in ["squat", "yoga"]:
    src = Image.open(f"public/art/ronnie/athletic/{name}.jpg").convert("RGB")
    out = remove(src, session=sess, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=15, alpha_matting_erode_size=8)
    bbox = out.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    out = out.crop(bbox)
    if out.height > 1650: out = out.resize((round(out.width*1650/out.height), 1650), Image.LANCZOS)
    out.save(f"/tmp/{name}_{sys.argv[1]}.webp", quality=92, method=6)
    g = Image.new("RGBA", out.size, (128,128,128,255)); g.alpha_composite(out); g.convert("RGB").resize((out.width//3, out.height//3)).save(f"/tmp/{name}_{sys.argv[1]}_gray.png")
print("done")
