//given formula
// B(t) = (1−t)³·P0 + 3(1−t)²t·P1 + 3(1−t)t²·P2 + t³·P3
export function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  const w0 = u * u * u;
  const w1 = 3 * u * u * t;
  const w2 = 3 * u * t * t;
  const w3 = t * t * t;

  return {
    x: w0 * p0.x + w1 * p1.x + w2 * p2.x + w3 * p3.x,
    y: w0 * p0.y + w1 * p1.y + w2 * p2.y + w3 * p3.y
  };
}

// Get the tangent at any point on the curve with derivative of cubic Bezier
// B'(t) = 3(1−t)²(P1−P0) + 6(1−t)t(P2−P1) + 3t²(P3−P2)
export function cubicBezierTangent(t, p0, p1, p2, p3) {
  const u = 1 - t;

  const dx =
    3 * u * u * (p1.x - p0.x) +
    6 * u * t * (p2.x - p1.x) +
    3 * t * t * (p3.x - p2.x);

  const dy =
    3 * u * u * (p1.y - p0.y) +
    6 * u * t * (p2.y - p1.y) +
    3 * t * t * (p3.y - p2.y);

  // Normalize to get direction only
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}
