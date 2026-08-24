import { CONFIG } from "../config.js";
import { readLeaderboard, saveScore } from "../utils/storage.js";

export function createLeaderboard(elements) {
  function render(listElement, entries = readLeaderboard(CONFIG.LEADERBOARD_KEY)) {
    listElement.replaceChildren();
    if (!entries.length) { const empty = document.createElement("li"); empty.textContent = "Belum ada skor. Jadilah yang pertama."; listElement.append(empty); return; }
    entries.slice(0, CONFIG.LEADERBOARD_LIMIT).forEach((entry) => { const item = document.createElement("li"); item.innerHTML = `<span>${escapeHtml(entry.name)}</span><strong>${entry.score}</strong>`; listElement.append(item); });
  }
  return { renderAll() { const entries = readLeaderboard(CONFIG.LEADERBOARD_KEY); render(elements.idle, entries); render(elements.ended, entries); }, save(name, score) { const entries = saveScore(CONFIG.LEADERBOARD_KEY, { name, score }, CONFIG.LEADERBOARD_LIMIT); render(elements.idle, entries); render(elements.ended, entries); } };
}

function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character])); }
