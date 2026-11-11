// 편집 모드(주소에 ?edit=1)에서만 동작합니다. 일반 화면에는 아무것도 추가하지 않습니다.
// - 보행 그래프 디버그 오버레이 토글과 범례 (앱 본체에 포함, 수 KB)
// - 편집기(editor.js)는 별도 파일로 빌드되어 이때만 불러옵니다. 편집기는 window.__saiEditor로
//   지도·데이터·경로 계산 함수를 넘겨받으므로, 지도 엔진과 캠퍼스 데이터를 다시 내려받지 않습니다.
import { OVERLAY_STYLES } from "./graph-overlay.js";

export const EDIT_MODE = new URLSearchParams(location.search).has("edit");

const hex = (n) => `#${n.toString(16).padStart(6, "0")}`;

export function setupEditMode(ctx) {
  if (!EDIT_MODE || !ctx.map) return;
  const { map } = ctx,
    controls = document.querySelector(".map-controls");
  if (!controls) return;
  let overlayOn = false,
    warnings = ctx.survey.warnings,
    entranceCount = ctx.survey.entrances.length;

  const toggle = document.createElement("button");
  toggle.id = "graph-overlay-toggle";
  toggle.textContent = "▦";
  toggle.setAttribute("aria-label", "보행 그래프 보기");
  toggle.setAttribute("aria-pressed", "false");
  toggle.title = "보행 그래프 보기 (편집 모드)";
  controls.append(toggle);

  const panel = document.createElement("section");
  panel.id = "graph-overlay-panel";
  panel.hidden = true;
  panel.setAttribute("aria-label", "보행 그래프 범례");
  panel.style.cssText =
    "position:absolute;left:12px;top:12px;z-index:30;max-width:240px;" +
    "background:rgba(255,255,255,.94);color:#1f2430;border:1px solid #d9dbe3;" +
    "border-radius:10px;padding:10px 12px;font:12px/1.5 system-ui,sans-serif;" +
    "box-shadow:0 4px 14px rgba(20,20,40,.12)";
  controls.parentElement.append(panel);

  function render(result) {
    const graph = ctx.getGraph(),
      rows = Object.values(OVERLAY_STYLES)
        .map(
          ({ color, label }) =>
            `<div><i style="display:inline-block;width:16px;height:3px;margin-right:6px;vertical-align:middle;background:${hex(color)}"></i>${label}</div>`,
        )
        .join(""),
      list = warnings
        .map(
          (w) => `<li><b>${escapeHtml(w.id)}</b> ${escapeHtml(w.message)}</li>`,
        )
        .join("");
    panel.innerHTML =
      `<b style="font-size:13px">보행 그래프</b>` +
      `<div style="color:#5b6170;margin:2px 0 6px">노드 ${Object.keys(graph.nodes).length.toLocaleString("ko-KR")} · 간선 ${graph.edges.length.toLocaleString("ko-KR")}</div>` +
      rows +
      `<div><i style="display:inline-block;width:8px;height:8px;border-radius:50%;margin:0 10px 0 4px;background:#e03131"></i>끊긴 길 끝 ${result.deadEnds.length}곳</div>` +
      `<div style="margin-top:6px;color:#5b6170">팀 조사 ${entranceCount ? `출입구 ${entranceCount}개` : "출입구 없음"}` +
      (list
        ? ` · 경고 ${warnings.length}건</div><ul style="margin:4px 0 0;padding-left:16px;color:#c92a2a">${list}</ul>`
        : "</div>");
  }
  function setOverlay(on) {
    overlayOn = on;
    toggle.setAttribute("aria-pressed", String(on));
    panel.hidden = !on;
    const result = map.setGraphOverlay(on ? ctx.getGraph() : null);
    if (on) render(result);
  }
  toggle.onclick = () => setOverlay(!overlayOn);

  // 편집기에 넘기는 통로입니다.
  window.__saiEditor = {
    map,
    geometry: ctx.geometry,
    buildings: ctx.buildings,
    survey: ctx.survey.data,
    getGraph: ctx.getGraph,
    routeOn: ctx.routeOn,
    setOverlay,
    // merged: mergeSurvey 결과({ nodes, edges, entrances, warnings })
    applyGraph(merged) {
      warnings = merged.warnings;
      entranceCount = merged.entrances.length;
      ctx.applyGraph(merged);
      if (overlayOn) setOverlay(true);
    },
  };
  const script = document.createElement("script");
  // 편집기는 자주 바뀌고 편집 모드에서만 받으므로, 브라우저 캐시 대신 항상 최신 파일을 받습니다.
  script.src = `editor.js?t=${Date.now()}`;
  script.onerror = () =>
    console.warn("editor.js를 불러오지 못했습니다. npm run dev 또는 npm run build로 만들어 주세요.");
  document.body.append(script);
}

function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}
