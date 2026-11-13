import { normalizeSearch, suggestMatches } from "./search-suggestions.mjs";
import { shortestPath } from "./routing.mjs";
import { routeBetween, routeStartEntries } from "./route-target.mjs";
import { attachGps } from "./gps-start.mjs";
import {
  edgeId,
  reportLocation,
  availableEdges,
  clusterReports,
  clusterOf,
  gpsDistance,
  locateReportPoint,
  sanitizeReports,
  rowToReport,
  confirmedEdgesFromRows,
  reasonLabel,
  REPORT_THRESHOLD,
} from "./reports.mjs";
import {
  fetchReportRows,
  insertReportRow,
  getDeviceId,
  confirmReportRows,
  deleteReportRows,
  uploadReportPhoto,
  photoUrlFor,
  fetchWorkRows,
  insertWorkRow,
  deleteWorkRow,
  getAdminSession,
  signInAdmin,
  signOutAdmin,
  isAdminUser,
  supabase,
} from "./backend.mjs";
import {
  activeWorks,
  BUILDING_NUMBERS,
  buildingLabel,
  worksPeriod,
  today,
} from "./buildings.mjs";
import catalog from "./schools.json";
import {
  CAMPUS,
  CAMPUS_GEOMETRY,
  INDOOR_MAPS,
  BUILDINGS,
  NODES,
  EDGES,
  PLACES,
  ENTRANCES,
  SURVEY,
  placeEntries,
} from "./data.mjs";
import { createCampusMap } from "./map.js";
import { buildingInfo } from "./building-info.mjs";
import { setupEditMode, EDIT_MODE } from "./edit-mode.js";
import { gpsToCampus } from "./geo.mjs";
import { gisSummary } from "./gis.mjs";
import { routePoints, guidanceAt, INSTRUCTION } from "./guidance.mjs";
const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s),
  // 761px 이상은 Figma v2 데스크톱 화면(떠 있는 패널·건물 카드·건물 검색)을 씁니다.
  isDesktop = window.matchMedia("(min-width: 761px)");
// 데스크톱 왼쪽 사이드바의 버튼을 이름(data-side)으로 찾습니다.
const side = (name) => $(`[data-side="${name}"]`);
let region = "전체",
  showAll = false,
  mode = "shortest",
  currentRoute = null,
  currentRouteNodes = NODES,
  toastTimer,
  gpsWatchId = null,
  gpsPosition = null,
  gpsStartNode = null,
  guidanceActive = false,
  guidancePending = false;
// Supabase에서 비동기로 채워집니다 (아래 loadReports 참고). 처음엔 빈 상태로 시작합니다.
let reports = [],
  adminAuthenticated = false,
  confirmedEdges = [],
  reporting = false,
  selectedReport = null,
  // 신고를 올릴 때 Storage에 업로드할 File. 미리보기용 blob URL은 따로 관리합니다.
  selectedPhotoFile = null,
  photoPreviewUrl = null,
  // 관리자가 등록한 건물 공사 (Supabase building_works, 종료일 안 지난 것만)
  works = [],
  // 30m 안 신고를 묶은 구역 (loadReports에서 다시 계산)
  clusters = [];
const GIS_SUMMARY = gisSummary(CAMPUS_GEOMETRY, ENTRANCES);
for (const [key, value] of Object.entries(GIS_SUMMARY)) {
  const element = document.querySelector(`[data-gis-count="${key}"]`);
  if (element) element.textContent = value.toLocaleString("ko-KR");
}
$(".map-data-status").textContent =
  `건물 ${GIS_SUMMARY.buildings} · 등록 출입구 ${GIS_SUMMARY.entrances}`;
