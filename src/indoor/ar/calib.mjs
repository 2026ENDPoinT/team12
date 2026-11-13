// AR 보정 도구
//  · 화각 자동 보정: 휴대폰을 좌우로 돌릴 때 자이로가 잰 회전각과 화면이 실제로 밀린 픽셀 수로 초점거리를 구합니다.
//  · 방향 기준 필터: '건물 방위 − 센서 방위' 측정값을 모아, 튀는 값은 버리고 가중 중앙값으로 천천히 정합니다.

const D2R = Math.PI / 180;
export const angDiff = (a, b) => ((((a - b) % 360) + 540) % 360) - 180;

/** 흑백 영상(w×h) → 세로 가운데 띠의 열별 가로 기울기 세기(정규화). 좌우 이동을 비교할 때 씁니다. */
export function columnProfile(g, w, h) {
  const y0 = Math.floor(h * 0.2),
    y1 = Math.ceil(h * 0.8);
  const P = new Float32Array(w);
  for (let x = 1; x < w - 1; x++) {
    let s = 0;
    for (let y = y0; y < y1; y++) {
      const i = y * w + x;
      s += Math.abs(g[i + 1] - g[i - 1]);
    }
    P[x] = s / (y1 - y0);
  }
  P[0] = P[1];
  P[w - 1] = P[w - 2];
  let m = 0;
  for (const v of P) m += v;
  m /= w;
  let v2 = 0;
  for (let i = 0; i < w; i++) {
    P[i] -= m;
    v2 += P[i] * P[i];
  }
  const sd = Math.sqrt(v2 / w) || 1;
  for (let i = 0; i < w; i++) P[i] /= sd;
  return P;
}

/** 두 카메라 회전(카메라→세계, OpenCV 축, 행 우선 3×3)의 사이: 새 광축이 이전 카메라에서
 * 가로로 몇 도(오른쪽 +), 세로로 몇 도 돌았는지, 광축 둘레로 몇 도 돌았는지 */
export function relTurn(Rprev, Rnow) {
  // Rrel = Rprev^T · Rnow 의 열 2(새 z축), 열 0(새 x축)
  const col = (R, j) => [R[j], R[3 + j], R[6 + j]];
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const px = col(Rprev, 0),
    py = col(Rprev, 1),
    pz = col(Rprev, 2);
  const nz = col(Rnow, 2),
    nx = col(Rnow, 0);
  const zx = dot(nz, px),
    zy = dot(nz, py),
    zz = dot(nz, pz);
  const xy = dot(nx, py);
  return {
    yaw: Math.atan2(zx, zz) / D2R,
    pitch: Math.atan2(zy, zz) / D2R,
    roll: Math.asin(Math.max(-1, Math.min(1, xy))) / D2R,
  };
}

/** 화각 자동 보정기. add(프로필, 회전, 시각) → 표본이 충분하면 긴 변 화각(도) */
export class FovCalib {
  constructor(longSide, saved = null) {
    this.long = longSide;
    this.prev = null;
    this.samples = [];
    this.fov = saved;
  }
  add(P, R, t) {
    const prev = this.prev;
    this.prev = { P, R, t };
    if (!prev || t - prev.t > 0.35 || P.length !== prev.P.length) return null;
    const turn = relTurn(prev.R, R);
    // 가로로만 3~14° 돈 경우(세로·광축 회전은 작게)
    if (Math.abs(turn.yaw) < 3 || Math.abs(turn.yaw) > 14) return null;
    if (Math.abs(turn.pitch) > 1.5 || Math.abs(turn.roll) > 1.5) return null;
    // 화각 후보마다 정확한 원근식으로 이전 화면을 옮겨 보고 가장 잘 맞는 화각을 고름
    const w = P.length,
      c = (w - 1) / 2,
      phi = turn.yaw * D2R;
    let best = -2,
      bf = null,
      second = -2;
    const res = [];
    for (let fv = 40; fv <= 95; fv += 0.5) {
      const f = this.long / 2 / Math.tan((fv / 2) * D2R);
      let sum = 0,
        cnt = 0;
      for (let x = 0; x < w; x++) {
        // 지금 x열에 보이는 방향은 이전 화면에서 φ만큼 더 오른쪽에 있었음
        const xp = c + f * Math.tan(Math.atan((x - c) / f) + phi);
        if (xp < 0 || xp > w - 1) continue;
        const i0 = Math.floor(xp),
          t = xp - i0,
          v = prev.P[i0] * (1 - t) + prev.P[Math.min(w - 1, i0 + 1)] * t;
        sum += v * P[x];
        cnt++;
      }
      if (cnt < w * 0.5) continue;
      const r = sum / cnt;
      res.push([fv, r]);
      if (r > best) {
        best = r;
        bf = fv;
      }
    }
    if (best < 0.75 || bf == null || bf <= 40 || bf >= 95) return null;
    // 뾰족한 봉우리여야(넓게 비슷하면 판단 불가)
    for (const [fv, r] of res)
      if (Math.abs(fv - bf) > 8) second = Math.max(second, r);
    if (best - second < 0.05) return null;
    const fov = bf;
    this.samples.push(fov);
    if (this.samples.length > 60) this.samples.shift();
    if (this.samples.length >= 8) {
      const s = [...this.samples].sort((a, b) => a - b);
      this.fov = s[s.length >> 1];
    }
    return this.fov;
  }
}

