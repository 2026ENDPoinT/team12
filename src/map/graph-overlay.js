// 경로 계산이 실제로 쓰는 보행 그래프(NODES, EDGES)를 지도 위에 겹쳐 그리는 디버그 오버레이입니다.
// 일반 화면에는 쓰이지 않고, 편집 모드(?edit=1)에서 켤 때만 그립니다.
// 간선 1천여 개를 종류별 선 묶음 하나씩으로 그려 그리기 호출 수를 적게 유지합니다.

const Y = 2.6; // 길(0.2~1m)과 경로선(1.2~1.8m)보다 위

export const OVERLAY_STYLES = {
  walk: { color: 0x3f4a5c, label: "보행 간선" },
  stairs: { color: 0xe8590c, label: "계단" },
  anchor: { color: 0xc99a06, label: "자동 생성 입구 연결" },
  connector: { color: 0x2f9e44, label: "출입구 연결" },
  teamWalk: { color: 0x0c8599, label: "팀 추가 인도" },
  teamStairs: { color: 0xd9480f, label: "팀 추가 계단" },
  passage: { color: 0xc2255c, label: "건물 관통" },
};

// 자동 생성 그래프에서 이름이 붙은 노드(futureDoor, gate 등)는 "n숫자"가 아닌 id를 씁니다.
const isAnchor = (id) => !/^n\d+$/.test(id) && !id.includes(":");

export function edgeStyle(edge) {
  if (edge.type === "building_passage") return "passage";
  if (edge.type === "connector") return "connector";
  if (edge.source_kind === "team_input")
    return edge.stairs ? "teamStairs" : "teamWalk";
  if (edge.stairs) return "stairs";
  if (isAnchor(edge.a) || isAnchor(edge.b)) return "anchor";
  return "walk";
}

// 끝이 끊긴 노드: 간선이 하나뿐인 일반 노드. 출입구·이름 붙은 노드는 원래 끝이라 뺍니다.
export function deadEnds(nodes, edges) {
  const degree = new Map();
  for (const e of edges) {
    degree.set(e.a, (degree.get(e.a) || 0) + 1);
    degree.set(e.b, (degree.get(e.b) || 0) + 1);
  }
  return Object.keys(nodes).filter(
    (id) =>
      degree.get(id) === 1 && !isAnchor(id) && nodes[id].type !== "entrance",
  );
}

