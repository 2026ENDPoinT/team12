import { NODES, EDGES } from "./data.mjs";

/**
 * [팀 알고리즘 교체 지점 — 시작]
 * TODO(팀 알고리즘): 아래는 화면 시연을 위해 임시로 작성한 Dijkstra 구현입니다.
 * 팀에서 만든 최단경로 알고리즘이나 서버 API 호출로 이 함수를 교체하면 됩니다.
 *
 * 입력: start/end 노드 ID, mode('shortest'|'stepfree'), nodes, edges.
 * 공사 신고 반영은 호출부(src/app.js)의 updateRoute에서 차단 edge를 제외해 전달합니다.
 * 출력: { path: 노드 ID 배열, meters: 총 거리, minutes: 예상 시간, stairs: 계단 포함 여부 }.
 * 연결된 경로가 없으면 null. 화면과 지도는 이 반환 형식만 사용합니다.
 * 현재 거리·계단·분당 70m 속도는 검증 전 시연값입니다.
 */
export function shortestPath(
  start,
  end = "futureDoor",
  mode = "shortest",
  nodes = NODES,
  edges = EDGES,
) {
  if (!nodes[start] || !nodes[end]) return null;

  const distance = Object.fromEntries(
    Object.keys(nodes).map((id) => [id, Infinity]),
  );
  const previous = {};
  // 각 노드에 실제로 들어온 간선(같은 두 노드 사이에 보행로와 계단이 함께 있을 수 있음)
  const previousEdge = {};
  const pending = new Set(Object.keys(nodes));
  distance[start] = 0;

  while (pending.size) {
    const current = [...pending].reduce((a, b) =>
      distance[a] < distance[b] ? a : b,
    );
    if (!Number.isFinite(distance[current])) break;
    pending.delete(current);
    if (current === end) break;

    for (const edge of edges) {
      if (mode === "stepfree" && edge.stairs) continue;
      const next =
        edge.a === current ? edge.b : edge.b === current ? edge.a : null;
      if (!next || !pending.has(next)) continue;
      const cost = distance[current] + edge.meters;
      if (cost < distance[next]) {
        distance[next] = cost;
        previous[next] = current;
        previousEdge[next] = edge;
      }
    }
  }

  if (!Number.isFinite(distance[end])) return null;
  const path = [end];
  while (path[0] !== start) {
    if (!previous[path[0]]) return null;
    path.unshift(previous[path[0]]);
  }
  return {
    path,
    meters: distance[end],
    minutes: Math.ceil(distance[end] / 70),
    // 실제로 지난 간선만 봄(같은 두 노드를 잇는 다른 계단 간선은 무시)
    stairs: path.slice(1).some((id) => Boolean(previousEdge[id]?.stairs)),
  };
}
// [팀 알고리즘 교체 지점 — 끝]
