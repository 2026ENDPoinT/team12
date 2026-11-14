// 관리자 기능: 신고 검토·확정(길 선택), 관리자 로그인·편집기 진입, 건물 공사, 사진 정리.
// src/app.js에서 기능별로 나눈 파일입니다(동작 변경 없음). 버튼 연결 등 시작 코드는 initAdmin()에서 실행합니다.
import { reportLocation, gpsDistance, reasonLabel } from "../reports.mjs";
import {
  confirmReportRows,
  deleteReportRows,
  cleanupOrphanPhotos,
  photoUrlFor,
  fetchWorkRows,
  insertWorkRow,
  deleteWorkRow,
  getAdminSession,
  signInAdmin,
  signOutAdmin,
  isAdminUser,
  supabase,
} from "../backend.mjs";
import {
  activeWorks,
  buildingLabel,
  worksPeriod,
  today,
} from "../buildings.mjs";
import { BUILDINGS } from "../data.mjs";
import { setupEditMode, EDIT_MODE } from "../edit-mode.js";
import { $, $$, side, el } from "./dom.mjs";
import { map, toast, loadShortcuts, stopShortcutPicking } from "../app.js";
import { clusters, reporting, loadReports } from "./report.js";

// 관리자 로그인 상태(Supabase Auth가 알려 줌)와 등록된 건물 공사 목록
export let adminAuthenticated = false;
let works = [];

