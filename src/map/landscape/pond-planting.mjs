import { roadDimensions } from "./roads.mjs";
import { insideBuilding, pointInRing, projectToSegment } from "../../campus/geo.mjs";

// Hand-positioned interpretation of the supplied aerial photo, in campus meters.
// Dense banks, a loose roadside row and an open lawn; no runtime randomness.
const AREA = [
  [-116, -175],
  [-53, -142],
  [-20, -117],
  [-18, -96],
  [-37, -40],
  [-113, -62],
  [-153, -76],
  [-151, -98],
];
const BANK_TREES = [
  [-51, -137, 0.72],
  [-49, -131, 0.82],
  [-49, -125, 0.79],
  [-49, -119, 0.88],
  [-50, -113, 0.82],
  [-53, -106, 0.88],
  [-58, -101, 0.86],
  [-64, -96, 0.84],
  [-69, -92, 0.78],
  [-75, -87, 0.87],
  [-81, -83, 0.82],
  [-87, -79, 0.82],
  [-94, -75, 0.8],
  [-101, -71, 0.72],
  [-108, -70, 0.73],
  [-46, -132, 0.76],
  [-44, -126, 0.84],
  [-44, -120, 0.74],
  [-45, -114, 0.86],
  [-47, -108, 0.77],
  [-51, -102, 0.75],
  [-57, -96, 0.86],
  [-63, -91, 0.82],
  [-69, -86, 0.77],
  [-76, -80, 0.86],
  [-83, -76, 0.82],
  [-91, -72, 0.75],
  // Short groups rather than a uniform double hedge.
  [-42, -115, 0.67],
  [-47, -119, 0.67],
  [-54, -98, 0.72],
  [-59, -94, 0.72],
  [-72, -83, 0.72],
  [-80, -78, 0.68],
  [-89, -74, 0.69],
  [-98, -71, 0.69],
  [-110, -68, 0.65],
  [-117, -70, 0.7],
  [-123, -73, 0.72],
  [-129, -76, 0.68],
  [-134, -80, 0.66],
  [-140, -87, 0.68],
  [-140, -98, 0.64],
  [-135, -113, 0.66],
  [-130, -128, 0.66],
  [-125, -142, 0.65],
  [-119, -157, 0.65],
];
const ROADSIDE_TREES = [
  [-43, -132, 0.72],
  [-37, -126, 0.76],
  [-33, -119, 0.76],
  [-30, -111, 0.8],
  [-28, -102, 0.77],
  [-30, -93, 0.79],
  [-33, -84, 0.78],
  [-36, -75, 0.8],
  [-39, -65, 0.76],
  [-43, -55, 0.77],
  [-49, -50, 0.72],
];
const LAWN_TREES = [
  [-56, -61, 0.85],
  [-67, -66, 0.73],
  [-80, -66, 0.82],
  [-91, -66, 0.7],
  [-105, -67, 0.71],
  [-109, -171, 0.67],
  [-103, -169, 0.7],
  [-96, -165, 0.75],
];

export function isPondPlantingTree([x, z]) {
  return pointInRing({ x, z }, AREA);
}

export function createPondTreeLayout(geometry) {
  const water = geometry.lands.filter((land) => land.kind === "water");
  const roadSegments = geometry.roads.flatMap((road) => {
    const { width } = roadDimensions(road);
    return road.points.slice(1).map((point, i) => ({
      a: { x: road.points[i][0], z: road.points[i][1] },
      b: { x: point[0], z: point[1] },
      clearance: width / 2 + 0.9,
    }));
  });
  const safe = ([x, z]) => {
    const point = { x, z };
    return (
      pointInRing(point, AREA) &&
      !water.some((land) => pointInRing(point, land.outline)) &&
      !geometry.buildings.some((building) => insideBuilding(point, building)) &&
      !roadSegments.some(
        ({ a, b, clearance }) =>
          projectToSegment(point, a, b).distance < clearance,
      )
    );
  };
  const retained = geometry.trees.filter(
    ([x, z]) => !(x > -112 && pointInRing({ x, z }, AREA)),
  );
  const planted = [...BANK_TREES, ...ROADSIDE_TREES, ...LAWN_TREES].filter(
    safe,
  );
  return {
    trees: [...retained, ...planted],
    planted,
    removed: geometry.trees.length - retained.length,
  };
}
