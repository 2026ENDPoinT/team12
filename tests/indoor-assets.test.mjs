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

test("로컬 재촬영 사진·영상은 명시적인 로컬 빌드에서만 사용한다", async () => {
  const root = await mkdtemp(join(tmpdir(), "sai-indoor-local-"));
  const src = join(root, "public"),
    local = join(root, "local"),
    out = join(root, "dist");
  try {
    await mkdir(src, { recursive: true });
    await mkdir(join(local, "sv"), { recursive: true });
    for (const name of PUBLIC_INDOOR_ASSETS)
      await writeFile(join(src, name), `public:${name}`);
    await writeFile(
      join(local, "sv.json"),
      JSON.stringify({ shots: [{ id: 100000 }] }),
    );
    await writeFile(join(local, "ar-index.bin"), Buffer.alloc(46 * 20));
    await writeFile(join(local, "demo.json"), JSON.stringify({ floor: 2 }));
    await writeFile(join(local, "demo.mp4"), "private video");
    await writeFile(join(local, "sv", "100000.jpg"), "private image");
    await copyIndoorAssets({ src, out, local });
    assert.equal(
      JSON.parse(await readFile(join(out, "imagery.json"))).photos,
      false,
    );
    assert.equal(
      await readFile(join(out, "demo.mp4"), "utf8"),
      "public:demo.mp4",
    );
    await assert.rejects(access(join(out, "sv", "100000.jpg")));
    await copyIndoorAssets({ src, out, local, includeLocal: true });
    assert.equal(
      JSON.parse(await readFile(join(out, "imagery.json"))).photos,
      true,
    );
    assert.equal(
      await readFile(join(out, "demo.mp4"), "utf8"),
      "private video",
    );
    assert.equal(
      await readFile(join(out, "sv", "100000.jpg"), "utf8"),
      "private image",
    );
    await copyIndoorAssets({ src, out, local });
    await assert.rejects(access(join(out, "sv", "100000.jpg")));
    await writeFile(join(local, "ar-index.bin"), Buffer.alloc(1));
    await assert.rejects(
      copyIndoorAssets({ src, out, local, includeLocal: true }),
      /인덱스가 일치/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
