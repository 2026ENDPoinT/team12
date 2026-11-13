// AR 길안내: 카메라(또는 데모 영상) 화면 위에 경로를 겹쳐 그립니다.
//  1) 화면을 수평 기준으로 펴서 워커로 보내면, 입자 필터가 촬영 사진 비교 + 걸음 + 벽·층 연결을
//     시간에 따라 합쳐 위치·층·방향(센서 기준 차이)을 추정합니다. (pf.mjs)
//  2) 걸음은 가속도 봉우리로 세고(보행자 추측항법), 방향은 자이로로 매 프레임 이어 갑니다.
//  3) 화면에 보이는 위치는 경로 근처면 경로 위에 붙이고 부드럽게 따라가, 경로·화살표가 흔들리지 않게 합니다.
//  4) ?loc=<주소> 를 주면 위치 계산 서버(특징점 측위)의 결과도 함께 반영합니다(docs/decisions.md 참고).
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
import { floorName, floorLabel } from "../model.mjs";
import { portalsFrom } from "./pf.mjs";
import {
  FovCalib,
  OffsetFilter,
  columnProfile,
  manhattanAxis,
  relTurn,
} from "./calib.mjs";
import { playLift, voice } from "../lift.js";

const D2R = Math.PI / 180;
const $ = (s) => document.querySelector(s);
const EYE = 1.35; // 휴대폰 높이(m): 가슴 앞에 들고 볼 때
const HOLD = 15; // 사진으로 확인한 뒤 걸음만으로 이어 가는 최대 시간(초)
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
    // 걸음 감지용 가속도(iOS는 따로 허락 필요)
    try {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
      )
        await DeviceMotionEvent.requestPermission();
    } catch {}
  }

  let closed = false;
  let stream = null,
    demo = null;
  // 카메라 화각: ?fov= > 이 기기에서 자동 보정해 둔 값 > 기본값. 쓰는 동안 자동 보정으로 갱신.
  const urlFov = +new URLSearchParams(location.search).get("fov") || 0;
  let savedFov = 0;
  try {
    savedFov = +localStorage.getItem("sai-ar-fov") || 0;
  } catch {}
  let fovLong = urlFov || savedFov || PHONE_FOV_LONG;
  let fovCal = null;
  const DEBUG = new URLSearchParams(location.search).has("debug");

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
    // 카메라를 못 켰을 때: 아래 장면을 만들기 전이므로 간단히 정리하고 끝냄
    const bail = () => {
      closed = true;
      stream?.getTracks().forEach((t) => t.stop());
      root.hidden = true;
      onClose?.();
    };
    $("#ar-error-close").onclick = bail;
    $("#ar-demo").onclick = () => {
      bail();
      opts.onDemo?.();
    };
    return { close: bail };
  }

  // 안내 중 화면이 꺼지지 않게
  let wake = null;
  const lockScreen = async () => {
    try {
      wake = await navigator.wakeLock?.request("screen");
    } catch {}
  };
  lockScreen();
  // 다른 앱으로 갔다 오면 위치를 다시 찾음
  let paused = false;
  const onVis = () => {
    if (document.hidden) {
      paused = true;
      if (demo) video.pause();
    } else if (paused) {
      paused = false;
      lockScreen();
      worker?.postMessage({ type: "reset" });
      pose.ok = false;
      shown.init = false;
      if (demo) video.play().catch(() => {});
      else video.play().catch(() => {});
    }
  };
  document.addEventListener("visibilitychange", onVis);

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

  // ---- 걸음 감지: 중력 포함 가속도 크기의 봉우리 하나 = 한 걸음
  const pdr = { on: false, lp: 9.8, hi: false, lastT: 0, lo: 99, top: 0 };
  const onMotion = (e) => {
    const a = e.accelerationIncludingGravity;
    if (!a || a.x == null) return;
    pdr.on = true;
    pdr.lp += (Math.hypot(a.x, a.y, a.z) - pdr.lp) * 0.25;
    pdr.lo = Math.min(pdr.lo, pdr.lp);
    pdr.top = Math.max(pdr.top, pdr.lp);
    const now = performance.now();
    if (!pdr.hi && pdr.lp > 10.8 && now - pdr.lastT > 280) pdr.hi = true;
    else if (pdr.hi && pdr.lp < 9.9) {
      pdr.hi = false;
      pdr.lastT = now;
      // 걸음 길이: 가속도 폭의 네제곱근에 비례(Weinberg), 0.45~0.85m
      const len = Math.max(
        0.45,
        Math.min(0.85, 0.48 * Math.pow(Math.max(0.5, pdr.top - pdr.lo), 0.25)),
      );
      pdr.lo = 99;
      pdr.top = 0;
      const yaw = sensorHeading();
      pdr.n = (pdr.n || 0) + 1;
      if (yaw != null && ready && !lift) {
        worker.postMessage({ type: "step", len, yaw });
        corridorAlign(yaw);
      }
    }
  };
  if (!demo) addEventListener("devicemotion", onMotion);

  // ---- 워커
  const worker = new Worker("ar-worker.js");
  let ready = false,
    busy = false,
    qid = 0,
    lastMs = 0;
  worker.onmessage = (e) => {
    const m = e.data;
    if (m.type === "ready") ready = true;
    else if (m.type === "error")
      showError(
        new Error(`위치 인식 데이터를 불러오지 못했어요. ${m.message}`),
      );
    else if (m.type === "pose") {
      if (m.id) {
        busy = false;
        lastMs = m.ms;
      }
      onPose(m.r);
    } else if (m.type === "motion") onMove(m.r);
  };
  const Mg = indoor.M;
  worker.postMessage({
    type: "init",
    indexUrl: new URL(assets + "ar-index.bin", location.href).href,
    svUrl: new URL(assets + "sv.json", location.href).href,
    portals: portalsFrom(indoor.links),
    grid: {
      gx0: Mg.gx0,
      gy1: Mg.gy1,
      cell: Mg.cell,
      gw: Mg.gw,
      gh: Mg.gh,
      floors: Mg.floors.map((f) => ({ n: f.n, grid: f.grid })),
    },
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
    return {
      img: { data: blurGray(g, w, h, blurSigma(K.fx)), w, h },
      K,
      raw: { g, w, h },
    };
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
  let headOff = null, // 화면에 쓰는 '건물 방위 − 센서 방위' (부드럽게 따라감)
    offF = new OffsetFilter(), // 방향 기준 측정값(사진 비교·복도 걷기) 모음
    stepYaws = [],
    lostSince = 0,
    lostSaid = false;
  let cum = routeMetrics(route),
    steps =
      opts.steps || buildSteps(route, dest, { landmarks: indoor.destinations }),
    hintS = 0,
    offCount = 0,
    arrived = false,
    lastStepIdx = -1,
    lift = null, // 엘리베이터 탑승 중 화면
    liftStep = null,
    spoken = new Set();
  const liftDone = new Set();
  const demoPitch = demo ? (demo.pitchDeg || -6) * D2R : 0;

  // ---- 벽 방향: 도면 방 테두리의 주된 방향(90° 주기). 미래관은 본관 0°, 옆 동 약 9.8°.
  const wallEdges = new Map();
  for (const n of indoor.floors) {
    const E = [];
    for (const r of indoor.FL(n).rooms) {
      const P = r.poly;
      for (let i = 0; i < P.length; i++) {
        const a = P[i],
          b = P[(i + 1) % P.length];
        const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (L < 1) continue;
        let t = Math.atan2(b[1] - a[1], b[0] - a[0]) / D2R;
        t = ((t % 90) + 90) % 90;
        E.push({ x: (a[0] + b[0]) / 2, y: (a[1] + b[1]) / 2, L, t });
      }
    }
    wallEdges.set(n, E);
  }
  // 근처 10m 벽 방향: 한 방향이 75% 넘게 차지할 때만(두 동이 만나는 곳은 판단 안 함)
  function axisAt(f, x, y) {
    const bins = [];
    let tot = 0;
    for (const e of wallEdges.get(f) || []) {
      if (Math.hypot(e.x - x, e.y - y) > 10) continue;
      tot += e.L;
      const b = bins.find((q) => Math.abs(angDiff(q.t * 4, e.t * 4)) / 4 < 2);
      if (b) {
        b.t =
          (b.t * b.L + (b.t + angDiff(e.t * 4, b.t * 4) / 4) * e.L) /
          (b.L + e.L);
        b.L += e.L;
      } else bins.push({ t: e.t, L: e.L });
    }
    const best = bins.sort((a, b) => b.L - a.L)[0];
    return best && best.L > tot * 0.75 ? best.t : null;
  }
  // 방향 기준: 소실점 나침반(가장 정확) → 사진 비교·복도 걷기 순
  const vpF = new OffsetFilter(15);
  let vpLast = 0,
    prevVR = null,
    prevVT = 0;
  function offTarget(now) {
    if (vpF.n >= 3 && now - vpLast < 20000) return vpF.value;
    return offF.value;
  }
  function vanishing(c, R, now) {
    const pr = prevVR,
      pt = prevVT;
    prevVR = R;
    prevVT = now;
    if (!pose.ok || !pr || now - pt > 400) return;
    // 돌리는 중이면 영상과 센서 시각이 어긋나므로 거의 멈춰 있을 때만
    const tr = relTurn(pr, R);
    if (Math.abs(tr.yaw) > 2.5 || Math.abs(tr.pitch) > 2.5) return;
    const A = axisAt(pose.f, shown.x, shown.y);
    if (A == null) return;
    const v = manhattanAxis(c.raw.g, c.raw.w, c.raw.h, c.K, R);
    if (!v || v.ratio < 2.5) return;
    const ref = headOff ?? offF.value ?? pose.off;
    if (ref == null) return;
    const base = A - v.axis;
    const off = base + 90 * Math.round(angDiff(ref, base) / 90);
    if (Math.abs(angDiff(off, ref)) > 30) return;
    vpF.add(off, Math.min(3, v.ratio / 2));
    vpLast = now;
    if (vpF.n >= 3)
      worker.postMessage({ type: "heading", off: vpF.value, sd: 5 });
  }

  function sensorHeading() {
    if (!ori) return null;
    return (headingOf(deviceR(ori)) * 180) / Math.PI;
  }
  function onPose(r) {
    if (closed) return;
    const now = performance.now();
    // 엘리베이터 탑승 중: 도착 층에서 확실히 잡히면 내린 것으로 봄
    if (lift) {
      if (r.ok && liftStep && r.f === liftStep.to && r.conf > 0.2) finishLift();
      else return;
    }
    if (r.ok && pose.ok) {
      // 크게 튀는 위치(5m 넘게·다른 층)는 같은 곳이 두 번 연속 나와야 받아들임
      const far = r.f !== pose.f || Math.hypot(r.x - pose.x, r.y - pose.y) > 5;
      if (far) {
        const pj = pose.jump;
        pose.jump = { f: r.f, x: r.x, y: r.y };
        if (!pj || pj.f !== r.f || Math.hypot(pj.x - r.x, pj.y - r.y) > 2.5)
          return;
      }
      pose.jump = null;
    }
    if (r.ok) {
      const firstFix = !pose.ok;
      pose.off = r.off;
      Object.assign(pose, {
        ok: true,
        x: r.x,
        y: r.y,
        f: r.f,
        yaw: r.yaw,
        conf: r.conf,
        lastFix: now,
      });
      // 사진 비교로 본 방향 기준: 확실할 때만, 튀는 값은 필터가 버림
      if (r.off != null && ori && r.conf > 0.35) offF.add(r.off, r.conf);
      if (firstFix) {
        ui.coach.hidden = true;
        buzz(40);
      }
      lostSince = 0;
      lostSaid = false;
      setStatus(
        r.conf > 0.35 ? "ok" : "weak",
        r.conf > 0.35
          ? `위치 확인됨 · ${floorName(r.f)}`
          : `위치가 조금 불확실해요 · ${floorName(r.f)}`,
      );
      updateProgress();
    } else {
      // 걸음으로 이어 가는 동안(최근 15초 안 확인)은 위치를 유지
      if (pose.ok && now - pose.lastFix > HOLD * 1000) pose.ok = false;
      if (!pose.ok || now - pose.lastFix > 3000) {
        lostSince = lostSince || now;
        setStatus(
          "searching",
          pose.ok ? "위치를 다시 맞추는 중" : "주변을 천천히 비춰 주세요",
        );
        if (!pose.ok) ui.coach.hidden = false;
        // 오래 못 찾으면 한 번만 음성으로 요령 안내(틀린 방향 안내는 하지 않음)
        if (!lostSaid && now - lostSince > 6000) {
          lostSaid = true;
          voice.say("휴대폰을 세워서 천천히 좌우로 비춰 주세요");
        }
      }
    }
  }
  // 복도를 곧게 걷는 동안: 걸음 방향(센서) ↔ 경로 방향(도면)으로 방향 기준을 맞춤.
  // 사진 비교보다 훨씬 정확해서(복도는 곧음) 무게를 크게 줍니다.
  function corridorAlign(yaw) {
    const now = performance.now();
    stepYaws.push({ yaw, t: now });
    while (stepYaws.length && now - stepYaws[0].t > 5000) stepYaws.shift();
    if (stepYaws.length < 6 || !pose.ok || shown.s == null || pdr.n % 2) return;
    const ys = stepYaws.slice(-6).map((o) => o.yaw);
    let cx = 0,
      cy = 0;
    for (const y of ys) {
      cx += Math.cos(y * D2R);
      cy += Math.sin(y * D2R);
    }
    const mean = Math.atan2(cy, cx) / D2R;
    if (ys.some((y) => Math.abs(angDiff(y, mean)) > 10)) return; // 곧게 걷는 중이 아님
    const a = pointAt(route, cum, Math.max(0, shown.s - 3)),
      m = pointAt(route, cum, shown.s + 1),
      b = pointAt(route, cum, shown.s + 5);
    if (a.f !== pose.f || b.f !== pose.f) return;
    const hd = (p, q) => Math.atan2(q.y - p.y, q.x - p.x) / D2R;
    if (Math.abs(angDiff(hd(a, m), hd(m, b))) > 8) return; // 경로가 곧지 않음
    const off = angDiff(hd(a, b), mean);
    // 사진 비교로 대략 정해진 뒤에만, 그와 45° 안일 때(반대로 걷는 중 등 제외)
    const ref = offTarget(performance.now());
    if (ref == null || Math.abs(angDiff(off, ref)) > 45) return;
    offF.add(off, 2.5);
  }
  // 걸음 뒤 입자 필터 추정: 같은 층이고 최근 확인된 상태면 위치만 이어 감
  function onMove(r) {
    if (closed || lift || !pose.ok || r.f !== pose.f) return;
    pose.x = r.x;
    pose.y = r.y;
    updateProgress();
  }

  // 엘리베이터: 문 앞에 오면 탑승 화면 → 도착 층에서 위치가 다시 잡히면 문이 열림
  function startLift(st) {
    liftStep = st;
    liftDone.add(st.s);
    voice.say(`엘리베이터를 타고 ${floorName(st.to)} 버튼을 누르세요`);
    buzz([30, 60, 30]);
    // 위치 후보를 도착 층 엘리베이터 문 앞으로 옮겨 둠 → 내려서 비추면 바로 확인
    const exit = route.pts.find(
      (p, i) =>
        p.kind === "elev" && p.f === st.to && route.pts[i - 1]?.kind === "elev",
    );
    if (exit)
      worker.postMessage({ type: "lift", f: st.to, x: exit.x, y: exit.y });
    lift = playLift({
      from: st.f,
      to: st.to,
      title: `${floorLabel(st.to)} 버튼을 누르세요`,
      hint: "내린 뒤 휴대폰을 세워 복도를 비추면 이어서 안내해요",
      hold: true,
      onSkip: () => finishLift(true),
    });
  }
  function finishLift(manual = false) {
    if (!lift) return;
    const st = liftStep;
    if (!manual) lift.arrive();
    lift = null;
    hintS = st.s;
    pose.f = st.to;
    shown.init = false;
    voice.say(`${floorName(st.to)}에 도착했어요`);
    rebuildPath = true;
  }
  function hudFor(nx, pr) {
    const st = nx.step,
      n = Math.round(nx.dist);
    if (st.kind === "arrive")
      return pr.remain < 3
        ? `${dest.title} 도착`
        : `${Math.round(pr.remain)}m 앞 ${dest.title}`;
    if (st.kind === "stair" || st.kind === "elev")
      return nx.dist < 3
        ? st.text
        : `${n}m 앞 ${st.kind === "elev" ? "엘리베이터" : "계단"}`;
    return nx.dist < 4 ? `지금 ${st.action}` : `${n}m 앞에서 ${st.action}`;
  }
  function updateProgress() {
    if (lift) return;
    const pr = progressOn(route, cum, pose, hintS);
    if (!pr) return;
    if (pr.off > 6) {
      // 확실히 벗어났을 때만 다시 찾기 (흔들림으로 재탐색하지 않게)
      if (pose.conf > 0.4 && ++offCount >= 4) {
        offCount = 0;
        const nr = indoor.routeTo({ f: pose.f, x: pose.x, y: pose.y }, dest, {
          mode,
        });
        if (nr) {
          route = nr;
          cum = routeMetrics(route);
          steps = buildSteps(route, dest, { landmarks: indoor.destinations });
          hintS = 0;
          lastStepIdx = -1;
          spoken.clear();
          rebuildPath = true;
          onRoute?.(route, steps);
          toast("경로를 다시 찾았어요");
          voice.say("경로를 다시 찾았어요");
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
    ui.step.textContent = hudFor(nx, pr);
    const after = steps[nx.index + 1];
    ui.sub.textContent =
      st.kind === "arrive"
        ? st.sub || ""
        : after
          ? `${st.text} · 다음: ${after.text}`
          : st.text;
    ui.remain.textContent = `남은 거리 ${Math.round(pr.remain)}m · 약 ${walkMinutes(pr.remain)}`;
    // 음성: 다가올 때 한 번, 바로 앞에서 한 번 (위치가 확실할 때만 — 틀린 안내는 하지 않음)
    const k1 = nx.index * 2,
      k2 = k1 + 1;
    const sure = pose.conf > 0.3;
    if (
      sure &&
      st.kind !== "arrive" &&
      nx.dist < 15 &&
      nx.dist >= 4 &&
      !spoken.has(k1)
    ) {
      spoken.add(k1);
      voice.say(`${Math.round(nx.dist)}미터 앞, ${st.text}`);
    } else if (sure && nx.dist < 4 && !spoken.has(k2) && st.kind !== "elev") {
      spoken.add(k2);
      voice.say(
        st.kind === "arrive" ? `${dest.title}, ${st.side || ""}` : st.text,
      );
    }
    if (
      st.kind === "elev" &&
      nx.dist < 3 &&
      pose.f === st.f &&
      !liftDone.has(st.s)
    )
      startLift(st);
    if (
      pr.remain < 2.5 &&
      pose.f === route.pts[route.pts.length - 1].f &&
      !arrived
    ) {
      arrived = true;
      buzz([60, 40, 60]);
      const side = steps[steps.length - 1].side;
      ui.arrive.querySelector("b").textContent =
        `${dest.title}에 도착했어요${side && side !== "정면" ? ` · 문은 ${side}` : ""}`;
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
  // 경로를 어디까지 그릴지: 다음 회전 지점에서 1.2m 꺾인 데까지(모퉁이 너머·벽 뒤는 안 그림),
  // 계단·엘리베이터·도착은 그 앞까지, 최대 15m
  function pathEnd(s) {
    const lim = s + 15;
    for (let i = 1; i < steps.length; i++) {
      const st = steps[i];
      if (st.s <= s + 0.8) continue;
      if (st.s > lim) break;
      if (st.kind === "walk" && st.dir !== "straight" && st.dir !== "start")
        return st.s + 1.2;
      if (st.kind !== "walk" && st.kind !== "start") return st.s;
    }
    return Math.min(lim, cum[cum.length - 1]);
  }
  // 발밑(0.8m 앞)부터: 너무 가까운 띠는 화면 아래에서 크게 흔들려 보여서 뺍니다.
  // 높이는 항상 지금 층 바닥(계단 오르막을 그리면 공중에 떠 보임)
  function buildPath(sAt) {
    if (pathMesh) {
      scene.remove(pathMesh);
      pathMesh.geometry.dispose();
    }
    pathMesh = null;
    if (!pose.ok) return;
    const sBase = sAt ?? pose.s ?? 0;
    const s0 = Math.max(0, sBase + 0.8),
      s1 = pathEnd(sBase);
    const floorZ = indoor.FL(pose.f).z;
    const pts = [];
    for (let s = s0; s <= s1 + 1e-6; s += 0.5) {
      const p = pointAt(route, cum, Math.min(s, s1));
      if (p.f !== pose.f || Math.abs(p.z - floorZ) > 0.3) break;
      pts.push({ ...p, z: floorZ });
    }
    if (pts.length < 2) return;
    const pos = [],
      uv = [],
      idx = [];
    const W = 0.6;
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

  // 회전 지점 화살표: 바닥에 눕혀 꺾인 뒤 방향을 가리킴
  const arrowMat = new THREE.MeshBasicMaterial({
    color: 0x7950ff,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const arrowEdge = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
  });
  const arrow3d = (() => {
    const k = 1.5;
    const s = new THREE.Shape();
    s.moveTo(0, 0.55 * k);
    s.lineTo(0.42 * k, 0.1 * k);
    s.lineTo(0.16 * k, 0.1 * k);
    s.lineTo(0.16 * k, -0.45 * k);
    s.lineTo(-0.16 * k, -0.45 * k);
    s.lineTo(-0.16 * k, 0.1 * k);
    s.lineTo(-0.42 * k, 0.1 * k);
    s.closePath();
    const g = new THREE.ShapeGeometry(s);
    g.rotateX(-Math.PI / 2); // 바닥에 눕힘: 모양의 위쪽(+y)이 북쪽(-z)
    const m = new THREE.Mesh(g, arrowMat);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(g), arrowEdge);
    const grp = new THREE.Group();
    grp.add(m, edge);
    grp.renderOrder = 2;
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

  // ---- 진단 표시(?debug=1)
  const dbg = DEBUG ? document.createElement("pre") : null;
  let dbgT = 0;
  if (dbg) {
    dbg.className = "ar-debug";
    root.append(dbg);
  }

  // ---- 루프
  let lastQ = 0,
    overlayA = 0,
    last = performance.now();
  video.onseeked = () => worker.postMessage({ type: "reset" });
  let lastVT = 0;
  function frame(now) {
    if (closed) return;
    requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;

    // 질의 보내기 (워커가 쉬고 있을 때, 초당 최대 5번)
    if (
      ready &&
      !busy &&
      !paused &&
      now - lastQ > 200 &&
      video.readyState >= 2
    ) {
      if (demo && video.currentTime < lastVT - 1)
        worker.postMessage({ type: "reset" }); // 영상 반복
      lastVT = video.currentTime;
      const c = capture();
      let R = null;
      if (demo) R = levelR(0, demoPitch);
      else if (ori) R = deviceR(ori);
      else R = levelR(0, -8 * D2R);
      // 화각 자동 보정(좌우로 돌릴 때마다 표본)
      if (c && R && !demo && ori && !urlFov) {
        fovCal =
          fovCal || new FovCalib(Math.max(c.raw.w, c.raw.h), savedFov || null);
        const fv = fovCal.add(
          columnProfile(c.raw.g, c.raw.w, c.raw.h),
          R,
          now / 1000,
        );
        if (fv && Math.abs(fv - fovLong) > 0.4) {
          fovLong = fv;
          resize();
          try {
            localStorage.setItem("sai-ar-fov", fv.toFixed(1));
          } catch {}
        }
      }
      if (c && R && !demo && ori) vanishing(c, R, now);
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
          const yaw = demo || !ori ? null : (headingOf(R) * 180) / Math.PI;
          // 지난 질의 뒤 흐른 시간: 걸음 감지가 있으면 '멈춰 있음', 없으면 '어디로든 움직였을 수 있음'
          const tdt = lastQ ? Math.min(2, (now - lastQ) / 1000) : 0;
          if (tdt)
            worker.postMessage({
              type: "tick",
              dt: tdt,
              yaw,
              hasSensor: yaw != null,
              pdr: pdr.on,
            });
          busy = true;
          lastQ = now;
          worker.postMessage(
            {
              type: "query",
              id: ++qid,
              q,
              yaw,
              // 경로상 지금 있어야 할 층(엘리베이터 안이면 도착 층)
              floorHint:
                liftStep && lift ? liftStep.to : pointAt(route, cum, hintS).f,
            },
            [q.buffer],
          );
        }
      }
      remoteFix(now);
    }

    // 방향 기준(건물 − 센서)은 천천히 따라가 경로가 좌우로 흔들리지 않게
    const oT = offTarget(now);
    if (oT != null) {
      if (headOff == null) headOff = oT;
      else {
        // 크게 틀어져 있으면 빨리, 거의 맞으면 천천히(떨림 방지)
        const d = angDiff(oT, headOff);
        headOff += d * Math.min(1, dt * (Math.abs(d) > 8 ? 2 : 0.7));
      }
    }

    // 보이는 위치: 경로 근처(3m)면 경로 위에 붙이고, 부드럽게 따라감
    if (pose.ok) {
      let tx = pose.x,
        ty = pose.y;
      const pr = progressOn(route, cum, pose, hintS);
      if (pr && pr.off < 3) {
        // 진행 위치는 뒤로 크게 튀지 않게(1m 넘게 뒤로 가려면 한 번 더 확인)
        let sNow = pr.s;
        if (shown.s != null && sNow < shown.s - 1 && !shown.back) {
          shown.back = true;
          sNow = shown.s;
        } else shown.back = false;
        const p = pointAt(route, cum, sNow);
        tx = p.x;
        ty = p.y;
        shown.s = sNow;
      } else shown.s = null;
      if (!shown.init)
        Object.assign(shown, { x: tx, y: ty, yaw: pose.yaw, init: true });
      const k = Math.min(1, dt * 2.5);
      shown.x += (tx - shown.x) * k;
      shown.y += (ty - shown.y) * k;
      if (demo) shown.yaw += angDiff(pose.yaw, shown.yaw) * Math.min(1, dt * 3);
    }

    // 카메라 자세: 자이로 회전은 그대로(화면과 어긋나지 않게), 방향 기준만 보정
    let heading = shown.yaw;
    let Rcb;
    if (!demo && ori) {
      const Rd = deviceR(ori);
      Rcb = mul(Rz((headOff ?? 0) * D2R), Rd);
      heading = (headingOf(Rcb) * 180) / Math.PI;
    } else Rcb = levelR(shown.yaw * D2R, demoPitch);
    const z = indoor.FL(pose.f).z + EYE;
    setCamera(Rcb, shown.x, shown.y, z);

    // 경로·화살표·핀
    const sShow = shown.s ?? pose.s;
    if (
      rebuildPath ||
      (pose.ok && Math.abs((sShow ?? 0) - (buildPath.s ?? -99)) > 1)
    ) {
      buildPath(sShow);
      buildPath.s = sShow ?? 0;
      rebuildPath = false;
    }
    tex.offset.y -= dt * 1.6;
    // 확인 뒤 15초까지는 걸음으로 이어 가며 그대로 보여 줌.
    // 신뢰도에 따라 깜빡이지 않게, 켜고 끌 때만 부드럽게 나타나고 사라짐
    const since = (now - pose.lastFix) / 1000;
    const showOverlay =
      pose.ok && !lift && since < HOLD && (demo || !ori || headOff != null);
    overlayA += ((showOverlay ? 1 : 0) - overlayA) * Math.min(1, dt * 4);
    const alpha =
      overlayA * (since > HOLD - 3 ? Math.max(0, (HOLD - since) / 3) : 1);
    pathMat.opacity = alpha * 0.9;
    arrowMat.opacity = arrowEdge.opacity = alpha;
    if (pathMesh) pathMesh.visible = alpha > 0.02;
    const end = route.pts[route.pts.length - 1];
    pin.visible =
      alpha > 0.02 &&
      end.f === pose.f &&
      Math.hypot(end.x - shown.x, end.y - shown.y) < 35;
    pin.position.copy(T(end.x, end.y, indoor.FL(end.f).z));
    pin.children[0].position.y = 1.9 + Math.sin(now / 300) * 0.05;
    arrow3d.visible = false;
    if (alpha > 0.02 && sShow != null) {
      const nx = nextStep(steps, route, cum, sShow);
      // 회전이 15m 안이면 회전 지점 바로 뒤 바닥에 꺾인 방향 화살표
      if (
        nx.dist < 15 &&
        nx.step.kind === "walk" &&
        nx.step.dir !== "straight"
      ) {
        const sT = sShow + nx.dist;
        const t = pointAt(route, cum, sT),
          a = pointAt(route, cum, sT + 0.9),
          b = pointAt(route, cum, sT + 3);
        if (
          a.f === pose.f &&
          t.f === pose.f &&
          Math.hypot(b.x - a.x, b.y - a.y) > 0.3
        ) {
          arrow3d.visible = true;
          const out = Math.atan2(b.y - a.y, b.x - a.x) / D2R;
          arrow3d.position.copy(T(a.x, a.y, indoor.FL(pose.f).z + 0.04));
          arrow3d.rotation.set(0, (out - 90) * D2R, 0);
        }
      }
      // HUD 화살표: 다가오는 동작(25m 안쪽) 아이콘, 그 전에는 직진
      ui.arrow.textContent = nx.dist < 25 ? ARROW[nx.step.dir] || "↑" : "↑";
      // 경로가 화면 밖이면 어느 쪽을 보라고 알려 줌
      const ahead = pointAt(route, cum, sShow + 4);
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
    if (dbg && now - dbgT > 300) {
      dbgT = now;
      dbg.textContent = [
        `센서 ${ori ? "켜짐" : "없음"} · 걸음 ${pdr.on ? pdr.n || 0 : "없음"} · 질의 ${Math.round(lastMs)}ms`,
        `화각 ${fovLong.toFixed(1)}° ${urlFov ? "(주소)" : fovCal ? `(보정 표본 ${fovCal.samples.length})` : ""}`,
        `방향기준 ${headOff == null ? "-" : headOff.toFixed(1)} / 소실점 ${vpF.value == null ? "-" : vpF.value.toFixed(1)} (${vpF.n}) / 사진·걸음 ${offF.value == null ? "-" : offF.value.toFixed(1)} (${offF.n})`,
        `위치 ${pose.ok ? "OK" : "--"} ${floorLabel(pose.f)} (${pose.x.toFixed(1)}, ${pose.y.toFixed(1)}) 신뢰 ${pose.conf.toFixed(2)}`,
      ].join("\n");
    }
    drawMini(heading);
    renderer.render(scene, cam);
  }
  requestAnimationFrame(frame);

  // ---- 층 직접 고르기: 상태 표시를 누르면 층 버튼
  const floorBox = $("#ar-floors");
  floorBox.replaceChildren();
  for (const n of indoor.floors) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = floorLabel(n);
    b.onclick = () => {
      floorBox.hidden = true;
      worker.postMessage({ type: "floor", f: n });
      pose.ok = false;
      pose.f = n;
      shown.init = false;
      setStatus("searching", `${floorName(n)}에서 위치를 찾는 중`);
      toast(`${floorName(n)}로 맞췄어요`);
    };
    floorBox.append(b);
  }
  ui.status.onclick = () => {
    for (const b of floorBox.children)
      b.classList.toggle("on", b.textContent === floorLabel(pose.f));
    floorBox.hidden = !floorBox.hidden;
  };

  // ---- 위치 계산 서버(선택): ?loc=<주소>. 1.5초마다 화면 한 장을 보내 결과를 입자 필터에 반영.
  // 사진은 서버가 위치 계산에만 쓰고 저장하지 않아야 합니다(docs/decisions.md).
  const LOC_URL = demo ? null : new URLSearchParams(location.search).get("loc");
  const shot = LOC_URL ? document.createElement("canvas") : null;
  let locBusy = false,
    locLast = 0;
  function remoteFix(now) {
    if (!LOC_URL || locBusy || now - locLast < 1500 || !ori) return;
    const vw = video.videoWidth,
      vh = video.videoHeight;
    if (!vw) return;
    locBusy = true;
    locLast = now;
    const sc = 640 / Math.max(vw, vh);
    shot.width = Math.round(vw * sc);
    shot.height = Math.round(vh * sc);
    shot.getContext("2d").drawImage(video, 0, 0, shot.width, shot.height);
    const R = deviceR(ori);
    const yaw = (headingOf(R) * 180) / Math.PI;
    const meta = {
      R, // 카메라→(센서 기준)세계 회전, 중력 방향 포함
      fovLong,
      prior: pose.ok
        ? { f: pose.f, x: pose.x, y: pose.y, yaw: pose.yaw }
        : { f: pointAt(route, cum, hintS).f },
    };
    shot.toBlob(
      async (blob) => {
        try {
          const fd = new FormData();
          fd.append("image", blob, "q.jpg");
          fd.append("meta", JSON.stringify(meta));
          const res = await fetch(LOC_URL, { method: "POST", body: fd });
          const r = await res.json();
          if (!closed && r && r.ok)
            worker.postMessage({ type: "fix", fix: r, yaw });
        } catch {}
        locBusy = false;
      },
      "image/jpeg",
      0.7,
    );
  }

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
    lift?.close();
    wake?.release?.().catch(() => {});
    document.removeEventListener("visibilitychange", onVis);
    if (voice.supported) speechSynthesis.cancel();
    removeEventListener("deviceorientation", onOri);
    removeEventListener("devicemotion", onMotion);
    removeEventListener("resize", resize);
    stream?.getTracks().forEach((t) => t.stop());
    video.pause();
    video.removeAttribute("src");
    video.srcObject = null;
    video.load();
    renderer.dispose();
    dbg?.remove();
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
    steps =
      opts.steps || buildSteps(route, dest, { landmarks: indoor.destinations });
    hintS = 0;
    lastStepIdx = -1;
    rebuildPath = true;
    pose.ok = false;
    shown.init = false;
    spoken.clear();
    liftDone.clear();
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
