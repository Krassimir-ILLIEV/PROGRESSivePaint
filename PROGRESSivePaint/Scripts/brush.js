var enableDraw = false;
started = false;

function addBrushListener(e) {
    $("#svgDrawing").off();
    var brush = addSvgTag("brush");

    $("#svgDrawing").on("mousemove", onMouseMove);

    $("#svgDrawing").on('mousedown', function (e) {
        enableDraw = true;
    });
    $("#svgDrawing").on('mouseup', function (e) {
        enableDraw = false;
        started = false;
    });
}

function onMouseMove(ev) {

    var canvas = document.getElementById("playground");
    var context = canvas.getContext("2d");
    var x, y;

    x = ev.clientX - $(canvas).offset().left;
    y = ev.clientY - $(canvas).offset().top;

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
    $('#blackDot').width($('#brushSizeSlider').val());

    $('#brushSizeSlider').change(function (e) {
        brush.width = $(this).val();
        $('#blackDot').width(brush.width);
    });

}

