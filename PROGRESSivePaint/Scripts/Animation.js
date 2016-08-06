var t = 0;
var frameInterval = 10;
var canvas = null; // canvas DOM object
var context = null; // canvas context

function saveOriginalPosition() {
    //alert("buttons---");
    var d = 300;
    $(".button").each(function (i) {
        $(this).css("position","absolute");
        $(this).attr("orgX", $(this).position().left);
        $(this).attr("orgY", $(this).position().top);
        $(this).offset({ left: 500, top: 300 }).css("zIndex", 20);
        $(this).delay(d).animate({
            left: $(this).attr("orgX")+i*80,
            top: $(this).attr("orgY")
        }, 2000);
        d = d + 300;
    });
    $(".colorbox").fadeOut(0);
        
        
   // showCanvas();

   //initTextAnimation();
}
function fadingColorBoxes() {
    var d = 0;
    $(".colorbox").each(function () {
        var $self = $(this);
        $self.delay(d).fadeIn(500);
        d = d + 100;
    });

}
function showCanvas() {
    //$("#svgDrawing").slideUp(0);
    //$("#svgDrawing").slideDown(1000);
}

function initTextAnimation(){   //using vanilla js and canvas
    canvas = document.getElementById("playground");
    context = canvas.getContext("2d");
    //initStageObject();
    //setInterval(updateStage, frameInterval);
    requestAnimationFrame(drawSt);

}

function updateStage() {
    t += frameInterval;
    clearCanvas();
    //updateStageObject();
    drawStageObjects();
}
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function initStageObjects() {
    
}

function drawStageObjects() {
    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "green";
    context.rect(30 + t, 30 + t, 50 + t, 50);
    context.strokeText("Telerik Academy", canvas.width - t, 250);
    context.font = "60px Arial";
    context.stroke();
}

function drawSt(timestamp) {
    clearCanvas();
    t += frameInterval;
    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "green";
    var text = "Telerik Academy Team YellowBird 2016";
    context.strokeText(text, canvas.width - t, 350);
    context.font = "90px Arial";
    context.stroke();
    var metrics = context.measureText(text);
    if (canvas.width+metrics.width- t>0) {
        requestAnimationFrame(drawSt);
    } else {
        fadingColorBoxes();
    }

    
}


function updateStageObjects() {

}