import assert from "node:assert/strict";
import test from "node:test";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  PUBLIC_INDOOR_ASSETS,
  copyIndoorAssets,
} from "../scripts/indoor-assets.mjs";

test("실내 빌드는 허용된 파생 데이터만 복사하고 이전 파일을 지운다", async () => {
  const root = await mkdtemp(join(tmpdir(), "sai-indoor-assets-"));
  const src = join(root, "data");
  const out = join(root, "dist");
  try {
    await mkdir(join(src, "sv"), { recursive: true });
    await mkdir(out, { recursive: true });
    for (const name of PUBLIC_INDOOR_ASSETS)
      await writeFile(join(src, name), `public:${name}`);
    await writeFile(join(src, "sv", "00001.jpg"), "private frame");
    await writeFile(join(out, "stale.jpg"), "old deployment");

    assert.equal(
      await copyIndoorAssets({ src, out }),
      PUBLIC_INDOOR_ASSETS.length,
    );
    assert.equal(
      await readFile(join(out, "mirae.json"), "utf8"),
      "public:mirae.json",
    );
    await assert.rejects(access(join(out, "stale.jpg")));
    await assert.rejects(access(join(out, "sv", "00001.jpg")));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("필수 실내 자산이 없으면 불완전한 배포를 만들지 않는다", async () => {
  const root = await mkdtemp(join(tmpdir(), "sai-indoor-assets-missing-"));
  const src = join(root, "data");
  const out = join(root, "dist");
  try {
    await mkdir(src, { recursive: true });
    await assert.rejects(
      copyIndoorAssets({ src, out }),
      /필수 실내 자산이 없습니다/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
