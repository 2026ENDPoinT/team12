// AR 위치 추정: 입자 필터.
//
// 사진 한 장으로 위치를 바로 정하는 대신, 위치 후보(입자) 수백 개를 함께 들고 다니며
//  · 걸음(보행자 추측항법) → 후보를 앞으로 옮기고, 벽 속으로는 못 가게 막고
//  · 사진 비교(원통 띠 NCC) → 그 자리·그 방향에서 보일 모습과 닮은 후보에 무게
//  · 층은 계단·엘리베이터 입구를 지나는 후보만 바뀜
// 를 반복해, 층마다 비슷한 복도처럼 한 장으로는 헷갈리는 곳도 시간이 지나며 하나로 좁힙니다.
// 각 후보는 '건물 방위 − 센서 방위'(o)도 함께 가지므로 휴대폰 나침반 오차도 같이 추정합니다.
import { matchAll } from "./localize.mjs";

const D2R = Math.PI / 180;

export const PF = {
  N: 600, // 입자 수
  STEP_SD: 0.15, // 걸음 길이 오차 비율
  HEAD_SD: 7, // 걸음 방향 오차(도)
  MIN_NCC: 0.36, // 이보다 낮으면 사진 정보로 쓰지 않음
  OFF_GRID: 0.8, // 걷기 격자 밖으로 한 번 움직일 때 무게 배율
  OTHER_FLOOR: 0.9, // 경로상 예상 층이 아닌 입자에 사진 비교마다 곱하는 배율
  POS_SD: 1.0, // 잘 맞는 사진 위치와의 거리 허용(m)
  YAW_SD: 15, // 그 사진이 가리키는 방향과의 차이 허용(도)
  EPS: 0.05, // 어느 사진과도 안 맞는 입자의 바닥 무게(틀린 매칭 하나에 휘둘리지 않게)
  OK_CONF: 0.12, // 이 신뢰도 넘으면 위치 확인됨
  LOST: 0.08, // 무리가 상위 사진을 이만큼도 설명 못 하면 '놓침'으로 셈
};

