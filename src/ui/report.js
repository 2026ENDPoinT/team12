// 현장 공사 신고: GPS 위치로 길 고르기, 앱 안 카메라 촬영, 신고 저장·삭제, 신고 목록과 공유 신고 상태.
// src/app.js에서 기능별로 나눈 파일입니다(동작 변경 없음). 버튼 연결 등 시작 코드는 initReport()에서 실행합니다.
import { $, $$ } from "./dom.mjs";
import { renderAdminAlert, renderAdminPanel } from "./admin.js";
import {
  edgeId,
  reportLocation,
  clusterReports,
  clusterOf,
  locateReportPoint,
  sanitizeReports,
  rowToReport,
  confirmedEdgesFromRows,
  reasonLabel,
  REPORT_THRESHOLD,
} from "../reports.mjs";
import {
  fetchReportRows,
  insertReportRow,
  getDeviceId,
  deleteReportRows,
  uploadReportPhoto,
  photoUrlFor,
} from "../backend.mjs";
import { CAMPUS_GEOMETRY, NODES, EDGES } from "../data.mjs";
import { gpsToCampus } from "../geo.mjs";
import {
  map,
  gpsWatchId,
  toast,
  updateRoute,
  closeBuildingPopover,
  nearestGraphNode,
  stopShortcutPicking,
} from "../app.js";

// Supabase에서 비동기로 채워집니다 (아래 loadReports 참고). 처음엔 빈 상태로 시작합니다.
export let reports = [],
  confirmedEdges = [],
  reporting = false,
  selectedReport = null,
  // 신고를 올릴 때 Storage에 업로드할 File. 미리보기용 blob URL은 따로 관리합니다.
  selectedPhotoFile = null,
  photoPreviewUrl = null,
  // 30m 안 신고를 묶은 구역 (loadReports에서 다시 계산)
  clusters = [];
// ===== 현장 공사 신고 (GPS 위치 + 앱 안 카메라) =====
// 스윙·지쿠터처럼 지금 그 자리에서만 신고합니다. 위치는 GPS로 잡고(정확도 50m 이내, 캠퍼스 안),
// 다른 길이면 GPS 위치 30m 안에서만 다시 고를 수 있습니다. 사진은 앱 안 카메라로만 찍습니다(앨범 X).
// ponytail: GPS 위치를 조작하는 앱까지는 막지 못합니다. 더 막으려면 서버(Edge Function)에서 검증하세요.
const REPORT_MAX_ACCURACY = 50,
  REPORT_ADJUST_RADIUS = 30;
