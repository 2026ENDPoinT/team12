import { crossesBuilding } from "../campus/survey.mjs";

export function shortcutNodes(edges) {
  return new Set(edges.filter((edge) =>
    !["entrance", "building_passage"].includes(edge.type)
  ).flatMap(({ a, b }) => [a, b]));
}

export function shortcutEdge(row, graph, buildings, eligible = shortcutNodes(graph.edges)) {
  if (!eligible.has(row.node_a) || !eligible.has(row.node_b)) return null;
  const a = graph.nodes[row.node_a];
  const b = graph.nodes[row.node_b];
  if (!a || !b || row.node_a === row.node_b) return null;
  const meters = Math.hypot(a.x - b.x, a.z - b.z);
  if (meters < 1 || meters > 250 || crossesBuilding(a, b, buildings)) return null;
  return {
    a: row.node_a,
    b: row.node_b,
    meters,
    stairs: row.has_stairs,
    name: "지름길",
    type: row.has_stairs ? "stairs" : "sidewalk",
  };
}

export function withApprovedShortcuts(graph, rows, buildings) {
  if (!rows.some((row) => row.status === "approved")) return graph.edges;
  const eligible = shortcutNodes(graph.edges);
  const edges = [...graph.edges];
  for (const row of rows) {
    if (row.status !== "approved") continue;
    const edge = shortcutEdge(row, graph, buildings, eligible);
    if (!edge || edges.some(({ a, b }) =>
      (a === edge.a && b === edge.b) || (a === edge.b && b === edge.a)
    )) continue;
    edges.push(edge);
  }
  return edges;
}
