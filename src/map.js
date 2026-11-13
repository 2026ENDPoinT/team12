import { createStreetLights, windowLights } from "./map/night-lighting.mjs";
import { touchGestureMode } from "./map/touch-gesture.mjs";
import { cameraOffsetForHeading, smoothHeading, headingDelta } from "./heading.mjs";
import { createNavigationBounds } from "./map/navigation-bounds.mjs";
import { createKeyboardPan } from "./map/keyboard-pan.mjs";
import { createMapProfiler } from "./map/performance.mjs";
import { createGroundMaterial } from "./map/landscape/ground-materials.mjs";
import { createRoadLayer } from "./map/landscape/road-layer.mjs";
import { createBuildingLayer } from "./map/buildings/index.mjs";
import { createCampusTrees } from "./map/landscape/trees.mjs";
import { createPondDetails } from "./map/landscape/pond-details.mjs";
import { createTechnyong } from "./map/mascot/technyong.mjs";
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
import crosswalks from "../data/crosswalks.json";
import { insideBuilding, projectToSegment, toScene } from "./geo.mjs";
import { buildingLabel, worksPeriod } from "./buildings.mjs";
import { createGraphOverlay } from "./graph-overlay.js";
const VIOLET = 0x7950ff;

// Three.js 기반 독립 구현. 외곽선/도로 데이터만 별도 ODbL 데이터에서 가져옵니다.
export function createCampusMap(host, onSelect, onRoadSelect, onCameraInteraction = () => {}) {
  const mapStartedAt = performance.now();
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
  // Buildings, trees and the sun are static; camera/route changes need no new shadow map.
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0, 0);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute(
    "aria-label",
    "서울과기대 3D 지도. 왼쪽 드래그 지도 이동, 지도 클릭 후 W/S 확대·축소, A/D 좌우 이동, Space 상승, Shift 하강, Ctrl 가속, 휠·두 손가락 벌리기 확대, 더블클릭 확대, 오른쪽 드래그 회전·기울이기. 터치: 한 손가락 이동, 두 손가락 벌리기 확대, 함께 좌우로 밀기 회전, 위아래로 밀기 기울이기. 신고 모드에서 지도 위치 클릭. 방향키 회전, Enter로 지도 가운데 위치 신고.",
  );
  const scene = new THREE.Scene(),
    camera = new THREE.OrthographicCamera(-600, 600, 600, -600, 1, 3500);
  const controls = new OrbitControls(camera, renderer.domElement);
  const constrainNavigation = createNavigationBounds(CAMPUS_GEOMETRY.boundary);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minPolarAngle = 0.12;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.minZoom = 0.5;
  controls.maxZoom = 12;
  controls.zoomToCursor = true;
  // 휠·트랙패드는 아래 wheel 처리에서 직접 다룹니다(이동·확대·회전·기울이기).
  controls.enableZoom = false;
  // 끌어서 이동할 때 화면 평면이 아니라 지면을 따라 움직이게 합니다.
  controls.screenSpacePanning = false;
  // 터치: 한 손가락은 지도 이동, 두 손가락은 아래 touchGesture가 직접 처리합니다.
  // (OrbitControls 기본값은 두 손가락 확대·이동뿐이라 비틀어 회전·기울이기가 없습니다.)
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: null };
  const labels = new CSS2DRenderer();
  labels.domElement.style.cssText =
    "position:absolute;inset:0;pointer-events:none;overflow:hidden";
  host.append(renderer.domElement, labels.domElement);
  // Softer sky fill and a stronger sun give surfaces a clear light/shade split.
  const sky = new THREE.HemisphereLight(0xeaf2ff, 0x899579, 1.15);
  scene.add(sky);
  const sun = new THREE.DirectionalLight(0xfff2da, 2.65);
  sun.position.set(-450, 750, 550);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -800,
    right: 800,
    top: 800,
    bottom: -800,
    far: 2500,
  });
  sun.shadow.normalBias = 0.45;
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
      createGroundMaterial("grass", 0x789463),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -5;
    mesh.receiveShadow = true;
    scene.add(mesh);
    terrainMeshes.push(mesh);
  }
  const landColors = {
    wood: 0x667f57,
    park: 0x829c6b,
    pitch: 0x7b996c,
    water: 0x70b9bd,
    construction: 0xd3c6ad,
  };
  // All pond banks share one mesh. No textures or extra per-bank draw calls.
  const bankVertices = [];
  for (const land of CAMPUS_GEOMETRY.lands) {
    const poly = flatPolygon(
      land.outline,
      landColors[land.kind] || 0xb0c696,
      0.15,
    );
    if (land.kind !== "water") {
      poly.material.dispose();
      poly.material = createGroundMaterial(
        land.kind === "park" ? "grass" : land.kind,
        landColors[land.kind] || 0x789463,
      );
    }
    if (land.kind === "water") {
      poly.position.y = 0.3;
      const ring = land.outline;
      const isBungeobang = ring.every(([, z]) => z < 0);
      poly.material.dispose();
      // Distance to the actual shoreline also works for the long, narrow stream.
      // One draw call per water polygon, with no texture downloads or reflections.
      poly.material = new THREE.ShaderMaterial({
        uniforms: {
          shore: {
            value: ring.map(([x, z]) => new THREE.Vector2(x, -z)),
          },
          shallow: {
            value: new THREE.Color(isBungeobang ? 0xa7bfb0 : 0xb4e6d5),
          },
          middle: {
            value: new THREE.Color(isBungeobang ? 0x658f88 : 0x49b8bd),
          },
          deep: { value: new THREE.Color(isBungeobang ? 0x446f73 : 0x23829e) },
        },
        vertexShader: `
          varying vec2 waterPoint;
          void main() {
            waterPoint = position.xy;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec2 shore[${ring.length}];
          uniform vec3 shallow;
          uniform vec3 middle;
          uniform vec3 deep;
          varying vec2 waterPoint;
          void main() {
            float bankDistance = 10000.0;
            for (int i = 0; i < ${ring.length}; i++) {
              vec2 a = shore[i];
              vec2 b = shore[(i + 1) % ${ring.length}];
              vec2 edge = b - a;
              float t = clamp(dot(waterPoint - a, edge) / max(dot(edge, edge), 0.0001), 0.0, 1.0);
              bankDistance = min(bankDistance, length(waterPoint - a - edge * t));
            }
            vec3 water = mix(shallow, middle, smoothstep(1.0, 6.0, bankDistance));
            water = mix(water, deep, smoothstep(8.0, 26.0, bankDistance));
            // Sparse, static highlights suggest water without an animation pass.
            vec2 p = waterPoint;
            float rows = pow(max(0.0, cos(p.y * 0.48 + sin(p.x * 0.05))), 36.0);
            float dashes = pow(max(0.0, sin(p.x * 0.20 + p.y * 0.08)), 12.0);
            water = mix(water, shallow, rows * dashes * 0.42 * smoothstep(3.0, 8.0, bankDistance));
            gl_FragColor = vec4(water, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,
      });
      for (let i = 0; i < ring.length; i++) {
        const [ax, az] = ring[i],
          [bx, bz] = ring[(i + 1) % ring.length],
          length = Math.hypot(bx - ax, bz - az);
        if (length < 0.01) continue;
        const nx = (-(bz - az) / length) * 2.2,
          nz = ((bx - ax) / length) * 2.2;
        bankVertices.push(
          ax + nx,
          0.22,
          az + nz,
          bx + nx,
          0.22,
          bz + nz,
          bx - nx,
          0.22,
          bz - nz,
          ax + nx,
          0.22,
          az + nz,
          bx - nx,
          0.22,
          bz - nz,
          ax - nx,
          0.22,
          az - nz,
        );
      }
    }
  }
  if (bankVertices.length) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(bankVertices, 3),
    );
    geometry.computeVertexNormals();
    const material = matte(0xd8cfb6);
    material.side = THREE.DoubleSide;
    const banks = new THREE.Mesh(geometry, material);
    banks.receiveShadow = true;
    scene.add(banks);
  }
  const pondDetails = createPondDetails();
  scene.add(pondDetails.group);
  function segment(a, b, width, color, y, group = scene, material = null) {
    const length = Math.hypot(b.x - a.x, b.z - a.z);
    if (length < 0.01) return;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.22, length),
      material || matte(color),
    );
    mesh.position.set((a.x + b.x) / 2, y, (a.z + b.z) / 2);
    mesh.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  const crosswalkLines = crosswalks.map(({ coordinates }) =>
    coordinates.map((coordinate) => {
      const { x, z } = toScene(coordinate, CAMPUS_GEOMETRY.meta);
      return [x, z];
    }),
  );
  scene.add(createRoadLayer(CAMPUS_GEOMETRY.roads, crosswalkLines));
  const streetLights = createStreetLights(CAMPUS_GEOMETRY.roads);
  scene.add(streetLights);
  function setNightMode(enabled) {
    scene.background = enabled ? new THREE.Color(0x161e33) : null;
    sky.color.setHex(enabled ? 0x9ab4f4 : 0xeaf2ff);
    sky.groundColor.setHex(enabled ? 0x48556f : 0x899579);
    sky.intensity = enabled ? 0.65 : 1.15;
    sun.color.setHex(enabled ? 0xa6bbff : 0xfff2da);
    sun.intensity = enabled ? 0.45 : 2.65;
    streetLights.visible = enabled;
    windowLights.value = enabled ? 1 : 0;
  }

  const buildingLayer = createBuildingLayer(BUILDINGS, ENTRANCES);
  scene.add(buildingLayer.group);
  const buildingMeshes = buildingLayer.pickables,
    buildingGroups = new Map(),
    labelObjects = [];
  let homeMode = true,
    reporting = false;
  for (const {
    b,
    body,
    profile,
    height: displayHeight,
  } of buildingLayer.records) {
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
        if (!homeMode && !reporting) focusBuilding({ ...b, h: displayHeight });
      };
      label = new CSS2DObject(element);
      label.position.set(b.x, displayHeight + 12, b.z);
      scene.add(label);
      labelObjects.push({ id: b.id, label });
    }
    buildingGroups.set(b.id, { body, profile, label, b });
  }
  const campusTrees = createCampusTrees(CAMPUS_GEOMETRY);
  scene.add(campusTrees);
  const entranceGroup = new THREE.Group(),
    entranceMaterial = new THREE.MeshBasicMaterial({
      color: 0xa9dc38,
      depthTest: false,
    }),
    entranceStemGeometry = new THREE.CylinderGeometry(0.45, 0.45, 4.2, 8),
    entranceDotGeometry = new THREE.SphereGeometry(1.75, 12, 8),
    entranceRingGeometry = new THREE.RingGeometry(2.2, 3.1, 20);
  // 등록된 출입구(team-survey.json)를 초록 점으로 그립니다. 편집기로 바꾸면 다시 그립니다.
  let mappedEntrances = ENTRANCES,
    entrancesVisible = false;
  function setEntrances(list) {
    mappedEntrances = list;
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
  function setEntrancesVisible(visible) {
    entrancesVisible = visible;
    entranceGroup.visible = !homeMode && visible;
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
  // 경로를 따라 걷는 마스코트(테크뇽). 처음 경로를 그릴 때 한 번만 만들고 재사용합니다.
  const WALKER_SCALE = 8,
    WALKER_Y = 1.9;
  // GPS 표시는 파란 점 대신 테크뇽으로 한 번만 만들어 위치만 갱신합니다.
  const userAccuracy = new THREE.Mesh(
      new THREE.CircleGeometry(1, 48),
      new THREE.MeshBasicMaterial({
        color: 0x7950ff,
        transparent: true,
        opacity: 0.13,
        depthWrite: false,
      }),
    ),
    userBase = new THREE.Mesh(
      new THREE.RingGeometry(4.8, 6.5, 32),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        depthTest: false,
        depthWrite: false,
      }),
    );
  userAccuracy.rotation.x = userBase.rotation.x = -Math.PI / 2;
  userAccuracy.position.y = 2.05;
  userBase.position.y = 2.2;
  userLocationGroup.add(userAccuracy, userBase);
  let navigationMode = false;
  let navigationFollowing = false, navigationHeading = null, displayedHeading = null;
  const navigationMarker = document.createElement("div");
  navigationMarker.className = "navigation-position";
  navigationMarker.setAttribute("aria-label", "현재 위치");
  navigationMarker.innerHTML = '<span aria-hidden="true">▲</span>';
  const navigationLabel = new CSS2DObject(navigationMarker);
  navigationLabel.position.y = 4;
  navigationLabel.visible = false;
  userLocationGroup.add(navigationLabel);
  let userTechnyong = null,
    technyong = null,
    movingDot = null,
    routeMascotVisible = true,
    walkerHeading = null,
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
      if (!technyong) {
        technyong = createTechnyong();
        technyong.object.scale.setScalar(WALKER_SCALE);
      }
      // clearGroup은 메시만 정리하므로 재사용하는 마스코트 그룹은 지워지지 않고 떼어지기만 합니다.
      movingDot = technyong.object;
      movingDot.visible = routeMascotVisible;
      movingDot.position.set(origin.x, WALKER_Y, origin.z);
      walkerHeading = null;
      placeWalker(0, 0, 0, false);
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
    if (!position) {
      userLocationGroup.visible = false;
      return;
    }
    userLocationGroup.visible = true;
    if (!userTechnyong) {
      userTechnyong = createTechnyong();
      userTechnyong.object.scale.setScalar(7.5);
      userTechnyong.object.position.y = 2.3;
      userTechnyong.object.rotation.y = Math.PI;
      userLocationGroup.add(userTechnyong.object);
    }
    userTechnyong.object.visible = !navigationMode;
    const accuracy = THREE.MathUtils.clamp(position.accuracy || 12, 3, 100);
    userLocationGroup.position.set(position.x, 0, position.z);
    userAccuracy.scale.set(accuracy, accuracy, 1);
    if (follow) {
      if (navigationMode) {
        navigationFollowing = true;
        return;
      }
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
    // One-finger/left drag pans; two-finger movement or right drag rotates.
    controls.mouseButtons.LEFT = value ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN;
    controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
    keyboardPan.clear();
    entranceGroup.visible = !value && entrancesVisible;
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
  // 건물 검색 결과에서 고른 건물로 카메라를 옮깁니다(이름표 더블클릭과 같은 시점).
  function focusPlace(id) {
    const record = buildingLayer.records.find((r) => r.b.id === id);
    if (record) focusBuilding({ ...record.b, h: record.height });
    return Boolean(record);
  }
  // 건물 정보 카드로 고른 건물의 이름표를 강조합니다. null이면 강조를 지웁니다.
  function highlightBuilding(id) {
    for (const item of labelObjects)
      item.label.element.classList.toggle("is-selected", item.id === id);
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
  // 벌리기/오므리기 = 확대·축소, 함께 좌우 이동 = 회전.
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
  function tilt(deltaPixels, horizontalPixels = 0) {
    onCameraInteraction();
    const offset = camera.position.clone().sub(controls.target),
      s = new THREE.Spherical().setFromVector3(offset);
    s.theta -= horizontalPixels * 0.004;
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
  // 화면 좌표 from에 있던 지면 지점을 기준으로 확대(scale)·회전(turn, 시계 방향 +)한 뒤
  // 그 지점이 화면 좌표 to에 오도록 옮깁니다. 터치와 트랙패드가 함께 씁니다.
  function moveCamera(from, to, scale = 1, turn = 0) {
    onCameraInteraction();
    const anchor = groundAt(from.x, from.y);
    if (!anchor) return;
    if (scale !== 1) {
      camera.zoom = THREE.MathUtils.clamp(
        camera.zoom * scale,
        controls.minZoom,
        controls.maxZoom,
      );
      camera.updateProjectionMatrix();
    }
    if (turn) {
      for (const point of [camera.position, controls.target]) {
        point.sub(anchor).applyAxisAngle(upAxis, turn).add(anchor);
      }
      camera.lookAt(controls.target);
    }
    camera.updateMatrixWorld();
    const moved = groundAt(to.x, to.y);
    // 첫 화면 미리보기는 지도가 화면 밖으로 밀리지 않도록 이동하지 않습니다.
    if (moved && !homeMode) {
      const shift = anchor.sub(moved).setY(0);
      camera.position.add(shift);
      controls.target.add(shift);
    }
    controls.update();
  }
  function applyTouchGesture() {
    touchFrame = null;
    if (!gesture || touchPoints.size !== 2) return;
    const f = twoFingers();
    if (!gesture.mode) {
      gesture.mode = touchGestureMode(gesture.start, f);
      if (!gesture.mode) return;
    }
    if (gesture.mode === "zoom") {
      moveCamera(
        gesture.start.mid,
        gesture.start.mid,
        gesture.last.distance > 0 ? f.distance / gesture.last.distance : 1,
      );
    } else {
      tilt(f.mid.y - gesture.last.mid.y, f.mid.x - gesture.last.mid.x);
    }
    gesture.last = f;
    controls.update();
  }
  let touchFrame = null;
  const canvas = renderer.domElement;
  const manualPointers = new Map();
  canvas.addEventListener("pointerdown", (event) => {
    manualPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  });
  canvas.addEventListener("pointermove", (event) => {
    const start = manualPointers.get(event.pointerId);
    if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5)
      onCameraInteraction();
  });
  const releaseManualPointer = (event) => manualPointers.delete(event.pointerId);
  canvas.addEventListener("pointerup", releaseManualPointer);
  canvas.addEventListener("pointercancel", releaseManualPointer);
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
    // Coalesce the two pointer events before interpreting a two-finger movement.
    if (touchFrame === null)
      touchFrame = requestAnimationFrame(applyTouchGesture);
  });
  function endTouch(e) {
    if (touchFrame !== null) {
      cancelAnimationFrame(touchFrame);
      applyTouchGesture();
    }
    if (!touchPoints.delete(e.pointerId)) return;
    if (touchPoints.size === 2) startGesture();
    else gesture = null;
    if (!touchPoints.size) setTimeout(() => (suppressTap = false));
  }
  canvas.addEventListener("pointerup", endTouch);
  canvas.addEventListener("pointercancel", endTouch);

  // ===== 마우스·트랙패드 =====
  // 왼쪽 드래그 = 이동, 휠·트랙패드 오므리기 = 확대·축소, 두 손가락 스크롤 = 회전·기울이기,
  // 더블클릭 = 확대, 오른쪽 드래그(트랙패드 두 손가락 클릭 드래그) = 회전·기울이기.
  let lastTrackpadWheel = -Infinity,
    safariGesture = null,
    zoomAnimation = null;
  function isMouseWheel(e) {
    if (e.deltaMode !== 0) return true;
    // 트랙패드는 짧은 간격으로 이벤트가 이어지므로, 직전에 트랙패드로 판정됐으면 그대로 봅니다.
    if (performance.now() - lastTrackpadWheel < 400) return false;
    // Chrome·Safari 트랙패드는 wheelDeltaY가 deltaY의 -3배입니다. 마우스 휠은 120 단위입니다.
    const legacy = e.wheelDeltaY;
    if (legacy && legacy !== -3 * e.deltaY && legacy % 120 === 0) return true;
    return !e.deltaX && Math.abs(e.deltaY) >= 50 && !legacy;
  }
  function canvasCenter() {
    const r = canvas.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  canvas.addEventListener(
    "wheel",
    (e) => {
      const point = { x: e.clientX, y: e.clientY };
      // 트랙패드 오므리기·벌리기는 브라우저가 Ctrl+휠로 보냅니다.
      if (e.ctrlKey) {
        e.preventDefault();
        if (!safariGesture)
          moveCamera(point, point, Math.exp(-e.deltaY * 0.01));
        return;
      }
      const mouseWheel = isMouseWheel(e);
      if (!mouseWheel) lastTrackpadWheel = performance.now();
      // 첫 화면 미리보기에서는 트랙패드 스크롤로 페이지가 내려가게 둡니다.
      if (homeMode && !mouseWheel) return;
      e.preventDefault();
      cancelAnimationFrame(zoomAnimation);
      if (mouseWheel) moveCamera(point, point, Math.exp(-e.deltaY * 0.0015));
      else {
        tilt(-e.deltaY, -e.deltaX);
        controls.update();
      }
    },
    { passive: false },
  );
  // 더블클릭한 자리를 기준으로 두 배 확대합니다(0.25초 동안 부드럽게).
  canvas.addEventListener("dblclick", (e) => {
    if (homeMode || reporting) return;
    e.preventDefault();
    cancelAnimationFrame(zoomAnimation);
    const point = { x: e.clientX, y: e.clientY },
      startTime = performance.now();
    let applied = 1;
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / 250),
        target = Math.pow(2, 1 - Math.pow(1 - t, 3));
      moveCamera(point, point, target / applied);
      applied = target;
      if (t < 1) zoomAnimation = requestAnimationFrame(step);
    };
    zoomAnimation = requestAnimationFrame(step);
  });
  // Safari는 트랙패드 오므리기를 전용 제스처 이벤트로도 보냅니다. 확대·축소만 반영합니다.
  // 휴대폰 터치는 위의 터치 처리가 맡으므로 건너뜁니다.
  canvas.addEventListener("gesturestart", (e) => {
    if (touchPoints.size) return;
    e.preventDefault();
    safariGesture = { scale: e.scale };
  });
  canvas.addEventListener("gesturechange", (e) => {
    if (!safariGesture || touchPoints.size) return;
    e.preventDefault();
    const point = Number.isFinite(e.clientX)
      ? { x: e.clientX, y: e.clientY }
      : canvasCenter();
    moveCamera(point, point, e.scale / safariGesture.scale);
    safariGesture = { scale: e.scale };
  });
  canvas.addEventListener("gestureend", (e) => {
    if (!safariGesture) return;
    e.preventDefault();
    safariGesture = null;
  });
  renderer.domElement.addEventListener("pointerdown", (e) => {
    renderer.domElement.focus({ preventScroll: true });
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
  const keyboardPan = createKeyboardPan({
    element: renderer.domElement,
    camera,
    controls,
    isEnabled: () => !homeMode && !reporting && !editHandler,
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
  const profiler = createMapProfiler(renderer, campusTrees, mapStartedAt);
  let frame,
    previousFrameTime = 0;
  // u: 경로 위 위치(0~1). 진행 방향을 바라보고, 모퉁이에서는 부드럽게 돌아섭니다.
  function placeWalker(u, t, dt, moving) {
    routeCurve.getPoint(u, movingDot.position);
    movingDot.position.y = WALKER_Y;
    const tangent = routeCurve.getTangent(Math.min(u, 0.999));
    const target = Math.atan2(tangent.x, tangent.z);
    if (walkerHeading === null || dt === 0) walkerHeading = target;
    else {
      const diff = Math.atan2(
        Math.sin(target - walkerHeading),
        Math.cos(target - walkerHeading),
      );
      walkerHeading += diff * Math.min(1, dt * 10);
    }
    movingDot.rotation.y = walkerHeading;
    technyong.update(t / 1000, { moving, dt: dt || 1 });
  }
  let entryFlight;
  function resolveEntryView(record, entranceId) {
    if (!record) return null;
    if (!entranceId && record.entryView) return record.entryView;

    const building = record.b;
    const entrance = mappedEntrances.find(
      (item) => item.buildingId === building.id && (!entranceId || item.id === entranceId),
    );
    const anchor = entrance ?? NODES[building.entry];
    if (!anchor) return null;

    let wall;
    for (const ring of [building.outline, ...building.holes]) {
      for (let i = 0; i < ring.length; i++) {
        const [ax, az] = ring[i];
        const [bx, bz] = ring[(i + 1) % ring.length];
        if (ax === bx && az === bz) continue;
        const projection = projectToSegment(anchor, { x: ax, z: az }, { x: bx, z: bz });
        if (wall && wall.distance <= projection.distance) continue;
        wall = { ...projection, outward: new THREE.Vector3(az - bz, 0, bx - ax).normalize() };
      }
    }
    if (!wall) return null;
    const { point, outward } = wall;
    if (insideBuilding({ x: point.x + outward.x * 0.25, z: point.z + outward.z * 0.25 }, building)) {
      outward.negate();
    }
    return { door: new THREE.Vector3(point.x, 2.6, point.z), outward };
  }

  function flyIntoBuilding(id, entranceId, onApproach) {
    const record = buildingLayer.records.find(({ b }) => b.id === id);
    const entry = resolveEntryView(record, entranceId);
    if (!entry || !host.clientHeight) return Promise.resolve();

    cancelAnimationFrame(zoomAnimation);
    keyboardPan.clear();
    controls.enabled = false;
    labels.domElement.style.visibility = "hidden";
    const view = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.08, 3500);
    const target = controls.target.clone();
    const distance = (camera.top - camera.bottom) / camera.zoom /
      (2 * Math.tan(THREE.MathUtils.degToRad(view.fov / 2)));
    const start = camera.position.clone().sub(target).setLength(distance).add(target);
    const approach = entry.door.clone().addScaledVector(entry.outward, 38);
    approach.y += 13;
    const threshold = entry.door.clone().addScaledVector(entry.outward, 0.5);
    const aim = entry.door.clone().addScaledVector(entry.outward, -6);
    return new Promise((resolve) => {
      entryFlight = { view, start, target, approach, threshold, aim, onApproach, resolve };
    });
  }

  function restoreBuildingFlight() {
    entryFlight = null;
    controls.enabled = true;
    labels.domElement.style.visibility = "";
  }

  function renderBuildingFlight(t) {
    const flight = entryFlight;
    flight.started ??= t;
    const elapsed = t - flight.started;
    const approach = THREE.MathUtils.smootherstep(elapsed, 0, 950);
    const entry = THREE.MathUtils.smootherstep(elapsed, 800, 1500);
    flight.view.position.lerpVectors(flight.start, flight.approach, approach)
      .lerp(flight.threshold, entry);
    flight.view.lookAt(flight.target.clone().lerp(flight.aim, approach));
    const entrancesVisible = entranceGroup.visible;
    entranceGroup.visible = false;
    renderer.render(scene, flight.view);
    entranceGroup.visible = entrancesVisible;
    if (elapsed >= 1280 && flight.onApproach) {
      flight.onApproach();
      flight.onApproach = null;
    }
    if (elapsed >= 1500) flight.resolve();
  }

  function animate(t) {
    frame = requestAnimationFrame(animate);
    const deltaSeconds = previousFrameTime ? (t - previousFrameTime) / 1000 : 0;
    previousFrameTime = t;
    if (document.hidden || !host.getBoundingClientRect().height) return;
    if (entryFlight) {
      renderBuildingFlight(t);
      return;
    }
    const profileStart = profiler?.begin(t);
    keyboardPan.update(deltaSeconds);
    controls.update();
    if (!homeMode) constrainNavigation(camera, controls);
    if (navigationMode && userLocationGroup.visible && navigationHeading !== null) {
      const weight = 1 - Math.exp(-10 * Math.min(.1, deltaSeconds));
      displayedHeading = smoothHeading(displayedHeading, navigationHeading, weight);
      if (navigationFollowing) {
        const offset = camera.position.clone().sub(controls.target);
        const bearing = Math.atan2(-offset.x, offset.z) * 180 / Math.PI;
        const nextHeading = smoothHeading(bearing, navigationHeading, weight);
        const phi = new THREE.Spherical().setFromVector3(offset).phi;
        const desired = cameraOffsetForHeading(nextHeading, offset.length(), phi + (.45 - phi) * weight);
        const ahead = navigationHeading * Math.PI / 180;
        const target = userLocationGroup.position.clone().add(new THREE.Vector3(Math.sin(ahead) * 35, 0, -Math.cos(ahead) * 35));
        controls.target.lerp(target, weight);
        camera.position.copy(controls.target).add(new THREE.Vector3(desired.x, desired.y, desired.z));
        camera.zoom += (Math.max(4.2, camera.zoom) - camera.zoom) * weight;
        camera.updateProjectionMatrix();
        controls.update();
      }
      const view = camera.position.clone().sub(controls.target);
      const cameraHeading = Math.atan2(-view.x, view.z) * 180 / Math.PI;
      navigationMarker.firstElementChild.style.transform = `rotate(${headingDelta(cameraHeading, displayedHeading)}deg)`;
    }
    campusTrees.updateDetail(
      (renderer.domElement.clientHeight * camera.zoom) /
        (camera.top - camera.bottom),
    );
    if (movingDot && routeCurve?.curves.length)
      placeWalker(
        reduceMotion ? 0 : (t / Math.max(6000, routeLength * 18)) % 1,
        t,
        reduceMotion ? 0 : Math.min(0.1, deltaSeconds),
        !reduceMotion,
      );
    pondDetails.update(reduceMotion ? 0 : t / 1000);
    renderer.render(scene, camera);
    declutterLabels(t);
    labels.render(scene, camera);
    profiler?.end(profileStart);
  }
  frame = requestAnimationFrame(animate);
  renderer.domElement.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    document.querySelector("#map-error").hidden = false;
  });
  return {
    moveTo,
    setNightMode,
    flyIntoBuilding,
    restoreBuildingFlight,
    // 편집 모드 전용: 보행 그래프 디버그 오버레이. graph가 null이면 끕니다.
    setGraphOverlay: (graph) => graphOverlay.set(graph),
    // 편집 모드 전용: 미리보기 도형(점·선)과 클릭·이동 처리기. null이면 지웁니다.
    setEditPreview: (spec) => graphOverlay.setPreview(spec),
    setEditHandler,
    setEntrances,
    setEntrancesVisible,
    focusTop,
    setRoute,
    setReports,
    setWorks,
    setReporting,
    previewReportSelection,
    clearReportSelection,
    setUserLocation,
    setNavigationMode(enabled) {
      if (!enabled) {
        navigationFollowing = false;
        navigationHeading = displayedHeading = null;
      }
      navigationMode = enabled;
      navigationLabel.visible = enabled;
      userBase.visible = !enabled;
      if (userTechnyong) userTechnyong.object.visible = !enabled;
    },
    setNavigationHeading(heading, following) {
      if (!Number.isFinite(heading)) return;
      navigationHeading = heading;
      navigationFollowing = following;
    },
    setNavigationFollowing(following) { navigationFollowing = following; },
    setRouteMascotVisible(visible) {
      routeMascotVisible = visible;
      if (movingDot) movingDot.visible = visible;
    },
    zoom,
    reset,
    top,
    focusPlace,
    highlightBuilding,
    dispose() {
      cancelAnimationFrame(frame);
      profiler?.dispose();
      observer.disconnect();
      if (touchFrame !== null) cancelAnimationFrame(touchFrame);
      keyboardPan.dispose();
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
