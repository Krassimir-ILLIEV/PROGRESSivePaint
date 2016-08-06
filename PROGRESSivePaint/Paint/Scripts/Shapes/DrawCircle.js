var radius;


function addCircleListener() {
    $("#svgDrawing").off();
    $("#svgDrawing").on("mousedown", onCircleStart);
}

function onCircleStart(e) {
    var circle = addSvgTag("circle");

    setStartCoords(e);

    $(circle).attr("cx", coords.x);
    $(circle).attr("cy", coords.y);
    $(circle).attr("r", 0);
    $(circle).attr("stroke", border.color);
    $(circle).attr("stroke-width", border.width);
    $(circle).attr("fill", color.second);

    $("#svgDrawing").on("mouseup", onCircleEnd);
    $("#svgDrawing").on("mousemove", { circle: circle }, function (e) {
        updateCircleRadius(e);
    });
}

function updateCircleRadius(e) {
    var svgCoords = $("#svgDrawing").offset();

    var circle = e.data.circle;
    var currentX = e.clientX - svgCoords.left;
    var currentY = e.clientY - svgCoords.top;

    radius = Math.sqrt(Math.pow(currentX - coords.x, 2) + Math.pow(currentY - coords.y, 2));
    $(circle).attr("r", radius);

}

function onCircleEnd() {
    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    $("#svgDrawing").off("mouseup mousemove");
    $("#svgDrawing").html("");

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = border.color;
    ctx.stroke();

    radius = 0;
}
