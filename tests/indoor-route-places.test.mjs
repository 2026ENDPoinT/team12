import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createIndoor } from "../src/indoor/model.mjs";
import { createRoutePlaces } from "../src/indoor/route-places.mjs";
import { buildSteps } from "../src/indoor/guide.mjs";

const indoor = createIndoor(
  JSON.parse(readFileSync("data/mirae/mirae.json", "utf8")),
);
const entrances = JSON.parse(
  readFileSync("data/mirae/entrances.json", "utf8"),
).entrances;
const places = createRoutePlaces(indoor, entrances);

test("route fields search both rooms and the existing entrance choices", () => {
  assert.equal(places.search("１０８호").places[0].key, "1:108");
  const entrance = entrances.find((e) => /정문/.test(e.name));
  assert.ok(
    places
      .search("정문")
      .places.some((p) => p.key === `entrance:${entrance.id}`),
  );
  const defaults = places.search("", { floor: 3 }).places;
  assert.ok(defaults.some((p) => p.kind === "entrance"));
  assert.ok(
    defaults.filter((p) => p.kind !== "entrance").every((p) => p.f === 3),
  );
});

test("mistyped route field searches preserve current-floor restroom recommendations", () => {
  const result = places.search("화장싯", { floor: 3 });
  assert.equal(result.suggested, true);
  assert.equal(result.places[0].cat, "toilet");
  assert.equal(result.places[0].f, 3);
});

test("swapped entrance endpoints have a shareable key and a reachable arrival point", () => {
  const entrance = entrances[0];
  const destination = places.forStart({ kind: "entrance", id: entrance.id });
  assert.equal(places.resolve(destination.key), destination);
  const room = indoor.findDest("3:313");
  const p = indoor.nearest(room.f, ...room.doors[0], 6) || room.doors[0];
  const route = indoor.routeTo({ f: room.f, x: p[0], y: p[1] }, destination);
  assert.ok(route);
  assert.equal(route.pts.at(-1).f, entrance.f);
  assert.ok(
    Math.hypot(
      route.pts.at(-1).x - entrance.p[0],
      route.pts.at(-1).y - entrance.p[1],
    ) < 3,
  );
  assert.ok(buildSteps(route, destination).at(-1).text.includes(entrance.name));
  assert.equal(places.forStart(null), null);
});