const normalize = normalizeSearch;
const schoolData = [
  catalog.find((s) => s[0] === CAMPUS.name),
  ...catalog.filter((s) => s[0] !== CAMPUS.name),
];
function renderSchools() {
  const q = normalize($("#school-search").value),
    regional = schoolData.filter((s) => region === "전체" || s[3] === region),
    matches = regional.filter((s) => normalize(s.join(" ")).includes(q)),
    suggested = q && !matches.length
      ? suggestMatches(q, regional, (s) => [s[0]])
      : [],
    all = matches.length ? matches : suggested;
  const displayed = q || showAll ? all : all.slice(0, 6);
  $("#school-count").textContent = suggested.length
    ? `추천 캠퍼스 ${suggested.length}곳`
    : `${all.length}개 캠퍼스`;
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
const placesById = new Map(PLACES.map((place) => [place.id, place])),
  placesByName = new Map(PLACES.map((place) => [place.name, place]));
const locationPlace = { id: "gps", name: "내 현재 위치" };
const closePlaceSuggestions = new Map();
function routePlaceId(selector) {
  const value = $(selector).value.trim();
  return value === "내 현재 위치" ? "gps" : placesByName.get(value)?.id;
}
function setRoutePlace(selector, id) {
  $(selector).value =
    id === "gps" ? "내 현재 위치" : placesById.get(id)?.name || "";
  $(selector).removeAttribute("aria-invalid");
  closePlaceSuggestions.get(selector)?.();
}
// 경로 계산에 쓰는 보행 그래프입니다. 평소에는 data.mjs의 합친 그래프이고,
// 편집 모드에서는 편집 중인 조사 데이터를 합친 그래프로 바뀝니다.
let graph = { nodes: NODES, edges: EDGES, entrances: SURVEY.entrances };
function selectedPlace(selector, g = graph) {
  const id = routePlaceId(selector);
  // 현재 위치는 routeOn에서 길 위의 점으로 붙입니다(placeGps). entries는 붙이기 전 기본값입니다.
  if (id === "gps")
    return gpsStartNode && gpsPosition
      ? {
          id: "gps",
          name: "현재 위치",
          gps: gpsPosition,
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
// 현재 위치가 출발지·도착지면 가장 가까운 길 위의 점을 그래프에 더해 그 점에서 시작합니다.
// 반환하는 nodes는 그 점까지 포함한 노드 목록이라, 경로를 그릴 때 이것을 씁니다.
function routeOn(g, routeMode = mode) {
  let start = selectedPlace("#origin", g),
    destination = selectedPlace("#destination", g);
  if (!start || !destination)
    return { start, destination, route: null, nodes: g.nodes };
  // 확정된 공사 구간을 먼저 빼서, 막힌 길 위에는 출발점이 생기지 않게 합니다.
  let routeGraph = {
    nodes: g.nodes,
    edges: availableEdges(confirmedEdges, g.edges),
  };
  [start, routeGraph] = placeGps(start, routeGraph, g, "gps-start");
  [destination, routeGraph] = placeGps(destination, routeGraph, g, "gps-goal");
  return {
    start,
    destination,
    nodes: routeGraph.nodes,
    route: routeBetween(
      routeStartEntries(start, routeMode, routeGraph.nodes),
      destination.entries,
      routeMode,
      routeGraph.nodes,
      routeGraph.edges,
    ),
  };
}
function placeGps(place, routeGraph, g, id) {
  if (place.id !== "gps") return [place, routeGraph];
  const at = attachGps(place.gps, routeGraph, { buildings: BUILDINGS, id });
  if (!at) return [place, routeGraph];
  // 건물 안이면 그 건물을 고른 것처럼 가장 가까운 출입구에서 출발합니다.
  if (at.kind === "building")
    return [
      { ...place, entries: placeEntries(at.building, g.entrances) },
      routeGraph,
    ];
  return [{ ...place, entries: [at.nodeId] }, at.graph];
}
function updateRoute({ announce = false } = {}) {
  const { start, destination, route, nodes } = routeOn(graph);
  if (!start || !destination) {
    routeShown = false;
    renderResultPanel();
    const gpsWaiting =
      routePlaceId("#origin") === "gps" ||
      routePlaceId("#destination") === "gps";
    // 아직 비어 있는 칸이 있을 뿐이면(한쪽만 고른 상태) 안내 없이 기다립니다.
    const typedUnknown = ["#origin", "#destination"].some(
      (selector) => $(selector).value.trim() && !routePlaceId(selector),
    );
    if (!gpsWaiting && !typedUnknown) return;
    toast(
      gpsWaiting
        ? "현재 위치를 먼저 확인해주세요."
        : "검색 결과에서 출발지와 도착지를 선택해주세요.",
    );
    return;
  }
  const indoorButton = $("#indoor-open");
  indoorButton.hidden = !INDOOR_MAPS.has(destination.id);
  indoorButton.querySelector("b").textContent = `${destination.name} 실내 지도`;
  indoorButton.onclick = () => enterIndoor(destination.id);
  currentRoute = route;
  if (!currentRoute) {
    endGuidance({ silent: true });
    updateModeOptions();
    routeShown = false;
    renderResultPanel();
    $("#route-result").hidden = true;
    $("#no-route-message").hidden = false;
    $("#no-route-message p").textContent =
      mode === "stepfree"
        ? "공개 도로망에서 계단을 제외하면 연결된 길을 찾지 못했습니다. 실제 무계단 통로와 입구 정보는 현장 확인이 필요해요."
        : `신고된 길을 제외하면 ${start.name}에서 ${destination.name}까지 연결되는 경로가 없습니다. 다른 장소나 신고 목록을 확인해주세요.`;
    map?.setRoute(null);
    return;
  }
  currentRouteNodes = nodes;
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
    const point = nodes[id];
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
  updateModeOptions();
  renderRouteCard(start, destination, nodes);
  map?.setRoute(currentRoute, start.id, destination.id, nodes);
  if (announce)
    toast(`${start.name}에서 ${destination.name}까지 경로를 표시했어요.`);
}
function buildingSelect(id) {
  const place = PLACES.find((item) => item.id === id);
  if (place) {
    closeBuildingPopover();
    showBuildingCard(id);
    return;
  }
  if (place) showPopover(place);
}
function closeBuildingPopover() {
  $("#building-popover").hidden = true;
  $(".map-canvas-wrap").classList.remove("has-building-popover");
}
function showPopover(place) {
  const el = $("#building-popover");
  el.replaceChildren();
  const b = document.createElement("b");
  b.textContent = place.name;
  const p = document.createElement("p");
  p.textContent = "출발지나 도착지로 선택할 수 있어요.";
  el.append(b, p);
  for (const [selector, text] of [
    ["#origin", "출발지로"],
    ["#destination", "도착지로"],
  ]) {
    const button = document.createElement("button");
    button.textContent = text;
    button.onclick = () => {
      setRoutePlace(selector, place.id);
      updateRoute();
      closeBuildingPopover();
    };
    el.append(button);
  }
  if (INDOOR_MAPS.has(place.id)) {
    const button = document.createElement("button");
    button.textContent = `${place.name} 실내 지도 →`;
    button.onclick = () => enterIndoor(place.id);
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
  map.setReports(reports);
  map.setRoute(
    shortestPath(
      "gate",
      PLACES.find((place) => place.id === "future").entry,
      "shortest",
      NODES,
      availableEdges(confirmedEdges),
    ),
    "gate",
    "future",
  );
  // 편집기는 관리자 로그인을 확인한 뒤에만 켭니다(주소에 ?edit를 직접 붙여도 마찬가지).
  if (EDIT_MODE)
    startEditModeAfterLogin({
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
for (const selector of ["#origin", "#destination"]) {
  const input = $(selector);
  const list = $(`${selector}-suggestions`);
  const hint = $(`${selector}-suggestion-hint`);
  const panel = list.parentElement;
  let choices = [];
  let active = -1;

  function closeSuggestions() {
    choices = [];
    active = -1;
    panel.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }
  closePlaceSuggestions.set(selector, closeSuggestions);

  function choose(place) {
    setRoutePlace(selector, place.id);
    updateRoute();
    closeBuildingPopover();
  }

  function renderSuggestions() {
    closeSuggestions();
    const q = normalize(input.value);
    const places = gpsStartNode ? [locationPlace, ...PLACES] : PLACES;
    if (q && places.some((place) => place.name === input.value.trim())) return;

    const matches = places.filter((place) => normalize(place.name).includes(q));
    choices = matches.length
      ? matches.slice(0, 6)
      : suggestMatches(q, places, (place) => [place.name]);
    if (!choices.length) return;

    hint.textContent = matches.length ? "검색 결과" : "추천 장소";
    list.replaceChildren(...choices.map((place, index) => {
      const option = document.createElement("li");
      option.id = `${list.id}-${index}`;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", "false");
      option.textContent = place.name;
      option.onpointerdown = (event) => {
        if (event.pointerType === "mouse") event.preventDefault();
      };
      option.onclick = () => choose(place);
      return option;
    }));
    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    renderSuggestions();
  });
  input.addEventListener("focus", renderSuggestions);
  document.addEventListener("focusin", (event) => {
    if (event.target !== input) closeSuggestions();
  });
  document.addEventListener("pointerdown", (event) => {
    if (event.target !== input && !list.contains(event.target)) closeSuggestions();
  });
  input.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === "Escape" && !panel.hidden) {
      event.preventDefault();
      closeSuggestions();
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (active >= 0) choose(choices[active]);
      else if (routePlaceId(selector)) updateRoute();
      else if (choices.length) choose(choices[0]);
      else updateRoute({ announce: true });
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (panel.hidden) renderSuggestions();
      if (!choices.length) return;
      event.preventDefault();
      if (active >= 0) list.children[active].setAttribute("aria-selected", "false");
      const step = event.key === "ArrowDown" ? 1 : -1;
      active = active < 0
        ? (step > 0 ? 0 : choices.length - 1)
        : (active + step + choices.length) % choices.length;
      const option = list.children[active];
      option.setAttribute("aria-selected", "true");
      input.setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    }
  });
  input.addEventListener("change", () => {
    if (routePlaceId(selector)) {
      updateRoute();
      closeBuildingPopover();
    } else if (!choices.length && input.value.trim()) {
      input.setAttribute("aria-invalid", "true");
    }
  });
}
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
  // 길찾기 패널과 길 막힘 제보 패널은 같은 자리를 써서 하나만 엽니다.
  if (!closed) setReportsPanel(false);
  // 모바일은 아래 시트가 하나라, 길찾기를 열면 건물 정보 시트를 닫습니다.
  if (!closed && !isDesktop.matches && !$("#building-card").hidden)
    closeBuildingCard();
  $("#map-view").classList.toggle("panel-closed", closed);
  $("#panel-toggle").setAttribute("aria-expanded", String(!closed));
  $('[data-side="route"]').setAttribute("aria-pressed", String(!closed));
  // Figma v2: 위쪽 바의 "길찾기" 버튼 하나로 패널을 열고 닫습니다(데스크톱·모바일 공통).
  $("#panel-toggle").textContent = "길찾기";
}
$("#panel-toggle").onclick = () =>
  setPanelClosed(!$("#map-view").classList.contains("panel-closed"));

// ===== 길 막힘 제보 패널 =====
// 제보 목록을 이 패널로 옮깁니다(데스크톱은 왼쪽 패널, 모바일은 아래 시트).
$("#reports-panel-body").append($(".road-reports"));
function setReportsPanel(open) {
  if (open) {
    setPanelClosed(true);
    if (!isDesktop.matches) closeBuildingCard();
  }
  $("#reports-panel").hidden = !open;
  $('[data-side="report"]').setAttribute("aria-pressed", String(open));
  $("#v2-report").setAttribute("aria-pressed", String(open));
}
$("#reports-panel-close").onclick = () => setReportsPanel(false);
$("#reports-panel-start").onclick = () => {
  setReportsPanel(false);
  $("#report-start").click();
};

// ===== 경로 방식 카드: 두 방식의 시간·거리를 함께 보여 줍니다 =====
// 출발지와 도착지를 둘 다 고른 상태인지 표시합니다.
// 모바일은 이때부터 아래 경로 시트(경로 방식 · 결과)를 띄웁니다.
function syncPlacesReady() {
  $("#map-view").classList.toggle(
    "places-ready",
    Boolean(routePlaceId("#origin") && routePlaceId("#destination")),
  );
}
for (const selector of ["#origin", "#destination"])
  $(selector).addEventListener("input", syncPlacesReady);
function updateModeOptions() {
  syncPlacesReady();
  for (const m of ["shortest", "stepfree"]) {
    const { start, destination, route } = routeOn(graph, m);
    const meta = $(`[data-mode-meta="${m}"]`),
      time = $(`[data-mode-time="${m}"]`);
    if (!start || !destination) {
      meta.textContent = "";
      time.textContent = "";
    } else if (!route) {
      meta.textContent = "연결된 길이 없어요";
      time.textContent = "—";
    } else {
      meta.textContent = `${Math.round(route.meters)} m${route.stairs ? " · 계단 포함" : ""}`;
      time.replaceChildren(String(route.minutes));
      const unit = document.createElement("small");
      unit.textContent = "분";
      time.append(unit);
    }
  }
}

// ===== 건물 정보 카드 (데스크톱) =====
let cardBuildingId = null;
function placeWithEntries(id, g = graph) {
  const place = placesById.get(id),
    building = BUILDINGS.find((b) => b.id === id);
  return place && building
    ? { ...place, entries: placeEntries(building, g.entrances) }
    : place;
}
function showBuildingCard(id) {
  const place = placeWithEntries(id);
  if (!place) return;
  cardBuildingId = id;
  const number = BUILDING_NUMBERS[place.name],
    info = buildingInfo(place.name);
  $("#building-card-name").textContent = place.name;
  $("#building-card-sub").textContent =
    [number ? `${number}동` : "", info.area].filter(Boolean).join(" · ") ||
    "서울과학기술대학교";
  $("#building-card-floors").textContent = info.floors || "—";
  $("#building-card-entrances").textContent = `${place.entries?.length || 0}곳`;
  $("#building-card-hours").textContent = info.hours || "—";
  const indoor = INDOOR_MAPS.has(id);
  $("#building-card-indoor").disabled = !indoor;
  $("#building-card-indoor").title = indoor
    ? ""
    : "실내 지도는 아직 미래관만 준비돼 있어요.";
  map?.highlightBuilding(id);
  // 모바일은 아래 시트가 하나뿐이라, 건물 정보를 띄울 때 다른 시트를 닫습니다.
  if (!isDesktop.matches) {
    setReportsPanel(false);
    setPanelClosed(true);
  }
  $("#building-card").hidden = false;
  renderResultPanel();
}
function closeBuildingCard() {
  $("#building-card").hidden = true;
  cardBuildingId = null;
  map?.highlightBuilding(null);
  renderResultPanel();
}
$("#building-card-close").onclick = closeBuildingCard;
// 건물 카드의 "출발지로"/"도착지로": 반대쪽 칸이 이미 있으면 바로 경로를 그리고,
// 비어 있으면 길찾기 패널을 열어 그 칸에 바로 입력하게 합니다.
function useCardBuildingAs(selector, other) {
  if (!cardBuildingId) return;
  setRoutePlace(selector, cardBuildingId);
  const otherId = routePlaceId(other);
  if (otherId && otherId !== cardBuildingId) {
    setPanelClosed(false);
    updateRoute({ announce: true });
    return;
  }
  $(other).value = "";
  updateModeOptions();
  setPanelClosed(false);
  // 패널이 보이게 바뀐 다음 프레임에 초점을 옮겨야 그 칸에 바로 입력됩니다.
  requestAnimationFrame(() => $(other).focus());
}
$("#building-card-origin").onclick = () =>
  useCardBuildingAs("#origin", "#destination");
$("#building-card-dest").onclick = () =>
  useCardBuildingAs("#destination", "#origin");
// 실내 탐색: 팀의 3D 진입 전환(enterIndoor)으로 건물 안까지 날아간 뒤 실내 지도를 엽니다.
$("#building-card-indoor").onclick = () => {
  if (cardBuildingId && INDOOR_MAPS.has(cardBuildingId))
    enterIndoor(cardBuildingId);
};

// ===== 건물 검색 (위쪽 바) =====
const searchInput = $("#building-search"),
  searchResults = $("#building-results"),
  buildingPlaces = PLACES.filter((p) => BUILDINGS.some((b) => b.id === p.id)),
  recentBuildings = [];
let searchItems = [],
  searchIndex = -1;
function matchBuildings(query) {
  const q = query.replace(/\s+/g, "").toLowerCase();
  if (!q) return [];
  return buildingPlaces
    .filter((p) => {
      const n = BUILDING_NUMBERS[p.name];
      return (
        p.name.replace(/\s+/g, "").toLowerCase().includes(q) ||
        (n && String(n) === q)
      );
    })
    .slice(0, 8);
}
function renderBuildingResults() {
  const query = searchInput.value.trim();
  const found = matchBuildings(query);
  const recent = recentBuildings
    .map((id) => placesById.get(id))
    .filter(Boolean);
  searchItems = query ? found : recent;
  searchIndex = searchItems.length ? 0 : -1;
  searchResults.replaceChildren();
  if (query || recent.length) {
    const heading = document.createElement("p");
    heading.className = "building-results-heading";
    heading.textContent = query ? "건물" : "최근 본 건물";
    searchResults.append(heading);
  }
  searchItems.forEach((place, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("role", "option");
    button.id = `building-option-${i}`;
    button.className = "building-option";
    const icon = document.createElement("span");
    icon.className = "building-option-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = query ? "▦" : "↺";
    const text = document.createElement("span");
    const name = document.createElement("b");
    const at = query ? place.name.indexOf(query) : -1;
    if (at >= 0) {
      const mark = document.createElement("mark");
      mark.textContent = place.name.slice(at, at + query.length);
      name.append(
        place.name.slice(0, at),
        mark,
        place.name.slice(at + query.length),
      );
    } else name.textContent = place.name;
    const sub = document.createElement("small");
    const n = BUILDING_NUMBERS[place.name];
    sub.textContent = n ? `${n}동` : "건물";
    text.append(name, sub);
    button.append(icon, text);
    // 목록을 누르는 동안 검색창 blur로 목록이 먼저 닫히지 않게 합니다.
    button.onmousedown = (e) => e.preventDefault();
    button.onclick = () => chooseBuilding(place.id);
    searchResults.append(button);
  });
  if (query && !found.length) {
    const empty = document.createElement("p");
    empty.className = "building-results-empty";
    empty.textContent =
      "찾는 건물이 없어요. 건물 이름이나 번호로 검색해 보세요.";
    searchResults.append(empty);
  }
  if (searchResults.childElementCount) {
    const hint = document.createElement("p");
    hint.className = "building-results-hint";
    hint.textContent = "건물만 검색돼요 · 강의실은 실내 탐색에서 찾아요";
    searchResults.append(hint);
  }
  highlightResult();
  const open = searchResults.childElementCount > 0;
  searchResults.hidden = !open;
  searchInput.setAttribute("aria-expanded", String(open));
}
function highlightResult() {
  searchResults.querySelectorAll(".building-option").forEach((b, i) => {
    b.classList.toggle("active", i === searchIndex);
    b.setAttribute("aria-selected", String(i === searchIndex));
  });
  if (searchIndex >= 0)
    searchInput.setAttribute(
      "aria-activedescendant",
      `building-option-${searchIndex}`,
    );
  else searchInput.removeAttribute("aria-activedescendant");
}
function closeBuildingResults() {
  searchResults.hidden = true;
  searchInput.setAttribute("aria-expanded", "false");
}
function chooseBuilding(id) {
  const place = placesById.get(id);
  if (!place) return;
  searchInput.value = place.name;
  closeBuildingResults();
  const rest = recentBuildings.filter((x) => x !== id).slice(0, 4);
  recentBuildings.splice(0, recentBuildings.length, id, ...rest);
  closeBuildingPopover();
  map?.focusPlace(id);
  showBuildingCard(id);
  // 고른 뒤에는 검색창에서 빠져나와 결과 목록이 다시 열리지 않게 합니다.
  searchInput.blur();
}
searchInput.addEventListener("input", renderBuildingResults);
searchInput.addEventListener("focus", renderBuildingResults);
searchInput.addEventListener("blur", closeBuildingResults);
// 한글 입력 중(조합 중)에 누른 Enter는 조합이 끝난 뒤 처리해야 마지막 글자까지 반영됩니다.
let enterAfterComposition = false;
searchInput.addEventListener("compositionend", () => {
  renderBuildingResults();
  if (!enterAfterComposition) return;
  enterAfterComposition = false;
  if (searchIndex >= 0) chooseBuilding(searchItems[searchIndex].id);
});
searchInput.addEventListener("keydown", (e) => {
  if (e.isComposing || e.keyCode === 229) {
    if (e.key === "Enter") {
      e.preventDefault();
      enterAfterComposition = true;
    }
    return;
  }
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    if (!searchItems.length) return;
    e.preventDefault();
    const step = e.key === "ArrowDown" ? 1 : -1;
    searchIndex =
      (searchIndex + step + searchItems.length) % searchItems.length;
    highlightResult();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (searchIndex >= 0) chooseBuilding(searchItems[searchIndex].id);
  } else if (e.key === "Escape") {
    closeBuildingResults();
    searchInput.blur();
  }
});
// "/" 키로 건물 검색창에 바로 입력합니다(입력 중일 때는 제외).
document.addEventListener("keydown", (e) => {
  if (e.key !== "/" || $("#map-view").hidden || !isDesktop.matches) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  e.preventDefault();
  searchInput.focus();
});

// ===== 오른쪽 결과 카드 (데스크톱) =====
// 건물을 고르면 건물 정보 카드, 경로를 그리면 경로 카드 하나만 보여 줍니다.
let routeShown = false;
function renderResultPanel() {
  // 경로 결과는 길찾기 패널 안에, 건물 정보 카드는 따로 둡니다
  // (데스크톱은 오른쪽 카드, 모바일은 아래 시트).
  $("#route-card").hidden = !routeShown;
  const any = !$("#building-card").hidden;
  $("#result-panel").hidden = !any;
  $("#map-view").classList.toggle("has-results", any);
  $("#map-view").classList.toggle("route-shown", routeShown);
  $("#route-summary-bar").hidden = !routeShown;
  side("route").setAttribute(
    "aria-pressed",
    String(routeShown || !$("#map-view").classList.contains("panel-closed")),
  );
}
// 경로 카드의 안내 단계: 왼쪽 패널의 단계 목록과 같은 지점을 쓰고, 다음 지점까지 거리를 붙입니다.
function routeCardSteps(route, nodes) {
  const path = route.path,
    last = path.length - 1,
    stride = Math.max(1, Math.ceil(last / 5)),
    at = path
      .map((_, i) => i)
      .filter((i) => i === 0 || i === last || i % stride === 0),
    texts = [...$$("#route-steps li")].map((li) =>
      li.firstChild.textContent.trim(),
    ),
    cumulative = [0];
  for (let i = 1; i <= last; i++) {
    const a = nodes[path[i - 1]],
      b = nodes[path[i]];
    cumulative.push(cumulative[i - 1] + Math.hypot(a.x - b.x, a.z - b.z));
  }
  const steps = at.map((index, i) => ({ index, text: texts[i] || "" }));
  // 단계가 많으면 앞의 세 단계와 도착만 남깁니다.
  const shown = steps.length > 4 ? [...steps.slice(0, 3), steps.at(-1)] : steps;
  return shown.map((step, i) => ({
    text: step.text,
    meters:
      i < shown.length - 1
        ? Math.round(cumulative[shown[i + 1].index] - cumulative[step.index])
        : null,
  }));
}
function renderRouteCard(start, destination, nodes) {
  routeShown = true;
  const route = currentRoute;
  $("#route-card-title").textContent =
    mode === "stepfree" ? "계단 피하기" : "최단 경로";
  $("#route-card-sub").textContent = `${start.name} → ${destination.name}`;
  $("#route-card-minutes").textContent = route.minutes;
  $("#route-card-distance").textContent =
    `${Math.round(route.meters)} m · 도보`;
  const steps = routeCardSteps(route, nodes);
  $("#route-card-steps").replaceChildren(
    ...steps.map((step, i) => {
      const li = document.createElement("li"),
        icon =
          i === 0 ? "i-walk" : i === steps.length - 1 ? "i-flag" : "i-chevron";
      li.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#${icon}" /></svg><span></span><small></small>`;
      li.querySelector("span").textContent = step.text;
      li.querySelector("small").textContent =
        step.meters == null ? "" : `${step.meters} m`;
      return li;
    }),
  );
  $("#summary-origin").textContent = start.name;
  $("#summary-dest").textContent = destination.name;
  $$("[data-summary-mode]").forEach((b) =>
    b.classList.toggle("active", b.dataset.summaryMode === mode),
  );
  // 경로를 보여 줄 때는 건물 카드를 닫고 경로 카드만 둡니다.
  if (!$("#building-card").hidden) closeBuildingCard();
  renderResultPanel();
}
// 길찾기를 끝냅니다: 출발·도착 칸까지 비워야, 칸에서 초점이 빠질 때 생기는 change 이벤트로
// 경로가 다시 그려지지 않습니다.
function endRouteSearch() {
  document.activeElement?.blur();
  $("#origin").value = "";
  $("#destination").value = "";
  clearRouteResult();
}
$("#route-card-close").onclick = endRouteSearch;
function renderGuidanceButton() {
  const button = $("#route-card-start");
  $("#route-card-start-label").textContent = guidanceActive
    ? "안내 종료"
    : guidancePending
      ? "위치 확인 중…"
      : "안내 시작";
  button.setAttribute("aria-pressed", String(guidanceActive));
  button.setAttribute("aria-busy", String(guidancePending));
}
function endGuidance({ silent = false } = {}) {
  const wasRunning = guidanceActive || guidancePending;
  guidanceActive = guidancePending = false;
  map?.setRouteMascotVisible(true);
  renderGuidanceButton();
  if (wasRunning && gpsPosition)
    setGpsStatus(
      `현재 위치 추적 중 · 정확도 약 ${Math.round(gpsPosition.accuracy)}m`,
    );
  if (wasRunning && !silent) toast("길안내를 종료했어요.");
}
function updateGuidanceStatus() {
  if (!guidanceActive || !gpsPosition || !currentRoute) return;
  const guide = guidanceAt(
    routePoints(currentRoute.path, currentRouteNodes),
    gpsPosition,
  );
  if (!guide) return;
  if (guide.remaining <= 8) {
    endGuidance({ silent: true });
    setGpsStatus("도착지에 도착했어요.");
    toast("도착지에 도착했어요.");
    return;
  }
  const meters = Math.max(1, Math.round(guide.next.distance));
  setGpsStatus(
    `안내 중 · ${meters}m 후 ${INSTRUCTION[guide.next.direction]} · 남은 거리 ${Math.round(guide.remaining)}m`,
  );
}
function activateGuidance() {
  guidancePending = false;
  guidanceActive = true;
  map?.setRouteMascotVisible(false);
  setRoutePlace("#origin", "gps");
  updateRoute();
  if (!currentRoute) {
    endGuidance({ silent: true });
    toast("현재 위치에서 연결된 경로를 찾지 못했어요.");
    return;
  }
  renderGuidanceButton();
  map?.setUserLocation(gpsPosition, { follow: true });
  updateGuidanceStatus();
  toast("테크뇽을 따라 길안내를 시작했어요.");
}
function startGuidance() {
  if (guidanceActive || guidancePending) {
    endGuidance();
    return;
  }
  if (!currentRoute) {
    toast("출발지와 도착지를 먼저 선택해주세요.");
    return;
  }
  if (routePlaceId("#destination") === "gps") {
    toast("도착지는 건물이나 출입구로 선택해주세요.");
    return;
  }
  if (gpsPosition) {
    activateGuidance();
    return;
  }
  guidancePending = true;
  map?.setRouteMascotVisible(false);
  renderGuidanceButton();
  if (!startGps()) {
    endGuidance({ silent: true });
    return;
  }
  toast("현재 위치가 확인되면 길안내를 시작할게요.");
}
$("#route-card-start").onclick = startGuidance;
$$("[data-summary-mode]").forEach(
  (b) =>
    (b.onclick = () =>
      $(`.mode-tabs [data-mode="${b.dataset.summaryMode}"]`).click()),
);
$("#summary-edit").onclick = () => setPanelClosed(false);
// 모바일 경로 시트의 ✕는 길찾기를 끝내고(경로 지움) 지도로 돌아갑니다. 데스크톱은 패널만 닫습니다.
$("#route-panel-close").onclick = () => {
  if (!isDesktop.matches) endRouteSearch();
  setPanelClosed(true);
};
// 출발·도착 칸의 지우기(✕)와 바꾸기(⇅) 버튼
function clearRouteResult() {
  endGuidance({ silent: true });
  routeShown = false;
  currentRoute = null;
  map?.setRoute(null);
  updateModeOptions();
  renderResultPanel();
}
$$("[data-clear]").forEach(
  (button) =>
    (button.onclick = () => {
      const input = $(`#${button.dataset.clear}`);
      input.value = "";
      clearRouteResult();
      input.focus();
    }),
);
$("#swap-places").onclick = () => {
  const origin = $("#origin").value,
    destination = $("#destination").value;
  $("#origin").value = destination;
  $("#destination").value = origin;
  if (routePlaceId("#origin") && routePlaceId("#destination")) updateRoute();
  else clearRouteResult();
};
isDesktop.addEventListener("change", renderResultPanel);

// ===== 왼쪽 아이콘 사이드바 (데스크톱) =====
// 지도 아이콘: 위쪽 건물 검색 바를 보이고 숨깁니다(보일 때는 검색창에 바로 입력).
function setSearchBar(visible, focus = visible) {
  $("#map-view").classList.toggle("search-hidden", !visible);
  side("map").setAttribute("aria-pressed", String(visible));
  if (!visible) closeBuildingResults();
  if (focus) requestAnimationFrame(() => $("#building-search").focus());
}
side("map").onclick = () =>
  setSearchBar($("#map-view").classList.contains("search-hidden"));
side("route").onclick = () =>
  setPanelClosed(!$("#map-view").classList.contains("panel-closed"));
// 길 막힘(공사) 아이콘: 왼쪽에 길 막힘 제보 목록 패널을 열고 닫습니다.
side("report").onclick = () => setReportsPanel($("#reports-panel").hidden);
function setEntranceLayer(visible) {
  map?.setEntrancesVisible(visible);
  side("entrances").setAttribute("aria-pressed", String(visible));
  $("#entrance-toggle").setAttribute("aria-pressed", String(visible));
  $("#v2-entrances").setAttribute("aria-pressed", String(visible));
}
side("entrances").onclick = () =>
  setEntranceLayer(
    side("entrances").getAttribute("aria-pressed") !== "true",
  );
$("#entrance-toggle").onclick = () =>
  setEntranceLayer(
    $("#entrance-toggle").getAttribute("aria-pressed") !== "true",
  );
$("#v2-entrances").onclick = () =>
  setEntranceLayer($("#v2-entrances").getAttribute("aria-pressed") !== "true");
side("layers").onclick = () => {
  const on = !$("#map-view").classList.contains("show-legend");
  $("#map-view").classList.toggle("show-legend", on);
  side("layers").setAttribute("aria-pressed", String(on));
};
side("settings").onclick = () => {
  const on = !$("#map-view").classList.contains("show-instructions");
  $("#map-view").classList.toggle("show-instructions", on);
  side("settings").setAttribute("aria-pressed", String(on));
};
// 관리자·편집기 버튼: 관리자 계정으로 로그인하면 편집기 / 관리자 검토를 고르는 메뉴를 엽니다.
side("alerts").onclick = () => openAdminEntry();
// 신고 모드와 내 위치 상태를 사이드바·지도 컨트롤 버튼에도 똑같이 보여 줍니다.
new MutationObserver(() => {
  $("#v2-locate").setAttribute(
    "aria-pressed",
    $("#gps-toggle").getAttribute("aria-pressed") || "false",
  );
}).observe($(".map-quick-actions"), {
  attributes: true,
  subtree: true,
  attributeFilter: ["aria-pressed"],
});

// ===== 지도 컨트롤 (데스크톱): 2D/3D · 확대·축소 · 내 위치 · 시점 초기화 =====
function setDimension(top) {
  $("#v2-2d").setAttribute("aria-pressed", String(top));
  $("#v2-3d").setAttribute("aria-pressed", String(!top));
  if (top) map?.top();
  else map?.reset();
}
$("#v2-2d").onclick = () => setDimension(true);
$("#v2-3d").onclick = () => setDimension(false);
$("#v2-plus").onclick = () => map?.zoom(1.18);
$("#v2-minus").onclick = () => map?.zoom(1 / 1.18);
$("#v2-locate").onclick = () => $("#gps-toggle").click();
$("#v2-reset").onclick = () => setDimension(false);

// ===== 트랙패드 확대 제스처로 페이지가 커지지 않게 합니다(표지·지도 화면 모두) =====
// 트랙패드 오므리기/벌리기(Ctrl+휠)를 그냥 두면 브라우저가 페이지 전체를 확대해
// 메뉴·패널이 커지고 화면 밖으로 밀려납니다. 이 제스처로는 페이지를 확대하지 않고,
// 지도 화면에서는 그 확대를 지도로 보냅니다.
const onMapView = () => !$("#map-view").hidden;
const mapCanvas = () => $("#campus-map canvas");
document.addEventListener(
  "wheel",
  (e) => {
    if (!e.ctrlKey) return;
    const canvas = mapCanvas();
    // 지도 위는 지도가 직접 처리합니다(같은 이벤트를 두 번 보내지 않음).
    if (onMapView() && canvas && e.target === canvas) return;
    e.preventDefault();
    if (!onMapView() || !canvas) return;
    canvas.dispatchEvent(
      new WheelEvent("wheel", {
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        deltaMode: e.deltaMode,
        clientX: e.clientX,
        clientY: e.clientY,
        ctrlKey: true,
        cancelable: true,
      }),
    );
  },
  { passive: false },
);
// Safari 트랙패드 제스처: 페이지는 확대하지 않고, 지도 화면이면 지도를 확대합니다.
let pageGestureScale = null;
for (const type of ["gesturestart", "gesturechange", "gestureend"])
  document.addEventListener(type, (e) => {
    if (onMapView() && e.target === mapCanvas()) return;
    e.preventDefault();
    if (!onMapView()) return;
    if (type === "gesturestart") pageGestureScale = e.scale;
    else if (type === "gesturechange" && pageGestureScale) {
      map?.zoom(e.scale / pageGestureScale);
      pageGestureScale = e.scale;
    } else pageGestureScale = null;
  });
// Ctrl·⌘ + / − / 0 키 확대는 막지 않습니다(글자를 키워 보는 접근성 기능, 사용자 결정).

// ===== 모바일(760px 이하) Figma v2: 출발·도착 칸은 위쪽 카드, 나머지는 아래 시트 =====
// 출발·도착 칸(journey-form)만 모바일에서는 위쪽 카드로 옮기고, 데스크톱에서는 원래 자리로 돌려놓습니다.
const journeyForm = $(".journey-form"),
  journeyHome = document.createComment("journey-form");
journeyForm.before(journeyHome);
function placeJourneyForm() {
  if (isDesktop.matches) journeyHome.after(journeyForm);
  else $(".mobile-route-fields").append(journeyForm);
}
placeJourneyForm();
isDesktop.addEventListener("change", placeJourneyForm);
$("#mobile-route-back").onclick = () => setPanelClosed(true);

// 모바일 오른쪽 둥근 버튼: 길 막힘 제보 패널, 관리자·편집기 진입(공개 버튼)
$("#v2-report").onclick = () =>
  setReportsPanel($("#reports-panel").hidden);
$("#v2-admin").onclick = () => $("#admin-toggle").click();



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
  endGuidance({ silent: true });
  if (gpsWatchId !== null) navigator.geolocation?.clearWatch(gpsWatchId);
  gpsWatchId = null;
  gpsPosition = null;
  gpsStartNode = null;
  let changed = false;
  if (routePlaceId("#origin") === "gps") {
    setRoutePlace("#origin", "gate");
    changed = true;
  }
  if (routePlaceId("#destination") === "gps") {
    setRoutePlace("#destination", "future");
    changed = true;
  }
  if (changed) updateRoute();
  map?.setUserLocation(null);
  $("#gps-toggle").setAttribute("aria-pressed", "false");
  $("#gps-toggle span:last-child").textContent = "내 위치로";
  if (!keepStatus) setGpsStatus("", false);
}
$("#gps-toggle").onclick = () => {
  if (gpsWatchId !== null) {
    if (gpsPosition) {
      map?.setUserLocation(gpsPosition, { follow: true });
      toast("내 위치로 이동했어요.");
    } else setGpsStatus("현재 위치를 확인하고 있어요…");
    return;
  }
  startGps();
};
function startGps() {
  if (!navigator.geolocation) {
    setGpsStatus("이 브라우저에서는 위치 기능을 사용할 수 없어요.");
    return false;
  }
  if (gpsWatchId !== null) return true;
  setGpsStatus("현재 위치 권한을 확인하고 있어요…");
  $("#gps-toggle").setAttribute("aria-pressed", "true");
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
        map?.setUserLocation(null);
        setGpsStatus(
          `현재 위치가 서울과기대 지도 범위 밖이에요. 캠퍼스에 들어오면 자동으로 표시됩니다.`,
        );
        firstFix = false;
        return;
      }
      gpsStartNode = nearest.id;
      map?.setUserLocation(gpsPosition, {
        follow: firstFix || guidanceActive,
      });
      setGpsStatus(
        `현재 위치 추적 중 · 정확도 약 ${Math.round(coords.accuracy)}m`,
      );
      if (guidancePending) activateGuidance();
      else if (firstFix) {
        setRoutePlace("#origin", "gps");
        updateRoute();
        toast("현재 위치를 출발지로 설정했어요.");
      } else if (
        routePlaceId("#origin") === "gps" ||
        routePlaceId("#destination") === "gps"
      )
        updateRoute();
      if (guidanceActive) updateGuidanceStatus();
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
  return true;
}
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
    // 학교를 열 때마다 이전 선택과 경로를 지우고 지도만 보여 줍니다.
    // 지도부터 보여 주고, 길찾기 버튼을 누르면 패널이 열립니다(데스크톱·모바일 공통).
    setPanelClosed(true);
    $("#origin").value = "";
    $("#destination").value = "";
    routeShown = false;
    currentRoute = null;
    map?.setRoute(null);
    updateModeOptions();
    renderResultPanel();
    map?.moveTo($("#campus-map"), false);
    document.title = "서울과기대 길찾기 | 사이";
    $(isDesktop.matches ? "#building-search" : "#back-home").focus({
      preventScroll: true,
    });
  } else {
    map?.moveTo($("#hero-map"), true);
    map?.setRoute(
      shortestPath(
        "gate",
        PLACES.find((place) => place.id === "future").entry,
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
async function enterIndoor(buildingId) {
  const indoor = INDOOR_MAPS.get(buildingId);
  if (!indoor || document.body.classList.contains("entering-indoor")) return;

  if (!map || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    location.assign(indoor.url);
    return;
  }

  closeBuildingPopover();
  document.body.classList.add("entering-indoor");
  $("#map-view").inert = true;
  await map.flyIntoBuilding(buildingId, indoor.entranceId, () => {
    document.body.classList.add("indoor-arrival");
  });
  location.assign(indoor.url);
}

window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  document.body.classList.remove("entering-indoor", "indoor-arrival");
  $("#map-view").inert = false;
  map?.restoreBuildingFlight();
});
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

// ===== 현장 공사 신고 (GPS 위치 + 앱 안 카메라) =====
// 스윙·지쿠터처럼 지금 그 자리에서만 신고합니다. 위치는 GPS로 잡고(정확도 50m 이내, 캠퍼스 안),
// 다른 길이면 GPS 위치 30m 안에서만 다시 고를 수 있습니다. 사진은 앱 안 카메라로만 찍습니다(앨범 X).
// ponytail: GPS 위치를 조작하는 앱까지는 막지 못합니다. 더 막으려면 서버(Edge Function)에서 검증하세요.
const REPORT_MAX_ACCURACY = 50,
  REPORT_ADJUST_RADIUS = 30;
let reportOrigin = null; // 신고를 시작할 때 잡은 GPS 위치 {x, z, accuracy}
function setReporting(value) {
  reporting = value;
  $("#report-start").classList.toggle("active", value);
  $("#report-start").setAttribute("aria-pressed", String(value));
  $("#report-start").textContent = value
    ? "× 구간 선택 취소"
    : "⚠ 공사 구간 신고";
  $("#report-picker").hidden = !value;
  map?.setReporting(value);
  if (!value) {
    map?.clearReportSelection();
    reportOrigin = null;
    if (gpsWatchId === null) map?.setUserLocation(null);
  }
  if (value) {
    closeBuildingPopover();
    $("#campus-map canvas")?.focus({ preventScroll: true });
  }
}
function startFieldReport() {
  if (!window.isSecureContext || !navigator.geolocation) {
    toast("현장 신고는 https 주소에서 위치 권한을 허용해야 할 수 있어요.");
    return;
  }
  toast("현재 위치를 확인하고 있어요…");
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      if (coords.accuracy > REPORT_MAX_ACCURACY) {
        toast(
          `GPS 정확도가 낮아요(약 ${Math.round(coords.accuracy)}m). 하늘이 트인 곳에서 다시 시도해주세요.`,
        );
        return;
      }
      const point = gpsToCampus(
        coords.latitude,
        coords.longitude,
        CAMPUS_GEOMETRY.meta,
      );
      const nearest = point && nearestGraphNode(point);
      if (!nearest || nearest.distance > 350) {
        toast("캠퍼스 안에서만 신고할 수 있어요.");
        return;
      }
      const selection = locateReportPoint(
        point,
        EDGES,
        NODES,
        REPORT_ADJUST_RADIUS,
      );
      if (!selection) {
        toast(
          `현재 위치 ${REPORT_ADJUST_RADIUS}m 안에 길이 없어요. 길 가까이에서 다시 시도해주세요.`,
        );
        return;
      }
      reportOrigin = { ...point, accuracy: coords.accuracy };
      setReporting(true);
      map?.setUserLocation(reportOrigin, { follow: true });
      map?.previewReportSelection(selection);
      openRoadReport(selection);
    },
    (error) =>
      toast(
        error.code === 1
          ? "위치 권한이 꺼져 있어요. 브라우저 설정에서 위치 권한을 허용해주세요."
          : "현재 위치를 확인하지 못했어요. 잠시 후 다시 시도해주세요.",
      ),
    { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 },
  );
}
$("#report-start").onclick = () =>
  reporting ? setReporting(false) : startFieldReport();
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
  if (!existing) {
    if (!reportOrigin) {
      toast("⚠ 공사 신고 버튼을 눌러 현재 위치에서 신고해주세요.");
      return;
    }
    const away = Math.hypot(
      selection.point.x - reportOrigin.x,
      selection.point.z - reportOrigin.z,
    );
    if (away > REPORT_ADJUST_RADIUS) {
      map?.clearReportSelection();
      toast(
        `현재 위치(파란 점)에서 ${REPORT_ADJUST_RADIUS}m 안의 길만 고를 수 있어요.`,
      );
      return;
    }
  }
  selectedReport = existing || selection;
  const cluster = existing && clusterOf(existing.id, clusters),
    mine = existing && isMyReport(existing),
    locked = cluster?.status === "confirmed";
  const locationCard = $("#report-location"),
    locationIcon = document.createElement("span"),
    locationCopy = document.createElement("span"),
    locationName = document.createElement("b"),
    locationDetail = document.createElement("small"),
    locationStatus = document.createElement("span");
  locationIcon.className = "report-location-icon";
  locationIcon.textContent = "⌾";
  locationName.textContent = reportLocation(selectedReport).replace(
    " · 선택한 도로 구간",
    "",
  );
  locationDetail.textContent = existing ? reasonLabel(existing) : "선택한 도로 구간";
  locationStatus.className = "report-location-status";
  locationStatus.textContent = existing ? reportStatusLabel(existing) : "GPS 확인됨";
  locationCopy.append(locationName, locationDetail);
  locationCard.replaceChildren(locationIcon, locationCopy, locationStatus);
  $("#report-title").textContent = !existing
    ? "길 막힘 신고"
    : mine
      ? "이 구간에 내 신고가 있어요."
      : "이 구간의 신고";
  $("#report-reasons").hidden = !!existing;
  $("#new-report-actions").hidden = !!existing;
  $("#existing-report-actions").hidden = !existing;
  // 익명 기기 ID는 본인 증명이 아니므로 삭제는 관리자만 처리합니다.
  $("#report-remove").hidden = true;
  $("#report-photo-field").hidden = !!existing;
  resetCamera();
  $('input[name="road-reason"][value="construction"]').checked = true;
  $("#report-reason-note").value = "";
  $("#report-reason-note").hidden = true;
  updateReportSubmit();
  // 사진은 내 신고이거나, 확정된 구역의 대표 사진일 때만 사용자에게 보여 줍니다.
  // 노란색(검토 전) 단계의 다른 사람 사진은 관리자만 봅니다.
  const showPhoto = mine || (locked && cluster.cover.id === existing.id);
  const existingPhotoUrl = showPhoto && photoUrlFor(existing.photoPath);
  $("#report-existing-photo").hidden = !existingPhotoUrl;
  if (existingPhotoUrl) $("#report-existing-photo").src = existingPhotoUrl;
  $("#report-dialog .report-scope").textContent = existing
    ? `${reasonLabel(existing)} · ${reportStatusLabel(existing)} · ` +
      (locked
        ? "관리자가 확정한 신고라 삭제할 수 없어요. 공사가 끝나면 관리자가 해제합니다."
        : mine
          ? "내가 올린 신고예요. 삭제가 필요하면 관리자에게 요청해 주세요."
          : "다른 사람이 올린 신고예요.")
    : `신고 ${REPORT_THRESHOLD}건부터 지도에 표시돼요. 관리자가 확인하면 우회 경로에 반영됩니다.`;
  $("#report-dialog").showModal();
  if (!existing) startCamera();
}
let submittingReport = false;
// 사진이 있고, 기타 사유면 글까지 써야 신고 버튼이 켜집니다.
function updateReportSubmit() {
  const other = $('input[name="road-reason"]:checked').value === "other";
  $("#report-yes").disabled =
    submittingReport || !selectedPhotoFile || (other && !$("#report-reason-note").value.trim());
}
for (const radio of $$('input[name="road-reason"]'))
  radio.onchange = () => {
    const other = radio.value === "other" && radio.checked;
    $("#report-reason-note").hidden = !other;
    if (other) $("#report-reason-note").focus();
    updateReportSubmit();
  };
