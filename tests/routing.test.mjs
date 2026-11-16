import test from "node:test";
import assert from "node:assert/strict";
import {
  NODES,
  EDGES,
  STARTS,
  BUILDINGS,
  ENTRANCES,
  MAIN_GATE,
} from "../src/campus/data.mjs";
import { shortestPath } from "../src/navigation/routing.mjs";
import { walkLeg, STEEP_SLOPE } from "../src/campus/terrain.mjs";
import { insideBuilding, projectToSegment } from "../src/campus/geo.mjs";
// 경로 비용: 지형을 반영한 걷는 시간(분). 계단 피하기는 8% 초과 경사에 벌점 6배(routing.mjs와 같은 규칙).
function legCost(e, from, to, mode) {
  const leg = walkLeg(e.meters, NODES[from].y, NODES[to].y);
  return leg.minutes * (mode === "stepfree" && Math.abs(leg.slope) > STEEP_SLOPE ? 6 : 1);
}
// 독립 구현(벨만-포드)으로 구한 futureDoor까지의 최소 비용
function referenceCost(start, mode) {
  const dist = Object.fromEntries(
    Object.keys(NODES).map((id) => [id, Infinity]),
  );
  dist[start] = 0;
  for (let k = 0; k < Object.keys(NODES).length - 1; k++) {
    let changed = false;
    for (const e of EDGES) {
      if (mode === "stepfree" && e.stairs) continue;
      for (const [a, b] of [
        [e.a, e.b],
        [e.b, e.a],
      ]) {
        const cost = dist[a] + legCost(e, a, b, mode);
        if (cost < dist[b] - 1e-12) {
          dist[b] = cost;
          changed = true;
        }
      }
    }
    if (!changed) break;
  }
  return dist.futureDoor;
}
// 찾은 경로를 따라 같은 규칙으로 비용을 다시 셈(두 노드 사이 간선이 여럿이면 가장 싼 것)
function pathCost(path, mode) {
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]];
    total += Math.min(
      ...EDGES.filter(
        (e) =>
          ((e.a === a && e.b === b) || (e.a === b && e.b === a)) &&
          !(mode === "stepfree" && e.stairs),
      ).map((e) => legCost(e, a, b, mode)),
    );
  }
  return total;
}
test("all campus starts have a connected shortest route to future building", () => {
  for (const start of STARTS) {
    const result = shortestPath(start.entry);
    assert.ok(result, start.name);
    assert.equal(result.path[0], start.entry);
    assert.equal(result.path.at(-1), "futureDoor");
    assert.ok(
      Math.abs(
        pathCost(result.path, "shortest") -
          referenceCost(start.entry, "shortest"),
      ) < 1e-6,
    );
    assert.equal(new Set(result.path).size, result.path.length);
  }
});
test("step-free mode excludes registered stairs or returns no route honestly", () => {
  for (const start of STARTS) {
    const result = shortestPath(start.entry, "futureDoor", "stepfree"),
      distance = referenceCost(start.entry, "stepfree");
    if (!Number.isFinite(distance)) {
      assert.equal(result, null);
      continue;
    }
    assert.ok(result);
    assert.equal(result.stairs, false);
    assert.ok(Math.abs(pathCost(result.path, "stepfree") - distance) < 1e-6);
  }
});
test("step-free routing chooses longer non-stair alternative on a controlled graph", () => {
  const nodes = { a: {}, b: {}, c: {} },
    edges = [
      { a: "a", b: "c", meters: 1, stairs: true },
      { a: "a", b: "b", meters: 2 },
      { a: "b", b: "c", meters: 2 },
    ];
  assert.equal(shortestPath("a", "c", "shortest", nodes, edges).meters, 1);
  assert.equal(shortestPath("a", "c", "stepfree", nodes, edges).meters, 4);
});
test("stairs flag follows the edge actually taken when a walkway and stairs join the same nodes", () => {
  const nodes = { a: {}, b: {} },
    edges = [
      { a: "a", b: "b", meters: 5, stairs: true },
      { a: "a", b: "b", meters: 9 },
    ];
  const free = shortestPath("a", "b", "stepfree", nodes, edges);
  assert.equal(free.meters, 9);
  assert.equal(free.stairs, false);
  const fast = shortestPath("a", "b", "shortest", nodes, edges);
  assert.equal(fast.meters, 5);
  assert.equal(fast.stairs, true);
});
test("missing or disconnected nodes return no route; already there returns zero", () => {
  assert.equal(shortestPath("missing"), null);
  assert.equal(shortestPath("gate", "missing"), null);
  assert.equal(shortestPath("gate", "futureDoor", "shortest", NODES, []), null);
  assert.equal(shortestPath("futureDoor").meters, 0);
});
test("derived walking edges do not cut across building interiors", () => {
  // 건물을 가로지를 수 있는 간선은 팀이 조사한 건물 관통(building_passage)과
  // 팀이 현장에서 확인해 그린 계단·인도(예: 100주년기념관 아래 계단, 건물을 뚫고 지나가는 통로)뿐입니다.
  // docs/decisions.md 참고.
  const surveyed = ({ type, source_kind }) =>
    type === "building_passage" ||
    ((type === "stairs" || type === "sidewalk") &&
      source_kind === "team_input");
  for (const edge of EDGES.filter((edge) => !surveyed(edge))) {
    const a = NODES[edge.a],
      b = NODES[edge.b];
    for (const t of [0.2, 0.5, 0.8]) {
      const point = { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t };
      for (const building of BUILDINGS) {
        if (!insideBuilding(point, building)) continue;
        const rings = [building.outline, ...building.holes];
        const distance = Math.min(
          ...rings.flatMap((ring) =>
            ring.map(
              ([x, z], i) =>
                projectToSegment(
                  point,
                  { x, z },
                  {
                    x: ring[(i + 1) % ring.length][0],
                    z: ring[(i + 1) % ring.length][1],
                  },
                ).distance,
            ),
          ),
        );
        assert.ok(
          distance < 0.7,
          `${edge.a} -> ${edge.b} crosses ${building.name}`,
        );
      }
    }
  }
});
test("registered entrances stay on their matching building outline", () => {
  // 등록 출입구(team-survey.json)는 편집기가 벽 위로 붙여 저장합니다. 위경도 저장 반올림을 감안해 0.05m.
  for (const entrance of ENTRANCES) {
    const building = BUILDINGS.find(({ id }) => id === entrance.buildingId);
    assert.ok(building, entrance.name);
    const distance = Math.min(
      ...[building.outline, ...building.holes].flatMap((ring) =>
        ring.map(
          ([x, z], index) =>
            projectToSegment(
              entrance,
              { x, z },
              {
                x: ring[(index + 1) % ring.length][0],
                z: ring[(index + 1) % ring.length][1],
              },
            ).distance,
        ),
      ),
    );
    assert.ok(distance < 0.05, `${entrance.name}: ${distance}`);
  }
  assert.ok(NODES[MAIN_GATE.entry]);
});
