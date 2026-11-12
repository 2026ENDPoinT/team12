"""mirae_map_final_v6/index.html에 base64로 들어 있는 도면(GLB)과 층 데이터(M, XN)를
data/mirae/ 아래 파일로 꺼냅니다. v6 HTML을 새로 받았을 때 한 번 실행합니다.

    python scripts/extract-mirae.py mirae_map_final_v6/index.html
"""
import base64, json, re, sys, pathlib

src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "mirae_map_final_v6/index.html")
html = src.read_text(encoding="utf-8")
out = pathlib.Path("data/mirae")
out.mkdir(parents=True, exist_ok=True)

glb = re.search(r'const GLB="([A-Za-z0-9+/=]+)"', html).group(1)
(out / "mirae.glb").write_bytes(base64.b64decode(glb))

dec = json.JSONDecoder()
m_start = html.index("M=", html.index('const GLB="') + len(glb)) + 2
M, _ = dec.raw_decode(html, m_start)
xn_start = html.index("const XN=") + len("const XN=")
XN, _ = dec.raw_decode(html, xn_start)
M["names"] = XN  # 연구실·교수실 이름 (호실 번호 → 이름)
(out / "mirae.json").write_text(json.dumps(M, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print("mirae.glb", (out / "mirae.glb").stat().st_size, "bytes")
print("mirae.json", (out / "mirae.json").stat().st_size, "bytes")
