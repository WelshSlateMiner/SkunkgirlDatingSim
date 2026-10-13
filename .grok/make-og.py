from PIL import Image, ImageDraw, ImageFont, ImageFilter

src = Image.open("/workspace/.grok/izzy-og-ref.jpg").convert("RGB")
W, H = 1200, 630
bg = src.getpixel((12, 12))
canvas = Image.new("RGB", (W, H), bg)

# Soft left-to-right warmth so the title side isn't a flat slab
grad = Image.new("RGB", (W, H), bg)
gd = ImageDraw.Draw(grad)
for x in range(W):
    t = x / (W - 1)
    r = int(bg[0] * (1 - 0.06 * t) + 28 * t)
    g = int(bg[1] * (1 - 0.06 * t) + 24 * t)
    b = int(bg[2] * (1 - 0.06 * t) + 22 * t)
    gd.line([(x, 0), (x, H)], fill=(r, g, b))
canvas = grad

ratio = H / src.height
nw, nh = int(src.width * ratio), H
char = src.resize((nw, nh), Image.Resampling.LANCZOS)
# Sit her on the right with a little breathing room from the edge
px = W - nw - 36
canvas.paste(char, (px, 0))

# Left-side veil so lettering stays readable
veil = Image.new("L", (W, H), 0)
vd = ImageDraw.Draw(veil)
for x in range(0, 640):
    a = int(70 * (1 - x / 640) ** 1.35)
    vd.line([(x, 0), (x, H)], fill=a)
dark = Image.new("RGB", (W, H), (22, 16, 12))
canvas = Image.composite(dark, canvas, veil)

serif_b = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
serif_i = "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf"
sans = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
title_font = ImageFont.truetype(serif_b, 168)
tag_font = ImageFont.truetype(serif_i, 32)

draw = ImageDraw.Draw(canvas)
title = "Izzy"
tag = "A skunkgirl companion"
# Center the lockup in the left half
tb = draw.textbbox((0, 0), title, font=title_font)
tw, th = tb[2] - tb[0], tb[3] - tb[1]
tx = (620 - tw) // 2 - tb[0]
ty = (H - th) // 2 - 28 - tb[1]

# Soft drop shadow
shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.text((tx + 3, ty + 5), title, font=title_font, fill=(0, 0, 0, 140))
shadow = shadow.filter(ImageFilter.GaussianBlur(8))
canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow).convert("RGB")
draw = ImageDraw.Draw(canvas)
draw.text((tx, ty), title, font=title_font, fill=(243, 234, 220))

tag_bb = draw.textbbox((0, 0), tag, font=tag_font)
tag_w = tag_bb[2] - tag_bb[0]
tag_x = (620 - tag_w) // 2 - tag_bb[0]
tag_y = ty + th + 18
draw.text((tag_x, tag_y), tag, font=tag_font, fill=(196, 180, 154))

out = "/workspace/.grok/og.jpg.tmp"
canvas.save(out, "JPEG", quality=92, optimize=True, subsampling=1)
print("wrote", out, canvas.size)
