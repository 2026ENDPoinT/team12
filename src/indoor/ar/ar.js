// AR 길안내: 카메라(또는 데모 영상) 화면 위에 경로를 겹쳐 그립니다.
//  1) 화면을 수평 기준으로 펴서 워커로 보내면, 촬영 사진과 비교해 위치·방향을 추정합니다.
//  2) 휴대폰은 자이로·나침반으로 방향을 매 프레임 이어 가고, 사진 비교 결과로 방향 기준을 보정합니다.
//  3) 추정 자세로 three 카메라를 맞춰 바닥 경로·회전 화살표·목적지 핀을 그립니다.
import * as THREE from "three";
import { sampleQuery, blurGray, blurSigma, headingOf } from "./localize.mjs";
import {
  routeMetrics,
  progressOn,
  nextStep,
  pointAt,
  walkMinutes,
  buildSteps,
} from "../guide.mjs";
import { floorName } from "../model.mjs";

const D2R = Math.PI / 180;
const $ = (s) => document.querySelector(s);
const EYE = 1.4; // 휴대폰 높이(m)
const PHONE_FOV_LONG = 65; // 휴대폰 기본 카메라 긴 변 화각(도) — ?fov= 로 바꿀 수 있음

// 사용자가 화면을 한 번이라도 누른 뒤에만 진동 (브라우저 정책)
const buzz = (p) => {
  if (navigator.userActivation?.hasBeenActive) navigator.vibrate?.(p);
};
const angDiff = (a, b) => ((((a - b) % 360) + 540) % 360) - 180;
const ARROW = {
  start: "↑",
  straight: "↑",
  left: "←",
  right: "→",
  "slight-left": "↖",
  "slight-right": "↗",
  "u-left": "↶",
  "u-right": "↷",
  "stair-up": "⇡",
  "stair-down": "⇣",
  elev: "⇅",
  arrive: "✦",
};

// 3×3 행 우선 행렬 유틸
const mul = (A, B) => {
  const C = new Array(9);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      C[i * 3 + j] =
        A[i * 3] * B[j] + A[i * 3 + 1] * B[3 + j] + A[i * 3 + 2] * B[6 + j];
  return C;
};
const Rz = (a) => [
  Math.cos(a),
  -Math.sin(a),
  0,
  Math.sin(a),
  Math.cos(a),
  0,
  0,
  0,
  1,
];
const Rx = (a) => [
  1,
  0,
  0,
  0,
  Math.cos(a),
  -Math.sin(a),
  0,
  Math.sin(a),
  Math.cos(a),
];
const Ry = (a) => [
  Math.cos(a),
  0,
  Math.sin(a),
  0,
  1,
  0,
  -Math.sin(a),
  0,
  Math.cos(a),
];
const FLIP = [1, 0, 0, 0, -1, 0, 0, 0, -1];
// 수평 카메라 (방위 h, 기울기 p) → 카메라→세계 회전 (OpenCV 축)
export function levelR(h, p) {
  const f = [Math.cos(p) * Math.cos(h), Math.cos(p) * Math.sin(h), Math.sin(p)];
  const r = [Math.sin(h), -Math.cos(h), 0];
  const d = [
    Math.sin(p) * Math.cos(h),
    Math.sin(p) * Math.sin(h),
    -Math.cos(p),
  ];
  return [r[0], d[0], f[0], r[1], d[1], f[1], r[2], d[2], f[2]];
}
// 기기 방향 이벤트 → 카메라→지구(동·북·위) 회전
function deviceR(o) {
  const screenAngle =
    (screen.orientation && screen.orientation.angle) || window.orientation || 0;
  const Rd = mul(mul(Rz(o.alpha * D2R), Rx(o.beta * D2R)), Ry(o.gamma * D2R));
  return mul(mul(Rd, Rz(screenAngle * D2R)), FLIP);
}

