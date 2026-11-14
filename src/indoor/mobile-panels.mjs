import { draggedSheetHeight, shouldCollapseSheet } from "../ui/sheet.mjs";

// 실외 경로 시트와 같은 높이·속도 기준으로 움직이는 실내 모바일 패널.
export function bindMobilePanel(panel, handle) {
  const mobile = matchMedia("(max-width: 819px)");
  let drag = null;
  let animation = null;
  let suppressClick = false;
  const collapsed = () => panel.classList.contains("collapsed");
  function mark(value) {
    panel.classList.toggle("collapsed", value);
    handle.setAttribute("aria-expanded", String(!value));
    handle.setAttribute("aria-label", value ? "패널 펼치기" : "패널 접기");
  }
  function clearMotion() {
    animation?.cancel();
    animation = null;
    panel.classList.remove("panel-sizing");
    panel.style.removeProperty("height");
  }
  function reset(value = false) {
    const pointer = drag?.id;
    drag = null;
    if (pointer !== undefined && handle.hasPointerCapture(pointer))
      handle.releasePointerCapture(pointer);
    clearMotion();
    suppressClick = false;
    mark(value && mobile.matches);
  }
  function prepare() {
    const height = panel.getBoundingClientRect().height;
    const wasCollapsed = collapsed();
    clearMotion();
    panel.classList.remove("collapsed");
    const expanded = panel.getBoundingClientRect().height;
    panel.classList.add("collapsed");
    const minimum = panel.getBoundingClientRect().height;
    panel.classList.remove("collapsed");
    panel.classList.add("panel-sizing");
    panel.style.height = `${height}px`;
    return { height, expanded, minimum, wasCollapsed };
  }
  function settle(motion, value) {
    const from = panel.getBoundingClientRect().height;
    const to = value ? motion.minimum : motion.expanded;
    panel.style.height = `${to}px`;
    const finish = () => {
      clearMotion();
      mark(value);
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      return finish();
    animation = panel.animate(
      [{ height: `${from}px` }, { height: `${to}px` }],
      { duration: 260, easing: "cubic-bezier(.22, 1, .36, 1)" },
    );
    animation.onfinish = finish;
  }
  handle.addEventListener("click", (event) => {
    if (!mobile.matches) return;
    if (suppressClick && event.detail !== 0) {
      suppressClick = false;
      return;
    }
    suppressClick = false;
    const motion = prepare();
    settle(motion, !motion.wasCollapsed);
  });
  handle.addEventListener("pointerdown", (event) => {
    if (!mobile.matches || event.button !== 0 || !event.isPrimary) return;
    reset(collapsed());
    document.activeElement?.blur();
    drag = {
      ...prepare(), id: event.pointerId, y: event.clientY,
      lastY: event.clientY, lastTime: event.timeStamp, velocity: 0, moved: false,
    };
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const delta = event.clientY - drag.y;
    drag.moved ||= Math.abs(delta) > 4;
    const elapsed = event.timeStamp - drag.lastTime;
    if (elapsed > 0) drag.velocity = (event.clientY - drag.lastY) / elapsed;
    drag.lastY = event.clientY;
    drag.lastTime = event.timeStamp;
    panel.style.height = `${draggedSheetHeight(drag.height, delta, 1, drag.minimum, drag.expanded)}px`;
  });
  function finish(event, cancelled = false) {
    if (!drag || drag.id !== event.pointerId) return;
    const motion = drag;
    drag = null;
    if (handle.hasPointerCapture(event.pointerId))
      handle.releasePointerCapture(event.pointerId);
    suppressClick = motion.moved;
    if (!motion.moved && !cancelled) {
      clearMotion();
      mark(motion.wasCollapsed);
      return;
    }
    const velocity = event.timeStamp - motion.lastTime > 100 ? 0 : motion.velocity;
    const value = cancelled ? motion.wasCollapsed : shouldCollapseSheet(
      panel.getBoundingClientRect().height, velocity, motion.minimum, motion.expanded,
    );
    settle(motion, value);
  }
  handle.addEventListener("pointerup", (event) => finish(event));
  handle.addEventListener("pointercancel", (event) => finish(event, true));
  handle.addEventListener("lostpointercapture", (event) => finish(event, true));
  mobile.addEventListener("change", () => reset());
  // 회전·키보드로 표시 영역이 바뀌어도 이전 드래그 높이를 남기지 않습니다.
  window.addEventListener("resize", () => reset(collapsed()));
  mark(false);
  return { reset, collapse: () => reset(true) };
}
