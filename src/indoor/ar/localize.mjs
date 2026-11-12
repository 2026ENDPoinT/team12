// 카메라 화면 → 미래관 안 위치·방향 추정 (사진 기반 재위치).
//
// 기준 데이터(ar-index.bin)는 촬영 사진마다 만든 '수평 기준 원통 띠'입니다.
//   가로 46칸: 사진 방향 기준 방위 -45°..+45° (2°/칸, 오른쪽이 +)
//   세로 20칸: 고도 +11°..-27° (2°/칸), 값 0..254, 255 = 사진 밖
// 카메라 화면도 중력 방향(기기 센서 또는 추정값)으로 수평을 맞춰 18칸×20칸으로 펴고,
// 띠 위를 좌우로 밀며 정규화 상관(NCC)이 가장 높은 사진·위치를 찾습니다.
// 만드는 쪽: scripts/build-ar-index.py (같은 각도 규칙을 씁니다)

export const AZ_N = 46,
  EL_N = 20,
  STEP = 2,
  EL_TOP = 12,
  Q_N = 18,
  OFFSETS = AZ_N - Q_N + 1; // 29
const D2R = Math.PI / 180;

// 질의 창 각 칸의 (방위, 고도) — 방위는 카메라 정면 기준, 오른쪽이 +
export function queryRays() {
  const rays = [];
  for (let r = 0; r < EL_N; r++)
    for (let c = 0; c < Q_N; c++)
      rays.push([
        (-Q_N + STEP / 2 + c * STEP) * D2R,
        (EL_TOP - STEP / 2 - r * STEP) * D2R,
      ]);
  return rays;
}
const RAYS = queryRays();

// 카메라 → 세계 회전 R(3×3 행 우선, OpenCV 카메라 축: x 오른쪽, y 아래, z 앞)에서 정면 방위(라디안, 반시계 +)
export function headingOf(R) {
  return Math.atan2(R[5], R[2]);
}
export function pitchOf(R) {
  return Math.asin(Math.max(-1, Math.min(1, R[8])));
}

/** 수평 맞춘 질의 벡터를 만듭니다.
 * img: {data: Float32Array|Uint8Array (흑백), w, h}, 흐림 처리가 이미 된 영상
 * K: {fx, fy, cx, cy} (img 픽셀 기준), R: 카메라→세계 회전 (z 위)
 * 반환: Float32Array(EL_N*Q_N), 사진 밖은 NaN */
export function sampleQuery(img, K, R) {
  const h = headingOf(R);
  const out = new Float32Array(EL_N * Q_N);
  const { data, w, h: H } = img;
  for (let k = 0; k < RAYS.length; k++) {
    const [az, el] = RAYS[k];
    const hd = h - az,
      ce = Math.cos(el);
    const dx = ce * Math.cos(hd),
      dy = ce * Math.sin(hd),
      dz = Math.sin(el);
    // cam = R^T d
    const cx = R[0] * dx + R[3] * dy + R[6] * dz,
      cy = R[1] * dx + R[4] * dy + R[7] * dz,
      cz = R[2] * dx + R[5] * dy + R[8] * dz;
    if (cz <= 0.05) {
      out[k] = NaN;
      continue;
    }
    const u = (K.fx * cx) / cz + K.cx,
      v = (K.fy * cy) / cz + K.cy;
    if (u < 1 || v < 1 || u > w - 2 || v > H - 2) {
      out[k] = NaN;
      continue;
    }
    const x0 = Math.floor(u),
      y0 = Math.floor(v),
      fx = u - x0,
      fy = v - y0,
      i = y0 * w + x0;
    out[k] =
      data[i] * (1 - fx) * (1 - fy) +
      data[i + 1] * fx * (1 - fy) +
      data[i + w] * (1 - fx) * fy +
      data[i + w + 1] * fx * fy;
  }
  return out;
}

// 분리형 가우시안 흐림 (기준 띠와 같은 정도로 흐리게: sigma = fx·tan(2°)·0.45)
export function blurGray(src, w, h, sigma) {
  const r = Math.max(1, Math.ceil(sigma * 2.5));
  const ker = [];
  let sum = 0;
  for (let i = -r; i <= r; i++) {
    const v = Math.exp(-(i * i) / (2 * sigma * sigma));
    ker.push(v);
    sum += v;
  }
  for (let i = 0; i < ker.length; i++) ker[i] /= sum;
  const tmp = new Float32Array(w * h),
    out = new Float32Array(w * h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let a = 0;
      for (let i = -r; i <= r; i++)
        a += src[y * w + Math.min(w - 1, Math.max(0, x + i))] * ker[i + r];
      tmp[y * w + x] = a;
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let a = 0;
      for (let i = -r; i <= r; i++)
        a += tmp[Math.min(h - 1, Math.max(0, y + i)) * w + x] * ker[i + r];
      out[y * w + x] = a;
    }
  return out;
}
export const blurSigma = (fx) => fx * Math.tan(STEP * D2R) * 0.45;

