// WebXR(ARCore VIO) 좌표 계산. 브라우저 없이 시험할 수 있게 순수 함수로 둡니다.
//
// 좌표계
//  · XR 세계: 오른손, y 위, 단위 m (local-floor: 시작한 층 바닥이 y=0). 카메라는 -z를 봄.
//  · 센서 세계: XR 세계를 (x, -z, y)로 바꾼 것 — 기존 코드의 '동·북·위' 자리(z 위)에 맞춤.
//    입자 필터의 '센서 방위'는 이 세계에서의 방위, '방향 기준(off)'은 건물 방위 − 센서 방위.
//  · 건물: x 동, y 북, z 위 (도면 좌표)
//  · OpenCV 카메라 축: x 오른쪽, y 아래, z 앞

const D2R = Math.PI / 180;
export const angDiff = (a, b) => ((((a - b) % 360) + 540) % 360) - 180;

/** XR 카메라 자세(열 우선 4×4, view.transform.matrix) → {R: 카메라→센서세계(OpenCV 축, 행 우선 3×3), x, y(평면), h(높이)} */
export function poseFromXR(m) {
  // XR 축 → 센서 세계 (x, -z, y)
  const W = (v) => [v[0], -v[2], v[1]];
  const ax = W([m[0], m[1], m[2]]),
    ay = W([m[4], m[5], m[6]]),
    az = W([m[8], m[9], m[10]]);
  // OpenCV: x=+x, y=-y, z=-z
  const c0 = ax,
    c1 = [-ay[0], -ay[1], -ay[2]],
    c2 = [-az[0], -az[1], -az[2]];
  const R = [c0[0], c1[0], c2[0], c0[1], c1[1], c2[1], c0[2], c1[2], c2[2]];
  return { R, x: m[12], y: -m[14], h: m[13] };
}

/** XR 투영 행렬(열 우선 4×4) → w×h 영상의 내부값 {fx, fy, cx, cy} (영상은 위가 0행) */
export function intrinsicsFromProjection(P, w, h) {
  return {
    fx: (P[0] * w) / 2,
    fy: (P[5] * h) / 2,
    cx: (w / 2) * (1 - P[8]),
    cy: (h / 2) * (1 + P[9]),
  };
}

/** 카메라 앞 방향의 수평 방위(도, 동쪽 0·반시계): R의 2열 */
export function yawOf(R) {
  return Math.atan2(R[5], R[2]) / D2R;
}

/**
 * 건물 ↔ 센서 세계 정렬: 건물 = 회전(off) · 센서 + t (평면), 높이는 층별로 따로.
 * 입자 필터 추정(건물 위치·off)과 그 순간의 센서 위치로 정렬을 구하고, 부드럽게 따라갑니다.
 * 크게 다른 정렬은 연속 두 번 나와야 받아들입니다(잘못 잡힌 위치에 끌려가지 않게).
 */
export class Anchor {
  constructor() {
    this.off = null;
    this.tx = 0;
    this.ty = 0;
    this.pending = null;
    this.n = 0;
  }
  get ok() {
    return this.off != null;
  }
  static solve(b, s, off) {
    const c = Math.cos(off * D2R),
      sn = Math.sin(off * D2R);
    return {
      off,
      tx: b.x - (c * s.x - sn * s.y),
      ty: b.y - (sn * s.x + c * s.y),
    };
  }
  /** b: 건물 위치 {x,y}, s: 같은 순간 센서 위치 {x,y}, off: 도, w: 0~1 믿음 */
  update(b, s, off, w = 0.5) {
    const a = Anchor.solve(b, s, off);
    if (!this.ok) {
      Object.assign(this, a, { pending: null, n: 1 });
      return "set";
    }
    // 이 정렬로 지금 센서 위치를 옮겼을 때의 차이
    const p0 = this.toBuilding(s.x, s.y);
    const dPos = Math.hypot(p0.x - b.x, p0.y - b.y);
    const dOff = angDiff(off, this.off);
    if (dPos > 3 || Math.abs(dOff) > 15) {
      const pj = this.pending;
      this.pending = a;
      if (
        pj &&
        Math.abs(angDiff(pj.off, a.off)) < 8 &&
        Math.hypot(pj.tx - a.tx, pj.ty - a.ty) < 2
      ) {
        Object.assign(this, a, { pending: null });
        this.n++;
        return "snap";
      }
      return "hold";
    }
    this.pending = null;
    // 회전은 지금 센서 위치를 중심으로 돌려 화면이 덜 흔들리게
    const k = Math.min(0.5, 0.25 * w + 0.05);
    const newOff = this.off + dOff * k;
    const cur = { x: p0.x + (b.x - p0.x) * k, y: p0.y + (b.y - p0.y) * k };
    Object.assign(this, Anchor.solve(cur, s, newOff));
    this.n++;
    return "blend";
  }
  toBuilding(x, y) {
    const c = Math.cos(this.off * D2R),
      s = Math.sin(this.off * D2R);
    return { x: c * x - s * y + this.tx, y: s * x + c * y + this.ty };
  }
  toSensor(x, y) {
    const c = Math.cos(this.off * D2R),
      s = Math.sin(this.off * D2R);
    const dx = x - this.tx,
      dy = y - this.ty;
    return { x: c * dx + s * dy, y: -s * dx + c * dy };
  }
}

