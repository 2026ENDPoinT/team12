// 앱 진입점: 주소(#campus/<id>)의 학교 데이터를 먼저 불러온 뒤 앱(app.js)을 시작합니다.
// 서울과기대 데이터는 번들에 들어 있어 바로 시작하고, 다른 학교는 data/campuses/<id>.json을 받습니다.
// 앱은 시작할 때 한 학교의 지도·경로 그래프를 만들므로, 학교를 바꾸면 페이지를 새로 불러옵니다(app.js routeView).
import {
  campusById,
  campusIdFromHash,
  DEFAULT_CAMPUS_ID,
} from "./campus/registry.mjs";
import { useCampus } from "./campus/data.mjs";

async function start() {
  const id = campusIdFromHash(location.hash) || DEFAULT_CAMPUS_ID;
  if (id !== DEFAULT_CAMPUS_ID) {
    const config = campusById(id);
    try {
      const response = await fetch(
        `${config.data}${config.dataVersion ? `?v=${config.dataVersion}` : ""}`,
      );
      if (!response.ok) throw new Error(`지도 데이터 ${response.status}`);
      useCampus(config, await response.json());
    } catch (error) {
      console.error(`${config.name} 지도 데이터를 불러오지 못했습니다.`, error);
      // 학교 목록으로 돌아가 서울과기대 데이터로 시작합니다.
      history.replaceState(
        null,
        "",
        `${location.pathname}${location.search}#campuses`,
      );
      try {
        sessionStorage.setItem("sai:campus-load-failed", config.short);
      } catch {}
    }
  }
  await import("./app.js");
}

start();
