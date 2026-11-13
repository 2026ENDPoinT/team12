// Opt-in local diagnostics. No telemetry, network requests or visible product UI.
export function createMapProfiler(
  renderer,
  trees,
  mapStartedAt = performance.now(),
) {
  if (new URLSearchParams(location.search).get("mapPerf") !== "1") return null;
  const gl = renderer.getContext();
  const ext = gl.getExtension("EXT_disjoint_timer_query_webgl2");
  let previous = 0,
    started = 0,
    frame = 0,
    active = null;
  let mapReadyMs = null;
  let intervals = [],
    cpu = [],
    gpu = [],
    queries = [];
  const percentile = (values, p) => {
    if (!values.length) return null;
    return +[...values]
      .sort((a, b) => a - b)
      [Math.min(values.length - 1, Math.floor(values.length * p))].toFixed(2);
  };
  return {
    begin(t) {
      const now = performance.now();
      if (!started) started = now;
      if (previous && now - started > 2000) intervals.push(t - previous);
      previous = t;
      if (ext) {
        const disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT);
        queries = queries.filter((query) => {
          if (!gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE))
            return true;
          if (!disjoint && now - started > 2000)
            gpu.push(gl.getQueryParameter(query, gl.QUERY_RESULT) / 1e6);
          gl.deleteQuery(query);
          return false;
        });
        if (++frame % 10 === 0 && queries.length < 4) {
          active = gl.createQuery();
          gl.beginQuery(ext.TIME_ELAPSED_EXT, active);
        }
      }
      return now;
    },
    end(start) {
      if (mapReadyMs === null)
        mapReadyMs = +(performance.now() - mapStartedAt).toFixed(1);
      if (active) {
        gl.endQuery(ext.TIME_ELAPSED_EXT);
        queries.push(active);
        active = null;
      }
      const now = performance.now();
      if (now - started > 2000) cpu.push(now - start);
      if (now - started < 8000 || !intervals.length) return;
      const stats = {
        time: new Date().toISOString(),
        frames: intervals.length,
        fps: +(
          (1000 * intervals.length) /
          intervals.reduce((a, b) => a + b, 0)
        ).toFixed(1),
        frameP50: percentile(intervals, 0.5),
        frameP95: percentile(intervals, 0.95),
        cpuP50: percentile(cpu, 0.5),
        cpuP95: percentile(cpu, 0.95),
        gpuP50: percentile(gpu, 0.5),
        gpuP95: percentile(gpu, 0.95),
        calls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        programs: renderer.info.programs.length,
        mapReadyMs,
        leafCards: trees.userData.leafCards,
        width: renderer.domElement.clientWidth,
        height: renderer.domElement.clientHeight,
        pixelRatio: renderer.getPixelRatio(),
        visibility: document.visibilityState,
      };
      renderer.domElement.dataset.mapPerformance = JSON.stringify(stats);
      started = now;
      intervals = [];
      cpu = [];
      gpu = [];
    },
    dispose() {
      queries.forEach((query) => gl.deleteQuery(query));
    },
  };
}
