import { EDGES, NODES, BUILDINGS } from "../campus/data.mjs";
import { projectToSegment, insideBuilding } from "../campus/geo.mjs";

export const edgeId = (edge) => [edge.a, edge.b].sort().join("--");
export const edgeName = (edge) => edge.name || "교내 보행로";
const edgeLookup = new Map(EDGES.map((edge) => [edgeId(edge), edge]));

// 사용자는 위치만 누릅니다. 팀 경로 알고리즘에 연결할 edge는 내부에서 찾습니다.
export function locateReportPoint(
  point,
  edges = EDGES,
  nodes = NODES,
  maxDistance = 16,
) {
  if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.z))
    return null;
  if (BUILDINGS.some((building) => insideBuilding(point, building)))
    return null;
  let best = null;
  for (const edge of edges) {
    const projected = projectToSegment(point, nodes[edge.a], nodes[edge.b]);
    if (!best || projected.distance < best.distance)
      best = { edgeId: edgeId(edge), distance: projected.distance };
  }
  if (!best || best.distance > maxDistance) return null;
  // 마커는 edge의 중앙이나 투영점이 아니라 사용자가 실제 누른 자리에 놓습니다.
  return {
    edgeId: best.edgeId,
    point: {
      x: Math.round(point.x * 10) / 10,
      z: Math.round(point.z * 10) / 10,
    },
  };
}
export function reportLocation(report) {
  const b = BUILDINGS.filter((b) => b.name !== "교내 건물").reduce(
    (best, b) =>
      !best ||
      Math.hypot(report.point.x - b.x, report.point.z - b.z) <
        Math.hypot(report.point.x - best.x, report.point.z - best.z)
        ? b
        : best,
    null,
  );
  return `${b?.name || "캠퍼스"} 인근 · 선택한 도로 구간`;
}
// 신고가 가리키던 간선이 팀 조사 데이터로 잘려 id가 바뀌어도, 저장된 클릭 좌표에서
// 가장 가까운 간선을 다시 찾아 신고를 유지합니다.
function nearestEdge(point, edges, nodes, maxDistance) {
  let best = null;
  for (const edge of edges) {
    const { distance } = projectToSegment(point, nodes[edge.a], nodes[edge.b]);
    if (distance <= maxDistance && (!best || distance < best.distance))
      best = { edge, distance };
  }
  return best?.edge ?? null;
}
export function sanitizeReports(value, edges = EDGES, nodes = NODES) {
  if (!Array.isArray(value)) return [];
  const lookup =
    edges === EDGES ? edgeLookup : new Map(edges.map((e) => [edgeId(e), e]));
  const unique = new Map();
  for (const report of value.slice(0, 500)) {
    if (
      !report ||
      typeof report.id !== "string" ||
      report.id.length > 100 ||
      !report.id ||
      typeof report.edgeId !== "string" ||
      !REPORT_REASONS.includes(report.reason)
    )
      continue;
    const note =
      typeof report.reasonNote === "string"
        ? report.reasonNote.trim().slice(0, REASON_NOTE_MAX)
        : "";
    // 기타 사유는 직접 쓴 글이 있어야 의미가 있습니다.
    if (report.reason === "other" && !note) continue;
    if (
      typeof report.createdAt !== "string" ||
      !Number.isFinite(Date.parse(report.createdAt))
    )
      continue;
    const p = report.point;
    if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.z)) continue;
    let edge = lookup.get(report.edgeId);
    if (
      !edge ||
      projectToSegment(p, nodes[edge.a], nodes[edge.b]).distance > 20
    )
      edge = nearestEdge(p, edges, nodes, 20);
    if (!edge) continue;
    unique.set(report.id, {
      id: report.id,
      edgeId: edgeId(edge),
      point: { x: p.x, z: p.z },
      reason: report.reason,
      ...(report.reason === "other" ? { reasonNote: note } : {}),
      createdAt: report.createdAt,
      ...(typeof report.deviceId === "string"
        ? { deviceId: report.deviceId }
        : {}),
      // 사진은 Supabase Storage 경로만 들고 다닙니다. 실제 URL은 backend.mjs의
      // photoUrlFor()로 보여줄 때 만듭니다.
      ...(typeof report.photoPath === "string"
        ? { photoPath: report.photoPath }
        : {}),
      ...(report.gps &&
      Number.isFinite(report.gps.x) &&
      Number.isFinite(report.gps.z)
        ? {
            gps: {
              x: report.gps.x,
              z: report.gps.z,
              accuracy: Number.isFinite(report.gps.accuracy)
                ? report.gps.accuracy
                : null,
            },
          }
        : {}),
      ...(typeof report.takenAt === "string"
        ? { takenAt: report.takenAt }
        : {}),
      ...(report.confirmed === true ? { confirmed: true } : {}),
      ...(typeof report.confirmedEdgeId === "string"
        ? { confirmedEdgeId: report.confirmedEdgeId }
        : {}),
      ...(report.isCover === true ? { isCover: true } : {}),
    });
  }
  return [...unique.values()];
}
// Supabase road_reports 행을 클라이언트 report 모양으로 바꿉니다. DB 컬럼은
// snake_case(edge_id, point_x...), 클라이언트 쪽은 기존 로컬 데모와 같은
// camelCase 모양을 씁니다.
export function rowToReport(row) {
  return {
    id: row.id,
    edgeId: row.edge_id,
    point: { x: row.point_x, z: row.point_z },
    reason: row.reason,
    ...(row.reason_note ? { reasonNote: row.reason_note } : {}),
    createdAt: row.created_at,
    ...(row.reporter_device_id ? { deviceId: row.reporter_device_id } : {}),
    ...(row.photo_path ? { photoPath: row.photo_path } : {}),
    ...(row.gps_x != null && row.gps_z != null
      ? { gps: { x: row.gps_x, z: row.gps_z, accuracy: row.gps_accuracy } }
      : {}),
    ...(row.taken_at ? { takenAt: row.taken_at } : {}),
    ...(row.status === "confirmed" ? { confirmed: true } : {}),
    ...(row.confirmed_edge_id
      ? { confirmedEdgeId: row.confirmed_edge_id }
      : {}),
    ...(row.is_cover ? { isCover: true } : {}),
  };
}
// 신고 사유: 1. 공사 중 2. 장애물·통제 3. 기타(직접 입력)
export const REPORT_REASONS = ["construction", "blocked", "other"];
export const REASON_NOTE_MAX = 100;
export function reasonLabel(report) {
  if (report.reason === "construction") return "공사 중";
  if (report.reason === "blocked") return "장애물·통제";
  return `기타: ${report.reasonNote || ""}`;
}
// status='confirmed'인 행들의 edge_id를 모읍니다. 팀 조사 데이터가 그 구간을
// 쪼개서 원래 edge_id가 사라졌으면, 저장된 클릭 좌표로 가장 가까운 edge를 다시 찾습니다
// (sanitizeReports의 재매핑과 같은 방식 — 안 그러면 확정 차단이 조용히 풀려버립니다).
export function confirmedEdgesFromRows(rows, edges = EDGES, nodes = NODES) {
  const lookup =
    edges === EDGES ? edgeLookup : new Map(edges.map((e) => [edgeId(e), e]));
  const result = new Set();
  for (const row of rows || []) {
    if (row.status !== "confirmed") continue;
    const point = { x: row.point_x, z: row.point_z };
    const selected = row.confirmed_edge_id;
    let edge = lookup.get(selected || row.edge_id);
    if (
      !selected &&
      (!edge ||
        (Number.isFinite(point.x) &&
          Number.isFinite(point.z) &&
          projectToSegment(point, nodes[edge.a], nodes[edge.b]).distance > 20))
    )
      edge =
        Number.isFinite(point.x) && Number.isFinite(point.z)
          ? (nearestEdge(point, edges, nodes, 20) ?? edge)
          : edge;
    if (edge) result.add(edgeId(edge));
  }
  return [...result];
}
// 신고가 이 값 이상 쌓이면 지도에 "주의"(노란색)로 뜨고 관리자에게 검토 알림이 갑니다.
// 관리자가 확정하기 전까지는 경로를 막지 않습니다.
export const REPORT_THRESHOLD = 3;

