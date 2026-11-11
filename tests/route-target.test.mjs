import test from "node:test";
import assert from "node:assert/strict";
import {
  CAMPUS_GEOMETRY,
  BUILDINGS,
  MAIN_GATE,
  NODES,
  EDGES,
  PLACES,
  placeEntries,
} from "../src/data.mjs";
import { mergeSurvey } from "../src/survey.mjs";
import { routeBetween } from "../src/route-target.mjs";
import { shortestPath } from "../src/routing.mjs";
import { toLngLat } from "../src/geo.mjs";
import { SAMPLE_DOORS } from "./fixtures.mjs";

const origin = CAMPUS_GEOMETRY.meta;
// 미래관 출입구 후보 3곳(서측, 북동측, 동측)을 조사 데이터로 넣은 그래프
const futureCandidates = [
    SAMPLE_DOORS.futureWest,
    SAMPLE_DOORS.futureNorthEast,
    SAMPLE_DOORS.futureEast,
  ],
  surveyed = mergeSurvey(
    CAMPUS_GEOMETRY,
    {
      type: "FeatureCollection",
      features: futureCandidates.map((e, i) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: toLngLat(e, origin) },
        properties: {
          id: `future-${i}`,
          feature_type: "entrance",
          building_id: "future",
          name: e.name,
          source_kind: "team_input",
          verification_status: "verified",
        },
      })),
    },
    { origin, buildings: BUILDINGS },
  ),
  future = BUILDINGS.find(({ id }) => id === "future"),
  doors = placeEntries(future, surveyed.entrances);

test("surveyed entrances replace the generated door for that building", () => {
  assert.deepEqual(doors, ["future-0", "future-1", "future-2"]);
  assert.deepEqual(placeEntries(future, []), ["futureDoor"]);
});

test("the route picks the entrance closest to the start", () => {
  const route = routeBetween(
      [MAIN_GATE.entry],
      doors,
      "shortest",
      surveyed.nodes,
      surveyed.edges,
    ),
    each = doors.map(
      (door) =>
        shortestPath(
          MAIN_GATE.entry,
          door,
          "shortest",
          surveyed.nodes,
          surveyed.edges,
        ).meters,
    );
  assert.ok(doors.includes(route.to));
  assert.equal(route.meters, Math.min(...each));
  assert.equal(route.path[0], MAIN_GATE.entry);
  assert.equal(route.path.at(-1), route.to);
  assert.ok(!route.path.some((id) => id.startsWith("__")));
});

test("several start doors work the same way in reverse", () => {
  const forward = routeBetween(
      [MAIN_GATE.entry],
      doors,
      "shortest",
      surveyed.nodes,
      surveyed.edges,
    ),
    backward = routeBetween(
      doors,
      [MAIN_GATE.entry],
      "shortest",
      surveyed.nodes,
      surveyed.edges,
    );
  assert.ok(Math.abs(backward.meters - forward.meters) < 1e-6);
  assert.equal(backward.from, forward.to);
});

test("one start and one target behave exactly like shortestPath", () => {
  const plain = shortestPath(MAIN_GATE.entry, "futureDoor", "shortest", NODES, EDGES),
    wrapped = routeBetween([MAIN_GATE.entry], ["futureDoor"], "shortest", NODES, EDGES);
  assert.deepEqual(wrapped.path, plain.path);
  assert.equal(wrapped.meters, plain.meters);
});

test("no usable nodes or a shared door give null or a zero route", () => {
  assert.equal(routeBetween([], ["futureDoor"], "shortest", NODES, CAMPUS_GEOMETRY.edges), null);
  assert.equal(routeBetween(["missing"], ["futureDoor"], "shortest", NODES, CAMPUS_GEOMETRY.edges), null);
  const zero = routeBetween(["gate", "futureDoor"], ["futureDoor"], "shortest", NODES, CAMPUS_GEOMETRY.edges);
  assert.equal(zero.meters, 0);
});

test("every place offers at least one existing entrance node", () => {
  for (const place of PLACES) {
    assert.ok(place.entries.length > 0, place.name);
    assert.ok(place.entries.every((id) => NODES[id]), place.name);
    assert.equal(place.entry, place.entries[0]);
  }
});
