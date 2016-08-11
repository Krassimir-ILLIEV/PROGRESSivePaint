

var enableDraw = false;
started = false;

function addBrushListener(e) {
    $("#svgDrawing").off();
    var brush = addSvgTag("brush");

    $("#svgDrawing").on("mousemove", onMouseMove);

    /*$("#svgDrawing").on('click', function (e) {
        onClick(e);
    });*/

    $("#svgDrawing").on('mousedown', function (e) {
        enableDraw = true;
    });
    $("#svgDrawing").on('mouseup', function (e) {
        enableDraw = false;
        started = false;
    });
}

function onMouseMove(ev) {

    var c = document.getElementById("playground");
    var context = c.getContext("2d");
    var x, y;

    /*if (ev.layerX >= 0) {
        x = ev.layerX - 50;
        y = ev.layerY - 5;
    }
    else if (ev.offsetX >= 0) {
        x = ev.offsetX - 50;
        y = ev.offsetY - 5;
    }*/
    x = ev.clientX - $(c).offset().left;
    y = ev.clientY - $(c).offset().top;

    context.lineWidth = brush.width;
    if (enableDraw) {
        if (!started) {
            started = true;

            context.beginPath();
            context.moveTo(x, y);
        }
        else {
            context.lineTo(x, y);
            context.strokeStyle = brush.color;
            context.stroke();
        }
    }
}



function setBrush() {
    $('#sizeBrush').css({ position: "absolute", zIndex: 10, cursor: 'pointer' }).hide();
    $('#sizeBrush').hover(function () {
        $('#sizeBrush').show();
    },
    function () {
        $('#sizeBrush').hide();
    });

    $('#brush').hover(function () {
        $('#sizeBrush').show();
        $('#sizeBrush').offset({
            top: $('#brush').offset().top + 30,
            left: $('#brush').offset().left
        });
    },
    function () {
        $('#sizeBrush').hide();
    });
    brush.width = $('#brushSizeSlider').val();
    $('#brushSizeSlider').change(function (e) {      
        brush.width = $(this).val();
        $('#blackDot').width(brush.width);
        

	});

}

