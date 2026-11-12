import { createClient } from "@supabase/supabase-js";

// Supabase 프로젝트 연결 정보. anon/publishable 키는 RLS로 보호되는 공개 키라
// 커밋해도 괜찮습니다 (service_role 키는 절대 여기 두지 마세요).
const SUPABASE_URL = "https://jydziqwmhjlwlsoiegdd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_nlLz8LxRU7-DborGMtCnrQ_iDb8PjKR";
const PHOTO_BUCKET = "report-photos";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
}) {
  const { error } = await supabase.from("road_reports").insert({
    edge_id: edgeId,
    point_x: point.x,
    point_z: point.z,
    reason,
    reason_note: reason === "other" ? reasonNote : null,
    photo_path: photoPath,
    reporter_device_id: getDeviceId(),
  });
  if (error) throw error;
}

export async function deleteReportRow(id) {
  const { error } = await supabase.from("road_reports").delete().eq("id", id);
  if (error) throw error;
}

// 관리자 확정: 같은 구간의 모든 신고를 confirmed로 바꿉니다 (행은 지우지 않고 기록으로 남김).
export async function confirmReportRows(ids) {
  const { data, error } = await supabase
    .from("road_reports")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .in("id", ids)
    .select("id");
  if (error) throw error;
  if (!data?.length) throw new Error("확정 권한이 없어 바뀐 신고가 없습니다.");
}

// 관리자 반려·확정 해제: 그 구간 신고를 행 id로 전부 지워 집계를 처음부터 다시 시작합니다.
// edge_id가 아니라 id로 지우는 이유: 조사 데이터로 구간이 쪼개지면 화면의 구간 id와 DB의 edge_id가 다릅니다.
// RLS에 막히면 오류 없이 0건이 지워지므로, 하나도 안 지워졌으면 실패로 봅니다.
export async function deleteReportRows(ids) {
  const { data, error } = await supabase
    .from("road_reports")
    .delete()
    .in("id", ids)
    .select("id");
  if (error) throw error;
  if (!data?.length)
    throw new Error("삭제 권한이 없어 지워진 신고가 없습니다.");
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
