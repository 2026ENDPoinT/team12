// 사진 기반 전용 모델을 만들 때 공통으로 쓰는 도구입니다(부산대 등 다른 학교 모델용).
// 좌표는 지도 좌표(x, z) 그대로 쓰고, 모델 바닥은 y=0입니다. 지형 높이는 건물 레이어가 올립니다.
import * as THREE from "three";

export function createModelKit(building) {
  const group = new THREE.Group();
  group.position.y = 0.9;
  const batches = new Map(),
    dummy = new THREE.Object3D(),
    meshes = [];
  const material = (color, roughness = 0.88, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });

  // 회전한 상자 하나(같은 재질끼리 InstancedMesh로 묶어 그림)
  function box(mat, x, y, z, w, h, d, turn = 0) {
    if (!batches.has(mat)) batches.set(mat, []);
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, turn, 0);
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    batches.get(mat).push(dummy.matrix.clone());
  }
  // ring([[x,z],...])을 bottom부터 depth만큼 세운 덩어리
  function extrude(ring, bottom, depth, mat) {
    const shape = new THREE.Shape(ring.map(([x, z]) => new THREE.Vector2(x, -z)));
    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false }),
      mat,
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = bottom;
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    meshes.push(mesh);
    return mesh;
  }
  // 다각형 각 변: 시작점, 방향, 바깥쪽 법선, 길이, 상자 회전값
  function edges(ring) {
    let area = 0;
    for (let i = 0; i < ring.length; i++) {
      const [ax, az] = ring[i],
        [bx, bz] = ring[(i + 1) % ring.length];
      area += ax * bz - bx * az;
    }
    const sign = area > 0 ? 1 : -1;
    const list = [];
    for (let i = 0; i < ring.length; i++) {
      const [ax, az] = ring[i],
        [bx, bz] = ring[(i + 1) % ring.length],
        length = Math.hypot(bx - ax, bz - az);
      if (length < 0.8) continue;
      const dx = (bx - ax) / length,
        dz = (bz - az) / length;
      // x→z 좌표계에서 반시계(area>0)면 바깥 법선은 (dz, -dx)
      list.push({
        index: i,
        ax,
        az,
        dx,
        dz,
        nx: dz * sign,
        nz: -dx * sign,
        length,
        turn: -Math.atan2(dz, dx),
      });
    }
    return list;
  }
  // 변 위 u(m) 지점, 바깥쪽으로 offset만큼 나온 곳에 붙이는 상자
  function face(edge, mat, u, y, w, h, d, offset = 0.1) {
    box(
      mat,
      edge.ax + edge.dx * u + edge.nx * offset,
      y,
      edge.az + edge.dz * u + edge.nz * offset,
      w,
      h,
      d,
      edge.turn,
    );
  }
  function finish() {
    const cube = new THREE.BoxGeometry(1, 1, 1);
    for (const [mat, parts] of batches) {
      const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
      parts.forEach((m, i) => mesh.setMatrixAt(i, m));
      mesh.castShadow = mat.transparent !== true && mat.roughness > 0.4;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
    const pickables = [];
    group.traverse((o) => {
      if (o.isMesh) {
        o.userData.building = building.id;
        pickables.push(o);
      }
    });
    return pickables;
  }
  return { group, material, box, extrude, edges, face, finish };
}

// 외곽선에서 가장 긴 두 변의 방향(건물 주축)과 중심
export function mainAxis(outline) {
  let best = null;
  for (let i = 0; i < outline.length; i++) {
    const [ax, az] = outline[i],
      [bx, bz] = outline[(i + 1) % outline.length],
      length = Math.hypot(bx - ax, bz - az);
    if (!best || length > best.length)
      best = { length, dx: (bx - ax) / length, dz: (bz - az) / length };
  }
  const cx = outline.reduce((s, p) => s + p[0], 0) / outline.length,
    cz = outline.reduce((s, p) => s + p[1], 0) / outline.length;
  return { ...best, cx, cz };
}
