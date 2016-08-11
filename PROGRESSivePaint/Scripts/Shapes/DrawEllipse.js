var radiusX,
    radiusY;

function addEllipseListener() {
    $("#svgDrawing").off();
    $("#svgDrawing").on("mousedown", onEllipseStart);
}

function onEllipseStart(e) {
    var ellipse = addSvgTag("ellipse");

    setStartCoords(e);

    $(ellipse).attr("cx", coords.x);
    $(ellipse).attr("cy", coords.y);
    $(ellipse).attr("rx", 0);
    $(ellipse).attr("ry", 0);
    $(ellipse).attr("stroke", brush.color);
    $(ellipse).attr("stroke-width", brush.width);
    $(ellipse).attr("fill", color.second);
    
    $("#svgDrawing").on("mouseup", onEllipseEnd);
    $("#svgDrawing").on("mousemove", { ellipse: ellipse }, function (e) {
        updateEllipseRadius(e);
    });
}

function updateEllipseRadius(e) {
    var svgCoords = $("#svgDrawing").offset();

    var ellipse = e.data.ellipse;
    var currentX = e.clientX - svgCoords.left;
    var currentY = e.clientY - svgCoords.top;

    radiusX = Math.abs(currentX - coords.x);
    radiusY = Math.abs(currentY - coords.y);

    $(ellipse).attr("rx", radiusX);
    $(ellipse).attr("ry", radiusY);
}

function onEllipseEnd() {
    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    $("#svgDrawing").off("mouseup mousemove");
    $("#svgDrawing").html("");

    ctx.beginPath();
    ctx.ellipse(coords.x, coords.y, radiusX, radiusY, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.strokeStyle = brush.color;
    ctx.lineWidth = brush.width;
    ctx.stroke();

    radiusX = 0;
    radiusY = 0;
}