// 평평하게 만든 지면 도형(땅·녹지·물·길)을 지형 높이에 맞춰 올립니다.
// 큰 삼각형은 지형을 따라가지 못하므로 긴 변을 maxEdge 이하가 될 때까지 반으로 나눈 뒤,
// 각 꼭짓점의 y에 그 자리 지면 높이를 더합니다(기존 y는 지면 위 띄움 높이로 그대로 둠).
// 지형이 없으면(평지) 아무것도 바꾸지 않습니다.
import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";

// positions: 인덱스 없는 삼각형 목록 [x,y,z, x,y,z, x,y,z, ...]. 같은 형식으로 돌려줍니다.
export function subdivideTriangles(positions, maxEdge) {
  const out = [];
  const limit = maxEdge * maxEdge;
  const stack = [];
  for (let i = 0; i < positions.length; i += 9)
    stack.push(positions.slice(i, i + 9));
  while (stack.length) {
    const t = stack.pop();
    const d = (i, j) =>
      (t[i * 3] - t[j * 3]) ** 2 + (t[i * 3 + 2] - t[j * 3 + 2]) ** 2;
    const lengths = [d(0, 1), d(1, 2), d(2, 0)];
    const longest = lengths.indexOf(Math.max(...lengths));
    if (lengths[longest] <= limit) {
      out.push(...t);
      continue;
    }
    // 가장 긴 변(longest → next)의 가운데에서 둘로 나눕니다. 감기 방향은 유지합니다.
    const a = longest,
      b = (longest + 1) % 3,
      c = (longest + 2) % 3;
    const p = (k) => [t[k * 3], t[k * 3 + 1], t[k * 3 + 2]];
    const m = p(a).map((v, k) => (v + p(b)[k]) / 2);
    stack.push([...p(a), ...m, ...p(c)], [...m, ...p(b), ...p(c)]);
  }
  return out;
}

export function drapePositions(positions, heightAt) {
  for (let i = 0; i < positions.length; i += 3)
    positions[i + 1] += heightAt(positions[i], positions[i + 2]);
  return positions;
}

// geometry: x·z가 지도 좌표, y가 지면 위 높이인 BufferGeometry. 새 geometry를 돌려줍니다.
export function drapeGeometry(geometry, terrain, maxEdge = 6) {
  if (!terrain?.has) return geometry;
  const source = geometry.index ? geometry.toNonIndexed() : geometry;
  const flat = Array.from(source.getAttribute("position").array);
  const positions = drapePositions(
    subdivideTriangles(flat, maxEdge),
    terrain.heightAt,
  );
  let draped = new THREE.BufferGeometry();
  draped.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  // 나눈 삼각형이 꼭짓점을 공유하게 묶어 부드러운 음영을 만듭니다.
  draped = mergeVertices(draped, 1e-3);
  draped.computeVertexNormals();
  if (source !== geometry) source.dispose();
  geometry.dispose();
  return draped;
}

// 지도 좌표 다각형(outline: [[x,z],...], holes) → 지면 위 y만큼 띄운 지형 맞춤 면.
export function drapedPolygon(outline, holes, y, terrain, maxEdge = 6) {
  const shape = new THREE.Shape(outline.map(([x, z]) => new THREE.Vector2(x, -z)));
  for (const hole of holes || [])
    shape.holes.push(new THREE.Path(hole.map(([x, z]) => new THREE.Vector2(x, -z))));
  const geometry = new THREE.ShapeGeometry(shape);
  // ShapeGeometry는 (x, -z) 평면이므로 눕혀서 x·z 지도 좌표로 만듭니다.
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, y, 0);
  return drapeGeometry(geometry, terrain, maxEdge);
}

// 캠퍼스 땅 덩어리의 옆면: 경계를 따라 지면 높이에서 bottom까지 내려오는 벽.
export function terrainSkirt(ring, terrain, bottom = -5, step = 6) {
  const positions = [];
  for (let i = 0; i < ring.length; i++) {
    const [ax, az] = ring[i],
      [bx, bz] = ring[(i + 1) % ring.length];
    const pieces = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / step));
    for (let k = 0; k < pieces; k++) {
      const x0 = ax + ((bx - ax) * k) / pieces,
        z0 = az + ((bz - az) * k) / pieces,
        x1 = ax + ((bx - ax) * (k + 1)) / pieces,
        z1 = az + ((bz - az) * (k + 1)) / pieces;
      const y0 = terrain.heightAt(x0, z0),
        y1 = terrain.heightAt(x1, z1);
      positions.push(x0, y0, z0, x0, bottom, z0, x1, bottom, z1);
      positions.push(x0, y0, z0, x1, bottom, z1, x1, y1, z1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

// 건물 바닥 높이: 외곽선 아래 지면 중 가장 낮은 곳(비탈 아래쪽에서 건물이 뜨지 않게).
export function buildingBase(building, terrain) {
  if (!terrain?.has) return 0;
  let base = Infinity;
  for (const [x, z] of building.outline) base = Math.min(base, terrain.heightAt(x, z));
  return Number.isFinite(base) ? base : terrain.heightAt(building.x, building.z);
}
