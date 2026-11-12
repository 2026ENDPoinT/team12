import { build } from "esbuild";
import { rm, mkdir, copyFile, writeFile } from "node:fs/promises";
import { CAMPUS_GEOMETRY, ENTRANCES } from "../src/data.mjs";
import { createCampusGeoJson } from "../src/gis.mjs";
import { copyIndoorAssets } from "./indoor-assets.mjs";

// 개발용 소스맵을 공개 배포물에 포함하지 않습니다.
await rm("dist/app.js.map", { force: true });
await rm("dist/indoor/indoor.js.map", { force: true });
await rm("dist/indoor/ar-worker.js.map", { force: true });
const common = { bundle: true, minify: true, target: "es2020" };
await build({
  ...common,
  entryPoints: ["src/app.js"],
  format: "iife",
  outfile: "dist/app.js",
});
// 미래관 실내 지도 · AR 안내 (별도 페이지)
await build({
  ...common,
  entryPoints: ["src/indoor/main.js"],
  format: "iife",
  outfile: "dist/indoor/indoor.js",
});
await build({
  ...common,
  entryPoints: ["src/indoor/ar/worker.js"],
  format: "iife",
  outfile: "dist/indoor/ar-worker.js",
});
await copyIndoorAssets();
await mkdir("dist/data", { recursive: true });
await copyFile("data/seoultech.json", "dist/data/seoultech.json");
await copyFile(
  "data/team-survey-template.geojson",
  "dist/data/team-survey-template.geojson",
);
await writeFile(
  "dist/data/seoultech.geojson",
  JSON.stringify(createCampusGeoJson(CAMPUS_GEOMETRY, ENTRANCES)),
);
console.log("배포용 파일 생성 완료: dist/");
