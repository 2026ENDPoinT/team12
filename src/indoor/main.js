// 미래관 실내 지도 페이지: 검색 → 경로 → 미리 걷기 / AR 길안내
import { createIndoor, floorLabel, floorName } from "./model.mjs";
import { buildSteps, routeMetrics, pointAt, walkMinutes } from "./guide.mjs";
import { createView } from "./view.js";
import { openAR } from "./ar/ar.js";

const A = "assets/";
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const params = new URLSearchParams(location.search);

const state = {
  start: null, // {kind:'entrance'|'place', id, name, f, x, y}
  dest: null,
  mode: "stairs",
  route: null,
  steps: null,
  sheet: "home",
};
let indoor,
  view,
  entrances,
  sv = null;

function toast(msg, ms = 2600) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast.h);
  toast.h = setTimeout(() => (t.hidden = true), ms);
}

// ---------- 시작
async function init() {
  const bar = $("#load-bar");
  const [M, E] = await Promise.all([
    fetch(A + "mirae.json").then((r) => r.json()),
    fetch(A + "entrances.json").then((r) => r.json()),
  ]);
  bar.style.width = "15%";
  indoor = createIndoor(M);
  entrances = E.entrances;
  view = createView($("#view"), indoor, { onPick });
  buildFloors();
  await view.load(
    A + "mirae.glb",
    (p) => (bar.style.width = `${15 + p * 85}%`),
  );
  $("#loading").classList.add("done");
  setTimeout(() => ($("#loading").hidden = true), 450);

  // 캠퍼스 지도에서 넘어온 경우: ?from=futureDoor (캠퍼스 노드) 또는 출입구 id
  const from = params.get("from");
  const ent =
    entrances.find((e) => e.id === from || e.campusNode === from) ||
    entrances[0];
  setStart(entranceStart(ent));
  if (from)
    $("#home-from").textContent =
      `캠퍼스 경로가 ${ent.name}로 이어졌어요. 가려는 호실을 검색해 보세요.`;
  view.setFloor(ent.f, true);
  syncFloors();

  const to = params.get("to");
  const d = to && (indoor.findDest(to) || indoor.search(to)[0]);
  if (d) {
    state.dest = d;
    computeRoute();
    if (params.has("ar")) $("#ar-open").focus();
  }
  if (params.has("demo")) startDemo();
}

function entranceStart(e) {
  return {
    kind: "entrance",
    id: e.id,
    name: e.name,
    f: e.f,
    x: e.p[0],
    y: e.p[1],
  };
}
function placeStart(d) {
  const p = d.doors[0];
  const s = indoor.nearest(d.f, p[0], p[1], 6) || p;
  return {
    kind: "place",
    id: d.key,
    name: `${d.title}${d.name ? " " + d.name : ""}`,
    f: d.f,
    x: s[0],
    y: s[1],
  };
}
function setStart(s) {
  state.start = s;
  view.setMe({ x: s.x, y: s.y, f: s.f });
}

// ---------- 층 버튼
function buildFloors() {
  const nav = $("#floors");
  nav.replaceChildren();
  for (const n of [...indoor.floors].sort((a, b) => b - a)) {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.f = n;
    b.textContent = floorLabel(n);
    b.setAttribute("aria-label", floorName(n));
    b.onclick = () => {
      view.setFloor(n);
      syncFloors();
      view.setMe(state.start);
    };
    nav.append(b);
  }
}
function syncFloors() {
  const rf = new Set(state.route ? state.route.pts.map((p) => p.f) : []);
  for (const b of $$("#floors button")) {
    b.classList.toggle("on", +b.dataset.f === view.floor);
    b.classList.toggle("has-route", rf.has(+b.dataset.f));
  }
}
$("#recenter").onclick = () => {
  if (state.route) frameRoute();
  else view.frame();
};

// ---------- 지도에서 방 탭
function onPick(x, y, f) {
  const room = indoor.roomAt(f, x, y);
  let d =
    room && indoor.destinations.find((e) => e.f === f && e.id === room.id);
  if (!d) {
    // 문 근처 탭도 인정
    let best = null;
    for (const e of indoor.destinations) {
      if (e.f !== f) continue;
      for (const p of e.doors) {
        const dd = Math.hypot(p[0] - x, p[1] - y);
        if (dd < 2.2 && (!best || dd < best[0])) best = [dd, e];
      }
    }
    d = best && best[1];
  }
  if (d) showPlace(d);
}

