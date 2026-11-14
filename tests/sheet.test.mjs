import test from "node:test";
import assert from "node:assert/strict";
import { draggedSheetHeight, shouldCollapseSheet } from "../src/ui/sheet.mjs";

test("sheet follows the pointer at mobile zoom and stays between snap points", () => {
  assert.equal(draggedSheetHeight(400, 90, .9, 100, 400), 300);
  assert.equal(draggedSheetHeight(100, -90, .9, 100, 400), 200);
  assert.equal(draggedSheetHeight(400, -90, .9, 100, 400), 400);
  assert.equal(draggedSheetHeight(100, 90, .9, 100, 400), 100);
});

test("sheet settles by midpoint for slow drags and by direction for flicks", () => {
  assert.equal(shouldCollapseSheet(240, 0, 100, 400), true);
  assert.equal(shouldCollapseSheet(260, 0, 100, 400), false);
  assert.equal(shouldCollapseSheet(350, .6, 100, 400), true);
  assert.equal(shouldCollapseSheet(150, -.6, 100, 400), false);
});
