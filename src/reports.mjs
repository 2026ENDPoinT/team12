import { EDGES, NODES, BUILDINGS } from "./data.mjs";
import { projectToSegment, insideBuilding } from "./geo.mjs";

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
      !["construction", "blocked"].includes(report.reason)
    )
      continue;
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
      createdAt: report.createdAt,
      // 사진은 Supabase Storage 경로만 들고 다닙니다. 실제 URL은 backend.mjs의
      // photoUrlFor()로 보여줄 때 만듭니다.
      ...(typeof report.photoPath === "string"
        ? { photoPath: report.photoPath }
        : {}),
    });
  }
  return [...unique.values()];
}
// Supabase road_reports 행을 클라이언트 report 모양으로 바꿉니다. DB 컬럼은
// snake_case(edge_id, point_x...), 클라이언트 쪽은 기존 로컬 데모와 같은
// camelCase 모양을 그대로 써서 groupReportsByEdge 등 아래 함수들을 바꿀 필요가 없게 합니다.
export function rowToReport(row) {
  return {
    id: row.id,
    edgeId: row.edge_id,
    point: { x: row.point_x, z: row.point_z },
    reason: row.reason,
    createdAt: row.created_at,
    ...(row.photo_path ? { photoPath: row.photo_path } : {}),
  };
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
    let edge = lookup.get(row.edge_id);
    if (
      !edge ||
      (Number.isFinite(point.x) &&
        Number.isFinite(point.z) &&
        projectToSegment(point, nodes[edge.a], nodes[edge.b]).distance > 20)
    )
      edge =
        Number.isFinite(point.x) && Number.isFinite(point.z)
          ? (nearestEdge(point, edges, nodes, 20) ?? edge)
          : edge;
    if (edge) result.add(edgeId(edge));
  }
  return [...result];
}
// 신고는 1건부터 바로 지도에 "주의"(노란색)로 뜹니다.
// 이 값 이상 쌓이면 관리자에게 검토 알림이 갑니다. 관리자가 확정하기 전까지는 경로를 막지 않습니다.
export const REPORT_THRESHOLD = 3;

export function sanitizeConfirmedEdges(value, edges = EDGES) {
  if (!Array.isArray(value)) return [];
  const lookup =
    edges === EDGES ? edgeLookup : new Set(edges.map((e) => edgeId(e)));
  return [
    ...new Set(value.filter((id) => typeof id === "string" && lookup.has(id))),
  ].slice(0, 500);
}

// 같은 구간(edge)에 쌓인 신고를 하나로 묶어 개수·최신 시각을 셉니다.
export function groupReportsByEdge(reports) {
  const groups = new Map();
  for (const report of sanitizeReports(reports)) {
    const group = groups.get(report.edgeId) || {
      edgeId: report.edgeId,
      reports: [],
    };
    group.reports.push(report);
    groups.set(report.edgeId, group);
  }
  for (const group of groups.values()) {
    group.count = group.reports.length;
    group.latestAt = group.reports.reduce(
      (latest, r) =>
        Date.parse(r.createdAt) > Date.parse(latest) ? r.createdAt : latest,
      group.reports[0].createdAt,
    );
  }
  return groups;
}

// caution(신고 1건부터, 노란색) → confirmed(관리자 확정, 빨간색 차단).
export function edgeStatus(edgeId, groups, confirmedEdges) {
  if (confirmedEdges.includes(edgeId)) return "confirmed";
  return groups.has(edgeId) ? "caution" : "none";
}

// 관리자 검토 화면에 띄울 구간 목록입니다. 1건부터 전부 보이며(확정된 구간은 제외).
// needsReview: threshold 이상 쌓여 관리자 확인이 필요하다고 알려야 하는 구간.
export function reviewGroups(
  reports,
  confirmedEdges,
  threshold = REPORT_THRESHOLD,
) {
  const groups = groupReportsByEdge(reports);
  return [...groups.values()]
    .filter((g) => !confirmedEdges.includes(g.edgeId))
    .map((g) => ({ ...g, needsReview: g.count >= threshold }))
    .sort(
      (a, b) =>
        Number(b.needsReview) - Number(a.needsReview) ||
        b.count - a.count ||
        Date.parse(b.latestAt) - Date.parse(a.latestAt),
    );
}

// 관리자 알림용: 지금 검토가 필요한(threshold 이상 쌓인) 구간 수.
export function reviewAlertCount(
  reports,
  confirmedEdges,
  threshold = REPORT_THRESHOLD,
) {
  return reviewGroups(reports, confirmedEdges, threshold).filter(
    (g) => g.needsReview,
  ).length;
}

// 관리자가 확정한 구간만 경로에서 제외합니다. 신고가 쌓인 것만으로는 막지 않습니다.
export function availableEdges(confirmedEdges, edges = EDGES) {
  const blocked = new Set(sanitizeConfirmedEdges(confirmedEdges, edges));
  return edges.filter((edge) => !blocked.has(edgeId(edge)));
}
