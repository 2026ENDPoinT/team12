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
      id = crypto.randomUUID();
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

export async function insertReportRow({ edgeId, point, reason, photoPath }) {
  const { error } = await supabase.from("road_reports").insert({
    edge_id: edgeId,
    point_x: point.x,
    point_z: point.z,
    reason,
    photo_path: photoPath || null,
    reporter_device_id: getDeviceId(),
  });
  if (error) throw error;
}

export async function deleteReportRow(id) {
  const { error } = await supabase.from("road_reports").delete().eq("id", id);
  if (error) throw error;
}

// 관리자 확정: 같은 구간의 모든 신고를 confirmed로 바꿉니다 (행은 지우지 않고 기록으로 남김).
export async function confirmEdgeRows(edgeId) {
  const { error } = await supabase
    .from("road_reports")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .eq("edge_id", edgeId);
  if (error) throw error;
}

// 관리자 반려: 같은 구간의 신고를 전부 지워서 집계를 처음부터 다시 시작합니다.
export async function dismissEdgeRows(edgeId) {
  const { error } = await supabase
    .from("road_reports")
    .delete()
    .eq("edge_id", edgeId);
  if (error) throw error;
}

export async function uploadReportPhoto(file) {
  const path = `${getDeviceId() || "anon"}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, file);
  if (error) throw error;
  return path;
}

export function photoUrlFor(path) {
  if (!path) return null;
  return supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
}
