// 엘리베이터 탑승 화면: 문 닫힘 → 층 표시가 올라가거나 내려감 → 도착음 → 문 열림.
// 미리 걷기는 자동으로 끝까지 재생하고, AR은 실제로 내릴 때까지(hold) 이동 중 상태를 유지합니다.
import { floorLabel } from "./model.mjs";

const $ = (s) => document.querySelector(s);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

let audio = null;
function ding() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const t = audio.currentTime;
    for (const [f, d] of [
      [880, 0],
      [660, 0.18],
    ]) {
      const o = audio.createOscillator(),
        g = audio.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t + d);
      g.gain.exponentialRampToValueAtTime(0.18, t + d + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.5);
      o.connect(g).connect(audio.destination);
      o.start(t + d);
      o.stop(t + d + 0.55);
    }
  } catch {}
}

/** opts: { from, to, title, hint, hold:boolean, onSkip } → { arrive(): Promise, close() } */
export function playLift({ from, to, title, hint, hold = false, onSkip }) {
  const el = $("#lift"),
    num = el.querySelector(".lift-floor"),
    arrow = el.querySelector(".lift-arrow"),
    msg = el.querySelector(".lift-msg"),
    sub = el.querySelector(".lift-sub"),
    skip = el.querySelector(".lift-skip");
  const up = to > from;
  let cur = from,
    done = false,
    arrived = false,
    timer = null;
  el.hidden = false;
  el.className = "lift";
  arrow.textContent = up ? "▲" : "▼";
  num.textContent = floorLabel(from);
  msg.textContent = title || `${floorLabel(to)}로 이동 중`;
  sub.textContent = hint || "";
  skip.hidden = !hold;
  skip.onclick = () => {
    onSkip?.();
    api.arrive();
  };
  requestAnimationFrame(() => el.classList.add("show"));

  function setFloor(n) {
    num.classList.remove("flip");
    void num.offsetWidth;
    num.textContent = floorLabel(n);
    num.classList.add("flip");
  }
  // 층 표시: 실제 이동처럼 한 층씩
  async function run() {
    await wait(350);
    el.classList.add("closed"); // 문 닫힘
    await wait(700);
    el.classList.add("moving");
    const tick = async () => {
      while (!done && cur !== to) {
        await wait(1100);
        if (done) return;
        cur += up ? 1 : -1;
        setFloor(cur);
      }
    };
    await tick();
    if (!hold) await api.arrive();
  }
  const api = {
    async arrive() {
      if (arrived) return;
      arrived = true;
      // 남은 층을 빠르게 넘김
      while (cur !== to) {
        cur += up ? 1 : -1;
        setFloor(cur);
        await wait(260);
      }
      el.classList.remove("moving");
      el.classList.add("arrived");
      ding();
      msg.textContent = `${floorLabel(to)} 도착`;
      skip.hidden = true;
      await wait(600);
      el.classList.remove("closed"); // 문 열림
      await wait(750);
      api.close();
    },
    close() {
      done = true;
      clearTimeout(timer);
      el.classList.remove("show");
      setTimeout(() => (el.hidden = true), 250);
    },
    get arrived() {
      return arrived;
    },
  };
  run();
  return api;
}

// ---- 음성 안내 (켜기/끄기 기억)
const KEY = "sai-indoor-voice";
export const voice = {
  get on() {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  },
  set on(v) {
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
    } catch {}
    if (!v) speechSynthesis?.cancel();
  },
  supported: typeof window !== "undefined" && "speechSynthesis" in window,
  say(text) {
    if (!this.supported || !this.on || !text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/·/g, ","));
      u.lang = "ko-KR";
      u.rate = 1.05;
      speechSynthesis.speak(u);
    } catch {}
  },
};
