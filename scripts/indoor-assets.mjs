import { cp, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";

// data/mirae → dist/indoor/assets 복사 (바뀐 파일만). dist/indoor/assets는 커밋하지 않습니다.
const SRC = "data/mirae",
  OUT = "dist/indoor/assets";
const FILES = [
  "mirae.glb",
  "mirae.json",
  "sv.json",
  "ar-index.bin",
  "entrances.json",
  "demo.mp4",
  "demo.json",
];

async function copyIfNewer(from, to) {
  if (!existsSync(from)) return 0;
  if (existsSync(to) && (await stat(to)).mtimeMs >= (await stat(from)).mtimeMs)
    return 0;
  await cp(from, to);
  return 1;
}
export async function copyIndoorAssets() {
  await mkdir(`${OUT}/sv`, { recursive: true });
  let n = 0;
  for (const f of FILES) n += await copyIfNewer(`${SRC}/${f}`, `${OUT}/${f}`);
  if (existsSync(`${SRC}/sv`))
    for (const f of await readdir(`${SRC}/sv`))
      n += await copyIfNewer(`${SRC}/sv/${f}`, `${OUT}/sv/${f}`);
  return n;
}
