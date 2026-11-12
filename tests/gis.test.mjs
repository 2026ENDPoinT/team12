import test from "node:test";
import assert from "node:assert/strict";
import { CAMPUS_GEOMETRY } from "../src/data.mjs";
import { SAMPLE_DOORS } from "./fixtures.mjs";

// 시험용 출입구(등록 출입구와 같은 모양)
const ENTRANCES = Object.entries(SAMPLE_DOORS).map(([id, d]) => ({ id, ...d }));
import { campusToGps, createCampusGeoJson, gisSummary } from "../src/gis.mjs";
import { gpsToCampus } from "../src/geo.mjs";

test("local campus meters round-trip through WGS84 coordinates", () => {
  const point = { x: 128.4, z: -91.7 },
    [longitude, latitude] = campusToGps(point, CAMPUS_GEOMETRY.meta),
    restored = gpsToCampus(latitude, longitude, CAMPUS_GEOMETRY.meta);
  assert.ok(Math.abs(restored.x - point.x) < 0.001);
  assert.ok(Math.abs(restored.z - point.z) < 0.001);
});

test("GIS export separates public candidates from team entrance candidates", () => {
  const geojson = createCampusGeoJson(CAMPUS_GEOMETRY, ENTRANCES),
    buildings = geojson.features.filter(
      ({ properties }) => properties.feature_type === "building",
    ),
    entrances = geojson.features.filter(
      ({ properties }) => properties.feature_type === "entrance",
    );

  assert.equal(geojson.type, "FeatureCollection");
  assert.equal(buildings.length, CAMPUS_GEOMETRY.buildings.length);
  assert.equal(entrances.length, ENTRANCES.length);
  assert.ok(
    buildings.every(
      ({ properties }) => properties.source_kind === "public_gis",
    ),
  );
  assert.ok(
    entrances.every(
      ({ properties }) => properties.source_kind === "team_input",
    ),
  );
  assert.ok(
    geojson.features.every(
      ({ properties }) => properties.verification_status === "candidate",
    ),
  );
});

test("GIS summary exposes the counts shown in the team prototype", () => {
  const summary = gisSummary(CAMPUS_GEOMETRY, ENTRANCES);
  assert.ok(summary.buildings > 0);
  assert.ok(summary.roads > 0);
  assert.ok(summary.stairs > 0);
  assert.equal(summary.routeNodes, Object.keys(CAMPUS_GEOMETRY.nodes).length);
  assert.equal(summary.routeEdges, CAMPUS_GEOMETRY.edges.length);
});
