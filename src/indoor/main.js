// 미래관 실내 지도 페이지: 검색 → 경로 → 미리 걷기 / AR 길안내
import { createIndoor, floorLabel, floorName } from "./model.mjs";
import {
  buildSteps,
  routeMetrics,
  pointAt,
  walkMinutes,
  nextStep,
  currentStep,
} from "./guide.mjs";
import { createView } from "./view.js";
import { openAR } from "./ar/ar.js";
import { playLift, voice } from "./lift.js";

const A = "assets/";
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const params = new URLSearchParams(location.search);

export const STEP_ICON = {
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
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

// ---------- 시작
async function init() {
  const bar = $("#load-bar");
  const [M, E] = await Promise.all([
    fetch(A + "mirae.json").then((r) => {
      if (!r.ok) throw new Error(`층 데이터 ${r.status}`);
      return r.json();
    }),
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

  // 캠퍼스 지도에서 넘어온 경우: ?from=futureDoor (캠퍼스 노드) 또는 출입구 id, 또는 f:id (호실)
  const from = params.get("from");
  const ent = entrances.find((e) => e.id === from || e.campusNode === from);
  const fromPlace = !ent && from && indoor.findDest(from);
  setStart(
    fromPlace ? placeStart(fromPlace) : entranceStart(ent || entrances[0]),
  );
  if (ent && from === ent.campusNode)
    $("#home-from").textContent =
      `캠퍼스 경로가 ${ent.name}로 이어졌어요. 가려는 호실을 검색해 보세요.`;
  if (params.get("mode") === "elevator") setMode("elevator", false);
  view.setFloor(state.start.f, true);
  syncFloors();

  const to = params.get("to");
  const d = to && (indoor.findDest(to) || indoor.search(to)[0]);
  if (d) {
    state.dest = d;
    computeRoute();
  }
  if (params.has("demo")) startDemo();
  updateVoiceButtons();
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
    const b = el("button", "", floorLabel(n));
    b.type = "button";
    b.dataset.f = n;
    b.setAttribute("aria-label", floorName(n));
    b.onclick = () => goFloor(n);
    nav.append(b);
  }
}
function goFloor(n) {
  if (n === view.floor) return;
  const up = n > view.floor;
  view.setFloor(n, false, true);
  view.setMe(state.start);
  syncFloors();
  // 층이 바뀌었음을 크게 알려 줌
  const b = $("#floor-badge");
  b.textContent = `${up ? "▲" : "▼"} ${floorLabel(n)}`;
  b.classList.remove("show");
  void b.offsetWidth;
  b.classList.add("show");
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
  if (d.f !== view.floor) goFloor(d.f);
  view.focus(p[0], p[1], d.f, 48);
  syncFloors();
}
$("#place-close").onclick = () => {
  view.select(null);
  setSheet(state.route ? "route" : "home");
};
$("#place-route").onclick = () => {
  state.dest = state.pending;
  remember(state.dest);
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

// ---------- 최근 검색
const RECENT = "sai-indoor-recent";
function recents() {
  try {
    return JSON.parse(localStorage.getItem(RECENT) || "[]")
      .map((k) => indoor.findDest(k))
      .filter(Boolean);
  } catch {
    return [];
  }
}
function remember(d) {
  try {
    const list = [
      d.key,
      ...JSON.parse(localStorage.getItem(RECENT) || "[]").filter(
        (k) => k !== d.key,
      ),
    ].slice(0, 6);
    localStorage.setItem(RECENT, JSON.stringify(list));
  } catch {}
}

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
  if (e.key === "Enter") $("#search-results li[data-key]")?.click();
  else if (e.key === "Escape") closeSearch();
});
function resultItem(d) {
  const li = el("li");
  li.dataset.key = d.key;
  const tag = el(
    "span",
    "floor-tag" + (d.f === 0 ? " b1" : ""),
    floorLabel(d.f),
  );
  const box = el("div");
  box.append(
    el("b", "", d.title),
    el(
      "small",
      "",
      [d.name, d.numbered ? d.catLabel : floorName(d.f)]
        .filter(Boolean)
        .join(" · "),
    ),
  );
  li.append(tag, box);
  li.onclick = () => {
    closeSearch();
    remember(d);
    if (state.searchMode === "origin") {
      setStart(placeStart(d));
      refreshFromSelect();
      if (state.dest) computeRoute();
    } else showPlace(d);
  };
  return li;
}
function renderResults(q) {
  const ul = $("#search-results");
  ul.replaceChildren();
  if (q.trim()) {
    const list = indoor.search(q, 40);
    $("#search-hint").textContent = list.length
      ? `${list.length}곳`
      : "검색 결과가 없어요. 호실 번호나 이름 일부로 찾아보세요.";
    for (const d of list) ul.append(resultItem(d));
    return;
  }
  $("#search-hint").textContent =
    "번호나 실 이름, 교수 이름으로 찾을 수 있어요";
  const rec = recents();
  if (rec.length) {
    ul.append(el("li", "group", "최근 찾은 곳"));
    for (const d of rec) ul.append(resultItem(d));
  }
  let lastF = null;
  for (const d of indoor.destinations.filter((d) => d.numbered)) {
    if (d.f !== lastF) {
      ul.append(el("li", "group", floorName(d.f)));
      lastF = d.f;
    }
    ul.append(resultItem(d));
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
$("#route-swap").onclick = () => {
  // 출발 ↔ 도착 바꾸기 (출발이 호실일 때만 도착으로 쓸 수 있음)
  if (!state.dest) return;
  const newDest =
    state.start.kind === "place" ? indoor.findDest(state.start.id) : null;
  if (!newDest) {
    toast(
      "출입구는 도착지로 고를 수 없어요. 호실에서 출발하면 바꿀 수 있어요.",
    );
    return;
  }
  setStart(placeStart(state.dest));
  state.dest = newDest;
  computeRoute();
};
$("#route-close").onclick = () => {
  state.route = null;
  state.dest = null;
  view.clearRoute();
  view.select(null);
  setSheet("home");
  syncFloors();
  history.replaceState(
    null,
    "",
    location.pathname +
      (params.get("from") ? `?from=${params.get("from")}` : ""),
  );
};
function setMode(mode, recompute = true) {
  state.mode = mode;
  for (const x of $$(".seg button")) {
    x.classList.toggle("on", x.dataset.mode === mode);
    x.setAttribute("aria-checked", x.dataset.mode === mode);
  }
  if (recompute) computeRoute();
}
for (const b of $$(".seg button")) b.onclick = () => setMode(b.dataset.mode);

function routeUrl() {
  const q = new URLSearchParams();
  q.set("from", state.start.id);
  q.set("to", state.dest.key);
  if (state.mode === "elevator") q.set("mode", "elevator");
  return `${location.pathname}?${q}`;
}
$("#route-share").onclick = async () => {
  const url = new URL(routeUrl(), location.href).href;
  const text = `미래관 ${state.dest.title}까지 길안내`;
  try {
    if (navigator.share) await navigator.share({ title: text, url });
    else {
      await navigator.clipboard.writeText(url);
      toast("경로 링크를 복사했어요");
    }
  } catch {}
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
    sum.append(
      el(
        "span",
        "warn",
        state.mode === "elevator"
          ? `계단 없이 ${floorName(d.f)}에 갈 수 있는 길이 등록되어 있지 않아요. (지하 1층은 계단으로만 연결돼요)`
          : "경로를 찾지 못했어요.",
      ),
    );
    $("#ar-open").disabled = $("#walk-open").disabled = true;
    syncFloors();
    return;
  }
  $("#ar-open").disabled = $("#walk-open").disabled = false;
  state.route = r;
  state.steps = buildSteps(r, d, { landmarks: indoor.destinations });
  history.replaceState(null, "", routeUrl());
  sum.append(
    el("b", "", `${Math.round(r.len)}m`),
    el("span", "", `약 ${walkMinutes(r.len)}`),
  );
  // 층 이동 요약 칩
  for (const st of state.steps)
    if (st.kind === "stair" || st.kind === "elev")
      sum.append(
        el(
          "span",
          "chip " + st.kind,
          `${st.kind === "elev" ? "엘리베이터" : "계단"} ${floorLabel(st.f)}→${floorLabel(st.to)}`,
        ),
      );
  renderSteps();
  $("#sheet").scrollTop = 0;
  view.showRoute(r, d, state.steps);
  if (view.floor !== r.pts[0].f) view.setFloor(r.pts[0].f);
  view.setMe(state.start);
  frameRoute();
  syncFloors();
}
function sheetCover() {
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

async function loadSV() {
  if (!sv) sv = await fetch(A + "sv.json").then((r) => r.json());
  return sv;
}
// 위치·방향에 맞는 실제 사진
function photoNear(x, y, f, yaw, R = 3.5, maxA = 45) {
  if (!sv) return null;
  let best = null;
  for (const s of sv.shots) {
    if (s.f !== f) continue;
    const d = Math.hypot(s.x - x, s.y - y);
    if (d > R) continue;
    const a =
      yaw == null ? 0 : Math.abs(((((s.yaw - yaw) % 360) + 540) % 360) - 180);
    if (a > maxA) continue;
    const sc = d + a * 0.05;
    if (!best || sc < best[0]) best = [sc, s];
  }
  return best && best[1];
}
const photoUrl = (s) => `${A}sv/${String(s.id).padStart(5, "0")}.jpg`;
// 단계를 시작할 때 바라보는 방향(사진 고르기용)
function stepHeading(st) {
  const r = state.route,
    cum = routeMetrics(r);
  const a = pointAt(r, cum, st.s + 0.3),
    b = pointAt(r, cum, st.s + 3);
  return Math.hypot(b.x - a.x, b.y - a.y) > 0.5
    ? (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
    : null;
}

async function renderSteps() {
  const ol = $("#route-steps");
  ol.replaceChildren();
  const steps = state.steps;
  await loadSV().catch(() => null);
  if (state.steps !== steps) return;
  steps.forEach((st, i) => {
    const li = el(
      "li",
      st.kind === "stair" || st.kind === "elev"
        ? "vertical"
        : st.kind === "arrive"
          ? "goal"
          : "",
    );
    li.dataset.i = i;
    const ico = el("span", "ico", STEP_ICON[st.dir] || "•");
    if (i && st.kind !== "arrive") ico.append(el("i", "num", String(i)));
    const txt = el("div", "txt");
    txt.append(el("b", "", st.text));
    const meta = [floorName(st.f)];
    if (st.kind === "start") meta.push(state.start.name);
    if (st.sub && st.kind !== "start") meta.push(st.sub);
    txt.append(el("small", "", meta.join(" · ")));
    li.append(ico, txt);
    if (st.kind !== "arrive" && st.kind !== "elev") {
      const ph = photoNear(st.at[0], st.at[1], st.f, stepHeading(st));
      if (ph) {
        const img = el("img");
        img.loading = "lazy";
        img.alt = "이 지점의 실제 모습";
        img.src = photoUrl(ph);
        li.append(img);
      }
    }
    li.onclick = () => focusStep(i);
    ol.append(li);
  });
}
function focusStep(i) {
  const st = state.steps[i];
  for (const li of $$("#route-steps li"))
    li.classList.toggle("on", +li.dataset.i === i);
  view.highlightStep(i);
  if (st.f !== view.floor) goFloor(st.f);
  view.focus(st.at[0], st.at[1], st.f, 32);
  syncFloors();
  if (innerWidth < 820) $("#sheet").classList.add("collapsed");
}

// ---------- 음성 안내 버튼
function updateVoiceButtons() {
  for (const b of $$(".voice-btn")) {
    b.hidden = !voice.supported;
    b.classList.toggle("on", voice.on);
    b.setAttribute("aria-pressed", voice.on);
    b.textContent = voice.on ? "🔊" : "🔈";
    b.title = voice.on ? "음성 안내 끄기" : "음성 안내 켜기";
  }
}
for (const b of $$(".voice-btn"))
  b.onclick = () => {
    voice.on = !voice.on;
    updateVoiceButtons();
    if (voice.on) voice.say("음성 안내를 켰어요");
  };

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
    playing: true,
    speed: 1,
    step: -1,
    lift: null,
    liftDone: new Set(),
  };
  $("#walk").hidden = false;
  for (const s of ["#sheet", ".topbar", "#floors", ".map-tools"])
    $(s).hidden = true;
  view.setFirstPerson(true);
  syncWalkButtons();
  requestAnimationFrame(walkStep);
};
function endWalk() {
  walking?.lift?.close();
  walking = null;
  if (voice.supported) speechSynthesis.cancel();
  $("#walk").hidden = true;
  for (const s of ["#sheet", ".topbar", "#floors", ".map-tools"])
    $(s).hidden = false;
  view.setFirstPerson(false);
  if (state.route) {
    const f = state.route.pts[state.route.pts.length - 1].f;
    if (f !== view.floor) view.setFloor(f);
  }
  syncFloors();
}
function syncWalkButtons() {
  if (!walking) return;
  $("#walk-play").textContent = walking.playing ? "❚❚" : "▶";
  $("#walk-play").setAttribute(
    "aria-label",
    walking.playing ? "일시정지" : "재생",
  );
  $("#walk-speed").textContent = `${walking.speed}×`;
}
$("#walk-close").onclick = endWalk;
$("#walk-play").onclick = () => {
  if (!walking) return;
  if (walking.s >= walking.total - 0.05) {
    walking.s = 0;
    walking.liftDone.clear();
    walking.yaw = null;
  }
  walking.playing = !walking.playing;
  syncWalkButtons();
};
$("#walk-speed").onclick = () => {
  if (!walking) return;
  walking.speed = walking.speed === 1 ? 2 : walking.speed === 2 ? 4 : 1;
  syncWalkButtons();
};
function jumpStep(delta) {
  if (!walking || walking.lift) return;
  const k = Math.max(
    0,
    Math.min(
      state.steps.length - 1,
      currentStep(state.steps, walking.s) + delta,
    ),
  );
  walking.s = Math.min(walking.total, state.steps[k].s + 0.01);
  // 엘리베이터를 건너뛰면 탑승 장면은 생략
  for (const st of state.steps)
    if (st.kind === "elev" && st.s < walking.s) walking.liftDone.add(st.s);
  walking.yaw = null;
}
$("#walk-prev").onclick = () => jumpStep(-1);
$("#walk-next").onclick = () => jumpStep(1);

function walkStep(now) {
  if (!walking) return;
  const w = walking,
    r = state.route,
    steps = state.steps;
  const dt = Math.min(0.05, (now - w.last) / 1000);
  w.last = now;
  if (w.playing && !w.lift) {
    const p0 = pointAt(r, w.cum, w.s);
    const onStair = r.pts[p0.i]?.kind === "stair";
    let ns = Math.min(w.total, w.s + dt * w.speed * (onStair ? 1.3 : 2.4));
    // 엘리베이터에 닿으면 탑승 장면
    const ev = steps.find(
      (st) =>
        st.kind === "elev" &&
        st.s >= w.s - 1e-6 &&
        st.s <= ns &&
        !w.liftDone.has(st.s),
    );
    if (ev) {
      ns = ev.s;
      w.liftDone.add(ev.s);
      voice.say(ev.text);
      w.lift = playLift({
        from: ev.f,
        to: ev.to,
        title: `${floorLabel(ev.to)}로 이동 중`,
        hint: ev.sub,
      });
      w.lift.arrive().then(() => {
        if (walking !== w) return;
        w.lift = null;
        w.s = ev.s + 0.02;
        w.yaw = null;
      });
    }
    w.s = ns;
  }
  const p = pointAt(r, w.cum, w.s);
  // 2m 앞을 바라보며 부드럽게 회전
  const a = pointAt(r, w.cum, Math.min(w.total, w.s + 2.2));
  const want =
    Math.hypot(a.x - p.x, a.y - p.y) > 0.3
      ? (Math.atan2(a.y - p.y, a.x - p.x) * 180) / Math.PI
      : (w.yaw ?? 90);
  if (w.yaw == null) w.yaw = want;
  const d = ((((want - w.yaw) % 360) + 540) % 360) - 180;
  w.yaw += d * Math.min(1, dt * 3.2);
  view.setWalkPose({ x: p.x, y: p.y, z: p.z, f: p.f, yaw: w.yaw, pitch: -0.1 });
  $("#walk-bar").style.width = `${(w.s / w.total) * 100}%`;

  // 안내 카드: 다음 동작과 남은 거리
  const nx = nextStep(steps, r, w.cum, w.s);
  const cur = currentStep(steps, w.s);
  if (cur !== w.step) {
    w.step = cur;
    if (cur > 0 && steps[cur].kind !== "elev") voice.say(steps[cur].text);
  }
  const done = w.s >= w.total - 0.05;
  const card = $("#walk-step");
  card.replaceChildren();
  const t = el("div");
  t.append(
    el(
      "b",
      "",
      done
        ? `${state.dest.title} 도착`
        : nx.dist < 3
          ? `지금 ${nx.step.action}`
          : `${Math.round(nx.dist)}m 앞 ${nx.step.kind === "arrive" ? state.dest.title : nx.step.action}`,
    ),
    el("small", "", `${floorName(p.f)} · ${steps[cur].text}`),
  );
  card.append(
    el("div", "hud-arrow", STEP_ICON[done ? "arrive" : nx.step.dir] || "↑"),
    t,
  );
  // 실제 사진
  const ph = photoNear(p.x, p.y, p.f, w.yaw, 3, 40);
  const fig = $("#walk-photo");
  if (ph && !w.lift) {
    if (w.shot !== ph.id) {
      w.shot = ph.id;
      fig.querySelector("img").src = photoUrl(ph);
    }
    fig.hidden = false;
  } else fig.hidden = true;
  if (done && w.playing) {
    w.playing = false;
    syncWalkButtons();
    voice.say(`${state.dest.title}에 도착했어요`);
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
      view.showRoute(r, state.dest, steps);
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
  setMode("stairs", false);
  computeRoute();
  launchAR(true);
}

init().catch((e) => {
  console.error(e);
  const L = $("#loading");
  L.querySelector("b").textContent = `불러오지 못했어요: ${e.message || e}`;
  const b = el("button", "primary-btn", "다시 시도");
  b.onclick = () => location.reload();
  L.append(b);
});
