var squareWidth;
var squareDiagonal;
var currentX,
    currentY;

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
    $(square).attr("stroke", border.color);
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
    currentX = e.clientX - svgCoords.left;
    currentY = e.clientY - svgCoords.top;

    squareWidth = Math.abs(currentX - coords.x);

    if (currentX < coords.x && currentY < coords.y) {
        $(square).attr("x", currentX);
        $(square).attr("y", currentY);
    }
    else if (currentX < coords.x && currentY >= coords.y) {
        $(square).attr("x", currentX);
    }
    else if (currentX >= coords.x && currentY < coords.y) {
        $(square).attr("y", currentY);
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
    if (currentX < coords.x && currentY < coords.y) {
        ctx.rect(currentX, currentY, squareWidth, squareWidth);
    }
    else if (currentX < coords.x && currentY >= coords.y) {
        ctx.rect(currentX, coords.y, squareWidth, squareWidth);
    }
    else if (currentX >= coords.x && currentY < coords.y) {
        ctx.rect(coords.x, currentY, squareWidth, squareWidth);
    }
    else {
        ctx.rect(coords.x, coords.y, squareWidth, squareWidth);
    }
    ctx.strokeStyle = border.color;
    ctx.stroke();

    squareWidth = 0;
}