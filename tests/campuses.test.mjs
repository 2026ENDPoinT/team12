import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import {
  CAMPUSES,
  campusById,
  campusIdFromHash,
  campusByName,
  DEFAULT_CAMPUS_ID,
} from "../src/campus/registry.mjs";
import * as data from "../src/campus/data.mjs";
import seoultech from "../data/seoultech.json" with { type: "json" };
import teamSurvey from "../data/team-survey.json" with { type: "json" };
import schools from "../src/ui/schools.json" with { type: "json" };
import { routeBetween } from "../src/navigation/route-target.mjs";

const load = (campus) =>
  JSON.parse(readFileSync(new URL(`../${campus.data}`, import.meta.url), "utf8"));
const others = CAMPUSES.filter((c) => c.id !== DEFAULT_CAMPUS_ID);

test("학교 목록: id·이름이 겹치지 않고 학교 검색 목록(schools.json)에 있다", () => {
  assert.equal(new Set(CAMPUSES.map((c) => c.id)).size, CAMPUSES.length);
  for (const campus of CAMPUSES) {
    assert.match(campus.id, /^[a-z0-9-]{2,40}$/, "Supabase campus_id 규칙");
    assert.ok(
      schools.some(([name]) => name === campus.name),
      `${campus.name}이 schools.json에 없음`,
    );
    assert.equal(campusByName(campus.name), campus);
    assert.ok(existsSync(new URL(`../${campus.data}`, import.meta.url)));
  }
});

test("주소에서 지원 학교만 고른다", () => {
  assert.equal(campusIdFromHash("#campus/seoultech"), "seoultech");
  assert.equal(campusIdFromHash("#campus/pusan"), "pusan");
  assert.equal(campusIdFromHash("#campus/unknown"), null);
  assert.equal(campusIdFromHash("#campuses"), null);
  assert.equal(campusIdFromHash(""), null);
});

for (const campus of others) {
  test(`${campus.name}: 지도 데이터 형식이 서울과기대와 같다`, () => {
    const geometry = load(campus);
    for (const key of ["meta", "boundary", "buildings", "roads", "lands", "trees", "nodes", "edges"])
      assert.ok(key in geometry, key);
    assert.equal(geometry.attribution.databaseLicense, "ODbL-1.0");
    const ids = new Set();
    for (const b of geometry.buildings) {
      assert.ok(!ids.has(b.id), `건물 id 중복 ${b.id}`);
      ids.add(b.id);
      assert.ok(b.id.startsWith(`${campus.id}-`), "다른 학교 건물 id와 겹치지 않게 접두사");
      assert.ok(b.outline.length >= 3);
      assert.ok(b.h > 0 && b.floors >= 1);
      if (b.entry) assert.ok(geometry.nodes[b.entry], `${b.name} 입구 노드`);
    }
    for (const e of geometry.edges) {
      assert.ok(geometry.nodes[e.a] && geometry.nodes[e.b]);
      assert.ok(e.meters > 0);
    }
  });

  test(`${campus.name}: 정문에서 이름 있는 모든 건물까지 경로가 있다`, () => {
    try {
      data.useCampus(campus, load(campus));
      assert.equal(data.CAMPUS.id, campus.id);
      assert.equal(data.INDOOR_MAPS.size, 0, "실내 지도는 서울과기대 전용");
      assert.equal(data.ENTRANCES.length, 0, "팀 조사 출입구는 서울과기대 전용");
      const places = data.PLACES.filter((p) => p.id !== "gate");
      assert.ok(places.length >= 20, "검색할 건물이 충분함");
      const unreachable = places.filter(
        (p) =>
          !routeBetween([data.MAIN_GATE.entry], p.entries, "shortest", data.NODES, data.EDGES),
      );
      assert.deepEqual(unreachable.map((p) => p.name), []);
      // 정문은 실제 정문 표시 위치에서 40m 안의 보행 노드로 연결
      const gate = data.NODES[data.MAIN_GATE.entry];
      assert.ok(Math.hypot(gate.x - data.MAIN_GATE.x, gate.z - data.MAIN_GATE.z) < 40);
      assert.ok(data.PLACES.some((p) => p.id === data.previewPlaceId()));
    } finally {
      data.useCampus(campusById(DEFAULT_CAMPUS_ID), seoultech, teamSurvey);
    }
  });
}

test("다른 학교를 열었다가 돌아오면 서울과기대 데이터가 그대로다", () => {
  assert.equal(data.CAMPUS.id, "seoultech");
  assert.equal(data.CAMPUS_GEOMETRY, seoultech);
  assert.equal(data.INDOOR_MAPS.size, 1);
  assert.ok(data.PLACES.some((p) => p.id === "future"));
  assert.equal(data.previewPlaceId(), "future");
});

test("부산대: 학교 공개 건물 현황표 층수와 건물번호가 들어 있고 카드 형식으로 보인다", async () => {
  const { floorRange } = await import("../src/ui/building-info.mjs");
  assert.equal(floorRange(10, 1), "B1 · 1F–10F");
  assert.equal(floorRange(8, 2), "B2–B1 · 1F–8F");
  assert.equal(floorRange(1, 0), "1F");
  const pusan = load(campusById("pusan"));
  const byName = (name) => pusan.buildings.find((b) => b.name === name);
  assert.deepEqual(
    ["대학본부", "인문관", "새벽벌도서관(제2도서관)"].map((n) => [byName(n).number, byName(n).floors]),
    [["205", 10], ["306", 4], ["420", 4]],
  );
  const official = pusan.buildings.filter((b) => b.heightSource === "official");
  assert.ok(official.length >= 60);
  for (const b of official) assert.equal(b.h, b.floors * 4);
});