// ---------- 시트
function setSheet(name) {
  state.sheet = name;
  for (const k of ["home", "place", "route"])
    $(`#sheet-${k}`).hidden = k !== name;
  $("#sheet").classList.remove("collapsed");
  $("#sheet").classList.toggle("route-mode", name === "route");
}
$("#sheet-handle").onclick = () => $("#sheet").classList.toggle("collapsed");
function showPlace(d) {
  state.pending = d;
  view.select(d);
  $("#place-floor").textContent = floorLabel(d.f);
  $("#place-title").textContent = d.title;
  $("#place-sub").textContent = [
    d.name,
    d.catLabel && d.catLabel !== d.name ? d.catLabel : "",
    floorName(d.f),
  ]
    .filter(Boolean)
    .join(" · ");
  setSheet("place");
  const p = d.center || d.doors[0];
  view.focus(p[0], p[1], d.f, 48);
  syncFloors();
}
$("#place-close").onclick = () => {
  view.select(null);
  setSheet(state.route ? "route" : "home");
};
$("#place-route").onclick = () => {
  state.dest = state.pending;
  computeRoute();
};
$("#place-from").onclick = () => {
  setStart(placeStart(state.pending));
  toast(`${state.pending.title}에서 출발해요. 이제 도착지를 검색해 주세요.`);
  if (state.dest && state.dest.key !== state.pending.key) computeRoute();
  else {
    view.select(null);
    setSheet("home");
    openSearch();
  }
};

// ---------- 검색
function openSearch(mode = "dest") {
  state.searchMode = mode;
  $("#search").hidden = false;
  $("#search-input").value = "";
  $("#search-input").placeholder =
    mode === "origin"
      ? "어디에서 출발하나요? (호실·이름)"
      : "313, 네트워크, 화장실, 교수 이름";
  renderResults("");
  setTimeout(() => $("#search-input").focus(), 50);
}
function closeSearch() {
  $("#search").hidden = true;
  $("#search-input").blur();
}
$("#search-open").onclick = () => openSearch();
$("#search-close").onclick = closeSearch;
$("#search-input").addEventListener("input", (e) =>
  renderResults(e.target.value),
);
$("#search-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const first = $("#search-results li[data-key]");
    first?.click();
  } else if (e.key === "Escape") closeSearch();
});
function renderResults(q) {
  const ul = $("#search-results");
  ul.replaceChildren();
  let list;
  if (q.trim()) {
    list = indoor.search(q, 40);
    $("#search-hint").textContent = list.length
      ? `${list.length}곳`
      : "검색 결과가 없어요. 호실 번호나 이름 일부로 찾아보세요.";
  } else {
    list = indoor.destinations.filter((d) => d.numbered);
    $("#search-hint").textContent =
      "층별 호실 목록 · 번호나 실 이름, 교수 이름으로 찾을 수 있어요";
  }
  let lastF = null;
  for (const d of list) {
    if (!q.trim() && d.f !== lastF) {
      const g = document.createElement("li");
      g.className = "group";
      g.textContent = floorName(d.f);
      ul.append(g);
      lastF = d.f;
    }
    const li = document.createElement("li");
    li.dataset.key = d.key;
    const tag = document.createElement("span");
    tag.className = "floor-tag" + (d.f === 0 ? " b1" : "");
    tag.textContent = floorLabel(d.f);
    const box = document.createElement("div");
    const b = document.createElement("b");
    b.textContent = d.title;
    const s = document.createElement("small");
    s.textContent = [d.name, d.numbered ? d.catLabel : floorName(d.f)]
      .filter(Boolean)
      .join(" · ");
    box.append(b, s);
    li.append(tag, box);
    li.onclick = () => {
      closeSearch();
      if (state.searchMode === "origin") {
        setStart(placeStart(d));
        refreshFromSelect();
        if (state.dest) computeRoute();
      } else showPlace(d);
    };
    ul.append(li);
  }
}
for (const b of $$("#quick-chips button"))
  b.onclick = () => {
    openSearch();
    $("#search-input").value = b.dataset.q;
    renderResults(b.dataset.q);
  };