export function sanitizeConfirmedEdges(value, edges = EDGES) {
  if (!Array.isArray(value)) return [];
  const lookup =
    edges === EDGES ? edgeLookup : new Set(edges.map((e) => edgeId(e)));
  return [
    ...new Set(value.filter((id) => typeof id === "string" && lookup.has(id))),
  ].slice(0, 500);
}

// 신고 위치끼리 이 거리(m) 안이면 같은 구역으로 묶습니다. 이웃의 이웃도 같은 구역입니다.
export const CLUSTER_RADIUS = 30;

// 촬영한 GPS 위치에서 신고 지점까지 거리(m). GPS 정보가 없는 예전 신고는 null.
export const gpsDistance = (report) =>
  report.gps
    ? Math.hypot(report.point.x - report.gps.x, report.point.z - report.gps.z)
    : null;

// 대표 사진: 관리자가 고른 것(isCover) → 사진이 있는 신고 중 촬영 위치가 신고 지점에서
// 30m 안인 가장 최근 신고 → 그다음 사진이 있는 가장 최근 신고.
export function pickCover(reports) {
  const newest = [...reports].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
  const withPhoto = newest.filter((r) => r.photoPath);
  return (
    withPhoto.find((r) => r.isCover) ||
    withPhoto.find((r) => {
      const d = gpsDistance(r);
      return d !== null && d <= CLUSTER_RADIUS;
    }) ||
    withPhoto[0] ||
    newest[0]
  );
}

