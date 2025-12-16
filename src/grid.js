// Draw grid with turbulent displacement
export function drawGrid(ctx, canvas, time) {
    const gridSize = 60;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;

    // Vertical lines with turbulence
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 10) {
            // Add subtle wave displacement
            const displacement = Math.sin(y * 0.01 + time * 0.001) * 3 +
                Math.cos(y * 0.02 + time * 0.0015) * 2;
            const offsetX = x + displacement;

            if (y === 0) ctx.moveTo(offsetX, y);
            else ctx.lineTo(offsetX, y);
        }
        ctx.stroke();
    }

    // Horizontal lines with turbulence
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
            // Add subtle wave displacement
            const displacement = Math.sin(x * 0.01 + time * 0.001) * 3 +
                Math.cos(x * 0.02 + time * 0.0015) * 2;
            const offsetY = y + displacement;

            if (x === 0) ctx.moveTo(x, offsetY);
            else ctx.lineTo(x, offsetY);
        }
        ctx.stroke();
    }
}