$("#report-reason-note").oninput = updateReportSubmit;
// 앱 안 카메라: 촬영과 다시 찍기만 있고 앨범 사진은 고를 수 없습니다.
let cameraStream = null,
  photoTakenAt = null;
function stopCamera() {
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  $("#report-camera").srcObject = null;
}
function resetCamera() {
  stopCamera();
  if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
  photoPreviewUrl = null;
  selectedPhotoFile = null;
  photoTakenAt = null;
  for (const id of [
    "#report-photo-preview",
    "#report-camera",
    "#report-shoot",
    "#report-retake",
    "#report-camera-error",
  ])
    $(id).hidden = true;
  updateReportSubmit();
}
function cameraError(message) {
  $("#report-camera-error").textContent = message;
  $("#report-camera-error").hidden = false;
}
async function startCamera() {
  resetCamera();
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraError(
      "이 브라우저에서는 카메라를 쓸 수 없어요. https 주소에서 열어주세요.",
    );
    return;
  }
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
  } catch {
    cameraError(
      "카메라 권한이 필요해요. 브라우저 설정에서 카메라를 허용해주세요.",
    );
    return;
  }
  // 권한을 묻는 사이 신고 창을 닫았으면 카메라를 바로 끕니다.
  if (!$("#report-dialog").open) return stopCamera();
  const video = $("#report-camera");
  video.srcObject = cameraStream;
  video.hidden = false;
  $("#report-shoot").hidden = false;
  await video.play().catch(() => {});
}
$("#report-shoot").onclick = () => {
  const video = $("#report-camera");
  if (!video.videoWidth) return;
  const scale = Math.min(1, 1600 / video.videoWidth),
    canvas = document.createElement("canvas");
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      stopCamera();
      selectedPhotoFile = new File([blob], "photo.jpg", { type: "image/jpeg" });
      photoTakenAt = new Date().toISOString();
      photoPreviewUrl = URL.createObjectURL(blob);
      $("#report-photo-preview").src = photoPreviewUrl;
      $("#report-photo-preview").hidden = false;
      video.hidden = true;
      $("#report-shoot").hidden = true;
      $("#report-retake").hidden = false;
      updateReportSubmit();
    },
    "image/jpeg",
    0.85,
  );
};
$("#report-retake").onclick = () => startCamera();
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
  clusters = clusterReports(reports);
  map?.setReports(reports);
  renderReportList();
  renderAdminAlert();
  renderAdminPanel();
  updateRoute();
}
$("#report-yes").onclick = async () => {
  if (submittingReport || !selectedReport?.point) return;
  const reason = $('input[name="road-reason"]:checked').value,
    reasonNote = $("#report-reason-note").value.trim();
  if (!selectedPhotoFile) {
    toast("현장 사진을 찍어 올려야 신고할 수 있어요.");
    return;
  }
  if (!reportOrigin) {
    toast("⚠ 공사 신고 버튼을 눌러 현재 위치에서 다시 신고해주세요.");
    return;
  }
  if (reason === "other" && !reasonNote) {
    toast("기타 사유를 적어주세요.");
    return;
  }
  const { edgeId, point } = selectedReport;
  const gps = reportOrigin;
  const takenAt = photoTakenAt;
  submittingReport = true;
  updateReportSubmit();
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
        edgeId,
        point,
        reason,
        reasonNote,
        photoPath,
        gps,
        takenAt,
      });
    } catch {
      toast("신고 저장에 실패했어요. 다시 시도해주세요.");
      return;
    }
  } finally {
    submittingReport = false;
    updateReportSubmit();
  }
  setReporting(false);
  $("#report-dialog").close();
  $("#report-success-dialog").showModal();
  await loadReports();
};
// 이 기기에서 올린 신고인지(기기 ID 비교). 기기 ID가 없는 예전 신고는 내 신고로 보지 않습니다.
function isMyReport(report) {
  return !!report.deviceId && report.deviceId === getDeviceId();
}
$("#report-remove").onclick = async () => {
  if (
    !isMyReport(selectedReport) ||
    clusterOf(selectedReport.id, clusters)?.status === "confirmed"
  )
    return;
  try {
    await deleteReportRows([selectedReport.id]);
  } catch {
    toast("삭제에 실패했어요. 다시 시도해주세요.");
    return;
  }
  $("#report-dialog").close();
  await loadReports();
};
$("#report-dialog").addEventListener("close", () => {
  stopCamera();
  if (!selectedReport?.id) map?.clearReportSelection();
});
// 신고 상태를 사람이 읽을 문구로 바꿉니다: 접수 → 주의(노란색) → 관리자 확정(빨간색).
function reportStatusLabel(report) {
  const status = clusterOf(report.id, clusters)?.status;
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
// 30m 안 신고를 구역으로 묶어 보여 줍니다. 구역마다 신고 사진을 모두 보고, 엉뚱한 신고는 하나씩 빼고,
// 대표 사진을 골라 확정합니다(대표 사진은 사용자에게 빨간색 표시와 함께 보입니다).
// 사용자 입력(기타 사유 글)이 들어가므로 innerHTML 대신 textContent만 씁니다.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function adminButton(label, act, onClick) {
  const button = el("button", "", label);
  button.type = "button";
  button.dataset.act = act;
  button.onclick = onClick;
  return button;
}
async function adminAction(work, failMessage) {
  try {
    await work();
  } catch {
    toast(failMessage);
    return;
  }
  await loadReports();
}
function clusterHeading(li, cluster, summary) {
  li.append(
    el("b", "", reportLocation(cluster.cover)),
    el("small", "", summary),
  );
}
// 사진 한 장: 고르기(라디오) + 사유·시각 + 크게 보기 + 이 신고만 빼기
function enablePhotoDrag(photos) {
  photos.tabIndex = 0;
  photos.setAttribute("aria-label", "신고 사진 목록, 좌우로 스크롤");
  let drag = null;
  let suppressClick = false;
  photos.addEventListener("pointerdown", (event) => {
    // 터치는 브라우저의 기본 스크롤을 사용하고 버튼·라디오는 그대로 작동합니다.
    if (event.pointerType !== "mouse" || event.button !== 0 ||
        event.target.closest("button, a, input")) return;
    suppressClick = false;
    drag = { id: event.pointerId, x: event.clientX, left: photos.scrollLeft, moved: false };
  });
  photos.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const offset = event.clientX - drag.x;
    if (!drag.moved && Math.abs(offset) < 6) return;
    drag.moved = true;
    photos.setPointerCapture(event.pointerId);
    photos.classList.add("is-dragging");
    photos.scrollLeft = drag.left - offset;
    event.preventDefault();
  });
  const finish = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    suppressClick = drag.moved;
    drag = null;
    photos.classList.remove("is-dragging");
    if (photos.hasPointerCapture(event.pointerId)) photos.releasePointerCapture(event.pointerId);
  };
  photos.addEventListener("pointerup", finish);
  photos.addEventListener("pointercancel", finish);
  photos.addEventListener("pointerleave", (event) => {
    if (drag && !drag.moved) finish(event);
  });
  photos.addEventListener("click", (event) => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
}
function photoCard(cluster, report, { selectable }) {
  const card = el("li", "admin-photo");
  const label = el("label");
  if (selectable) {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `cover-${cluster.id}`;
    radio.value = report.id;
    radio.checked = report.id === cluster.cover.id;
    radio.setAttribute("aria-label", "대표 사진으로 고르기");
    label.append(radio);
  }
  const url = photoUrlFor(report.photoPath);
  if (url) {
    const img = el("img");
    img.src = url;
    img.alt = `${reasonLabel(report)} 신고 사진`;
    img.loading = "lazy";
    img.draggable = false;
    label.append(img);
  } else label.append(el("span", "admin-photo-empty", "사진 없음"));
  // 촬영 시각과, 촬영한 GPS 위치에서 신고 지점까지 거리·GPS 정확도(현장 신고 판단 근거)
  const away = gpsDistance(report),
    gpsInfo =
      away === null
        ? "GPS 정보 없음"
        : `촬영 위치에서 ${Math.round(away)}m · GPS ±${Math.round(report.gps.accuracy ?? 0)}m`;
  card.append(
    label,
    el(
      "small",
      "",
      `${reasonLabel(report)} · ${new Date(report.takenAt || report.createdAt).toLocaleString("ko-KR")}`,
    ),
    el("small", "admin-photo-gps", gpsInfo),
  );
  const actions = el("div", "admin-photo-actions");
  if (url) {
    const open = el("a", "", "크게 보기");
    open.href = url;
    open.target = "_blank";
    open.rel = "noopener";
    actions.append(open);
  }
  if (selectable && cluster.reports.length > 1)
    actions.append(
      adminButton("이 신고 빼기", "remove-one", () =>
        adminAction(
          () => deleteReportRows([report.id]),
          "신고를 빼지 못했어요. 다시 시도해주세요.",
        ),
      ),
    );
  card.append(actions);
  return card;
}
function renderAdminSection(listId, emptyId, list) {
  $(emptyId).hidden = list.length > 0;
  $(listId).replaceChildren();
  for (const cluster of list) {
    const li = el("li", "admin-item");
    clusterHeading(
      li,
      cluster,
      `신고 ${cluster.count}건 · 최근 ${new Date(cluster.latestAt).toLocaleString("ko-KR")}`,
    );
    const photos = el("ul", "admin-photos");
    enablePhotoDrag(photos);
    for (const report of cluster.reports)
      photos.append(photoCard(cluster, report, { selectable: true }));
    const ids = cluster.reports.map((r) => r.id);
    const actions = el("div", "admin-actions");
    actions.append(
      adminButton("고른 사진으로 확정 · 통행 막힘", "confirm", () => {
        const coverId =
          li.querySelector(`input[name="cover-${cluster.id}"]:checked`)
            ?.value || cluster.cover.id;
        adminAction(
          () => confirmReportRows(ids, coverId),
          "확정 처리에 실패했어요. 다시 시도해주세요.",
        );
      }),
      adminButton("반려 · 신고 취소", "dismiss", () =>
        adminAction(
          () => deleteReportRows(ids),
          "반려 처리에 실패했어요. 다시 시도해주세요.",
        ),
      ),
    );
    li.append(photos, actions);
    $(listId).append(li);
  }
}
// 확정된(빨간색) 구역: 사용자에게 보이는 대표 사진과 함께 보여 주고, 공사가 끝나면 해제합니다.
function renderConfirmedSection() {
  const list = clusters.filter((c) => c.status === "confirmed");
  $("#admin-empty-confirmed").hidden = list.length > 0;
  $("#admin-list-confirmed").replaceChildren();
  for (const cluster of list) {
    const li = el("li", "admin-item");
    clusterHeading(
      li,
      cluster,
      `통행 막힘(확정) · 신고 ${cluster.count}건 · 사용자에게 보이는 대표 사진`,
    );
    const photos = el("ul", "admin-photos");
    enablePhotoDrag(photos);
    photos.append(photoCard(cluster, cluster.cover, { selectable: false }));
    const actions = el("div", "admin-actions");
    actions.append(
      adminButton("해제 · 공사 끝남", "release", async () => {
        await adminAction(
          () => deleteReportRows(cluster.reports.map((r) => r.id)),
          "확정 해제에 실패했어요. 다시 시도해주세요.",
        );
        toast("확정을 해제했어요. 이 구간은 다시 경로에 포함돼요.");
      }),
    );
    li.append(photos, actions);
    $("#admin-list-confirmed").append(li);
  }
}
function renderAdminPanel() {
  renderConfirmedSection();
  const open = clusters.filter((c) => c.status !== "confirmed");
  renderAdminSection(
    "#admin-list-urgent",
    "#admin-empty-urgent",
    open.filter((c) => c.needsReview),
  );
  renderAdminSection(
    "#admin-list-minor",
    "#admin-empty-minor",
    open.filter((c) => !c.needsReview),
  );
}
// 진입 버튼은 누구나 보지만 검토 건수는 관리자 세션이 확인된 뒤에만 보여줍니다.
function renderAdminAlert() {
  const count = adminAuthenticated
    ? clusters.filter((c) => c.needsReview).length
    : 0;
  for (const id of [
    "#admin-alert-count",
    "#v2-admin-count",
    "#side-alert-count",
    "#admin-menu-count",
  ]) {
    $(id).textContent = count;
    $(id).hidden = count === 0;
  }
}
// 관리자 화면은 ?admin=1에서만 노출하고, 실제 권한은 Supabase Auth + RLS가 검사합니다.
$("#admin-toggle").hidden = !new URLSearchParams(location.search).has("admin");
function openAdminPanel() {
  renderAdminPanel();
  renderWorkList();
  $("#admin-dialog").showModal();
}
// ===== 관리자·편집기 진입 (사이드바·모바일 버튼) =====
// 관리자 계정으로 로그인한 뒤 편집기(?edit)와 관리자 검토 중 하나를 고릅니다.
// 권한은 Supabase Auth(관리자 역할)가 확인합니다.
let afterAdminLogin = openAdminPanel;
function openAdminMenu() {
  $("#admin-menu-editor-title").textContent = EDIT_MODE
    ? "편집기 닫기"
    : "편집기 열기";
  const count = $("#admin-alert-count").textContent;
  $("#admin-menu-count").textContent = count;
  $("#admin-menu-count").hidden = !Number(count);
  $("#admin-menu-dialog").showModal();
}
async function openAdminEntry() {
  try {
    if (await getAdminSession()) return openAdminMenu();
  } catch {
    toast("관리자 로그인 상태를 확인하지 못했어요.");
    return;
  }
  afterAdminLogin = openAdminMenu;
  $("#admin-login-error").hidden = true;
  $("#admin-login-dialog").showModal();
}
$("#v2-admin").onclick = () => openAdminEntry();
// ?edit 주소로 들어오면 관리자 로그인부터 확인하고, 관리자일 때만 편집기를 켭니다.
// 로그인 창을 그냥 닫으면 편집기 없이 일반 지도 화면으로 둡니다.
async function startEditModeAfterLogin(ctx) {
  // 편집기가 켜지면 관리자·편집기 버튼을 눌린(active) 상태로 보여 줍니다.
  const start = () => {
    setupEditMode(ctx);
    if (!$("#graph-overlay-toggle")) return;
    side("alerts").setAttribute("aria-pressed", "true");
    $("#v2-admin").setAttribute("aria-pressed", "true");
  };
  try {
    if (await getAdminSession()) return start();
  } catch {
    toast("관리자 로그인 상태를 확인하지 못해 편집기를 열지 않았어요.");
    return;
  }
  afterAdminLogin = start;
  $("#admin-login-error").hidden = true;
  $("#admin-login-dialog").showModal();
  // 로그인 창이 닫히는 순간(open 속성이 빠질 때)을 지켜보다가, 편집기가 켜지지 않았으면 안내합니다.
  const watcher = new MutationObserver(() => {
    if ($("#admin-login-dialog").open) return;
    watcher.disconnect();
    setTimeout(() => {
      if (!$("#graph-overlay-toggle"))
        toast("편집기는 관리자 로그인 후에 쓸 수 있어요.");
    });
  });
  watcher.observe($("#admin-login-dialog"), {
    attributes: true,
    attributeFilter: ["open"],
  });
}
$("#admin-menu-editor").onclick = () => {
  // 편집기는 주소의 ?edit로 켜고 끕니다(지금 보던 화면 주소는 그대로).
  const url = new URL(location.href);
  if (EDIT_MODE) url.searchParams.delete("edit");
  else url.searchParams.set("edit", "1");
  location.assign(url.href);
};
$("#admin-menu-review").onclick = () => {
  $("#admin-menu-dialog").close();
  openAdminPanel();
};
$("#admin-menu-logout").onclick = async () => {
  try {
    await signOutAdmin();
  } catch {
    toast("로그아웃하지 못했어요. 다시 시도해 주세요.");
    return;
  }
  $("#admin-menu-dialog").close();
  toast("관리자 계정에서 로그아웃했어요.");
};
$("#admin-toggle").onclick = async () => {
  try {
    if (await getAdminSession()) return openAdminPanel();
    afterAdminLogin = openAdminPanel;
  } catch {
    toast("관리자 로그인 상태를 확인하지 못했어요.");
    return;
  }
  $("#admin-login-error").hidden = true;
  $("#admin-login-dialog").showModal();
};
$("#admin-login-form").onsubmit = async (event) => {
  event.preventDefault();
  const button = $("#admin-login-submit"),
    error = $("#admin-login-error");
  button.disabled = true;
  error.hidden = true;
  try {
    await signInAdmin($("#admin-email").value.trim(), $("#admin-password").value);
  } catch {
    error.textContent = "관리자 계정 또는 비밀번호를 확인해 주세요.";
    error.hidden = false;
    return;
  } finally {
    button.disabled = false;
  }
  $("#admin-password").value = "";
  $("#admin-login-dialog").close();
  afterAdminLogin();
};
$("#admin-logout").onclick = async () => {
  try {
    await signOutAdmin();
  } catch {
    toast("로그아웃하지 못했어요. 다시 시도해 주세요.");
    return;
  }
  $("#admin-dialog").close();
  toast("관리자 계정에서 로그아웃했어요.");
};

// 초기 세션 복원·로그인·로그아웃·토큰 갱신 때 같은 권한 기준으로 배지를 갱신합니다.
// 콜백에서는 Auth API를 다시 호출하지 않고 전달받은 세션만 확인합니다.
supabase.auth.onAuthStateChange((_event, session) => {
  adminAuthenticated = isAdminUser(session?.user);
  renderAdminAlert();
});

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
// 관리자 창은 열어 둔 채 기다리는 화면이라 열려 있어도 갱신합니다.
// ponytail: 10초 폴링. 즉시 반영이 필요하면 Supabase Realtime 구독으로 바꾸세요.
function refreshShared() {
  if (document.hidden || reporting || $("#report-dialog").open) return;
  loadReports();
  loadWorks();
}
setInterval(refreshShared, 10000);
document.addEventListener("visibilitychange", refreshShared);