function rng(seed) {
  if (seed == null) return Math.random;
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Localizer {
  /** index: ar-index.bin, shots: sv.json shots, walk(f,x,y): 걸을 수 있는 곳인지,
   * portals: [{kind, fa, pa, fb, pb}] 층 연결 */
  constructor({ index, shots, walk, portals = [], seed = null, N = PF.N }) {
    this.index = index;
    this.shots = shots;
    this.walk = walk;
    this.portals = portals;
    this.N = N;
    this.rand = rng(seed);
    this.X = new Float32Array(N);
    this.Y = new Float32Array(N);
    this.F = new Int8Array(N);
    this.O = new Float32Array(N);
    this.W = new Float64Array(N);
    // 사진을 2m 칸으로 묶어 근처 검색
    this.buckets = new Map();
    shots.forEach((s, i) => {
      const k = this._key(s.f, Math.floor(s.x / 2), Math.floor(s.y / 2));
      (this.buckets.get(k) || this.buckets.set(k, []).get(k)).push(i);
    });
    this.byFloor = new Map();
    shots.forEach((s, i) =>
      (this.byFloor.get(s.f) || this.byFloor.set(s.f, []).get(s.f)).push(i),
    );
    this.reset();
  }
  _key(f, i, j) {
    return (f + 4) * 1e6 + (i + 500) * 1000 + (j + 500);
  }
  gauss() {
    const u = this.rand() || 1e-9,
      v = this.rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  reset() {
    this.support = null;
    this.lost = 0;
    this.pending = null;
    this.lowConf = 0;
    this.init = false;
    this.n = 0;
    this.q = 0; // 사진 점수 품질(지수 평균)
    this.weak = 0;
    this.est = null;
  }
  get ready() {
    return this.init;
  }

  // ---- 움직임
  /** 걸음 하나: len(m), sensorYaw(도, 센서 기준 방위. 없으면 null) */
  step(len, sensorYaw) {
    if (!this.init) return;
    const s = sensorYaw ?? 0;
    for (let p = 0; p < this.N; p++) {
      const h = (s + this.O[p] + this.gauss() * PF.HEAD_SD) * D2R;
      const L = len * (1 + this.gauss() * PF.STEP_SD);
      this._move(p, L * Math.cos(h), L * Math.sin(h));
      this.O[p] += this.gauss() * 0.8;
    }
    this._portals(0.12, "stair", s);
  }
  /** 걸음 감지가 없을 때 시간 경과(데모 영상·센서 없는 기기): 앞으로 0~1.1m/s, 방향은 넓게 흔들림 */
  drift(dt, sensorYaw, hasSensor) {
    if (!this.init || dt <= 0) return;
    const s = sensorYaw ?? 0;
    const sdO = hasSensor ? 0.4 * Math.sqrt(dt) : 25 * Math.sqrt(dt);
    for (let p = 0; p < this.N; p++) {
      this.O[p] += this.gauss() * sdO;
      const h = (s + this.O[p]) * D2R;
      const v = this.rand() * 1.1 * dt;
      const j = 0.25 * Math.sqrt(dt);
      this._move(
        p,
        v * Math.cos(h) + this.gauss() * j,
        v * Math.sin(h) + this.gauss() * j,
      );
    }
    this._portals(0.08 * dt, "stair", hasSensor ? s : null);
    this._portals(0.02 * dt, "elev");
  }
  /** 걸음 감지는 있지만 걸음이 없던 시간: 제자리 미세 흔들림만 */
  still(dt) {
    if (!this.init || dt <= 0) return;
    const j = 0.05 * Math.sqrt(dt);
    for (let p = 0; p < this.N; p++)
      this._move(p, this.gauss() * j, this.gauss() * j);
    this._portals(0.02 * dt, "elev");
  }
  // 도면 걷기 격자는 문틀·가구 둘레를 넉넉히 막아 실제 통로보다 좁습니다(촬영 지점의 19%가 격자 밖).
  // 그래서 벽을 완전히 막지 않고, 격자 밖에 있을수록 무게를 깎습니다(두꺼운 벽을 지나면 크게 깎임).
  _move(p, dx, dy) {
    const x = this.X[p] + dx,
      y = this.Y[p] + dy;
    this.X[p] = x;
    this.Y[p] = y;
    if (!this.walk(this.F[p], x, y)) this.W[p] *= PF.OFF_GRID;
  }
  // 계단·엘리베이터 입구 근처 입자 일부를 다른 층으로.
  // 계단은 계단 쪽으로 걸어 들어가는 입자만(층마다 계단실 모습이 비슷해 지나치기만 해도 넘어가면 안 됨).
  _portals(prob, kind, sensorYaw = null) {
    for (const pt of this.portals) {
      if (pt.kind !== kind) continue;
      for (let p = 0; p < this.N; p++) {
        let to = null,
          dir = null;
        if (
          this.F[p] === pt.fa &&
          Math.hypot(this.X[p] - pt.pa[0], this.Y[p] - pt.pa[1]) < 1.6
        ) {
          to = [pt.fb, pt.pb];
          dir = pt.da;
        } else if (
          this.F[p] === pt.fb &&
          Math.hypot(this.X[p] - pt.pb[0], this.Y[p] - pt.pb[1]) < 1.6
        ) {
          to = [pt.fa, pt.pa];
          dir = pt.db;
        }
        if (!to || this.rand() >= prob) continue;
        if (kind === "stair" && dir != null && sensorYaw != null) {
          const h = sensorYaw + this.O[p];
          if (Math.abs(((((h - dir) % 360) + 540) % 360) - 180) > 50) continue;
        }
        this._place(p, to[0], to[1][0], to[1][1], 0.5);
      }
    }
  }
  _place(p, f, x, y, sd) {
    this.X[p] = x + this.gauss() * sd;
    this.Y[p] = y + this.gauss() * sd;
    this.F[p] = f;
  }
  /** 엘리베이터에서 내림: 모든 후보를 도착 층 문 앞으로 */
  lift(f, x, y) {
    if (!this.init) return;
    for (let p = 0; p < this.N; p++) {
      this._place(p, f, x, y, 1.0);
      this.W[p] = 1 / this.N;
    }
  }
  /** 외부 위치(서버 특징점 측위 등): {f, x, y, yaw, conf}. 정확한 측정으로 강하게 반영 */
  fix(m, sensorYaw) {
    const s = sensorYaw ?? 0;
    if (!this.init) {
      for (let p = 0; p < this.N; p++) {
        this._place(p, m.f, m.x, m.y, 0.5);
        this.O[p] = m.yaw - s + this.gauss() * 4;
        this.W[p] = 1 / this.N;
      }
      this.init = true;
      this.q = 0.8;
      this.support = 0.5;
      return this.estimate(s);
    }
    const sd = 0.6 / Math.max(0.3, m.conf ?? 1);
    let hit = 0;
    for (let p = 0; p < this.N; p++) {
      const d2 = (this.X[p] - m.x) ** 2 + (this.Y[p] - m.y) ** 2;
      const dy = ((((s + this.O[p] - m.yaw) % 360) + 540) % 360) - 180;
      const L =
        this.F[p] === m.f
          ? Math.exp(-d2 / (2 * sd * sd) - (dy * dy) / (2 * 10 * 10))
          : 0;
      hit += this.W[p] * L;
      this.W[p] *= PF.EPS + L;
    }
    this._normalize();
    // 무리에서 먼 곳이면 일부를 그 자리에 심음(다음 측정에서 확정)
    if (hit < 0.05) {
      for (let i = 0; i < this.N * 0.3; i++) {
        const p = Math.floor(this.rand() * this.N);
        this._place(p, m.f, m.x, m.y, 0.5);
        this.O[p] = m.yaw - s + this.gauss() * 4;
      }
      this.W.fill(1 / this.N);
    }
    this._resample();
    return this.estimate(s);
  }
  /** 사용자가 층을 직접 고름: 다른 층 후보는 버리고 그 층에서 다시 찾음 */
  /** 소실점 나침반이 잰 방향 기준(건물 − 센서, 도): 맞는 입자에 무게를 주고 방향을 당김 */
  heading(off, sd = 5) {
    if (!this.init) return;
    for (let p = 0; p < this.N; p++) {
      const d = ((((this.O[p] - off) % 360) + 540) % 360) - 180;
      this.W[p] *= 0.15 + Math.exp(-(d * d) / (2 * sd * sd));
      if (Math.abs(d) < 20) this.O[p] -= d * 0.5;
    }
    this._normalize();
  }
  setFloor(f) {
    this.reset();
    this.forcedFloor = f;
  }

  // ---- 사진 비교
  /** q: 질의 띠, sensorYaw: 센서 방위(도)/null, floorHint: 처음 찾을 때 우선할 층
   * opts.exclude: 평가용 — 비교에서 뺄 사진 번호 Set */
  measure(q, sensorYaw, floorHint = null, opts = {}) {
    const s = sensorYaw ?? 0;
    const ex = opts.exclude;
    if (this.forcedFloor != null) {
      floorHint = this.forcedFloor;
    }
    this.hint = floorHint;
    if (!this.init) {
      this._seed(q, s, floorHint, ex);
      if (!this.init) return { ok: false, conf: 0 };
      this.forcedFloor = null;
      return this.estimate(s);
    }
    this.n++;
    // 1) 비교할 사진: 입자 무리 근처(약 4m) + 경로상 예상 층 전체(2번에 1번) + 전 층(8번에 1번)
    const cand = new Set();
    const seen = new Set();
    for (let p = 0; p < this.N; p++) {
      const bi = Math.floor(this.X[p] / 2),
        bj = Math.floor(this.Y[p] / 2),
        f = this.F[p];
      const kk = this._key(f, bi, bj);
      if (seen.has(kk)) continue;
      seen.add(kk);
      for (let di = -2; di <= 2; di++)
        for (let dj = -2; dj <= 2; dj++) {
          const list = this.buckets.get(this._key(f, bi + di, bj + dj));
          if (list) for (const k of list) cand.add(k);
        }
    }
    const wide = this.n % 8 === 0;
    if (wide) this.shots.forEach((_, k) => cand.add(k));
    else if (this.n % 2 === 0 && floorHint != null)
      for (const k of this.byFloor.get(floorHint) || []) cand.add(k);
    if (ex) for (const k of ex) cand.delete(k);
    const mopts = { cand: [...cand] };
    const e0 = this.est;
    if (e0 && e0.conf > 0.3) {
      mopts.yawPrior = s + e0.off;
      mopts.yawTol = 45;
    }
    const res = matchAll(this.index, this.shots, q, mopts);
    const best = res.length ? res[0].ncc : -2;
    this.q = this.q * 0.6 + Math.max(0, best) * 0.4;
    // 2) 무게: 잘 맞는 사진들(1위와 0.1 안) 가까이, 그 사진이 가리키는 방향을 보는 입자일수록 큼
    if (best >= PF.MIN_NCC) {
      this.weak = 0;
      const top = res.filter((r) => r.ncc > best - 0.1).slice(0, 15);
      const tw = top.map((r) => Math.exp((r.ncc - best) / 0.03));
      const ts = top.map((r) => this.shots[r.k]);
      const s2 = 2 * PF.POS_SD * PF.POS_SD,
        y2 = 2 * PF.YAW_SD * PF.YAW_SD;
      let expl = 0; // 지금 무리가 잘 맞는 사진들을 얼마나 설명하는지
      const twSum = tw.reduce((a, b) => a + b, 0);
      for (let p = 0; p < this.N; p++) {
        let L = PF.EPS;
        const yawP = s + this.O[p];
        for (let i = 0; i < top.length; i++) {
          const sh = ts[i];
          if (sh.f !== this.F[p]) continue;
          const d2 = (sh.x - this.X[p]) ** 2 + (sh.y - this.Y[p]) ** 2;
          if (d2 > 16) continue;
          const dy = ((((yawP - top[i].yaw) % 360) + 540) % 360) - 180;
          L += tw[i] * Math.exp(-d2 / s2 - (dy * dy) / y2);
        }
        expl += this.W[p] * (L - PF.EPS);
        this.W[p] *= L;
        // 경로상 지금 있어야 할 층에 약한 가산점
        if (floorHint != null && this.F[p] !== floorHint)
          this.W[p] *= PF.OTHER_FLOOR;
      }
      this._normalize();
      // 설명을 못 하는 상태가 이어지면(엉뚱한 곳에 갇힘·밀려남) 그 자리에서 다시 찾음
      const support = expl / twSum;
      this.support =
        this.support == null ? support : this.support * 0.5 + support * 0.5;
      this.lost = support < PF.LOST ? (this.lost || 0) + 1 : 0;
      if (this.lost >= 3 && best > 0.6) {
        this.reset();
        this._seed(q, s, floorHint, ex);
        return this.init ? this.estimate(s) : { ok: false, conf: 0 };
      }
      // 3) 무리 근처의 잘 맞는 사진 자리·방향에 입자 일부를 다시 심음(걸음·방향 오차로 뒤처지지 않게)
      this._reseed(top, s, e0);
    } else this.weak++;
    this._resample();
    const est = this.estimate(s);
    // 오래 흐릿하거나 갈피를 못 잡으면 처음부터 다시
    this.lowConf = est.conf < 0.15 ? (this.lowConf || 0) + 1 : 0;
    if (this.weak > 12 || this.lowConf > 6) this.reset();
    return est;
  }
  _seed(q, s, floorHint, ex) {
    const all = this.shots.map((_, i) => i).filter((k) => !(ex && ex.has(k)));
    let res = [];
    if (floorHint != null)
      res = matchAll(this.index, this.shots, q, {
        cand: (this.byFloor.get(floorHint) || []).filter(
          (k) => !(ex && ex.has(k)),
        ),
      });
    // 힌트 층에 확실한 후보가 없을 때만 다른 층도 보되, 그때는 더 확실해야 시작
    let need = 0.6;
    if (this.forcedFloor == null && (!res.length || res[0].ncc < 0.6)) {
      const g = matchAll(this.index, this.shots, q, { cand: all });
      if (g.length && (!res.length || g[0].ncc > res[0].ncc + 0.08)) {
        res = g;
        need = 0.72;
      }
    }
    if (!res.length || res[0].ncc < need) return;
    // 1위와 비슷한 후보만으로 시작
    res = res.filter((r) => r.ncc > res[0].ncc - 0.12);
    const top = res.slice(0, 30);
    const w = top.map((r) => Math.exp((r.ncc - top[0].ncc) / 0.04));
    const sw = w.reduce((a, b) => a + b, 0);
    for (let p = 0; p < this.N; p++) {
      let u = this.rand() * sw,
        i = 0;
      while (i < top.length - 1 && (u -= w[i]) > 0) i++;
      const r = top[i],
        sh = this.shots[r.k];
      this._place(p, sh.f, sh.x, sh.y, 0.8);
      this.O[p] = r.yaw - s + this.gauss() * 12;
      this.W[p] = 1 / this.N;
    }
    this.init = true;
    this.q = top[0].ncc;
  }
  // 무리 근처(5m)의 상위 사진에는 바로, 떨어진 곳은 두 번 연속 같은 자리에 나올 때만
  _reseed(top, s, e) {
    const near = [],
      far = [];
    for (const r of top.slice(0, 5)) {
      const sh = this.shots[r.k];
      if (!e || (sh.f === e.f && Math.hypot(sh.x - e.x, sh.y - e.y) < 5))
        near.push(r);
      else far.push(r);
    }
    const prev = this.pending || [];
    const farOk = far.filter((r) => {
      const sh = this.shots[r.k];
      return prev.some(
        (p) => p.f === sh.f && Math.hypot(p.x - sh.x, p.y - sh.y) < 4,
      );
    });
    this.pending = far.map((r) => this.shots[r.k]);
    const plant = (list, share, w) => {
      for (const r of list) {
        const sh = this.shots[r.k];
        const n = Math.max(1, Math.floor((this.N * share) / list.length));
        for (let i = 0; i < n; i++) {
          const p = Math.floor(this.rand() * this.N);
          this._place(p, sh.f, sh.x, sh.y, 0.4);
          this.O[p] = r.yaw - s + this.gauss() * 4;
          this.W[p] = w;
        }
      }
    };
    const wMean = 1 / this.N;
    if (near.length) plant(near, 0.04, wMean);
    if (farOk.length) plant(farOk, 0.04, wMean * 0.5);
    this._normalize();
  }
  _normalize() {
    let sw = 0;
    for (let p = 0; p < this.N; p++) sw += this.W[p];
    if (!(sw > 0)) {
      this.W.fill(1 / this.N);
      return;
    }
    for (let p = 0; p < this.N; p++) this.W[p] /= sw;
  }
  _resample() {
    let s2 = 0;
    for (let p = 0; p < this.N; p++) s2 += this.W[p] * this.W[p];
    if (1 / s2 > this.N * 0.5) return;
    const N = this.N,
      X = new Float32Array(N),
      Y = new Float32Array(N),
      F = new Int8Array(N),
      O = new Float32Array(N);
    const step = 1 / N;
    let u = this.rand() * step,
      c = this.W[0],
      i = 0;
    for (let p = 0; p < N; p++) {
      while (u > c && i < N - 1) c += this.W[++i];
      X[p] = this.X[i];
      Y[p] = this.Y[i];
      F[p] = this.F[i];
      O[p] = this.O[i] + this.gauss() * 2.5;
      u += step;
    }
    this.X = X;
    this.Y = Y;
    this.F = F;
    this.O = O;
    this.W.fill(1 / N);
    // 같은 자리에 겹친 입자를 살짝 흩뜨림
    for (let p = 0; p < N; p++) {
      this.X[p] += this.gauss() * 0.12;
      this.Y[p] += this.gauss() * 0.12;
    }
  }

  /** 가장 무게가 몰린 무리의 평균 위치·방향과 신뢰도 */
  estimate(sensorYaw = 0) {
    if (!this.init) return { ok: false, conf: 0 };
    const s = sensorYaw ?? 0;
    // 층별 무게
    const fw = new Map();
    for (let p = 0; p < this.N; p++)
      fw.set(this.F[p], (fw.get(this.F[p]) || 0) + this.W[p]);
    let f = null,
      fm = -1;
    for (const [k, v] of fw)
      if (v > fm) {
        fm = v;
        f = k;
      }
    // 그 층에서 2m 칸 무게가 가장 큰 곳을 시작점으로 한 번 평균 이동
    const grid = new Map();
    for (let p = 0; p < this.N; p++) {
      if (this.F[p] !== f) continue;
      const k =
        (Math.floor(this.X[p] / 2) + 500) * 1000 +
        Math.floor(this.Y[p] / 2) +
        500;
      grid.set(k, (grid.get(k) || 0) + this.W[p]);
    }
    let bk = null,
      bv = -1;
    for (const [k, v] of grid) {
      let t = v;
      const i = Math.floor(k / 1000),
        j = k - i * 1000;
      for (const [di, dj] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ])
        t += 0.5 * (grid.get((i + di) * 1000 + j + dj) || 0);
      if (t > bv) {
        bv = t;
        bk = k;
      }
    }
    let cx = (Math.floor(bk / 1000) - 500 + 0.5) * 2,
      cy = ((bk % 1000) - 500 + 0.5) * 2;
    let mass = 0,
      sx = 0,
      sy = 0,
      sc = 0,
      ss = 0;
    for (let it = 0; it < 3; it++) {
      mass = sx = sy = sc = ss = 0;
      for (let p = 0; p < this.N; p++) {
        if (this.F[p] !== f) continue;
        if (Math.hypot(this.X[p] - cx, this.Y[p] - cy) > 3) continue;
        const w = this.W[p];
        mass += w;
        sx += w * this.X[p];
        sy += w * this.Y[p];
        sc += w * Math.cos(this.O[p] * D2R);
        ss += w * Math.sin(this.O[p] * D2R);
      }
      if (!(mass > 0)) break;
      cx = sx / mass;
      cy = sy / mass;
    }
    let v = 0;
    for (let p = 0; p < this.N; p++) {
      if (this.F[p] !== f || Math.hypot(this.X[p] - cx, this.Y[p] - cy) > 3)
        continue;
      v += this.W[p] * ((this.X[p] - cx) ** 2 + (this.Y[p] - cy) ** 2);
    }
    const spread = mass > 0 ? Math.sqrt(v / mass) : 99;
    const off = Math.atan2(ss, sc) / D2R;
    const qual = Math.max(0, Math.min(1, (this.q - 0.36) / 0.3));
    // 무리가 최근 잘 맞는 사진들을 설명하는 정도(시작 직후는 아직 모름 → 보수적으로)
    const sup = this.support == null ? 0.5 : Math.min(1, this.support / 0.35);
    const conf = Math.max(0, Math.min(1, mass)) * qual * sup;
    this.est = {
      ok: conf > PF.OK_CONF && spread < 2.5,
      x: cx,
      y: cy,
      f,
      off,
      yaw: s + off,
      conf,
      mass,
      spread,
      ncc: this.q,
      floorMass: fm,
    };
    return this.est;
  }
}

const hd = (a, b) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
// mirae.json 같은 층 연결 목록 → 입자 필터용 연결
export function portalsFrom(links) {
  return links.map((l) =>
    l.kind === "stair"
      ? {
          kind: "stair",
          fa: l.fa,
          pa: l.ramp.pts[0],
          fb: l.fb,
          pb: l.ramp.pts[l.ramp.pts.length - 1],
          // 계단으로 들어갈 때 향하는 방위(도): 아래 입구는 오르는 방향, 위 입구는 내려가는 방향
          da: hd(l.ramp.pts[0], l.ramp.pts[Math.min(2, l.ramp.pts.length - 1)]),
          db: hd(
            l.ramp.pts[l.ramp.pts.length - 1],
            l.ramp.pts[Math.max(0, l.ramp.pts.length - 3)],
          ),
        }
      : { kind: "elev", fa: l.fa, pa: l.pa, fb: l.fb, pb: l.pb },
  );
}
