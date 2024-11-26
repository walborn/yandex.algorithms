function drawTree(startY, angle, level = 0) {
    const startX = canvas.width / 2;
    const len = length * Math.pow(depth, level);
    
    ctx.beginPath();
    ctx.save();

    ctx.translate(level ? 0 : startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);

    ctx.strokeStyle = calculateColor(level);
    ctx.lineWidth = calculateWidth(level);

    ctx.stroke();

    if (len < 10) {
        ctx.restore();
        return;
    }

    const newLevel = level + 1;

    drawTree(-len, angle + angleOffset, newLevel);
    drawTree(-len, angle - angleOffset, newLevel);

    ctx.restore();
};
