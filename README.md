# Interactive Bézier Curve with Spring Physics

A rope-like interactive curve that responds to mouse movement with smooth spring physics.

## Project Structure

```
├── index.html
└── src/
    ├── bezier.js   # Bézier curve math
    ├── input.js    # Mouse/touch tracking
    ├── spring.js   # Spring physics
    ├── grid.js     # Animated grid background
    └── render.js   # Animation loop & drawing
```

## Math

### Cubic Bézier Curve

The curve uses the standard cubic Bézier formula:

```
B(t) = (1−t)³·P0 + 3(1−t)²t·P1 + 3(1−t)t²·P2 + t³·P3
```

- `P0` and `P3` are fixed endpoints
- `P1` and `P2` follow the mouse as control points
- `t` goes from 0 to 1 to trace the curve

### Tangent Vectors

The derivative gives us the curve's direction at any point:

```
dx = 3(1−t)²(P1.x−P0.x) + 6(1−t)t(P2.x−P1.x) + 3t²(P3.x−P2.x)
dy = 3(1−t)²(P1.y−P0.y) + 6(1−t)t(P2.y−P1.y) + 3t²(P3.y−P2.y)
```

Normalized to draw direction arrows.

## Physics Model

### Spring Dynamics (Hooke's Law)

Control points are pulled toward the mouse like springs:

```
acceleration = -stiffness × (position - target) - damping × velocity
velocity += acceleration
position += velocity
```

**Parameters:**

- `stiffness = 0.03` - Spring strength
- `damping = 0.12` - Friction/smoothing

This creates natural bouncy motion instead of robotic tracking.

## Design Choices

**Spring Physics** - Gives the curve weight and organic feel  
**Cubic Bézier** - Smooth curves, industry standard, efficient  
**Animated Grid** - Turbulent displacement using `sin(position + time)` for visual depth  
**Visual Elements** - White curve, red arrows (tangents), red/gray control points, FPS counter

**Performance** - 100 curve points, ~600 operations/frame, 60 FPS on all devices

## How to Run

Needs a local server for ES6 modules:

```bash
python -m http.server 8000
# Open http://localhost:8000
```

Or use VS Code Live Server extension.

---

**Tech:** Vanilla JavaScript, HTML5 Canvas
