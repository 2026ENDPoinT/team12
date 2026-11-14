"""AR 위치 인식용 기준 인덱스를 만듭니다.

미래관 촬영 사진(sv/*.jpg)과 카메라 자세(sv.json)로, 사진마다 '수평 기준 원통 띠'를 만듭니다.
  - 가로: 사진 방향 기준 방위 -46°..+46° (2°/칸, 46칸, 오른쪽이 +)
  - 세로: 고도 +12°..-28° (2°/칸, 20칸, 위가 +)
카메라 기울기(R)를 보정해 펴므로, 휴대폰 화면도 같은 방식으로 펴서 좌우로 밀며 비교하면
위치와 방향을 함께 찾을 수 있습니다. 값은 흐린 밝기(0..254), 255는 사진 밖입니다.

    python scripts/build-ar-index.py

기본 경로:
  - 원본 프레임: private/mirae/sv (Git·배포 제외)
  - 카메라 자세: data/mirae/sv.json
  - 파생 인덱스: data/mirae/ar-index.bin
"""
import json, sys, math, pathlib
import numpy as np, cv2

AZ_N, EL_N, STEP, EL_TOP = 46, 20, 2.0, 12.0


def strip_rays():
    az = -AZ_N + STEP / 2 + np.arange(AZ_N) * STEP  # -45..45
    el = EL_TOP - STEP / 2 - np.arange(EL_N) * STEP  # 11..-27
    return np.meshgrid(np.radians(az), np.radians(el))


def make_strip(gray, K, R, yaw):
    fx, fy, cx, cy, W, H = K
    AZ, EL = strip_rays()
    head = math.radians(yaw) - AZ  # 오른쪽(+az)은 방위각 감소(시계 방향)
    d = np.stack([np.cos(EL) * np.cos(head), np.cos(EL) * np.sin(head), np.sin(EL)], -1)
    Rm = np.array(R, float).reshape(3, 3)  # 카메라 → 세계(x 동, y 북, z 위), OpenCV 카메라 축
    cam = d @ Rm  # = (R^T d)
    ok = cam[..., 2] > 0.05
    u = fx * cam[..., 0] / np.where(ok, cam[..., 2], 1) + cx
    v = fy * cam[..., 1] / np.where(ok, cam[..., 2], 1) + cy
    ok &= (u >= 1) & (u <= W - 2) & (v >= 1) & (v <= H - 2)
    sig = fx * math.tan(math.radians(STEP)) * 0.45
    blur = cv2.GaussianBlur(gray.astype(np.float32), (0, 0), sig)
    val = cv2.remap(blur, u.astype(np.float32), v.astype(np.float32), cv2.INTER_LINEAR)
    out = np.clip(np.round(val), 0, 254).astype(np.uint8)
    out[~ok] = 255
    return out


def main():
    img_dir = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "private/mirae/sv")
    sv_path = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "data/mirae/sv.json")
    out_path = pathlib.Path(sys.argv[3] if len(sys.argv) > 3 else "data/mirae/ar-index.bin")
    if not img_dir.is_dir():
        raise SystemExit(f"원본 프레임 폴더가 없습니다: {img_dir}")
    if not sv_path.is_file():
        raise SystemExit(f"카메라 자세 파일이 없습니다: {sv_path}")
    sv = json.loads(sv_path.read_text())
    K = sv["K"]
    strips = []
    for s in sv["shots"]:
        image_path = img_dir / f"{s['id']:05d}.jpg"
        g = cv2.imread(str(image_path), cv2.IMREAD_GRAYSCALE)
        if g is None:
            raise SystemExit(f"원본 프레임을 읽을 수 없습니다: {image_path}")
        if g.shape[1] != K[4]:
            g = cv2.resize(g, (int(K[4]), int(K[5])), interpolation=cv2.INTER_AREA)
        strips.append(make_strip(g, K, s["R"], s["yaw"]))
    data = np.stack(strips)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(data.tobytes())
    print(out_path, data.shape, f"{out_path.stat().st_size/1024:.0f}KB",
          "invalid %.1f%%" % (100 * (data == 255).mean()))


if __name__ == "__main__":
    main()
