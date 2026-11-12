import { shortestPath } from "./routing.mjs";
import { routeBetween } from "./route-target.mjs";
import {
  edgeId,
  reportLocation,
  availableEdges,
  groupReportsByEdge,
  edgeStatus,
  reviewGroups,
  reviewAlertCount,
  sanitizeReports,
  rowToReport,
  confirmedEdgesFromRows,
  reasonLabel,
  REPORT_THRESHOLD,
} from "./reports.mjs";
import {
  fetchReportRows,
  insertReportRow,
  deleteReportRow,
  confirmReportRows,
  deleteReportRows,
  uploadReportPhoto,
  photoUrlFor,
  fetchWorkRows,
  insertWorkRow,
  deleteWorkRow,
} from "./backend.mjs";
import {
  activeWorks,
  buildingLabel,
  worksPeriod,
  today,
} from "./buildings.mjs";
import catalog from "./schools.json";
import {
  CAMPUS,
  CAMPUS_GEOMETRY,
  BUILDINGS,
  NODES,
  EDGES,
  PLACES,
  ENTRANCES,
  SURVEY,
  placeEntries,
} from "./data.mjs";
import { createCampusMap } from "./map.js";
import { setupEditMode } from "./edit-mode.js";
import { gpsToCampus } from "./geo.mjs";
import { gisSummary } from "./gis.mjs";
const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);
let region = "전체",
  showAll = false,
  mode = "shortest",
  activeStart = "gate",
  activeDestination = "future",
  currentRoute = null,
  toastTimer,
  gpsWatchId = null,
  gpsPosition = null,
  gpsStartNode = null;
// Supabase에서 비동기로 채워집니다 (아래 loadReports 참고). 처음엔 빈 상태로 시작합니다.
let reports = [],
  confirmedEdges = [],
  reporting = false,
  selectedReport = null,
  adminUnlocked = false,
  // 신고를 올릴 때 Storage에 업로드할 File. 미리보기용 blob URL은 따로 관리합니다.
  selectedPhotoFile = null,
  photoPreviewUrl = null,
  // 관리자가 등록한 건물 공사 (Supabase building_works, 종료일 안 지난 것만)
  works = [];
// TODO(백엔드): 지금은 코드만 맞으면 누구나 여는 시연용 잠금입니다.
// 실제 배포 전 서버에서 관리자 로그인/권한을 검증하도록 교체하세요.
const ADMIN_DEMO_CODE = "team12admin";
const GIS_SUMMARY = gisSummary(CAMPUS_GEOMETRY, ENTRANCES);
for (const [key, value] of Object.entries(GIS_SUMMARY)) {
  const element = document.querySelector(`[data-gis-count="${key}"]`);
  if (element) element.textContent = value.toLocaleString("ko-KR");
}
$(".map-data-status").textContent =
  `건물 ${GIS_SUMMARY.buildings} · 등록 출입구 ${GIS_SUMMARY.entrances}`;
