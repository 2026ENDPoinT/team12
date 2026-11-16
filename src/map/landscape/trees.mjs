import { createBroadleafTrees } from "./broadleaf-trees.mjs";
import { createPondTreeLayout } from "./pond-planting.mjs";

// pond: 서울과기대 붕어방 주변 식재(pond-planting.mjs)를 쓸지. 다른 학교는 원본 나무만 씁니다.
// heightAt: 지면 높이(지형이 없으면 0). 나무 밑동을 그 자리 지면에 둡니다.
export function createCampusTrees(
  geometry,
  { pond = true, heightAt = () => 0 } = {},
) {
  const grounded = (trees) =>
    trees.map(([x, z, scale, baseY = 0]) => [x, z, scale, baseY + heightAt(x, z)]);
  if (!pond) return createBroadleafTrees(grounded(geometry.trees));
  const trees = createPondTreeLayout(geometry).trees;
  // Keep the island tree rooted at the raised island surface.
  return createBroadleafTrees(grounded([...trees, [-119, -141, 0.55, 0.9]]));
}
