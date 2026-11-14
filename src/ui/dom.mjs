// 화면(DOM) 공통 도우미. src/app.js와 기능별 파일(src/ui/*)이 함께 씁니다.
export const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);
// 데스크톱 왼쪽 사이드바의 버튼을 이름(data-side)으로 찾습니다.
export const side = (name) => $(`[data-side="${name}"]`);
// 사용자 입력(기타 사유 글)이 들어가므로 innerHTML 대신 textContent만 씁니다.
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
