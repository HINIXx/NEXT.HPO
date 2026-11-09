"""Merge Google Fonts latin + vietnamese subset woff2 files of Be Vietnam Pro into one woff2 per weight/style."""
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.merge import Merger, Options

src_dir, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
out_dir.mkdir(parents=True, exist_ok=True)
for latin in sorted(src_dir.glob("*-latin.woff2")):
    vi = latin.with_name(latin.name.replace("-latin.woff2", "-vietnamese.woff2"))
    tmp = []
    for i, p in enumerate((latin, vi)):
        f = TTFont(p); f.flavor = None
        t = out_dir / f"_tmp{i}.ttf"; f.save(t); tmp.append(str(t))
    opts = Options(drop_tables=["vhea", "vmtx"])
    merged = Merger(options=opts).merge(tmp)
    merged.flavor = "woff2"
    out = out_dir / latin.name.replace("-latin.woff2", ".woff2")
    merged.save(out)
    cmap = merged.getBestCmap()
    print(out.name, "glyphs", len(merged.getGlyphOrder()), "cmap", len(cmap),
          "has ệ", 0x1EC7 in cmap, "has a", 0x61 in cmap, "GPOS" in merged, "GSUB" in merged)
    for t in tmp: Path(t).unlink()
