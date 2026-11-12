import test from "node:test";
import assert from "node:assert/strict";
import { BUILDINGS } from "../src/data.mjs";
import {
  BUILDING_NUMBERS,
  buildingLabel,
  activeWorks,
  worksPeriod,
  today,
} from "../src/buildings.mjs";

test("every numbered name exists in the campus data", () => {
  const names = new Set(BUILDINGS.map((b) => b.name));
  for (const name of Object.keys(BUILDING_NUMBERS))
    assert.ok(names.has(name), name);
});
test("labels show the official number, or just the name when there is none", () => {
  assert.equal(buildingLabel({ name: "미래관" }), "60 미래관");
  assert.equal(buildingLabel({ name: "창조관" }), "창조관");
});
test("activeWorks keeps ongoing/upcoming works and drops ended or malformed rows", () => {
  const id = BUILDINGS[0].id,
    row = (o) => ({ id: "w", building_id: id, ...o });
  const works = activeWorks(
    [
      row({ start_date: "2026-11-01", end_date: "2026-12-20" }), // 진행 중
      row({ start_date: "2026-12-01", end_date: "2027-01-10" }), // 예정
      row({ start_date: "2026-10-01", end_date: "2026-11-11" }), // 끝남
      row({ start_date: "2026-12-20", end_date: "2026-11-01" }), // 순서 뒤집힘
      row({ start_date: "11/01", end_date: "2026-12-20" }), // 형식 틀림
      {
        ...row({ start_date: "2026-11-01", end_date: "2026-12-20" }),
        building_id: "nope",
      },
    ],
    "2026-11-12",
  );
  assert.equal(works.length, 2);
  assert.equal(worksPeriod(works[0]), "2026.11.01 ~ 2026.12.20");
  assert.equal(activeWorks(null).length, 0);
  assert.equal(today(new Date(2026, 0, 5)), "2026-01-05");
});