// ---------- 경로
function refreshFromSelect() {
  const sel = $("#route-from");
  sel.replaceChildren();
  for (const e of entrances) sel.append(new Option(e.name, `e:${e.id}`));
  if (state.start.kind === "place")
    sel.append(new Option(state.start.name, `p:${state.start.id}`));
  sel.append(new Option("다른 호실에서 출발…", "pick"));
  sel.value =
    state.start.kind === "entrance"
      ? `e:${state.start.id}`
      : `p:${state.start.id}`;
}
$("#route-from").onchange = (e) => {
  const v = e.target.value;
  if (v === "pick") {
    refreshFromSelect();
    openSearch("origin");
    return;
  }
  if (v.startsWith("e:"))
    setStart(entranceStart(entrances.find((x) => `e:${x.id}` === v)));
  computeRoute();
};
$("#route-to").onclick = () => openSearch();
$("#route-close").onclick = () => {
  state.route = null;
  state.dest = null;
  view.clearRoute();
  view.select(null);
  setSheet("home");
  syncFloors();
};
for (const b of $$(".seg button"))
  b.onclick = () => {
    state.mode = b.dataset.mode;
    for (const x of $$(".seg button")) {
      x.classList.toggle("on", x === b);
      x.setAttribute("aria-checked", x === b);
    }
    computeRoute();
  };

function computeRoute() {
  const d = state.dest;
  if (!d) return;
  const r = indoor.routeTo(state.start, d, { mode: state.mode });
  refreshFromSelect();
  $("#route-to").textContent = `${d.title}${d.name ? " " + d.name : ""}`;
  setSheet("route");
  const sum = $("#route-summary");
  sum.replaceChildren();
  $("#route-steps").replaceChildren();
  if (!r) {
    state.route = null;
    view.clearRoute();
    const w = document.createElement("span");
    w.className = "warn";
    w.textContent =
      state.mode === "elevator"
        ? `계단 없이 ${floorName(d.f)}에 갈 수 있는 길이 등록되어 있지 않아요.`
        : "경로를 찾지 못했어요.";
    sum.append(w);
    $("#ar-open").disabled = $("#walk-open").disabled = true;
    syncFloors();
    return;
  }
  $("#ar-open").disabled = $("#walk-open").disabled = false;
  state.route = r;
  state.steps = buildSteps(r, d);
  const b = document.createElement("b");
  b.textContent = `${Math.round(r.len)}m`;
  const s = document.createElement("span");
  const v = state.steps
    .filter((st) => st.dir.startsWith("stair") || st.dir === "elev")
    .map(
      (st) =>
        `${st.dir === "elev" ? "엘리베이터" : "계단"} ${floorLabel(st.f)}→${floorLabel(st.to)}`,
    );
  s.textContent = [`약 ${walkMinutes(r.len)}`, ...v].join(" · ");
  sum.append(b, s);
  renderSteps();
  $("#sheet").scrollTop = 0;
  view.showRoute(r, d);
  view.setFloor(r.pts[0].f);
  view.setMe(state.start);
  frameRoute();
  syncFloors();
}
function sheetCover() {
  // 휴대폰: 아래 시트가 가리는 높이 / 넓은 화면은 왼쪽 패널이라 0
  return innerWidth >= 820
    ? 0
    : $("#sheet").classList.contains("collapsed")
      ? 64
      : $("#sheet").offsetHeight;
}
function frameRoute() {
  const P = state.route.pts.filter((p) => p.f === view.floor);
  const use = P.length ? P : state.route.pts;
  let x0 = Infinity,
    x1 = -Infinity,
    y0 = Infinity,
    y1 = -Infinity;
  for (const p of use) {
    x0 = Math.min(x0, p.x);
    x1 = Math.max(x1, p.x);
    y0 = Math.min(y0, p.y);
    y1 = Math.max(y1, p.y);
  }
  view.fit(x0, y0, x1, y1, use[0].f, sheetCover());
}

