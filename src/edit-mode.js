// 편집 모드(주소에 ?edit=1)에서만 동작하는 도구입니다. 일반 화면에는 아무것도 추가하지 않습니다.
// 지금은 보행 그래프 디버그 오버레이 토글과 범례만 있고, 편집 도구는 이 위에 붙습니다.
import { OVERLAY_STYLES } from "./graph-overlay.js";

export const EDIT_MODE = new URLSearchParams(location.search).has("edit");

const hex = (n) => `#${n.toString(16).padStart(6, "0")}`;

export function setupEditMode({ map, graph, survey }) {
  if (!EDIT_MODE || !map) return;
  const controls = document.querySelector(".map-controls");
  if (!controls) return;

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
    const nodeCount = Object.keys(graph.nodes).length,
      rows = Object.values(OVERLAY_STYLES)
        .map(
          ({ color, label }) =>
            `<div><i style="display:inline-block;width:16px;height:3px;margin-right:6px;vertical-align:middle;background:${hex(color)}"></i>${label}</div>`,
        )
        .join(""),
      warnings = survey.warnings
        .map((w) => `<li><b>${escapeHtml(w.id)}</b> ${escapeHtml(w.message)}</li>`)
        .join("");
    panel.innerHTML =
      `<b style="font-size:13px">보행 그래프</b>` +
      `<div style="color:#5b6170;margin:2px 0 6px">노드 ${nodeCount.toLocaleString("ko-KR")} · 간선 ${graph.edges.length.toLocaleString("ko-KR")}</div>` +
      rows +
      `<div><i style="display:inline-block;width:8px;height:8px;border-radius:50%;margin:0 10px 0 4px;background:#e03131"></i>끊긴 길 끝 ${result.deadEnds.length}곳</div>` +
      `<div style="margin-top:6px;color:#5b6170">팀 조사 ${survey.entrances.length ? `출입구 ${survey.entrances.length}개` : "데이터 없음"}` +
      (warnings
        ? ` · 경고 ${survey.warnings.length}건</div><ul style="margin:4px 0 0;padding-left:16px;color:#c92a2a">${warnings}</ul>`
        : "</div>");
  }

  toggle.onclick = () => {
    const on = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(on));
    panel.hidden = !on;
    const result = map.setGraphOverlay(on ? graph : null);
    if (on) render(result);
  };
}

function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}
