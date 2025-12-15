import { cubicBezier } from "./bezier.js";
import { mouseTracker } from "./input.js";
import { createPoint, updateSpring } from "./spring.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = mouseTracker(canvas);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const p0 = { x: 80, y: canvas.height / 2 };
const p3 = { x: canvas.width - 80, y: canvas.height / 2 };
const p1 = createPoint(canvas.width * 0.3, canvas.height * 0.3);
const p2 = createPoint(canvas.width * 0.7, canvas.height * 0.7);

const stiffness = 0.08;
const damping = 0.15;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;

  ctx.beginPath();
  for (let t = 0; t <= 1; t += 0.02) {
    const pt = cubicBezier(t, p0, p1, p2, p3);
    if (t === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  }
  ctx.stroke();
}

// Set where we want the control points to go based on mouse position
// The spring physics will handle the smooth bouncy movement
function updateControlTargets() {
  p1.tx = p0.x + (mouse.x - p0.x) * 0.4;
  p1.ty = mouse.y;

  p2.tx = p3.x + (mouse.x - p3.x) * 0.4;
  p2.ty = mouse.y;
}

// Animation loop with springy physics
function frame() {
  updateControlTargets();
  updateSpring(p1, stiffness, damping);
  updateSpring(p2, stiffness, damping);
  draw();
  requestAnimationFrame(frame);
}

frame();
