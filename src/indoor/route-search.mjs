// Inline route comboboxes follow the outdoor map's selection and keyboard behavior.
export function bindRouteSearch({
  input,
  panel,
  list,
  hint,
  clear,
  getMatches,
  onChoose,
  onEdit,
}) {
  let choices = [],
    active = -1,
    selectedValue = "";
  function close() {
    choices = [];
    active = -1;
    panel.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }
  function updateClear() {
    clear.hidden = !input.value;
  }
  function setValue(value) {
    selectedValue = value;
    input.value = value;
    input.removeAttribute("aria-invalid");
    updateClear();
    close();
  }
  function choose(place) {
    setValue(`${place.title}${place.name ? " " + place.name : ""}`);
    onChoose(place);
    input.blur();
  }
  function render(force = false) {
    close();
    if (!force && selectedValue && input.value === selectedValue) return;
    const result = getMatches(
      force && input.value === selectedValue ? "" : input.value,
    );
    choices = result.places;
    hint.textContent = choices.length
      ? result.suggested
        ? "추천 장소"
        : "검색 결과"
      : "검색 결과가 없어요. 호실 번호나 이름 일부를 입력해 주세요.";
    list.replaceChildren(
      ...choices.map((place, index) => {
        const option = document.createElement("li");
        option.id = `${list.id}-${index}`;
        option.dataset.key = place.key;
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", "false");
        const title = document.createElement("b");
        title.textContent = `${place.title}${place.name ? " " + place.name : ""}`;
        const detail = document.createElement("small");
        detail.textContent = `${place.f === 0 ? "지하 1" : place.f}층 · ${place.catLabel}`;
        option.append(title, detail);
        option.onpointerdown = (event) => {
          if (event.pointerType === "mouse") event.preventDefault();
        };
        option.onclick = () => choose(place);
        return option;
      }),
    );
    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }
  function edit() {
    selectedValue = "";
    input.removeAttribute("aria-invalid");
    updateClear();
    onEdit();
    render();
  }
  input.addEventListener("input", edit);
  input.addEventListener("focus", () => {
    input.select();
    render();
  });
  input.addEventListener("blur", () => {
    if (input.value.trim() && !selectedValue)
      input.setAttribute("aria-invalid", "true");
  });
  clear.onclick = () => {
    input.value = "";
    edit();
    input.focus();
  };
  document.addEventListener("focusin", (event) => {
    if (event.target !== input && !panel.contains(event.target)) close();
  });
  document.addEventListener("pointerdown", (event) => {
    if (event.target !== input && !panel.contains(event.target)) close();
  });
  input.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (choices.length) choose(choices[active >= 0 ? active : 0]);
      else if (!selectedValue && input.value.trim())
        input.setAttribute("aria-invalid", "true");
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (panel.hidden) render(true);
      if (!choices.length) return;
      if (active >= 0)
        list.children[active].setAttribute("aria-selected", "false");
      const step = event.key === "ArrowDown" ? 1 : -1;
      active =
        active < 0
          ? step > 0
            ? 0
            : choices.length - 1
          : (active + step + choices.length) % choices.length;
      const option = list.children[active];
      option.setAttribute("aria-selected", "true");
      input.setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    }
  });
  return { setValue, close, focus: () => input.focus() };
}
