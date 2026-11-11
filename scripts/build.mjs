import { build } from "esbuild";
import { rm, mkdir, copyFile, writeFile } from "node:fs/promises";
import { CAMPUS_GEOMETRY, ENTRANCES } from "../src/data.mjs";
import { createCampusGeoJson } from "../src/gis.mjs";

// 개발용 소스맵을 공개 배포물에 포함하지 않습니다.
await rm("dist/app.js.map", { force: true });
await build({
  entryPoints: ["src/app.js"],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  outfile: "dist/app.js",
});
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