let reportOrigin = null; // 신고를 시작할 때 잡은 GPS 위치 {x, z, accuracy}
export function setReporting(value) {
  if (value) stopShortcutPicking();
  reporting = value;
  $("#report-start").classList.toggle("active", value);
  $("#report-start").setAttribute("aria-pressed", String(value));
  $("#report-start").textContent = value
    ? "× 구간 선택 취소"
    : "⚠ 공사 구간 신고";
  $("#report-picker").hidden = !value;
  map?.setReporting(value);
  if (!value) {
    map?.clearReportSelection();
    reportOrigin = null;
    if (gpsWatchId === null) map?.setUserLocation(null);
  }
  if (value) {
    closeBuildingPopover();
    $("#campus-map canvas")?.focus({ preventScroll: true });
  }
}
function startFieldReport() {
  if (!window.isSecureContext || !navigator.geolocation) {
    toast("현장 신고는 https 주소에서 위치 권한을 허용해야 할 수 있어요.");
    return;
  }
  toast("현재 위치를 확인하고 있어요…");
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      if (coords.accuracy > REPORT_MAX_ACCURACY) {
        toast(
          `GPS 정확도가 낮아요(약 ${Math.round(coords.accuracy)}m). 하늘이 트인 곳에서 다시 시도해주세요.`,
        );
        return;
      }
      const point = gpsToCampus(
        coords.latitude,
        coords.longitude,
        CAMPUS_GEOMETRY.meta,
      );
      const nearest = point && nearestGraphNode(point);
      if (!nearest || nearest.distance > 350) {
        toast("캠퍼스 안에서만 신고할 수 있어요.");
        return;
      }
      const selection = locateReportPoint(
        point,
        EDGES,
        NODES,
        REPORT_ADJUST_RADIUS,
      );
      if (!selection) {
        toast(
          `현재 위치 ${REPORT_ADJUST_RADIUS}m 안에 길이 없어요. 길 가까이에서 다시 시도해주세요.`,
        );
        return;
      }
      reportOrigin = { ...point, accuracy: coords.accuracy };
      setReporting(true);
      map?.setUserLocation(reportOrigin, { follow: true });
      map?.previewReportSelection(selection);
      openRoadReport(selection);
    },
    (error) =>
      toast(
        error.code === 1
          ? "위치 권한이 꺼져 있어요. 브라우저 설정에서 위치 권한을 허용해주세요."
          : "현재 위치를 확인하지 못했어요. 잠시 후 다시 시도해주세요.",
      ),
    { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 },
  );
}
export function openRoadReport(selection) {
  if (selection?.error) {
    toast(selection.error);
    return;
  }
  const existing = selection?.reportId
    ? reports.find((r) => r.id === selection.reportId)
    : null;
  if (!existing && (!selection?.point || !selection?.edgeId)) return;
  if (!existing) {
    if (!reportOrigin) {
      toast("⚠ 공사 신고 버튼을 눌러 현재 위치에서 신고해주세요.");
      return;
    }
    const away = Math.hypot(
      selection.point.x - reportOrigin.x,
      selection.point.z - reportOrigin.z,
    );
    if (away > REPORT_ADJUST_RADIUS) {
      map?.clearReportSelection();
      toast(
        `현재 위치(파란 점)에서 ${REPORT_ADJUST_RADIUS}m 안의 길만 고를 수 있어요.`,
      );
      return;
    }
  }
  selectedReport = existing || selection;
  const cluster = existing && clusterOf(existing.id, clusters),
    mine = existing && isMyReport(existing),
    locked = cluster?.status === "confirmed";
  const locationCard = $("#report-location"),
    locationIcon = document.createElement("span"),
    locationCopy = document.createElement("span"),
    locationName = document.createElement("b"),
    locationDetail = document.createElement("small"),
    locationStatus = document.createElement("span");
  locationIcon.className = "report-location-icon";
  locationIcon.textContent = "⌾";
  locationName.textContent = reportLocation(selectedReport).replace(
    " · 선택한 도로 구간",
    "",
  );
  locationDetail.textContent = existing
    ? reasonLabel(existing)
    : "선택한 도로 구간";
  locationStatus.className = "report-location-status";
  locationStatus.textContent = existing
    ? reportStatusLabel(existing)
    : "GPS 확인됨";
  locationCopy.append(locationName, locationDetail);
  locationCard.replaceChildren(locationIcon, locationCopy, locationStatus);
  $("#report-title").textContent = !existing
    ? "길 막힘 신고"
    : mine
      ? "이 구간에 내 신고가 있어요."
      : "이 구간의 신고";
  $("#report-reasons").hidden = !!existing;
  $("#new-report-actions").hidden = !!existing;
  $("#existing-report-actions").hidden = !existing;
  // 익명 기기 ID는 본인 증명이 아니므로 삭제는 관리자만 처리합니다.
  $("#report-remove").hidden = true;
  $("#report-photo-field").hidden = !!existing;
  resetCamera();
  $('input[name="road-reason"][value="construction"]').checked = true;
  $("#report-reason-note").value = "";
  $("#report-reason-note").hidden = true;
  updateReportSubmit();
  // 사진은 내 신고이거나, 확정된 구역의 대표 사진일 때만 사용자에게 보여 줍니다.
  // 노란색(검토 전) 단계의 다른 사람 사진은 관리자만 봅니다.
  const showPhoto = mine || (locked && cluster.cover.id === existing.id);
  const existingPhotoUrl = showPhoto && photoUrlFor(existing.photoPath);
  $("#report-existing-photo").hidden = !existingPhotoUrl;
  if (existingPhotoUrl) $("#report-existing-photo").src = existingPhotoUrl;
  $("#report-dialog .report-scope").textContent = existing
    ? `${reasonLabel(existing)} · ${reportStatusLabel(existing)} · ` +
      (locked
        ? "관리자가 확정한 신고라 삭제할 수 없어요. 공사가 끝나면 관리자가 해제합니다."
        : mine
          ? "내가 올린 신고예요. 삭제가 필요하면 관리자에게 요청해 주세요."
          : "다른 사람이 올린 신고예요.")
    : `신고 ${REPORT_THRESHOLD}건부터 지도에 표시돼요. 관리자가 확인하면 우회 경로에 반영됩니다.`;
  $("#report-dialog").showModal();
  if (!existing) startCamera();
}
let submittingReport = false;
// 사진이 있고, 기타 사유면 글까지 써야 신고 버튼이 켜집니다.
function updateReportSubmit() {
  const other = $('input[name="road-reason"]:checked').value === "other";
  $("#report-yes").disabled =
    submittingReport ||
    !selectedPhotoFile ||
    (other && !$("#report-reason-note").value.trim());
}
// 앱 안 카메라: 촬영과 다시 찍기만 있고 앨범 사진은 고를 수 없습니다.
let cameraStream = null,
  photoTakenAt = null;
