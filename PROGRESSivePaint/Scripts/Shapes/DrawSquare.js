var squareWidth;
var squareDiagonal;

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
    $(square).attr("stroke", color.first);
    $(square).attr("stroke-width", border.width);
    $(square).attr("fill", color.second);


    $("#svgDrawing").on("mousemove", { rect: square }, function (e) {
        updateSquareSize(e);
    });
    $("#svgDrawing").on("mouseup", onSquareEnd);

}

function updateSquareSize(e) {
    var svgCoords = $("#svgDrawing").offset();

    var square = e.data.rect;
    var currentX = e.clientX - svgCoords.left;
    var currentY = e.clientY - svgCoords.top;

    squareWidth = Math.abs(currentX - coords.x);

    if (currentX < coords.x && currentY < coords.y) {
        squareWidth -= 2 * squareWidth;
    }
    else if (currentX < coords.x && currentY >= coords.y) {
        squareWidth -= 2 * squareWidth;
    }
    else if (currentX >= coords.x && currentY < coords.y) {

    }

    $(square).attr("width", squareWidth);
    $(square).attr("height", squareWidth);

}

function onSquareEnd() {
    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    $("#svgDrawing").off("mouseup mousemove");
    $("#svgDrawing").html("");

    ctx.beginPath();
    ctx.rect(coords.x, coords.y, squareWidth, squareWidth);
    ctx.strokeStyle = border.color;
    ctx.stroke();

    squareWidth = 0;
}