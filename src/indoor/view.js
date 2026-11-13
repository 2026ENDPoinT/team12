// 미래관 3D 실내 지도 화면 (Three.js).
// 건물 좌표(x 동, y 북, z 위) → three 좌표 (x, z, -y)
import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  texturize,
  glassMaterial,
  interiorEnvironment,
  flatNormals,
  LIGHTING,
} from "./materials.mjs";

const VIOLET = 0x7950ff,
  DEEP = 0x5330d2;
const T = (x, y, z) => new THREE.Vector3(x, z, -y);

export function createView(el, indoor, { onPick } = {}) {
  const { M, FL } = indoor;
  // 성능: 고해상도 화면(배율 1.5 이상)은 화소가 촘촘해 안티에일리어싱 없이도 매끈 → 끔.
  // 움직이는 동안만 해상도를 낮추고, 멈추면 원래 해상도로 다시 그림(멈춘 화면은 그대로)
  const PR_HIGH = Math.min(devicePixelRatio, 2),
    PR_LOW = Math.min(PR_HIGH, 1.25);
  const renderer = new THREE.WebGLRenderer({
    antialias: devicePixelRatio < 1.5,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(PR_HIGH);
  let pr = PR_HIGH,
    lastMove = -1e9;
  function setPR(v) {
    if (v === pr) return;
    pr = v;
    renderer.setPixelRatio(v);
    renderer.setSize(el.clientWidth, el.clientHeight, false);
  }
  // 질감 재질(materials.mjs)용 톤 매핑. 경로·핀 같은 표시는 toneMapped:false 로 원래 색 그대로
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = LIGHTING.mapExposure;
  el.appendChild(renderer.domElement);
  const lr = new CSS2DRenderer();
  Object.assign(lr.domElement.style, {
    position: "absolute",
    inset: "0",
    pointerEvents: "none",
  });
  el.appendChild(lr.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeef0f6);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe6e0d2, LIGHTING.hemi));
  const sun = new THREE.DirectionalLight(0xffffff, LIGHTING.sun);
  sun.position.set(30, 80, 20);
  scene.add(sun);

  const cam = new THREE.PerspectiveCamera(38, 1, 0.5, 2000);
  const fp = new THREE.PerspectiveCamera(70, 1, 0.08, 600);
  fp.rotation.order = "YXZ";
  const ctl = new MapControls(cam, renderer.domElement);
  ctl.enableDamping = true;
  ctl.dampingFactor = 0.12;
  ctl.screenSpacePanning = false;
  ctl.maxPolarAngle = 1.1;
  ctl.minDistance = 10;
  ctl.maxDistance = 170;
  ctl.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_ROTATE };

  let floor = 1,
    firstPerson = false,
    dirty = true;
  const nodes = {};
  const labels = [];
  const routeGroup = new THREE.Group();
  scene.add(routeGroup);
  const me = makeMe();
  me.visible = false;
  scene.add(me);

  function resize() {
    const w = el.clientWidth,
      h = el.clientHeight;
    renderer.setSize(w, h);
    lr.setSize(w, h);
    for (const c of [cam, fp]) {
      c.aspect = w / h;
      c.updateProjectionMatrix();
    }
    dirty = true;
  }
  addEventListener("resize", resize);
  resize();
  ctl.addEventListener("change", () => (dirty = true));

  // ---- 도면 불러오기
  async function load(url, onProgress) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`도면을 불러오지 못했어요 (${res.status})`);
    const total = +res.headers.get("content-length") || 0;
    let buf;
    if (res.body && total) {
      const reader = res.body.getReader();
      const chunks = [];
      let got = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        got += value.length;
        onProgress?.(got / total);
      }
      buf = new Uint8Array(got);
      let o = 0;
      for (const c of chunks) {
        buf.set(c, o);
        o += c.length;
      }
      buf = buf.buffer;
    } else buf = await res.arrayBuffer();
    const g = await new Promise((ok, fail) =>
      new GLTFLoader().parse(buf, "", ok, fail),
    );
    // 질감(materials.mjs): 촬영 영상을 참고한 바닥 타일·벽·문·금속·나무·유리 재질 + 실내 반사광
    try {
      scene.environment = await interiorEnvironment(renderer);
      scene.environmentIntensity = LIGHTING.env;
    } catch {}
    g.scene.traverse((o) => {
      if (!o.isMesh) return;
      if (o.name[0] === "G") {
        flatNormals(o);
        o.material = glassMaterial();
      } else if (o.name[0] === "X") {
        flatNormals(o);
        o.material = new THREE.MeshStandardMaterial({
          vertexColors: true,
          roughness: 0.9,
          side: THREE.DoubleSide,
        });
      } else
        texturize(
          o,
          renderer,
          // D<층>: 벽·바닥과 같은 평면에 붙은 문짝·걸레받이·바닥 무늬(scripts/clean-mirae.py).
          // 살짝 앞으로 당겨 그려 가까이 가도 벽과 번갈아 반짝이지 않게 합니다.
          o.name[0] === "D"
            ? {
                polygonOffset: true,
                polygonOffsetFactor: -1,
                polygonOffsetUnits: -4,
              }
            : {},
        );
      nodes[o.name] = o;
    });
    scene.add(g.scene);
    buildLabels();
    setFloor(floor, true);
  }

  function buildLabels() {
    for (const d of indoor.destinations) {
      const p = d.center || d.doors[0];
      const div = document.createElement("div");
      const short =
        d.cat === "toilet"
          ? "WC"
          : d.cat === "elev"
            ? "EV"
            : d.numbered
              ? d.id
              : d.title;
      div.className = "room-label" + (d.numbered ? "" : " icon-only");
      div.textContent = short;
      const o = new CSS2DObject(div);
      o.position.copy(T(p[0], p[1], FL(d.f).z + 0.6));
      o.userData = { d };
      o.visible = false;
      scene.add(o);
      labels.push(o);
    }
  }
  let selectedKey = null;
  function updateLabels() {
    const dist = cam.position.distanceTo(ctl.target);
    for (const o of labels) {
      const d = o.userData.d;
      const sel = d.key === selectedKey;
      o.element.classList.toggle("sel", sel);
      if (firstPerson) {
        const p = d.center || d.doors[0];
        o.visible =
          d.f === walkPose.f &&
          Math.hypot(p[0] - walkPose.x, p[1] - walkPose.y) < 12;
      } else
        o.visible = d.f === floor && (sel || dist < (d.numbered ? 130 : 200));
    }
  }

  function applyVisibility() {
    for (const key in nodes) {
      const kind = key[0],
        n = +key.slice(1);
      if (kind === "X") nodes[key].visible = firstPerson;
      else if (firstPerson) nodes[key].visible = Math.abs(n - walkPose.f) <= 1;
      else nodes[key].visible = kind !== "C" && n === floor;
    }
    for (const c of routeGroup.children)
      c.visible = firstPerson
        ? true
        : c.userData.f == null || c.userData.f === floor;
    dirty = true;
  }

  // 층 바꾸기: animate면 카메라가 층 높이만큼 부드럽게 오르내립니다.
  // 카메라 이동 트윈: 층 전환·단계 보기·경로 맞춤이 모두 같은 방식으로 부드럽게 움직입니다.
  let floorAnim = null;
  function flyTo(cam1, tgt1, dur = 550) {
    floorAnim = {
      t0: performance.now(),
      dur,
      cam0: cam.position.clone(),
      tgt0: ctl.target.clone(),
      cam1,
      tgt1,
    };
    dirty = true;
  }
  ctl.addEventListener("start", () => (floorAnim = null)); // 사용자가 만지면 바로 멈춤
  function setFloor(n, reframe = false, animate = false) {
    const prevZ = FL(floor).z;
    floor = n;
    const dz = FL(n).z - prevZ;
    if (animate && dz && !reframe) {
      const up = new THREE.Vector3(0, dz, 0);
      flyTo(
        (floorAnim ? floorAnim.cam1 : cam.position).clone().add(up),
        (floorAnim ? floorAnim.tgt1 : ctl.target).clone().add(up),
        520,
      );
    } else {
      cam.position.y += dz;
      ctl.target.y += dz;
      if (floorAnim) {
        floorAnim.cam1.y += dz;
        floorAnim.tgt1.y += dz;
      }
    }
    if (reframe) frame();
    applyVisibility();
    updateLabels();
  }
  // 층 전체가 화면에 들어오도록. 세로 화면이면 건물의 긴 축(동서)을 화면 세로로 돌립니다.
  function frame() {
    const z = FL(floor).z;
    const portrait = el.clientWidth < el.clientHeight;
    const halfW = portrait ? 32 : 46,
      halfH = portrait ? 46 : 32; // 화면 가로·세로에 들어갈 건물 반폭(m)
    const vf = (cam.fov * Math.PI) / 360,
      hf = Math.atan(Math.tan(vf) * cam.aspect);
    const dist =
      Math.max(halfH / Math.tan(vf), halfW / Math.tan(hf)) * 1.05 + 10;
    const tilt = 0.5; // 기울기(라디안)
    ctl.target.copy(T(0, -1, z));
    const back = portrait
      ? new THREE.Vector3(-1, 0, 0)
      : new THREE.Vector3(0, 0, 1); // 세로: 서쪽에서, 가로: 남쪽에서
    cam.position
      .copy(ctl.target)
      .addScaledVector(back, Math.sin(tilt) * dist)
      .add(new THREE.Vector3(0, Math.cos(tilt) * dist, 0));
    ctl.maxDistance = Math.max(170, dist * 1.4);
    ctl.update();
    dirty = true;
  }
  // 영역이 화면(아래 시트에 가린 부분 제외)에 들어오도록 맞춤
  function fit(x0, y0, x1, y1, f, padBottomPx = 0, padTopPx = 70) {
    if (f !== floor) setFloor(f);
    const z = FL(f).z;
    const H = el.clientHeight,
      vis = Math.max(0.3, (H - padBottomPx - padTopPx) / H);
    const vf = (cam.fov * Math.PI) / 360,
      hf = Math.atan(Math.tan(vf) * cam.aspect);
    const dir = cam.position.clone().sub(ctl.target).normalize();
    // 화면 위·오른쪽 방향의 바닥 축으로 영역 크기 계산
    const fwd = new THREE.Vector3(-dir.x, 0, -dir.z).normalize(),
      right = new THREE.Vector3(-fwd.z, 0, fwd.x);
    let w = 0,
      h = 0;
    for (const [px, py] of [
      [x0, y0],
      [x0, y1],
      [x1, y0],
      [x1, y1],
    ]) {
      const v = T(px, py, 0).sub(T((x0 + x1) / 2, (y0 + y1) / 2, 0));
      w = Math.max(w, Math.abs(v.dot(right)));
      h = Math.max(h, Math.abs(v.dot(fwd)));
    }
    w += 4;
    h += 4;
    const dist = Math.min(
      ctl.maxDistance,
      Math.max(
        18,
        Math.max(
          h / Math.tan(vf * vis) / Math.max(0.5, -dir.y),
          w / Math.tan(hf),
        ),
      ),
    );
    const c = T((x0 + x1) / 2, (y0 + y1) / 2, z);
    // 보이는 영역의 가운데로 오도록 화면 아래 방향으로 밀기
    const shift =
      (((padBottomPx - padTopPx) / H) * dist * Math.tan(vf)) /
      Math.max(0.5, -dir.y);
    const tgt = c.clone().addScaledVector(fwd, -shift);
    flyTo(tgt.clone().addScaledVector(dir, dist), tgt);
  }
  function focus(x, y, f, dist = 45) {
    if (f !== floor) setFloor(f);
    const z = FL(f).z;
    const off = cam.position.clone().sub(ctl.target).setLength(dist);
    const tgt = T(x, y, z);
    flyTo(tgt.clone().add(off), tgt);
  }

  // ---- 탭으로 방 고르기
  let down = null;
  renderer.domElement.addEventListener(
    "pointerdown",
    (e) => (down = [e.clientX, e.clientY, performance.now()]),
  );
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (!down || firstPerson) return;
    const moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]);
    if (moved > 8 || performance.now() - down[2] > 450) return;
    const r = renderer.domElement.getBoundingClientRect();
    const ray = new THREE.Raycaster();
    ray.setFromCamera(
      new THREE.Vector2(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1,
      ),
      cam,
    );
    const hit = ray.ray.intersectPlane(
      new THREE.Plane(new THREE.Vector3(0, 1, 0), -FL(floor).z),
      new THREE.Vector3(),
    );
    if (hit) onPick?.(hit.x, -hit.z, floor);
  });

  // ---- 경로 그리기
  function ribbon(pts, width) {
    const parts = [];
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1],
        b = pts[i];
      const dx = b[0] - a[0],
        dy = b[1] - a[1],
        L = Math.hypot(dx, dy);
      if (L < 0.01) continue;
      const nx = (-dy / L) * width * 0.5,
        ny = (dx / L) * width * 0.5;
      const g = new THREE.BufferGeometry();
      g.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          [
            a[0] + nx,
            a[2],
            -(a[1] + ny),
            a[0] - nx,
            a[2],
            -(a[1] - ny),
            b[0] + nx,
            b[2],
            -(b[1] + ny),
            b[0] - nx,
            b[2],
            -(b[1] - ny),
          ],
          3,
        ),
      );
      g.setIndex([0, 1, 2, 2, 1, 3]);
      parts.push(g);
    }
    for (const p of pts) {
      const c = new THREE.CircleGeometry(width * 0.5, 14);
      c.rotateX(-Math.PI / 2);
      c.translate(p[0], p[2], -p[1]);
      parts.push(c);
    }
    const norm = parts.map((g) => (g.index ? g.toNonIndexed() : g));
    norm.forEach((g) => {
      for (const k of Object.keys(g.attributes))
        if (k !== "position") g.deleteAttribute(k);
    });
    return mergeGeometries(norm);
  }
  function chevrons(pts, every = 2.2) {
    const geo = new THREE.BufferGeometry();
    const v = [];
    let acc = every / 2;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1],
        b = pts[i],
        L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (L < 0.01) continue;
      const ux = (b[0] - a[0]) / L,
        uy = (b[1] - a[1]) / L;
      while (acc < L) {
        const t = acc / L,
          x = a[0] + (b[0] - a[0]) * t,
          y = a[1] + (b[1] - a[1]) * t,
          z = a[2] + (b[2] - a[2]) * t + 0.02;
        const s = 0.28;
        const tip = [x + ux * s, y + uy * s],
          l = [x - ux * s * 0.6 - uy * s, y - uy * s * 0.6 + ux * s],
          r = [x - ux * s * 0.6 + uy * s, y - uy * s * 0.6 - ux * s];
        v.push(tip[0], z, -tip[1], l[0], z, -l[1], r[0], z, -r[1]);
        acc += every;
      }
      acc -= L;
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    return geo;
  }
  const matMain = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: VIOLET,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const matGhost = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: VIOLET,
    transparent: true,
    opacity: 0.28,
    depthTest: false,
    side: THREE.DoubleSide,
  });
  const matChev = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: 0xffffff,
    side: THREE.DoubleSide,
    depthTest: false,
  });

  function clearRoute() {
    for (const c of [...routeGroup.children]) {
      routeGroup.remove(c);
      c.geometry?.dispose();
      if (c.isCSS2DObject) c.element.remove();
    }
    dirty = true;
  }
  function showRoute(route, dest, steps = []) {
    clearRoute();
    selectedKey = dest?.key || null;
    // 층별 연속 구간으로 나눠 그림
    const runs = [];
    let cur = null;
    for (const p of route.pts) {
      if (p.kind === "elev") {
        cur = null;
        continue;
      }
      if (!cur || cur.f !== p.f) {
        const prev = cur && cur.pts[cur.pts.length - 1];
        cur = { f: p.f, pts: prev ? [prev] : [] };
        runs.push(cur);
      }
      cur.pts.push([p.x, p.y, p.z + 0.08]);
    }
    for (const r of runs) {
      if (r.pts.length < 2) continue;
      for (const [mat, order] of [
        [matGhost, 1],
        [matMain, 2],
      ]) {
        const m = new THREE.Mesh(ribbon(r.pts, 0.9), mat);
        m.renderOrder = order;
        m.userData.f = r.f;
        routeGroup.add(m);
      }
      const c = new THREE.Mesh(chevrons(r.pts), matChev);
      c.renderOrder = 3;
      c.userData.f = r.f;
      routeGroup.add(c);
    }
    const s = route.pts[0],
      e = route.pts[route.pts.length - 1];
    const start = makeStart();
    start.position.copy(T(s.x, s.y, s.z + 0.1));
    start.userData.f = s.f;
    routeGroup.add(start);
    const pin = makePin();
    pin.position.copy(T(e.x, e.y, e.z));
    pin.userData.f = e.f;
    routeGroup.add(pin);
    // 층 이동 지점 표시
    const legs = route.legs;
    for (let li = 0; li < legs.length; li++) {
      const leg = legs[li];
      if (leg.kind === "walk") continue;
      // 층참만 지나 같은 계단을 이어 가면 처음 진입·마지막 진출만 표시
      const prevV =
        li >= 2 &&
        legs[li - 2].kind === leg.kind &&
        legs[li - 2].id === leg.id &&
        legs[li - 1].pts.length <= 3;
      const nextV =
        li + 2 < legs.length &&
        legs[li + 2].kind === leg.kind &&
        legs[li + 2].id === leg.id &&
        legs[li + 1].pts.length <= 3;
      let last = leg;
      for (
        let k = li;
        k + 2 < legs.length &&
        legs[k + 2].kind === leg.kind &&
        legs[k + 2].id === leg.id &&
        legs[k + 1].pts.length <= 3;
        k += 2
      )
        last = legs[k + 2];
      const up = leg.to > leg.from;
      const pa =
        leg.kind === "stair"
          ? leg.link.ramp.pts[up ? 0 : leg.link.ramp.pts.length - 1]
          : up
            ? leg.link.pa
            : leg.link.pb;
      const pb =
        leg.kind === "stair"
          ? leg.link.ramp.pts[up ? leg.link.ramp.pts.length - 1 : 0]
          : up
            ? leg.link.pb
            : leg.link.pa;
      const name = leg.kind === "elev" ? "엘리베이터" : "계단";
      const tags = [];
      if (!prevV)
        tags.push([
          pa,
          leg.from,
          `${name} ${up ? "↑" : "↓"} ${last.to === 0 ? "B1" : last.to + "층"}`,
        ]);
      if (!nextV) tags.push([pb, leg.to, `${name}에서 나와요`]);
      for (const [p, f, txt] of tags) {
        const div = document.createElement("div");
        div.className = "route-tag";
        div.textContent = txt;
        const o = new CSS2DObject(div);
        o.position.copy(T(p[0], p[1], FL(f).z + 1.6));
        o.userData.f = f;
        routeGroup.add(o);
      }
    }
    // 안내 단계 번호 표시 (목록과 지도를 맞춰 보기)
    stepDots = [];
    steps.forEach((st, i) => {
      if (st.kind === "start" || st.kind === "arrive" || !st.at) return;
      const div = document.createElement("div");
      div.className =
        "step-dot" +
        (st.kind === "stair" || st.kind === "elev" ? " vertical" : "");
      div.textContent = i;
      const o = new CSS2DObject(div);
      o.position.copy(T(st.at[0], st.at[1], FL(st.f).z + 0.3));
      o.userData.f = st.f;
      o.userData.step = i;
      routeGroup.add(o);
      stepDots.push(o);
    });
    applyVisibility();
    updateLabels();
  }
  let stepDots = [];
  function highlightStep(i) {
    for (const o of stepDots)
      o.element.classList.toggle("on", o.userData.step === i);
    dirty = true;
  }
  function select(d) {
    selectedKey = d ? d.key : null;
    updateLabels();
    dirty = true;
  }

  // ---- 표시물
  function makeStart() {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.CircleGeometry(0.75, 28),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: VIOLET,
        depthTest: false,
      }),
    );
    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(0.48, 28),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: 0xffffff,
        depthTest: false,
      }),
    );
    ring.rotation.x = dot.rotation.x = -Math.PI / 2;
    dot.position.y = 0.01;
    ring.renderOrder = 4;
    dot.renderOrder = 5;
    g.add(ring, dot);
    return g;
  }
  function makePin() {
    const g = new THREE.Group();
    const mat = new THREE.MeshLambertMaterial({
      toneMapped: false,
      color: DEEP,
      emissive: 0x2a1580,
    });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.75, 20, 14), mat);
    head.position.y = 2.6;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.9, 20), mat);
    cone.rotation.x = Math.PI;
    cone.position.y = 1.5;
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 14, 10),
      new THREE.MeshBasicMaterial({ toneMapped: false, color: 0xffffff }),
    );
    dot.position.set(0, 2.6, 0.55);
    g.add(head, cone, dot);
    return g;
  }
  function makeMe() {
    const g = new THREE.Group();
    const halo = new THREE.Mesh(
      new THREE.CircleGeometry(1.4, 30),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: 0x3d8bff,
        transparent: true,
        opacity: 0.22,
        depthTest: false,
      }),
    );
    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 24),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: 0x3d8bff,
        depthTest: false,
      }),
    );
    const cone = new THREE.Mesh(
      new THREE.CircleGeometry(2.6, 24, -0.45, 0.9),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: 0x3d8bff,
        transparent: true,
        opacity: 0.3,
        depthTest: false,
      }),
    );
    for (const m of [halo, dot, cone]) {
      m.rotation.x = -Math.PI / 2;
      m.renderOrder = 6;
    }
    g.add(halo, cone, dot);
    g.userData.cone = cone;
    return g;
  }
  function setMe(p) {
    me.visible = !!p && p.f === floor && !firstPerson;
    if (p) {
      me.position.copy(T(p.x, p.y, FL(p.f).z + 0.12));
      me.userData.cone.visible = p.yaw != null;
      me.rotation.y = ((p.yaw ?? 90) * Math.PI) / 180;
    }
    dirty = true;
  }

  // ---- 미리 걷기 (1인칭)
  const walkPose = { x: 0, y: 0, z: 0, f: 1, yaw: 0, pitch: -0.12 };
  function setFirstPerson(on) {
    firstPerson = on;
    ctl.enabled = !on;
    // 위에서 내려다볼 때는 바닥이 칙칙해 보이지 않게 조금 더 밝게
    renderer.toneMappingExposure = on
      ? LIGHTING.exposure
      : LIGHTING.mapExposure;
    applyVisibility();
    updateLabels();
  }
  let lastFloorVis = null;
  function setWalkPose(p) {
    Object.assign(walkPose, p);
    // 층이 바뀔 때만 보이기 다시 정함(이름표는 그리기에서 0.12초마다)
    if (walkPose.f !== lastFloorVis) {
      lastFloorVis = walkPose.f;
      applyVisibility();
    }
  }

  // ---- 그리기 (필요할 때만)
  let lastLabelUpdate = 0;
  let lastPoseKey = "";
  (function loop(now) {
    requestAnimationFrame(loop);
    if (firstPerson) {
      // 위치·방향이 바뀌었을 때만 그림(멈춰 있으면 쉼)
      const key = `${walkPose.x.toFixed(3)},${walkPose.y.toFixed(3)},${walkPose.z.toFixed(3)},${walkPose.yaw.toFixed(2)},${walkPose.pitch.toFixed(3)}`;
      const moved = key !== lastPoseKey;
      if (moved) {
        lastPoseKey = key;
        lastMove = now;
        setPR(PR_LOW);
      } else if (pr !== PR_HIGH && now - lastMove > 250) {
        setPR(PR_HIGH);
        dirty = true;
      }
      if (!moved && !dirty) return;
      dirty = false;
      fp.position.set(walkPose.x, walkPose.z + 1.6, -walkPose.y);
      // yaw: 동쪽 0 반시계(도) → three 카메라 회전
      fp.rotation.set(walkPose.pitch, ((walkPose.yaw - 90) * Math.PI) / 180, 0);
      renderer.render(scene, fp);
      if (now - lastLabelUpdate > 120) {
        updateLabels();
        lastLabelUpdate = now;
      }
      lr.render(scene, fp);
      return;
    }
    if (floorAnim) {
      const k = Math.min(1, (now - floorAnim.t0) / floorAnim.dur),
        e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      cam.position.lerpVectors(floorAnim.cam0, floorAnim.cam1, e);
      ctl.target.lerpVectors(floorAnim.tgt0, floorAnim.tgt1, e);
      if (k >= 1) floorAnim = null;
      dirty = true;
    }
    const moving = ctl.update() || !!floorAnim;
    if (moving) {
      dirty = true;
      lastMove = now;
      setPR(PR_LOW);
    } else if (pr !== PR_HIGH && now - lastMove > 250) {
      setPR(PR_HIGH);
      dirty = true;
    }
    if (!dirty) return;
    dirty = false;
    if (now - lastLabelUpdate > 120) {
      updateLabels();
      lastLabelUpdate = now;
    }
    renderer.render(scene, cam);
    lr.render(scene, cam);
  })(performance.now());

  return {
    load,
    setFloor,
    get floor() {
      return floor;
    },
    frame,
    fit,
    focus,
    showRoute,
    highlightStep,
    clearRoute,
    select,
    setMe,
    setFirstPerson,
    setWalkPose,
    nodes,
    redraw: () => (dirty = true),
  };
}
