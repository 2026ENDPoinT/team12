// One place for model selection, color overrides, facade studies and visibility.
// Geometry and photo proportions remain in models/. Source GIS stays in data/.
export const BUILDING_DESIGNS = {
  future: { model: "future", colors: { wall: 0xdde3df, glass: 0x437d83 } },
  "way-579071105": {
    model: "sangsang",
    colors: { wall: 0xd9ddd7, glass: 0x43758a },
  },
  memorial: { model: "memorial", colors: { wall: 0x444d4b, glass: 0x4c8293 } },
  frontier: { model: "frontier", colors: { wall: 0xd1d0c0, glass: 0x347e99 } },
  cube: { model: "technocube", colors: { wall: 0x81877f, glass: 0x357c97 } },
  "way-470639154": {
    model: "daeryuk",
    colors: { wall: 0xbab5a2, glass: 0x526d65 },
  },
  "way-382499351": {
    model: "arum",
    colors: { wall: 0xd9d2bd, glass: 0x4c7478 },
  },
  eoui: { colors: { wall: 0xd8d9cf, glass: 0x568598 } },
  davinci: { model: "davinci", colors: { wall: 0xcdd6d2, glass: 0x457c91 } },
  dasan: { model: "dasan", colors: { wall: 0xdac9bd, glass: 0x547f83 } },
  "way-382499369": {
    model: "international",
    colors: { wall: 0xd6ddd5, glass: 0x648b85 },
  },
  "way-381113088": {
    model: "hyeseong",
    colors: { wall: 0xcfcbb5, glass: 0x536f72 },
  },
  admin: { model: "admin", colors: { wall: 0xc9c9b4, glass: 0x3c7d7d } },
  techno: { model: "technopark", colors: { wall: 0x437f91, glass: 0x437f91 } },
  cheongun: { model: "cheongun", colors: { wall: 0xd9ded3, glass: 0x527e7e } },
  mugung: { model: "mugung", colors: { wall: 0xcaccc5, glass: 0x507e8d } },
  changhak: { model: "changhak", colors: { wall: 0xcbb997, glass: 0x576f75 } },
  student: { colors: { wall: 0xc2a576, glass: 0x657b79 } },
  student2: { colors: { wall: 0xc99e72, glass: 0x607d83 } },
  creative: { colors: { wall: 0xd1b480, glass: 0x617c82 } },
  library: { facadeStudy: "vertical-glass" },
  "vw-77": {
    hidden: true,
    note: "Duplicate unnamed volume overlapping the administration entrance.",
  },
};
const DEFAULT_DESIGN = Object.freeze({});
export function getBuildingDesign(id) {
  return BUILDING_DESIGNS[id] ?? DEFAULT_DESIGN;
}
