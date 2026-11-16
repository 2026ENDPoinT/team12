import {
  copyFile,
  mkdir,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";

// GitHub Pages에서 공개해도 되는 실행용 파생 데이터만 허용합니다.
// 촬영 원본(private/mirae/sv)은 이 목록에 넣지 않습니다.
export const PUBLIC_INDOOR_ASSETS = Object.freeze([
  "mirae.glb",
  "mirae.json",
  "sv.json",
  "ar-index.bin",
  "entrances.json",
  "demo.mp4",
  "demo.json",
]);

export async function copyIndoorAssets({
  src = "data/mirae",
  out = "dist/indoor/assets",
  local = "data/mirae-local",
  includeLocal = false,
} = {}) {
  const useLocal =
    includeLocal &&
    (await stat(join(local, "sv.json")).catch(() => null))?.isFile();
  const overrides = new Set([
    "sv.json",
    "ar-index.bin",
    "demo.json",
    "demo.mp4",
  ]);
  let imagery = { photos: false };
  let shots = [];
  if (useLocal) {
    const text = await readFile(join(local, "sv.json"), "utf8");
    shots = JSON.parse(text).shots;
    if (
      !Array.isArray(shots) ||
      !shots.every((s) => Number.isSafeInteger(s.id) && s.id >= 0)
    )
      throw new Error("로컬 실사 사진 목록이 올바르지 않습니다.");
    if (
      (await stat(join(local, "ar-index.bin"))).size !==
      shots.length * 46 * 20
    )
      throw new Error("로컬 사진 목록과 AR 인덱스가 일치하지 않습니다.");
    for (const name of overrides) await stat(join(local, name));
    for (const shot of shots)
      await stat(join(local, "sv", `${String(shot.id).padStart(5, "0")}.jpg`));
    imagery = {
      photos: true,
      version: createHash("sha256")
        .update(text)
        .update(await readFile(join(local, "demo.json"), "utf8"))
        .digest("hex")
        .slice(0, 12),
    };
  }
  // 이전 빌드의 사진이나 삭제된 파일이 배포물에 남지 않게 매번 새로 만듭니다.
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  for (const name of PUBLIC_INDOOR_ASSETS) {
    const from = join(useLocal && overrides.has(name) ? local : src, name);
    const info = await stat(from).catch(() => null);
    if (!info?.isFile()) throw new Error(`필수 실내 자산이 없습니다: ${from}`);
    await copyFile(from, join(out, name));
  }
  if (useLocal) {
    await mkdir(join(out, "sv"), { recursive: true });
    for (const shot of shots) {
      const name = `${String(shot.id).padStart(5, "0")}.jpg`;
      await copyFile(join(local, "sv", name), join(out, "sv", name));
    }
  }
  await writeFile(join(out, "imagery.json"), JSON.stringify(imagery));
  return PUBLIC_INDOOR_ASSETS.length;
}
