// WebXR AR 세션(안드로이드 크롬 = ARCore): 6축 자세 추적(VIO)과 카메라 영상 접근.
//  · local-floor: 시작한 층 바닥이 y=0, 휴대폰 위치·방향을 1초에 60번 cm 단위로 추적
//  · camera-access: 같은 프레임의 카메라 영상 → 입자 필터 사진 비교에 씀
//  · dom-overlay: 안내 글자·미니맵 같은 화면 요소를 AR 화면 위에 그대로 표시
// 아이폰 사파리 등 WebXR AR이 없는 기기는 기존 방식(카메라 영상 + 방향 센서 + 걸음)으로 돌아갑니다.
import * as THREE from "three";

export async function xrSupported() {
  try {
    return (
      !!navigator.xr && (await navigator.xr.isSessionSupported("immersive-ar"))
    );
  } catch {
    return false;
  }
}

/** AR 세션 시작. 카메라 영상·화면 겹치기가 안 되는 기기면 세션을 닫고 오류를 냄(→ 기존 방식) */
export async function startSession(renderer, overlayRoot) {
  const session = await navigator.xr.requestSession("immersive-ar", {
    requiredFeatures: ["local-floor"],
    optionalFeatures: ["camera-access", "dom-overlay"],
    domOverlay: { root: overlayRoot },
  });
  const feats = session.enabledFeatures;
  const missing = [];
  if (feats && !feats.includes("camera-access")) missing.push("camera-access");
  if (!session.domOverlayState) missing.push("dom-overlay");
  if (missing.length) {
    await session.end().catch(() => {});
    throw new Error(`이 기기의 WebXR에 ${missing.join(", ")} 기능이 없어요`);
  }
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType("local-floor");
  await renderer.xr.setSession(session);
  return session;
}

/** XR 카메라 영상(GPU 텍스처) → 작은 흑백 영상. 프레임 콜백 안에서만 부를 수 있습니다. */
export class CameraGrab {
  constructor(renderer, long = 220, flip = false) {
    this.r = renderer;
    this.long = long;
    this.flip = flip;
    this.rt = null;
    this.buf = null;
    this.mat = new THREE.ShaderMaterial({
      uniforms: { map: { value: null } },
      vertexShader:
        "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
      fragmentShader:
        "uniform sampler2D map; varying vec2 vUv; void main(){ vec3 c = texture2D(map, vUv).rgb;" +
        " float g = dot(c, vec3(0.299, 0.587, 0.114)); gl_FragColor = vec4(g, g, g, 1.0); }",
      depthTest: false,
      depthWrite: false,
    });
    this.scene = new THREE.Scene();
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    quad.frustumCulled = false;
    this.scene.add(quad);
    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }
  /** xrCamera: XRView.camera. 반환 {g: Float32Array(0~255, 위가 0행), w, h} 또는 null */
  grab(xrCamera) {
    const tex = this.r.xr.getCameraTexture(xrCamera);
    if (!tex || !xrCamera.width) return null;
    const s = this.long / Math.max(xrCamera.width, xrCamera.height);
    const w = Math.round(xrCamera.width * s),
      h = Math.round(xrCamera.height * s);
    if (!this.rt || this.rt.width !== w || this.rt.height !== h) {
      this.rt?.dispose();
      this.rt = new THREE.WebGLRenderTarget(w, h, { depthBuffer: false });
      this.buf = new Uint8Array(w * h * 4);
    }
    this.mat.uniforms.map.value = tex;
    const r = this.r,
      prev = r.getRenderTarget(),
      xrOn = r.xr.enabled;
    // XR 중에는 three가 항상 XR 카메라로 그리므로 잠깐 끄고 작은 화면에 그림
    r.xr.enabled = false;
    r.setRenderTarget(this.rt);
    r.render(this.scene, this.cam);
    r.readRenderTargetPixels(this.rt, 0, 0, w, h, this.buf);
    r.setRenderTarget(prev);
    r.xr.enabled = xrOn;
    // GL은 아래 행이 0 → 위가 0행이 되게 뒤집음(?xrflip=1이면 그대로)
    const g = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      const src = this.flip ? y : h - 1 - y;
      for (let x = 0; x < w; x++) g[y * w + x] = this.buf[(src * w + x) * 4];
    }
    return { g, w, h };
  }
  dispose() {
    this.rt?.dispose();
    this.mat.dispose();
  }
}