// 신고를 구역으로 묶습니다. 구역 상태:
// pending(신고 접수, 지도엔 안 보임) → caution(신고 threshold 이상, 노란색)
// → confirmed(관리자 확정, 빨간색 차단).
// ponytail: 모든 쌍 비교 O(n²). 신고는 최대 500건이라 충분합니다.
export function clusterReports(
  reports,
  radius = CLUSTER_RADIUS,
  threshold = REPORT_THRESHOLD,
) {
  const list = sanitizeReports(reports);
  const parent = list.map((_, i) => i);
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i].point,
        b = list[j].point;
      if (Math.hypot(a.x - b.x, a.z - b.z) <= radius) parent[find(i)] = find(j);
    }
  const byRoot = new Map();
  list.forEach((r, i) => {
    const root = find(i);
    byRoot.set(root, [...(byRoot.get(root) || []), r]);
  });
  return [...byRoot.values()]
    .map((members) => {
      // 관리자 목록의 "3건 이상"은 실제 접수된 신고 행 수를 뜻합니다.
      const count = members.length;
      const deviceCount = new Set(members.map((r) => r.deviceId || r.id)).size;
      const cover = pickCover(members);
      const status = members.some((r) => r.confirmed)
        ? "confirmed"
        : count >= threshold
          ? "caution"
          : "pending";
      return {
        // 구역 id는 가장 오래된 신고 id로 정해 새로고침해도 같게 둡니다.
        id: [...members].sort(
          (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
        )[0].id,
        reports: members,
        count,
        deviceCount,
        status,
        needsReview: status === "caution",
        cover,
        edgeIds: [
          ...new Set(
            members.map((r) =>
              status === "confirmed" && r.confirmedEdgeId
                ? r.confirmedEdgeId
                : r.edgeId,
            ),
          ),
        ],
        latestAt: members.reduce(
          (latest, r) =>
            Date.parse(r.createdAt) > Date.parse(latest) ? r.createdAt : latest,
          members[0].createdAt,
        ),
      };
    })
    .sort(
      (a, b) =>
        Number(b.needsReview) - Number(a.needsReview) ||
        b.count - a.count ||
        Date.parse(b.latestAt) - Date.parse(a.latestAt),
    );
}

export const clusterOf = (reportId, clusters) =>
  clusters.find((c) => c.reports.some((r) => r.id === reportId));

// 사진 정리: Storage에 있지만 어떤 신고(photo_path)와도 연결되지 않은 사진을 고릅니다.
// 사진을 먼저 올리고 신고를 저장하므로, 방금 올라온 사진은 아직 신고가 없을 수 있습니다.
// 그래서 minAgeMs(기본 24시간)보다 오래된 것만 지웁니다.
// files: [{ path: "기기ID/1731500000000.jpg", createdAt: ISO 문자열 }]
export const ORPHAN_PHOTO_MIN_AGE_MS = 24 * 60 * 60 * 1000;
export function orphanPhotos(
  files,
  referencedPaths,
  { now = Date.now(), minAgeMs = ORPHAN_PHOTO_MIN_AGE_MS } = {},
) {
  const used = new Set((referencedPaths || []).filter(Boolean));
  return (files || [])
    .filter((file) => {
      const created = Date.parse(file?.createdAt);
      return (
        file?.path &&
        !used.has(file.path) &&
        Number.isFinite(created) &&
        now - created >= minAgeMs
      );
    })
    .map((file) => file.path);
}

// 관리자가 확정한 구간만 경로에서 제외합니다. 신고가 쌓인 것만으로는 막지 않습니다.
export function availableEdges(confirmedEdges, edges = EDGES) {
  const blocked = new Set(sanitizeConfirmedEdges(confirmedEdges, edges));
  return edges.filter((edge) => !blocked.has(edgeId(edge)));
}
