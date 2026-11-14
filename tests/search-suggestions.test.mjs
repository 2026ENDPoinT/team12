import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PLACES } from "../src/campus/data.mjs";
import { createIndoor } from "../src/indoor/model.mjs";
import { suggestMatches } from "../src/ui/search-suggestions.mjs";

test("suggests campus buildings for Hangul typos and ignores unrelated input", () => {
  const suggest = (query) => suggestMatches(query, PLACES, (place) => [place.name]);
  assert.equal(suggest("미래괸")[0]?.name, "미래관");
  assert.equal(suggest("중앙도서굔")[0]?.name, "중앙도서관");
  assert.deepEqual(suggest("zzzzzz"), []);
});

test("suggests indoor destinations for a mistyped name or transposed room number", () => {
  const indoor = createIndoor(JSON.parse(readFileSync("data/mirae/mirae.json", "utf8")));
  assert.ok(indoor.suggest("네트웍크").some((room) => room.id === "320"));
  assert.ok(suggestMatches("132", ["123", "777"], (room) => [room]).includes("123"));
  assert.deepEqual(indoor.suggest("99"), []);
});
