export function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

export function drawWorld(ctx, width, height, time) {
  ctx.fillStyle = "#7bd4ea";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255, 232, 153, .85)";
  ctx.beginPath(); ctx.arc(width - 110, 92, 44, 0, Math.PI * 2); ctx.fill();
  drawCloud(ctx, 220, 105, 1.1); drawCloud(ctx, 930, 78, .85); drawCloud(ctx, 1130, 325, .65);
  drawIsland(ctx, 0, 78, width, height - 62);
  drawRoads(ctx, time);
  ctx.fillStyle = "#264357";
  ctx.font = "900 11px system-ui"; ctx.fillText("DRONE DELIVERY DAY", 31, 42);
  ctx.fillStyle = "rgba(38, 67, 87, .7)";
  ctx.font = "700 9px system-ui"; ctx.fillText("CAMPUS AIRSPACE / SECTOR 07", 31, 59);
  ctx.fillStyle = "#264357"; ctx.font = "900 10px system-ui"; ctx.fillText("N", width - 40, 38);
  ctx.strokeStyle = "#264357"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(width - 37, 46); ctx.lineTo(width - 37, 67); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(width - 37, 46); ctx.lineTo(width - 42, 53); ctx.moveTo(width - 37, 46); ctx.lineTo(width - 32, 53); ctx.stroke();
}

function drawCloud(ctx, x, y, scale) {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale); ctx.fillStyle = "rgba(255,255,255,.66)";
  ctx.beginPath(); ctx.arc(-25, 5, 20, 0, Math.PI * 2); ctx.arc(0, -5, 28, 0, Math.PI * 2); ctx.arc(27, 5, 19, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(-42, 5, 84, 18); ctx.restore();
}

function drawIsland(ctx, x, y, width, height) {
  ctx.fillStyle = "#9bd86c";
  ctx.beginPath(); ctx.moveTo(x, y + 85); ctx.quadraticCurveTo(width * .23, y - 8, width * .46, y + 52); ctx.quadraticCurveTo(width * .72, y - 4, width, y + 75); ctx.lineTo(width, height); ctx.lineTo(x, height); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "rgba(57, 141, 99, .16)";
  for (let i = 0; i < 28; i += 1) { ctx.beginPath(); ctx.arc((i * 211) % width, y + 90 + ((i * 83) % (height - y - 80)), 4 + (i % 3), 0, Math.PI * 2); ctx.fill(); }
}

function drawRoads(ctx, time) {
  ctx.save(); ctx.lineCap = "round";
  const roads = [[85, 320, 350, 270, 680, 350, 1160, 270], [415, 115, 425, 240, 390, 450, 520, 630], [800, 130, 850, 250, 760, 450, 1080, 590]];
  ctx.strokeStyle = "#f7d88b"; ctx.lineWidth = 34;
  roads.forEach((road) => { ctx.beginPath(); ctx.moveTo(road[0], road[1]); ctx.bezierCurveTo(road[2], road[3], road[4], road[5], road[6], road[7]); ctx.stroke(); });
  ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 3; ctx.setLineDash([14, 17]); ctx.lineDashOffset = -(time * .03);
  roads.forEach((road) => { ctx.beginPath(); ctx.moveTo(road[0], road[1]); ctx.bezierCurveTo(road[2], road[3], road[4], road[5], road[6], road[7]); ctx.stroke(); });
  ctx.restore();
}