export async function openAR(opts) {
  const {
    indoor,
    dest,
    mode,
    demo: demoWanted,
    assets = "assets/",
    onClose,
    onRoute,
  } = opts;
  let route = opts.route;
  const root = $("#ar"),
    video = $("#ar-video"),
    glCanvas = $("#ar-gl");
  const ui = {
    step: $("#ar-step-text"),
    sub: $("#ar-step-sub"),
    arrow: $("#ar-arrow"),
    status: $("#ar-status"),
    coach: $("#ar-coach"),
    dest: $("#ar-dest"),
    remain: $("#ar-remain"),
    err: $("#ar-error"),
    arrive: $("#ar-arrive"),
    mini: $("#ar-mini"),
  };
  root.hidden = false;
  ui.err.hidden = true;
  ui.arrive.hidden = true;
  ui.coach.hidden = false;
  ui.dest.textContent = `${dest.title}${dest.name ? " · " + dest.name : ""}`;
  setStatus("searching", "위치를 찾는 중");

  // iOS: 센서 권한은 사용자 터치 직후에 요청해야 합니다.
  let sensorOK = false;
  if (!demoWanted) {
    try {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      )
        sensorOK =
          (await DeviceOrientationEvent.requestPermission()) === "granted";
      else sensorOK = "DeviceOrientationEvent" in window;
    } catch {
      sensorOK = false;
    }
  }

  let closed = false;
  let stream = null,
    demo = null;
  const fovLong =
    +new URLSearchParams(location.search).get("fov") || PHONE_FOV_LONG;

  // ---- 화면 소스: 카메라 → 실패하면 데모 안내
  async function startCamera() {
    if (!window.isSecureContext)
      throw Object.assign(
        new Error("HTTPS 주소에서만 카메라를 쓸 수 있어요."),
        { code: "insecure" },
      );
    if (!navigator.mediaDevices?.getUserMedia)
      throw Object.assign(
        new Error("이 브라우저는 카메라를 지원하지 않아요."),
        { code: "nocam" },
      );
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 960 },
        height: { ideal: 720 },
      },
    });
    video.srcObject = stream;
    video.loop = false;
    await video.play();
  }
  async function startDemo() {
    const meta = await fetch(assets + "demo.json").then((r) => r.json());
    demo = meta;
    video.srcObject = null;
    video.src = assets + meta.video;
    video.loop = false;
    video.muted = true;
    await video.play().catch(() => {});
  }
  try {
    if (demoWanted) await startDemo();
    else await startCamera();
  } catch (e) {
    showError(e);
    if (!demoWanted) return { close };
  }

  // ---- 센서
  let ori = null;
  const onOri = (e) => {
    if (e.alpha == null) return;
    ori = {
      alpha: e.alpha,
      beta: e.beta,
      gamma: e.gamma,
      t: performance.now(),
    };
  };
  if (!demo && sensorOK) addEventListener("deviceorientation", onOri);

  // ---- 워커
  const portals = indoor.links.map((l) =>
    l.kind === "stair"
      ? {
          fa: l.fa,
          pa: l.ramp.pts[0],
          fb: l.fb,
          pb: l.ramp.pts[l.ramp.pts.length - 1],
        }
      : { fa: l.fa, pa: l.pa, fb: l.fb, pb: l.pb },
  );
  const worker = new Worker("ar-worker.js");
  let ready = false,
    busy = false,
    qid = 0;
  worker.onmessage = (e) => {
    const m = e.data;
    if (m.type === "ready") ready = true;
    else if (m.type === "error")
      showError(
        new Error(`위치 인식 데이터를 불러오지 못했어요. ${m.message}`),
      );
    else if (m.type === "pose") {
      busy = false;
      onPose(m.r, m.ms);
    }
  };
  worker.postMessage({
    type: "init",
    indexUrl: new URL(assets + "ar-index.bin", location.href).href,
    svUrl: new URL(assets + "sv.json", location.href).href,
    portals,
  });

  // ---- 질의 만들기
  const cap = document.createElement("canvas");
  const cctx = cap.getContext("2d", { willReadFrequently: true });
  function capture() {
    const vw = video.videoWidth,
      vh = video.videoHeight;
    if (!vw || !vh) return null;
    const scale = 220 / Math.max(vw, vh);
    const w = Math.round(vw * scale),
      h = Math.round(vh * scale);
    if (cap.width !== w) {
      cap.width = w;
      cap.height = h;
    }
    cctx.drawImage(video, 0, 0, w, h);
    const px = cctx.getImageData(0, 0, w, h).data;
    const g = new Float32Array(w * h);
    for (let i = 0, j = 0; i < g.length; i++, j += 4)
      g[i] = 0.299 * px[j] + 0.587 * px[j + 1] + 0.114 * px[j + 2];
    let K;
    if (demo) {
      const s = w / demo.K[4];
      K = {
        fx: demo.K[0] * s,
        fy: demo.K[1] * s,
        cx: demo.K[2] * s,
        cy: demo.K[3] * s,
      };
    } else {
      const f = Math.max(w, h) / 2 / Math.tan((fovLong / 2) * D2R);
      K = { fx: f, fy: f, cx: w / 2, cy: h / 2 };
    }
    return { img: { data: blurGray(g, w, h, blurSigma(K.fx)), w, h }, K };
  }

  // ---- 자세 상태
  const pose = {
    ok: false,
    x: 0,
    y: 0,
    f: route.pts[0].f,
    yaw: 90,
    conf: 0,
    lastFix: 0,
  };
  const shown = { x: 0, y: 0, yaw: 90, init: false };
  let headOff = null,
    headOffN = 0; // 건물 방위 − 센서 방위
  let cum = routeMetrics(route),
    steps = opts.steps || buildSteps(route, dest),
    hintS = 0,
    offCount = 0,
    arrived = false,
    lastStepIdx = -1;
  const demoPitch = demo ? (demo.pitchDeg || -6) * D2R : 0;

  function sensorHeading() {
    if (!ori) return null;
    return (headingOf(deviceR(ori)) * 180) / Math.PI;
  }
  function onPose(r, ms) {
    if (closed) return;
    if (r.ok) {
      const firstFix = !pose.ok;
      Object.assign(pose, {
        ok: true,
        x: r.x,
        y: r.y,
        f: r.f,
        yaw: r.yaw,
        conf: r.conf,
        lastFix: performance.now(),
      });
      if (firstFix) {
        ui.coach.hidden = true;
        buzz(40);
      }
      const hs = sensorHeading();
      if (hs != null && r.conf > 0.4) {
        const off = angDiff(r.yaw, hs);
        headOff =
          headOff == null
            ? off
            : headOff + angDiff(off, headOff) * (headOffN < 3 ? 0.5 : 0.15);
        headOffN++;
      }
      setStatus(
        r.conf > 0.55 ? "ok" : "weak",
        r.conf > 0.55
          ? `위치 확인됨 · ${floorName(r.f)}`
          : "위치가 조금 불확실해요",
      );
      updateProgress();
    } else if (!pose.ok || performance.now() - pose.lastFix > 4000) {
      pose.ok = pose.ok && performance.now() - pose.lastFix < 8000;
      setStatus(
        "searching",
        pose.ok ? "위치를 다시 맞추는 중" : "주변을 천천히 비춰 주세요",
      );
      if (!pose.ok) ui.coach.hidden = false;
    }
  }

  function updateProgress() {
    const pr = progressOn(route, cum, pose, hintS);
    if (!pr) return;
    if (pr.off > 6) {
      if (++offCount >= 4) {
        offCount = 0;
        const nr = indoor.routeTo({ f: pose.f, x: pose.x, y: pose.y }, dest, {
          mode,
        });
        if (nr) {
          route = nr;
          cum = routeMetrics(route);
          steps = buildSteps(route, dest);
          hintS = 0;
          lastStepIdx = -1;
          rebuildPath = true;
          onRoute?.(route, steps);
          toast("경로를 다시 찾았어요");
        }
      }
      return;
    }
    offCount = 0;
    hintS = Math.max(hintS - 1, pr.s);
    const nx = nextStep(steps, route, cum, pr.s);
    if (nx.index !== lastStepIdx) {
      lastStepIdx = nx.index;
      buzz(25);
      rebuildPath = true;
    }
    const st = nx.step;
    ui.arrow.dataset.dir = st.dir;
    if (st.dir === "arrive")
      ui.step.textContent =
        pr.remain < 3
          ? `${dest.title} 도착`
          : `${Math.round(pr.remain)}m 앞 ${dest.title}`;
    else if (st.dir.startsWith("stair") || st.dir === "elev")
      ui.step.textContent =
        nx.dist < 3
          ? st.text
          : `${Math.round(nx.dist)}m 앞 ${st.dir === "elev" ? "엘리베이터" : "계단"}`;
    else
      ui.step.textContent =
        nx.dist < 4
          ? st.turn
            ? st.turn.replace(" 방향으로", "") + " 도세요"
            : st.text
          : `${Math.round(nx.dist)}m 앞에서 ${st.turn ? st.turn.replace("으로", "").replace(" 방향", "") : "직진"}`;
    ui.sub.textContent =
      st.dir.startsWith("stair") || st.dir === "elev"
        ? st.text
        : nx.index + 1 < steps.length
          ? `다음: ${steps[Math.min(steps.length - 1, nx.index + 1)].text}`
          : "";
    ui.remain.textContent = `남은 거리 ${Math.round(pr.remain)}m · 약 ${walkMinutes(pr.remain)}`;
    if (
      pr.remain < 2.5 &&
      pose.f === route.pts[route.pts.length - 1].f &&
      !arrived
    ) {
      arrived = true;
      buzz([60, 40, 60]);
      ui.arrive.querySelector("b").textContent = `${dest.title}에 도착했어요`;
      ui.arrive.hidden = false;
    }
    pose.s = pr.s;
  }

  // ---- three 장면
  const renderer = new THREE.WebGLRenderer({
    canvas: glCanvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8877aa, 2.2));
  const cam = new THREE.PerspectiveCamera(60, 1, 0.05, 200);
  const T = (x, y, z) => new THREE.Vector3(x, z, -y);

  // 흐르는 화살표 텍스처
  const tex = (() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    const x = c.getContext("2d");
    x.fillStyle = "rgba(121,80,255,0.78)";
    x.fillRect(0, 0, 64, 64);
    x.strokeStyle = "#fff";
    x.lineWidth = 9;
    x.lineCap = "round";
    x.lineJoin = "round";
    x.beginPath();
    x.moveTo(14, 44);
    x.lineTo(32, 22);
    x.lineTo(50, 44);
    x.stroke();
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const pathMat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  let pathMesh = null,
    rebuildPath = true;
  function buildPath() {
    if (pathMesh) {
      scene.remove(pathMesh);
      pathMesh.geometry.dispose();
    }
    pathMesh = null;
    if (!pose.ok) return;
    const s0 = Math.max(0, (pose.s ?? 0) - 2),
      s1 = s0 + 32;
    const pts = [];
    for (let s = s0; s <= s1; s += 0.5) {
      const p = pointAt(route, cum, s);
      if (Math.abs(p.z - indoor.FL(pose.f).z) > 2.2 && pts.length) break;
      pts.push(p);
      if (s > cum[cum.length - 1]) break;
    }
    if (pts.length < 2) return;
    const pos = [],
      uv = [],
      idx = [];
    const W = 0.75;
    let v = 0;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)],
        b = pts[Math.min(pts.length - 1, i + 1)];
      let dx = b.x - a.x,
        dy = b.y - a.y;
      const L = Math.hypot(dx, dy) || 1;
      dx /= L;
      dy /= L;
      const p = pts[i];
      if (i) v += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y) / W;
      const z = p.z + 0.03;
      pos.push(
        p.x - dy * W * 0.5,
        z,
        -(p.y + dx * W * 0.5),
        p.x + dy * W * 0.5,
        z,
        -(p.y - dx * W * 0.5),
      );
      uv.push(0, v, 1, v);
      if (i) {
        const k = i * 2;
        idx.push(k - 2, k - 1, k, k, k - 1, k + 1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    pathMesh = new THREE.Mesh(g, pathMat);
    pathMesh.renderOrder = 1;
    scene.add(pathMesh);
  }

  // 다음 회전 지점의 세운 화살표
  const arrow3d = (() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.55);
    s.lineTo(0.42, 0.1);
    s.lineTo(0.16, 0.1);
    s.lineTo(0.16, -0.45);
    s.lineTo(-0.16, -0.45);
    s.lineTo(-0.16, 0.1);
    s.lineTo(-0.42, 0.1);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.08,
      bevelEnabled: false,
    });
    g.translate(0, 0, -0.04);
    const m = new THREE.Mesh(
      g,
      new THREE.MeshLambertMaterial({ color: 0x7950ff, emissive: 0x3a1fa0 }),
    );
    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(g),
      new THREE.LineBasicMaterial({ color: 0xffffff }),
    );
    const grp = new THREE.Group();
    grp.add(m, edge);
    grp.visible = false;
    scene.add(grp);
    return grp;
  })();
  // 목적지 핀 + 이름표
  const pin = (() => {
    const grp = new THREE.Group();
    const mat = new THREE.MeshLambertMaterial({
      color: 0x5330d2,
      emissive: 0x2a1580,
    });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), mat);
    head.position.y = 1.9;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.6, 16), mat);
    cone.rotation.x = Math.PI;
    cone.position.y = 1.55;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 80;
    const x = c.getContext("2d");
    x.fillStyle = "#5330d2";
    x.beginPath();
    x.roundRect(4, 4, 248, 72, 36);
    x.fill();
    x.fillStyle = "#fff";
    x.font = "bold 40px 'Noto Sans KR', sans-serif";
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.fillText(dest.title, 128, 42);
    const st = new THREE.CanvasTexture(c);
    st.colorSpace = THREE.SRGBColorSpace;
    // 거리와 상관없이 같은 크기로 보이는 이름표
    const label = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: st,
        depthTest: false,
        sizeAttenuation: false,
      }),
    );
    label.scale.set(0.2, 0.0625, 1);
    label.position.y = 2.45;
    label.renderOrder = 5;
    grp.add(head, cone, label);
    scene.add(grp);
    return grp;
  })();

  function resize() {
    const w = root.clientWidth,
      h = root.clientHeight;
    renderer.setSize(w, h, false);
    // 영상이 화면을 가득 채우도록(cover) 잘린 만큼 화각을 맞춥니다.
    const vw = video.videoWidth || 16,
      vh = video.videoHeight || 9;
    let vfovVid;
    if (demo) vfovVid = 2 * Math.atan(demo.K[5] / 2 / demo.K[1]);
    else {
      const fl = Math.max(vw, vh) / 2 / Math.tan((fovLong / 2) * D2R);
      vfovVid = 2 * Math.atan(vh / 2 / fl);
    }
    const va = vw / vh,
      sa = w / h;
    const vfov =
      sa <= va ? vfovVid : 2 * Math.atan((Math.tan(vfovVid / 2) * va) / sa);
    cam.fov = vfov / D2R;
    cam.aspect = sa;
    cam.updateProjectionMatrix();
  }
  addEventListener("resize", resize);
  video.onloadedmetadata = resize;
  resize();

  // 카메라→건물 회전으로 three 카메라 자세 설정
  const basis = new THREE.Matrix4();
  function setCamera(Rcb, x, y, z) {
    // three 카메라 축: X=x_cv, Y=-y_cv, Z=-z_cv / 건물→three: (x, y, z) → (x, z, -y)
    const col = (j, s) => {
      const v = [Rcb[j] * s, Rcb[3 + j] * s, Rcb[6 + j] * s];
      return new THREE.Vector3(v[0], v[2], -v[1]);
    };
    basis.makeBasis(col(0, 1), col(1, -1), col(2, -1));
    cam.quaternion.setFromRotationMatrix(basis);
    cam.position.copy(T(x, y, z));
  }

  // ---- 미니맵 (진행 방향이 위)
  const mctx = ui.mini.getContext("2d");
  function drawMini(heading) {
    const W = ui.mini.width,
      S = 4.2;
    mctx.setTransform(1, 0, 0, 1, 0, 0);
    mctx.clearRect(0, 0, W, W);
    if (!pose.ok) return;
    mctx.save();
    mctx.translate(W / 2, W / 2);
    mctx.rotate(((heading - 90) * Math.PI) / 180);
    const tp = (x, y) => [(x - shown.x) * S, -(y - shown.y) * S];
    const fl = indoor.FL(pose.f);
    for (const r of fl.rooms) {
      mctx.beginPath();
      r.poly.forEach((p, i) => {
        const q = tp(p[0], p[1]);
        i ? mctx.lineTo(q[0], q[1]) : mctx.moveTo(q[0], q[1]);
      });
      mctx.closePath();
      mctx.fillStyle =
        r.id === dest.id && pose.f === dest.f ? "#7950ff55" : "#e9e5f1";
      mctx.fill();
      mctx.strokeStyle = "#cfc8e0";
      mctx.lineWidth = 1;
      mctx.stroke();
    }
    mctx.strokeStyle = "#7950ff";
    mctx.lineWidth = 5;
    mctx.lineCap = mctx.lineJoin = "round";
    mctx.beginPath();
    let pen = false;
    for (const p of route.pts) {
      if (p.f !== pose.f) {
        pen = false;
        continue;
      }
      const q = tp(p.x, p.y);
      pen ? mctx.lineTo(q[0], q[1]) : mctx.moveTo(q[0], q[1]);
      pen = true;
    }
    mctx.stroke();
    mctx.restore();
    // 나 (항상 가운데, 위쪽이 정면)
    mctx.fillStyle = "#3d8bff33";
    mctx.beginPath();
    mctx.moveTo(W / 2, W / 2);
    mctx.arc(W / 2, W / 2, 46, -Math.PI / 2 - 0.45, -Math.PI / 2 + 0.45);
    mctx.fill();
    mctx.fillStyle = "#3d8bff";
    mctx.strokeStyle = "#fff";
    mctx.lineWidth = 4;
    mctx.beginPath();
    mctx.arc(W / 2, W / 2, 10, 0, Math.PI * 2);
    mctx.fill();
    mctx.stroke();
  }

  // ---- 루프
  let lastQ = 0,
    last = performance.now();
  video.onseeked = () => worker.postMessage({ type: "reset" });
  let lastVT = 0;
  function frame(now) {
    if (closed) return;
    requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;

    // 질의 보내기 (워커가 쉬고 있을 때, 초당 최대 5번)
    if (ready && !busy && now - lastQ > 200 && video.readyState >= 2) {
      if (demo && video.currentTime < lastVT - 1)
        worker.postMessage({ type: "reset" }); // 영상 반복
      lastVT = video.currentTime;
      const c = capture();
      let R = null,
        yawHint = null;
      if (demo) R = levelR(0, demoPitch);
      else if (ori) {
        R = deviceR(ori);
        if (headOff != null && headOffN >= 2)
          yawHint = (headingOf(R) * 180) / Math.PI + headOff;
      } else R = levelR(0, -8 * D2R);
      if (c && R) {
        const pitch = Math.asin(R[8]) / D2R;
        if (!demo && (pitch < -35 || pitch > 25))
          setStatus(
            "weak",
            pitch < 0
              ? "휴대폰을 조금 더 세워 주세요"
              : "휴대폰을 조금 내려 주세요",
          );
        else {
          const q = sampleQuery(c.img, c.K, R);
          busy = true;
          lastQ = now;
          const t = demo ? video.currentTime : now / 1000;
          worker.postMessage(
            {
              type: "query",
              id: ++qid,
              q,
              t,
              yawHint,
              floorHint: pose.ok ? null : route.pts[0].f,
            },
            [q.buffer],
          );
        }
      }
    }

    // 보이는 자세: 경로 위로 살짝 끌어당기고 부드럽게
    if (pose.ok) {
      let tx = pose.x,
        ty = pose.y;
      const pr = progressOn(route, cum, pose, hintS);
      if (pr && pr.off < 2.5) {
        const p = pointAt(route, cum, pr.s);
        tx = tx * 0.4 + p.x * 0.6;
        ty = ty * 0.4 + p.y * 0.6;
      }
      if (!shown.init)
        Object.assign(shown, { x: tx, y: ty, yaw: pose.yaw, init: true });
      const k = Math.min(1, dt * 4);
      shown.x += (tx - shown.x) * k;
      shown.y += (ty - shown.y) * k;
      if (demo) shown.yaw += angDiff(pose.yaw, shown.yaw) * Math.min(1, dt * 5);
    }

    // 카메라 자세
    let heading = shown.yaw;
    let Rcb;
    if (!demo && ori) {
      const Rd = deviceR(ori);
      const off = headOff ?? 0;
      Rcb = mul(Rz(off * D2R), Rd);
      heading = (headingOf(Rcb) * 180) / Math.PI;
    } else Rcb = levelR(shown.yaw * D2R, demoPitch);
    const z = indoor.FL(pose.f).z + EYE;
    setCamera(Rcb, shown.x, shown.y, z);

    // 경로·화살표·핀
    if (
      rebuildPath ||
      (pose.ok && Math.abs((pose.s ?? 0) - (buildPath.s ?? -99)) > 1)
    ) {
      buildPath();
      buildPath.s = pose.s ?? 0;
      rebuildPath = false;
    }
    tex.offset.y -= dt * 1.6;
    const showOverlay = pose.ok && (demo || headOffN > 0);
    if (pathMesh) pathMesh.visible = showOverlay;
    const end = route.pts[route.pts.length - 1];
    pin.visible =
      showOverlay &&
      end.f === pose.f &&
      Math.hypot(end.x - shown.x, end.y - shown.y) < 35;
    pin.position.copy(T(end.x, end.y, indoor.FL(end.f).z));
    pin.children[0].position.y = 1.9 + Math.sin(now / 300) * 0.05;
    arrow3d.visible = false;
    if (showOverlay && pose.s != null) {
      const nx = nextStep(steps, route, cum, pose.s);
      if (
        nx.dist < 14 &&
        nx.step.dir !== "arrive" &&
        nx.step.dir !== "straight"
      ) {
        const a = pointAt(route, cum, pose.s + nx.dist),
          b = pointAt(route, cum, pose.s + nx.dist + 2.5);
        arrow3d.visible = true;
        arrow3d.position.copy(
          T(a.x, a.y, indoor.FL(pose.f).z + 1.1 + Math.sin(now / 350) * 0.06),
        );
        // 카메라를 향해 세운 화살표가 꺾인 뒤 나가는 방향(화면 기준 좌/우)을 가리킵니다.
        const out = Math.atan2(b.y - a.y, b.x - a.x) / D2R;
        arrow3d.lookAt(cam.position);
        const rel = angDiff(out, heading);
        arrow3d.children.forEach((c) => (c.rotation.z = rel * D2R));
      }
      // HUD 화살표: 다가오는 동작(25m 안쪽) 아이콘, 그 전에는 직진
      ui.arrow.textContent = nx.dist < 25 ? ARROW[nx.step.dir] || "↑" : "↑";
      // 경로가 화면 밖이면 어느 쪽을 보라고 알려 줌
      const ahead = pointAt(route, cum, pose.s + 4);
      const rel = angDiff(
        Math.atan2(ahead.y - shown.y, ahead.x - shown.x) / D2R,
        heading,
      );
      const hint =
        Math.abs(rel) > 55
          ? Math.abs(rel) > 135
            ? "경로가 뒤쪽에 있어요 · 돌아서 보세요"
            : rel > 0
              ? "← 경로가 왼쪽에 있어요"
              : "경로가 오른쪽에 있어요 →"
          : "";
      if (hint) ui.sub.textContent = hint;
      ui.sub.classList.toggle("hint", !!hint);
    }
    drawMini(heading);
    renderer.render(scene, cam);
  }
  requestAnimationFrame(frame);

  // ---- 보조
  function setStatus(kind, text) {
    ui.status.className = `ar-status ${kind}`;
    ui.status.textContent = text;
  }
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast.h);
    toast.h = setTimeout(() => (t.hidden = true), 2600);
  }
  function showError(e) {
    ui.err.hidden = false;
    ui.coach.hidden = true;
    const insecure = e.code === "insecure";
    const denied = e.name === "NotAllowedError";
    ui.err.querySelector("b").textContent = insecure
      ? "HTTPS에서 열어 주세요"
      : denied
        ? "카메라 권한이 필요해요"
        : "카메라를 켤 수 없어요";
    ui.err.querySelector("p").textContent = insecure
      ? "휴대폰 카메라는 보안 연결(HTTPS)에서만 쓸 수 있어요. 배포 주소나 npm run dev:phone 주소로 열어 주세요."
      : denied
        ? "브라우저 설정에서 이 사이트의 카메라 접근을 허용한 뒤 다시 시도해 주세요. 촬영 영상으로 미리 체험할 수도 있어요."
        : `${e.message || e} 촬영 영상으로 AR 길안내를 체험할 수 있어요.`;
  }
  function close() {
    if (closed) return;
    closed = true;
    worker.terminate();
    removeEventListener("deviceorientation", onOri);
    removeEventListener("resize", resize);
    stream?.getTracks().forEach((t) => t.stop());
    video.pause();
    video.removeAttribute("src");
    video.srcObject = null;
    video.load();
    renderer.dispose();
    pathMesh?.geometry.dispose();
    root.hidden = true;
    onClose?.();
  }
  $("#ar-close").onclick = close;
  $("#ar-error-close").onclick = close;
  $("#ar-arrive-close").onclick = close;
  // 데모: 영상이 끝나면 다시 보기
  const again = $("#ar-again");
  again.hidden = !demo;
  again.onclick = () => {
    ui.arrive.hidden = true;
    arrived = false;
    route = opts.route;
    cum = routeMetrics(route);
    steps = opts.steps || buildSteps(route, dest);
    hintS = 0;
    lastStepIdx = -1;
    rebuildPath = true;
    pose.ok = false;
    shown.init = false;
    worker.postMessage({ type: "reset" });
    video.currentTime = 0;
    video.play().catch(() => {});
  };
  video.onended = () => {
    if (!demo || closed) return;
    if (!arrived)
      ui.arrive.querySelector("b").textContent = "데모 영상이 끝났어요";
    ui.arrive.hidden = false;
  };
  $("#ar-demo").onclick = () => {
    close();
    opts.onDemo?.();
  };
  return { close };
}
