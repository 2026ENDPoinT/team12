import { build } from "esbuild";
import { rm, mkdir, copyFile } from "node:fs/promises";

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
console.log("배포용 파일 생성 완료: dist/");
