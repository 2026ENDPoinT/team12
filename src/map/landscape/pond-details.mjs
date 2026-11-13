import * as THREE from "three";

// Photo-guided Bung-eobang details in existing campus meter coordinates.
// Decorative decks are intentionally separate from the unverified route graph.
export function createPondDetails() {
  const group = new THREE.Group();
  group.name = "bungeobang-photo-details";
  const material = (color) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
  const wood = material(0x9c8064),
    rail = material(0x88735b),
    end = material(0xb39b7d);
  const rock = material(0x899080);
  const batches = new Map(),
    dummy = new THREE.Object3D();
  function box(mat, x, y, z, w, h, d, turn = 0) {
    if (!batches.has(mat)) batches.set(mat, []);
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, turn, 0);
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    batches.get(mat).push(dummy.matrix.clone());
  }
  function beam(mat, a, b, width, height, y) {
    box(
      mat,
      (a.x + b.x) / 2,
      y,
      (a.z + b.z) / 2,
      width,
      height,
      Math.hypot(b.x - a.x, b.z - a.z),
      Math.atan2(b.x - a.x, b.z - a.z),
    );
  }
  const center = new THREE.Vector3(-102, 1.35, -119);
  const paths = [
    [
      [-138, -121],
      [-126, -119],
      [-114, -119],
      [-102, -119],
    ],
    [
      [-102, -119],
      [-87, -121],
      [-76, -130],
      [-70, -146],
      [-72, -150],
    ],
    [
      [-102, -119],
      [-101, -104],
      [-96, -91],
      [-88, -82],
    ],
    [
      [-72, -150],
      [-68, -133],
      [-72, -112],
      [-77, -96],
      [-88, -82],
      [-101, -72],
      [-110, -65],
    ],
  ];
  for (const coordinates of paths) {
    const curve = new THREE.CatmullRomCurve3(
      coordinates.map(([x, z]) => new THREE.Vector3(x, 1.35, z)),
      false,
      "centripetal",
    );
    const length = curve.getLength(),
      count = Math.ceil(length / 1.8),
      width = 2.1;
    let prev = null;
    for (let i = 0; i <= count; i++) {
      const t = i / count,
        p = curve.getPointAt(t),
        direction = curve.getTangentAt(t),
        normal = new THREE.Vector3(-direction.z, 0, direction.x);
      const left = p.clone().addScaledVector(normal, width / 2),
        right = p.clone().addScaledVector(normal, -width / 2);
      // Shallow supporting beam, crosswise timber boards and two rail levels.
      if (prev) {
        beam(wood, prev.p, p, width, 0.25, 1.25);
        for (const side of ["left", "right"])
          for (const y of [1.95, 2.4])
            beam(
              rail,
              prev[side],
              side === "left" ? left : right,
              0.1,
              0.12,
              y,
            );
      }
      const turn = Math.atan2(direction.x, direction.z);
      box(end, p.x, 1.405, p.z, width, 0.055, 0.08, turn);
      if (i % 2 === 0)
        for (const point of [left, right]) {
          box(rail, point.x, 1.55, point.z, 0.16, 2.2, 0.16);
          box(end, point.x, 2.7, point.z, 0.23, 0.1, 0.23);
        }
      prev = { p, left, right };
    }
  }
  // Circular meeting deck at the path junction, with openings for each branch.
  const disk = new THREE.Mesh(
    new THREE.CylinderGeometry(3.7, 3.7, 0.35, 24),
    wood,
  );
  disk.position.copy(center);
  disk.castShadow = disk.receiveShadow = true;
  group.add(disk);
  for (let x = -3.4; x <= 3.4; x += 0.4) {
    const span = 2 * Math.sqrt(3.7 * 3.7 - x * x);
    box(end, center.x + x, 1.54, center.z, 0.045, 0.025, span);
  }
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    if (Math.abs(Math.sin(a)) < 0.43 || Math.sin(a) > 0.85) continue;
    const x = center.x + Math.cos(a) * 3.55,
      z = center.z + Math.sin(a) * 3.55;
    box(rail, x, 2.05, z, 0.16, 1.2, 0.16);
    const b = a + (Math.PI * 2) / 24;
    beam(
      rail,
      { x, z },
      { x: center.x + Math.cos(b) * 3.55, z: center.z + Math.sin(b) * 3.55 },
      0.13,
      0.15,
      2.55,
    );
  }
  // Small planted island in the northern basin.
  const island = new THREE.Mesh(
    new THREE.CylinderGeometry(3.6, 4.3, 0.75, 12),
    rock,
  );
  island.position.set(-119, 0.55, -141);
  island.receiveShadow = true;
  group.add(island);
  // Island tree is rendered by the shared broadleaf trial in trees.mjs.
  // Two low fountain floats, pale ripple rings and a single particle draw call.
  const droplets = [],
    seeds = [];
  for (const [fx, fz] of [
    [-121, -95],
    [-104, -101],
  ]) {
    const float = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.45, 0.18, 12),
      rock,
    );
    float.position.set(fx, 0.48, fz);
    group.add(float);
    box(end, fx, 0.85, fz, 0.23, 0.65, 0.23);
    for (const r of [5.9, 7.1]) {
      const ripple = new THREE.Mesh(
        new THREE.RingGeometry(r, r + 0.13, 48),
        new THREE.MeshBasicMaterial({
          color: 0xc2d7cb,
          transparent: true,
          opacity: 0.3,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      );
      ripple.rotation.x = -Math.PI / 2;
      ripple.position.set(fx, 0.34, fz);
      group.add(ripple);
    }
    for (let i = 0; i < 650; i++) {
      const a = i * 2.399963,
        phase = ((i * 73) % 647) / 647,
        spread = 0.8 + ((i * 37) % 101) / 505;
      droplets.push(fx, 0.65, fz);
      seeds.push(a, phase, spread);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(droplets, 3),
  );
  geometry.setAttribute("spray", new THREE.Float32BufferAttribute(seeds, 3));
  const sprayMaterial = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    transparent: true,
    depthWrite: false,
    vertexShader: `attribute vec3 spray; uniform float time; varying float alpha;
      void main(){ float t=fract(spray.y+time*0.42); vec3 p=position;
        float r=t*7.4*spray.z; p.x+=cos(spray.x)*r; p.z+=sin(spray.x)*r;
        p.y+=20.0*t*(1.0-t)*spray.z; alpha=0.68*(1.0-t*0.55);
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); gl_PointSize=2.4; }`,
    fragmentShader:
      `varying float alpha; void main(){float d=length(gl_PointCoord-0.5); if(d>0.5)discard; gl_FragColor=vec4(0.85,0.94,0.91,alpha*(1.0-smoothstep(0.1,0.5,d))); #include <colorspace_fragment> }`.replace(
        "#include <colorspace_fragment>",
        "\n#include <colorspace_fragment>\n",
      ),
  });
  const spray = new THREE.Points(geometry, sprayMaterial);
  spray.frustumCulled = false;
  group.add(spray);
  const cube = new THREE.BoxGeometry(1, 1, 1);
  for (const [mat, parts] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
    parts.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
  }
  return {
    group,
    update: (seconds) => {
      sprayMaterial.uniforms.time.value = seconds;
    },
  };
}
