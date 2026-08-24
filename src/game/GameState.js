import { CONFIG, GAME_STATES } from "../config.js";
import { Drone } from "./Drone.js";
import { House } from "./House.js";
import { DeliveryPackage } from "./Package.js";
import { createNoFlyZones } from "./NoFlyZone.js";
import { createMovingObstacles, updateMovingObstacles } from "./MovingObstacle.js";
import { circleIntersectsRect, circlesIntersect } from "./collision.js";

const transitions = {
  [GAME_STATES.IDLE]: [GAME_STATES.CALIBRATION],
  [GAME_STATES.CALIBRATION]: [GAME_STATES.COUNTDOWN, GAME_STATES.IDLE],
  [GAME_STATES.COUNTDOWN]: [GAME_STATES.PLAYING, GAME_STATES.IDLE],
  [GAME_STATES.PLAYING]: [GAME_STATES.ENDED],
  [GAME_STATES.ENDED]: [GAME_STATES.IDLE, GAME_STATES.CALIBRATION]
};

export class StateMachine {
  constructor() { this.value = GAME_STATES.IDLE; }
  go(next) { if (!transitions[this.value].includes(next)) throw new Error(`Invalid game transition: ${this.value} -> ${next}`); this.value = next; }
}

export class GameSession {
  constructor() {
    this.houses = createHouses();
    this.zones = createNoFlyZones(this.houses);
    this.obstacles = createMovingObstacles();
    this.drone = new Drone(CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2);
    this.package = new DeliveryPackage(this.houses);
    this.score = 0;
    this.delivered = 0;
    this.combo = 0;
    this.bestCombo = 0;
    this.remaining = CONFIG.GAME_DURATION_SECONDS;
    this.zoneCooldowns = new Map();
    this.feedback = null;
    this.difficulty = 1;
  }

  update(deltaSeconds, target, now) {
    this.drone.setTarget(target);
    this.drone.update();
    this.remaining = Math.max(0, this.remaining - deltaSeconds);
    this.difficulty = 1 + (1 - this.remaining / CONFIG.GAME_DURATION_SECONDS) * .65;
    updateMovingObstacles(this.obstacles, now, this.difficulty);
    const targetHouse = this.houses.find((house) => house.id === this.package.targetHouseId);
    if (targetHouse && circlesIntersect(this.drone, targetHouse, 2)) {
      this.combo += 1;
      this.bestCombo = Math.max(this.bestCombo, this.combo);
      const points = 100 + Math.max(0, this.combo - 1) * 25;
      this.score += points;
      this.delivered += 1;
      this.feedback = { text: `PAKET TERKIRIM +${points}`, detail: `COMBO x${this.combo}`, color: targetHouse.color, x: targetHouse.x, y: targetHouse.y, expires: now + 1100 };
      this.package.assign(this.houses);
    }
    for (let i = 0; i < this.zones.length; i += 1) {
      if (circleIntersectsRect(this.drone, this.zones[i]) && (this.zoneCooldowns.get(i) || 0) < now) {
        this.score = Math.max(0, this.score - 25);
        this.combo = 0;
        this.zoneCooldowns.set(i, now + 1100);
        this.feedback = { text: "NO-FLY ZONE -25", detail: "COMBO RESET", color: "#ff6277", x: this.drone.x, y: this.drone.y, expires: now + 1000 };
        break;
      }
    }
    for (const obstacle of this.obstacles) {
      if (circlesIntersect(this.drone, obstacle, 1) && obstacle.hitUntil < now) {
        this.score = Math.max(0, this.score - CONFIG.OBSTACLE_PENALTY);
        this.combo = 0;
        obstacle.hitUntil = now + 900;
        this.feedback = { text: `AIR TRAFFIC -${CONFIG.OBSTACLE_PENALTY}`, detail: "COMBO RESET", color: obstacle.color, x: obstacle.x, y: obstacle.y, expires: now + 1000 };
        break;
      }
    }
    return this.remaining <= 0;
  }
}

function createHouses() {
  const positions = [
    { x: 170, y: 190 }, { x: 1060, y: 180 }, { x: 250, y: 565 }, { x: 1030, y: 540 }
  ];
  return positions.slice(0, CONFIG.HOUSE_COUNT).map((position, index) => new House({ ...position, id: index, color: CONFIG.COLORS[index % CONFIG.COLORS.length], name: CONFIG.HOUSE_NAMES[index % CONFIG.HOUSE_NAMES.length] }));
}