const normalize = (s) => s.toLowerCase().replace(/\s/g, "");
const schoolData = [
  catalog.find((s) => s[0] === CAMPUS.name),
  ...catalog.filter((s) => s[0] !== CAMPUS.name),
];
function renderSchools() {
  const q = normalize($("#school-search").value),
    all = schoolData.filter(
      (s) =>
        (region === "전체" || s[3] === region) &&
        normalize(s.join(" ")).includes(q),
    );
  const displayed = q || showAll ? all : all.slice(0, 6);
  $("#school-count").textContent = `${all.length}개 캠퍼스`;
  $("#show-all").hidden = !!q || all.length <= 6;
  $("#show-all").firstChild.textContent = showAll
    ? "학교 접기 "
    : "학교 더 보기 ";
  const container = $("#school-results");
  container.replaceChildren();
  if (!all.length) {
    const e = document.createElement("div");
    e.className = "empty";
    e.textContent = "찾는 학교가 없어요. 학교 이름 일부로 다시 검색해보세요.";
    container.append(e);
    return;
  }
  for (const s of displayed) {
    const supported = s[0] === CAMPUS.name,
      b = document.createElement("button");
    b.className = "school-card" + (supported ? " featured" : "");
    b.innerHTML =
      '<span class="school-state"><i></i></span><span class="school-logo"></span><span class="school-copy"><b></b><small></small></span><span class="school-arrow">↗</span>';
    b.querySelector(".school-logo").textContent = supported
      ? "ST"
      : s[0].slice(0, 1);
    b.querySelector("b").textContent = s[0];
    b.querySelector("small").textContent = `${s[2]} · ${s[1]}`;
    const state = b.querySelector(".school-state");
    state.append(
      document.createTextNode(supported ? "3D 지도 OPEN" : "지도 준비 중"),
    );
    state.classList.toggle("soon", !supported);
    b.onclick = () => {
      if (supported) location.hash = "campus/seoultech";
      else
        toast(
          `${s[0]} 지도는 준비 중이에요. 서울과기대에서 먼저 체험해보세요.`,
        );
    };
    container.append(b);
  }
}
$("#school-search").addEventListener("input", renderSchools);
$("#school-search-form").onsubmit = (e) => {
  e.preventDefault();
  renderSchools();
  $("#school-results button")?.focus();
};
$$("[data-region]").forEach(
  (b) =>
    (b.onclick = () => {
      region = b.dataset.region;
      $$("[data-region]").forEach((x) => {
        x.classList.toggle("active", x === b);
        x.setAttribute("aria-pressed", String(x === b));
      });
      renderSchools();
    }),
);
$("#show-all").onclick = () => {
  showAll = !showAll;
  renderSchools();
};
const gpsOptions = [];
for (const select of [$("#origin"), $("#destination")]) {
  const gpsOption = document.createElement("option");
  gpsOption.value = "gps";
  gpsOption.textContent = "내 현재 위치 · GPS 필요";
  gpsOption.disabled = true;
  select.append(gpsOption);
  gpsOptions.push(gpsOption);
  for (const place of PLACES) {
    const option = document.createElement("option");
    option.value = place.id;
    option.textContent = place.name;
    select.append(option);
  }
}
$("#origin").value = activeStart;
$("#destination").value = activeDestination;
// 경로 계산에 쓰는 보행 그래프입니다. 평소에는 data.mjs의 합친 그래프이고,
// 편집 모드에서는 편집 중인 조사 데이터를 합친 그래프로 바뀝니다.
let graph = { nodes: NODES, edges: EDGES, entrances: SURVEY.entrances };
function selectedPlace(selector, g = graph) {
  const id = $(selector).value;
  if (id === "gps")
    return gpsStartNode
      ? {
          id: "gps",
          name: "현재 위치",
          entry: gpsStartNode,
          entries: [gpsStartNode],
        }
      : undefined;
  const place = PLACES.find((item) => item.id === id),
    building = BUILDINGS.find((b) => b.id === id);
  return place && building
    ? { ...place, entries: placeEntries(building, g.entrances) }
    : place;
}
// [팀 알고리즘 호출 지점]
// 신고된 차단 edge를 제외한 그래프를 routing.mjs의 임시 알고리즘에 전달합니다.
// 건물에 출입구가 여러 개면 route-target.mjs가 가장 가까운 문을 고릅니다.
function routeOn(g) {
  const start = selectedPlace("#origin", g),
    destination = selectedPlace("#destination", g);
  if (!start || !destination) return { start, destination, route: null };
  return {
    start,
    destination,
    route: routeBetween(
      start.entries,
      destination.entries,
      mode,
      g.nodes,
      availableEdges(confirmedEdges, g.edges),
    ),
  };
}
function updateRoute({ announce = false } = {}) {
  activeStart = $("#origin").value;
  activeDestination = $("#destination").value;
  const { start, destination, route } = routeOn(graph);
  if (!start || !destination) {
    toast("현재 위치를 먼저 확인해주세요.");
    return;
  }
  currentRoute = route;
  if (!currentRoute) {
    $("#route-result").hidden = true;
    $("#no-route-message").hidden = false;
    $("#no-route-message p").textContent =
      mode === "stepfree"
        ? "공개 도로망에서 계단을 제외하면 연결된 길을 찾지 못했습니다. 실제 무계단 통로와 입구 정보는 현장 확인이 필요해요."
        : `신고된 길을 제외하면 ${start.name}에서 ${destination.name}까지 연결되는 경로가 없습니다. 다른 장소나 신고 목록을 확인해주세요.`;
    map?.setRoute(null);
    return;
  }
  $("#no-route-message").hidden = true;
  $("#route-result").hidden = false;
  $("#route-minutes").textContent = currentRoute.minutes;
  $("#route-distance").textContent = Math.round(currentRoute.meters);
  $(".result-heading>div>small").textContent =
    mode === "stepfree" ? "계단 제외 시연 경로" : "시연 최단 경로";
  $("#route-type").textContent = currentRoute.stairs ? "계단 포함" : "도보";
  $("#route-summary").textContent =
    `${start.name} → ${destination.name} · ${mode === "stepfree" ? "등록된 계단 구간을 제외한 경로예요." : "등록된 시연 보행망에서 가장 짧은 경로예요."} 거리·시간은 시연 추정치입니다.`;
  $("#route-steps").replaceChildren();
  const stride = Math.max(1, Math.ceil((currentRoute.path.length - 1) / 5));
  const visible = currentRoute.path.filter(
    (_, i) => i === 0 || i === currentRoute.path.length - 1 || i % stride === 0,
  );
  visible.forEach((id, i) => {
    const li = document.createElement("li");
    const point = graph.nodes[id];
    const nearestBuilding = BUILDINGS.filter(
      (b) => b.name !== "교내 건물",
    ).reduce(
      (best, b) =>
        !best ||
        Math.hypot(point.x - b.x, point.z - b.z) <
          Math.hypot(point.x - best.x, point.z - best.z)
          ? b
          : best,
      null,
    );
    li.textContent =
      visible.length === 1
        ? `${start.name}와 ${destination.name}의 등록 연결 지점이 같습니다`
        : i === 0
          ? `${start.name}에서 출발`
          : i === visible.length - 1
            ? `${destination.name} 도착`
            : `${nearestBuilding?.name || "캠퍼스"} 인근 길`;
    const small = document.createElement("small");
    small.textContent =
      i === 0
        ? "3D 지도에서 출발지 확인"
        : i === visible.length - 1
          ? "선택한 도착지의 연결 지점"
          : "보행로를 따라 이동";
    li.append(small);
    $("#route-steps").append(li);
  });
  $("#indoor-open").hidden = destination.id !== "future";
  map?.setRoute(currentRoute, start.id, destination.id, graph.nodes);
  if (announce)
    toast(`${start.name}에서 ${destination.name}까지 경로를 표시했어요.`);
}
function buildingSelect(id) {
  const place = PLACES.find((item) => item.id === id);
  if (place)
    showPopover(
      place.name,
      "출발지나 도착지로 선택할 수 있어요.",
      place,
      id === "future",
    );
}
function closeBuildingPopover() {
  $("#building-popover").hidden = true;
  $(".map-canvas-wrap").classList.remove("has-building-popover");
}
function showPopover(title, description, place = null, indoor = false) {
  const el = $("#building-popover");
  el.replaceChildren();
  const b = document.createElement("b");
  b.textContent = title;
  const p = document.createElement("p");
  p.textContent = description;
  el.append(b, p);
  if (place) {
    for (const [selector, text] of [
      ["#origin", "출발지로"],
      ["#destination", "도착지로"],
    ]) {
      const button = document.createElement("button");
      button.textContent = text;
      button.onclick = () => {
        $(selector).value = place.id;
        updateRoute();
        closeBuildingPopover();
      };
      el.append(button);
    }
  }
  if (indoor) {
    const button = document.createElement("button");
    button.textContent = "미래관 실내 지도 ↗";
    button.onclick = () => $("#indoor-dialog").showModal();
    el.append(button);
  }
  const close = document.createElement("button");
  close.textContent = "닫기";
  close.style.marginLeft = "5px";
  close.onclick = closeBuildingPopover;
  el.append(close);
  el.hidden = false;
  $(".map-canvas-wrap").classList.add("has-building-popover");
}
let map = createCampusMap($("#hero-map"), buildingSelect, openRoadReport);
if (!map) {
  $("#hero-map").innerHTML =
    '<div class="hero-fallback"><span>✦</span><b>사이로 이어지는 캠퍼스.</b><p>WebGL을 지원하는 브라우저에서<br>3D 미리보기를 볼 수 있어요.</p></div>';
  $("#map-error").hidden = false;
} else {
  map.setReports(reports, confirmedEdges);
  map.setRoute(
    shortestPath(
      "gate",
      "futureDoor",
      "shortest",
      NODES,
      availableEdges(confirmedEdges),
    ),
    "gate",
    "future",
  );
  setupEditMode({
    map,
    survey: SURVEY,
    geometry: CAMPUS_GEOMETRY,
    buildings: BUILDINGS,
    getGraph: () => graph,
    // 편집기가 조사 데이터를 바꿀 때마다 합친 그래프를 넘겨받아 경로를 다시 그립니다.
    applyGraph(next) {
      graph = next;
      updateRoute();
    },
    // 주어진 그래프에서 지금 고른 출발지·도착지 경로를 계산만 합니다(화면은 그대로).
    routeOn,
  });
}
$("#origin").onchange = () => {
  updateRoute();
  closeBuildingPopover();
};
$("#destination").onchange = () => {
  updateRoute();
  closeBuildingPopover();
};
$("#find-route").onclick = () => {
  updateRoute({ announce: true });
  closeBuildingPopover();
};
$$("[data-mode]").forEach(
  (b) =>
    (b.onclick = () => {
      mode = b.dataset.mode;
      $$("[data-mode]").forEach((x) => {
        x.classList.toggle("active", x === b);
        x.setAttribute("aria-pressed", String(x === b));
      });
      updateRoute();
    }),
);
$("#map-plus").onclick = () => map?.zoom(1.18);
$("#map-minus").onclick = () => map?.zoom(1 / 1.18);
$("#map-reset").onclick = () => map?.reset();
$("#map-north").onclick = () => map?.reset();
$("#map-top").onclick = () => map?.top();
function setPanelClosed(closed) {
  $("#map-view").classList.toggle("panel-closed", closed);
  $("#panel-toggle").setAttribute("aria-expanded", String(!closed));
  $("#panel-toggle").textContent = closed ? "길찾기 열기" : "길찾기 접기";
}
$("#panel-toggle").onclick = () =>
  setPanelClosed(!$("#map-view").classList.contains("panel-closed"));

