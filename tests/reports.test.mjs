import test from "node:test";
import assert from "node:assert/strict";
import { NODES, EDGES, CAMPUS_GEOMETRY } from "../src/data.mjs";
import { shortestPath } from "../src/routing.mjs";
import {
  edgeId,
  availableEdges,
  sanitizeReports,
  locateReportPoint,
  groupReportsByEdge,
  edgeStatus,
  reviewGroups,
  reviewAlertCount,
  sanitizeConfirmedEdges,
  rowToReport,
  confirmedEdgesFromRows,
  REPORT_THRESHOLD,
} from "../src/reports.mjs";
import { gpsToCampus } from "../src/geo.mjs";
function reportFor(edge, overrides = {}) {
  const a = NODES[edge.a],
    b = NODES[edge.b];
  return {
    id: "test-report",
    edgeId: edgeId(edge),
    point: { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 },
    reason: "construction",
    createdAt: "2026-11-09T15:00:00.000Z",
    ...overrides,
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
test("only admin-confirmed edges are removed from routing", () => {
  // 자동 생성 그래프에서 futureDoor는 간선 하나로만 이어진 끝 노드입니다.
  // 팀 조사 데이터가 근처에 길을 더하면 달라지므로, 조사 데이터 없는 그래프로 확인합니다.
  const nodes = CAMPUS_GEOMETRY.nodes,
    edges = CAMPUS_GEOMETRY.edges,
    edge = edges.find((e) => e.a === "futureDoor" || e.b === "futureDoor");
  assert.equal(
    shortestPath(
      "gate",
      "futureDoor",
      "shortest",
      nodes,
      availableEdges([edgeId(edge)], edges),
    ),
    null,
  );
  assert.ok(
    shortestPath(
      "gate",
      "futureDoor",
      "shortest",
      nodes,
      availableEdges([], edges),
    ),
  );
});
test("several reports on one edge remain separate points and don't block routing by themselves", () => {
  const edge = EDGES[0],
    one = reportFor(edge),
    two = {
      ...one,
      id: "another",
      point: { x: one.point.x + 0.1, z: one.point.z },
    };
  assert.equal(sanitizeReports([one, two]).length, 2);
  assert.ok(availableEdges([]).some((e) => edgeId(e) === edgeId(edge)));
});
test("a single report shows caution on the map right away, before any threshold", () => {
  const edge = EDGES[0],
    reports = [reportFor(edge)],
    groups = groupReportsByEdge(reports);
  assert.equal(edgeStatus(edgeId(edge), groups, []), "caution");
  assert.equal(edgeStatus("no-such-edge--id", groups, []), "none");
});
test("reviewGroups lists every reported edge, flagging needsReview once the threshold is hit", () => {
  const edge = EDGES[0],
    base = reportFor(edge),
    nearbyPoint = (offset) => ({ x: base.point.x + offset, z: base.point.z }),
    reports = Array.from({ length: REPORT_THRESHOLD - 1 }, (_, i) =>
      reportFor(edge, { id: `r${i}`, point: nearbyPoint(i * 0.1) }),
    );
  assert.equal(reviewGroups(reports, [])[0].needsReview, false);
  assert.equal(reviewAlertCount(reports, []), 0);
  reports.push(reportFor(edge, { id: "last", point: nearbyPoint(0.5) }));
  assert.equal(reviewGroups(reports, [])[0].count, REPORT_THRESHOLD);
  assert.equal(reviewGroups(reports, [])[0].needsReview, true);
  assert.equal(reviewAlertCount(reports, []), 1);
});
test("a single report still shows up for admin review, just not flagged as needing review yet", () => {
  const edge = EDGES[0],
    reports = [reportFor(edge)],
    groups = reviewGroups(reports, []);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].count, 1);
  assert.equal(groups[0].needsReview, false);
});
test("admin confirmation overrides report count and blocks the edge regardless", () => {
  const edge = EDGES[0],
    reports = [reportFor(edge)],
    groups = groupReportsByEdge(reports);
  assert.equal(edgeStatus(edgeId(edge), groups, [edgeId(edge)]), "confirmed");
  assert.equal(reviewGroups(reports, [edgeId(edge)]).length, 0);
  assert.ok(
    !availableEdges([edgeId(edge)]).some((e) => edgeId(e) === edgeId(edge)),
  );
});
test("sanitizeReports passes through an optional photoPath and drops non-string ones", () => {
  const withPhoto = reportFor(EDGES[0], { photoPath: "device-1/123-x.jpg" }),
    withBadPhoto = reportFor(EDGES[0], { id: "bad-photo", photoPath: 42 });
  assert.equal(sanitizeReports([withPhoto])[0].photoPath, "device-1/123-x.jpg");
  assert.equal("photoPath" in sanitizeReports([withBadPhoto])[0], false);
});
test("rowToReport maps Supabase snake_case rows to the client report shape", () => {
  const edge = EDGES[0],
    row = {
      id: "row-1",
      edge_id: edgeId(edge),
      point_x: 12.3,
      point_z: -4.5,
      reason: "blocked",
      created_at: "2026-11-09T15:00:00.000Z",
      photo_path: "device-1/photo.jpg",
      status: "reported",
    };
  assert.deepEqual(rowToReport(row), {
    id: "row-1",
    edgeId: edgeId(edge),
    point: { x: 12.3, z: -4.5 },
    reason: "blocked",
    createdAt: "2026-11-09T15:00:00.000Z",
    photoPath: "device-1/photo.jpg",
  });
});
test("confirmedEdgesFromRows collects only status='confirmed' rows, deduped", () => {
  const edge = EDGES[0],
    base = reportFor(edge),
    rows = [
      {
        edge_id: edgeId(edge),
        point_x: base.point.x,
        point_z: base.point.z,
        status: "confirmed",
      },
      {
        edge_id: edgeId(edge),
        point_x: base.point.x,
        point_z: base.point.z,
        status: "confirmed",
      },
      { edge_id: edgeId(EDGES[1]), status: "reported" },
    ];
  assert.deepEqual(confirmedEdgesFromRows(rows), [edgeId(edge)]);
  assert.deepEqual(confirmedEdgesFromRows([]), []);
  assert.deepEqual(confirmedEdgesFromRows(undefined), []);
});
test("confirmedEdgesFromRows remaps a confirmed edge that got split, using the stored point", () => {
  const edge = EDGES[0],
    base = reportFor(edge),
    splitEdges = [
      { a: edge.a, b: "mid-node", meters: 1 },
      { a: "mid-node", b: edge.b, meters: 1 },
    ],
    splitNodes = {
      ...NODES,
      "mid-node": { x: base.point.x, z: base.point.z },
    },
    rows = [
      {
        edge_id: edgeId(edge), // 분할 전 id, 이제 splitEdges엔 존재하지 않음
        point_x: base.point.x,
        point_z: base.point.z,
        status: "confirmed",
      },
    ];
  assert.deepEqual(confirmedEdgesFromRows(rows, splitEdges, splitNodes), [
    edgeId(splitEdges[0]),
  ]);
});
test("sanitizeConfirmedEdges drops unknown edges, duplicates, and non-string values", () => {
  const edge = EDGES[0];
  assert.deepEqual(
    sanitizeConfirmedEdges([
      edgeId(edge),
      edgeId(edge),
      "not-an-edge",
      42,
      null,
    ]),
    [edgeId(edge)],
  );
  assert.deepEqual(sanitizeConfirmedEdges(null), []);
});
test("sanitizeReports rejects malformed or out-of-range entries", () => {
  const ok = reportFor(EDGES[0]);
  assert.deepEqual(
    sanitizeReports([{}, null, { ...ok, point: { x: 1e9, z: 1e9 } }]),
    [],
  );
  assert.equal(sanitizeReports([ok]).length, 1);
});
