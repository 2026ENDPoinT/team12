import { createClient } from "@supabase/supabase-js";
import { orphanPhotos } from "./reports.mjs";

// Supabase 프로젝트 연결 정보. anon/publishable 키는 RLS로 보호되는 공개 키라
// 커밋해도 괜찮습니다 (service_role 키는 절대 여기 두지 마세요).
const SUPABASE_URL = "https://jydziqwmhjlwlsoiegdd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_nlLz8LxRU7-DborGMtCnrQ_iDb8PjKR";
const PHOTO_BUCKET = "report-photos";

// 관리자 로그인 유지 범위:
// - 편집기 열기·닫기(?edit로 페이지를 다시 엶), 실내 지도에 갔다 돌아오기 → 로그인 유지
// - 새로고침 → 로그인 해제(다시 인증), 탭을 닫으면 → 로그인 해제(sessionStorage는 탭과 함께 사라짐)
// 그래서 세션을 이 탭의 sessionStorage에 두고, 이번 페이지 열기가 "새로고침"일 때만 지웁니다.
export const AUTH_STORAGE_KEY = "sai:seoultech:admin-auth";
const navigationType = () => {
  try {
    return performance.getEntriesByType("navigation")[0]?.type;
  } catch {
    return undefined;
  }
};
export function authStorage({
  storage = globalThis.sessionStorage,
  type = navigationType(),
} = {}) {
  if (!storage) return undefined;
  if (type === "reload")
    try {
      storage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // 저장소를 못 쓰는 환경(사생활 보호 모드 등)에서는 지울 것도 없습니다.
    }
  return storage;
}
const sessionStore = authStorage();
export const AUTH_OPTIONS = {
  auth: sessionStore
    ? {
        persistSession: true,
        storage: sessionStore,
        storageKey: AUTH_STORAGE_KEY,
      }
    : { persistSession: false },
};
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  AUTH_OPTIONS,
);

// 권한 판정에는 사용자가 직접 바꿀 수 없는 app_metadata만 사용합니다.
export const isAdminUser = (user) => user?.app_metadata?.role === "admin";

export async function getAdminSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return isAdminUser(data.session?.user) ? data.session : null;
}

export async function signInAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (!isAdminUser(data.user)) {
    await supabase.auth.signOut();
    throw new Error("관리자 권한이 없는 계정입니다.");
  }
  return data.user;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// 같은 사람이 같은 구간을 여러 번 눌러서 신고 건수를 부풀리는 걸 막기 위한
// 이 브라우저만의 익명 ID입니다. 개인정보를 담지 않습니다.
const DEVICE_ID_KEY = "sai:seoultech:device-id:v1";
export function getDeviceId() {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      // randomUUID는 https·localhost에서만 있습니다. 같은 와이파이 http 주소에서도 되도록 대체합니다.
      id =
        crypto.randomUUID?.() ??
        Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) =>
          b.toString(16).padStart(2, "0"),
        ).join("");
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export async function fetchReportRows() {
  const { data, error } = await supabase.from("road_reports").select("*");
  if (error) throw error;
  return data;
}

export async function insertReportRow({
  edgeId,
  point,
  reason,
  reasonNote,
  photoPath,
  gps,
  takenAt,
}) {
  const { error } = await supabase.from("road_reports").insert({
    edge_id: edgeId,
    point_x: point.x,
    point_z: point.z,
    reason,
    reason_note: reason === "other" ? reasonNote : null,
    photo_path: photoPath,
    // 신고를 시작할 때 GPS 위치(캠퍼스 미터 좌표)와 정확도, 사진 촬영 시각
    gps_x: gps?.x ?? null,
    gps_z: gps?.z ?? null,
    gps_accuracy: gps?.accuracy ?? null,
    taken_at: takenAt || null,
    reporter_device_id: getDeviceId(),
  });
  if (error) throw error;
}

// 관리자 확정: 구역의 모든 신고를 confirmed로 바꾸고(행은 기록으로 남김), 고른 사진 하나를
// 대표(is_cover)로 표시합니다. 대표 사진은 사용자에게 빨간색 표시와 함께 보입니다.
export async function confirmReportRows(ids, coverId) {
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !isAdminUser(auth.user))
    throw new Error("관리자 로그인이 필요합니다.");
  const { data, error } = await supabase
    .from("road_reports")
    .update({
      status: "confirmed",
      confirmed_at: new Date().toISOString(),
      confirmed_by: auth.user.id,
      is_cover: false,
    })
    .in("id", ids)
    .select("id");
  if (error) throw error;
  if (!data?.length) throw new Error("확정 권한이 없어 바뀐 신고가 없습니다.");
  const cover = await supabase
    .from("road_reports")
    .update({ is_cover: true })
    .eq("id", coverId);
  if (cover.error) throw cover.error;
}

