import { CONFIG } from "../config.js";

const ROUTES = [
  { x: 575, y: 175, amplitudeX: 230, amplitudeY: 22, speed: .00125, phase: .2, color: "#ff7b68", label: "AIR TAXI" },
  { x: 590, y: 405, amplitudeX: 185, amplitudeY: 48, speed: .00155, phase: 2.1, color: "#f5b84b", label: "AIR TAXI" },
  { x: 830, y: 290, amplitudeX: 52, amplitudeY: 150, speed: .00105, phase: 4.3, color: "#8c78e8", label: "AIR TAXI" }
];

export function createMovingObstacles() {
  return ROUTES.slice(0, CONFIG.MOVING_OBSTACLE_COUNT).map((route, index) => ({
    ...route,
    id: index,
    baseX: route.x,
    baseY: route.y,
    radius: CONFIG.MOVING_OBSTACLE_RADIUS,
    x: route.x,
    y: route.y,
    hitUntil: 0
  }));
}

export function updateMovingObstacles(obstacles, now, difficulty) {
  obstacles.forEach((obstacle) => {
    const elapsed = now * obstacle.speed * difficulty + obstacle.phase;
    obstacle.x = obstacle.baseX + Math.sin(elapsed) * obstacle.amplitudeX;
    obstacle.y = obstacle.baseY + Math.cos(elapsed * .83) * obstacle.amplitudeY;
  });
}