function stopCamera() {
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  $("#report-camera").srcObject = null;
}
function resetCamera() {
  stopCamera();
  if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
  photoPreviewUrl = null;
  selectedPhotoFile = null;
  photoTakenAt = null;
  for (const id of [
    "#report-photo-preview",
    "#report-camera",
    "#report-shoot",
    "#report-retake",
    "#report-camera-error",
  ])
    $(id).hidden = true;
  updateReportSubmit();
}
function cameraError(message) {
  $("#report-camera-error").textContent = message;
  $("#report-camera-error").hidden = false;
}
async function startCamera() {
  resetCamera();
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraError(
      "이 브라우저에서는 카메라를 쓸 수 없어요. https 주소에서 열어주세요.",
    );
    return;
  }
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
  } catch {
    cameraError(
      "카메라 권한이 필요해요. 브라우저 설정에서 카메라를 허용해주세요.",
    );
    return;
  }
  // 권한을 묻는 사이 신고 창을 닫았으면 카메라를 바로 끕니다.
  if (!$("#report-dialog").open) return stopCamera();
  const video = $("#report-camera");
  video.srcObject = cameraStream;
  video.hidden = false;
  $("#report-shoot").hidden = false;
  await video.play().catch(() => {});
}
// 서버에서 다시 읽어와 화면을 전부 새로고침합니다 (신고 추가/삭제/확정/반려 뒤 공통으로 호출).
export async function loadReports() {
  let rows;
  try {
    rows = await fetchReportRows();
  } catch {
    toast("신고 데이터를 불러오지 못했어요. 네트워크를 확인해주세요.");
    return;
  }
  reports = sanitizeReports(rows.map(rowToReport));
  confirmedEdges = confirmedEdgesFromRows(rows);
  clusters = clusterReports(reports);
  map?.setReports(reports);
  renderReportList();
  renderAdminAlert();
  renderAdminPanel();
  updateRoute();
}
// 이 기기에서 올린 신고인지(기기 ID 비교). 기기 ID가 없는 예전 신고는 내 신고로 보지 않습니다.
function isMyReport(report) {
  return !!report.deviceId && report.deviceId === getDeviceId();
}
// 신고 상태를 사람이 읽을 문구로 바꿉니다: 접수 → 주의(노란색) → 관리자 확정(빨간색).
function reportStatusLabel(report) {
  const status = clusterOf(report.id, clusters)?.status;
  if (status === "confirmed") return "관리자 확정 · 통행 막힘";
  if (status === "caution") return "주의 표시 중 · 관리자 검토 대기";
  return `접수됨 · ${REPORT_THRESHOLD}건 이상 모이면 지도에 주의 표시`;
}
export function renderReportList() {
  const visible = clusters.filter(
    (cluster) => cluster.count >= REPORT_THRESHOLD,
  );
  $("#report-count").textContent = `주의 (${visible.length})`;
  $("#report-empty").hidden = visible.length > 0;
  $("#report-list").replaceChildren();
  for (const cluster of visible) {
    const report = cluster.cover;
    const li = document.createElement("li"),
      button = document.createElement("button");
    button.innerHTML =
      '<span aria-hidden="true">⚠</span><span><b></b><small></small></span><span>↗</span>';
    button.querySelector("b").textContent = reportLocation(report);
    button.querySelector("small").textContent =
      cluster.status === "confirmed"
        ? `${reasonLabel(report)} · 관리자 확정 · 통행 우회`
        : `${reasonLabel(report)} · 주의 (${cluster.count}건)`;
    button.onclick = () => openRoadReport({ reportId: report.id });
    li.append(button);
    $("#report-list").append(li);
  }
}

