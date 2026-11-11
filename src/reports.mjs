import { EDGES, NODES, BUILDINGS } from "./data.mjs";
import { projectToSegment, insideBuilding } from "./geo.mjs";

// TODO(백엔드): 클릭한 위치를 저장하는 브라우저 전용 시연입니다. 서버 API로 교체하세요.
// v2는 예전 구간 중앙 방식과 분리합니다. 선택 목록은 없고 실제 클릭 좌표를 저장합니다.
export const REPORT_STORAGE_KEY = "sai:seoultech:point-reports:v2";
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
    if (!edge || projectToSegment(p, nodes[edge.a], nodes[edge.b]).distance > 20)
      edge = nearestEdge(p, edges, nodes, 20);
    if (!edge) continue;
    unique.set(report.id, {
      id: report.id,
      edgeId: edgeId(edge),
      point: { x: p.x, z: p.z },
      reason: report.reason,
      createdAt: report.createdAt,
    });
  }
  return [...unique.values()];
}
export function readReports(storage) {
  try {
    return sanitizeReports(
      JSON.parse(storage.getItem(REPORT_STORAGE_KEY) || "[]"),
    );
  } catch {
    return [];
  }
}
export function writeReports(storage, reports) {
  try {
    storage.setItem(
      REPORT_STORAGE_KEY,
      JSON.stringify(sanitizeReports(reports)),
    );
    return true;
  } catch {
    return false;
  }
}
// TODO(팀 알고리즘): 선택한 위치와 연결된 길을 차단하는 임시 정책입니다.
// 실제 서비스에서는 공사 범위·보행 너비·검증 상태를 반영하도록 교체하세요.
export function availableEdges(reports, edges = EDGES, nodes = NODES) {
  const blocked = new Set(
    sanitizeReports(reports, edges, nodes).map((r) => r.edgeId),
  );
  return edges.filter((edge) => !blocked.has(edgeId(edge)));
}
