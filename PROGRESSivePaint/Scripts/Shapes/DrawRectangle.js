﻿var rectWidth,
    rectHeight,
    currentX,
    currentY;

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
    $(rect).attr("stroke", brush.color);
    $(rect).attr("fill", color.second);
    $(rect).attr("stroke-width", brush.width);

    $("#svgDrawing").on("mousemove", { rect: rect }, function (e) {
        updateRectangleSize(e);
    });
    $("#svgDrawing").on("mouseup", onRectangleEnd);
}

function updateRectangleSize(e) {
    var svgCoords = $("#svgDrawing").offset();

    var rect = e.data.rect;
    currentX = e.clientX - svgCoords.left;
    currentY = e.clientY - svgCoords.top;

    rectWidth = Math.abs(currentX - coords.x);
    rectHeight = Math.abs(currentY - coords.y);
    currentX = Math.min(currentX, coords.x);
    currentY = Math.min(currentY, coords.y);
        

    $(rect).attr("x", currentX);
    $(rect).attr("y", currentY);
    $(rect).attr("width", rectWidth);
    $(rect).attr("height", rectHeight);

}

function onRectangleEnd() {
    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    $("#svgDrawing").off("mouseup mousemove");
    $("#svgDrawing").html("");

    ctx.beginPath();
   /*
    if (currentX < coords.x && currentY < coords.y) {
        ctx.rect(currentX, currentY, rectWidth, rectHeight);
    }
    else if (currentX < coords.x && currentY >= coords.y) {
        ctx.rect(currentX, coords.y, rectWidth, rectHeight);
    }
    else if (currentX >= coords.x && currentY < coords.y) {
        ctx.rect(coords.x, currentY, rectWidth, rectHeight);
    }
    else {
        ctx.rect(coords.x, coords.y, rectWidth, rectHeight);
    }
    */
    ctx.rect(currentX, currentY, rectWidth, rectHeight);
    ctx.strokeStyle = brush.color;
    ctx.lineWidth = brush.width;
    ctx.stroke();

    rectWidth = 0;
    rectHeight = 0;

}