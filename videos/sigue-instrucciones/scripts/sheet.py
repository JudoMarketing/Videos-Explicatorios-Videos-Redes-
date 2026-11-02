# Une stills en una hoja de contacto: python3 scripts/sheet.py salida.jpg cols img1 img2 ...
import sys
from PIL import Image, ImageDraw
out, cols, files = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
ims = [Image.open(f).convert('RGB') for f in files]
w, h = 360, 640
rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * (h + 30)), 'white')
d = ImageDraw.Draw(sheet)
for i, (im, f) in enumerate(zip(ims, files)):
    x, y = (i % cols) * w, (i // cols) * (h + 30)
    sheet.paste(im.resize((w, h)), (x, y + 30))
    d.text((x + 8, y + 8), f.split('/')[-1], fill='black')
sheet.save(out, quality=88)