// ===== GPS 현재 위치 추적 =====
// 공개 데이터의 중심 위·경도를 로컬 미터 좌표로 변환합니다.
// 실서비스 전에는 학교에서 기준점을 실측해 좌표 오차를 보정해야 합니다.
function nearestGraphNode(point) {
  return Object.entries(graph.nodes).reduce((best, [id, node]) => {
    const distance = Math.hypot(point.x - node.x, point.z - node.z);
    return !best || distance < best.distance ? { id, distance } : best;
  }, null);
}
function setGpsStatus(message, visible = true) {
  $("#gps-status").textContent = message;
  $("#gps-status").hidden = !visible;
}
function stopGps({ keepStatus = false } = {}) {
  if (gpsWatchId !== null) navigator.geolocation?.clearWatch(gpsWatchId);
  gpsWatchId = null;
  gpsPosition = null;
  gpsStartNode = null;
  for (const option of gpsOptions) {
    option.disabled = true;
    option.textContent = "내 현재 위치 · GPS 필요";
  }
  let changed = false;
  if ($("#origin").value === "gps") {
    $("#origin").value = "gate";
    changed = true;
  }
  if ($("#destination").value === "gps") {
    $("#destination").value = "future";
    changed = true;
  }
  if (changed) updateRoute();
  map?.setUserLocation(null);
  $("#gps-toggle").setAttribute("aria-pressed", "false");
  $("#gps-toggle span:last-child").textContent = "내 위치";
  if (!keepStatus) setGpsStatus("", false);
}
$("#gps-toggle").onclick = () => {
  if (gpsWatchId !== null) {
    stopGps();
    toast("현재 위치 추적을 종료했어요.");
    return;
  }
  if (!navigator.geolocation) {
    setGpsStatus("이 브라우저에서는 위치 기능을 사용할 수 없어요.");
    return;
  }
  setGpsStatus("현재 위치 권한을 확인하고 있어요…");
  $("#gps-toggle").setAttribute("aria-pressed", "true");
  $("#gps-toggle span:last-child").textContent = "추적 중";
  let firstFix = true;
  gpsWatchId = navigator.geolocation.watchPosition(
    ({ coords }) => {
      const point = gpsToCampus(
        coords.latitude,
        coords.longitude,
        CAMPUS_GEOMETRY.meta,
      );
      const nearest = nearestGraphNode(point);
      gpsPosition = { ...point, accuracy: coords.accuracy };
      if (!nearest || nearest.distance > 350) {
        gpsStartNode = null;
        gpsOptions.forEach((option) => (option.disabled = true));
        map?.setUserLocation(null);
        setGpsStatus(
          `현재 위치가 서울과기대 지도 범위 밖이에요. 캠퍼스에 들어오면 자동으로 표시됩니다.`,
        );
        firstFix = false;
        return;
      }
      gpsStartNode = nearest.id;
      for (const option of gpsOptions) {
        option.disabled = false;
        option.textContent = "내 현재 위치";
      }
      map?.setUserLocation(gpsPosition, { follow: true });
      setGpsStatus(
        `현재 위치 추적 중 · 정확도 약 ${Math.round(coords.accuracy)}m`,
      );
      if (firstFix) {
        $("#origin").value = "gps";
        updateRoute();
        toast("현재 위치를 출발지로 설정했어요.");
      } else if (
        $("#origin").value === "gps" ||
        $("#destination").value === "gps"
      )
        updateRoute();
      firstFix = false;
    },
    (error) => {
      const message =
        error.code === 1
          ? "위치 권한이 꺼져 있어요. 브라우저 주소창의 위치 권한을 허용해주세요."
          : "현재 위치를 확인하지 못했어요. 잠시 후 다시 시도해주세요.";
      stopGps({ keepStatus: true });
      setGpsStatus(message);
    },
    { enableHighAccuracy: true, maximumAge: 3000, timeout: 12000 },
  );
};
window.addEventListener("pagehide", () => {
  if (gpsWatchId !== null) navigator.geolocation?.clearWatch(gpsWatchId);
});
function routeView() {
  setReporting(false);
  const isMap = location.hash.startsWith("#campus/");
  if (isMap && location.hash !== "#campus/seoultech") {
    history.replaceState(
      null,
      "",
      location.pathname + location.search + "#campuses",
    );
    toast("현재 서울과기대 지도만 제공하고 있어요.");
  }
  const exploring = location.hash === "#campus/seoultech";
  $("#home-view").hidden = exploring;
  $("#map-view").hidden = !exploring;
  document.body.classList.toggle("exploring", exploring);
  if (exploring) {
    if (!$("#map-view").dataset.opened) {
      setPanelClosed(false);
      $("#map-view").dataset.opened = "true";
    }
    map?.moveTo($("#campus-map"), false);
    updateRoute();
    document.title = "서울과기대 길찾기 | 사이";
    $("#back-home").focus({ preventScroll: true });
  } else {
    map?.moveTo($("#hero-map"), true);
    map?.setRoute(
      shortestPath(
        "gate",
        "futureDoor",
        "shortest",
        NODES,
        availableEdges(confirmedEdges),
      ),
      "gate",
      "future",
    );
    document.title = "사이 · 길을 아는 건, 우리니까.";
    if (location.hash === "#campuses")
      requestAnimationFrame(() => $("#campuses").scrollIntoView());
  }
}
window.addEventListener("hashchange", routeView);
$("#back-home").onclick = () => (location.hash = "campuses");
$("#brand-home").onclick = (e) => {
  e.preventDefault();
  location.hash = "";
  window.scrollTo({ top: 0 });
};
$("#find-school").onclick = (e) => {
  e.preventDefault();
  location.hash = "campuses";
  if (!document.body.classList.contains("exploring"))
    $("#campuses").scrollIntoView();
};
$("#intro-button").onclick = () => $("#info-dialog").showModal();
$("#indoor-open").onclick = () => $("#indoor-dialog").showModal();
$$(".dialog-close").forEach(
  (b) => (b.onclick = () => b.closest("dialog").close()),
);
$$("dialog").forEach((d) =>
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        d.close();
    }
  }),
);
for (const [key, selector] of [
  ["indoorUrl", "#indoor-link"],
  ["arUrl", "#ar-link"],
]) {
  const url = CAMPUS.interior[key];
  if (url) {
    try {
      const parsed = new URL(url, location.href);
      if (["https:", "http:"].includes(parsed.protocol)) {
        $(selector).href = parsed.href;
        $(selector).hidden = false;
      }
    } catch {}
  }
}
function toast(message) {
  clearTimeout(toastTimer);
  $("#toast").replaceChildren(document.createTextNode(message));
  $("#toast").hidden = false;
  toastTimer = setTimeout(() => ($("#toast").hidden = true), 4500);
}
document.addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    !document.body.classList.contains("exploring") &&
    !["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName) &&
    !document.querySelector("dialog[open]")
  ) {
    e.preventDefault();
    $("#school-search").focus();
  }
});
renderSchools();
renderReportList();
renderAdminAlert();
routeView();
loadReports(); // Supabase에서 신고 목록을 비동기로 불러와 위 렌더를 다시 채웁니다.

