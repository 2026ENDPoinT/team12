// Shared by road rendering and planting clearance checks.
const VEHICLE_ROADS = new Set([
  "service",
  "residential",
  "tertiary",
  "secondary",
  "living_street",
]);
export function roadDimensions(road) {
  const vehicle = VEHICLE_ROADS.has(road.kind);
  const width = vehicle
    ? road.kind === "service"
      ? 5.8
      : 9
    : road.kind === "steps"
      ? 2
      : 2.8;
  return { vehicle, width };
}
