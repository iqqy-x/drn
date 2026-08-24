export function circlesIntersect(a, b, radius = 0) {
  return Math.hypot(a.x - b.x, a.y - b.y) <= (a.radius || 0) + (b.radius || 0) + radius;
}

export function circleIntersectsRect(circle, rect) {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  return Math.hypot(circle.x - closestX, circle.y - closestY) <= circle.radius;
}