// ===== 지도 위치를 직접 누르는 공사 신고 시연 =====
// TODO(백엔드): 사용자 입력은 point{x,z}. 경로 연결 edge는 지도 내부에서 자동 계산합니다.
function setReporting(value) {
  reporting = value;
  $("#report-start").classList.toggle("active", value);
  $("#report-start").setAttribute("aria-pressed", String(value));
  $("#report-start").textContent = value
    ? "× 구간 선택 취소"
    : "⚠ 공사 구간 신고";
  $("#report-picker").hidden = !value;
  map?.setReporting(value);
  if (!value) map?.clearReportSelection();
  if (value) {
    closeBuildingPopover();
    $("#campus-map canvas")?.focus({ preventScroll: true });
  }
}
$("#report-start").onclick = () => setReporting(!reporting);
$("#report-cancel").onclick = () => setReporting(false);
function openRoadReport(selection) {
  if (selection?.error) {
    toast(selection.error);
    return;
  }
  const existing = selection?.reportId
    ? reports.find((r) => r.id === selection.reportId)
    : null;
  if (!existing && (!selection?.point || !selection?.edgeId)) return;
  selectedReport = existing || selection;
  $("#report-location").textContent = reportLocation(selectedReport);
  $("#report-title").textContent = existing
    ? "이 도로 구간에 내 신고가 있어요."
    : "선택한 도로 구간이 공사 중인가요?";
  $("#report-reasons").hidden = !!existing;
  $("#new-report-actions").hidden = !!existing;
  $("#existing-report-actions").hidden = !existing;
  $("#report-photo-field").hidden = !!existing;
  if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
  photoPreviewUrl = null;
  selectedPhotoFile = null;
  $("#report-photo-input").value = "";
  $("#report-photo-preview").hidden = true;
  $('input[name="road-reason"][value="construction"]').checked = true;
  $("#report-reason-note").value = "";
  $("#report-reason-note").hidden = true;
  updateReportSubmit();
  const existingPhotoUrl = existing && photoUrlFor(existing.photoPath);
  $("#report-existing-photo").hidden = !existingPhotoUrl;
  if (existingPhotoUrl) $("#report-existing-photo").src = existingPhotoUrl;
  $("#report-dialog .report-scope").textContent = existing
    ? `${reasonLabel(existing)} · ${reportStatusLabel(existing)} · 선택한 도로 구간에 저장된 신고입니다. 삭제하면 집계에서 빠집니다.`
    : `같은 구간에 신고가 ${REPORT_THRESHOLD}건 이상 모이면 지도에 주의(노란색)로 표시되고 관리자에게 검토 알림이 갑니다. 관리자가 확인해 확정하면 통행 막힘(빨간색)으로 바뀌며 우회 경로를 안내합니다.`;
  $("#report-dialog").showModal();
}
// 사진이 있고, 기타 사유면 글까지 써야 신고 버튼이 켜집니다.
function updateReportSubmit() {
  const other = $('input[name="road-reason"]:checked').value === "other";
  $("#report-yes").disabled =
    !selectedPhotoFile || (other && !$("#report-reason-note").value.trim());
}
for (const radio of $$('input[name="road-reason"]'))
  radio.onchange = () => {
    const other = radio.value === "other" && radio.checked;
    $("#report-reason-note").hidden = !other;
    if (other) $("#report-reason-note").focus();
    updateReportSubmit();
  };
