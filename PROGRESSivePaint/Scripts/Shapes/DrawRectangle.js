var rectWidth,
    rectHeight;

function addRectangleListener() {
    $("#svgDrawing").off();
    $("#svgDrawing").on("mousedown", onRectangleStart);
}

function onRectangleStart(e) {
    var rect = addSvgTag("rect");

    setStartCoords(e);

    $(rect).attr("x", coords.x);
    $(rect).attr("y", coords.y);
    $(rect).attr("width", 0);
    $(rect).attr("height", 0);
    $(rect).attr("stroke", color.first);
    $(rect).attr("fill", color.second);
    $(rect).attr("stroke-width", border.width);

    $("#svgDrawing").on("mousemove", { rect: rect }, function (e) {
        updateRectangleSize(e);
    });
    $("#svgDrawing").on("mouseup", onRectangleEnd);

}

function updateRectangleSize(e) {
    var svgCoords = $("#svgDrawing").offset();

    var rect = e.data.rect;
    var currentX = e.clientX - svgCoords.left;
    var currentY = e.clientY - svgCoords.top;

    rectWidth = Math.abs(currentX - coords.x);
    rectHeight = Math.abs(currentY - coords.y);

    if (currentX < coords.x && currentY < coords.y) {
        rectWidth -= 2 * rectWidth;
        rectHeight -= 2 * rectHeight;
    }
    else if (currentX < coords.x && currentY >= coords.y) {
        rectWidth -= 2 * rectWidth;
    }
    else if (currentX >= coords.x && currentY < coords.y) {
        rectHeight -= 2 * rectHeight;
    }

    console.log("Height");
    console.log(rectHeight);
    console.log("Width");
    console.log(rectWidth);


    $(rect).attr("width", rectWidth);
    $(rect).attr("height", rectHeight);

}

function onRectangleEnd() {
    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    $("#svgDrawing").off("mouseup mousemove");
    $("#svgDrawing").html("");

    ctx.beginPath();
    ctx.rect(coords.x, coords.y, rectWidth, rectHeight);
    ctx.strokeStyle = border.color;
    ctx.stroke();

    rectWidth = 0;
    rectHeight = 0;

}