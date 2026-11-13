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
import { floorViewPose } from "./camera.mjs";
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
  const floorBounds = new Map();
  const labels = [];
  const routeGroup = new THREE.Group();
  scene.add(routeGroup);
  const facilityGroup = new THREE.Group();
  scene.add(facilityGroup);
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
  new ResizeObserver(resize).observe(el);
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
          { elevDoors: elevDoorsOf(+o.name.slice(1)) },
        );
      nodes[o.name] = o;
    });
    scene.add(g.scene);
    g.scene.updateMatrixWorld(true);
    for (const f of M.floors) {
      const bounds = new THREE.Box3();
      for (const [name, node] of Object.entries(nodes)) {
        if (name[0] !== "C" && name[0] !== "X" && +name.slice(1) === f.n)
          bounds.expandByObject(node);
      }
      if (!bounds.isEmpty()) floorBounds.set(f.n, bounds);
    }
    buildFacilities();
    buildLabels();
    setFloor(floor, true);
  }

  // 이 층 엘리베이터 문 자리(도면의 EV 문)
  function elevDoorsOf(n) {
    const fl = M.floors.find((f) => f.n === n);
    return (fl?.doors || [])
      .filter((d) => d.cat === "elev" || /^EV/.test(d.id))
      .map((d) => d.p);
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
      if (d.cat === "toilet") {
        div.classList.add("restroom-label");
        div.dataset.gender = /女|여/.test(d.title)
          ? "여"
          : /男|남/.test(d.title)
            ? "남"
            : "";
        div.setAttribute("role", "img");
        div.setAttribute(
          "aria-label",
          `${d.f === 0 ? "지하 1" : d.f}층 ${d.title}`,
        );
        div.title = `${d.title}${d.name ? " · " + d.name : ""}`;
        const icon = document.createElement("img");
        icon.src = "ui/restroom.svg";
        icon.alt = "";
        div.append(icon);
      } else div.textContent = short;
      const o = new CSS2DObject(div);
      o.position.copy(T(p[0], p[1], FL(d.f).z + 0.6));
      o.userData = { d };
      o.visible = false;
      scene.add(o);
      labels.push(o);
    }
  }
  // Color the actual restroom footprints in plan view, independently of the
  // architectural model and route materials.
  function buildFacilities() {
    const fill = new THREE.MeshBasicMaterial({
      color: 0x1684b8,
      transparent: true,
      opacity: 0.3,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const outline = new THREE.MeshBasicMaterial({
      color: 0x1675a9,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    for (const f of M.floors) {
      const group = new THREE.Group();
      group.userData.f = f.n;
      for (const room of f.rooms.filter((r) => r.cat === "toilet")) {
        const shape = new THREE.Shape(
          room.poly.map(([x, y]) => new THREE.Vector2(x, y)),
        );
        const area = new THREE.Mesh(new THREE.ShapeGeometry(shape), fill);
        area.rotation.x = -Math.PI / 2;
        area.position.y = f.z + 0.1;
        area.renderOrder = 1;
        group.add(area);
        const edge = new THREE.Mesh(
          ribbon(
            room.poly.map(([x, y]) => [x, y, f.z + 0.11]),
            0.12,
          ),
          outline,
        );
        edge.renderOrder = 2;
        group.add(edge);
      }
      facilityGroup.add(group);
    }
  }
  let selectedKey = null;
  function updateLabels() {
    const dist = cam.position.distanceTo(ctl.target);
    // Keep labels readable at the distance needed for narrow viewports.
    const roomLabelDistance = Math.max(
      130,
      Math.min(200, (130 * 1440) / el.clientWidth),
    );
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
        o.visible =
          d.f === floor &&
          (sel ||
            d.cat === "toilet" ||
            dist < (d.numbered ? roomLabelDistance : 200));
    }
  }

  function applyVisibility() {
    facilityGroup.visible = !firstPerson;
    for (const group of facilityGroup.children)
      group.visible = group.userData.f === floor;
    for (const key in nodes) {
      const kind = key[0],
        n = +key.slice(1);
      if (kind === "X") nodes[key].visible = firstPerson;
      else if (firstPerson) nodes[key].visible = Math.abs(n - walkPose.f) <= 1;
      else nodes[key].visible = kind !== "C" && n === floor;
    }
    const mode = firstPerson ? "walk" : "map";
    for (const c of routeGroup.children)
      c.visible =
        c.userData.mode && c.userData.mode !== mode
          ? false
          : firstPerson
            ? !c.isCSS2DObject || routeTagSeen(c)
            : c.userData.f == null || c.userData.f === floor;
    routeDepth();
    dirty = true;
  }

  // 걸어 보기에서는 지금 시점에서 보이는 경로만: 경로 띠·화살표·표시가 벽·바닥에 가려지게.
  // (지도 보기에서는 벽 아래 경로도 보이도록 원래대로 가리지 않음)
  function routeDepth() {
    routeGroup.traverse((o) => {
      if (!o.material) return;
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        if (m.userData.depth0 === undefined) m.userData.depth0 = m.depthTest;
        m.depthTest = firstPerson || m.userData.depth0;
      }
    });
  }
  // 글자 표시(층 이동·안내 번호)는 깊이로 가려지지 않으므로, 같은 층에서 벽에 막히지 않을 때만
  function routeTagSeen(o) {
    if (o.userData.f !== walkPose.f) return false;
    const x1 = o.position.x,
      y1 = -o.position.z;
    return seeFrom(walkPose.f, walkPose.x, walkPose.y, x1, y1);
  }
  // 걷기 격자로 두 점 사이가 벽에 막혔는지(0.8m 넘게 이어서 못 걷는 곳이면 막힘). 끝 1m는 봐줌(계단·문 앞)
  function seeFrom(f, x0, y0, x1, y1) {
    const L = Math.hypot(x1 - x0, y1 - y0);
    if (L > 25) return false;
    const n = Math.max(1, Math.ceil(L / 0.25));
    let run = 0;
    for (let i = 1; i < n; i++) {
      if (L * (1 - i / n) < 1) break;
      const t = i / n;
      if (!indoor.walk(f, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)) {
        run += L / n;
        if (run > 0.8) return false;
      } else run = 0;
    }
    return true;
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
    if (reframe) frame({ animate });
    applyVisibility();
    updateLabels();
  }
  // 현재 층 모델의 실제 중심·크기로 맞춤. 초기화 시 기울기와 방향도 복원합니다.
  function frame({ resetOrientation = true, animate = false } = {}) {
    const bounds = floorBounds.get(floor);
    if (!bounds) return;
    const direction = resetOrientation
      ? undefined
      : floorAnim
        ? floorAnim.cam1.clone().sub(floorAnim.tgt1)
        : cam.position.clone().sub(ctl.target);
    const pose = floorViewPose(bounds, {
      width: el.clientWidth,
      height: el.clientHeight,
      fov: cam.fov,
      direction,
    });
    // Clear residual drag/zoom damping before restoring or animating a view.
    const damping = ctl.enableDamping;
    ctl.enableDamping = false;
    ctl.update();
    ctl.enableDamping = damping;
    floorAnim = null;
    ctl.maxDistance = Math.max(170, pose.distance * 1.4);
    if (animate) flyTo(pose.position, pose.target);
    else {
      cam.position.copy(pose.position);
      ctl.target.copy(pose.target);
      ctl.update();
    }
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
  // 지도 보기 경로 선: 위에서 안내하는 화면이라 벽·보에 가려지지 않게
  const matMain = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: VIOLET,
    side: THREE.DoubleSide,
    depthTest: false,
  });
  // 지도 보기 경로 테두리: 벽 아래 경로도 보이게 가려지지 않음(기존 반투명 띠 자리)
  const matMapHalo = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: VIOLET,
    transparent: true,
    opacity: 0.2,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const MAP_MARK = 4; // 지도 보기 출발·도착 표시 크기(미리 걷기 표시의 배율)
  const matChev = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: 0xffffff,
    side: THREE.DoubleSide,
    depthTest: false,
  });

  // 걸어 보기용(눈높이) 경로 재질
  const matWalkLine = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: VIOLET,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const matWalkHalo = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: VIOLET,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  const matWalkChev = new THREE.MeshBasicMaterial({
    toneMapped: false,
    color: 0xffffff,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -3,
  });
  // 가는 '>' 모양 화살표(두 획): 선 위에 every m마다
  function chevronsV(pts, every = 1.4, size = 0.13, stroke = 0.035) {
    const v = [];
    const quad = (x0, y0, x1, y1, z) => {
      const L = Math.hypot(x1 - x0, y1 - y0) || 1,
        nx = (-(y1 - y0) / L) * stroke * 0.5,
        ny = ((x1 - x0) / L) * stroke * 0.5;
      const A = [x0 + nx, z, -(y0 + ny)],
        B = [x0 - nx, z, -(y0 - ny)],
        C = [x1 + nx, z, -(y1 + ny)],
        D = [x1 - nx, z, -(y1 - ny)];
      v.push(...A, ...B, ...C, ...C, ...B, ...D);
    };
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
          z = a[2] + (b[2] - a[2]) * t + 0.012;
        const tx = x + ux * size * 0.5,
          ty = y + uy * size * 0.5;
        for (const sgn of [1, -1])
          quad(
            x - ux * size * 0.5 - uy * size * 0.75 * sgn,
            y - uy * size * 0.5 + ux * size * 0.75 * sgn,
            tx,
            ty,
            z,
          );
        acc += every;
      }
      acc -= L;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    return geo;
  }

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
      // Figma 실내 UI의 보라색 경로 띠와 흰색 방향 표시.
      for (const [geo, mat, order] of [
        [ribbon(r.pts, 1.3), matMapHalo, 1],
        [ribbon(r.pts, 0.6), matMain, 2],
        [chevronsV(r.pts, 3.2, 0.34, 0.09), matChev, 3],
      ]) {
        const m = new THREE.Mesh(geo, mat);
        m.renderOrder = order;
        m.userData = { f: r.f, mode: "map" };
        routeGroup.add(m);
      }
      // 미리 걷기: 눈높이에서도 진행 방향을 읽을 수 있는 경로 띠.
      const walkPts = r.pts.map((p) => [p[0], p[1], p[2] - 0.05]);
      for (const [geo, mat, order] of [
        [ribbon(walkPts, 1), matWalkHalo, 1],
        [ribbon(walkPts, 0.8), matWalkLine, 2],
        [chevronsV(walkPts, 1.4, 0.34, 0.07), matWalkChev, 3],
      ]) {
        const m = new THREE.Mesh(geo, mat);
        m.renderOrder = order;
        m.userData = { f: r.f, mode: "walk" };
        routeGroup.add(m);
      }
    }
    const s = route.pts[0],
      e = route.pts[route.pts.length - 1];
    // 지도 보기 출발·도착: 미리 걷기와 같은 모양을 지도 크기로
    const start = makeWalkStart(true);
    start.scale.setScalar(MAP_MARK);
    start.position.copy(T(s.x, s.y, s.z + 0.1));
    start.userData = { f: s.f, mode: "map" };
    routeGroup.add(start);
    const pin = makeWalkPin(true);
    pin.scale.setScalar(MAP_MARK);
    pin.position.copy(T(e.x, e.y, e.z));
    pin.userData = { f: e.f, mode: "map" };
    routeGroup.add(pin);
    const wStart = makeWalkStart();
    wStart.position.copy(T(s.x, s.y, s.z + 0.04));
    wStart.userData = { f: s.f, mode: "walk" };
    routeGroup.add(wStart);
    const wPin = makeWalkPin();
    wPin.position.copy(T(e.x, e.y, e.z));
    wPin.userData = { f: e.f, mode: "walk" };
    routeGroup.add(wPin);
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
  // 걸어 보기 출발: 바닥의 작은 고리
  function makeWalkStart(onTop = false) {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.28, 40),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: VIOLET,
        side: THREE.DoubleSide,
        depthTest: !onTop, // 지도에서는 벽에 가려지지 않게
      }),
    );
    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(0.1, 24),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: VIOLET,
        side: THREE.DoubleSide,
        depthTest: !onTop, // 지도에서는 벽에 가려지지 않게
      }),
    );
    ring.rotation.x = dot.rotation.x = -Math.PI / 2;
    if (onTop) ring.renderOrder = dot.renderOrder = 4;
    g.add(ring, dot);
    return g;
  }
  // 걸어 보기 도착: 바닥 고리(보라·흰) + 가는 기둥 위 작은 구슬(눈높이 아래)
  function makeWalkPin(onTop = false) {
    const g = new THREE.Group();
    const violet = new THREE.MeshBasicMaterial({
      toneMapped: false,
      color: VIOLET,
      side: THREE.DoubleSide,
    });
    const outer = new THREE.Mesh(
      new THREE.RingGeometry(0.36, 0.44, 48),
      violet,
    );
    const inner = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.25, 40),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: 0xffffff,
        side: THREE.DoubleSide,
      }),
    );
    const fill = new THREE.Mesh(
      new THREE.CircleGeometry(0.36, 48),
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        color: VIOLET,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    for (const m of [outer, inner, fill]) {
      m.rotation.x = -Math.PI / 2;
      m.position.y = 0.04;
    }
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 1.05, 10),
      violet,
    );
    stem.position.y = 0.55;
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 24, 16),
      new THREE.MeshLambertMaterial({
        toneMapped: false,
        color: DEEP,
        emissive: 0x2a1580,
      }),
    );
    head.position.y = 1.15;
    g.add(fill, outer, inner, stem, head);
    // 지도 보기: 벽에 가려지지 않게(바닥 고리 → 기둥 → 구슬 순서로 위에)
    if (onTop)
      [fill, outer, inner, stem, head].forEach((m, i) => {
        m.material = m.material.clone();
        m.material.depthTest = false;
        m.renderOrder = 4 + i;
      });
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
    resize,
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
