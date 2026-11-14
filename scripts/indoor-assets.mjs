import { copyFile, mkdir, rm, stat } from "node:fs/promises";
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
} = {}) {
  // 이전 빌드의 사진이나 삭제된 파일이 배포물에 남지 않게 매번 새로 만듭니다.
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  for (const name of PUBLIC_INDOOR_ASSETS) {
    const from = join(src, name);
    const info = await stat(from).catch(() => null);
    if (!info?.isFile()) throw new Error(`필수 실내 자산이 없습니다: ${from}`);
    await copyFile(from, join(out, name));
  }
  return PUBLIC_INDOOR_ASSETS.length;
}
