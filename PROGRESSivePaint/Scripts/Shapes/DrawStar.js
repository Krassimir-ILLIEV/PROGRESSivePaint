function addStarListener() {
    $("#svgDrawing").off();
    $("#svgDrawing").on("mousedown", drawStar);

}

function drawStar(e) {
    onStarStart(e.clientX - 50, e.clientY - 67, 5, 50, 20);
}

function onStarStart(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = brush.color;
    ctx.lineWidth = brush.width;
    ctx.stroke();
    ctx.fillStyle = color.second;
    
    ctx.fill();
}