import { context } from "esbuild";

// IntelliJ 터미널에서 npm run dev 실행 → 파일 저장 → 브라우저 새로고침.
const build = await context({
  entryPoints: ["src/app.js"],
  bundle: true,
  format: "iife",
  target: "es2020",
  outfile: "dist/app.js",
  sourcemap: true,
});
await build.watch();
await build.serve({ servedir: "dist", host: "127.0.0.1", port: 4173 });
console.log("사이 개발 서버: http://127.0.0.1:4173");
console.log(
  "src를 수정하면 자동 빌드됩니다. 화면은 브라우저에서 새로고침하세요.",
);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, async () => {
    await build.dispose();
    process.exit(0);
  });
}
