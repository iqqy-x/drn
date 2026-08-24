import { CONFIG } from "../config.js";

export function createNoFlyZones(houses) {
  const zones = [];
  let attempts = 0;
  while (zones.length < CONFIG.NO_FLY_ZONE_COUNT && attempts < 100) {
    attempts += 1;
    const width = randomBetween(CONFIG.NO_FLY_ZONE_MIN_SIZE, CONFIG.NO_FLY_ZONE_MAX_SIZE);
    const height = randomBetween(CONFIG.NO_FLY_ZONE_MIN_SIZE, CONFIG.NO_FLY_ZONE_MAX_SIZE);
    const zone = { x: randomBetween(80, CONFIG.CANVAS_WIDTH - width - 80), y: randomBetween(110, CONFIG.CANVAS_HEIGHT - height - 70), width, height };
    const overlapsHouse = houses.some((house) => house.x > zone.x - 35 && house.x < zone.x + zone.width + 35 && house.y > zone.y - 35 && house.y < zone.y + zone.height + 35);
    const overlapsZone = zones.some((other) => zone.x < other.x + other.width + 30 && zone.x + width + 30 > other.x && zone.y < other.y + other.height + 30 && zone.y + height + 30 > other.y);
    if (!overlapsHouse && !overlapsZone) zones.push(zone);
  }
  return zones;
}

function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
