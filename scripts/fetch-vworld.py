"""브이월드 2D 데이터 API에서 캠퍼스 범위의 건물 정보를 받아 GeoJSON으로 저장합니다.

- 인증키는 .env의 VWORLD_KEY에서만 읽고 출력하지 않습니다.
- 브이월드 키는 발급 때 등록한 서비스 URL을 domain으로 함께 보내야 합니다(VWORLD_DOMAIN, 기본은 배포 주소).
- 새로 발급한 키는 일부 API 서버에 늦게 반영되어 INCORRECT_KEY가 섞여 나올 수 있어 다시 시도합니다.
- 결과는 Git 제외 폴더 private/vworld/<id>-buildings.geojson에 둡니다. 지도 JSON에는
  prepare-osm-campus.py가 여기서 높이·층수만 뽑아 넣습니다. (공공누리 제1유형, 출처: 국토교통부 브이월드)

사용: python scripts/fetch-vworld.py --campus pusan --bbox 129.0727,35.2287,129.0858,35.2378
"""
import argparse
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = "https://api.vworld.kr/req/data"


def env(name, default=None):
    path = ROOT / ".env"
    if path.is_file():
        for line in path.read_text(encoding="utf8").splitlines():
            key, _, value = line.partition("=")
            if key.strip() == name:
                return value.strip().strip('"').strip("'")
    return default


def request(params, tries=20):
    url = API + "?" + urllib.parse.urlencode(params)
    last = None
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(url, timeout=60) as response:
                body = json.loads(response.read().decode("utf8"))["response"]
        except Exception as error:  # 네트워크 오류도 다시 시도
            last = str(error)
            time.sleep(1 + attempt * 0.5)
            continue
        if body.get("status") == "OK":
            return body
        if body.get("status") == "NOT_FOUND":
            return None
        last = (body.get("error") or {}).get("code")
        if last != "INCORRECT_KEY":
            raise SystemExit(f"브이월드 오류: {body.get('error')}")
        time.sleep(0.3)
    raise SystemExit(f"브이월드 요청이 계속 실패했습니다: {last}")


def fetch(dataset, bbox, key, domain, cell=0.003):
    w, s, e, n = bbox
    features, seen = [], set()
    y = s
    while y < n:
        x = w
        while x < e:
            box = (x, y, min(x + cell, e), min(y + cell, n))
            page = 1
            while True:
                body = request({
                    "service": "data", "request": "GetFeature", "data": dataset,
                    "key": key, "domain": domain, "format": "json", "crs": "EPSG:4326",
                    "size": 1000, "page": page,
                    "geomFilter": "BOX({:.6f},{:.6f},{:.6f},{:.6f})".format(*box),
                })
                if not body:
                    break
                for f in body["result"]["featureCollection"]["features"]:
                    fid = f.get("id") or json.dumps(f["geometry"])[:200]
                    if fid not in seen:
                        seen.add(fid)
                        features.append(f)
                if page >= int(body["page"]["total"]):
                    break
                page += 1
            x += cell
        y += cell
    return features


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campus", required=True)
    ap.add_argument("--bbox", required=True, help="서,남,동,북 경위도")
    ap.add_argument("--dataset", default="LT_C_BLDGINFO")
    args = ap.parse_args()
    key = env("VWORLD_KEY")
    if not key:
        raise SystemExit(".env에 VWORLD_KEY가 없습니다.")
    domain = env("VWORLD_DOMAIN", "https://2026endpoint.github.io/team12")
    bbox = tuple(map(float, args.bbox.split(",")))
    features = fetch(args.dataset, bbox, key, domain)
    out = ROOT / "private" / "vworld" / f"{args.campus}-buildings.geojson"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({"type": "FeatureCollection", "source": f"VWorld {args.dataset}",
                               "features": features}, ensure_ascii=False), encoding="utf8")
    filled = sum(1 for f in features if float(f["properties"].get("grnd_flr") or 0) > 0)
    print(f"{out}: 건물 {len(features)}개, 지상층수 있는 건물 {filled}개")


if __name__ == "__main__":
    main()
