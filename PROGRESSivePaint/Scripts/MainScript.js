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
    initTextAnimation();
    setPalette();
    setBrush();
    setupinputBoxContent();
}

function addButtonsEvents() {
    $("#circle").on("click", addCircleListener);
    $("#ellipse").on("click", addEllipseListener);
    $("#line").on("click", addLineListener);
    $("#rect").on("click", addRectangleListener);
    $("#square").on("click", addSquareListener);
    $("#brush").on("click", addBrushListener);
    $("#wobblyText").on("click", addWobblyTextListener);
    $("#save").on("click", addSaveListener);
    $("#load").on("click", addLoadListener);

    $("#star").on("click", addStarListener);
    $("#clear").on("click", clearScreen);

    $('#elementToLoad').change(selectFile);
}
