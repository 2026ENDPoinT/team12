// 조사 데이터 편집기. 주소에 ?edit=1이 있을 때만 별도 파일(editor.js)로 불러옵니다.
// 지도·캠퍼스 데이터·경로 계산은 앱이 window.__saiEditor로 넘겨준 것을 씁니다(src/edit-mode.js).
//
// 흐름: 지도 클릭 → 조사 항목(위경도 GeoJSON) 만들기 → mergeSurvey로 그래프에 합치기
//       → 앱에 넘겨 오버레이·경로 다시 그리기(저장 전 미리보기) → 저장 → 브라우저에 임시 저장
//       → 내보내기로 data/team-survey.json 파일 받기 → 저장소에 커밋
import { mergeSurvey, attachToGraph } from "../survey.mjs";
import { toLngLat, toScene, projectToSegment } from "../geo.mjs";

const DRAFT_KEY = "sai:seoultech:survey-draft:v1";
const WALL_SNAP_M = 5; // 벽에서 이 거리 안을 클릭해야 출입구가 됨
const PICK_M = 6; // 출입구·항목을 고를 때 클릭 허용 거리
const LINE_SNAP_M = 3; // 길·계단 점이 기존 노드·길에 붙는 거리
const C = {
  wall: 0xe8590c,
  door: 0x2f9e44,
  connector: 0x0c8599,
  ghost: 0x868e96,
  sidewalk: 0x0c8599,
  stairs: 0xd9480f,
  passage: 0xc2255c,
  snap: 0x1971c2,
  selected: 0xf59f00,
};
const TOOLS = [
  ["view", "보기"],
  ["select", "선택"],
  ["entrance", "출입구"],
  ["passage", "관통"],
  ["path", "길·계단"],
];
const HINTS = {
  view: "편집하지 않고 지도를 둘러봅니다. 건물 클릭도 평소처럼 동작합니다.",
  select: "팀이 넣은 출입구·관통·길을 클릭하면 고치거나 지울 수 있습니다.",
  entrance: "건물 벽 가까이를 클릭하세요. 주황색 벽 위의 초록 점 자리에 출입구가 생깁니다.",
  passage: "같은 건물의 출입구 두 개를 차례로 클릭하세요.",
  path: "점을 차례로 클릭하고 [완료] 또는 Enter. 기존 길 3m 안의 점은 길에 붙습니다. Esc로 취소.",
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const esc = (text) =>
  String(text ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

function startEditor(api) {
  const { map, geometry, buildings } = api,
    origin = geometry.meta,
    ll = (p) => toLngLat(p, origin).map((v) => Number(v.toFixed(7))),
    baselineText = JSON.stringify(api.survey),
    baselineGraph = api.getGraph();

  const state = {
    survey: clone(api.survey),
    undo: [],
    tool: "view",
    pending: null, // 저장 전 항목 { feature, kind }
    path: [], // 길·계단 그리는 중인 점들
    passageFrom: null,
    selected: null, // 선택한 조사 항목 id
    hover: null,
    merged: null,
    message: "",
  };
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft && draft !== baselineText) {
      const parsed = JSON.parse(draft);
      if (Array.isArray(parsed?.features)) {
        state.survey = parsed;
        state.message =
          "브라우저에 남아 있던 편집을 불러왔어요. 파일 내용으로 돌아가려면 [모두 되돌리기].";
      }
    }
  } catch {
    /* 임시 저장을 못 읽어도 파일 내용으로 시작합니다 */
  }

  // ===== 데이터 =====
  const features = (survey = state.survey) => survey.features;
  const find = (id, survey) => features(survey).find((f) => f.properties.id === id);
  function nextId(prefix, survey = state.survey) {
    let n = 1;
    while (find(`${prefix}-${n}`, survey)) n++;
    return `${prefix}-${n}`;
  }
  function withPending() {
    if (!state.pending) return state.survey;
    const survey = clone(state.survey),
      at = survey.features.findIndex(
        (f) => f.properties.id === state.pending.feature.properties.id,
      );
    if (at >= 0) survey.features[at] = state.pending.feature;
    else survey.features.push(state.pending.feature);
    return survey;
  }
  function apply() {
    state.merged = mergeSurvey(geometry, withPending(), { origin, buildings });
    api.applyGraph(state.merged);
    draw();
    renderPanel();
  }
  function commit(nextSurvey, message) {
    state.undo.push(JSON.stringify(state.survey));
    state.survey = nextSurvey;
    state.pending = null;
    state.message = message || "";
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(state.survey));
    } catch {
      state.message += " (브라우저 임시 저장 실패: 내보내기로 파일을 꼭 받아 두세요.)";
    }
    apply();
  }
  function cancelPending(message = "") {
    state.pending = null;
    state.path = [];
    state.passageFrom = null;
    state.message = message;
    apply();
  }

  // ===== 지도 위 계산 =====
  function nearestWall(point) {
    let best = null;
    for (const building of buildings)
      for (const ring of [building.outline, ...building.holes])
        for (let i = 0; i < ring.length; i++) {
          const a = { x: ring[i][0], z: ring[i][1] },
            b = {
              x: ring[(i + 1) % ring.length][0],
              z: ring[(i + 1) % ring.length][1],
            },
            p = projectToSegment(point, a, b);
          if (!best || p.distance < best.distance)
            best = { building, a, b, point: p.point, distance: p.distance };
        }
    return best && best.distance <= WALL_SNAP_M ? best : null;
  }
  function attachPreview(point) {
    const graph = state.merged,
      copy = {
        nodes: { ...graph.nodes },
        edges: graph.edges.map((e) => ({ ...e })),
      },
      at = attachToGraph(copy, point, { id: "__preview", buildings });
    return at && copy.nodes[at.nodeId];
  }
  function teamEntrances() {
    return state.merged.entrances;
  }
  function nearestEntrance(point) {
    let best = null;
    for (const e of teamEntrances()) {
      const d = dist(point, e);
      if (d <= PICK_M && (!best || d < best.d)) best = { e, d };
    }
    return best?.e ?? null;
  }
  function snapPathPoint(point) {
    const { nodes, edges } = state.merged;
    let best = null;
    for (const [id, node] of Object.entries(nodes)) {
      const d = dist(point, node);
      if (d <= LINE_SNAP_M && (!best || d < best.d))
        best = { d, point: { x: node.x, z: node.z }, snapped: true, nodeId: id };
    }
    if (best) return best;
    for (const e of edges) {
      const p = projectToSegment(point, nodes[e.a], nodes[e.b]);
      if (p.distance <= LINE_SNAP_M && (!best || p.distance < best.d))
        best = { d: p.distance, point: p.point, snapped: true };
    }
    return best || { point, snapped: false };
  }
  // 클릭 위치 근처의 팀 조사 항목 id
  function pickFeature(point) {
    const entrance = nearestEntrance(point);
    if (entrance) return entrance.id;
    const { nodes, edges } = state.merged;
    let best = null;
    for (const e of edges) {
      if (e.source_kind !== "team_input" || e.type === "connector") continue;
      const p = projectToSegment(point, nodes[e.a], nodes[e.b]);
      if (p.distance > PICK_M / 2 || (best && p.distance >= best.d)) continue;
      let id = null;
      if (e.type === "building_passage")
        id = features().find(
          (f) =>
            f.properties.feature_type === "building_passage" &&
            [f.properties.from, f.properties.to].sort().join() ===
              [e.a, e.b].sort().join(),
        )?.properties.id;
      else
        id = [e.a, e.b]
          .map((n) => n.split(":")[0])
          .find((fid) => find(fid));
      if (id) best = { d: p.distance, id };
    }
    return best?.id ?? null;
  }

  // ===== 미리보기 그리기 =====
  function draw() {
    const lines = [],
      dots = [];
    // 편집 전 경로(회색 점선): 조사 데이터가 파일과 다를 때만
    if (JSON.stringify(withPending()) !== baselineText) {
      const before = api.routeOn(baselineGraph).route;
      if (before)
        lines.push({
          points: before.path.map((id) => baselineGraph.nodes[id]),
          color: C.ghost,
          width: 1.6,
          dashed: true,
          y: 2.2,
        });
    }
    const h = state.hover;
    if (h?.wall) {
      lines.push({ points: [h.wall.a, h.wall.b], color: C.wall, width: 1.6 });
      dots.push({ ...h.wall.point, color: C.door, radius: 2.4 });
      if (h.attach)
        lines.push({
          points: [h.wall.point, h.attach],
          color: C.connector,
          width: 0.9,
          dashed: true,
        });
    }
    if (h?.entrance)
      dots.push({ x: h.entrance.x, z: h.entrance.z, color: C.selected, radius: 3.2 });
    if (state.passageFrom) {
      const from = state.merged.nodes[state.passageFrom];
      if (from) {
        dots.push({ x: from.x, z: from.z, color: C.passage, radius: 3.2 });
        if (h?.entrance && h.entrance.id !== state.passageFrom)
          lines.push({ points: [from, h.entrance], color: C.passage, width: 1.2, dashed: true });
      }
    }
    if (state.path.length) {
      const pts = state.path.map((p) => p.point);
      if (h?.pathPoint) pts.push(h.pathPoint.point);
      lines.push({ points: pts, color: C.sidewalk, width: 1.2 });
      for (const p of state.path)
        dots.push({ ...p.point, color: p.snapped ? C.snap : C.sidewalk, radius: 1.6 });
    } else if (h?.pathPoint)
      dots.push({
        ...h.pathPoint.point,
        color: h.pathPoint.snapped ? C.snap : C.sidewalk,
        radius: 1.6,
      });
    if (state.selected) {
      const f = find(state.selected),
        nodes = state.merged.nodes;
      if (f?.properties.feature_type === "entrance" && nodes[state.selected])
        dots.push({ ...nodes[state.selected], color: C.selected, radius: 3.4 });
      else if (f?.geometry?.type === "LineString")
        lines.push({
          points: f.geometry.coordinates.map((c) => toScene(c, origin)),
          color: C.selected,
          width: 2.2,
        });
    }
    if (state.pending?.feature.geometry?.type === "Point") {
      const p = toScene(state.pending.feature.geometry.coordinates, origin);
      dots.push({ ...p, color: C.door, radius: 3 });
    }
    map.setEditPreview({ lines, dots });
  }

  // ===== 지도 클릭·이동 =====
  const handler = {
    move(point) {
      if (state.tool === "entrance") {
        const wall = nearestWall(point);
        state.hover = wall ? { wall, attach: attachPreview(wall.point) } : null;
      } else if (state.tool === "passage" || state.tool === "select")
        state.hover = { entrance: nearestEntrance(point) };
      else if (state.tool === "path") state.hover = { pathPoint: snapPathPoint(point) };
      draw();
    },
    click(point) {
      if (state.tool === "entrance") clickEntrance(point);
      else if (state.tool === "passage") clickPassage(point);
      else if (state.tool === "path") {
        state.path.push(snapPathPoint(point));
        state.message = `점 ${state.path.length}개. 다 찍었으면 [완료] 또는 Enter.`;
        draw();
        renderPanel();
      } else if (state.tool === "select") {
        state.selected = pickFeature(point);
        state.message = state.selected ? "" : "근처에 팀이 넣은 항목이 없어요.";
        draw();
        renderPanel();
      }
    },
  };

  function clickEntrance(point) {
    const wall = nearestWall(point);
    if (!wall) {
      state.message = `건물 벽에서 ${WALL_SNAP_M}m 안을 클릭하세요.`;
      return renderPanel();
    }
    const building = wall.building,
      id = state.pending?.kind === "entrance"
        ? state.pending.feature.properties.id
        : nextId(`ent-${building.id}`),
      count = teamEntrances().filter((e) => e.building_id === building.id).length;
    state.pending = {
      kind: "entrance",
      feature: {
        type: "Feature",
        geometry: { type: "Point", coordinates: ll(wall.point) },
        properties: {
          id,
          campus_id: "SEOULTECH",
          feature_type: "entrance",
          building_id: building.id,
          name:
            state.pending?.feature.properties.name ||
            `${building.name} 출입구 ${count + 1}`,
          source_kind: "team_input",
          verification_status: "candidate",
        },
      },
    };
    state.message = "";
    apply();
  }

  function clickPassage(point) {
    const entrance = nearestEntrance(point);
    if (!teamEntrances().length) {
      state.message = "먼저 [출입구] 도구로 건물 출입구를 두 개 이상 넣어 주세요.";
      return renderPanel();
    }
    if (!entrance) {
      state.message = "출입구(초록 점) 가까이를 클릭하세요.";
      return renderPanel();
    }
    if (!state.passageFrom || state.pending) {
      state.pending = null;
      state.passageFrom = entrance.id;
      state.message = `${entrance.name}에서 시작. 같은 건물의 다른 출입구를 클릭하세요.`;
      return apply();
    }
    const from = state.merged.nodes[state.passageFrom];
    if (entrance.id === state.passageFrom) return;
    if (entrance.building_id !== from.building_id) {
      state.message = "관통 경로는 같은 건물의 출입구끼리만 이을 수 있어요.";
      return renderPanel();
    }
    state.pending = {
      kind: "passage",
      feature: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [ll(from), ll(entrance)],
        },
        properties: {
          id: nextId("pass"),
          campus_id: "SEOULTECH",
          feature_type: "building_passage",
          building_id: entrance.building_id,
          from: state.passageFrom,
          to: entrance.id,
          length_m: Math.round(dist(from, entrance)),
          source_kind: "team_input",
          verification_status: "candidate",
        },
      },
    };
    state.message = "복도 길이를 확인하고 저장하세요. 처음 값은 두 문 사이 직선거리입니다.";
    apply();
  }

  function finishPath() {
    if (state.path.length < 2) {
      state.message = "점을 2개 이상 찍어야 길이 됩니다.";
      return renderPanel();
    }
    state.pending = {
      kind: "path",
      feature: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: state.path.map((p) => ll(p.point)),
        },
        properties: {
          id: nextId("path"),
          campus_id: "SEOULTECH",
          feature_type: "sidewalk",
          source_kind: "team_input",
          verification_status: "candidate",
        },
      },
    };
    state.path = [];
    state.message = "종류를 고르고 저장하세요.";
    apply();
  }

  // ===== 패널 =====
  const host = document.querySelector(".map-controls")?.parentElement,
    panel = document.createElement("section");
  panel.id = "survey-editor";
  panel.setAttribute("aria-label", "조사 데이터 편집기");
  panel.style.cssText =
    "position:absolute;right:12px;top:64px;z-index:30;width:268px;" +
    "max-height:calc(100% - 150px);overflow:auto;background:rgba(255,255,255,.97);" +
    "color:#1f2430;border:1px solid #d9dbe3;border-radius:12px;padding:12px;" +
    "font:13px/1.5 system-ui,sans-serif;box-shadow:0 6px 18px rgba(20,20,40,.14)";
  host?.append(panel);
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json,.geojson,application/json";
  fileInput.hidden = true;
  panel.after(fileInput);

  const btn = (action, label, extra = "") =>
    `<button type="button" data-action="${action}" style="font:inherit;padding:4px 8px;border:1px solid #c9ccd6;border-radius:6px;background:#fff;color:#1f2430;cursor:pointer;${extra}">${label}</button>`;
  const primary = (action, label) =>
    btn(action, label, "background:#6a45f0;border-color:#6a45f0;color:#fff");

  function routeSummary() {
    const now = api.routeOn(api.getGraph()),
      before = api.routeOn(baselineGraph);
    if (!now.start || !now.destination) return "";
    const fmt = (r) => (r ? `${Math.round(r.meters)}m` : "경로 없음"),
      diff =
        now.route && before.route
          ? Math.round(now.route.meters - before.route.meters)
          : null;
    return (
      `<div style="background:#f3f1fe;border-radius:8px;padding:8px;margin-top:8px">` +
      `<div style="color:#5b6170;font-size:12px">${esc(now.start.name)} → ${esc(now.destination.name)}</div>` +
      `<div style="font-weight:600">${fmt(before.route)} → ${fmt(now.route)}` +
      (diff ? ` <span style="color:${diff < 0 ? "#2b8a3e" : "#c92a2a"}">${diff > 0 ? "+" : ""}${diff}m</span>` : "") +
      `</div><div style="color:#5b6170;font-size:12px">${state.pending ? "저장 전 미리보기" : "파일 기준 → 지금 편집"}</div></div>`
    );
  }

  function pendingForm() {
    const p = state.pending?.feature.properties;
    if (!p) return "";
    let body = "";
    if (state.pending.kind === "entrance")
      body =
        `<label style="display:block">이름<input data-field="name" value="${esc(p.name)}" style="width:100%;font:inherit;padding:3px 6px;margin-top:2px"></label>` +
        `<label style="display:flex;gap:6px;margin-top:6px"><input type="checkbox" data-field="verified" ${p.verification_status === "verified" ? "checked" : ""}>현장 확인함</label>`;
    else if (state.pending.kind === "passage")
      body = `<label style="display:block">복도 길이(m)<input data-field="length" type="number" min="1" step="1" value="${esc(p.length_m)}" style="width:100%;font:inherit;padding:3px 6px;margin-top:2px"></label>`;
    else
      body =
        `<div>종류</div>` +
        `<label style="margin-right:12px"><input type="radio" name="path-kind" data-field="kind" value="sidewalk" ${p.feature_type === "sidewalk" ? "checked" : ""}> 인도</label>` +
        `<label><input type="radio" name="path-kind" data-field="kind" value="stairs" ${p.feature_type === "stairs" ? "checked" : ""}> 계단</label>`;
    return (
      `<div style="border:1px solid #e4e1fb;border-radius:8px;padding:8px;margin-top:8px">` +
      `<b>새 ${state.pending.kind === "entrance" ? "출입구" : state.pending.kind === "passage" ? "관통 경로" : "길·계단"}</b>` +
      `<div style="margin-top:6px">${body}</div>` +
      `<div style="display:flex;gap:6px;margin-top:8px">${btn("cancel", "취소", "flex:1")}${primary("save", "저장")}</div></div>`
    );
  }

  function selectedForm() {
    const f = state.selected && find(state.selected);
    if (!f || state.pending) return "";
    const p = f.properties;
    let body = "";
    if (p.feature_type === "entrance")
      body =
        `<label style="display:block">이름<input data-field="name" value="${esc(p.name)}" style="width:100%;font:inherit;padding:3px 6px;margin-top:2px"></label>` +
        `<label style="display:flex;gap:6px;margin-top:6px"><input type="checkbox" data-field="verified" ${p.verification_status === "verified" ? "checked" : ""}>현장 확인함</label>`;
    else if (p.feature_type === "building_passage")
      body = `<label style="display:block">복도 길이(m)<input data-field="length" type="number" min="1" step="1" value="${esc(p.length_m)}" style="width:100%;font:inherit;padding:3px 6px;margin-top:2px"></label>`;
    else
      body =
        `<label style="margin-right:12px"><input type="radio" name="sel-kind" data-field="kind" value="sidewalk" ${p.feature_type === "sidewalk" ? "checked" : ""}> 인도</label>` +
        `<label><input type="radio" name="sel-kind" data-field="kind" value="stairs" ${p.feature_type === "stairs" ? "checked" : ""}> 계단</label>`;
    const used =
      p.feature_type === "entrance"
        ? features().filter(
            (x) =>
              x.properties.feature_type === "building_passage" &&
              (x.properties.from === p.id || x.properties.to === p.id),
          ).length
        : 0;
    return (
      `<div style="border:1px solid #fde7b0;border-radius:8px;padding:8px;margin-top:8px">` +
      `<b>선택: ${esc(p.name || p.id)}</b><div style="color:#5b6170;font-size:12px">${esc(p.id)}</div>` +
      `<div style="margin-top:6px">${body}</div>` +
      (used ? `<div style="color:#c92a2a;font-size:12px;margin-top:4px">지우면 이 문을 쓰는 관통 경로 ${used}개도 함께 지워집니다.</div>` : "") +
      `<div style="display:flex;gap:6px;margin-top:8px">${btn("delete", "삭제", "flex:1;color:#c92a2a")}${primary("update", "변경 저장")}</div></div>`
    );
  }

  function changeCount() {
    const before = new Map(
        JSON.parse(baselineText).features.map((f) => [f.properties.id, JSON.stringify(f)]),
      ),
      now = new Map(features().map((f) => [f.properties.id, JSON.stringify(f)]));
    let n = 0;
    for (const [id, text] of now) if (before.get(id) !== text) n++;
    for (const id of before.keys()) if (!now.has(id)) n++;
    return n;
  }

  function renderPanel() {
    const merged = state.merged,
      warnings = merged?.warnings ?? [],
      changes = changeCount();
    panel.innerHTML =
      `<div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:14px">조사 데이터 편집</b><span style="color:#5b6170;font-size:12px">항목 ${features().length}개</span></div>` +
      `<div role="toolbar" aria-label="편집 도구" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px">` +
      TOOLS.map(([id, label]) =>
        btn(
          `tool:${id}`,
          label,
          state.tool === id ? "background:#6a45f0;border-color:#6a45f0;color:#fff" : "",
        ),
      ).join("") +
      `</div><div style="color:#5b6170;font-size:12px;margin-top:6px">${HINTS[state.tool]}</div>` +
      (state.tool === "path" && !state.pending
        ? `<div style="display:flex;gap:6px;margin-top:6px">${btn("path-cancel", "취소", "flex:1")}${primary("path-done", `완료 (${state.path.length})`)}</div>`
        : "") +
      (state.message ? `<div style="margin-top:8px;color:#1864ab">${esc(state.message)}</div>` : "") +
      pendingForm() +
      selectedForm() +
      routeSummary() +
      (warnings.length
        ? `<ul style="margin:8px 0 0;padding-left:16px;color:#c92a2a;font-size:12px">${warnings.map((w) => `<li><b>${esc(w.id)}</b> ${esc(w.message)}</li>`).join("")}</ul>`
        : "") +
      `<div style="border-top:1px solid #e9eaf0;margin-top:10px;padding-top:8px;display:flex;flex-wrap:wrap;gap:4px">` +
      btn("undo", `되돌리기${state.undo.length ? ` (${state.undo.length})` : ""}`) +
      btn("reset", "모두 되돌리기") +
      btn("import", "불러오기") +
      primary("export", "내보내기") +
      `</div><div style="color:#5b6170;font-size:12px;margin-top:6px">파일과 다른 항목 ${changes}개. 내보낸 파일을 data/team-survey.json에 넣고 커밋해야 모두에게 반영됩니다.</div>`;
  }

  function readForm(feature) {
    const p = feature.properties,
      get = (field) => panel.querySelector(`[data-field="${field}"]`);
    if (p.feature_type === "entrance") {
      p.name = get("name")?.value.trim() || p.name;
      p.verification_status = get("verified")?.checked ? "verified" : "candidate";
    } else if (p.feature_type === "building_passage") {
      const length = Number(get("length")?.value);
      if (length > 0) p.length_m = Math.round(length);
    } else {
      const kind = panel.querySelector('[data-field="kind"]:checked')?.value;
      if (kind) p.feature_type = kind;
    }
    return feature;
  }

  function setTool(tool) {
    state.tool = tool;
    state.hover = null;
    state.path = [];
    state.passageFrom = null;
    state.selected = null;
    state.pending = null;
    state.message = "";
    map.setEditHandler(tool === "view" ? null : handler);
    if (tool !== "view") api.setOverlay(true);
    apply();
  }

  panel.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action.startsWith("tool:")) return setTool(action.slice(5));
    if (action === "cancel") return cancelPending("취소했어요.");
    if (action === "save") {
      const feature = readForm(state.pending.feature),
        next = clone(state.survey);
      next.features.push(feature);
      state.passageFrom = null;
      return commit(next, `${feature.properties.name || feature.properties.id} 저장했어요.`);
    }
    if (action === "path-done") return finishPath();
    if (action === "path-cancel") return cancelPending("그리던 길을 지웠어요.");
    if (action === "update" || action === "delete") {
      const next = clone(state.survey),
        id = state.selected;
      if (action === "update") {
        const at = next.features.findIndex((f) => f.properties.id === id);
        next.features[at] = readForm(next.features[at]);
      } else
        next.features = next.features.filter(
          (f) =>
            f.properties.id !== id &&
            f.properties.from !== id &&
            f.properties.to !== id,
        );
      state.selected = action === "update" ? id : null;
      return commit(next, action === "update" ? "변경을 저장했어요." : "삭제했어요. [되돌리기]로 살릴 수 있어요.");
    }
    if (action === "undo") {
      if (!state.undo.length) return;
      state.survey = JSON.parse(state.undo.pop());
      state.pending = null;
      state.selected = null;
      state.message = "되돌렸어요.";
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(state.survey));
      } catch {
        /* 임시 저장 실패는 화면 동작에 영향 없음 */
      }
      return apply();
    }
    if (action === "reset") {
      state.selected = null;
      return commit(JSON.parse(baselineText), "파일 내용으로 되돌렸어요. 이것도 [되돌리기]로 취소할 수 있어요.");
    }
    if (action === "import") return fileInput.click();
    if (action === "export") {
      const blob = new Blob([JSON.stringify(state.survey, null, 2) + "\n"], {
          type: "application/json",
        }),
        link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "team-survey.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      state.message = "team-survey.json을 받았어요. data/ 폴더의 같은 파일을 바꾸고 커밋하세요.";
      return renderPanel();
    }
  });
  // 저장 전 미리보기: 관통 길이·길 종류를 바꾸면 바로 다시 계산합니다.
  panel.addEventListener("change", (event) => {
    if (!state.pending) return;
    const field = event.target.dataset.field;
    if (field === "length" || field === "kind") {
      readForm(state.pending.feature);
      apply();
    }
  });
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    fileInput.value = "";
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed?.type !== "FeatureCollection" || !Array.isArray(parsed.features))
        throw new Error("GeoJSON FeatureCollection이 아닙니다.");
      state.selected = null;
      commit(parsed, `${file.name}을 불러왔어요 (항목 ${parsed.features.length}개).`);
    } catch (error) {
      state.message = `불러오지 못했어요: ${error.message}`;
      renderPanel();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.target.closest?.("input, textarea, select")) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      panel.querySelector('[data-action="undo"]')?.click();
    } else if (event.key === "Enter" && state.tool === "path" && state.path.length)
      finishPath();
    else if (event.key === "Escape" && (state.pending || state.path.length || state.passageFrom))
      cancelPending("취소했어요.");
  });

  apply();
}

// 앱(src/edit-mode.js)이 넘겨준 통로가 있을 때만 시작합니다. 파일 맨 끝에서 불러야
// 위의 상수와 함수가 모두 준비된 뒤에 실행됩니다.
if (window.__saiEditor) startEditor(window.__saiEditor);
