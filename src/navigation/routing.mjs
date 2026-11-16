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

  // 노드별로 붙은 간선 목록(인접 목록)과 이진 힙을 씁니다. 큰 캠퍼스(노드 수천 개)에서도
  // 경로 한 번이 수 밀리초 안에 끝납니다. 비용 규칙은 아래 relax와 같습니다.
  const adjacent = new Map();
  for (const edge of edges) {
    if (mode === "stepfree" && edge.stairs) continue;
    if (!nodes[edge.a] || !nodes[edge.b]) continue;
    for (const id of [edge.a, edge.b]) {
      if (!adjacent.has(id)) adjacent.set(id, []);
      adjacent.get(id).push(edge);
    }
  }
  const distance = new Map([[start, 0]]);
  const previous = {};
  // 각 노드에 실제로 들어온 간선(같은 두 노드 사이에 보행로와 계단이 함께 있을 수 있음)
  const previousEdge = {};
  const done = new Set();
  const heap = [[0, start]];
  const push = (item) => {
    heap.push(item);
    for (let i = heap.length - 1; i > 0; ) {
      const parent = (i - 1) >> 1;
      if (heap[parent][0] <= heap[i][0]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  };
  const pop = () => {
    const top = heap[0],
      last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      for (let i = 0; ; ) {
        const l = i * 2 + 1,
          r = l + 1;
        let m = i;
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };

  while (heap.length) {
    const [cost, current] = pop();
    if (done.has(current) || cost > distance.get(current)) continue;
    done.add(current);
    if (current === end) break;

    for (const edge of adjacent.get(current) || []) {
      const next = edge.a === current ? edge.b : edge.a;
      if (done.has(next)) continue;
      const leg = walkLeg(edge.meters, heightOf(nodes[current]), heightOf(nodes[next]));
      const steep =
        mode === "stepfree" && Math.abs(leg.slope) > STEEP_SLOPE;
      const total = cost + leg.minutes * (steep ? STEEP_PENALTY : 1);
      if (total < (distance.get(next) ?? Infinity)) {
        distance.set(next, total);
        previous[next] = current;
        previousEdge[next] = edge;
        push([total, next]);
      }
    }
  }

  if (!done.has(end)) return null;
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
