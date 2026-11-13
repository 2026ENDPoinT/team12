import test from "node:test";
import assert from "node:assert/strict";
import { NODES, EDGES, CAMPUS_GEOMETRY } from "../src/data.mjs";
import { shortestPath } from "../src/routing.mjs";
import {
  edgeId,
  availableEdges,
  sanitizeReports,
  locateReportPoint,
  clusterReports,
  pickCover,
  gpsDistance,
  CLUSTER_RADIUS,
  sanitizeConfirmedEdges,
  rowToReport,
  confirmedEdgesFromRows,
  REPORT_THRESHOLD,
  REASON_NOTE_MAX,
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
test("caution (yellow) only appears once THRESHOLD distinct devices report the area", () => {
  const edge = EDGES[0],
    device = (i) => reportFor(edge, { id: `r${i}`, deviceId: `device-${i}` });
  assert.equal(clusterReports([device(0)])[0].status, "pending");
  assert.equal(clusterReports([]).length, 0);
  const many = Array.from({ length: REPORT_THRESHOLD }, (_, i) => device(i));
  assert.equal(clusterReports(many)[0].status, "caution");
  assert.equal(clusterReports(many)[0].needsReview, true);
});
test("the same device reporting one area several times counts once", () => {
  const edge = EDGES[0],
    reports = Array.from({ length: REPORT_THRESHOLD }, (_, i) =>
      reportFor(edge, { id: `r${i}`, deviceId: "same-device" }),
    ),
    [cluster] = clusterReports(reports);
  assert.equal(cluster.count, 1);
  assert.equal(cluster.status, "pending");
});
// 긴 간선 위 a에서 meters만큼 떨어진 점
function along(edge, meters) {
  const a = NODES[edge.a],
    b = NODES[edge.b],
    t = meters / Math.hypot(b.x - a.x, b.z - a.z);
  return { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t };
}
test("reports within CLUSTER_RADIUS join one area, even across neighbouring edges and via chains", () => {
  const long = EDGES.find(
      (e) =>
        Math.hypot(NODES[e.b].x - NODES[e.a].x, NODES[e.b].z - NODES[e.a].z) >
        CLUSTER_RADIUS * 2 + 10,
    ),
    at = (id, m) =>
      reportFor(long, { id, deviceId: id, point: along(long, m) });
  const step = CLUSTER_RADIUS - 5;
  // A–B, B–C는 반경 안, A–C는 밖 → 이어져서 한 구역
  const chain = clusterReports([at("A", 0), at("B", step), at("C", step * 2)]);
  assert.equal(chain.length, 1);
  assert.equal(chain[0].count, 3);
  // 반경보다 멀면 다른 구역
  const apart = clusterReports([at("A", 0), at("Z", CLUSTER_RADIUS * 2)]);
  assert.equal(apart.length, 2);
  // 이웃한 다른 간선의 신고도 가까우면 같은 구역
  const node = NODES[long.a],
    other = EDGES.find((e) => e !== long && (e.a === long.a || e.b === long.a)),
    near = (id, e) =>
      reportFor(e, {
        id,
        deviceId: id,
        point: { x: node.x + 1, z: node.z + 1 },
      });
  const mixed = clusterReports([near("P", long), near("Q", other)]);
  assert.equal(mixed.length, 1);
});
test("'other' reason needs a written note; the note is trimmed and capped", () => {
  const edge = EDGES[0];
  assert.equal(
    sanitizeReports([reportFor(edge, { reason: "other", reasonNote: "  " })])
      .length,
    0,
  );
  const [kept] = sanitizeReports([
    reportFor(edge, { reason: "other", reasonNote: ` ${"가".repeat(300)} ` }),
  ]);
  assert.equal(kept.reasonNote.length, REASON_NOTE_MAX);
  assert.equal(
    sanitizeReports([reportFor(edge, { reason: "unknown" })]).length,
    0,
  );
});
test("a single report still shows up as its own pending area for admin review", () => {
  const [cluster] = clusterReports([reportFor(EDGES[0])]);
  assert.equal(cluster.count, 1);
  assert.equal(cluster.needsReview, false);
});
test("a confirmed report makes its whole area confirmed; routing blocks confirmed edges", () => {
  const edge = EDGES[0],
    reports = [
      reportFor(edge, { id: "a", confirmed: true }),
      reportFor(edge, { id: "b" }),
    ],
    [cluster] = clusterReports(reports);
  assert.equal(cluster.status, "confirmed");
  assert.deepEqual(cluster.edgeIds, [edgeId(edge)]);
  assert.ok(
    !availableEdges([edgeId(edge)]).some((e) => edgeId(e) === edgeId(edge)),
  );
});
test("pickCover prefers the admin's choice, then the newest report with a photo", () => {
  const edge = EDGES[0],
    old = reportFor(edge, {
      id: "old",
      photoPath: "p/old.png",
      createdAt: "2026-11-01T00:00:00Z",
    }),
    mid = reportFor(edge, {
      id: "mid",
      photoPath: "p/mid.png",
      createdAt: "2026-11-05T00:00:00Z",
    }),
    noPhoto = reportFor(edge, { id: "new", createdAt: "2026-11-09T00:00:00Z" });
  assert.equal(pickCover([old, mid, noPhoto]).id, "mid");
  assert.equal(pickCover([{ ...old, isCover: true }, mid, noPhoto]).id, "old");
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
  assert.deepEqual(
    rowToReport({
      ...row,
      reason: "other",
      reason_note: "펜스 설치",
      reporter_device_id: "device-1",
    }),
    {
      id: "row-1",
      edgeId: edgeId(edge),
      point: { x: 12.3, z: -4.5 },
      reason: "other",
      reasonNote: "펜스 설치",
      createdAt: "2026-11-09T15:00:00.000Z",
      deviceId: "device-1",
      photoPath: "device-1/photo.jpg",
    },
  );
  const confirmed = rowToReport({
    ...row,
    status: "confirmed",
    is_cover: true,
  });
  assert.equal(confirmed.confirmed, true);
  assert.equal(confirmed.isCover, true);
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
test("GPS shot position flows from DB rows and drives the auto-picked cover", () => {
  const edge = EDGES[0],
    base = reportFor(edge),
    row = rowToReport({
      id: "g1",
      edge_id: edgeId(edge),
      point_x: base.point.x,
      point_z: base.point.z,
      reason: "construction",
      created_at: "2026-11-13T00:00:00Z",
      gps_x: base.point.x + 3,
      gps_z: base.point.z + 4,
      gps_accuracy: 8,
      taken_at: "2026-11-13T00:00:00Z",
    });
  assert.deepEqual(row.gps, {
    x: base.point.x + 3,
    z: base.point.z + 4,
    accuracy: 8,
  });
  assert.equal(row.takenAt, "2026-11-13T00:00:00Z");
  assert.equal(gpsDistance(sanitizeReports([row])[0]), 5);
  assert.equal(gpsDistance(base), null);
  // 더 최근이어도 촬영 위치가 30m 밖인 사진보다, 가까이서 찍은 사진을 대표로 고릅니다.
  const near = reportFor(edge, {
      id: "near",
      photoPath: "p/near.jpg",
      createdAt: "2026-11-01T00:00:00Z",
      gps: { x: base.point.x + 2, z: base.point.z, accuracy: 6 },
    }),
    far = reportFor(edge, {
      id: "far",
      photoPath: "p/far.jpg",
      createdAt: "2026-11-09T00:00:00Z",
      gps: {
        x: base.point.x + CLUSTER_RADIUS + 10,
        z: base.point.z,
        accuracy: 6,
      },
    });
  assert.equal(pickCover([near, far]).id, "near");
});
