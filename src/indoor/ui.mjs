// Original Figma exports, scoped to the indoor page. Keep their intrinsic SVG sizes.
export function uiIcon(name) {
  const icon = document.createElement("img");
  icon.src = `ui/${name}.svg`;
  icon.alt = "";
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

const directions = {
  start: "step-up",
  straight: "step-up",
  right: "step-right",
  "stair-up": "step-stairs",
  arrive: "step-arrive",
};
const arrows = {
  left: "←",
  "slight-left": "↖",
  "slight-right": "↗",
  "u-left": "↶",
  "u-right": "↷",
  "stair-down": "⇣",
  elev: "⇅",
};

export function setDirectionIcon(element, direction, hud = false) {
  let name = directions[direction];
  if (hud && (direction === "start" || direction === "straight"))
    name = "guide-up";
  element.replaceChildren(
    name ? uiIcon(name) : document.createTextNode(arrows[direction] || "↑"),
  );
  element.setAttribute("aria-hidden", "true");
}