export function createGraphOverlay({ THREE, scene, CSS2DObject }) {
  const group = new THREE.Group();
  group.visible = false;
  group.renderOrder = 6;
  scene.add(group);
  const labels = [];
  let enabled = false,
    hidden = false;

  function clear() {
    for (const child of [...group.children]) {
      group.remove(child);
      child.geometry?.dispose();
      child.material?.dispose();
    }
    for (const label of labels.splice(0)) {
      scene.remove(label);
      label.element.remove();
    }
  }

  function lines(positions, color) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    const mesh = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color,
        depthTest: false,
        transparent: true,
      }),
    );
    mesh.renderOrder = 6;
    group.add(mesh);
  }

  function points(list, color, size) {
    if (!list.length) return;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        list.flatMap((n) => [n.x, Y + 0.1, n.z]),
        3,
      ),
    );
    const mesh = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: false,
        depthTest: false,
        transparent: true,
      }),
    );
    mesh.renderOrder = 7;
    group.add(mesh);
  }

  function label(text, node, color) {
    const element = document.createElement("span");
    element.textContent = text;
    element.style.cssText =
      `font:500 11px/1.2 var(--font-ui);color:#fff;background:${color};` +
      "padding:2px 6px;border-radius:4px;white-space:nowrap;pointer-events:none;" +
      "transform:translateY(-14px)";
    const object = new CSS2DObject(element);
    object.position.set(node.x, Y, node.z);
    object.visible = enabled && !hidden;
    scene.add(object);
    labels.push(object);
  }

  const hex = (n) => `#${n.toString(16).padStart(6, "0")}`;

  // graph: { nodes, edges }. null이면 끕니다.
  function set(graph) {
    clear();
    enabled = Boolean(graph);
    group.visible = enabled && !hidden;
    if (!graph) return { deadEnds: [] };
    const { nodes, edges } = graph,
      byStyle = new Map();
    for (const edge of edges) {
      const a = nodes[edge.a],
        b = nodes[edge.b];
      if (!a || !b) continue;
      const style = edgeStyle(edge);
      if (!byStyle.has(style)) byStyle.set(style, []);
      byStyle.get(style).push(a.x, Y, a.z, b.x, Y, b.z);
    }
    for (const [style, positions] of byStyle)
      lines(positions, OVERLAY_STYLES[style].color);

    const ends = deadEnds(nodes, edges);
    const endSet = new Set(ends);
    points(
      Object.entries(nodes)
        .filter(([id, n]) => !endSet.has(id) && n.type !== "entrance")
        .map(([, n]) => n),
      0x3f4a5c,
      3,
    );
    points(
      ends.map((id) => nodes[id]),
      0xe03131,
      7,
    );
    points(
      Object.values(nodes).filter((n) => n.type === "entrance"),
      OVERLAY_STYLES.connector.color,
      9,
    );

    for (const [id, node] of Object.entries(nodes)) {
      if (node.type === "entrance")
        label(node.name || id, node, hex(OVERLAY_STYLES.connector.color));
      else if (isAnchor(id)) label(id, node, hex(OVERLAY_STYLES.anchor.color));
    }
    return { deadEnds: ends };
  }

  // ===== 편집 미리보기 =====
  // spec: { lines: [{ points: [{x,z}], color, width, dashed, y }], dots: [{ x, z, color, radius }] }
  const preview = new THREE.Group();
  preview.renderOrder = 8;
  scene.add(preview);
  function bar(a, b, width, color, y) {
    const length = Math.hypot(b.x - a.x, b.z - a.z);
    if (length < 0.01) return;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.2, length),
      new THREE.MeshBasicMaterial({
        color,
        depthTest: false,
        transparent: true,
      }),
    );
    mesh.position.set((a.x + b.x) / 2, y, (a.z + b.z) / 2);
    mesh.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    mesh.renderOrder = 8;
    preview.add(mesh);
  }
  function setPreview(spec) {
    for (const child of [...preview.children]) {
      preview.remove(child);
      child.geometry?.dispose();
      child.material?.dispose();
    }
    if (!spec) return;
    for (const line of spec.lines || []) {
      const {
        points: pts,
        color,
        width = 1.2,
        dashed = false,
        y = Y + 0.4,
      } = line;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1],
          b = pts[i];
        if (!dashed) {
          bar(a, b, width, color, y);
          continue;
        }
        const length = Math.hypot(b.x - a.x, b.z - a.z);
        for (let s = 0; s < length; s += 5) {
          const e = Math.min(s + 3, length),
            at = (t) => ({
              x: a.x + ((b.x - a.x) * t) / length,
              z: a.z + ((b.z - a.z) * t) / length,
            });
          bar(at(s), at(e), width, color, y);
        }
      }
    }
    for (const dot of spec.dots || []) {
      const mesh = new THREE.Mesh(
        new THREE.CircleGeometry(dot.radius || 2.2, 24),
        new THREE.MeshBasicMaterial({
          color: dot.color,
          depthTest: false,
          transparent: true,
        }),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(dot.x, Y + 0.6, dot.z);
      mesh.renderOrder = 9;
      preview.add(mesh);
    }
  }

  // 첫 화면(홈)에서는 숨기고, 지도 화면으로 들어가면 다시 보입니다.
  function setHidden(value) {
    hidden = value;
    group.visible = enabled && !hidden;
    preview.visible = !hidden;
    for (const l of labels) l.visible = enabled && !hidden;
  }

  return { set, setHidden, setPreview };
}