$("#report-reason-note").oninput = updateReportSubmit;
$("#report-photo-input").onchange = () => {
  selectedPhotoFile = $("#report-photo-input").files[0] || null;
  if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
  photoPreviewUrl = selectedPhotoFile
    ? URL.createObjectURL(selectedPhotoFile)
    : null;
  $("#report-photo-preview").src = photoPreviewUrl || "";
  $("#report-photo-preview").hidden = !photoPreviewUrl;
  updateReportSubmit();
};
$("#report-no").onclick = () => {
  map?.clearReportSelection();
  $("#report-dialog").close();
};
$("#report-keep").onclick = () => $("#report-dialog").close();
// 서버에서 다시 읽어와 화면을 전부 새로고침합니다 (신고 추가/삭제/확정/반려 뒤 공통으로 호출).
async function loadReports() {
  let rows;
  try {
    rows = await fetchReportRows();
  } catch {
    toast("신고 데이터를 불러오지 못했어요. 네트워크를 확인해주세요.");
    return;
  }
  reports = sanitizeReports(rows.map(rowToReport));
  confirmedEdges = confirmedEdgesFromRows(rows);
  map?.setReports(reports, confirmedEdges);
  renderReportList();
  renderAdminAlert();
  renderAdminPanel();
  updateRoute();
}
$("#report-yes").onclick = async () => {
  if (!selectedReport?.point) return;
  const reason = $('input[name="road-reason"]:checked').value,
    reasonNote = $("#report-reason-note").value.trim();
  if (!selectedPhotoFile) {
    toast("현장 사진을 찍어 올려야 신고할 수 있어요.");
    return;
  }
  if (reason === "other" && !reasonNote) {
    toast("기타 사유를 적어주세요.");
    return;
  }
  $("#report-yes").disabled = true; // 업로드 중 중복 신고 방지
  try {
    let photoPath;
    try {
      photoPath = await uploadReportPhoto(selectedPhotoFile);
    } catch {
      toast("사진 업로드에 실패했어요. 다시 시도해주세요.");
      return;
    }
    try {
      await insertReportRow({
        edgeId: selectedReport.edgeId,
        point: selectedReport.point,
        reason,
        reasonNote,
        photoPath,
      });
    } catch {
      toast("신고 저장에 실패했어요. 다시 시도해주세요.");
      return;
    }
  } finally {
    updateReportSubmit();
  }
  setReporting(false);
  $("#report-dialog").close();
  await loadReports();
};
$("#report-remove").onclick = async () => {
  try {
    await deleteReportRow(selectedReport.id);
  } catch {
    toast("삭제에 실패했어요. 다시 시도해주세요.");
    return;
  }
  $("#report-dialog").close();
  await loadReports();
};
$("#report-dialog").addEventListener("close", () => {
  if (!selectedReport?.id) map?.clearReportSelection();
});
// 신고 상태를 사람이 읽을 문구로 바꿉니다: 주의(노란색) → 관리자 확정(빨간색).
function reportStatusLabel(report) {
  const status = edgeStatus(
    report.edgeId,
    groupReportsByEdge(reports),
    confirmedEdges,
  );
  if (status === "confirmed") return "관리자 확정 · 통행 막힘";
  if (status === "caution") return "주의 표시 중 · 관리자 검토 대기";
  return `접수됨 · ${REPORT_THRESHOLD}건 이상 모이면 지도에 주의 표시`;
}
function renderReportList() {
  $("#report-count").textContent = reports.length;
  $("#report-empty").hidden = reports.length > 0;
  $("#report-list").replaceChildren();
  for (const report of reports) {
    const li = document.createElement("li"),
      button = document.createElement("button");
    button.innerHTML =
      '<span aria-hidden="true">⚠</span><span><b></b><small></small></span><span>↗</span>';
    button.querySelector("b").textContent = reportLocation(report);
    button.querySelector("small").textContent =
      reasonLabel(report) + " · " + reportStatusLabel(report);
    button.onclick = () => openRoadReport({ reportId: report.id });
    li.append(button);
    $("#report-list").append(li);
  }
}

