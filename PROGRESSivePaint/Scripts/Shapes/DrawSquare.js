var squareWidth;
var squareDiagonal;
var currentX,
    currentY,
    topLeftX,
    topLeftY;

function addSquareListener() {
    $("#svgDrawing").off();
    $("#svgDrawing").on("mousedown", onSquareStart);
}

function onSquareStart(e) {
    var square = addSvgTag("rect");

    setStartCoords(e);

    $(square).attr("x", coords.x);
    $(square).attr("y", coords.y);
    $(square).attr("width", 0);
    $(square).attr("height", 0);
    $(square).attr("stroke", brush.color);
    $(square).attr("stroke-width", brush.width);
    $(square).attr("fill", color.second);


    $("#svgDrawing").on("mousemove", { rect: square }, function (e) {
        updateSquareSize(e);
    });
    $("#svgDrawing").on("mouseup", onSquareEnd);

}

function updateSquareSize(e) {
    var svgCoords = $("#svgDrawing").offset();

    var square = e.data.rect;
    currentX = e.clientX - svgCoords.left;
    currentY = e.clientY - svgCoords.top;

    var deltaY = Math.abs(currentY - coords.y);
    var deltaX = Math.abs(currentX - coords.x);
    squareWidth = Math.max(deltaY, deltaX);


    if (currentX < coords.x && currentY < coords.y) {
        topLeftX = coords.x - squareWidth;
        topLeftY = coords.y - squareWidth;
    }
    else if (currentX < coords.x && currentY >= coords.y) {
        topLeftX = coords.x - squareWidth;
        topLeftY = coords.y;
    }
    else if (currentX >= coords.x && currentY < coords.y) {
        topLeftX = coords.x;
        topLeftY = coords.y - squareWidth;
    }
    else {
        topLeftX = coords.x;
        topLeftY = coords.y;
    }
    $(square).attr("x", topLeftX);
    $(square).attr("y", topLeftY);

    $(square).attr("width", squareWidth);
    $(square).attr("height", squareWidth);

}

function onSquareEnd() {
    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    $("#svgDrawing").off("mouseup mousemove");
    $("#svgDrawing").html("");

    ctx.beginPath();

    ctx.rect(topLeftX,topLeftY,squareWidth,squareWidth);
    ctx.strokeStyle = brush.color;
    ctx.lineWidth = brush.width;
    ctx.stroke();

    squareWidth = 0;
}