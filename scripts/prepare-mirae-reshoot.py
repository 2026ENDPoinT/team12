"""재촬영 패키지와 2층 영상을 Git 제외 로컬 자산으로 준비합니다."""
import argparse
import json
import math
import pathlib
import shutil
import statistics
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--package", type=pathlib.Path, default=ROOT / "mirae_reshoot_v2")
    parser.add_argument("--video", type=pathlib.Path, default=ROOT / "2층.mp4")
    parser.add_argument("--ffmpeg", default=shutil.which("ffmpeg"))
    parser.add_argument("--legacy-photo-ref", default="a8aeab7")
    args = parser.parse_args()
    ffmpeg = args.ffmpeg or ROOT / "demo-automation/node_modules/ffmpeg-static/ffmpeg.exe"
    if not pathlib.Path(ffmpeg).is_file():
        parser.error("ffmpeg 실행 파일을 --ffmpeg로 지정해 주세요.")
    if not args.video.is_file():
        parser.error(f"촬영 영상이 없습니다: {args.video}")
    sv = json.loads((args.package / "sv.json").read_text(encoding="utf8"))
    poses = json.loads((args.package / "poses_all.json").read_text(encoding="utf8"))
    old = json.loads((ROOT / "data/mirae/sv.json").read_text(encoding="utf8"))
    out = ROOT / "data/mirae-local"
    (out / "sv").mkdir(parents=True, exist_ok=True)
    legacy = [dict(s, v="legacy-B1") for s in old["shots"] if s["f"] == 0]
    sv["videos"]["legacy-B1"] = {"K": old["K"]}
    sv["shots"] = legacy + sv["shots"]
    for shot in sv["shots"]:
        if not isinstance(shot["id"], int) or shot["id"] < 0:
            raise ValueError("잘못된 사진 ID")
        name = f"{shot['id']:05d}.jpg"
        target = out / "sv" / name
        if shot["v"] == "legacy-B1":
            if not target.exists():
                # 기존 B1 사진은 저장소 이력에서 읽기만 하며 새 커밋에 넣지 않습니다.
                with target.open("wb") as stream:
                    subprocess.run(["git", "show", f"{args.legacy_photo_ref}:data/mirae/sv/{name}"], cwd=ROOT, stdout=stream, check=True)
        else:
            shutil.copy2(args.package / "sv" / name, target)
    (out / "sv.json").write_text(json.dumps(sv, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
    subprocess.run([sys.executable, str(ROOT / "scripts/build-ar-index.py"), str(out / "sv"), str(out / "sv.json"), str(out / "ar-index.bin")], cwd=ROOT, check=True)
    start, end = 12, 104
    track = [s for s in poses["shots"] if s["v"] == "2F1" and start <= s["t"] <= end]
    if not track:
        raise ValueError("2층 데모 구간의 카메라 자세가 없습니다.")
    meta = {
        "video": "demo.mp4", "floor": 2, "from": "2:226", "to": "2:219",
        "note": "2층 동쪽 복도 → 북쪽 복도 → 219호. 위치는 사진 비교로 추정하며, 자세 표본은 기울기·롤 보정에만 사용합니다.",
        "fps": 24, "frameOffset": start * 24, "sourceStart": start, "sourceEnd": end,
        "K": poses["videos"]["2F1"]["K"],
        "pitchDeg": statistics.median(math.degrees(math.asin(s["R"][8])) for s in track),
        "eyeHeight": round(statistics.median(s["z"] - 4.2 for s in track), 3),
        "start": {"f": 2, "x": track[0]["x"], "y": track[0]["y"], "name": "2층 동쪽 복도 · 226호 인근"},
        "attitudes": [{"t": round(s["t"] - start, 3), "R": s["R"]} for s in track],
        "waypoints": [{"f": 2, "x": s["x"], "y": s["y"]} for t in [22, 32, 42, 52, 72, 80, 88]
                      for s in [min(track, key=lambda s: abs(s["t"] - t))]],
    }
    (out / "demo.json").write_text(json.dumps(meta, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
    subprocess.run([str(ffmpeg), "-hide_banner", "-loglevel", "warning", "-y", "-ss", str(start), "-i", str(args.video), "-t", str(end - start), "-an", "-vf", "scale=960:540", "-c:v", "libx264", "-crf", "24", "-preset", "fast", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out / "demo.mp4")], check=True)
    print(f"로컬 자산: {out}, 사진 {len(sv['shots'])}장, 2층 데모 {end-start}초")


if __name__ == "__main__":
    main()