// ===== 관리자 검토 (시연용 — 실제 배포 전 서버 인증으로 교체) =====
// 보기 편하게 "검토 필요(3건 이상)"와 "참고용(3건 미만)" 두 섹션으로 나눠서 보여줍니다.
function renderAdminSection(listId, emptyId, groups) {
  $(emptyId).hidden = groups.length > 0;
  $(listId).replaceChildren();
  for (const group of groups) {
    const li = document.createElement("li");
    li.className = "admin-item";
    li.innerHTML =
      "<b></b><small></small>" +
      '<div class="admin-actions">' +
      '<button type="button" data-act="confirm">확정 · 통행 막힘</button>' +
      '<button type="button" data-act="dismiss">반려 · 신고 취소</button>' +
      "</div>";
    li.querySelector("b").textContent = reportLocation(group.reports[0]);
    li.querySelector("small").textContent =
      `신고 ${group.count}건 · 최근 ${new Date(group.latestAt).toLocaleString("ko-KR")}`;
    li.querySelector('[data-act="confirm"]').onclick = async () => {
      try {
        await confirmReportRows(group.reports.map((r) => r.id));
      } catch {
        toast("확정 처리에 실패했어요. 다시 시도해주세요.");
        return;
      }
      await loadReports();
    };
    li.querySelector('[data-act="dismiss"]').onclick = async () => {
      try {
        await deleteReportRows(group.reports.map((r) => r.id));
      } catch {
        toast("반려 처리에 실패했어요. 다시 시도해주세요.");
        return;
      }
      await loadReports();
    };
    $(listId).append(li);
  }
}
// 확정된(빨간색) 구간: 공사가 끝나면 해제해서 신고를 지우고 경로를 다시 엽니다.
function renderConfirmedSection() {
  const groups = [...groupReportsByEdge(reports).values()].filter((g) =>
    confirmedEdges.includes(g.edgeId),
  );
  $("#admin-empty-confirmed").hidden = groups.length > 0;
  $("#admin-list-confirmed").replaceChildren();
  for (const group of groups) {
    const li = document.createElement("li");
    li.className = "admin-item";
    li.innerHTML =
      '<b></b><small></small><div class="admin-actions"><button type="button" data-act="release">해제 · 공사 끝남</button></div>';
    li.querySelector("b").textContent = reportLocation(group.reports[0]);
    li.querySelector("small").textContent =
      `통행 막힘(확정) · 신고 ${group.count}건`;
    li.querySelector("button").onclick = async () => {
      try {
        await deleteReportRows(group.reports.map((r) => r.id));
      } catch {
        toast("확정 해제에 실패했어요. 다시 시도해주세요.");
        return;
      }
      toast("확정을 해제했어요. 이 구간은 다시 경로에 포함돼요.");
      await loadReports();
    };
    $("#admin-list-confirmed").append(li);
  }
}
function renderAdminPanel() {
  renderConfirmedSection();
  const groups = reviewGroups(reports, confirmedEdges);
  renderAdminSection(
    "#admin-list-urgent",
    "#admin-empty-urgent",
    groups.filter((g) => g.needsReview),
  );
  renderAdminSection(
    "#admin-list-minor",
    "#admin-empty-minor",
    groups.filter((g) => !g.needsReview),
  );
}
// threshold 이상 쌓여 검토가 필요한 구간 수를 관리자 버튼 배지로 보여줍니다.
function renderAdminAlert() {
  const count = reviewAlertCount(reports, confirmedEdges);
  $("#admin-alert-count").textContent = count;
  $("#admin-alert-count").hidden = count === 0;
}
// 관리자 버튼은 사용자에게 숨깁니다. 주소에 ?admin=1을 붙여 열거나, 이 기기에서 한 번
// 관리자 코드를 맞게 넣었으면 보입니다. 화면에서 감추는 것일 뿐 보안 장치는 아닙니다
// (진짜 보호는 관리자 로그인 + Supabase RLS로 해야 합니다).
const ADMIN_DEVICE_KEY = "sai:seoultech:admin-device:v1";
function isAdminDevice() {
  try {
    return localStorage.getItem(ADMIN_DEVICE_KEY) === "1";
  } catch {
    return false;
  }
}
$("#admin-toggle").hidden = !(
  new URLSearchParams(location.search).has("admin") || isAdminDevice()
);
$("#admin-toggle").onclick = () => {
  if (!adminUnlocked) {
    const input = prompt("관리자 코드를 입력하세요 (해커톤 시연용 임시 잠금)");
    if (input === null) return;
    if (input !== ADMIN_DEMO_CODE) {
      toast("관리자 코드가 올바르지 않아요.");
      return;
    }
    adminUnlocked = true;
    try {
      localStorage.setItem(ADMIN_DEVICE_KEY, "1");
    } catch {}
  }
  renderAdminPanel();
  renderWorkList();
  $("#admin-dialog").showModal();
};

