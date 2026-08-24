import { CONFIG } from "../config.js";

export class CoordinateMapper {
  constructor(width, height) { this.width = width; this.height = height; this.neutral = null; }
  calibrate(point) { this.neutral = { x: point.x, y: point.y }; }
  map(point) {
    if (!point) return null;
    const neutral = this.neutral || { x: .5, y: .5 };
    return {
      x: clamp(this.width / 2 + ((1 - point.x) - (1 - neutral.x)) * this.width * CONFIG.HAND_SENSITIVITY, 35, this.width - 35),
      y: clamp(this.height / 2 + (point.y - neutral.y) * this.height * CONFIG.HAND_SENSITIVITY, 95, this.height - 35)
    };
  }
}

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
