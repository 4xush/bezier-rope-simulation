// Cubic Bézier curve values :
// The curve position is computed as a weighted sum of four control points.
// Formula: B(t) = (1 − t)³ · P0 + 3(1 − t)²t · P1 + 3(1 − t)t² · P2 + t³ · P3

export function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  // weights for each control point
  const w0 = u * u * u;
  const w1 = 3 * u * u * t;
  const w2 = 3 * u * t * t;
  const w3 = t * t * t;

  return {
    x: w0 * p0.x + w1 * p1.x + w2 * p2.x + w3 * p3.x,
    y: w0 * p0.y + w1 * p1.y + w2 * p2.y + w3 * p3.y
  };
}
