// GPS 위치를 경로의 출발점(또는 도착점)으로 그래프에 붙입니다. 명세 Phase 2-3.
// 가장 가까운 노드로 순간이동하지 않고, 가장 가까운 길 위의 점에서 길을 둘로 잘라 시작합니다.
// 그래서 긴 길 중간에서 출발해도 뒤로 갔다 돌아오지 않고, 다익스트라가 양쪽 중 짧은 쪽을 고릅니다.
import { attachToGraph } from "../campus/survey.mjs";
import { insideBuilding } from "../campus/geo.mjs";

// GPS 오차(실외 약 10m)에 여유를 둔 거리입니다. 이 안에 건물을 지나지 않고 닿는 길이 없으면
// 가장 가까운 노드에 붙입니다(예전 방식). 경로가 아예 안 나오는 것보다 낫기 때문입니다.
export const GPS_ATTACH_M = 50;

/**
 * point: GPS 위치(캠퍼스 미터 좌표 {x, z}). graph: 경로 계산에 쓸 {nodes, edges}
 * (공사 차단 구간을 이미 뺀 것). 원래 graph는 바꾸지 않습니다.
 * 반환:
 * - { kind: "building", building }: GPS가 건물 안. 호출부가 그 건물 출입구에서 출발시킵니다.
 * - { kind: "edge", nodeId, graph }: 길 위의 점(nodeId)을 더한 새 그래프. 길 끝 1m 안이면 그 노드.
 * - { kind: "node", nodeId, graph }: 붙을 길이 없어 가장 가까운 노드에 붙임.
 * - null: 그래프가 비어 있음.
 */
export function attachGps(point, graph, { buildings = [], id = "gps" } = {}) {
  const building = buildings.find((b) => insideBuilding(point, b));
  if (building) return { kind: "building", building };

  const next = { nodes: { ...graph.nodes }, edges: [...graph.edges] },
    attached = attachToGraph(next, point, {
      id,
      buildings,
      maxDistance: GPS_ATTACH_M,
    });
  if (attached) return { kind: "edge", nodeId: attached.nodeId, graph: next };

  const nearest = nearestNode(point, graph.nodes);
  return nearest && { kind: "node", nodeId: nearest, graph };
}

function nearestNode(point, nodes) {
  let best = null;
  for (const [id, node] of Object.entries(nodes)) {
    const d = Math.hypot(point.x - node.x, point.z - node.z);
    if (!best || d < best.d) best = { id, d };
  }
  return best?.id ?? null;
}
