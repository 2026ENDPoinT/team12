import { toLngLat } from "./geo.mjs";

// 조사 입력·지도·GIS 출력은 같은 좌표 변환식을 사용합니다.
export const campusToGps = toLngLat;

function closeRing(ring, origin) {
  const coordinates = ring.map(([x, z]) => campusToGps({ x, z }, origin));
  coordinates.push(coordinates[0]);
  return coordinates;
}

function feature(id, geometry, properties) {
  return { type: "Feature", id, geometry, properties };
}

function roadType(kind) {
  if (kind === "steps") return "stairs";
  if (["footway", "path"].includes(kind)) return "pedestrian";
  if (["service", "living_street"].includes(kind)) return "shared_road";
  return "vehicle_road";
}

/**
 * 공개 지도 원본과 팀 입력을 하나의 교환용 GeoJSON으로 내보냅니다.
 * Three.js는 계속 로컬 미터 좌표를 사용하고, 이 파일을 API/PostGIS 연결점으로 씁니다.
 */
export function createCampusGeoJson(geometry, entrances = []) {
  const origin = geometry.meta,
    common = { campus_id: "SEOULTECH", coordinate_system: "EPSG:4326" },
    features = [];

  geometry.boundary.forEach((ring, index) => {
    features.push(
      feature(
        `SEOULTECH-BOUNDARY-${index + 1}`,
        { type: "Polygon", coordinates: [closeRing(ring, origin)] },
        {
          ...common,
          feature_type: "campus_boundary",
          source_kind: "public_gis",
          verification_status: "candidate",
        },
      ),
    );
  });

  for (const building of geometry.buildings) {
    features.push(
      feature(
        `SEOULTECH-BUILDING-${building.id}`,
        {
          type: "Polygon",
          coordinates: [
            closeRing(building.outline, origin),
            ...building.holes.map((ring) => closeRing(ring, origin)),
          ],
        },
        {
          ...common,
          feature_type: "building",
          building_id: building.id,
          source_id: building.sourceId,
          name: building.name,
          height_m: building.h,
          floors: building.floors,
          source_kind: "public_gis",
          verification_status: "candidate",
        },
      ),
    );
  }

  geometry.roads.forEach((road, index) => {
    features.push(
      feature(
        `SEOULTECH-ROAD-${index + 1}`,
        {
          type: "LineString",
          coordinates: road.points.map(([x, z]) =>
            campusToGps({ x, z }, origin),
          ),
        },
        {
          ...common,
          feature_type: "road",
          road_type: roadType(road.kind),
          source_kind: "public_gis",
          verification_status: "candidate",
          access_status: "unverified",
          name: road.name,
        },
      ),
    );
  });

  for (const entrance of entrances) {
    features.push(
      feature(
        `SEOULTECH-ENTRANCE-${entrance.id}`,
        {
          type: "Point",
          coordinates: campusToGps(entrance, origin),
        },
        {
          ...common,
          feature_type: "entrance",
          entrance_id: entrance.id,
          building_id: entrance.buildingId,
          name: entrance.name,
          source_kind: "team_input",
          verification_status: "candidate",
          access_status: "unverified",
        },
      ),
    );
  }

  for (const [nodeId, node] of Object.entries(geometry.nodes)) {
    features.push(
      feature(
        `SEOULTECH-ROUTE-NODE-${nodeId}`,
        { type: "Point", coordinates: campusToGps(node, origin) },
        {
          ...common,
          feature_type: "route_node",
          node_id: nodeId,
          node_type: "intersection",
          source_kind: "generated",
          verification_status: "candidate",
        },
      ),
    );
  }

  geometry.edges.forEach((edge, index) => {
    features.push(
      feature(
        `SEOULTECH-ROUTE-EDGE-${index + 1}`,
        {
          type: "LineString",
          coordinates: [
            campusToGps(geometry.nodes[edge.a], origin),
            campusToGps(geometry.nodes[edge.b], origin),
          ],
        },
        {
          ...common,
          feature_type: "route_edge",
          edge_id: `${edge.a}--${edge.b}`,
          from_node_id: edge.a,
          to_node_id: edge.b,
          edge_type: edge.stairs ? "stairs" : "outdoor_walkway",
          distance_m: edge.meters,
          source_kind: "generated",
          verification_status: "candidate",
          access_status: "assumed_open",
        },
      ),
    );
  });

  return {
    type: "FeatureCollection",
    name: "SEOULTECH campus GIS prototype",
    generated_from: "data/seoultech.json",
    features,
  };
}

export function gisSummary(geometry, entrances = []) {
  return {
    buildings: geometry.buildings.length,
    roads: geometry.roads.length,
    stairs: geometry.roads.filter(({ kind }) => kind === "steps").length,
    routeNodes: Object.keys(geometry.nodes).length,
    routeEdges: geometry.edges.length,
    entrances: entrances.length,
  };
}
