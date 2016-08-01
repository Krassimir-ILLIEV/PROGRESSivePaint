//#region global variables

    var coords = {
        x: 0,
        y: 0
    };
    var border = {
        color: "#000",
        width: "1",
        style: "solid"
    };
    var fillColor = "transparent";

// #endregion




function setStartCoords(e) {
    var svgCoords = $("#svgDrawing").offset();
    coords.x = e.clientX - svgCoords.left;
    coords.y = e.clientY - svgCoords.top;
}

function addSvgTag(tagName) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", tagName);;

    $("#svgDrawing").html(element);

    return element;
}