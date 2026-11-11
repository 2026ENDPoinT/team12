import test from "node:test";
import assert from "node:assert/strict";
import {
  CAMPUS_GEOMETRY,
  BUILDINGS,
  MAIN_GATE,
} from "../src/data.mjs";
import { SAMPLE_DOORS } from "./fixtures.mjs";
import { mergeSurvey, attachToGraph, crossesBuilding } from "../src/survey.mjs";
import { toLngLat } from "../src/geo.mjs";
import { shortestPath } from "../src/routing.mjs";
import { sanitizeReports, availableEdges, edgeId } from "../src/reports.mjs";

const origin = CAMPUS_GEOMETRY.meta,
  base = { nodes: CAMPUS_GEOMETRY.nodes, edges: CAMPUS_GEOMETRY.edges },
  options = { origin, buildings: BUILDINGS },
  merge = (features) =>
    mergeSurvey(base, { type: "FeatureCollection", features }, options);

// 건물 외곽선 위의 시험용 출입구 위치(tests/fixtures.mjs)
const futureA = SAMPLE_DOORS.futureWest,
  futureB = SAMPLE_DOORS.futureNorthEast,
  other = SAMPLE_DOORS.dasanNorth;

function entrance(id, point, extra = {}) {
  return {
    type: "Feature",
    geometry: { type: "Point", coordinates: toLngLat(point, origin) },
    properties: {
      id,
      campus_id: "SEOULTECH",
      feature_type: "entrance",
      building_id: point.buildingId,
      name: point.name,
      source_kind: "team_input",
      verification_status: "verified",
      ...extra,
    },
  };
}
function passage(id, from, to, length_m) {
  return {
    type: "Feature",
    geometry: null,
    properties: {
      id,
      feature_type: "building_passage",
      from,
      to,
      length_m,
      source_kind: "team_input",
      verification_status: "verified",
    },
  };
}
function line(id, points, feature_type = "sidewalk") {
  return {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: points.map((p) => toLngLat(p, origin)),
    },
    properties: {
      id,
      feature_type,
      source_kind: "team_input",
      verification_status: "verified",
    },
  };
}

test("an empty survey leaves the generated graph unchanged", () => {
  const merged = merge([]);
  assert.deepEqual(merged.nodes, base.nodes);
  assert.deepEqual(merged.edges, base.edges);
  assert.deepEqual(merged.warnings, []);
});

test("a surveyed entrance joins the walking graph without crossing a building", () => {
  const merged = merge([entrance("future-a", futureA)]),
    connector = merged.edges.find((e) => e.a === "future-a");
  assert.deepEqual(merged.warnings, []);
  assert.equal(merged.entrances.length, 1);
  assert.equal(connector.type, "connector");
  assert.equal(
    crossesBuilding(merged.nodes["future-a"], merged.nodes[connector.b], BUILDINGS),
    null,
  );
  const route = shortestPath(
    MAIN_GATE.entry,
    "future-a",
    "shortest",
    merged.nodes,
    merged.edges,
  );
  assert.ok(route, "정문에서 새 출입구까지 경로가 있어야 합니다");
  assert.equal(route.path.at(-1), "future-a");
});

test("a building passage links two entrances of the same building", () => {
  const merged = merge([
      entrance("future-a", futureA),
      entrance("future-b", futureB),
      passage("future-pass", "future-a", "future-b", 12),
    ]),
    route = shortestPath(
      "future-a",
      "future-b",
      "shortest",
      merged.nodes,
      merged.edges,
    );
  assert.deepEqual(merged.warnings, []);
  assert.deepEqual(route.path, ["future-a", "future-b"]);
  assert.equal(route.meters, 12);
});

test("a passage between different buildings is rejected with a warning", () => {
  const merged = merge([
    entrance("future-a", futureA),
    entrance("other-a", other),
    passage("bad-pass", "future-a", "other-a", 10),
  ]);
  assert.ok(!merged.edges.some((e) => e.type === "building_passage"));
  assert.deepEqual(
    merged.warnings.map((w) => w.id),
    ["bad-pass"],
  );
});

test("rejected items are skipped and duplicate ids warn", () => {
  const merged = merge([
    entrance("future-a", futureA, { verification_status: "rejected" }),
    entrance("dup", futureA),
    entrance("dup", futureB),
  ]);
  assert.equal(merged.nodes["future-a"], undefined);
  assert.equal(merged.entrances.length, 1);
  assert.deepEqual(
    merged.warnings.map((w) => w.id),
    ["dup"],
  );
});

test("merge result does not depend on feature order", () => {
  const features = [
    passage("future-pass", "future-a", "future-b", 12),
    entrance("future-b", futureB),
    entrance("future-a", futureA),
  ];
  assert.deepEqual(merge(features), merge([...features].reverse()));
});

