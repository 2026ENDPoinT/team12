export function normalizeSearch(value) {
  return String(value ?? "").normalize("NFKC").toLowerCase().replace(/\s+/g, "");
}

// Compare Hangul as jamo so a mistyped consonant or vowel costs one edit.
function editDistance(a, b) {
  const rows = [Array.from({ length: b.length + 1 }, (_, i) => i)];
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    rows.push(row);
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        rows[i - 1][j] + 1,
        row[j - 1] + 1,
        rows[i - 1][j - 1] + Number(a[i - 1] !== b[j - 1]),
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        row[j] = Math.min(row[j], rows[i - 2][j - 2] + 1);
      }
    }
  }
  return rows[a.length][b.length];
}

export function suggestMatches(query, items, terms, limit = 5) {
  const q = normalizeSearch(query);
  if (q.length < 2) return [];
  const numeric = /^b?\d+$/.test(q);
  if (numeric && q.length < 3) return [];
  const needle = q.normalize("NFD");
  const maxEdits = numeric || needle.length < 6 ? 1 : needle.length < 12 ? 2 : 3;

  return items.flatMap((item) => {
    let best = Infinity;
    for (const term of terms(item)) {
      const candidate = normalizeSearch(term);
      if (!candidate || numeric !== /^b?\d+$/.test(candidate)) continue;
      // Compare typed prefixes too, so a typo doesn't prevent suggestions mid-query.
      for (let length = Math.max(2, q.length - 1); length <= q.length + 1; length++) {
        if (length > candidate.length || (numeric && length !== candidate.length)) continue;
        const prefix = candidate.slice(0, length).normalize("NFD");
        if (Math.abs(prefix.length - needle.length) > maxEdits) continue;
        const distance = editDistance(needle, prefix);
        if (distance <= maxEdits) {
          best = Math.min(best, distance * 10 + (candidate.length - length) * 0.1);
        }
      }
    }
    return Number.isFinite(best) ? [{ item, score: best }] : [];
  }).sort((a, b) => a.score - b.score).slice(0, limit).map(({ item }) => item);
}
