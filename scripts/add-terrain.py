"""캠퍼스 지도 JSON에 지형 고도 격자(terrain)를 넣습니다.

출처: Copernicus DEM GLO-30 (30m 수치표면모델, https://registry.opendata.aws/copernicus-dem/)
  © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS
  by the European Union and ESA; all rights reserved. (Copernicus DEM 라이선스: 출처 표시 후 자유 이용)

표면 모델이라 건물·나무 높이가 섞여 있습니다. 지면에 가깝게 만들려고
1) 건물(+6m) 자리를 비우고 주변 값으로 채우고, 2) 폭 40m보다 좁게 솟은 부분을 깎은 뒤(최솟값→최댓값),
3) 부드럽게 다듬습니다(가우시안). 실측 지형이 아닌 근사입니다.

결과(JSON terrain): 경계 상자를 step(m) 간격 격자로 나눈 높이. heights[row*cols+col]는
(x0 + col*step, z0 + row*step) 지점의 높이에서 base(해발 m)를 뺀 값입니다. 앱은 src/campus/terrain.mjs로 읽습니다.

사용: PYTHONPATH=<numpy·scipy·tifffile·shapely> python scripts/add-terrain.py data/campuses/pusan.json --dem N35_00_E129_00.tif
타일: https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N35_00_E129_00_DEM/Copernicus_DSM_COG_10_N35_00_E129_00_DEM.tif
"""
import argparse
import json
import math
from pathlib import Path

import numpy as np
import tifffile
from scipy import ndimage
from shapely import contains_xy
from shapely.geometry import Polygon
from shapely.ops import unary_union

SOURCE = ("Copernicus DEM GLO-30 · © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 "
          "provided under COPERNICUS by the European Union and ESA")


def meters_per_degree(lat):
    phi = math.radians(lat)
    return (111132.92 - 559.82 * math.cos(2 * phi) + 1.175 * math.cos(4 * phi),
            111412.84 * math.cos(phi) - 93.5 * math.cos(3 * phi))


class Dem:
    """Copernicus 1°×1° 타일 하나(PixelIsPoint: 기준점이 화소 중심)."""

    def __init__(self, path):
        with tifffile.TiffFile(path) as tif:
            page = tif.pages[0]
            self.data = page.asarray().astype(np.float64)
            scale = page.tags["ModelPixelScaleTag"].value
            tie = page.tags["ModelTiepointTag"].value
        self.dx, self.dy = scale[0], scale[1]
        self.lon0, self.lat0 = tie[3], tie[4]

    def sample(self, lon, lat):
        """쌍선형 보간."""
        col = (lon - self.lon0) / self.dx
        row = (self.lat0 - lat) / self.dy
        return ndimage.map_coordinates(self.data, [row, col], order=1, mode="nearest")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("campus_json")
    ap.add_argument("--dem", required=True)
    ap.add_argument("--step", type=float, default=8.0)
    ap.add_argument("--margin", type=float, default=24.0)
    args = ap.parse_args()

    path = Path(args.campus_json)
    data = json.loads(path.read_text(encoding="utf8"))
    m_lat, m_lon = meters_per_degree(data["meta"]["lat"])
    ring = data["boundary"][0]
    xs, zs = [p[0] for p in ring], [p[1] for p in ring]
    step = args.step
    x0 = math.floor((min(xs) - args.margin) / step) * step
    z0 = math.floor((min(zs) - args.margin) / step) * step
    cols = int(math.ceil((max(xs) + args.margin - x0) / step)) + 1
    rows = int(math.ceil((max(zs) + args.margin - z0) / step)) + 1
    gx, gz = np.meshgrid(x0 + np.arange(cols) * step, z0 + np.arange(rows) * step)
    lon = data["meta"]["lon"] + gx / m_lon
    lat = data["meta"]["lat"] - gz / m_lat
    surface = Dem(args.dem).sample(lon.ravel(), lat.ravel()).reshape(rows, cols)

    # 1) 건물 자리(+6m)를 비우고 가장 가까운 바깥 값으로 채움
    footprints = unary_union([Polygon(b["outline"], b.get("holes") or []).buffer(6) for b in data["buildings"]])
    mask = contains_xy(footprints, gx, gz)
    ground = surface.copy()
    if mask.any() and (~mask).any():
        _, (ri, ci) = ndimage.distance_transform_edt(mask, return_indices=True)
        ground = surface[ri, ci]
    # 2) 좁게 솟은 부분(나무 무리·남은 건물) 깎기: 약 40m 창
    size = max(3, int(round(40 / step)) | 1)
    ground = ndimage.grey_opening(ground, size=(size, size))
    # 3) 부드럽게
    ground = ndimage.gaussian_filter(ground, sigma=12 / step, mode="nearest")

    inside = contains_xy(Polygon(ring), gx, gz)
    base = float(np.floor(ground[inside].min() if inside.any() else ground.min()))
    heights = np.round(ground - base, 1)
    data["terrain"] = {
        "source": SOURCE,
        "method": "DSM → building fill, 40m grey opening, 12m gaussian; approximate ground",
        "base": base,
        "x0": x0, "z0": z0, "step": step, "cols": cols, "rows": rows,
        "heights": [float(v) for v in heights.ravel()],
    }
    attribution = data.setdefault("attribution", {})
    attribution["terrain"] = SOURCE
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
    span = heights[inside]
    print(f"{path}: 격자 {cols}×{rows} ({step}m), 기준 해발 {base}m, 캠퍼스 안 높이 {span.min():.1f}~{span.max():.1f}m")


if __name__ == "__main__":
    main()
