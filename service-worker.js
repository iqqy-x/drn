const CACHE_NAME = "drone-delivery-shell-v6";
const APP_SHELL = ["./", "./index.html", "./style.css", "./src/main.js", "./src/config.js", "./src/game/Drone.js", "./src/game/GameState.js", "./src/game/House.js", "./src/game/MovingObstacle.js", "./src/game/NoFlyZone.js", "./src/game/Package.js", "./src/game/collision.js", "./src/tracking/coordMapper.js", "./src/tracking/handTracker.js", "./src/ui/hud.js", "./src/ui/leaderboard.js", "./src/ui/screens.js", "./src/utils/canvasHelpers.js", "./src/utils/storage.js"];
const MEDIAPIPE_ASSETS = [
  "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
];

self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE_NAME).then(async (cache) => {
  await cache.addAll(APP_SHELL);
  await Promise.allSettled(MEDIAPIPE_ASSETS.map(async (asset) => cache.put(asset, await fetch(asset, { mode: "cors" }))));
})));
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (event.request.url.includes("cdn.jsdelivr.net")) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => event.request.url.includes("cdn.jsdelivr.net") ? new Response("MediaPipe asset unavailable", { status: 503 }) : caches.match("./index.html"))));
});
