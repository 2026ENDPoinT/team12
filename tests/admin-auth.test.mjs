import test from "node:test";
import assert from "node:assert/strict";
import { AUTH_OPTIONS, isAdminUser } from "../src/backend.mjs";

test("관리자 권한은 사용자가 수정할 수 없는 app_metadata만 신뢰한다", () => {
  assert.equal(isAdminUser({ app_metadata: { role: "admin" } }), true);
  assert.equal(isAdminUser({ user_metadata: { role: "admin" } }), false);
  assert.equal(isAdminUser({ app_metadata: { role: "student" } }), false);
  assert.equal(isAdminUser(null), false);
});

test("관리자 로그인은 새로고침 뒤 복원하지 않는다", () => {
  assert.equal(AUTH_OPTIONS.auth.persistSession, false);
});
