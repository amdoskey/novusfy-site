"""
Builds the self-hosted web fonts in assets/fonts/web/ (and the static share-
image fonts in assets/fonts/og/) from the source TTFs in assets/fonts/
(official files from github.com/google/fonts, ofl/ folder).

Variable fonts stay variable (one file per family, like Google Fonts serves
them) but are cut down to the weight range the site uses; static fonts stay
one file per weight. Each file keeps only the scripts we render (Latin + Latin
Extended, plus Arabic for the Arabic faces) and is written as WOFF2. That
keeps /ar close to what Google Fonts used to serve (~70 KB per face) instead of
shipping the full 200–600 KB TTFs. Output is deterministic (no timestamps), so
re-running it on unchanged sources leaves git clean.

The outputs are committed; next/font/local reads them at build time, so builds
never touch the network. Only re-run this when a source TTF changes:

    python3 -m venv /tmp/fontenv && /tmp/fontenv/bin/pip install fonttools brotli
    /tmp/fontenv/bin/python scripts/build-web-fonts.py
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "fonts"
OUT = SRC / "web"

# Same ranges Google Fonts uses for its `latin`, `latin-ext` and `arabic` subsets.
LATIN = (
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,"
    "U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,"
    "U+FEFF,U+FFFD"
)
LATIN_EXT = (
    "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1D00-1DBF,"
    "U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,"
    "U+A720-A7FF"
)
ARABIC = (
    "U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,"
    "U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC"
)

# (source file, output name, (min, max) weight for variable fonts or None, unicode ranges)
# Keep the weight ranges in sync with src/app/(frontend)/fonts.ts.
FONTS = [
    ("PlusJakartaSans[wght].ttf", "PlusJakartaSans-VF", (400, 800), [LATIN, LATIN_EXT]),
    ("JetBrainsMono[wght].ttf", "JetBrainsMono-VF", (400, 500), [LATIN, LATIN_EXT]),
    ("Cairo[slnt,wght].ttf", "Cairo-VF", (700, 900), [ARABIC, LATIN, LATIN_EXT]),
    ("IBMPlexSansArabic-Regular.ttf", "IBMPlexSansArabic-400", None, [ARABIC, LATIN, LATIN_EXT]),
    ("IBMPlexSansArabic-Medium.ttf", "IBMPlexSansArabic-500", None, [ARABIC, LATIN, LATIN_EXT]),
    ("IBMPlexSansArabic-SemiBold.ttf", "IBMPlexSansArabic-600", None, [ARABIC, LATIN, LATIN_EXT]),
    ("IBMPlexSansArabic-Bold.ttf", "IBMPlexSansArabic-700", None, [ARABIC, LATIN, LATIN_EXT]),
]


# Static TTFs for the share images (src/lib/og.tsx): satori can't read variable fonts.
OG_FONTS = [
    ("JetBrainsMono[wght].ttf", "JetBrainsMono-Regular", 400, [LATIN, LATIN_EXT]),
]
OG_OUT = SRC / "og"


def unicodes(ranges: list[str]) -> list[int]:
    cps: list[int] = []
    for part in ",".join(ranges).split(","):
        lo, _, hi = part.removeprefix("U+").partition("-")
        cps.extend(range(int(lo, 16), int(hi or lo, 16) + 1))
    return cps


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for src, name, weights, ranges in FONTS:
        font = TTFont(SRC / src, recalcTimestamp=False)

        # Subset first, then limit the axes (the other order trips a fontTools
        # bug with partially instanced gvar tables).
        options = subset.Options()
        options.layout_features = ["*"]  # keep Arabic shaping + all OpenType features
        options.name_IDs = ["*"]
        options.notdef_outline = True
        sub = subset.Subsetter(options)
        sub.populate(unicodes=unicodes(ranges))
        sub.subset(font)

        if weights:
            limits = {"wght": weights}
            if any(a.axisTag == "slnt" for a in font["fvar"].axes):
                limits["slnt"] = 0  # upright only
            font = instancer.instantiateVariableFont(font, limits)

        out = OUT / f"{name}.woff2"
        font.flavor = "woff2"
        font.save(out)
        print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")

    OG_OUT.mkdir(exist_ok=True)
    for src, name, weight, ranges in OG_FONTS:
        font = TTFont(SRC / src, recalcTimestamp=False)
        options = subset.Options()
        options.layout_features = ["*"]
        options.name_IDs = ["*"]
        options.notdef_outline = True
        sub = subset.Subsetter(options)
        sub.populate(unicodes=unicodes(ranges))
        sub.subset(font)
        font = instancer.instantiateVariableFont(font, {"wght": weight})  # fully static
        out = OG_OUT / f"{name}.ttf"
        font.save(out)
        print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
