import { CONFIG } from "../config.js";

export class Drone {
  constructor(x, y) {
    this.x = x; this.y = y; this.targetX = x; this.targetY = y; this.angle = 0;
  }

  setTarget(point) {
    if (!point) return;
    this.targetX = point.x; this.targetY = point.y;
  }

  update() {
    const previousX = this.x;
    const previousY = this.y;
    this.x += (this.targetX - this.x) * CONFIG.DRONE_SMOOTHING;
    this.y += (this.targetY - this.y) * CONFIG.DRONE_SMOOTHING;
    if (Math.abs(this.x - previousX) + Math.abs(this.y - previousY) > .1) this.angle = Math.atan2(this.y - previousY, this.x - previousX);
  }
}