/** 기준 사진 하나와 질의를 모든 가로 위치에서 비교해 가장 좋은 NCC와 위치를 돌려줍니다.
 * index: Uint8Array (N×EL_N×AZ_N), k: 사진 번호, q: 질의, oLo/oHi: 비교할 가로 위치 범위 */
export function matchOne(index, k, q, oLo = 0, oHi = OFFSETS - 1) {
  const base = k * EL_N * AZ_N;
  let best = -2,
    bo = -1;
  const scores = new Float32Array(OFFSETS).fill(-2);
  for (let o = oLo; o <= oHi; o++) {
    let n = 0,
      sx = 0,
      sy = 0,
      sxx = 0,
      syy = 0,
      sxy = 0;
    for (let r = 0; r < EL_N; r++) {
      const qr = r * Q_N,
        ir = base + r * AZ_N + o;
      for (let c = 0; c < Q_N; c++) {
        const x = q[qr + c];
        const y = index[ir + c];
        if (y === 255 || x !== x) continue;
        n++;
        sx += x;
        sy += y;
        sxx += x * x;
        syy += y * y;
        sxy += x * y;
      }
    }
    if (n < EL_N * Q_N * 0.55) continue;
    const vx = sxx - (sx * sx) / n,
      vy = syy - (sy * sy) / n;
    if (vx < 1e-3 || vy < 1e-3) continue;
    const ncc = (sxy - (sx * sy) / n) / Math.sqrt(vx * vy);
    scores[o] = ncc;
    if (ncc > best) {
      best = ncc;
      bo = o;
    }
  }
  // 좌우 이웃 점수로 소수점 위치 보정
  let sub = bo;
  if (
    bo > 0 &&
    bo < OFFSETS - 1 &&
    scores[bo - 1] > -2 &&
    scores[bo + 1] > -2
  ) {
    const a = scores[bo - 1],
      b = scores[bo],
      c = scores[bo + 1],
      den = a - 2 * b + c;
    if (den < 0)
      sub = bo + Math.max(-0.5, Math.min(0.5, (0.5 * (a - c)) / den));
  }
  return { ncc: best, o: sub };
}

// 가로 위치 o → 카메라 정면의 건물 기준 방위(도)
export const offsetToYaw = (shotYaw, o) => shotYaw - (o * STEP - (AZ_N - Q_N));
// 예상 방위(도) → 가로 위치
export const yawToOffset = (shotYaw, yaw) => {
  let d = shotYaw - yaw;
  d = (((d % 360) + 540) % 360) - 180;
  return (d + (AZ_N - Q_N)) / STEP;
};

/** 후보 사진 전체를 비교합니다.
 * shots: [{x,y,f,yaw}], cand: 비교할 사진 번호 목록(없으면 전체), yawPrior: 예상 방위(도)와 허용 폭 */
export function matchAll(index, shots, q, opts = {}) {
  const res = [];
  const list = opts.cand || shots.map((_, i) => i);
  for (const k of list) {
    let lo = 0,
      hi = OFFSETS - 1;
    if (opts.yawPrior != null) {
      const c = yawToOffset(shots[k].yaw, opts.yawPrior),
        w = (opts.yawTol || 20) / STEP;
      lo = Math.max(0, Math.floor(c - w));
      hi = Math.min(OFFSETS - 1, Math.ceil(c + w));
      if (lo > hi) continue;
    }
    const m = matchOne(index, k, q, lo, hi);
    if (m.o >= 0)
      res.push({ k, ncc: m.ncc, yaw: offsetToYaw(shots[k].yaw, m.o) });
  }
  res.sort((a, b) => b.ncc - a.ncc);
  return res;
}

const angDiff = (a, b) => ((((a - b) % 360) + 540) % 360) - 180;

/** 시간에 따라 위치를 이어 붙이는 추적기.
 * 매 프레임 후보들을 앞선 추정 위치·방향과의 일관성으로 다시 점수 매겨 흔들림과 오인식을 줄입니다.
 * 층은 계단·엘리베이터 근처에서만 바뀔 수 있습니다(층마다 비슷한 복도가 겹쳐 있어서).
 * portals: [{fa, pa:[x,y], fb, pb:[x,y]}] 층 사이 연결 지점 */
