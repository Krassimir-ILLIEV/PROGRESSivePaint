$(document).ready(onload);

function onload() {
    saveOriginalPosition();
    expandPalyground();
    addButtonsEvents();
    addColorListeners();
}

function expandPalyground() {
    canvasContext = $("#playground")[0].getContext("2d");

    canvasContext.canvas.width = $("#svgDrawing").width();
    canvasContext.canvas.height = $("#svgDrawing").height();
    //$(canvasContext.canvas).animate({ width: $("#svgDrawing").width(), height: $("#svgDrawing").height() }, 1000, initTextAnimation);
    initTextAnimation();
    setPalette();
    setBrush();
}

function addButtonsEvents() {
    $("#circle").on("click", addCircleListener);
    $("#ellipse").on("click", addEllipseListener);
    $("#line").on("click", addLineListener);
    $("#brush").on("click", addBrushListener);
    $("#save").on("click", addSaveListener);
    $('#elementToLoad').change(selectFile);

    $("#load").on("click", addLoadListener);
    $("#rect").on("click", addRectangleListener);
    $("#square").on("click", addSquareListener);


}