// app.js가 예전 이 코드가 있던 자리에서 한 번 부릅니다(버튼 연결 등 시작 코드).
export function initReport() {
  $("#report-start").onclick = () =>
    reporting ? setReporting(false) : startFieldReport();
  $("#report-cancel").onclick = () => setReporting(false);
  for (const radio of $$('input[name="road-reason"]'))
    radio.onchange = () => {
      const other = radio.value === "other" && radio.checked;
      $("#report-reason-note").hidden = !other;
      if (other) $("#report-reason-note").focus();
      updateReportSubmit();
    };
  $("#report-reason-note").oninput = updateReportSubmit;
  $("#report-shoot").onclick = () => {
    const video = $("#report-camera");
    if (!video.videoWidth) return;
    const scale = Math.min(1, 1600 / video.videoWidth),
      canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        stopCamera();
        selectedPhotoFile = new File([blob], "photo.jpg", {
          type: "image/jpeg",
        });
        photoTakenAt = new Date().toISOString();
        photoPreviewUrl = URL.createObjectURL(blob);
        $("#report-photo-preview").src = photoPreviewUrl;
        $("#report-photo-preview").hidden = false;
        video.hidden = true;
        $("#report-shoot").hidden = true;
        $("#report-retake").hidden = false;
        updateReportSubmit();
      },
      "image/jpeg",
      0.85,
    );
  };
  $("#report-retake").onclick = () => startCamera();
  $("#report-no").onclick = () => {
    map?.clearReportSelection();
    $("#report-dialog").close();
  };
  $("#report-keep").onclick = () => $("#report-dialog").close();
  $("#report-yes").onclick = async () => {
    if (submittingReport || !selectedReport?.point) return;
    const reason = $('input[name="road-reason"]:checked').value,
      reasonNote = $("#report-reason-note").value.trim();
    if (!selectedPhotoFile) {
      toast("현장 사진을 찍어 올려야 신고할 수 있어요.");
      return;
    }
    if (!reportOrigin) {
      toast("⚠ 공사 신고 버튼을 눌러 현재 위치에서 다시 신고해주세요.");
      return;
    }
    if (reason === "other" && !reasonNote) {
      toast("기타 사유를 적어주세요.");
      return;
    }
    const { edgeId, point } = selectedReport;
    const gps = reportOrigin;
    const takenAt = photoTakenAt;
    submittingReport = true;
    updateReportSubmit();
    try {
      let photoPath;
      try {
        photoPath = await uploadReportPhoto(selectedPhotoFile);
      } catch {
        toast("사진 업로드에 실패했어요. 다시 시도해주세요.");
        return;
      }
      try {
        await insertReportRow({
          edgeId,
          point,
          reason,
          reasonNote,
          photoPath,
          gps,
          takenAt,
        });
      } catch {
        toast("신고 저장에 실패했어요. 다시 시도해주세요.");
        return;
      }
    } finally {
      submittingReport = false;
      updateReportSubmit();
    }
    setReporting(false);
    $("#report-dialog").close();
    $("#report-success-dialog").showModal();
    await loadReports();
  };
  $("#report-remove").onclick = async () => {
    if (
      !isMyReport(selectedReport) ||
      clusterOf(selectedReport.id, clusters)?.status === "confirmed"
    )
      return;
    try {
      await deleteReportRows([selectedReport.id]);
    } catch {
      toast("삭제에 실패했어요. 다시 시도해주세요.");
      return;
    }
    $("#report-dialog").close();
    await loadReports();
  };
  $("#report-dialog").addEventListener("close", () => {
    stopCamera();
    if (!selectedReport?.id) map?.clearReportSelection();
  });
}
