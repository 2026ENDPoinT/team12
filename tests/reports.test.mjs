import test from "node:test";
import assert from "node:assert/strict";
import { NODES, EDGES, CAMPUS_GEOMETRY } from "../src/data.mjs";
import { shortestPath } from "../src/routing.mjs";
import {
  edgeId,
  availableEdges,
  sanitizeReports,
  readReports,
  writeReports,
  locateReportPoint,
} from "../src/reports.mjs";
import { gpsToCampus } from "../src/geo.mjs";
function reportFor(edge) {
  const a = NODES[edge.a],
    b = NODES[edge.b];
  return {
    id: "test-report",
    edgeId: edgeId(edge),
    point: { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 },
    reason: "construction",
    createdAt: "2026-11-09T15:00:00.000Z",
  };
}
test("click report preserves the clicked coordinate rather than segment midpoint", () => {
  const edge = EDGES.find((e) => e.meters > 15),
    a = NODES[edge.a],
    b = NODES[edge.b];
  const point = { x: a.x + (b.x - a.x) * 0.23, z: a.z + (b.z - a.z) * 0.23 };
  const selected = locateReportPoint(point);
  assert.ok(selected);
  assert.ok(Math.abs(selected.point.x - point.x) <= 0.051);
  assert.ok(Math.abs(selected.point.z - point.z) <= 0.051);
  assert.notDeepEqual(selected.point, {
    x: (a.x + b.x) / 2,
    z: (a.z + b.z) / 2,
  });
});
test("click far outside paths or invalid values is rejected", () => {
  assert.equal(locateReportPoint({ x: 9000, z: 9000 }), null);
  assert.equal(locateReportPoint({ x: NaN, z: 0 }), null);
});
test("GPS coordinates convert to the campus east/south meter axes", () => {
  const origin = { lat: 37.63236695, lon: 127.079186 };
  assert.deepEqual(gpsToCampus(origin.lat, origin.lon, origin), { x: 0, z: 0 });
  const northEast = gpsToCampus(origin.lat + 0.001, origin.lon + 0.001, origin);
  assert.ok(northEast.x > 87 && northEast.x < 90);
  assert.ok(northEast.z < -110 && northEast.z > -112);
  assert.equal(gpsToCampus(NaN, origin.lon, origin), null);
});
test("blocked edge is removed from routing; deleting report restores it", () => {
  // 자동 생성 그래프에서 futureDoor는 간선 하나로만 이어진 끝 노드입니다.
  // 팀 조사 데이터가 근처에 길을 더하면 달라지므로, 조사 데이터 없는 그래프로 확인합니다.
  const nodes = CAMPUS_GEOMETRY.nodes,
    edges = CAMPUS_GEOMETRY.edges,
    edge = edges.find((e) => e.a === "futureDoor" || e.b === "futureDoor"),
    a = nodes[edge.a],
    b = nodes[edge.b],
    report = {
      id: "test-report",
      edgeId: edgeId(edge),
      point: { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 },
      reason: "construction",
      createdAt: "2026-11-09T15:00:00.000Z",
    };
  assert.equal(
    shortestPath(
      "gate",
      "futureDoor",
      "shortest",
      nodes,
      availableEdges([report], edges, nodes),
    ),
    null,
  );
  assert.ok(
    shortestPath("gate", "futureDoor", "shortest", nodes, availableEdges([], edges, nodes)),
  );
});
test("several reports on one edge remain separate points and keep edge blocked until all removed", () => {
  const edge = EDGES[0],
    one = reportFor(edge),
    two = {
      ...one,
      id: "another",
      point: { x: one.point.x + 0.1, z: one.point.z },
    };
  assert.equal(sanitizeReports([one, two]).length, 2);
  assert.ok(!availableEdges([two]).some((e) => edgeId(e) === edgeId(edge)));
});
test("storage survives reload and rejects invalid reports or unavailable storage", () => {
  const memory = new Map(),
    storage = {
      getItem: (k) => memory.get(k),
      setItem: (k, v) => memory.set(k, v),
    },
    reports = [reportFor(EDGES[0])];
  assert.equal(writeReports(storage, reports), true);
  assert.deepEqual(readReports(storage), reports);
  assert.deepEqual(readReports(null), []);
  assert.equal(writeReports(null, reports), false);
  assert.deepEqual(
    sanitizeReports([{}, null, { ...reports[0], point: { x: 1e9, z: 1e9 } }]),
    [],
  );
  assert.deepEqual(readReports({ getItem: () => "{bad" }), []);
});