// 관리자 반려·확정 해제: 그 구간 신고를 행 id로 전부 지워 집계를 처음부터 다시 시작합니다.
// edge_id가 아니라 id로 지우는 이유: 조사 데이터로 구간이 쪼개지면 화면의 구간 id와 DB의 edge_id가 다릅니다.
// RLS에 막히면 오류 없이 0건이 지워지므로, 하나도 안 지워졌으면 실패로 봅니다.
export async function deleteReportRows(ids) {
  const { data, error } = await supabase
    .from("road_reports")
    .delete()
    .in("id", ids)
    .select("id, photo_path");
  if (error) throw error;
  if (!data?.length)
    throw new Error("삭제 권한이 없어 지워진 신고가 없습니다.");
  // 지운 신고의 사진도 Storage에서 지웁니다. 사진 삭제가 실패해도 신고 삭제는 이미 끝났으므로
  // 실패로 보지 않고, 남은 사진은 관리자 "사진 정리"(cleanupOrphanPhotos)가 나중에 지웁니다.
  try {
    await removeReportPhotos(data.map((row) => row.photo_path));
  } catch (photoError) {
    console.warn(
      "신고 사진 삭제 실패(사진 정리로 다시 지울 수 있음)",
      photoError,
    );
  }
}

// Storage 사진 지우기. SQL로 storage.objects 행을 지우면 실제 파일은 남으므로 반드시 Storage API를 씁니다.
// RLS: report-photos 버킷 조회·삭제는 관리자만(20261114120000_report_photo_cleanup.sql).
export async function removeReportPhotos(paths) {
  const list = [...new Set((paths || []).filter(Boolean))];
  for (let i = 0; i < list.length; i += 100) {
    const { error } = await supabase.storage
      .from(PHOTO_BUCKET)
      .remove(list.slice(i, i + 100));
    if (error) throw error;
  }
  return list.length;
}

// 관리자 "사진 정리": 어떤 신고와도 연결되지 않은 지 24시간 넘은 사진을 지웁니다.
// 사진은 "기기ID/시각.확장자"로 저장되므로 기기 폴더마다 목록을 읽습니다.
export async function cleanupOrphanPhotos() {
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !isAdminUser(auth.user))
    throw new Error("관리자 로그인이 필요합니다.");
  const bucket = supabase.storage.from(PHOTO_BUCKET);
  const listAll = async (prefix) => {
    const items = [];
    for (let offset = 0; ; offset += 1000) {
      const { data, error } = await bucket.list(prefix, {
        limit: 1000,
        offset,
      });
      if (error) throw error;
      items.push(...data);
      if (data.length < 1000) return items;
    }
  };
  const files = [];
  for (const item of await listAll("")) {
    // 폴더는 id가 없습니다. 맨 위에 바로 놓인 파일도 함께 봅니다.
    if (item.id) {
      files.push({ path: item.name, createdAt: item.created_at });
      continue;
    }
    for (const file of await listAll(item.name))
      if (file.id)
        files.push({
          path: `${item.name}/${file.name}`,
          createdAt: file.created_at,
        });
  }
  const { data: rows, error } = await supabase
    .from("road_reports")
    .select("photo_path");
  if (error) throw error;
  const orphans = orphanPhotos(
    files,
    rows.map((row) => row.photo_path),
  );
  await removeReportPhotos(orphans);
  return { checked: files.length, removed: orphans.length };
}

export async function uploadReportPhoto(file) {
  // 한글·공백이 든 파일 이름은 Storage 경로로 쓸 수 없어 확장자만 남깁니다.
  const ext = (
    file.name.match(/\.([a-z0-9]{1,5})$/i)?.[1] || "jpg"
  ).toLowerCase();
  const path = `${getDeviceId() || "anon"}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, file);
  if (error) throw error;
  return path;
}

// ===== 건물 공사 (관리자가 등록) =====
export async function fetchWorkRows() {
  const { data, error } = await supabase.from("building_works").select("*");
  if (error) throw error;
  return data;
}

export async function insertWorkRow({ buildingId, start, end, note }) {
  const { error } = await supabase.from("building_works").insert({
    building_id: buildingId,
    start_date: start,
    end_date: end,
    note: note || null,
  });
  if (error) throw error;
}

export async function deleteWorkRow(id) {
  const { data, error } = await supabase
    .from("building_works")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) throw error;
  if (!data?.length)
    throw new Error("삭제 권한이 없어 지워진 공사가 없습니다.");
}

export function photoUrlFor(path) {
  if (!path) return null;
  return supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
}
