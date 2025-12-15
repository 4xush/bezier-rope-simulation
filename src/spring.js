export function createPoint(x, y) {
    return {
        x, y,
        vx: 0, vy: 0,
        tx: x, ty: y
    };
}

export function updateSpring(p, k, damping) {
    const ax = -k * (p.x - p.tx) - damping * p.vx;
    const ay = -k * (p.y - p.ty) - damping * p.vy;

    p.vx += ax;
    p.vy += ay;

    p.x += p.vx;
    p.y += p.vy;
}