/** 소실점 나침반: 영상 속 수평 직선(복도 벽·바닥·천장 선, 문틀 위)이 모이는 방향으로
 * 벽 방향(세계 기준 방위, 90° 주기)을 구합니다. 실내 벽은 대부분 서로 직각이라
 * 자이로·지자기보다 훨씬 정확합니다(±1~2°).
 * g: 흑백(w×h), K: {fx,fy,cx,cy}, R: 카메라→세계 회전(OpenCV 축, 행 우선, 세계 z가 위)
 * 반환 {axis: 0~90도, ratio: 봉우리 선명도, n: 쓴 선 조각 수} 또는 null */
export function manhattanAxis(g, w, h, K, R) {
  const B = 180; // 0.5° 칸
  const H = new Float64Array(B);
  let n = 0;
  for (let y = 2; y < h - 2; y++)
    for (let x = 2; x < w - 2; x++) {
      const i = y * w + x;
      const gx =
        g[i - w + 1] +
        2 * g[i + 1] +
        g[i + w + 1] -
        g[i - w - 1] -
        2 * g[i - 1] -
        g[i + w - 1];
      const gy =
        g[i + w - 1] +
        2 * g[i + w] +
        g[i + w + 1] -
        g[i - w - 1] -
        2 * g[i - w] -
        g[i - w + 1];
      const mag = Math.hypot(gx, gy);
      if (mag < 90) continue;
      // 선 조각 방향을 ±2° 흔들어 봐서 표가 크게 바뀌면(지평선 근처 잡티 등) 믿지 않음
      const r0 = (x - K.cx) / K.fx,
        r1 = (y - K.cy) / K.fy;
      const ang = Math.atan2(gx, -gy);
      const v0 = vote(r0, r1, ang, K, R);
      if (v0 == null) continue;
      const vm = vote(r0, r1, ang - 0.035, K, R),
        vp = vote(r0, r1, ang + 0.035, K, R);
      if (vm == null || vp == null) continue;
      const spread = Math.abs(angDiff(vp * 4, vm * 4)) / 4;
      if (spread > 6) continue;
      const a = v0;
      const wt = Math.min(1, mag / 300) / (1 + (spread / 1.5) ** 2);
      const fb = a * 2,
        b0 = Math.floor(fb) % B,
        fr = fb - Math.floor(fb);
      H[b0] += wt * (1 - fr);
      H[(b0 + 1) % B] += wt * fr;
      n++;
    }
  if (n < 150) return null;
  // 둥글게 부드럽게(σ=1°)
  const S = new Float64Array(B);
  for (let b = 0; b < B; b++) {
    let s = 0;
    for (let k = -6; k <= 6; k++)
      s += H[(b + k + B) % B] * Math.exp(-(k * k) / 8);
    S[b] = s;
  }
  let bi = 0;
  for (let b = 1; b < B; b++) if (S[b] > S[bi]) bi = b;
  let second = 0;
  for (let b = 0; b < B; b++) {
    const d = Math.min(Math.abs(b - bi), B - Math.abs(b - bi));
    if (d > 12) second = Math.max(second, S[b]);
  }
  const l = S[(bi - 1 + B) % B],
    c = S[bi],
    r = S[(bi + 1) % B];
  const den = l - 2 * c + r;
  const sub = den < 0 ? (0.5 * (l - r)) / den : 0;
  const axis = ((((bi + sub) / 2) % 90) + 90) % 90;
  return { axis, ratio: c / (second || 1e-9), n };
}

// 영상 속 선 조각(점 r, 방향각 ang) 하나가 가리키는 수평 벽 방향(0~90도). 세로선·눈높이 선은 null
function vote(r0, r1, ang, K, R) {
  const t0 = Math.cos(ang) / K.fx,
    t1 = Math.sin(ang) / K.fy;
  // 이 선과 카메라 중심이 이루는 평면의 법선 r × t (카메라 좌표) → 세계 좌표
  const n0 = -t1,
    n1 = t0,
    n2 = r0 * t1 - r1 * t0;
  let mx = R[0] * n0 + R[1] * n1 + R[2] * n2,
    my = R[3] * n0 + R[4] * n1 + R[5] * n2,
    mz = R[6] * n0 + R[7] * n1 + R[8] * n2;
  const L = Math.hypot(mx, my, mz);
  mx /= L;
  my /= L;
  mz /= L;
  const hl = Math.hypot(mx, my);
  if (Math.abs(mz) < 0.25 || hl < 0.25) return null;
  // 직선 방향 d는 법선과 수직: d ⟂ (mx,my)
  const a = Math.atan2(my, mx) / D2R + 90;
  return ((a % 90) + 90) % 90;
}

/** 방향 기준(건물 − 센서) 필터: 최근 표본의 가중 중앙값. 수렴 뒤에는 중앙값에서 먼 표본을 버림 */
export class OffsetFilter {
  constructor(N = 24) {
    this.N = N;
    this.s = []; // {v, w}
    this.value = null;
  }
  add(v, w = 1) {
    if (
      this.value != null &&
      this.s.length >= 6 &&
      Math.abs(angDiff(v, this.value)) > 20
    )
      return this.value; // 튀는 값
    this.s.push({ v, w });
    if (this.s.length > this.N) this.s.shift();
    this.value = this._median();
    return this.value;
  }
  get n() {
    return this.s.length;
  }
  reset() {
    this.s = [];
    this.value = null;
  }
  _median() {
    // 첫 표본 기준으로 펴서(±180 넘김 방지) 가중 중앙값
    const ref = this.s[0].v;
    const a = this.s.map((o) => ({ v: ref + angDiff(o.v, ref), w: o.w }));
    a.sort((x, y) => x.v - y.v);
    const tot = a.reduce((t, o) => t + o.w, 0);
    let c = 0;
    for (const o of a) {
      c += o.w;
      if (c >= tot / 2) return o.v;
    }
    return a[a.length - 1].v;
  }
}