export function drawHouse(ctx, house) {
  ctx.save(); ctx.translate(house.x, house.y);
  ctx.fillStyle = "rgba(38,67,87,.2)"; ctx.beginPath(); ctx.ellipse(0, 32, 44, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.beginPath(); ctx.arc(0, 0, house.radius + 10, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = house.color; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, house.radius + 7, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#fffaf0"; roundedRect(ctx, -29, -13, 58, 39, 8); ctx.fill();
  ctx.fillStyle = house.color; ctx.beginPath(); ctx.moveTo(-37, -8); ctx.lineTo(0, -39); ctx.lineTo(37, -8); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#536a7a"; roundedRect(ctx, -8, 5, 16, 21, 3); ctx.fill();
  ctx.fillStyle = "#b9eaf0"; roundedRect(ctx, -21, -5, 11, 10, 3); ctx.fill(); roundedRect(ctx, 10, -5, 11, 10, 3); ctx.fill();
  ctx.fillStyle = "#264357"; ctx.font = "900 11px system-ui"; ctx.textAlign = "center"; ctx.fillText(house.name.toUpperCase(), 0, 51);
  ctx.restore();
}

export function drawNoFlyZone(ctx, zone, time) {
  ctx.save(); ctx.fillStyle = "rgba(255, 91, 103, .3)"; ctx.strokeStyle = "#ff5b67"; ctx.lineWidth = 3;
  roundedRect(ctx, zone.x, zone.y, zone.width, zone.height, 14); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.beginPath(); roundedRect(ctx, zone.x, zone.y, zone.width, zone.height, 14); ctx.clip(); ctx.strokeStyle = "rgba(255,255,255,.22)"; ctx.lineWidth = 10;
  for (let x = zone.x - zone.height; x < zone.x + zone.width; x += 25) { ctx.beginPath(); ctx.moveTo(x, zone.y + zone.height); ctx.lineTo(x + zone.height, zone.y); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = "#9c263d"; ctx.font = "900 10px system-ui"; ctx.textAlign = "center"; ctx.fillText("NO-FLY", zone.x + zone.width / 2, zone.y + zone.height / 2 + 4);
  ctx.fillStyle = "#fffaf0"; ctx.font = "800 8px system-ui"; ctx.fillText("KEEP CLEAR", zone.x + zone.width / 2, zone.y + zone.height / 2 + 18);
  ctx.restore();
}

export function drawMissionRoute(ctx, drone, targetHouse, color, time) {
  if (!targetHouse) return;
  ctx.save(); ctx.strokeStyle = color; ctx.globalAlpha = .75; ctx.lineWidth = 3; ctx.setLineDash([8, 12]); ctx.lineDashOffset = -(time * .04);
  ctx.beginPath(); ctx.moveTo(drone.x, drone.y); ctx.lineTo(targetHouse.x, targetHouse.y); ctx.stroke(); ctx.setLineDash([]);
  ctx.globalAlpha = .85; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(targetHouse.x, targetHouse.y, 48 + Math.sin(time * .006) * 5, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}

export function drawMovingObstacle(ctx, obstacle, time) {
  ctx.save(); ctx.translate(obstacle.x, obstacle.y); const bob = Math.sin(time * .01 + obstacle.phase) * 2;
  ctx.fillStyle = "rgba(38,67,87,.2)"; ctx.beginPath(); ctx.ellipse(0, 36, 35, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = obstacle.color; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-45, bob); ctx.lineTo(-28, bob); ctx.moveTo(28, bob); ctx.lineTo(45, bob); ctx.stroke();
  ctx.fillStyle = "#fffaf0"; ctx.strokeStyle = obstacle.color; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, bob, obstacle.radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = obstacle.color; ctx.beginPath(); ctx.arc(0, bob - 18, 11, Math.PI, 0); ctx.fill();
  ctx.fillStyle = "#264357"; ctx.beginPath(); ctx.arc(-9, bob - 2, 3, 0, Math.PI * 2); ctx.arc(9, bob - 2, 3, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#264357"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, bob + 2, 10, .15, Math.PI - .15); ctx.stroke();
  ctx.fillStyle = "#264357"; ctx.font = "900 8px system-ui"; ctx.textAlign = "center"; ctx.fillText(obstacle.label, 0, 48);
  ctx.restore();
}

export function drawDrone(ctx, drone, time) {
  ctx.save(); ctx.translate(drone.x, drone.y); ctx.rotate(drone.angle);
  ctx.fillStyle = "rgba(38,67,87,.22)"; ctx.beginPath(); ctx.ellipse(0, 38, 38, 9, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#4f79dd"; ctx.lineWidth = 6; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(-35, -19); ctx.lineTo(35, 19); ctx.moveTo(-35, 19); ctx.lineTo(35, -19); ctx.stroke();
  ctx.fillStyle = "#fffaf0"; ctx.strokeStyle = "#264357"; ctx.lineWidth = 3; roundedRect(ctx, -24, -15, 48, 30, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#ff805e"; ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffc857"; for (const [x, y] of [[-41, -25], [41, -25], [-41, 25], [41, 25]]) { ctx.beginPath(); ctx.arc(x, y, 8 + Math.sin(time * .012) * 2, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}

export function drawFeedback(ctx, feedback, now, width) {
  if (!feedback || feedback.expires <= now) return;
  const progress = 1 - (feedback.expires - now) / 1100;
  ctx.save(); ctx.globalAlpha = Math.min(1, (feedback.expires - now) / 220); ctx.fillStyle = feedback.color; ctx.textAlign = "center";
  ctx.font = "900 22px system-ui"; ctx.fillText(feedback.text, width / 2, 112 - progress * 18);
  ctx.font = "800 10px system-ui"; ctx.fillText(feedback.detail, width / 2, 130 - progress * 18);
  if (feedback.x && feedback.y) { ctx.globalAlpha *= .45; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(feedback.x, feedback.y, 42 + progress * 56, 0, Math.PI * 2); ctx.stroke(); }
  ctx.restore();
}