// ===== 건물 공사 (관리자가 건물을 골라 기간과 함께 등록 → 지도에 🚧 표시만, 경로는 그대로) =====
async function loadWorks() {
  let rows;
  try {
    rows = await fetchWorkRows();
  } catch {
    return; // 공사 표시는 부가 기능이라 실패해도 조용히 넘어갑니다.
  }
  works = activeWorks(rows);
  map?.setWorks(works);
  renderWorkList();
}
function renderWorkList() {
  $("#work-empty").hidden = works.length > 0;
  $("#work-list").replaceChildren();
  for (const work of works) {
    const b = BUILDINGS.find((x) => x.id === work.buildingId),
      li = document.createElement("li");
    li.className = "admin-item";
    li.innerHTML =
      '<b></b><small></small><div class="admin-actions"><button type="button">공사 해제</button></div>';
    li.querySelector("b").textContent = `🚧 ${buildingLabel(b)}`;
    li.querySelector("small").textContent =
      worksPeriod(work) + (work.note ? ` · ${work.note}` : "");
    li.querySelector("button").onclick = async () => {
      try {
        await deleteWorkRow(work.id);
      } catch {
        toast("공사 해제에 실패했어요. 다시 시도해주세요.");
        return;
      }
      await loadWorks();
    };
    $("#work-list").append(li);
  }
}
for (const b of BUILDINGS.filter(
  (b) => b.name !== "교내 건물" && b.name !== "조형물",
).sort((a, b) => a.name.localeCompare(b.name, "ko"))) {
  const option = document.createElement("option");
  option.value = b.id;
  option.textContent = buildingLabel(b);
  $("#work-building").append(option);
}
$("#work-start").value = today();
$("#work-form").onsubmit = async (e) => {
  e.preventDefault();
  const start = $("#work-start").value,
    end = $("#work-end").value;
  if (start > end) {
    toast("종료일이 시작일보다 빠를 수 없어요.");
    return;
  }
  try {
    await insertWorkRow({
      buildingId: $("#work-building").value,
      start,
      end,
      note: $("#work-note").value.trim(),
    });
  } catch {
    toast("공사 등록에 실패했어요. 다시 시도해주세요.");
    return;
  }
  $("#work-note").value = "";
  $("#work-end").value = "";
  await loadWorks();
};
loadWorks();

// 다른 사람(사용자↔관리자)이 바꾼 내용을 가져옵니다. 10초마다, 그리고 탭으로 돌아올 때 다시 읽습니다.
// 신고 창이 열려 있거나 위치를 고르는 중에는 선택이 지워지지 않게 건너뜁니다.
// ponytail: 10초 폴링. 즉시 반영이 필요하면 Supabase Realtime 구독으로 바꾸세요.
function refreshShared() {
  if (document.hidden || reporting || document.querySelector("dialog[open]"))
    return;
  loadReports();
  loadWorks();
}
setInterval(refreshShared, 10000);
document.addEventListener("visibilitychange", refreshShared);
