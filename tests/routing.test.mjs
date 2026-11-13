import test from "node:test";
import assert from "node:assert/strict";
import {
  NODES,
  EDGES,
  STARTS,
  BUILDINGS,
  ENTRANCES,
  MAIN_GATE,
  SURVEY,
} from "../src/data.mjs";
import { shortestPath } from "../src/routing.mjs";
import { insideBuilding, projectToSegment } from "../src/geo.mjs";
function referenceDistance(start, mode) {
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
      ])
        if (dist[a] + e.meters < dist[b]) {
          dist[b] = dist[a] + e.meters;
          changed = true;
        }
    }
    if (!changed) break;
  }
  return dist.futureDoor;
}
test("all campus starts have a connected shortest route to future building", () => {
  for (const start of STARTS) {
    const result = shortestPath(start.entry);
    assert.ok(result, start.name);
    assert.equal(result.path[0], start.entry);
    assert.equal(result.path.at(-1), "futureDoor");
    assert.ok(
      Math.abs(result.meters - referenceDistance(start.entry, "shortest")) <
        0.001,
    );
    assert.equal(new Set(result.path).size, result.path.length);
  }
});
test("step-free mode excludes registered stairs or returns no route honestly", () => {
  for (const start of STARTS) {
    const result = shortestPath(start.entry, "futureDoor", "stepfree"),
      distance = referenceDistance(start.entry, "stepfree");
    if (!Number.isFinite(distance)) {
      assert.equal(result, null);
      continue;
    }
    assert.ok(result);
    assert.equal(result.stairs, false);
    assert.ok(Math.abs(result.meters - distance) < 0.001);
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
test("missing or disconnected nodes return no route; already there returns zero", () => {
  assert.equal(shortestPath("missing"), null);
  assert.equal(shortestPath("gate", "missing"), null);
  assert.equal(shortestPath("gate", "futureDoor", "shortest", NODES, []), null);
  assert.equal(shortestPath("futureDoor").meters, 0);
});
test("derived walking edges do not cut across building interiors", () => {
  for (const edge of EDGES.filter((edge) => edge.type !== "building_passage")) {
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
test("surveyed entrances stay on their matching building outline", () => {
  assert.equal(ENTRANCES.length, SURVEY.entrances.length);
  assert.ok(ENTRANCES.length > 0);
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
