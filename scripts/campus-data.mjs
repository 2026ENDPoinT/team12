import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

// 서울과기대 외 학교 지도 JSON(data/campuses/*.json, prepare-osm-campus.py로 생성)을
// 배포 폴더로 복사합니다. 앱은 #campus/<id>를 열 때 dist/data/campuses/<id>.json을 받습니다.
export async function copyCampusData({
  src = "data/campuses",
  out = "dist/data/campuses",
} = {}) {
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  const files = (await readdir(src).catch(() => [])).filter((name) =>
    name.endsWith(".json"),
  );
  for (const name of files) await copyFile(join(src, name), join(out, name));
  return files.length;
}
