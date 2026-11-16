"""학교가 공개한 건물 현황표(건물번호·지상 층수)를 캠퍼스 지도 JSON 건물에 넣습니다.

- 표: data/sources/<id>-facilities.csv (건물코드,건물명,구분,층수,준공연도,연면적; 층수는 "지하N/지상N")
- 이름 맞추기: 공백·괄호 안 글자·"부산대" 같은 학교명 접두어를 빼고 비교합니다. 같거나, 한쪽이
  다른 쪽을 포함하면(3글자 이상) 같은 건물로 봅니다. 확실하지 않은 이름은 ALIASES에만 적습니다.
- 맞은 건물: floors = 지상 층수, basements = 지하 층수, h = 층수 × 4m, number = 건물코드, heightSource = "official".
- 브이월드 높이보다 우선합니다(학교 공식 층수). 맞지 않은 건물은 그대로 둡니다.

순서: prepare-osm-campus.py → apply-building-floors.py → add-terrain.py
사용: python scripts/apply-building-floors.py data/campuses/pusan.json data/sources/pusan-facilities.csv
"""
import csv
import json
import re
import sys
from pathlib import Path

FLOOR_HEIGHT = 4.0
# OSM 이름 → 현황표 이름. 이름이 달라 자동으로 못 맞추지만 같은 건물로 확인한 것만 둡니다.
ALIASES = {
    "충격하중및도장시험연구동": "선박충격피로도장시험연구동",
    "통합기계관": "기계관",  # 303 기계관(2017 준공)
    "삼성산학협동관": "산학협동관",
}
# OSM 이름이 현황표 이름을 포함할 때, 남는 글자가 동 구분(1관·A동 등)일 때만 같은 건물로 봅니다.
WING = re.compile(r"^(\d+관|[A-Za-z가-힣]동|동)$")


def key(name):
    name = re.sub(r"\(.*?\)", "", name or "")
    name = re.sub(r"^(부산대학교|부산대)", "", name.strip())
    return re.sub(r"\s+", "", name)


def main():
    campus_path, table_path = Path(sys.argv[1]), Path(sys.argv[2])
    data = json.loads(campus_path.read_text(encoding="utf8"))
    rows = []
    with table_path.open(encoding="utf8") as f:
        for row in csv.DictReader(f):
            m = re.search(r"지상(\d+)", row["층수"])
            below = re.search(r"지하(\d+)", row["층수"])
            if m and int(m.group(1)) > 0:
                rows.append({"code": row["건물코드"], "name": row["건물명"], "key": key(row["건물명"]),
                             "floors": int(m.group(1)), "basements": int(below.group(1)) if below else 0})
    matched, missing = [], []
    for b in data["buildings"]:
        if b["name"] == "교내 건물":
            continue
        k = key(ALIASES.get(re.sub(r"\s+", "", b["name"]), b["name"]))
        exact = [r for r in rows if r["key"] == k]
        partial = [r for r in rows if len(k) >= 3 and len(r["key"]) >= 3 and (
            k in r["key"] or (r["key"] in k and WING.match(k.replace(r["key"], "", 1))))]
        # 포함 관계는 가장 긴 이름(가장 구체적인 것) 하나만, 여럿이 같은 길이면 쓰지 않습니다.
        if not exact and partial:
            longest = max(len(r["key"]) for r in partial)
            partial = [r for r in partial if len(r["key"]) == longest]
        found = exact or (partial if len({r["code"] for r in partial}) == 1 else [])
        if not found:
            missing.append(b["name"])
            continue
        row = found[0]
        b["floors"] = row["floors"]
        b["basements"] = row["basements"]
        b["h"] = row["floors"] * FLOOR_HEIGHT
        b["number"] = row["code"]
        b["heightSource"] = "official"
        matched.append(f"{b['name']}→{row['name']}({row['floors']}층)")
    attribution = data.setdefault("attribution", {})
    attribution["floors"] = f"학교 공개 건물 현황표({table_path.name})"
    campus_path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
    print(f"맞춤 {len(matched)}개, 못 맞춤 {len(missing)}개")
    print("못 맞춤:", ", ".join(missing))
    print("맞춤:", ", ".join(matched))


if __name__ == "__main__":
    main()