// 건물에서 떨어진 긴 간선 하나를 골라, 그 옆 1m에 나란히 그린 계단으로 끝점 붙이기를 확인합니다.
function sideLineNextToEdge() {
  for (const edge of base.edges) {
    if (edge.meters < 30 || edge.stairs) continue;
    const a = base.nodes[edge.a],
      b = base.nodes[edge.b],
      len = Math.hypot(b.x - a.x, b.z - a.z),
      nx = -(b.z - a.z) / len,
      nz = (b.x - a.x) / len,
      at = (t) => ({
        x: a.x + (b.x - a.x) * t + nx,
        z: a.z + (b.z - a.z) * t + nz,
      }),
      points = [at(0.3), at(0.7)];
    if (!crossesBuilding(points[0], points[1], BUILDINGS)) return points;
  }
  throw new Error("시험용 간선을 찾지 못했습니다");
}

test("stairs drawn next to a path snap their ends onto that path", () => {
  const merged = merge([line("side-stairs", sideLineNextToEdge(), "stairs")]),
    stairs = merged.edges.find((e) => e.type === "stairs");
  assert.deepEqual(merged.warnings, []);
  assert.equal(stairs.stairs, true);
  assert.ok(
    shortestPath(MAIN_GATE.entry, stairs.a, "shortest", merged.nodes, merged.edges),
  );
  assert.ok(
    shortestPath(MAIN_GATE.entry, stairs.b, "shortest", merged.nodes, merged.edges),
  );
});

test("a line end far from any path is kept but warned", () => {
  const [p, q] = sideLineNextToEdge(),
    far = { x: p.x + 2000, z: p.z };
  const merged = merge([line("lonely", [far, q])]);
  assert.ok(merged.warnings.some((w) => w.id === "lonely"));
});

// 미래관 남서쪽 오목한 벽(x≈173, z 352~361)은 30m 안의 기존 길이 모두 건물 너머라 바로는 못 붙습니다.
const recessedDoor = { buildingId: "future", name: "미래관 남서 오목 벽 문", x: 172.9, z: 356 };
// 그 문 앞까지 건물을 돌아 그린 길: 기존 길 위 점 → 꺾는 점 → 문 바로 앞
const pathToRecessedDoor = [
  { x: 167.6, z: 379.7 },
  { x: 164, z: 368 },
  { x: 171.5, z: 356 },
];

test("a door no existing path can reach is left out with a warning", () => {
  const merged = merge([entrance("recessed", recessedDoor)]);
  assert.equal(merged.nodes.recessed, undefined);
  assert.deepEqual(
    merged.warnings.map((w) => w.id),
    ["recessed"],
  );
});

test("a path drawn up to such a door lets the door join the graph", () => {
  // 파일 안 순서와 상관없이 길이 먼저 합쳐져야 합니다.
  const merged = merge([
    entrance("recessed", recessedDoor),
    line("to-recessed", pathToRecessedDoor),
  ]);
  assert.deepEqual(merged.warnings, []);
  assert.ok(merged.nodes.recessed);
  const route = shortestPath(
    MAIN_GATE.entry,
    "recessed",
    "shortest",
    merged.nodes,
    merged.edges,
  );
  assert.ok(route, "정문에서 오목한 벽의 문까지 경로가 있어야 합니다");
  assert.ok(route.path.some((id) => id.startsWith("to-recessed")));
});

test("attaching near an edge end reuses that node instead of splitting", () => {
  const edge = base.edges.find((e) => e.meters > 10),
    graph = { nodes: { ...base.nodes }, edges: base.edges.map((e) => ({ ...e })) },
    a = base.nodes[edge.a],
    result = attachToGraph(graph, { x: a.x + 0.3, z: a.z }, {
      id: "t",
      buildings: [],
    });
  assert.equal(graph.edges.length, base.edges.length);
  assert.ok(base.nodes[result.nodeId]);
});

test("a report keeps blocking its path after the edge is split", () => {
  const edge = base.edges.find((e) => e.meters > 20),
    a = base.nodes[edge.a],
    b = base.nodes[edge.b],
    point = { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 },
    report = {
      id: "r1",
      edgeId: edgeId(edge),
      point,
      reason: "construction",
      createdAt: "2026-11-12T00:00:00.000Z",
    },
    graph = { nodes: { ...base.nodes }, edges: base.edges.map((e) => ({ ...e })) };
  attachToGraph(graph, { x: point.x + 0.4, z: point.z + 0.4 }, {
    id: "split",
    buildings: [],
  });
  assert.ok(!graph.edges.some((e) => edgeId(e) === edgeId(edge)));
  const [kept] = sanitizeReports([report], graph.edges, graph.nodes);
  assert.ok(kept, "간선이 잘려도 신고가 남아야 합니다");
  assert.notEqual(kept.edgeId, report.edgeId);
  assert.equal(
    availableEdges([report], graph.edges, graph.nodes).length,
    graph.edges.length - 1,
  );
});