/**
 * 층 높이 추적: 계단을 오르내리면 VIO 높이가 층 높이(FH)만큼 바뀝니다.
 * 같은 층에 있는 동안의 카메라 높이를 기준으로, 기준보다 FH의 75% 넘게 바뀌면 한 층 이동.
 */
export class LevelTracker {
  constructor(FH = 4) {
    this.FH = FH;
    this.ref = null; // 지금 층에서의 카메라 높이(XR y)
    this.floorY = 0; // 지금 층 바닥의 XR y
    this.idx = 0; // 시작 층 기준 몇 층 올라왔는지(엘리베이터는 shift로 더함)
  }
  shift(d) {
    this.idx += d;
  }
  reset(h, floorY = null) {
    this.ref = h;
    if (floorY != null) this.floorY = floorY;
  }
  /** 카메라 높이 h → 층 변화(-1, 0, +1) */
  update(h) {
    if (this.ref == null) {
      this.ref = h;
      return 0;
    }
    const d = h - this.ref;
    if (d > this.FH * 0.75) {
      this.ref += this.FH;
      this.floorY += this.FH;
      this.idx++;
      return 1;
    }
    if (d < -this.FH * 0.75) {
      this.ref -= this.FH;
      this.floorY -= this.FH;
      this.idx--;
      return -1;
    }
    // 같은 층에 있는 동안 기준을 천천히 맞춤(손 높이 변화)
    if (Math.abs(d) < 0.4) this.ref += d * 0.02;
    return 0;
  }
}

/**
 * 경로 묶음(three, 건물 좌표를 (x, z, -y)로 둔 것)을 VIO 좌표로 옮기는 변환.
 * 평면: VIO = 회전(-off) · (건물 - t), 높이: + yOff (지금 층 바닥이 VIO 바닥 높이에 오게)
 * 반환 {rotY, px, py, pz} → group.rotation.y / group.position
 */
export function worldTransform(anchor, yOff) {
  const a = -anchor.off * D2R;
  const vx = -anchor.tx,
    vz = anchor.ty;
  return {
    rotY: a,
    px: Math.cos(a) * vx + Math.sin(a) * vz,
    py: yOff,
    pz: -Math.sin(a) * vx + Math.cos(a) * vz,
  };
}

/**
 * VIO 궤적 + 사진 비교 후보로 '건물 ↔ VIO' 정렬 구하기 (RANSAC).
 *  · 후보 하나 = 정렬 가설 하나: 그 사진 자리(건물 위치·방향)에 그 순간 VIO 자세가 있었다고 보면
 *    off = 사진 방향 − VIO 방향, t = 사진 위치 − 회전(off)·VIO 위치, 층 차이 = 사진 층 − VIO 층 번호
 *  · 다른 순간의 후보들이 이 정렬로 옮긴 VIO 궤적 위(1.5m·20° 안, 같은 층 차이)에 얼마나 놓이는지 셈
 *  · 가장 많이 맞는 가설을 맞는 후보들로 다시 계산. VIO는 정확하므로 틀린 사진 후보는 궤적과 안 맞아 걸러짐
 */