function adminButton(label, act, onClick) {
  const button = el("button", "", label);
  button.type = "button";
  button.dataset.act = act;
  button.onclick = onClick;
  return button;
}
async function adminAction(work, failMessage) {
  try {
    await work();
  } catch {
    toast(failMessage);
  } finally {
    // DB 일부가 먼저 바뀐 뒤 다음 단계가 실패해도 목록은 실제 서버 상태로 맞춥니다.
    await loadReports();
  }
}
function clusterHeading(li, cluster, summary) {
  li.append(
    el("b", "", reportLocation(cluster.cover)),
    el("small", "", summary),
  );
}
// 사진 한 장: 고르기(라디오) + 사유·시각 + 크게 보기 + 이 신고만 빼기
function enablePhotoDrag(photos) {
  photos.tabIndex = 0;
  photos.setAttribute("aria-label", "신고 사진 목록, 좌우로 스크롤");
  let drag = null;
  let suppressClick = false;
  photos.addEventListener("pointerdown", (event) => {
    // 터치는 브라우저의 기본 스크롤을 사용하고 버튼·라디오는 그대로 작동합니다.
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      event.target.closest("button, a, input")
    )
      return;
    suppressClick = false;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      left: photos.scrollLeft,
      moved: false,
    };
  });
  photos.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const offset = event.clientX - drag.x;
    if (!drag.moved && Math.abs(offset) < 6) return;
    drag.moved = true;
    photos.setPointerCapture(event.pointerId);
    photos.classList.add("is-dragging");
    photos.scrollLeft = drag.left - offset;
    event.preventDefault();
  });
  const finish = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    suppressClick = drag.moved;
    drag = null;
    photos.classList.remove("is-dragging");
    if (photos.hasPointerCapture(event.pointerId))
      photos.releasePointerCapture(event.pointerId);
  };
  photos.addEventListener("pointerup", finish);
  photos.addEventListener("pointercancel", finish);
  photos.addEventListener("pointerleave", (event) => {
    if (drag && !drag.moved) finish(event);
  });
  photos.addEventListener(
    "click",
    (event) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );
}
function photoCard(cluster, report, { selectable }) {
  const card = el("li", "admin-photo");
  const label = el("label");
  if (selectable) {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `cover-${cluster.id}`;
    radio.value = report.id;
    radio.checked = report.id === cluster.cover.id;
    radio.setAttribute("aria-label", "대표 사진으로 고르기");
    label.append(radio);
  }
  const url = photoUrlFor(report.photoPath);
  if (url) {
    const img = el("img");
    img.src = url;
    img.alt = `${reasonLabel(report)} 신고 사진`;
    img.loading = "lazy";
    img.draggable = false;
    label.append(img);
  } else label.append(el("span", "admin-photo-empty", "사진 없음"));
  // 촬영 시각과, 촬영한 GPS 위치에서 신고 지점까지 거리·GPS 정확도(현장 신고 판단 근거)
  const away = gpsDistance(report),
    gpsInfo =
      away === null
        ? "GPS 정보 없음"
        : `촬영 위치에서 ${Math.round(away)}m · GPS ±${Math.round(report.gps.accuracy ?? 0)}m`;
  card.append(
    label,
    el(
      "small",
      "",
      `${reasonLabel(report)} · ${new Date(report.takenAt || report.createdAt).toLocaleString("ko-KR")}`,
    ),
    el("small", "admin-photo-gps", gpsInfo),
  );
  const actions = el("div", "admin-photo-actions");
  if (url) {
    const open = el("a", "", "크게 보기");
    open.href = url;
    open.target = "_blank";
    open.rel = "noopener";
    actions.append(open);
  }
  if (selectable && cluster.reports.length > 1)
    actions.append(
      adminButton("이 신고 빼기", "remove-one", () =>
        adminAction(
          () => deleteReportRows([report.id]),
          "신고를 빼지 못했어요. 다시 시도해주세요.",
        ),
      ),
    );
  card.append(actions);
  return card;
}
// 관리자 확정: 신고 위치가 아니라 관리자가 지도에서 고른 실제 길(간선)을 막습니다.
// 고른 간선 ID는 confirmed_edge_id로 저장되고, confirmedEdgesFromRows → availableEdges로 경로에서 빠집니다.
export let adminRoadConfirmation = null;
function stopAdminRoadPicking({ reopen = false } = {}) {
  adminRoadConfirmation = null;
  $("#admin-road-picker").hidden = true;
  $("#admin-road-picker-confirm").disabled = true;
  map?.setRoadPicker(null);
  map?.clearReportSelection();
  if (reopen) openAdminPanel("reports");
}
function startAdminRoadPicking(cluster, coverId) {
  stopShortcutPicking();
  adminRoadConfirmation = {
    ids: cluster.reports.map((report) => report.id),
    coverId,
    selection: null,
  };
  $("#admin-dialog").close();
  $("#admin-road-picker").hidden = false;
  $("#admin-road-picker-confirm").disabled = true;
  $("#admin-road-picker-status").textContent =
    "신고 위치와 실제 통제 구간이 다르면 올바른 길을 선택할 수 있어요.";
  map?.focusTop(cluster.cover.point, 5);
  map?.previewReportSelection({ edgeId: cluster.cover.edgeId });
  map?.setRoadPicker((selection) => {
    if (selection?.error) {
      toast(selection.error);
      return;
    }
    if (!selection?.edgeId) return;
    adminRoadConfirmation.selection = selection;
    $("#admin-road-picker-status").textContent =
      `${reportLocation({ point: selection.point })} · 선택 완료`;
    $("#admin-road-picker-confirm").disabled = false;
  });
}
function renderAdminSection(listId, emptyId, list) {
  $(emptyId).hidden = list.length > 0;
  $(listId).replaceChildren();
  for (const cluster of list) {
    const li = el("li", "admin-item");
    clusterHeading(
      li,
      cluster,
      `신고 ${cluster.count}건 · 기기 ${cluster.deviceCount}대 · 최근 ${new Date(cluster.latestAt).toLocaleString("ko-KR")}`,
    );
    const photos = el("ul", "admin-photos");
    enablePhotoDrag(photos);
    for (const report of cluster.reports)
      photos.append(photoCard(cluster, report, { selectable: true }));
    const ids = cluster.reports.map((r) => r.id);
    const actions = el("div", "admin-actions");
    actions.append(
      adminButton("길 선택 후 확정 · 통행 막힘", "confirm", () => {
        const coverId =
          li.querySelector(`input[name="cover-${cluster.id}"]:checked`)
            ?.value || cluster.cover.id;
        startAdminRoadPicking(cluster, coverId);
      }),
      adminButton("반려 · 신고 취소", "dismiss", () =>
        adminAction(
          () => deleteReportRows(ids),
          "반려 처리에 실패했어요. 다시 시도해주세요.",
        ),
      ),
    );
    li.append(photos, actions);
    $(listId).append(li);
  }
}
// 확정된(빨간색) 구역: 사용자에게 보이는 대표 사진과 함께 보여 주고, 공사가 끝나면 해제합니다.
function renderConfirmedSection() {
  const list = clusters.filter((c) => c.status === "confirmed");
  $("#admin-empty-confirmed").hidden = list.length > 0;
  $("#admin-list-confirmed").replaceChildren();
  for (const cluster of list) {
    const li = el("li", "admin-item");
    clusterHeading(
      li,
      cluster,
      `통행 막힘(확정) · 신고 ${cluster.count}건 · 사용자에게 보이는 대표 사진`,
    );
    const photos = el("ul", "admin-photos");
    enablePhotoDrag(photos);
    photos.append(photoCard(cluster, cluster.cover, { selectable: false }));
    const actions = el("div", "admin-actions");
    actions.append(
      adminButton("해제 · 공사 끝남", "release", async () => {
        await adminAction(
          () => deleteReportRows(cluster.reports.map((r) => r.id)),
          "확정 해제에 실패했어요. 다시 시도해주세요.",
        );
        toast("확정을 해제했어요. 이 구간은 다시 경로에 포함돼요.");
      }),
    );
    li.append(photos, actions);
    $("#admin-list-confirmed").append(li);
  }
}
export function renderAdminPanel() {
  renderConfirmedSection();
  const open = clusters.filter((c) => c.status !== "confirmed");
  renderAdminSection(
    "#admin-list-urgent",
    "#admin-empty-urgent",
    open.filter((c) => c.needsReview),
  );
  renderAdminSection(
    "#admin-list-minor",
    "#admin-empty-minor",
    open.filter((c) => !c.needsReview),
  );
}
// 진입 버튼은 누구나 보지만 검토 건수는 관리자 세션이 확인된 뒤에만 보여줍니다.
export function renderAdminAlert() {
  const count = adminAuthenticated
    ? clusters.filter((c) => c.needsReview).length
    : 0;
  for (const id of [
    "#admin-alert-count",
    "#v2-admin-count",
    "#side-alert-count",
    "#admin-menu-count",
  ]) {
    $(id).textContent = count;
    $(id).hidden = count === 0;
  }
}
function setAdminTab(tab) {
  $$("[data-admin-tab]").forEach((button) => {
    const active = button.dataset.adminTab === tab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  $$("[data-admin-panel]").forEach((panel) =>
    panel.classList.toggle("is-active", panel.dataset.adminPanel === tab),
  );
}
export function openAdminPanel(tab = "reports") {
  renderAdminPanel();
  renderWorkList();
  setAdminTab(tab);
  $("#admin-dialog").showModal();
  loadShortcuts();
}
// ===== 관리자·편집기 진입 (사이드바·모바일 버튼) =====
// 관리자 계정으로 로그인한 뒤 편집기(?edit)와 관리자 검토 중 하나를 고릅니다.
// 권한은 Supabase Auth(관리자 역할)가 확인합니다.
let afterAdminLogin = openAdminPanel;
function openAdminMenu() {
  $("#admin-menu-editor-title").textContent = EDIT_MODE
    ? "편집기 닫기"
    : "편집기 열기";
  const count = $("#admin-alert-count").textContent;
  $("#admin-menu-count").textContent = count;
  $("#admin-menu-count").hidden = !Number(count);
  $("#admin-menu-dialog").showModal();
}
export async function openAdminEntry() {
  try {
    if (await getAdminSession()) return openAdminMenu();
  } catch {
    toast("관리자 로그인 상태를 확인하지 못했어요.");
    return;
  }
  afterAdminLogin = openAdminMenu;
  $("#admin-login-error").hidden = true;
  $("#admin-login-dialog").showModal();
}
// ?edit 주소로 들어오면 관리자 로그인부터 확인하고, 관리자일 때만 편집기를 켭니다.
// 로그인 창을 그냥 닫으면 편집기 없이 일반 지도 화면으로 둡니다.
export async function startEditModeAfterLogin(ctx) {
  // 편집기가 켜지면 관리자·편집기 버튼을 눌린(active) 상태로 보여 줍니다.
  const start = () => {
    setupEditMode(ctx);
    if (!$("#graph-overlay-toggle")) return;
    side("alerts").setAttribute("aria-pressed", "true");
    $("#v2-admin").setAttribute("aria-pressed", "true");
  };
  try {
    if (await getAdminSession()) return start();
  } catch {
    toast("관리자 로그인 상태를 확인하지 못해 편집기를 열지 않았어요.");
    return;
  }
  afterAdminLogin = start;
  $("#admin-login-error").hidden = true;
  $("#admin-login-dialog").showModal();
  // 로그인 창이 닫히는 순간(open 속성이 빠질 때)을 지켜보다가, 편집기가 켜지지 않았으면 안내합니다.
  const watcher = new MutationObserver(() => {
    if ($("#admin-login-dialog").open) return;
    watcher.disconnect();
    setTimeout(() => {
      if (!$("#graph-overlay-toggle"))
        toast("편집기는 관리자 로그인 후에 쓸 수 있어요.");
    });
  });
  watcher.observe($("#admin-login-dialog"), {
    attributes: true,
    attributeFilter: ["open"],
  });
}

// ===== 건물 공사 (관리자가 건물을 골라 기간과 함께 등록 → 지도에 🚧 표시만, 경로는 그대로) =====
export async function loadWorks() {
  let rows;
  try {
    rows = await fetchWorkRows();
  } catch {
    return; // 공사 표시는 부가 기능이라 실패해도 조용히 넘어갑니다.
  }
  works = activeWorks(rows);
  map?.setWorks(works);
  renderWorkList();
}
function renderWorkList() {
  $("#work-empty").hidden = works.length > 0;
  $("#work-list").replaceChildren();
  for (const work of works) {
    const b = BUILDINGS.find((x) => x.id === work.buildingId),
      li = document.createElement("li");
    li.className = "admin-item";
    li.innerHTML =
      '<b></b><small></small><div class="admin-actions"><button type="button">공사 해제</button></div>';
    li.querySelector("b").textContent = `🚧 ${buildingLabel(b)}`;
    li.querySelector("small").textContent =
      worksPeriod(work) + (work.note ? ` · ${work.note}` : "");
    li.querySelector("button").onclick = async () => {
      try {
        await deleteWorkRow(work.id);
      } catch {
        toast("공사 해제에 실패했어요. 다시 시도해주세요.");
        return;
      }
      await loadWorks();
    };
    $("#work-list").append(li);
  }
}

// app.js가 예전 이 코드가 있던 자리에서 한 번 부릅니다(버튼 연결, 공사 목록 처음 읽기 등).
export function initAdmin() {
  $("#admin-road-picker-cancel").onclick = () =>
    stopAdminRoadPicking({ reopen: true });
  $("#admin-road-picker-confirm").onclick = async () => {
    const pending = adminRoadConfirmation,
      button = $("#admin-road-picker-confirm");
    if (!pending?.selection?.edgeId || button.disabled) return;
    button.disabled = true;
    let confirmed = false;
    try {
      await confirmReportRows(
        pending.ids,
        pending.coverId,
        pending.selection.edgeId,
      );
      confirmed = true;
    } catch {
      toast("확정 처리에 실패했어요. 다시 시도해주세요.");
    }
    // 성공·실패와 관계없이 서버 상태로 목록을 다시 읽고 관리자 창을 다시 엽니다(확정됨 목록으로 이동).
    await loadReports();
    stopAdminRoadPicking({ reopen: true });
    if (confirmed) toast("선택한 길을 통행 막힘으로 확정했어요.");
  };
  // 관리자 화면은 ?admin=1에서만 노출하고, 실제 권한은 Supabase Auth + RLS가 검사합니다.
  $("#admin-toggle").hidden = !new URLSearchParams(location.search).has(
    "admin",
  );
  $$("[data-admin-tab]").forEach(
    (button) => (button.onclick = () => setAdminTab(button.dataset.adminTab)),
  );
  $("#v2-admin").onclick = () => openAdminEntry();
  $("#admin-menu-editor").onclick = () => {
    // 편집기는 주소의 ?edit로 켜고 끕니다(지금 보던 화면 주소는 그대로).
    const url = new URL(location.href);
    if (EDIT_MODE) url.searchParams.delete("edit");
    else url.searchParams.set("edit", "1");
    location.assign(url.href);
  };
  $("#admin-menu-review").onclick = () => {
    $("#admin-menu-dialog").close();
    openAdminPanel();
  };
  $("#admin-menu-logout").onclick = async () => {
    try {
      await signOutAdmin();
    } catch {
      toast("로그아웃하지 못했어요. 다시 시도해 주세요.");
      return;
    }
    $("#admin-menu-dialog").close();
    toast("관리자 계정에서 로그아웃했어요.");
  };
  $("#admin-toggle").onclick = async () => {
    try {
      if (await getAdminSession()) return openAdminPanel();
      afterAdminLogin = openAdminPanel;
    } catch {
      toast("관리자 로그인 상태를 확인하지 못했어요.");
      return;
    }
    $("#admin-login-error").hidden = true;
    $("#admin-login-dialog").showModal();
  };
  $("#admin-login-form").onsubmit = async (event) => {
    event.preventDefault();
    const button = $("#admin-login-submit"),
      error = $("#admin-login-error");
    button.disabled = true;
    error.hidden = true;
    try {
      await signInAdmin(
        $("#admin-email").value.trim(),
        $("#admin-password").value,
      );
    } catch {
      error.textContent = "관리자 계정 또는 비밀번호를 확인해 주세요.";
      error.hidden = false;
      return;
    } finally {
      button.disabled = false;
    }
    $("#admin-password").value = "";
    $("#admin-login-dialog").close();
    afterAdminLogin();
  };
  $("#admin-logout").onclick = async () => {
    try {
      await signOutAdmin();
    } catch {
      toast("로그아웃하지 못했어요. 다시 시도해 주세요.");
      return;
    }
    $("#admin-dialog").close();
    toast("관리자 계정에서 로그아웃했어요.");
  };

  // 초기 세션 복원·로그인·로그아웃·토큰 갱신 때 같은 권한 기준으로 배지를 갱신합니다.
  // 콜백에서는 Auth API를 다시 호출하지 않고 전달받은 세션만 확인합니다.
  supabase.auth.onAuthStateChange((_event, session) => {
    adminAuthenticated = isAdminUser(session?.user);
    renderAdminAlert();
  });
  for (const b of BUILDINGS.filter(
    (b) => b.name !== "교내 건물" && b.name !== "조형물",
  ).sort((a, b) => a.name.localeCompare(b.name, "ko"))) {
    const option = document.createElement("option");
    option.value = b.id;
    option.textContent = buildingLabel(b);
    $("#work-building").append(option);
  }
  $("#work-start").value = today();
  $("#work-form").onsubmit = async (e) => {
    e.preventDefault();
    const start = $("#work-start").value,
      end = $("#work-end").value;
    if (start > end) {
      toast("종료일이 시작일보다 빠를 수 없어요.");
      return;
    }
    try {
      await insertWorkRow({
        buildingId: $("#work-building").value,
        start,
        end,
        note: $("#work-note").value.trim(),
      });
    } catch {
      toast("공사 등록에 실패했어요. 다시 시도해주세요.");
      return;
    }
    $("#work-note").value = "";
    $("#work-end").value = "";
    await loadWorks();
  };
  loadWorks();

  // 관리자 "사진 정리": 신고와 연결되지 않은 지 하루 넘은 사진을 Storage에서 지웁니다.
  $("#photo-cleanup").onclick = async () => {
    const button = $("#photo-cleanup"),
      status = $("#photo-cleanup-status");
    button.disabled = true;
    status.hidden = false;
    status.textContent = "사진을 확인하고 있어요…";
    try {
      const { checked, removed } = await cleanupOrphanPhotos();
      status.textContent = removed
        ? `사진 ${checked}장 중 남아 있던 ${removed}장을 지웠어요.`
        : `사진 ${checked}장을 확인했어요. 지울 사진이 없어요.`;
    } catch {
      status.textContent =
        "사진 정리에 실패했어요. 관리자 로그인을 확인해주세요.";
    } finally {
      button.disabled = false;
    }
  };
}
