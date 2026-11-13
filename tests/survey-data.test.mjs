import test from "node:test";
import assert from "node:assert/strict";
import {
  BUILDINGS,
  CAMPUS_GEOMETRY,
  NODES,
  EDGES,
  ENTRANCES,
  PLACES,
  MAIN_GATE,
  SURVEY,
  placeEntries,
  toEntranceMarkers,
} from "../src/data.mjs";
import { mergeSurvey } from "../src/survey.mjs";
import { toScene } from "../src/geo.mjs";
import { shortestPath } from "../src/routing.mjs";

test("markers use the survey IDs and coordinates without hardcoded candidate entries", () => {
  assert.deepEqual(ENTRANCES, toEntranceMarkers(SURVEY.entrances));
  for (const entrance of ENTRANCES) {
    const feature = SURVEY.data.features.find(
      (f) => f.properties.id === entrance.id,
    );
    assert.ok(feature);
    const point = toScene(feature.geometry.coordinates, CAMPUS_GEOMETRY.meta);
    assert.ok(Math.hypot(entrance.x - point.x, entrance.z - point.z) < 0.01);
    assert.equal(
      entrance.verification_status,
      feature.properties.verification_status,
    );
    assert.equal(NODES[entrance.id].building_id, entrance.buildingId);
    assert.ok(shortestPath(MAIN_GATE.entry, entrance.id));
  }
  assert.equal(BUILDINGS.find((b) => b.id === "way-382499369").name, "국제관");
});

test("places prefer surveyed entrance nodes over generated Door nodes", () => {
  for (const place of PLACES.filter((p) => p.id !== "gate")) {
    const surveyed = SURVEY.entrances
      .filter((e) => e.building_id === place.id)
      .map((e) => e.id);
    if (surveyed.length) assert.deepEqual(place.entries, surveyed);
    assert.equal(place.entry, place.entries[0]);
    assert.ok(place.entries.every((id) => NODES[id]));
  }
  const davinci = BUILDINGS.find((b) => b.id === "davinci");
  assert.deepEqual(placeEntries(davinci, []), [davinci.entry]);
});

test("survey merge preserves source graph and excludes rejected entries", () => {
  const base = { nodes: CAMPUS_GEOMETRY.nodes, edges: CAMPUS_GEOMETRY.edges };
  const before = JSON.stringify(base),
    data = structuredClone(SURVEY.data);
  const feature = structuredClone(
    data.features.find((f) => f.properties.feature_type === "entrance"),
  );
  feature.properties.id = "rejected-entrance";
  feature.properties.verification_status = "rejected";
  data.features.push(feature);
  const merged = mergeSurvey(base, data, {
    origin: CAMPUS_GEOMETRY.meta,
    buildings: BUILDINGS,
  });
  assert.equal(JSON.stringify(base), before);
  assert.equal(merged.nodes["rejected-entrance"], undefined);
  assert.deepEqual(merged.entrances, SURVEY.entrances);
});

test("only registered entrances of the same building form survey passages", () => {
  for (const edge of EDGES.filter((e) => e.type === "building_passage")) {
    const a = NODES[edge.a],
      b = NODES[edge.b];
    assert.equal(a.type, "entrance");
    assert.equal(b.type, "entrance");
    assert.ok(a.building_id);
    assert.equal(a.building_id, b.building_id);
    assert.ok(SURVEY.entrances.some((e) => e.id === edge.a));
    assert.ok(SURVEY.entrances.some((e) => e.id === edge.b));
  }
});
