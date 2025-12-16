// Track mouse/touch position on the canvas
export function mouseTracker(canvas) {
  const pos = { x: 0, y: 0, hasMoved: false };

  function updatePosition(e) {
    // Get position relative to canvas, not the page
    const r = canvas.getBoundingClientRect();
    pos.x = e.clientX - r.left;
    pos.y = e.clientY - r.top;
    pos.hasMoved = true;
  }

  canvas.addEventListener("mousemove", updatePosition);

  // Reset when mouse leaves canvas
  canvas.addEventListener("mouseleave", () => {
    pos.hasMoved = false;
  });

  // Touch support for mobile
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    updatePosition(touch);
  }, { passive: false });

  return pos;
}
