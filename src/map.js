import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
import {
  BUILDINGS,
  NODES,
  EDGES,
  CAMPUS_GEOMETRY,
  ENTRANCES,
  MAIN_GATE,
} from "./data.mjs";
import {
  locateReportPoint,
  edgeId,
  reportLocation,
  clusterReports,
} from "./reports.mjs";
import { buildingLabel, worksPeriod } from "./buildings.mjs";
import { createGraphOverlay } from "./graph-overlay.js";
const VIOLET = 0x7950ff;

// Three.js 기반 독립 구현. 외곽선/도로 데이터만 별도 ODbL 데이터에서 가져옵니다.
export function createCampusMap(host, onSelect, onRoadSelect) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0, 0);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute(
    "aria-label",
    "서울과기대 3D 지도. 드래그 회전, 스크롤 확대. 터치: 한 손가락 이동, 두 손가락 벌리기 확대, 비틀기 회전, 함께 위아래로 밀기 기울이기. 신고 모드에서 지도 위치 클릭. 방향키 회전, Enter로 지도 가운데 위치 신고.",
  );
  const scene = new THREE.Scene(),
    camera = new THREE.OrthographicCamera(-600, 600, 600, -600, 1, 3500);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minPolarAngle = 0.12;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.minZoom = 0.5;
  controls.maxZoom = 12;
  controls.zoomToCursor = true;
  // 터치: 한 손가락은 지도 이동, 두 손가락은 아래 touchGesture가 직접 처리합니다.
  // (OrbitControls 기본값은 두 손가락 확대·이동뿐이라 비틀어 회전·기울이기가 없습니다.)
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: null };
  const labels = new CSS2DRenderer();
  labels.domElement.style.cssText =
    "position:absolute;inset:0;pointer-events:none;overflow:hidden";
  host.append(renderer.domElement, labels.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcadbb1, 1.8));
  const sun = new THREE.DirectionalLight(0xffffff, 2.1);
  sun.position.set(-350, 950, 550);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -800,
    right: 800,
    top: 800,
    bottom: -800,
    far: 2500,
  });
  sun.shadow.normalBias = 0.7;
  sun.shadow.bias = -0.0002;
  scene.add(sun);
  const matte = (color) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.86, metalness: 0 });
  function shapeFor(outline, holes = []) {
    const shape = new THREE.Shape(
      outline.map(([x, z]) => new THREE.Vector2(x, -z)),
    );
    for (const hole of holes)
      shape.holes.push(
        new THREE.Path(hole.map(([x, z]) => new THREE.Vector2(x, -z))),
      );
    return shape;
  }
  function flatPolygon(outline, color, y, holes = []) {
    const mesh = new THREE.Mesh(
      new THREE.ShapeGeometry(shapeFor(outline, holes)),
      matte(color),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  }
  const terrainMeshes = [];
  for (const ring of CAMPUS_GEOMETRY.boundary) {
    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shapeFor(ring), {
        depth: 5,
        bevelEnabled: false,
      }),
      matte(0xaec58e),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -5;
    mesh.receiveShadow = true;
    scene.add(mesh);
    terrainMeshes.push(mesh);
  }
  const landColors = {
    wood: 0x90af73,
    park: 0xb8ce9a,
    pitch: 0x77a65f,
    water: 0x75b6c4,
    construction: 0xcbbd9e,
  };
  for (const land of CAMPUS_GEOMETRY.lands) {
    const poly = flatPolygon(
      land.outline,
      landColors[land.kind] || 0xb0c696,
      0.15,
    );
    if (land.kind === "water") poly.material.roughness = 0.35;
  }
  function segment(a, b, width, color, y, group = scene) {
    const length = Math.hypot(b.x - a.x, b.z - a.z);
    if (length < 0.01) return;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.22, length),
      matte(color),
    );
    mesh.position.set((a.x + b.x) / 2, y, (a.z + b.z) / 2);
    mesh.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  // 공개 도로 형태에 따라 차도·보행로를 구분해 표시합니다.
  for (const road of CAMPUS_GEOMETRY.roads) {
    const vehicle = [
        "service",
        "residential",
        "tertiary",
        "secondary",
        "living_street",
      ].includes(road.kind),
      width = vehicle
        ? road.kind === "service"
          ? 5.8
          : 9
        : road.kind === "steps"
          ? 2
          : 2.8;
    for (let i = 1; i < road.points.length; i++) {
      const [ax, az] = road.points[i - 1],
        [bx, bz] = road.points[i];
      segment({ x: ax, z: az }, { x: bx, z: bz }, width + 1.4, 0xd8d4c2, 0.35);
      segment(
        { x: ax, z: az },
        { x: bx, z: bz },
        width,
        vehicle ? 0x89908d : road.kind === "steps" ? 0xb8aa91 : 0xe6d8bd,
        0.55,
      );
    }
  }
  const profiles = {
    future: { wall: 0xd8dbd7, glass: 0x5c858f },
    eoui: { wall: 0xd8d9cf, glass: 0x568598 },
    davinci: { wall: 0xc2bcac, glass: 0x4d788b },
    dasan: { wall: 0xd7c09b, glass: 0x586f70 },
    changhak: { wall: 0xd7c59e, glass: 0x576f75 },
    student: { wall: 0xc2a576, glass: 0x657b79 },
    student2: { wall: 0xc99e72, glass: 0x607d83 },
    creative: { wall: 0xd1b480, glass: 0x617c82 },
  };
  const buildingMeshes = [],
    buildingGroups = new Map(),
    labelObjects = [];
  let homeMode = true,
    reporting = false;
  for (const b of BUILDINGS) {
    const profile = profiles[b.id] || { wall: 0xd3d4cc, glass: 0x557e8b };
    const roofColor = b.roof
      ? new THREE.Color(b.roof)
      : new THREE.Color(0x82928c);
    const body = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shapeFor(b.outline, b.holes), {
        depth: b.h,
        bevelEnabled: false,
      }),
      matte(profile.wall),
    );
    body.rotation.x = -Math.PI / 2;
    body.position.y = 0.9;
    body.castShadow = true;
    body.receiveShadow = true;
    body.userData.building = b.id;
    scene.add(body);
    buildingMeshes.push(body);
    const roof = flatPolygon(b.outline, roofColor, b.h + 1, b.holes);
    roof.userData.building = b.id;
    buildingMeshes.push(roof);
    const windowSpecs = [];
    const floors = Math.max(1, Math.round(b.floors));
    for (const ring of [b.outline, ...b.holes])
      for (let i = 0; i < ring.length; i++) {
        const a = ring[i],
          c = ring[(i + 1) % ring.length],
          dx = c[0] - a[0],
          dz = c[1] - a[1],
          length = Math.hypot(dx, dz);
        if (length < 5) continue;
        const count = Math.floor(length / 5.8);
        for (let k = 0; k < count; k++)
          for (let floor = 0; floor < floors; floor++) {
            const y = 3.2 + floor * (b.h / floors);
            if (y + 1.6 > b.h) continue;
            const t = (k + 0.5) / count;
            windowSpecs.push({
              x: a[0] + dx * t,
              z: a[1] + dz * t,
              y,
              angle: Math.atan2(dz, dx),
              w: Math.min(2.6, length / count - 1.6),
            });
          }
      }
    const glass = new THREE.InstancedMesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
          color: profile.glass,
          roughness: 0.35,
          metalness: 0.18,
        }),
        windowSpecs.length,
      ),
      dummy = new THREE.Object3D();
    windowSpecs.forEach((window, i) => {
      dummy.position.set(window.x, window.y, window.z);
      dummy.rotation.set(0, -window.angle, 0);
      dummy.scale.set(window.w, 2.4, 0.32);
      dummy.updateMatrix();
      glass.setMatrixAt(i, dummy.matrix);
    });
    glass.userData.building = b.id;
    scene.add(glass);
    buildingMeshes.push(glass);
    // 이름이 있는 건물만 라벨을 표시하고 모든 건물에 클릭을 연결합니다.
    let label = null;
    if (b.name !== "교내 건물") {
      const element = document.createElement("button");
      element.className = "building-label";
      element.textContent = buildingLabel(b);
      element.setAttribute("aria-label", `${b.name} 출발지 또는 도착지 선택`);
      element.onclick = (e) => {
        e.stopPropagation();
        if (!homeMode && !reporting) onSelect(b.id);
      };
      element.ondblclick = (e) => {
        e.stopPropagation();
        if (!homeMode && !reporting) focusBuilding(b);
      };
      label = new CSS2DObject(element);
      label.position.set(b.x, b.h + 12, b.z);
      scene.add(label);
      labelObjects.push({ id: b.id, label });
    }
    buildingGroups.set(b.id, { body, profile, label, b });
  }
  const treeData = CAMPUS_GEOMETRY.trees;
  const trunks = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.6, 0.9, 6, 4),
      matte(0x8d7655),
      treeData.length,
    ),
    crowns = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(1, 0),
      matte(0x6f925a),
      treeData.length,
    ),
    treeMatrix = new THREE.Object3D();
  treeData.forEach(([x, z, s], i) => {
    treeMatrix.position.set(x, 3, z);
    treeMatrix.rotation.set(0, 0, 0);
    treeMatrix.scale.set(1, 1, 1);
    treeMatrix.updateMatrix();
    trunks.setMatrixAt(i, treeMatrix.matrix);
    treeMatrix.position.set(x, 9, z);
    treeMatrix.scale.set(3.5 * s, 6 * s, 3.5 * s);
    treeMatrix.updateMatrix();
    crowns.setMatrixAt(i, treeMatrix.matrix);
  });
  crowns.castShadow = true;
  scene.add(trunks, crowns);
  const entranceGroup = new THREE.Group(),
    entranceMaterial = new THREE.MeshBasicMaterial({
      color: 0xa9dc38,
      depthTest: false,
    }),
    entranceStemGeometry = new THREE.CylinderGeometry(0.45, 0.45, 4.2, 8),
    entranceDotGeometry = new THREE.SphereGeometry(1.75, 12, 8),
    entranceRingGeometry = new THREE.RingGeometry(2.2, 3.1, 20);
  // 등록된 출입구(team-survey.json)를 초록 점으로 그립니다. 편집기로 바꾸면 다시 그립니다.
  function setEntrances(list) {
    for (const child of [...entranceGroup.children])
      entranceGroup.remove(child);
    for (const entrance of list) addEntranceMarker(entrance);
    if (editHandler) setEditHandler(editHandler);
  }
  function addEntranceMarker(entrance) {
    const stem = new THREE.Mesh(entranceStemGeometry, entranceMaterial),
      dot = new THREE.Mesh(entranceDotGeometry, entranceMaterial),
      ring = new THREE.Mesh(entranceRingGeometry, entranceMaterial),
      markerElement = document.createElement("span"),
      marker = new CSS2DObject(markerElement);
    markerElement.className = "entrance-dot";
    markerElement.title = entrance.name;
    markerElement.setAttribute("role", "img");
    markerElement.setAttribute("aria-label", entrance.name);
    stem.position.set(entrance.x, 3, entrance.z);
    dot.position.set(entrance.x, 5.6, entrance.z);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(entrance.x, 1.2, entrance.z);
    marker.position.set(entrance.x, 8, entrance.z);
    stem.renderOrder = dot.renderOrder = ring.renderOrder = 4;
    entranceGroup.add(stem, dot, ring, marker);
  }
  for (const entrance of ENTRANCES) addEntranceMarker(entrance);
  entranceGroup.visible = false;
  scene.add(entranceGroup);
  const gateLabel = document.createElement("span");
  gateLabel.className = "building-label gate-label";
  gateLabel.textContent = "정문";
  const gateObj = new CSS2DObject(gateLabel);
  gateObj.position.set(MAIN_GATE.x, 12, MAIN_GATE.z);
  scene.add(gateObj);
  labelObjects.push({ id: "gate", label: gateObj });
  const routeGroup = new THREE.Group(),
    warningGroup = new THREE.Group(),
    reportPreviewGroup = new THREE.Group(),
    userLocationGroup = new THREE.Group();
  userLocationGroup.visible = false;
  scene.add(routeGroup, warningGroup, reportPreviewGroup, userLocationGroup);
  const warningLabels = [];
  let movingDot = null,
    routeCurve = null,
    routeLength = 1;
  function clearGroup(group) {
    while (group.children.length) {
      const child = group.children[0];
      group.remove(child);
      child.geometry?.dispose();
      if (Array.isArray(child.material))
        child.material.forEach((m) => m.dispose());
      else child.material?.dispose();
    }
  }
  // nodes: 경로의 노드 위치를 찾을 그래프. 편집 모드에서는 조사 데이터를 합친 그래프가 들어옵니다.
  function setRoute(route, startId, destinationId, nodes = NODES) {
    clearGroup(routeGroup);
    movingDot = null;
    for (const [id, { body, profile, label }] of buildingGroups) {
      body.material.color.setHex(profile.wall);
      if (id === startId)
        body.material.color.lerp(new THREE.Color(VIOLET), 0.2);
      if (id === destinationId)
        body.material.color.lerp(new THREE.Color(0xa9dc38), 0.18);
    }
    for (const { id, label } of labelObjects) {
      label.element.classList.toggle("origin-label", id === startId);
      label.element.classList.toggle("destination", id === destinationId);
    }
    if (!route) return;
    const points = route.path.map(
      (id) => new THREE.Vector3(nodes[id].x, 1.8, nodes[id].z),
    );
    routeCurve = new THREE.CurvePath();
    for (let i = 1; i < points.length; i++) {
      const a = { x: points[i - 1].x, z: points[i - 1].z },
        b = { x: points[i].x, z: points[i].z };
      segment(a, b, 4.3, 0xffffff, 1.2, routeGroup);
      segment(a, b, 2.7, VIOLET, 1.6, routeGroup);
      routeCurve.add(new THREE.LineCurve3(points[i - 1], points[i]));
    }
    const origin = points[0];
    if (origin) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(4.8, 1.3, 6, 24),
        new THREE.MeshBasicMaterial({ color: VIOLET }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.copy(origin);
      ring.position.y = 2;
      routeGroup.add(ring);
    }
    const destination = points.at(-1);
    if (destination && points.length > 1) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(3.2, 5.2, 24),
        new THREE.MeshBasicMaterial({
          color: 0xa9dc38,
          side: THREE.DoubleSide,
        }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.copy(destination);
      ring.position.y = 2;
      routeGroup.add(ring);
    }
    if (routeCurve.curves.length) {
      movingDot = new THREE.Mesh(
        new THREE.SphereGeometry(2.1, 8, 6),
        new THREE.MeshBasicMaterial({ color: 0xd5ff76 }),
      );
      routeGroup.add(movingDot);
    }
    routeLength = route.meters;
  }
  // 30m 안 신고를 한 구역으로 묶어 구역마다 표시 하나만 띄웁니다.
  // 서로 다른 기기 3건 이상이면 주의(노란색), 관리자가 확정하면 빨간색으로 막습니다.
  function setReports(reports) {
    clearReportSelection();
    clearGroup(warningGroup);
    for (const label of warningLabels) {
      scene.remove(label);
      label.element.remove();
    }
    warningLabels.length = 0;
    for (const cluster of clusterReports(reports)) {
      if (cluster.status === "pending") continue; // 아직 기준 미만: 지도에 표시하지 않음
      const confirmed = cluster.status === "confirmed";
      for (const id of cluster.edgeIds) {
        const edge = EDGES.find((e) => edgeId(e) === id);
        if (edge)
          segment(
            NODES[edge.a],
            NODES[edge.b],
            3.5,
            confirmed ? 0xd43f3f : 0xf2c200,
            1,
            warningGroup,
          );
      }
      // 표시는 대표 신고 위치에 하나만 찍습니다(확정 전에는 가장 최근 사진 신고).
      const cover = cluster.cover;
      const el = document.createElement("button");
      el.className = confirmed
        ? "road-warning road-warning-confirmed"
        : "road-warning";
      el.setAttribute("aria-label", `신고 위치: ${reportLocation(cover)}`);
      el.innerHTML = confirmed
        ? '<span class="warning-triangle" aria-hidden="true">⛔</span><small>통행 막힘(확정)</small>'
        : `<span class="warning-triangle" aria-hidden="true">!</span><small>통행 주의 · 신고 ${cluster.count}건</small>`;
      el.onclick = (e) => {
        e.stopPropagation();
        onRoadSelect({ reportId: cover.id });
      };
      const label = new CSS2DObject(el);
      label.position.set(cover.point.x, 12, cover.point.z);
      label.visible = !homeMode;
      scene.add(label);
      warningLabels.push(label);
    }
  }
  // 관리자가 등록한 건물 공사: 건물 위에 🚧 표시. 누르면 공사 기간이 몇 초 보였다가 사라집니다.
  const workLabels = [];
  function setWorks(works) {
    for (const label of workLabels) {
      scene.remove(label);
      label.element.remove();
    }
    workLabels.length = 0;
    for (const work of works) {
      const b = buildingGroups.get(work.buildingId)?.b;
      if (!b) continue;
      const el = document.createElement("button"),
        bubble = document.createElement("span");
      el.className = "building-work";
      el.setAttribute("aria-label", `${b.name} 공사 중 · 기간 보기`);
      el.innerHTML = '<span aria-hidden="true">🚧</span>';
      bubble.className = "building-work-bubble";
      bubble.setAttribute("role", "status");
      bubble.hidden = true;
      bubble.textContent = `${b.name} 공사 ${worksPeriod(work)}${work.note ? ` · ${work.note}` : ""}`;
      el.append(bubble);
      let timer;
      el.onclick = (e) => {
        e.stopPropagation();
        bubble.hidden = false;
        clearTimeout(timer);
        timer = setTimeout(() => (bubble.hidden = true), 3000);
      };
      const label = new CSS2DObject(el);
      label.position.set(b.x, b.h + 26, b.z);
      label.visible = !homeMode;
      scene.add(label);
      workLabels.push(label);
    }
  }
  function setReporting(value) {
    reporting = value;
    renderer.domElement.style.cursor = value ? "crosshair" : "";
    host.classList.toggle("reporting", value);
    for (const { label } of labelObjects) {
      label.element.style.pointerEvents = value || homeMode ? "none" : "auto";
      if (label.element.tagName === "BUTTON")
        label.element.tabIndex = value || homeMode ? -1 : 0;
    }
  }
  function previewReportSelection(selection) {
    clearGroup(reportPreviewGroup);
    const edge = selection && EDGES.find((e) => edgeId(e) === selection.edgeId);
    if (!edge) return;
    segment(
      NODES[edge.a],
      NODES[edge.b],
      7,
      0xffffff,
      1.35,
      reportPreviewGroup,
    );
    segment(
      NODES[edge.a],
      NODES[edge.b],
      4.8,
      0xf0a52f,
      1.7,
      reportPreviewGroup,
    );
  }
  function clearReportSelection() {
    clearGroup(reportPreviewGroup);
  }
  function setUserLocation(position, { follow = false } = {}) {
    clearGroup(userLocationGroup);
    if (!position) {
      userLocationGroup.visible = false;
      return;
    }
    userLocationGroup.visible = true;
    const accuracy = THREE.MathUtils.clamp(position.accuracy || 12, 3, 100);
    const area = new THREE.Mesh(
      new THREE.CircleGeometry(accuracy, 48),
      new THREE.MeshBasicMaterial({
        color: 0x2f7df4,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
      }),
    );
    area.rotation.x = -Math.PI / 2;
    area.position.set(position.x, 2.05, position.z);
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(4.3, 6.4, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false }),
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.set(position.x, 3, position.z);
    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(4.5, 32),
      new THREE.MeshBasicMaterial({ color: 0x2878f0, depthTest: false }),
    );
    dot.rotation.x = -Math.PI / 2;
    dot.position.set(position.x, 3.2, position.z);
    userLocationGroup.add(area, halo, dot);
    if (follow) {
      const offset = camera.position.clone().sub(controls.target);
      controls.target.set(position.x, 0, position.z);
      camera.position.copy(controls.target).add(offset);
      camera.zoom = Math.max(camera.zoom, 4.2);
      camera.updateProjectionMatrix();
      controls.update();
    }
  }
  const graphOverlay = createGraphOverlay({ THREE, scene, CSS2DObject });
  function setHomeMode(value) {
    homeMode = value;
    graphOverlay.setHidden(value);
    controls.enablePan = !value;
    // 첫 화면 미리보기는 이동 대신 한 손가락으로 둘러보기를 유지합니다.
    controls.touches.ONE = value ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN;
    entranceGroup.visible = !value;
    for (const { id, label } of labelObjects) {
      label.visible =
        !value || ["future", "davinci", "library", "gate"].includes(id);
      label.element.style.pointerEvents = value || reporting ? "none" : "auto";
      if (label.element.tagName === "BUTTON")
        label.element.tabIndex = value || reporting ? -1 : 0;
    }
    for (const label of [...warningLabels, ...workLabels])
      label.visible = !value;
    warningGroup.visible = !value;
    resize();
  }
  function moveTo(newHost, isHome) {
    host.classList.remove("reporting");
    host = newHost;
    host.append(renderer.domElement, labels.domElement);
    observer.disconnect();
    observer.observe(host);
    setHomeMode(isHome);
    reset();
  }
  function resize() {
    const { width: w, height: h } = host.getBoundingClientRect();
    if (!w || !h) return;
    const aspect = w / h,
      view = Math.max(homeMode ? 1020 : 930, 950 / aspect);
    camera.left = (-view * aspect) / 2;
    camera.right = (view * aspect) / 2;
    camera.top = view / 2;
    camera.bottom = -view / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labels.setSize(w, h);
  }
  function reset() {
    camera.position.set(-670, 950, 1100);
    controls.target.set(0, 0, -5);
    camera.zoom = homeMode ? 1 : 1.15;
    camera.updateProjectionMatrix();
    controls.update();
  }
  function focusBuilding(b) {
    const offset = camera.position.clone().sub(controls.target);
    controls.target.set(b.x, b.h * 0.25, b.z);
    camera.position.copy(controls.target).add(offset);
    camera.zoom = 4;
    camera.updateProjectionMatrix();
    controls.update();
  }
  function zoom(factor) {
    camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, 0.5, 12);
    camera.updateProjectionMatrix();
  }
  function top() {
    camera.position.set(0, 1400, 5);
    controls.target.set(0, 0, 0);
    controls.update();
  }
  // 편집 모드: 한 지점을 화면 가운데에 두고 위에서 내려다봅니다.
  function focusTop(point, zoomLevel = 5) {
    controls.target.set(point.x, 0, point.z);
    camera.position.set(point.x, 1400, point.z + 5);
    camera.zoom = THREE.MathUtils.clamp(
      zoomLevel,
      controls.minZoom,
      controls.maxZoom,
    );
    camera.updateProjectionMatrix();
    controls.update();
  }
  const raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2(),
    groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.8);
  let down = null;
  function pickPoint(x, y) {
    mouse.set(x, y);
    raycaster.setFromCamera(mouse, camera);
    const hit = raycaster.ray.intersectPlane(groundPlane, new THREE.Vector3());
    if (!hit) return;
    const selection = locateReportPoint({ x: hit.x, z: hit.z });
    if (selection) previewReportSelection(selection);
    onRoadSelect(
      selection || {
        error: "건물이나 잔디 대신, 지도에서 길 가까운 위치를 눌러주세요.",
      },
    );
  }
  // ===== 두 손가락 제스처 (지도 앱 방식) =====
  // 벌리기/오므리기 = 확대·축소, 비틀기 = 방향 회전, 손가락 사이 지점 = 이동.
  // 두 손가락을 함께 위아래로 밀면 기울기(위에서 보기 ↔ 비스듬히 보기)를 바꿉니다.
  const touchPoints = new Map(),
    upAxis = new THREE.Vector3(0, 1, 0),
    MIN_PHI = controls.minPolarAngle,
    MAX_PHI = controls.maxPolarAngle;
  let gesture = null,
    suppressTap = false;
  function groundAt(clientX, clientY) {
    const r = renderer.domElement.getBoundingClientRect();
    mouse.set(
      ((clientX - r.left) / r.width) * 2 - 1,
      (-(clientY - r.top) / r.height) * 2 + 1,
    );
    raycaster.setFromCamera(mouse, camera);
    return raycaster.ray.intersectPlane(groundPlane, new THREE.Vector3());
  }
  function twoFingers() {
    const [a, b] = [...touchPoints.values()];
    return {
      a,
      b,
      mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      distance: Math.hypot(b.x - a.x, b.y - a.y),
      angle: Math.atan2(b.y - a.y, b.x - a.x),
    };
  }
  function startGesture() {
    const f = twoFingers();
    gesture = { start: f, last: f, mode: null };
  }
  function tilt(deltaPixels) {
    const offset = camera.position.clone().sub(controls.target),
      s = new THREE.Spherical().setFromVector3(offset);
    // 위로 밀면 비스듬히(지평선 쪽), 아래로 밀면 위에서 내려다보는 쪽입니다.
    s.phi = THREE.MathUtils.clamp(
      s.phi - deltaPixels * 0.006,
      MIN_PHI,
      MAX_PHI,
    );
    camera.position
      .copy(controls.target)
      .add(new THREE.Vector3().setFromSpherical(s));
  }
  function transform(previous, next) {
    // 손가락 사이에 있던 지면 지점을 기준으로 확대·회전한 뒤, 새 손가락 위치로 옮깁니다.
    const anchor = groundAt(previous.mid.x, previous.mid.y);
    if (!anchor) return;
    if (previous.distance > 0) {
      camera.zoom = THREE.MathUtils.clamp(
        camera.zoom * (next.distance / previous.distance),
        controls.minZoom,
        controls.maxZoom,
      );
      camera.updateProjectionMatrix();
    }
    let turn = next.angle - previous.angle;
    if (turn > Math.PI) turn -= Math.PI * 2;
    if (turn < -Math.PI) turn += Math.PI * 2;
    if (turn) {
      for (const point of [camera.position, controls.target]) {
        point.sub(anchor).applyAxisAngle(upAxis, turn).add(anchor);
      }
      camera.lookAt(controls.target);
    }
    camera.updateMatrixWorld();
    const moved = groundAt(next.mid.x, next.mid.y);
    // 첫 화면 미리보기는 지도가 화면 밖으로 밀리지 않도록 이동하지 않습니다.
    if (moved && !homeMode) {
      const shift = anchor.sub(moved).setY(0);
      camera.position.add(shift);
      controls.target.add(shift);
    }
  }
  function chooseMode(f) {
    const { start } = gesture,
      da = { x: f.a.x - start.a.x, y: f.a.y - start.a.y },
      db = { x: f.b.x - start.b.x, y: f.b.y - start.b.y },
      travel = Math.max(Math.hypot(da.x, da.y), Math.hypot(db.x, db.y));
    if (travel < 10) return null;
    let twist = Math.abs(f.angle - start.angle);
    if (twist > Math.PI) twist = Math.PI * 2 - twist;
    const sameVertical =
        Math.sign(da.y) === Math.sign(db.y) &&
        Math.abs(da.y) > Math.abs(da.x) * 1.5 &&
        Math.abs(db.y) > Math.abs(db.x) * 1.5,
      fingersSideBySide = Math.abs(Math.cos(start.angle)) > 0.6,
      steady =
        Math.abs(f.distance - start.distance) < start.distance * 0.12 &&
        twist < 0.12;
    return sameVertical && fingersSideBySide && steady ? "tilt" : "transform";
  }
  const canvas = renderer.domElement;
  canvas.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "touch") return;
    touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (touchPoints.size === 2) {
      suppressTap = true;
      startGesture();
    } else if (touchPoints.size > 2) gesture = null;
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!touchPoints.has(e.pointerId)) return;
    touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (!gesture || touchPoints.size !== 2) return;
    const f = twoFingers();
    if (!gesture.mode) {
      gesture.mode = chooseMode(f);
      if (!gesture.mode) return;
      // 판정 전까지 움직인 만큼도 반영해 손가락과 지도가 어긋나지 않게 합니다.
      gesture.last = gesture.start;
    }
    if (gesture.mode === "tilt") tilt(f.mid.y - gesture.last.mid.y);
    else transform(gesture.last, f);
    gesture.last = f;
    controls.update();
  });
  function endTouch(e) {
    if (!touchPoints.delete(e.pointerId)) return;
    if (touchPoints.size === 2) startGesture();
    else gesture = null;
    if (!touchPoints.size) setTimeout(() => (suppressTap = false));
  }
  canvas.addEventListener("pointerup", endTouch);
  canvas.addEventListener("pointercancel", endTouch);
  renderer.domElement.addEventListener("pointerdown", (e) => {
    down = { x: e.clientX, y: e.clientY };
  });
  // 편집 모드: 클릭·마우스 이동을 땅 위 좌표(x, z)로 편집기에 넘깁니다.
  let editHandler = null,
    pendingMove = null;
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (!editHandler || e.pointerType === "touch") return;
    const first = !pendingMove;
    pendingMove = { x: e.clientX, y: e.clientY };
    if (first)
      requestAnimationFrame(() => {
        const hit = pendingMove && groundAt(pendingMove.x, pendingMove.y);
        pendingMove = null;
        if (hit && editHandler) editHandler.move?.({ x: hit.x, z: hit.z });
      });
  });
  function setEditHandler(handler) {
    editHandler = handler;
    renderer.domElement.style.cursor = handler ? "crosshair" : "";
    // 편집 중에는 지도 위 HTML 표시(건물 이름표, 출입구 후보 점)가 클릭을 가로채지 않게 합니다.
    const block = handler || homeMode || reporting;
    for (const { label } of labelObjects)
      label.element.style.pointerEvents = block ? "none" : "auto";
    entranceGroup.traverse((object) => {
      if (object.element)
        object.element.style.pointerEvents = handler ? "none" : "";
    });
  }
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (
      homeMode ||
      suppressTap ||
      !down ||
      e.button !== 0 ||
      Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5
    )
      return;
    down = null;
    const r = renderer.domElement.getBoundingClientRect(),
      x = ((e.clientX - r.left) / r.width) * 2 - 1,
      y = (-(e.clientY - r.top) / r.height) * 2 + 1;
    if (editHandler) {
      const hit = groundAt(e.clientX, e.clientY);
      if (hit) editHandler.click?.({ x: hit.x, z: hit.z });
      return;
    }
    if (reporting) {
      pickPoint(x, y);
      return;
    }
    mouse.set(x, y);
    raycaster.setFromCamera(mouse, camera);
    const hit = raycaster.intersectObjects(buildingMeshes)[0];
    if (hit) onSelect(hit.object.userData.building);
  });
  renderer.domElement.addEventListener("keydown", (e) => {
    if (reporting && e.key === "Enter") {
      e.preventDefault();
      pickPoint(0, 0);
      return;
    }
    if (
      ![
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "+",
        "=",
        "-",
        "0",
      ].includes(e.key)
    )
      return;
    e.preventDefault();
    if (e.key === "+" || e.key === "=") zoom(1.15);
    else if (e.key === "-") zoom(1 / 1.15);
    else if (e.key === "0") reset();
    else {
      const offset = camera.position.clone().sub(controls.target),
        s = new THREE.Spherical().setFromVector3(offset);
      if (e.key === "ArrowLeft") s.theta -= 0.12;
      if (e.key === "ArrowRight") s.theta += 0.12;
      if (e.key === "ArrowUp") s.phi = Math.max(0.12, s.phi - 0.1);
      if (e.key === "ArrowDown") s.phi = Math.min(1.45, s.phi + 0.1);
      camera.position
        .copy(controls.target)
        .add(new THREE.Vector3().setFromSpherical(s));
      controls.update();
    }
  });
  // 라벨끼리 겹치면 우선순위가 낮은 이름을 숨깁니다. 건물 클릭은 계속 가능합니다.
  let labelTick = 0;
  const majorIds = new Set([
    "future",
    "eoui",
    "davinci",
    "library",
    "frontier",
    "dasan",
    "student",
    "memorial",
    "admin",
    "changhak",
    "mugung",
    "techno",
    "gate",
  ]);
  function declutterLabels(time) {
    if (time - labelTick < 120) return;
    labelTick = time;
    const bounds = host.getBoundingClientRect(),
      occupied = [];
    const priority = (id) =>
      id === "future" ? 0 : id === "gate" ? 1 : majorIds.has(id) ? 2 : 3;
    const sorted = [...labelObjects].sort(
      (a, b) => priority(a.id) - priority(b.id),
    );
    for (const { id, label } of sorted) {
      if (homeMode && !["future", "davinci", "library", "gate"].includes(id)) {
        label.visible = false;
        continue;
      }
      if (!homeMode && camera.zoom < 1.8 && !majorIds.has(id)) {
        label.visible = false;
        continue;
      }
      const p = label.position.clone().project(camera),
        x = ((p.x + 1) * bounds.width) / 2,
        y = ((1 - p.y) * bounds.height) / 2;
      const w = label.element.textContent.length * 8 + 20,
        h = 24,
        rect = { left: x - w / 2, right: x + w / 2, top: y - h, bottom: y + 3 };
      if (
        p.z > 1 ||
        p.z < -1 ||
        rect.right < 0 ||
        rect.left > bounds.width ||
        y < 0 ||
        y > bounds.height
      ) {
        label.visible = false;
        continue;
      }
      const collides = occupied.some(
        (r) =>
          rect.left < r.right + 3 &&
          rect.right > r.left - 3 &&
          rect.top < r.bottom + 3 &&
          rect.bottom > r.top - 3,
      );
      label.visible = !collides;
      if (!collides) occupied.push(rect);
    }
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  setHomeMode(true);
  reset();
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame;
  function animate(t) {
    frame = requestAnimationFrame(animate);
    if (document.hidden || !host.getBoundingClientRect().height) return;
    controls.update();
    if (movingDot && routeCurve?.curves.length && !reduceMotion) {
      movingDot.position.copy(
        routeCurve.getPoint((t / Math.max(6000, routeLength * 18)) % 1),
      );
      movingDot.position.y = 4;
    }
    renderer.render(scene, camera);
    declutterLabels(t);
    labels.render(scene, camera);
  }
  frame = requestAnimationFrame(animate);
  renderer.domElement.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    document.querySelector("#map-error").hidden = false;
  });
  return {
    moveTo,
    // 편집 모드 전용: 보행 그래프 디버그 오버레이. graph가 null이면 끕니다.
    setGraphOverlay: (graph) => graphOverlay.set(graph),
    // 편집 모드 전용: 미리보기 도형(점·선)과 클릭·이동 처리기. null이면 지웁니다.
    setEditPreview: (spec) => graphOverlay.setPreview(spec),
    setEditHandler,
    setEntrances,
    focusTop,
    setRoute,
    setReports,
    setWorks,
    setReporting,
    previewReportSelection,
    clearReportSelection,
    setUserLocation,
    zoom,
    reset,
    top,
    dispose() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
      renderer.dispose();
    },
  };
}