export class VisualAligner {
  constructor({
    window = 30,
    posTol = 1.5,
    yawTol = 20,
    minInliers = 6,
    minSpan = 2.5,
    margin = 0.6, // 다른 정렬(10°·3m 넘게 다른) 점수가 1등의 이 비율을 넘으면 판단 보류
  } = {}) {
    Object.assign(this, {
      window,
      posTol,
      yawTol,
      minInliers,
      minSpan,
      margin,
    });
    this.obs = []; // {t, sx, sy, syaw, lvl, f, x, y, yaw, w}
    this.best = null;
  }
  /** t: 초, s: VIO 위치·방향 {x, y, yaw}, lvl: VIO 층 번호, cands: [{f, x, y, yaw, ncc}] */
  add(t, s, lvl, cands) {
    cands.forEach((c, i) =>
      this.obs.push({
        t,
        sx: s.x,
        sy: s.y,
        syaw: s.yaw,
        lvl,
        f: c.f,
        x: c.x,
        y: c.y,
        yaw: c.yaw,
        // 1위 후보와 잘 맞는 후보일수록 믿음
        w: Math.max(0.05, c.ncc - 0.3) * (i === 0 ? 1 : 0.6),
      }),
    );
    while (this.obs.length && t - this.obs[0].t > this.window) this.obs.shift();
  }
  clear() {
    this.obs = [];
    this.best = null;
  }
  /** 정렬 계산 → {off, tx, ty, df, n, score, span} 또는 null */
  solve() {
    const O = this.obs;
    const hyps = [];
    for (const h of O) {
      const off = angDiff(h.yaw, h.syaw);
      const a = Anchor.solve({ x: h.x, y: h.y }, { x: h.sx, y: h.sy }, off);
      hyps.push({ ...a, df: h.f - h.lvl, ...this._score(a, h.f - h.lvl) });
    }
    hyps.sort((p, q) => q.score - p.score);
    const best = hyps[0];
    if (!best || best.n < this.minInliers || best.span < this.minSpan)
      return (this.best = null);
    // 확실히 앞서야 함: 크게 다른 2등 정렬과 점수 차이(비슷한 복도에 잘못 맞는 것 방지)
    const far = (h) => {
      if (h.df !== best.df || Math.abs(angDiff(h.off, best.off)) > 10)
        return true;
      // 같은 VIO 위치(최근)를 두 정렬로 옮겼을 때 3m 넘게 다르면 다른 정렬
      const o = O[O.length - 1];
      const p = (a) => {
        const c = Math.cos(a.off * D2R),
          s = Math.sin(a.off * D2R);
        return [c * o.sx - s * o.sy + a.tx, s * o.sx + c * o.sy + a.ty];
      };
      const [x1, y1] = p(best),
        [x2, y2] = p(h);
      return Math.hypot(x1 - x2, y1 - y2) > 3;
    };
    const second = hyps.find((h) => far(h));
    if (second && second.score > best.score * this.margin)
      return (this.best = null);
    // 맞는 후보들로 다시: 방향은 가중 원평균, 위치는 가중 평균, 두 번 반복
    let cur = best;
    for (let it = 0; it < 2; it++) {
      let cs = 0,
        sn = 0,
        W = 0;
      for (const o of cur.inl) {
        const d = angDiff(o.yaw, o.syaw) * D2R;
        cs += o.w * Math.cos(d);
        sn += o.w * Math.sin(d);
      }
      const off = Math.atan2(sn, cs) / D2R;
      let tx = 0,
        ty = 0;
      const c = Math.cos(off * D2R),
        s = Math.sin(off * D2R);
      for (const o of cur.inl) {
        tx += o.w * (o.x - (c * o.sx - s * o.sy));
        ty += o.w * (o.y - (s * o.sx + c * o.sy));
        W += o.w;
      }
      const a = { off, tx: tx / W, ty: ty / W };
      const r = this._score(a, cur.df);
      if (r.n < this.minInliers) break;
      cur = { ...a, df: cur.df, ...r };
    }
    return (this.best = cur);
  }
  _score(a, df) {
    const c = Math.cos(a.off * D2R),
      s = Math.sin(a.off * D2R);
    let score = 0,
      n = 0;
    const inl = [];
    let x0 = Infinity,
      x1 = -Infinity,
      y0 = Infinity,
      y1 = -Infinity;
    const seenT = new Set();
    for (const o of this.obs) {
      if (o.f - o.lvl !== df) continue;
      const bx = c * o.sx - s * o.sy + a.tx,
        by = s * o.sx + c * o.sy + a.ty;
      const e = Math.hypot(bx - o.x, by - o.y);
      if (e > this.posTol) continue;
      if (Math.abs(angDiff(o.yaw, o.syaw + a.off)) > this.yawTol) continue;
      inl.push(o);
      score += o.w * (1 - e / (2 * this.posTol));
      // 같은 순간의 후보는 한 번만 셈
      if (!seenT.has(o.t)) {
        seenT.add(o.t);
        n++;
      }
      x0 = Math.min(x0, o.sx);
      x1 = Math.max(x1, o.sx);
      y0 = Math.min(y0, o.sy);
      y1 = Math.max(y1, o.sy);
    }
    return { score, n, inl, span: n ? Math.hypot(x1 - x0, y1 - y0) : 0 };
  }
}
