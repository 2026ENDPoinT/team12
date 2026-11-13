// 실내 경로 → 사람이 읽는 안내 단계, 그리고 현재 위치 기준 진행 상황.
import { floorName } from "./model.mjs";

const TURN = 35; // 이 각도 이상 꺾이면 방향 전환 안내
const BASE = 3; // 꺾임 전후 방향을 잴 거리(m) — 짧은 흔들림에 속지 않게
const CLUSTER = 3; // 이 거리 안의 연속 꺾임은 하나로 합쳐 판단

const DEG = 180 / Math.PI;
const hd = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) * DEG; // 방위(도, 동 0 반시계)
export function turnDeg(h0, h1) {
  let d = h1 - h0;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d; // +: 왼쪽, -: 오른쪽
}
function turnInfo(d) {
  const a = Math.abs(d),
    side = d > 0 ? "left" : "right",
    ko = d > 0 ? "왼쪽" : "오른쪽";
  if (a < TURN) return { dir: "straight", word: "직진", side: "" };
  if (a > 145) return { dir: `u-${side}`, word: "뒤로 돌아", side: "뒤" };
  if (a < 60)
    return { dir: `slight-${side}`, word: `${ko} 방향으로`, side: ko };
  return { dir: side, word: `${ko}으로`, side: ko };
}
const m = (v) => `${Math.max(1, Math.round(v))}m`;

/** 경로 → 안내 단계.
 * 각 단계: { kind, dir, f, to?, at:[x,y], s(경로상 위치 m), dist(다음 단계까지 m), action, text, sub }
 * opts.landmarks: 목적지 목록(indoor.destinations) — "313호 앞에서" 같은 기준 표시에 사용 */
