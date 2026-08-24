import { CONFIG } from "../config.js";

export function createHud(elements) {
  return {
    update(session) {
      elements.timer.textContent = Math.ceil(session.remaining);
      elements.score.textContent = session.score;
      elements.delivered.textContent = session.delivered;
      elements.combo.textContent = session.combo;
      elements.timerBar.style.width = `${session.remaining / CONFIG.GAME_DURATION_SECONDS * 100}%`;
      elements.target.textContent = session.package.targetName;
      elements.swatch.style.backgroundColor = session.package.color;
      elements.swatch.style.color = session.package.color;
    },
    reset() { elements.timer.textContent = CONFIG.GAME_DURATION_SECONDS; elements.score.textContent = "0"; elements.delivered.textContent = "0"; elements.combo.textContent = "0"; elements.timerBar.style.width = "100%"; elements.target.textContent = "-"; elements.swatch.style.backgroundColor = "transparent"; }
  };
}
