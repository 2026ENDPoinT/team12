import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

function random(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

// Original procedural twig atlas; shared by every tree, without external assets.
export function createLeafTexture() {
  const size = 256,
    pixels = new Uint8Array(size * size * 4),
    rnd = random(7163);
  function ellipse(cx, cy, rx, ry, angle, color) {
    const c = Math.cos(angle),
      s = Math.sin(angle),
      radius = Math.ceil(Math.max(rx, ry) + 1);
    for (
      let y = Math.max(0, Math.floor(cy - radius));
      y < Math.min(size, cy + radius);
      y++
    )
      for (
        let x = Math.max(0, Math.floor(cx - radius));
        x < Math.min(size, cx + radius);
        x++
      ) {
        const dx = x - cx,
          dy = y - cy;
        const u = (dx * c + dy * s) / rx,
          v = (-dx * s + dy * c) / ry;
        const edge = 1 - u * u - v * v;
        if (edge <= 0) continue;
        const index = (y * size + x) * 4,
          shade = 0.94 + 0.06 * edge;
        for (let channel = 0; channel < 3; channel++)
          pixels[index + channel] = Math.min(255, color[channel] * shade);
        pixels[index + 3] = Math.min(255, Math.round(edge * 1700));
      }
  }
  for (let twig = 0; twig < 6; twig++) {
    const angle = twig * 2.399963,
      reach = 65 + rnd() * 43;
    const tipX = 128 + Math.cos(angle) * reach,
      tipY = 128 + Math.sin(angle) * reach;
    for (let t = 0; t <= 1; t += 0.025)
      ellipse(
        128 + (tipX - 128) * t,
        139 + (tipY - 139) * t,
        1.1,
        1.1,
        0,
        [92, 94, 63],
      );
    for (let leaf = 0; leaf < 6; leaf++) {
      const t = 0.25 + leaf / 8,
        side = leaf % 2 ? 1 : -1;
      const cx =
        128 + (tipX - 128) * t - Math.sin(angle) * side * (10 + rnd() * 10);
      const cy =
        139 + (tipY - 139) * t + Math.cos(angle) * side * (10 + rnd() * 10);
      const tone = rnd();
      ellipse(cx, cy, 25 + rnd() * 7, 14 + rnd() * 4, angle + side * 0.65, [
        99 + tone * 40,
        127 + tone * 38,
        64 + tone * 29,
      ]);
    }
  }
  const texture = new THREE.DataTexture(pixels, size, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}
function branch(start, end, radius) {
  const direction = end.clone().sub(start);
  const geometry = new THREE.CylinderGeometry(
    radius * 0.3,
    radius,
    direction.length(),
    5,
    1,
  );
  geometry.applyQuaternion(
    new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize(),
    ),
  );
  geometry.translate(...start.clone().add(end).multiplyScalar(0.5).toArray());
  return geometry;
}
function createTreeGeometry(cardCount) {
  const rnd = random(941),
    cards = [],
    branches = [];
  branches.push(
    branch(new THREE.Vector3(), new THREE.Vector3(0.05, 6.7, 0), 0.42),
  );
  for (let i = 0; i < 4; i++) {
    const a = i * 2.399963,
      r = 2.2 + rnd() * 1.1;
    branches.push(
      branch(
        new THREE.Vector3(0, 3.9 + i * 0.21, 0),
        new THREE.Vector3(Math.cos(a) * r, 7.5 + rnd() * 1.3, Math.sin(a) * r),
        0.16,
      ),
    );
  }
  for (let i = 0; i < cardCount; i++) {
    const a = i * 2.399963,
      y = 1 - (2 * (i + 0.5)) / cardCount;
    const r = Math.sqrt(1 - y * y),
      depth = 0.73 + rnd() * 0.27;
    const position = new THREE.Vector3(
      Math.cos(a) * r * 3.8 * depth,
      8.4 + y * 3.35 * depth,
      Math.sin(a) * r * 3.5 * depth,
    );
    const cardSize = cardCount === 8 ? 4.9 : 4.3;
    const card = new THREE.PlaneGeometry(
      cardSize + rnd() * 0.7,
      cardSize - 0.3 + rnd() * 0.7,
    );
    card.applyQuaternion(
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(rnd() * Math.PI, rnd() * Math.PI * 2, rnd() * Math.PI),
      ),
    );
    card.translate(...position.toArray());
    cards.push(card);
  }
  const crown = mergeGeometries(cards),
    wood = mergeGeometries(branches);
  [...cards, ...branches].forEach((g) => g.dispose());
  return { crown, wood };
}
function contactTexture() {
  const size = 64,
    pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const distance = Math.hypot(
        ((x + 0.5) / size) * 2 - 1,
        ((y + 0.5) / size) * 2 - 1,
      );
      pixels[(y * size + x) * 4 + 3] = Math.round(
        Math.pow(Math.max(0, 1 - distance), 1.7) * 65,
      );
    }
  const texture = new THREE.DataTexture(pixels, size, size);
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
export function createBroadleafTrees(trees) {
  const group = new THREE.Group();
  group.name = "campus-broadleaf-trees";
  if (!trees.length) return group;
  const { crown, wood } = createTreeGeometry(16),
    coarse = createTreeGeometry(8),
    texture = createLeafTexture();
  coarse.wood.dispose();
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0xffffff,
    roughness: 0.94,
    metalness: 0,
    side: THREE.DoubleSide,
    alphaTest: 0.42,
    alphaToCoverage: true,
    emissive: 0x27331d,
    emissiveIntensity: 0.15,
  });
  const leaves = new THREE.InstancedMesh(crown, material, trees.length);
  const trunks = new THREE.InstancedMesh(
    wood,
    new THREE.MeshStandardMaterial({ color: 0x716453, roughness: 1 }),
    trees.length,
  );
  const shadowTexture = contactTexture();
  const shadows = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.6,
    }),
    trees.length,
  );
  material.addEventListener("dispose", () => {
    texture.dispose();
    // Scene disposal sees the active geometry only; also release the other level.
    (leaves.geometry === crown ? coarse.crown : crown).dispose();
  });
  shadows.material.addEventListener("dispose", () => shadowTexture.dispose());
  const dummy = new THREE.Object3D(),
    color = new THREE.Color();
  trees.forEach(([x, z, scale, baseY = 0], index) => {
    const variation = (Math.sin(x * 12.9898 + z * 78.233) + 1) / 2;
    dummy.position.set(x, baseY, z);
    dummy.rotation.set(0, variation * Math.PI * 2, 0);
    dummy.scale.set(
      scale * (0.93 + variation * 0.15),
      scale,
      scale * (1.07 - variation * 0.15),
    );
    dummy.updateMatrix();
    leaves.setMatrixAt(index, dummy.matrix);
    trunks.setMatrixAt(index, dummy.matrix);
    color.setHex(
      [0xc5d2ae, 0xb4c5a1, 0xcbd3b4, 0xbccbaa][Math.floor(variation * 3.99)],
    );
    leaves.setColorAt(index, color);
    dummy.position.set(x, baseY + 0.21, z);
    dummy.rotation.set(-Math.PI / 2, 0, 0);
    dummy.scale.set(10 * scale, 9 * scale, 1);
    dummy.updateMatrix();
    shadows.setMatrixAt(index, dummy.matrix);
  });
  // Leaves use a soft ground shade instead of expensive masked shadow rendering.
  leaves.castShadow = false;
  leaves.receiveShadow = true;
  trunks.castShadow = trunks.receiveShadow = true;
  group.add(trunks, leaves, shadows);
  group.userData.treeCount = trees.length;
  group.userData.leafTrianglesPerTree = crown.index.count / 3;
  group.userData.leafCards = 16;
  group.updateDetail = (pixelsPerMeter) => {
    // Orthographic zoom changes screen size without changing camera distance.
    // Hysteresis avoids repeatedly switching levels near the boundary.
    const cards = group.userData.leafCards;
    const next =
      cards === 16
        ? pixelsPerMeter < 1.5
          ? 8
          : 16
        : pixelsPerMeter > 1.8
          ? 16
          : 8;
    if (next === cards) return;
    leaves.geometry = next === 16 ? crown : coarse.crown;
    group.userData.leafCards = next;
    group.userData.leafTrianglesPerTree = leaves.geometry.index.count / 3;
  };
  return group;
}