export function buildSteps(route, dest, opts = {}) {
  const cum = routeMetrics(route);
  const P = route.pts;
  const total = cum[cum.length - 1];
  const at = (s) => {
    const p = pointAt(route, cum, Math.max(0, Math.min(total, s)));
    return [p.x, p.y];
  };
  const landmarks = (opts.landmarks || []).filter(
    (d) => !dest || d.key !== dest.key,
  );
  function landmarkNear(f, p, R = 3.5) {
    let best = null;
    for (const d of landmarks) {
      if (d.f !== f || d.cat === "store") continue;
      for (const q of d.doors) {
        const dd = Math.hypot(q[0] - p[0], q[1] - p[1]);
        const score = dd - (d.numbered ? 0.5 : 0);
        if (dd < R && (!best || score < best[0])) best = [score, d];
      }
    }
    return best && best[1];
  }
  const legS = (leg) => [cum[leg.i0], cum[leg.i1]];
  // 구간 안에서 s 직전·직후 BASE m 방향
  function headIn(s, s0) {
    const a = at(Math.max(s0, s - BASE)),
      b = at(s);
    return Math.hypot(b[0] - a[0], b[1] - a[1]) > 0.2 ? hd(a, b) : null;
  }
  function headOut(s, s1) {
    const a = at(s),
      b = at(Math.min(s1, s + BASE));
    return Math.hypot(b[0] - a[0], b[1] - a[1]) > 0.2 ? hd(a, b) : null;
  }
  // 층 이동 구간에 들어갈 때·나올 때 바라보는 방향
  function verticalHeads(leg) {
    if (leg.kind === "stair") {
      const r = leg.link.ramp.pts,
        seq = leg.up ? r : [...r].reverse();
      return {
        inH: hd(seq[0], seq[1]),
        outH: hd(seq[seq.length - 2], seq[seq.length - 1]),
        p0: seq[0],
      };
    }
    const l = leg.link,
      door0 = leg.up ? l.pa : l.pb,
      cab0 = leg.up ? l.qa : l.qb,
      door1 = leg.up ? l.pb : l.pa,
      cab1 = leg.up ? l.qb : l.qa;
    return { inH: hd(door0, cab0), outH: hd(cab1, door1), p0: door0 };
  }

  const steps = [];
  const legs = route.legs;
  let entryHead = null,
    entryKind = null;
  legs.forEach((leg, li) => {
    if (leg.kind !== "walk") {
      const vh = verticalHeads(leg);
      const prev = legs[li - 1];
      let side = "";
      if (prev && prev.kind === "walk") {
        const [ps0, ps1] = legS(prev);
        const h = headIn(ps1, ps0);
        if (h != null) side = turnInfo(turnDeg(h, vh.inH)).side;
      }
      const up = leg.to > leg.from;
      steps.push({
        kind: leg.kind,
        dir: leg.kind === "elev" ? "elev" : up ? "stair-up" : "stair-down",
        f: leg.from,
        to: leg.to,
        at: vh.p0,
        s: cum[leg.i0],
        side,
        id: leg.id,
      });
      entryHead = vh.outH;
      entryKind = leg.kind;
      return;
    }
    const [s0, s1] = legS(leg);
    // 꺾이는 점 후보: 다듬어진 선의 꼭짓점
    const cand = [];
    for (let i = leg.i0 + 1; i < leg.i1; i++) {
      const s = cum[i];
      const a = headIn(s, s0),
        b = headOut(s, s1);
      if (a == null || b == null) continue;
      cand.push({ s, d: turnDeg(a, b) });
    }
    // 가까운 꺾임은 묶어서 전체 각도로 판단 (작은 지그재그는 사라짐)
    const turns = [];
    for (const c of cand) {
      const last = turns[turns.length - 1];
      if (last && c.s - last.s1 < CLUSTER) {
        last.s1 = c.s;
        last.d = turnDeg(headIn(last.s0, s0) ?? 0, headOut(c.s, s1) ?? 0);
      } else turns.push({ s0: c.s, s1: c.s, d: c.d });
    }
    if (li === 0)
      steps.push({ kind: "start", dir: "start", f: leg.f, at: at(s0), s: s0 });
    else if (entryHead != null) {
      // 층 이동 직후: 나올 때 바라보는 방향 기준
      const h = headOut(s0, s1);
      const t = turnInfo(h == null ? 0 : turnDeg(entryHead, h));
      steps.push({
        kind: "walk",
        dir: t.dir,
        exit: entryKind,
        word: t.word,
        f: leg.f,
        at: at(s0),
        s: s0,
        h0: entryHead,
        hOut: h,
      });
    }
    for (const t of turns) {
      const info = turnInfo(t.d);
      if (info.dir === "straight") continue;
      const sMid = (t.s0 + t.s1) / 2;
      steps.push({
        kind: "walk",
        dir: info.dir,
        word: info.word,
        f: leg.f,
        at: at(sMid),
        s: sMid,
        hOut: headOut(t.s1, s1),
      });
    }
  });
  // 같은 계단실을 층참만 지나 계속 오르내리면 한 단계로 합칩니다.
  for (let i = steps.length - 1; i >= 2; i--) {
    const a = steps[i - 2],
      w = steps[i - 1],
      b = steps[i];
    if (
      a.kind === "stair" &&
      b.kind === "stair" &&
      a.dir === b.dir &&
      a.id === b.id &&
      w.kind === "walk" &&
      b.s - w.s < 5
    ) {
      a.to = b.to;
      steps.splice(i - 1, 2);
      i--;
    }
  }
  // 도착: 마지막 진행 방향 기준으로 목적지가 어느 쪽인지
  const end = P[P.length - 1];
  let arriveSide = "";
  if (dest) {
    const hEnd = headIn(total, Math.max(0, total - BASE));
    // 도착점은 문 바로 앞이므로 문 위치로 방향을 판단합니다.
    const c = route.target?.door || dest.center;
    if (hEnd != null && c && Math.hypot(c[0] - end.x, c[1] - end.y) > 0.2) {
      const tc = turnDeg(hEnd, hd([end.x, end.y], c));
      arriveSide =
        Math.abs(tc) < 35
          ? "정면"
          : Math.abs(tc) > 145
            ? "뒤쪽"
            : tc > 0
              ? "왼쪽"
              : "오른쪽";
    }
  }
  steps.push({
    kind: "arrive",
    dir: "arrive",
    f: end.f,
    at: [end.x, end.y],
    s: total,
    side: arriveSide,
  });

  // 군더더기 정리
  for (let i = steps.length - 2; i >= 1; i--) {
    const st = steps[i],
      nx = steps[i + 1],
      pv = steps[i - 1];
    const d = nx.s - st.s;
    // 계단·엘리베이터·도착 직전의 아주 짧은 꺾임은 그 단계의 방향 안내(왼쪽 계단 등)로 충분
    if (
      st.kind === "walk" &&
      !st.exit &&
      d < 2.5 &&
      nx.kind !== "walk" &&
      nx.kind !== "start"
    )
      steps.splice(i, 1);
    // 계단·엘리베이터에서 나와 몇 걸음 뒤 바로 꺾으면 한 문장으로
    else if (
      pv.kind === "walk" &&
      pv.exit &&
      st.kind === "walk" &&
      !st.exit &&
      st.s - pv.s < 4.5
    ) {
      const t = turnInfo(
        st.hOut == null || pv.h0 == null ? 0 : turnDeg(pv.h0, st.hOut),
      );
      Object.assign(st, {
        exit: pv.exit,
        dir: t.dir,
        word: t.word,
        s: pv.s,
        at: pv.at,
      });
      steps.splice(i - 1, 1);
    }
  }
  // 거리와 문장
  for (let i = 0; i < steps.length; i++) {
    const st = steps[i],
      nx = steps[i + 1];
    st.dist = nx ? Math.max(0, nx.s - st.s) : 0;
    const lm =
      st.kind === "walk" && !st.exit ? landmarkNear(st.f, st.at) : null;
    const ahead =
      nx && st.kind === "start" && nx.kind !== "arrive"
        ? landmarkNear(nx.f, nx.at, 4)
        : null;
    if (st.kind === "start") {
      st.action = "직진";
      st.text = `${ahead ? `${ahead.title} 쪽으로 ` : ""}${m(st.dist)} 직진`;
      st.sub = "출발";
    } else if (st.kind === "walk") {
      const where = st.exit
        ? st.exit === "elev"
          ? "엘리베이터에서 내려 "
          : "계단에서 나와 "
        : lm
          ? `${lm.title} 앞에서 `
          : "";
      st.action = st.word;
      st.text =
        st.dir === "straight"
          ? `${where}${m(st.dist)} 직진`
          : `${where}${st.word} ${m(st.dist)}`;
      st.sub = "";
    } else if (st.kind === "stair") {
      const ud = st.dir === "stair-up" ? "올라가기" : "내려가기";
      st.action = `계단으로 ${floorName(st.to)}`;
      st.text = `${st.side && st.side !== "뒤" ? `${st.side}에 있는 ` : st.side === "뒤" ? "뒤쪽 " : ""}계단으로 ${floorName(st.to)}까지 ${ud}`;
      st.sub = `${Math.abs(st.to - st.f)}개 층 ${st.dir === "stair-up" ? "위" : "아래"}`;
    } else if (st.kind === "elev") {
      st.action = `엘리베이터로 ${floorName(st.to)}`;
      st.text = `${st.side && st.side !== "뒤" ? `${st.side} ` : ""}엘리베이터를 타고 ${floorName(st.to)}으로`;
      st.sub = `${st.to === 0 ? "B1" : st.to}층 버튼을 누르세요`;
    } else {
      st.action = "도착";
      st.text = `${dest ? dest.title : "목적지"} 도착${st.side ? ` · ${st.side}` : ""}`;
      st.sub = dest && dest.name ? dest.name : "";
    }
  }
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
  for (let i = 1; i < steps.length; i++)
    if (steps[i].s > s + 0.8)
      return { step: steps[i], index: i, dist: steps[i].s - s };
  return { step: steps[steps.length - 1], index: steps.length - 1, dist: 0 };
}
// 진행 거리 s에서 지금 수행 중인 단계
export function currentStep(steps, s) {
  let k = 0;
  for (let i = 0; i < steps.length; i++) if (steps[i].s <= s + 0.8) k = i;
  return k;
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
