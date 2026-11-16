import { NODES, EDGES } from "../campus/data.mjs";
import { walkLeg, STEEP_SLOPE } from "../campus/terrain.mjs";

// "계단 피하기"에서 8%보다 가파른 구간에 곱하는 벌점. 다른 길이 있으면 피하고,
// 다른 길이 없으면(산지 캠퍼스) 지나가되 결과에 steep: true로 알립니다.
const STEEP_PENALTY = 6;
// 노드 높이(y). 높이가 없는 노드(평지 데이터·시험용 그래프)가 낀 간선은 평지로 봅니다.
const heightOf = (node) => (Number.isFinite(node?.y) ? node.y : null);

/**
 * [팀 알고리즘 교체 지점 — 시작]
 * TODO(팀 알고리즘): 아래는 화면 시연을 위해 임시로 작성한 Dijkstra 구현입니다.
 * 팀에서 만든 최단경로 알고리즘이나 서버 API 호출로 이 함수를 교체하면 됩니다.
 *
 * 입력: start/end 노드 ID, mode('shortest'|'stepfree'), nodes, edges.
 * 공사 신고 반영은 호출부(src/app.js)의 updateRoute에서 차단 edge를 제외해 전달합니다.
 * 출력: { path: 노드 ID 배열, meters: 총 거리(경사 포함), minutes: 예상 시간,
 *        stairs: 계단 포함 여부, steep: 8% 초과 경사 포함 여부, climb: 오르막 합계(m) }.
 * 연결된 경로가 없으면 null. 화면과 지도는 이 반환 형식만 사용합니다.
 * 노드에 지면 높이(y)가 있으면 오르막·내리막을 반영한 소요 시간이 가장 짧은 길을 고릅니다
 * (평지에서는 거리 최단과 같음). 거리·계단·분당 70m 속도는 검증 전 시연값입니다.
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
      const leg = walkLeg(edge.meters, heightOf(nodes[current]), heightOf(nodes[next]));
      const steep =
        mode === "stepfree" && Math.abs(leg.slope) > STEEP_SLOPE;
      const cost = distance[current] + leg.minutes * (steep ? STEEP_PENALTY : 1);
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
  let meters = 0,
    minutes = 0,
    climb = 0,
    steep = false;
  for (let i = 1; i < path.length; i++) {
    const from = nodes[path[i - 1]],
      to = nodes[path[i]],
      leg = walkLeg(previousEdge[path[i]].meters, heightOf(from), heightOf(to));
    meters += leg.meters;
    minutes += leg.minutes;
    if (heightOf(to) !== null && heightOf(from) !== null)
      climb += Math.max(0, heightOf(to) - heightOf(from));
    steep ||= Math.abs(leg.slope) > STEEP_SLOPE && leg.meters > 3;
  }
  return {
    path,
    meters,
    minutes: Math.ceil(minutes - 1e-9),
    // 실제로 지난 간선만 봄(같은 두 노드를 잇는 다른 계단 간선은 무시)
    stairs: path.slice(1).some((id) => Boolean(previousEdge[id]?.stairs)),
    steep,
    climb,
  };
}
// [팀 알고리즘 교체 지점 — 끝]
