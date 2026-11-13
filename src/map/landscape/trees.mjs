import { createBroadleafTrees } from "./broadleaf-trees.mjs";
import { createPondTreeLayout } from "./pond-planting.mjs";

export function createCampusTrees(geometry) {
  const trees = createPondTreeLayout(geometry).trees;
  // Keep the island tree rooted at the raised island surface.
  return createBroadleafTrees([...trees, [-119, -141, 0.55, 0.9]]);
}
