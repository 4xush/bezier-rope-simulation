// Track where the mouse is on the canvas
// We'll use this to bend the curve around
export function mouseTracker(canvas) {
  const pos = { x: 0, y: 0 };

  canvas.addEventListener("mousemove", e => {
    // Figure out where the mouse is relative to the canvas, not the whole page
    const r = canvas.getBoundingClientRect();
    pos.x = e.clientX - r.left;
    pos.y = e.clientY - r.top;
  });

  return pos;
}
