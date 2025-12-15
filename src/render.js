import { cubicBezier } from "./bezier.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

draw();
