export const CONFIG = Object.freeze({
  CANVAS_WIDTH: 1280,
  CANVAS_HEIGHT: 720,
  GAME_DURATION_SECONDS: 40,
  HOUSE_COUNT: 4,
  NO_FLY_ZONE_COUNT: 2,
  NO_FLY_ZONE_MIN_SIZE: 115,
  NO_FLY_ZONE_MAX_SIZE: 180,
  MOVING_OBSTACLE_COUNT: 3,
  MOVING_OBSTACLE_RADIUS: 27,
  OBSTACLE_PENALTY: 50,
  DRONE_RADIUS: 25,
  COLLISION_RADIUS: 34,
  DRONE_SMOOTHING: 0.16,
  HAND_SENSITIVITY: 1.55,
  TRACKING_LOST_TIMEOUT_MS: 700,
  LEADERBOARD_LIMIT: 10,
  LEADERBOARD_KEY: "drone-delivery-challenge-leaderboard-v1",
  COLORS: ["#ff6b6b", "#ffd166", "#65e4df", "#b58cff"],
  HOUSE_NAMES: ["Aster", "Bima", "Citra", "Damar"]
});

export const GAME_STATES = Object.freeze({
  IDLE: "idle",
  CALIBRATION: "calibration",
  COUNTDOWN: "countdown",
  PLAYING: "playing",
  ENDED: "ended"
});
