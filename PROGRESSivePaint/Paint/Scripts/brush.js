function addBrushListener() {
    $("#svgDrawing").off();
    $("#svgDrawing").on("mousedown", startBrush);
}

    var enableDraw = false;
        started = false;
    var canvas,
      context;

function startBrush(e) {

    var line = addSvgTag("brush");

    $("#svgDrawing").on("mousemove", function (e) {
        onMouseMove(e);
    });
    /*$("#svgDrawing").on('click', function (e) {
        onClick(e);
    });*/

    $("#svgDrawing").on('mousedown', function (e){
      enableDraw = true;
    });
    $("#svgDrawing").on('mouseup', function (e){
      enableDraw = false;
      started = false;
    });
}

function onMouseMove(ev) {


    var c = document.getElementById("playground");
    var context = c.getContext("2d");
    var x, y;

    if (ev.layerX >= 0) {
        x = ev.layerX - 50;
        y = ev.layerY - 5;
    }
    else if (ev.offsetX >= 0) {
        x = ev.offsetX - 50;
        y = ev.offsetY - 5;
    }


    if (enableDraw) {
      if (!started) {
        started = true;

        context.beginPath();
        context.moveTo(x, y);
      }
      else {
        context.lineTo(x, y);
        context.stroke();
      }
    }
}
