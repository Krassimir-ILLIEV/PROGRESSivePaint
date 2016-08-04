var xEnd,
    yEnd;


function addLineListener() {
    $("#svgDrawing").off();
    $("#svgDrawing").on("mousedown", onLineStart);
}

function onLineStart(e) {
    var line = addSvgTag("line");

    setStartCoords(e);

    $(line).attr("x1", coords.x);
    $(line).attr("y1", coords.y);
    $(line).attr("x2", coords.x);
    $(line).attr("y2", coords.y);
    $(line).attr("stroke", border.color);
    $(line).attr("stroke-width", border.width);

    $("#svgDrawing").on("mouseup", onLineEnd);
    $("#svgDrawing").on("mousemove", { line: line }, function (e) {
        updateLineLength(e);
    });
}

function updateLineLength(e) {

    var svgCoords = $("#svgDrawing").offset();

    var line = e.data.line;
    var currentX = e.clientX - svgCoords.left;
    var currentY = e.clientY - svgCoords.top;

    xEnd = currentX;
    yEnd = currentY;

    $(line).attr("x2", xEnd);
    $(line).attr("y2", yEnd);
}

function onLineEnd() {
    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    $("#svgDrawing").off("mouseup mousemove");
    $("#svgDrawing").html("");

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();

    xEnd = 0;
    yEnd = 0;
}
