// 실내 경로 → 사람이 읽는 안내 단계, 그리고 현재 위치 기준 진행 상황.
import { floorName } from "./model.mjs";

const TURN = 35; // 이 각도 이상 꺾이면 방향 전환 안내
const MERGE = 2.5; // 이보다 짧은 직진은 앞 단계에 합칩니다.

const ang = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]);
function turnDeg(h0, h1) {
  let d = ((h1 - h0) * 180) / Math.PI;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d; // +: 왼쪽(반시계), -: 오른쪽
}
function turnWord(d) {
  const a = Math.abs(d);
  if (a < TURN) return null;
  const side = d > 0 ? "left" : "right";
  if (a > 140) return { dir: `u-${side}`, text: "뒤로 돌아" };
  if (a < 60)
    return {
      dir: `slight-${side}`,
      text: d > 0 ? "왼쪽 방향으로" : "오른쪽 방향으로",
    };
  return { dir: side, text: d > 0 ? "왼쪽으로" : "오른쪽으로" };
}
const m = (v) => `${Math.max(1, Math.round(v))}m`;

export function buildSteps(route, dest) {
  const steps = [];
  const legs = route.legs;
  legs.forEach((leg, li) => {
    if (leg.kind === "walk") {
      const p = leg.pts;
      let h = null;
      for (let i = 1; i < p.length; i++) {
        const L = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
        if (L < 0.05) continue;
        const nh = ang(p[i - 1], p[i]);
        const t = h === null ? null : turnWord(turnDeg(h, nh));
        const last = steps[steps.length - 1];
        if (h === null && li === 0) {
          steps.push({
            dir: "start",
            f: leg.f,
            at: p[i - 1],
            dist: L,
            text: "",
          });
        } else if (
          t ||
          !last ||
          last.dir.startsWith("stair") ||
          last.dir === "elev"
        ) {
          if (
            t &&
            L < MERGE &&
            last &&
            last.dir !== "start" &&
            i < p.length - 1
          ) {
            // 짧은 꺾임은 다음 꺾임과 합쳐 한 번만 안내
            last.dist += L;
          } else
            steps.push({
              dir: t ? t.dir : "straight",
              turn: t?.text,
              f: leg.f,
              at: p[i - 1],
              dist: L,
            });
        } else last.dist += L;
        h = nh;
      }
    } else {
      const up = leg.to > leg.from;
      steps.push({
        dir: leg.kind === "elev" ? "elev" : up ? "stair-up" : "stair-down",
        f: leg.from,
        to: leg.to,
        at:
          leg.kind === "stair"
            ? leg.link.ramp.pts[up ? 0 : leg.link.ramp.pts.length - 1]
            : up
              ? leg.link.pa
              : leg.link.pb,
        dist: 0,
      });
    }
  });
  // 같은 계단실을 층참만 지나 계속 오르내리면 한 단계로 합칩니다.
  for (let i = steps.length - 1; i >= 2; i--) {
    const a = steps[i - 2],
      w = steps[i - 1],
      b = steps[i];
    if (
      a.dir === b.dir &&
      (a.dir.startsWith("stair") || a.dir === "elev") &&
      w.dist < 5 &&
      !w.dir.startsWith("stair") &&
      w.dir !== "elev"
    ) {
      a.to = b.to;
      steps.splice(i - 1, 2);
      i--;
    }
  }
  // 짧은 걷기 단계는 앞 단계에 합칩니다.
  for (let i = steps.length - 1; i > 0; i--) {
    const s = steps[i],
      p = steps[i - 1];
    const walky = (x) => x.dir === "start" || x.dir === "straight" || x.turn;
    if (walky(s) && s.dir !== "start" && s.dist < MERGE && walky(p)) {
      p.dist += s.dist;
      steps.splice(i, 1);
    }
  }
  // 문장 만들기
  for (const s of steps) {
    if (s.dir === "start") s.text = `출발 · ${m(s.dist)} 직진`;
    else if (s.dir === "straight") s.text = `${m(s.dist)} 직진`;
    else if (s.dir === "elev") s.text = `엘리베이터로 ${floorName(s.to)}`;
    else if (s.dir.startsWith("stair"))
      s.text = `계단으로 ${floorName(s.to)}까지 ${s.dir === "stair-up" ? "올라가기" : "내려가기"}`;
    else s.text = `${s.turn} ${m(s.dist)}`;
  }
  // 도착: 마지막 진행 방향 기준으로 문이 어느 쪽인지
  const lastWalk = [...legs].reverse().find((l) => l.kind === "walk");
  let side = "";
  if (lastWalk && lastWalk.pts.length >= 2 && dest) {
    const p = lastWalk.pts,
      a = p[p.length - 2],
      b = p[p.length - 1],
      door = route.target?.door || b;
    const c = dest.center || door;
    const cross = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
    if (Math.abs(cross) > 0.3) side = cross > 0 ? "왼쪽" : "오른쪽";
  }
  steps.push({
    dir: "arrive",
    f: lastWalk ? lastWalk.f : route.pts[route.pts.length - 1].f,
    at: lastWalk ? lastWalk.pts[lastWalk.pts.length - 1] : null,
    dist: 0,
    text: `${dest ? dest.title : "목적지"} 도착${side ? ` (${side})` : ""}`,
  });
  return steps;
}

