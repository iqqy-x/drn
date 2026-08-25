import { CONFIG } from "../config.js";

export class Drone {
  constructor(x, y) {
    this.x = x; this.y = y; this.targetX = x; this.targetY = y; this.angle = 0; this.radius = CONFIG.DRONE_RADIUS;
  }

  setTarget(point) {
    if (!point) return;
    this.targetX = point.x; this.targetY = point.y;
  }

  update(deltaSeconds) {
    const previousX = this.x;
    const previousY = this.y;
    const desiredX = (this.targetX - this.x) * CONFIG.DRONE_SMOOTHING;
    const desiredY = (this.targetY - this.y) * CONFIG.DRONE_SMOOTHING;
    const desiredDistance = Math.hypot(desiredX, desiredY);
    const maxStep = CONFIG.DRONE_MAX_SPEED * deltaSeconds;
    const scale = desiredDistance > maxStep ? maxStep / desiredDistance : 1;
    this.x += desiredX * scale;
    this.y += desiredY * scale;
    if (Math.abs(this.x - previousX) + Math.abs(this.y - previousY) > .1) this.angle = Math.atan2(this.y - previousY, this.x - previousX);
  }
}
