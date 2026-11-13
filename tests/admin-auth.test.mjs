import test from "node:test";
import assert from "node:assert/strict";
import {
  AUTH_OPTIONS,
  AUTH_STORAGE_KEY,
  authStorage,
  isAdminUser,
} from "../src/backend.mjs";

test("관리자 권한은 사용자가 수정할 수 없는 app_metadata만 신뢰한다", () => {
  assert.equal(isAdminUser({ app_metadata: { role: "admin" } }), true);
  assert.equal(isAdminUser({ user_metadata: { role: "admin" } }), false);
  assert.equal(isAdminUser({ app_metadata: { role: "student" } }), false);
  assert.equal(isAdminUser(null), false);
});

// sessionStorage 흉내: 탭 하나의 저장소
function fakeTabStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
  };
}

test("관리자 로그인은 편집기 열기·닫기(페이지 이동)에는 유지되고 새로고침하면 풀린다", () => {
  const tab = fakeTabStorage();
  tab.setItem(AUTH_STORAGE_KEY, '{"access_token":"x"}');
  // 편집기 열기·닫기는 location.assign → 새 페이지 열기("navigate")
  assert.equal(authStorage({ storage: tab, type: "navigate" }), tab);
  assert.equal(tab.getItem(AUTH_STORAGE_KEY), '{"access_token":"x"}');
  // 뒤로 가기로 돌아와도 유지
  authStorage({ storage: tab, type: "back_forward" });
  assert.notEqual(tab.getItem(AUTH_STORAGE_KEY), null);
  // 새로고침이면 지워서 다시 로그인하게 함
  authStorage({ storage: tab, type: "reload" });
  assert.equal(tab.getItem(AUTH_STORAGE_KEY), null);
});

test("세션 저장소가 없는 환경(테스트·사생활 보호 모드)은 저장하지 않는다", () => {
  assert.equal(authStorage({ storage: undefined }), undefined);
  // node 테스트에는 sessionStorage가 없으므로 저장하지 않는 설정이 됩니다.
  assert.equal(AUTH_OPTIONS.auth.persistSession, false);
});
