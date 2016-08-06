//#region global variables

    var coords = {
        x: 0,
        y: 0
    };
    var color = {
        first: "#000",
        second: "transparent"
    }
    var border = {
        color: color.first,
        width: "1",
        style: "solid"
    };
// #endregion




function setStartCoords(e) {
    var svgCoords = $("#svgDrawing").offset();
    coords.x = e.clientX - svgCoords.left;
    coords.y = e.clientY - svgCoords.top;
}

function addSvgTag(tagName) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", tagName);

    $("#svgDrawing").html(element);

    return element;
}