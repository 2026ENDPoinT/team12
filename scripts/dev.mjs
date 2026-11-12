import { context } from "esbuild";
import { existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { networkInterfaces } from "node:os";
import { copyIndoorAssets } from "./indoor-assets.mjs";

// IntelliJ 터미널에서 npm run dev 실행 → 파일 저장 → 브라우저 새로고침.
// npm run dev:phone 은 같은 와이파이의 휴대폰에서 열 수 있게 HTTPS(자체 서명)로 띄웁니다.
// (카메라·센서는 HTTPS에서만 동작합니다.)
const phone = process.argv.includes("--phone");
const opts = {
  bundle: true,
  format: "iife",
  target: "es2020",
  sourcemap: true,
};
const contexts = await Promise.all([
  context({ ...opts, entryPoints: ["src/app.js"], outfile: "dist/app.js" }),
  context({
    ...opts,
    entryPoints: ["src/indoor/main.js"],
    outfile: "dist/indoor/indoor.js",
  }),
  context({
    ...opts,
    entryPoints: ["src/indoor/ar/worker.js"],
    outfile: "dist/indoor/ar-worker.js",
  }),
]);
await copyIndoorAssets();
await Promise.all(contexts.map((c) => c.watch()));

const serveOpts = {
  servedir: "dist",
  host: phone ? "0.0.0.0" : "127.0.0.1",
  port: 4173,
};
if (phone) {
  if (!existsSync(".cert/key.pem")) {
    mkdirSync(".cert", { recursive: true });
    execFileSync(
      "openssl",
      [
        "req",
        "-x509",
        "-newkey",
        "rsa:2048",
        "-nodes",
        "-days",
        "30",
        "-keyout",
        ".cert/key.pem",
        "-out",
        ".cert/cert.pem",
        "-subj",
        "/CN=sai-dev",
      ],
      { stdio: "ignore" },
    );
  }
  serveOpts.keyfile = ".cert/key.pem";
  serveOpts.certfile = ".cert/cert.pem";
}
await contexts[0].serve(serveOpts);
if (phone) {
  const ips = Object.values(networkInterfaces())
    .flat()
    .filter((i) => i && i.family === "IPv4" && !i.internal)
    .map((i) => i.address);
  console.log("휴대폰에서 열기 (같은 와이파이, 인증서 경고는 '계속'):");
  for (const ip of ips) console.log(`  https://${ip}:4173/indoor/`);
} else
  console.log(
    "사이 개발 서버: http://127.0.0.1:4173  · 미래관 실내: http://127.0.0.1:4173/indoor/",
  );
console.log(
  "src를 수정하면 자동 빌드됩니다. 화면은 브라우저에서 새로고침하세요.",
);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, async () => {
    await Promise.all(contexts.map((c) => c.dispose()));
    process.exit(0);
  });
}
