"""data/campuses/sources.json의 학교를 차례로 다시 만듭니다.

학교마다: prepare-osm-campus.py → (현황표가 있으면) apply-building-floors.py → add-terrain.py
사용: PYTHONPATH=<osmium·shapely·numpy·scipy·tifffile> python scripts/build-campuses.py \
        --pbf south-korea-latest.osm.pbf --dem-dir <Copernicus 타일 폴더> [학교 id ...]
고도 타일 이름: Copernicus_DSM_COG_10_<dem>_DEM.tif 또는 <dem>.tif (sources.json의 dem)
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def run(args):
    print("$", " ".join(str(a) for a in args[1:]), flush=True)
    subprocess.run(args, check=True, cwd=ROOT)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--pbf", required=True)
    ap.add_argument("--dem-dir", required=True)
    ap.add_argument("ids", nargs="*")
    args = ap.parse_args()
    sources = json.loads((ROOT / "data/campuses/sources.json").read_text(encoding="utf8"))["campuses"]
    for campus in sources:
        if args.ids and campus["id"] not in args.ids:
            continue
        out = ROOT / "data/campuses" / f"{campus['id']}.json"
        run([sys.executable, "scripts/prepare-osm-campus.py", "--pbf", args.pbf, "--campus", campus["id"],
             "--name", campus["osmName"], "--near", ",".join(map(str, campus["near"])),
             "--gate", ",".join(map(str, campus["gate"])), "--out", str(out)])
        if campus.get("facilities"):
            run([sys.executable, "scripts/apply-building-floors.py", str(out), campus["facilities"]])
        dem_dir = Path(args.dem_dir)
        dem = next((p for p in [dem_dir / f"Copernicus_DSM_COG_10_{campus['dem']}_DEM.tif",
                                dem_dir / f"{campus['dem']}.tif"] if p.is_file()), None)
        if not dem:
            raise SystemExit(f"고도 타일이 없습니다: {campus['dem']}")
        run([sys.executable, "scripts/add-terrain.py", str(out), "--dem", str(dem)])


if __name__ == "__main__":
    main()
