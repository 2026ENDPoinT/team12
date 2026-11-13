import * as THREE from "three";
import { getBuildingDesign } from "./catalog.mjs";
import { buildingAppearance, roofColorForBuilding } from "./appearance.mjs";
import {
  facadeGeometry,
  facadeMaterial,
  createBuildingDetails,
} from "./procedural.mjs";
import { createFacadeStudy } from "./facade-studies.mjs";
import { createFutureBuilding } from "./models/future.mjs";
import { createSangsangBuilding } from "./models/sangsang.mjs";
import { createMemorialBuilding } from "./models/memorial.mjs";
import { createDasanBuilding } from "./models/dasan.mjs";
import { createFrontierBuilding } from "./models/frontier.mjs";
import { createTechnocubeBuilding } from "./models/technocube.mjs";
import { createDaeryukBuilding } from "./models/daeryuk.mjs";
import { createArumBuilding } from "./models/arum.mjs";
import { createChanghakBuilding } from "./models/changhak.mjs";
import { createMugungBuilding } from "./models/mugung.mjs";
import { createCheongunBuilding } from "./models/cheongun.mjs";
import { createDavinciBuilding } from "./models/davinci.mjs";
import { createTechnoparkBuilding } from "./models/technopark.mjs";
import { createAdminBuilding } from "./models/admin.mjs";
import { createHyeseongBuilding } from "./models/hyeseong.mjs";
import { createInternationalBuilding } from "./models/international.mjs";

const MODEL_FACTORIES = {
  future: createFutureBuilding,
  sangsang: createSangsangBuilding,
  memorial: createMemorialBuilding,
  dasan: createDasanBuilding,
  frontier: createFrontierBuilding,
  technocube: createTechnocubeBuilding,
  daeryuk: createDaeryukBuilding,
  arum: createArumBuilding,
  changhak: createChanghakBuilding,
  mugung: createMugungBuilding,
  cheongun: createCheongunBuilding,
  davinci: createDavinciBuilding,
  technopark: createTechnoparkBuilding,
  admin: createAdminBuilding,
  hyeseong: createHyeseongBuilding,
  international: createInternationalBuilding,
};

function createRoof(building) {
  const ring = (points) => points.map(([x, z]) => new THREE.Vector2(x, -z));
  const shape = new THREE.Shape(ring(building.outline));
  for (const hole of building.holes)
    shape.holes.push(new THREE.Path(ring(hole)));
  const roof = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(roofColorForBuilding(building)),
      roughness: 0.86,
      metalness: 0,
    }),
  );
  roof.rotation.x = -Math.PI / 2;
  roof.position.y = building.h + 1;
  roof.receiveShadow = true;
  roof.userData.building = building.id;
  return roof;
}

// Map interaction code consumes records and pickables without knowing model types.
export function createBuildingLayer(buildings, entrances = []) {
  const group = new THREE.Group();
  group.name = "campus-buildings";
  const records = [],
    pickables = [],
    details = createBuildingDetails();
  const entrancesByBuilding = new Map();
  for (const entrance of entrances) {
    if (!entrancesByBuilding.has(entrance.buildingId))
      entrancesByBuilding.set(entrance.buildingId, entrance);
  }
  for (const b of buildings) {
    const design = getBuildingDesign(b.id);
    if (design.hidden) continue;
    const appearance = buildingAppearance(b);
    const profile = design.colors ?? {
      wall: appearance.wall,
      glass: appearance.glass,
    };
    const entrance = entrancesByBuilding.get(b.id);
    let body,
      height = b.h;
    if (design.model) {
      const factory = MODEL_FACTORIES[design.model];
      if (!factory)
        throw new Error(`Unknown building model: ${design.model} (${b.id})`);
      const model = factory(b, profile.wall, entrance);
      body = model.body;
      height = model.height ?? b.h;
      group.add(model.group);
      pickables.push(...model.pickables);
    } else {
      body = new THREE.Mesh(
        facadeGeometry(b),
        facadeMaterial(
          {
            ...appearance,
            glass: profile.glass,
            facade: appearance.facade && !design.facadeStudy,
          },
          profile.wall,
          entrance,
        ),
      );
      body.rotation.x = -Math.PI / 2;
      body.position.y = 0.9;
      body.castShadow = body.receiveShadow = true;
      body.userData.building = b.id;
      const roof = createRoof(b);
      group.add(body, roof);
      pickables.push(body, roof);
      const study = createFacadeStudy(b, profile, entrance);
      if (study) {
        group.add(study.group);
        pickables.push(...study.pickables);
      }
      details.decorate(b, appearance, study ? null : entrance);
    }
    records.push({ b, body, profile, height });
  }
  group.add(details.finish());
  return { group, records, pickables };
}
