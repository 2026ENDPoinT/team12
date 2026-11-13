import { normalizeSearch, suggestMatches } from "../search-suggestions.mjs";

export const routePlaceLabel = (place) =>
  place ? `${place.title}${place.name ? " " + place.name : ""}` : "";

export function createRoutePlaces(indoor, entrances) {
  const entries = entrances.map((e) => ({
    key: `entrance:${e.id}`,
    id: e.id,
    kind: "entrance",
    title: e.name,
    name: "",
    cat: "entrance",
    catLabel: "출입구",
    f: e.f,
    center: e.p,
    doors: [e.p],
  }));
  const resolve = (key) =>
    entries.find((e) => e.key === key) || indoor.findDest(key);
  return {
    resolve,
    forStart(start) {
      return start
        ? resolve(start.kind === "entrance" ? `entrance:${start.id}` : start.id)
        : null;
    },
    search(query, context = {}, limit = 6) {
      const q = normalizeSearch(query);
      if (!q) {
        const rooms = indoor.destinations
          .filter((d) => d.numbered)
          .sort(
            (a, b) =>
              Number(a.f !== context.floor) - Number(b.f !== context.floor),
          );
        return {
          places: [...entries, ...rooms].slice(0, limit),
          suggested: false,
        };
      }
      const entryMatches = entries.filter((e) =>
        normalizeSearch(`${e.title} 출입구 ${e.id}`).includes(q),
      );
      const rooms = indoor.search(query, limit, context);
      const exact = [...entryMatches, ...rooms];
      if (exact.length)
        return { places: exact.slice(0, limit), suggested: false };
      return {
        places: [
          ...indoor.suggest(query, limit, context),
          ...suggestMatches(q, entries, (e) => [e.title, e.id]),
        ].slice(0, limit),
        suggested: true,
      };
    },
  };
}
