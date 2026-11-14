// 출발지·도착지가 건물이면 출입구가 여러 개일 수 있습니다.
// 다익스트라(routing.mjs)는 그대로 두고, 출입구들을 거리 0으로 잇는 가상의 출발점·도착점을
// 하나씩 붙여 한 번만 계산합니다. 그러면 가장 가까운 문이 자동으로 골라집니다.
import { shortestPath } from "./routing.mjs";

const START = "__start__",
  GOAL = "__goal__";

// 미래관 출발은 현장에서 확인한 문을 모드별로 사용합니다.
const PREFERRED_START_ENTRANCE = {
  future: { shortest: "ent-future-2", stepfree: "ent-future-1" },
};

export function routeStartEntries(place, mode, nodes) {
  const preferred = PREFERRED_START_ENTRANCE[place.id]?.[mode];
  return preferred && nodes[preferred] ? [preferred] : place.entries;
}

/**
 * starts, targets: 노드 id 배열(하나여도 배열). 반환 형식은 shortestPath와 같고,
 * 실제로 쓴 문을 from(출발 노드), to(도착 노드)로 함께 돌려줍니다. 경로가 없으면 null.
 */
export function routeBetween(starts, targets, mode, nodes, edges) {
  const from = [...new Set(starts)].filter((id) => nodes[id]),
    to = [...new Set(targets)].filter((id) => nodes[id]);
  if (!from.length || !to.length) return null;

  if (from.length === 1 && to.length === 1) {
    const route = shortestPath(from[0], to[0], mode, nodes, edges);
    return route && { ...route, from: from[0], to: to[0] };
  }
  const shared = from.find((id) => to.includes(id));
  if (shared) {
    const route = shortestPath(shared, shared, mode, nodes, edges);
    return route && { ...route, from: shared, to: shared };
  }

  const link = (a, b) => ({ a, b, meters: 0, stairs: false }),
    route = shortestPath(
      START,
      GOAL,
      mode,
      {
        ...nodes,
        [START]: from.map((id) => nodes[id])[0],
        [GOAL]: nodes[to[0]],
      },
      [
        ...edges,
        ...from.map((id) => link(START, id)),
        ...to.map((id) => link(id, GOAL)),
      ],
    );
  if (!route) return null;
  const path = route.path.slice(1, -1);
  return { ...route, path, from: path[0], to: path.at(-1) };
}
