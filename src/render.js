import { cubicBezier } from "./bezier.js";
import { mouseTracker } from "./input.js";

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
const p1 = { x: canvas.width * 0.3, y: canvas.height * 0.3 };
const p2 = { x: canvas.width * 0.7, y: canvas.height * 0.7 };

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

// Make the control points follow the mouse around
// This gives us that smooth, stretchy effect on the curve
function updateControlPoints() {
  p1.x = p0.x + (mouse.x - p0.x) * 0.4;
  p1.y = mouse.y;

  p2.x = p3.x + (mouse.x - p3.x) * 0.4;
  p2.y = mouse.y;
}

// Keep everything running smoothly
function frame() {
  updateControlPoints();
  draw();
  requestAnimationFrame(frame);
}

frame();