export class Tracker {
  constructor(index, shots, portals = []) {
    this.index = index;
    this.shots = shots;
    this.portals = portals;
    this.state = null; // {x,y,f,yaw,conf,t,k}
    this.lost = 0;
    this.byFloor = new Map();
    shots.forEach((s, i) =>
      (this.byFloor.get(s.f) || this.byFloor.set(s.f, []).get(s.f)).push(i),
    );
  }
  reset() {
    this.state = null;
    this.lost = 0;
    this.contra = 0;
  }
  // 현재 위치에서 갈 수 있는 다른 층 지점들
  _reach(S, R) {
    const out = [];
    for (const p of this.portals) {
      if (p.fa === S.f && Math.hypot(p.pa[0] - S.x, p.pa[1] - S.y) < R)
        out.push({ f: p.fb, x: p.pb[0], y: p.pb[1] });
      if (p.fb === S.f && Math.hypot(p.pb[0] - S.x, p.pb[1] - S.y) < R)
        out.push({ f: p.fa, x: p.pa[0], y: p.pa[1] });
    }
    return out;
  }
  /** q: 질의, t: 시각(초), yawHint: 센서로 예측한 방위(도), floorHint: 처음 찾을 때 우선할 층 */
  update(q, t, yawHint = null, floorHint = null) {
    const S = this.state && t - this.state.t < 5 ? this.state : null;
    const shots = this.shots;
    let cand = null;
    if (S) {
      const R = 6 + 2.5 * (t - S.t);
      const other = this._reach(S, R + 4);
      cand = [];
      for (let i = 0; i < shots.length; i++) {
        const s = shots[i];
        if (
          s.f === S.f
            ? Math.hypot(s.x - S.x, s.y - S.y) < R
            : other.some(
                (o) => o.f === s.f && Math.hypot(s.x - o.x, s.y - o.y) < 8,
              )
        )
          cand.push(i);
      }
      if (cand.length < 6) cand = this.byFloor.get(S.f) || null;
    } else if (floorHint != null && this.byFloor.has(floorHint))
      cand = this.byFloor.get(floorHint);
    const opts =
      yawHint != null ? { yawPrior: yawHint, yawTol: S ? 25 : 45 } : {};
    let res = matchAll(this.index, shots, q, { ...opts, cand });
    // 잘못된 위치에 갇히지 않도록 추적 중에도 전역 검색과 비교합니다.
    if (S) {
      const g = matchAll(this.index, shots, q, opts);
      const lt = res[0];
      if (g.length && g[0].ncc > 0.6 && (!lt || g[0].ncc > lt.ncc + 0.08)) {
        this.contra = (this.contra || 0) + 1;
        if (this.contra >= 2) {
          this.contra = 0;
          this.state = null;
          return this.update(q, t, yawHint, null);
        }
      } else this.contra = 0;
    }
    if (!res.length) return this._miss(t);

    // 앞선 위치와 가까울수록 가산점
    const scored = res.slice(0, 40).map((r) => {
      const s = shots[r.k];
      let sc = r.ncc;
      if (S) {
        const d = s.f === S.f ? Math.hypot(s.x - S.x, s.y - S.y) : 4;
        sc -= 0.012 * Math.max(0, d - 2.5 * (t - S.t) - 1.5);
        sc -= 0.0015 * Math.abs(angDiff(r.yaw, S.yaw));
      }
      return { ...r, sc };
    });
    scored.sort((a, b) => b.sc - a.sc);
    const top = scored[0],
      ts = shots[top.k];
    // 1위와 비슷한 점수의 가까운 사진들로 위치 평균
    let wx = 0,
      wy = 0,
      ws = 0;
    for (const r of scored.slice(0, 8)) {
      const s = shots[r.k];
      if (
        s.f !== ts.f ||
        Math.hypot(s.x - ts.x, s.y - ts.y) > 3 ||
        r.sc < top.sc - 0.06
      )
        continue;
      const w = Math.exp((r.sc - top.sc) / 0.02);
      wx += s.x * w;
      wy += s.y * w;
      ws += w;
    }
    const x = wx / ws,
      y = wy / ws;
    // 모호성: 멀리 떨어진 다른 후보가 비슷한 점수면 신뢰도 낮춤
    const rival = scored.find((r) => {
      const s = shots[r.k];
      return s.f !== ts.f || Math.hypot(s.x - ts.x, s.y - ts.y) > 6;
    });
    const margin = rival ? top.sc - rival.sc : 0.2;
    const conf =
      Math.max(0, Math.min(1, (top.ncc - 0.4) / 0.35)) *
      Math.max(0.2, Math.min(1, margin / 0.06));

    if (top.ncc < 0.4) return this._miss(t);
    if (!S) {
      if (conf < 0.3)
        return this._miss(t, {
          x,
          y,
          f: ts.f,
          yaw: top.yaw,
          conf,
          ncc: top.ncc,
        });
      this.state = {
        x,
        y,
        f: ts.f,
        yaw: top.yaw,
        conf,
        t,
        ncc: top.ncc,
        k: top.k,
      };
    } else {
      // 신뢰도에 따라 부드럽게 갱신
      const a = Math.min(0.85, 0.25 + conf * 0.6);
      const jump = Math.hypot(x - S.x, y - S.y) > 8 || ts.f !== S.f;
      if (jump && conf < 0.5) return this._miss(t);
      S.x = jump ? x : S.x + (x - S.x) * a;
      S.y = jump ? y : S.y + (y - S.y) * a;
      S.f = ts.f;
      S.yaw = S.yaw + angDiff(top.yaw, S.yaw) * Math.min(0.9, a + 0.1);
      S.conf = S.conf * 0.5 + conf * 0.5;
      S.t = t;
      S.ncc = top.ncc;
      S.k = top.k;
    }
    this.lost = 0;
    return { ok: true, ...this.state, cand: cand ? cand.length : shots.length };
  }
  _miss(t, guess = null) {
    this.lost++;
    if (this.state && (this.lost > 10 || t - this.state.t > 6))
      this.state = null;
    return { ok: false, guess, state: this.state };
  }
}
