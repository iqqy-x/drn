export function readLeaderboard(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter(isValidEntry).sort(sortScores) : [];
  } catch {
    return [];
  }
}

export function saveScore(key, entry, limit) {
  const entries = readLeaderboard(key);
  entries.push({ name: sanitizeName(entry.name), score: Math.max(0, Math.round(entry.score)), date: Date.now() });
  entries.sort(sortScores);
  const next = entries.slice(0, limit);
  try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* Storage can be unavailable in private browsing. */ }
  return next;
}

function sanitizeName(name) {
  const clean = String(name || "PILOT").replace(/[^a-z0-9 _-]/gi, "").trim().slice(0, 12);
  return clean || "PILOT";
}

function isValidEntry(entry) {
  return entry && typeof entry.name === "string" && Number.isFinite(entry.score);
}

function sortScores(a, b) { return b.score - a.score || (a.date || 0) - (b.date || 0); }
