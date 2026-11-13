// AR 위치 인식 워커: 화면이 끊기지 않도록 사진 비교와 입자 필터를 별도 스레드에서 돌립니다.
import { Localizer } from "./pf.mjs";
import { makeWalk } from "../model.mjs";

let loc = null;
const reply = (type, r, extra = {}) => self.postMessage({ type, r, ...extra });

self.onmessage = async (e) => {
  const m = e.data;
  if (m.type === "init") {
    try {
      const [idx, sv] = await Promise.all([
        fetch(m.indexUrl).then((r) => {
          if (!r.ok) throw new Error(`기준 데이터 ${r.status}`);
          return r.arrayBuffer();
        }),
        fetch(m.svUrl).then((r) => r.json()),
      ]);
      loc = new Localizer({
        index: new Uint8Array(idx),
        shots: sv.shots,
        walk: makeWalk(m.grid),
        portals: m.portals || [],
      });
      self.postMessage({ type: "ready", shots: sv.shots.length });
    } catch (err) {
      self.postMessage({
        type: "error",
        message: String(err && err.message ? err.message : err),
      });
    }
    return;
  }
  if (!loc) return;
  if (m.type === "reset") loc.reset();
  else if (m.type === "step") {
    loc.step(m.len, m.yaw);
    if (loc.ready) reply("motion", loc.estimate(m.yaw));
  } else if (m.type === "tick") {
    // 걸음 감지가 있으면 멈춰 있던 시간, 없으면(데모·센서 없음) 시간 경과로 퍼뜨림
    if (m.pdr) loc.still(m.dt);
    else loc.drift(m.dt, m.yaw, m.hasSensor);
  } else if (m.type === "lift") loc.lift(m.f, m.x, m.y);
  else if (m.type === "floor") loc.setFloor(m.f);
  else if (m.type === "heading") loc.heading(m.off, m.sd);
  else if (m.type === "fix") reply("pose", loc.fix(m.fix, m.yaw), { src: "fix" });
  else if (m.type === "query") {
    const t0 = performance.now();
    const r = loc.measure(m.q, m.yaw, m.floorHint);
    reply("pose", r, { id: m.id, ms: performance.now() - t0 });
  }
};
