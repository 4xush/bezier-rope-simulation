import { cubicBezier, cubicBezierTangent } from "./bezier.js";
import { mouseTracker } from "./input.js";
import { createPoint, updateSpring } from "./spring.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = mouseTracker(canvas);

let p0 = { x: 80, y: 0 };
let p3 = { x: 0, y: 0 };
let p1 = createPoint(0, 0);
let p2 = createPoint(0, 0);

const stiffness = 0.06;  // Lower = slower, smoother reaction
const damping = 0.12;    // Lower = more fluid movement

// FPS tracking
let lastFrameTime = performance.now();
let fps = 60;
let frameCount = 0;
let fpsUpdateTime = performance.now();

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  p0.x = 80;
  p0.y = canvas.height / 2;
  p3.x = canvas.width - 80;
  p3.y = canvas.height / 2;

  // Initialize control points on first run
  const isFirstRun = p1.x === 0 && p1.y === 0;
  if (isFirstRun) {
    p1.x = canvas.width * 0.3;
    p1.y = canvas.height * 0.3;
    p1.tx = p1.x;
    p1.ty = p1.y;

    p2.x = canvas.width * 0.7;
    p2.y = canvas.height * 0.7;
    p2.tx = p2.x;
    p2.ty = p2.y;
  }
}
window.addEventListener("resize", resize);
resize();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  ctx.beginPath();
  for (let t = 0; t <= 1; t += 0.02) {
    const pt = cubicBezier(t, p0, p1, p2, p3);
    if (t === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  }
  ctx.stroke();
}

function drawTangents() {
  ctx.strokeStyle = "#ff4444";
  ctx.fillStyle = "#ff4444";
  ctx.lineWidth = 2;

  [0.1, 0.3, 0.5, 0.7, 0.9].forEach(t => {
    const p = cubicBezier(t, p0, p1, p2, p3);
    const tan = cubicBezierTangent(t, p0, p1, p2, p3);

    const arrowLength = 60;
    const endX = p.x + tan.x * arrowLength;
    const endY = p.y + tan.y * arrowLength;

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Arrow head
    const angle = Math.atan2(tan.y, tan.x);
    const headSize = 10;

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headSize * Math.cos(angle - Math.PI / 6),
      endY - headSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      endX - headSize * Math.cos(angle + Math.PI / 6),
      endY - headSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  });
}

function drawControlPoints() {
  // Moving points
  ctx.fillStyle = "#ff4444";
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(p2.x, p2.y, 6, 0, Math.PI * 2);
  ctx.fill();

  // Fixed points
  ctx.fillStyle = "#888888";
  ctx.beginPath();
  ctx.arc(p0.x, p0.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(p3.x, p3.y, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "12px monospace";
  ctx.fillText("P0", p0.x + 10, p0.y - 10);
  ctx.fillText("P1", p1.x + 10, p1.y - 10);
  ctx.fillText("P2", p2.x + 10, p2.y - 10);
  ctx.fillText("P3", p3.x + 10, p3.y - 10);
}

function drawFPS() {
  ctx.fillStyle = "#00ff99";
  ctx.font = "14px monospace";
  ctx.fillText(`FPS: ${Math.round(fps)}`, 10, 20);
}

// Set target positions based on mouse
function updateControlTargets() {
  p1.tx = p0.x + (mouse.x - p0.x) * 0.4;
  p1.ty = mouse.y;

  p2.tx = p3.x + (mouse.x - p3.x) * 0.4;
  p2.ty = mouse.y;
}

function frame() {
  // Track FPS
  const currentTime = performance.now();
  const deltaTime = currentTime - lastFrameTime;
  lastFrameTime = currentTime;

  frameCount++;
  if (currentTime - fpsUpdateTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    fpsUpdateTime = currentTime;
  }

  updateControlTargets();
  updateSpring(p1, stiffness, damping);
  updateSpring(p2, stiffness, damping);
  draw();
  drawTangents();
  drawControlPoints();
  drawFPS();
  requestAnimationFrame(frame);
}

frame();
