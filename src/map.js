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
import { locateReportPoint, edgeId, reportLocation } from "./reports.mjs";
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
    "서울과기대 3D 지도. 드래그 회전, 스크롤 확대. 신고 모드에서 지도 위치 클릭. 방향키 회전, Enter로 지도 가운데 위치 신고.",
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
      element.textContent = b.name;
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
  for (const entrance of ENTRANCES) {
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
  function setRoute(route, startId, destinationId) {
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
      (id) => new THREE.Vector3(NODES[id].x, 1.8, NODES[id].z),
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
  function setReports(reports) {
    clearReportSelection();
    clearGroup(warningGroup);
    for (const label of warningLabels) {
      scene.remove(label);
      label.element.remove();
    }
    warningLabels.length = 0;
    for (const report of reports) {
      const edge = EDGES.find((e) => edgeId(e) === report.edgeId);
      if (edge)
        segment(NODES[edge.a], NODES[edge.b], 3.5, 0xe3a443, 1, warningGroup);
      const el = document.createElement("button");
      el.className = "road-warning";
      el.setAttribute("aria-label", `신고 위치: ${reportLocation(report)}`);
      el.innerHTML =
        '<span class="warning-triangle" aria-hidden="true">!</span><small>통행 주의</small>';
      el.onclick = (e) => {
        e.stopPropagation();
        onRoadSelect({ reportId: report.id });
      };
      const label = new CSS2DObject(el);
      label.position.set(report.point.x, 12, report.point.z);
      label.visible = !homeMode;
      scene.add(label);
      warningLabels.push(label);
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
  function setHomeMode(value) {
    homeMode = value;
    controls.enablePan = !value;
    entranceGroup.visible = !value;
    for (const { id, label } of labelObjects) {
      label.visible =
        !value || ["future", "davinci", "library", "gate"].includes(id);
      label.element.style.pointerEvents = value || reporting ? "none" : "auto";
      if (label.element.tagName === "BUTTON")
        label.element.tabIndex = value || reporting ? -1 : 0;
    }
    for (const label of warningLabels) label.visible = !value;
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
  renderer.domElement.addEventListener("pointerdown", (e) => {
    down = { x: e.clientX, y: e.clientY };
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (
      homeMode ||
      !down ||
      e.button !== 0 ||
      Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5
    )
      return;
    down = null;
    const r = renderer.domElement.getBoundingClientRect(),
      x = ((e.clientX - r.left) / r.width) * 2 - 1,
      y = (-(e.clientY - r.top) / r.height) * 2 + 1;
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
    setRoute,
    setReports,
    setReporting,
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