const STEP_ICON = {
  start: "↑",
  straight: "↑",
  left: "←",
  right: "→",
  "slight-left": "↖",
  "slight-right": "↗",
  "u-left": "↶",
  "u-right": "↷",
  "stair-up": "⇡",
  "stair-down": "⇣",
  elev: "⇅",
  arrive: "✦",
};
async function loadSV() {
  if (!sv) sv = await fetch(A + "sv.json").then((r) => r.json());
  return sv;
}
// 안내 지점에서 진행 방향으로 찍힌 실제 사진 고르기
function photoFor(step, nextPt) {
  if (!sv || !step.at) return null;
  const h = nextPt
    ? (Math.atan2(nextPt[1] - step.at[1], nextPt[0] - step.at[0]) * 180) /
      Math.PI
    : null;
  let best = null;
  for (const s of sv.shots) {
    if (s.f !== step.f) continue;
    const d = Math.hypot(s.x - step.at[0], s.y - step.at[1]);
    if (d > 3.5) continue;
    const a =
      h == null ? 0 : Math.abs(((((s.yaw - h) % 360) + 540) % 360) - 180);
    if (a > 45) continue;
    const sc = d + a * 0.05;
    if (!best || sc < best[0]) best = [sc, s];
  }
  return best && best[1];
}
function photoNear(x, y, f, yaw) {
  if (!sv) return null;
  let best = null;
  for (const s of sv.shots) {
    if (s.f !== f) continue;
    const d = Math.hypot(s.x - x, s.y - y);
    if (d > 3) continue;
    const a = Math.abs(((((s.yaw - yaw) % 360) + 540) % 360) - 180);
    if (a > 40) continue;
    const sc = d + a * 0.04;
    if (!best || sc < best[0]) best = [sc, s];
  }
  return best && best[1];
}
const photoUrl = (s) => `${A}sv/${String(s.id).padStart(5, "0")}.jpg`;

async function renderSteps() {
  const ol = $("#route-steps");
  ol.replaceChildren();
  const steps = state.steps,
    r = state.route;
  await loadSV().catch(() => null);
  if (state.steps !== steps) return;
  // 단계별 다음 점(진행 방향)
  const nextOf = (st) => {
    if (!st.at) return null;
    for (let i = 0; i < r.pts.length - 1; i++) {
      const p = r.pts[i];
      if (p.f === st.f && Math.hypot(p.x - st.at[0], p.y - st.at[1]) < 0.6) {
        for (let j = i + 1; j < r.pts.length; j++)
          if (Math.hypot(r.pts[j].x - p.x, r.pts[j].y - p.y) > 1.5)
            return [r.pts[j].x, r.pts[j].y];
      }
    }
    return null;
  };
  for (const st of steps) {
    const li = document.createElement("li");
    if (st.dir.startsWith("stair") || st.dir === "elev")
      li.className = "vertical";
    if (st.dir === "arrive") li.className = "goal";
    const ico = document.createElement("span");
    ico.className = "ico";
    ico.textContent = STEP_ICON[st.dir] || "•";
    const txt = document.createElement("div");
    txt.className = "txt";
    const b = document.createElement("b");
    b.textContent = st.text;
    const sm = document.createElement("small");
    sm.textContent =
      floorName(st.f) + (st.dir === "start" ? ` · ${state.start.name}` : "");
    txt.append(b, sm);
    li.append(ico, txt);
    const ph = st.dir === "arrive" ? null : photoFor(st, nextOf(st));
    if (ph) {
      const img = document.createElement("img");
      img.loading = "lazy";
      img.alt = "이 지점의 실제 모습";
      img.src = photoUrl(ph);
      li.append(img);
    }
    li.onclick = () => {
      if (st.at)
        view.focus(
          st.at[0],
          st.at[1],
          st.dir.startsWith("stair") || st.dir === "elev" ? st.f : st.f,
          30,
        );
      syncFloors();
      if (innerWidth < 820) $("#sheet").classList.add("collapsed");
    };
    ol.append(li);
  }
}

