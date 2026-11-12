// AR 위치 인식 워커: 화면이 끊기지 않도록 사진 비교를 별도 스레드에서 합니다.
import { Tracker } from "./localize.mjs";

let tracker = null;
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
      tracker = new Tracker(new Uint8Array(idx), sv.shots, m.portals || []);
      self.postMessage({ type: "ready", shots: sv.shots.length });
    } catch (err) {
      self.postMessage({
        type: "error",
        message: String(err && err.message ? err.message : err),
      });
    }
  } else if (m.type === "reset") {
    tracker?.reset();
  } else if (m.type === "query" && tracker) {
    const t0 = performance.now();
    const r = tracker.update(m.q, m.t, m.yawHint, m.floorHint);
    self.postMessage({ type: "pose", id: m.id, r, ms: performance.now() - t0 });
  }
};
