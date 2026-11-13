import test from "node:test";
import assert from "node:assert/strict";
import { attachGps, GPS_ATTACH_M } from "../src/gps-start.mjs";
import { shortestPath } from "../src/routing.mjs";
import { NODES, EDGES, BUILDINGS } from "../src/data.mjs";
import { insideBuilding } from "../src/geo.mjs";

// 시험용 사각형 길: A(0,0)─B(100,0) 아래쪽, C(0,40)─D(100,40) 위쪽, 양옆 세로 길.
const box = (x0, z0, x1, z1) => ({
    id: "box",
    name: "시험 건물",
    outline: [
      [x0, z0],
      [x1, z0],
      [x1, z1],
      [x0, z1],
    ],
    holes: [],
  }),
  square = () => ({
    nodes: {
      A: { x: 0, z: 0 },
      B: { x: 100, z: 0 },
      C: { x: 0, z: 40 },
      D: { x: 100, z: 40 },
    },
    edges: [
      { a: "A", b: "B", meters: 100, stairs: false },
      { a: "C", b: "D", meters: 100, stairs: false },
      { a: "A", b: "C", meters: 40, stairs: false },
      { a: "B", b: "D", meters: 40, stairs: false },
    ],
  });

test("GPS in the middle of a long path starts on the path, not at the nearest node", () => {
  const graph = square(),
    at = attachGps({ x: 20, z: 3 }, graph);
  assert.equal(at.kind, "edge");
  assert.deepEqual(
    { x: at.graph.nodes[at.nodeId].x, z: at.graph.nodes[at.nodeId].z },
    { x: 20, z: 0 },
  );
  const route = shortestPath(at.nodeId, "B", "shortest", at.graph.nodes, at.graph.edges);
  // 예전 방식은 가장 가까운 A로 가서 B까지 100m(뒤로 20m 갔다가 되돌아옴).
  assert.equal(route.meters, 80);
  assert.ok(!route.path.includes("A"));
});

test("a path behind a building is skipped for the next one", () => {
  const graph = square(),
    buildings = [box(10, 5, 30, 15)],
    // 아래 길(18m)이 가장 가깝지만 그 사이에 건물이 있어서 건너뛰고,
    // 다음으로 가까운 왼쪽 세로 길(20m, 위 길은 22m)에 붙어야 합니다.
    at = attachGps({ x: 20, z: 18 }, graph, { buildings });
  assert.equal(at.kind, "edge");
  assert.deepEqual(
    { x: at.graph.nodes[at.nodeId].x, z: at.graph.nodes[at.nodeId].z },
    { x: 0, z: 18 },
  );
});

test("GPS inside a building reports that building", () => {
  const building = box(10, 5, 30, 15),
    at = attachGps({ x: 20, z: 10 }, square(), { buildings: [building] });
  assert.equal(at.kind, "building");
  assert.equal(at.building, building);
});

test(`no path within ${GPS_ATTACH_M}m falls back to the nearest node`, () => {
  const at = attachGps({ x: 90, z: 200 }, square());
  assert.equal(at.kind, "node");
  assert.equal(at.nodeId, "D");
});

test("a point at a path end reuses that node instead of splitting", () => {
  const graph = square(),
    at = attachGps({ x: 100.3, z: -0.5 }, graph);
  assert.equal(at.kind, "edge");
  assert.equal(at.nodeId, "B");
  assert.equal(at.graph.edges.length, graph.edges.length);
});

test("the split keeps the path's stairs flag and leaves the input graph untouched", () => {
  const graph = square();
  graph.edges[0].stairs = true;
  const at = attachGps({ x: 50, z: 1 }, graph);
  assert.equal(Object.keys(graph.nodes).length, 4);
  assert.equal(graph.edges.length, 4);
  const halves = at.graph.edges.filter(
    (e) => e.a === at.nodeId || e.b === at.nodeId,
  );
  assert.equal(halves.length, 2);
  assert.ok(halves.every((e) => e.stairs));
  assert.equal(
    halves.reduce((sum, e) => sum + e.meters, 0),
    100,
  );
});

test("on the campus graph, a point mid-way on a long path routes forward along it", () => {
  const edge = [...EDGES]
      .filter((e) => e.meters > 60)
      .find((e) => {
        const a = NODES[e.a],
          b = NODES[e.b],
          p = { x: a.x + (b.x - a.x) * 0.3, z: a.z + (b.z - a.z) * 0.3 };
        return !BUILDINGS.some((building) => insideBuilding(p, building));
      }),
    a = NODES[edge.a],
    b = NODES[edge.b],
    point = { x: a.x + (b.x - a.x) * 0.3, z: a.z + (b.z - a.z) * 0.3 },
    at = attachGps(point, { nodes: NODES, edges: EDGES }, { buildings: BUILDINGS });
  assert.equal(at.kind, "edge");
  const route = shortestPath(at.nodeId, edge.b, "shortest", at.graph.nodes, at.graph.edges);
  assert.ok(route.meters <= edge.meters * 0.7 + 0.1);
});