// ---------- 미리 걷기 (1인칭 애니메이션)
let walking = null;
$("#walk-open").onclick = async () => {
  if (!state.route) return;
  await loadSV().catch(() => null);
  const r = state.route,
    cum = routeMetrics(r);
  walking = {
    s: 0,
    cum,
    total: cum[cum.length - 1],
    yaw: null,
    last: performance.now(),
    shot: null,
  };
  $("#walk").hidden = false;
  $("#sheet").hidden = true;
  $(".topbar").hidden = true;
  $("#floors").hidden = true;
  $(".map-tools").hidden = true;
  view.setFirstPerson(true);
  requestAnimationFrame(walkStep);
};
function endWalk() {
  walking = null;
  $("#walk").hidden = true;
  $("#sheet").hidden = false;
  $(".topbar").hidden = false;
  $("#floors").hidden = false;
  $(".map-tools").hidden = false;
  view.setFirstPerson(false);
  view.setFloor(
    state.route ? state.route.pts[state.route.pts.length - 1].f : view.floor,
  );
  syncFloors();
}
$("#walk-close").onclick = endWalk;
function walkStep(now) {
  if (!walking) return;
  const w = walking,
    r = state.route;
  const dt = Math.min(0.05, (now - w.last) / 1000);
  w.last = now;
  const p = pointAt(r, w.cum, w.s);
  const slow = r.pts[p.i]?.kind !== "walk";
  w.s = Math.min(w.total, w.s + dt * (slow ? 1.4 : 2.6));
  // 2m 앞을 바라보며 부드럽게 회전
  const a = pointAt(r, w.cum, Math.min(w.total, w.s + 2.2));
  const want =
    Math.hypot(a.x - p.x, a.y - p.y) > 0.3
      ? (Math.atan2(a.y - p.y, a.x - p.x) * 180) / Math.PI
      : (w.yaw ?? 90);
  if (w.yaw == null) w.yaw = want;
  let d = ((((want - w.yaw) % 360) + 540) % 360) - 180;
  w.yaw += d * Math.min(1, dt * 3);
  view.setWalkPose({ x: p.x, y: p.y, z: p.z, f: p.f, yaw: w.yaw, pitch: -0.1 });
  $("#walk-bar").style.width = `${(w.s / w.total) * 100}%`;
  // 현재 안내
  let cur = state.steps[0];
  for (const st of state.steps) {
    if (!st.at) continue;
    const near = st.f === p.f && Math.hypot(st.at[0] - p.x, st.at[1] - p.y) < 4;
    if (near) cur = st;
  }
  const card = $("#walk-step");
  card.replaceChildren();
  const ar = document.createElement("div");
  ar.className = "hud-arrow";
  ar.textContent = STEP_ICON[cur.dir] || "↑";
  const t = document.createElement("div");
  const b = document.createElement("b");
  b.textContent = w.s >= w.total ? `${state.dest.title} 도착` : cur.text;
  const sm = document.createElement("small");
  sm.textContent = `${floorName(p.f)} · 남은 ${Math.round(w.total - w.s)}m`;
  t.append(b, sm);
  card.append(ar, t);
  // 실제 사진
  const ph = photoNear(p.x, p.y, p.f, w.yaw);
  const fig = $("#walk-photo");
  if (ph) {
    if (w.shot !== ph.id) {
      w.shot = ph.id;
      fig.querySelector("img").src = photoUrl(ph);
    }
    fig.hidden = false;
  } else fig.hidden = true;
  if (w.s >= w.total) {
    setTimeout(() => walking && endWalk(), 1600);
    return;
  }
  requestAnimationFrame(walkStep);
}

// ---------- AR
function launchAR(demo) {
  if (!state.route) return;
  openAR({
    indoor,
    route: state.route,
    steps: state.steps,
    dest: state.dest,
    mode: state.mode,
    demo,
    assets: A,
    onDemo: startDemo,
    onRoute: (r, steps) => {
      state.route = r;
      state.steps = steps;
      view.showRoute(r, state.dest);
    },
  });
}
$("#ar-open").onclick = () => launchAR(false);
$("#demo-open").onclick = startDemo;
async function startDemo() {
  const meta = await fetch(A + "demo.json").then((r) => r.json());
  const ent = entrances.find((e) => e.id === meta.from) || entrances[0];
  setStart(entranceStart(ent));
  state.dest = indoor.findDest(meta.to);
  state.mode = "stairs";
  computeRoute();
  launchAR(true);
}

init().catch((e) => {
  console.error(e);
  $("#loading").querySelector("b").textContent =
    `불러오지 못했어요: ${e.message || e}`;
});
