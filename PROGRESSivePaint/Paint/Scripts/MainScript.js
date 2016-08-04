$(document).ready(onload);

function onload() {
    expandPalyground();
    addButtonsEvents();
}

function expandPalyground() {
    canvasContext = $("#playground")[0].getContext("2d");
    canvasContext.canvas.width = $("#svgDrawing").width();
    canvasContext.canvas.height = $("#svgDrawing").height();
}

function addButtonsEvents() {
    $("#circle").on("click", addCircleListener);
    $("#ellipse").on("click", addEllipseListener);
    $("#line").on("click", addLineListener);
    $("#brush").on("click", addBrushListener);
    $("#save").on("click", addSaveListener);

}