// 경로 위 누적 거리 (층 이동 구간 포함, 엘리베이터는 0)
export function routeMetrics(route) {
  const cum = [0];
  const P = route.pts;
  for (let i = 1; i < P.length; i++) {
    const a = P[i - 1],
      b = P[i];
    cum.push(
      cum[i - 1] +
        (a.kind === "elev" && b.kind === "elev"
          ? 0
          : Math.hypot(b.x - a.x, b.y - a.y)),
    );
  }
  return cum;
}

// 현재 위치를 경로에 투영: 진행 거리, 경로에서 떨어진 거리, 남은 거리
export function progressOn(route, cum, pos, hint = 0) {
  const P = route.pts;
  let best = { d: Infinity };
  for (let i = 0; i < P.length - 1; i++) {
    const a = P[i],
      b = P[i + 1];
    if (a.kind === "elev" && b.kind === "elev") continue;
    if (a.f !== pos.f && b.f !== pos.f) continue;
    const vx = b.x - a.x,
      vy = b.y - a.y,
      L2 = vx * vx + vy * vy || 1e-9;
    const t = Math.max(
      0,
      Math.min(1, ((pos.x - a.x) * vx + (pos.y - a.y) * vy) / L2),
    );
    const d = Math.hypot(pos.x - a.x - vx * t, pos.y - a.y - vy * t);
    const s = cum[i] + t * (cum[i + 1] - cum[i]);
    // 이미 지나온 구간으로 되돌아가는 것은 약간 불리하게
    const score = d + (s < hint - 3 ? 2 : 0);
    if (score < best.score || best.d === Infinity) best = { d, s, i, t, score };
  }
  if (best.d === Infinity) return null;
  const total = cum[cum.length - 1];
  return {
    off: best.d,
    s: best.s,
    seg: best.i,
    remain: Math.max(0, total - best.s),
    total,
  };
}

// 진행 거리 s 기준 다음 안내 단계와 그 단계까지의 거리
export function nextStep(steps, route, cum, s) {
  // 각 단계의 시작 지점을 경로 누적 거리로 환산
  if (!steps._s) {
    const P = route.pts;
    steps._s = steps.map((st) => {
      if (!st.at) return cum[cum.length - 1];
      let bi = 0,
        bd = Infinity;
      for (let i = 0; i < P.length; i++) {
        if (P[i].f !== st.f) continue;
        const d = Math.hypot(P[i].x - st.at[0], P[i].y - st.at[1]);
        if (d < bd - 1e-6) {
          bd = d;
          bi = i;
        }
      }
      return cum[bi];
    });
    // 단조 증가 보정
    for (let i = 1; i < steps._s.length; i++)
      steps._s[i] = Math.max(steps._s[i], steps._s[i - 1]);
    steps._s[steps._s.length - 1] = cum[cum.length - 1];
  }
  for (let i = 1; i < steps.length; i++)
    if (steps._s[i] > s + 0.8)
      return { step: steps[i], index: i, dist: steps._s[i] - s };
  return { step: steps[steps.length - 1], index: steps.length - 1, dist: 0 };
}

export function pointAt(route, cum, s) {
  const P = route.pts;
  for (let i = 0; i < P.length - 1; i++) {
    if (cum[i + 1] >= s) {
      const L = cum[i + 1] - cum[i];
      const t = L > 0 ? (s - cum[i]) / L : 1;
      const a = P[i],
        b = P[i + 1];
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
        f: t < 0.5 ? a.f : b.f,
        i,
      };
    }
  }
  const e = P[P.length - 1];
  return { ...e, i: P.length - 1 };
}

export function walkMinutes(len) {
  const sec = len / 1.2;
  return sec < 60
    ? `${Math.max(10, Math.round(sec / 10) * 10)}초`
    : `${Math.round(sec / 60)}분`;
}
