// animation globals
var t=0; 
var frameInterval = 25; // in ms
var ballRadius = 10;

// physics globals
var collisionDamper = 0.3;
var floorFriction = 0.0005 * frameInterval;
var restoreForce =0.002 * frameInterval;
//correction
floorFriction = floorFriction * 20;
restoreForce = restoreForce * 20;

var ctx = null,
    $inp = $("#inputTextForWobble"),
    w,h,
    balls = [],                                     // global ball array
	previousTxt="";
//generate($inp.val())                                 // init default text
$inp.keyup(function () { generate($(this).val()) });    // get some text to demo

               // fill must be a solid color

function addWobblyTextListener() {
    return;
    ctx = document.getElementById('playground').getContext('2d');
    ctx.fillStyle = "rgb(0, 154, 253)";
    w = ctx.canvas.width;
    h = ctx.canvas.height;
    initStageObjects();
    setInterval(updateStage, frameInterval);
    //requestAnimationFrame(animate);
}

function initStageObjects() {
    balls = new Array();
    generate($inp.val());
}

function updateStage() {
    t += frameInterval;
    clearCanvas();
    updateStageObjects();
    drawStageObjects();
}


function generate(txt) {
    var radius = 5,                                   // ball radius
        data32;                                       // we'll use uint32 for speed
    var currX=0,
        currH=20;
    var colorArr=["red", "green", "blue", "yellow", "black"],
    colorLength=colorArr.length;

    if (txt.length <= previousTxt.length){				//backspace
        if (txt.length < previousTxt.length){
            deleteObjects(txt.length-1);
        }
        previousTxt=txt;
        return;
    }
    previousTxt=txt;
    //balls = [];                                       // clear ball array
    ctx.clearRect(0, 0, w, h);                        // clear canvas so we can
    //ctx.fillText(txt.toUpperCase(), 0, 10);           // draw the text (default 10px)
    ctx.font = currH+"px Arial";
  
    for (var j=0; j<txt.length; j+=1)
    {
        var letter=txt.charAt(j);
        var currW=ctx.measureText(letter).width;
        currW=(currW|0)+1;
        if (j==txt.length-1){							 //the last only
            ctx.strokeText(letter, currX,currH);           // draw the text (default 10px) !!!down left
            //alert(X+";"+letter+";"+currX);

            // get a Uint32 representation of the bitmap:
            data32 = new Uint32Array(ctx.getImageData(currX, 0,currW,currH*1.2).data.buffer);
  
            // loop through each pixel. We will only store the ones with alpha = 255
            for(var i = 0; i < data32.length; i++) {
                if (data32[i] & 0xff000000) {             // check alpha mask
      
                    balls.push({                            // add new ball if a solid pixel
                        origX: (currX+(i % currW)) * radius * 2 + radius,     // use position and radius to
                        origY: ((i / currW)|0) * radius * 2 + radius, //  pre-calc final position and size
                        radius: radius,
                        x: (Math.random() * w)|0,
                        y: (Math.random() * h)|0,
                        vx:0,
                        vy:0,
                        letter: letter,
                        num:j,
                        color: colorArr[j % colorLength]
                    });
	  
                }
            }//for i
        }//if
        currX+=currW;
    }//for j
    // return array - here we'll animate it directly to show the resulting objects:
}
function deleteObjects(maxNum) {
    restBalls=[];
    for(var i = 0, ball; ball = balls[i]; i++) {
        if (ball.num <= maxNum){
            restBalls.push(ball);
        }
    }
    balls=restBalls;
}


function drawStageObjects() {
    for(var i = 0, ball; ball = balls[i]; i++) {
        var dx=Math.random()*ball.radius;
        dy=Math.random()*ball.radius;
        //ctx.beginPath();
        //ctx.moveTo(ball.x + ball.radius + dx, ball.y + dy);
        ctx.fillStyle=ball.color;
        ctx.fillText(ball.letter, ball.x + dx, ball.y + dy); 
        //ctx.closePath();
    }
    ctx.fill();
}

function updateStageObjects() {
 
    for (var n=0; n<balls.length; n++) {
 
        // set ball position based on velocity
        balls[n].y+=balls[n].vy;
        balls[n].x+=balls[n].vx;
 
        // restore forces
        if (balls[n].x > balls[n].origX) {
            balls[n].vx -= restoreForce;
        }
        else {
            balls[n].vx += restoreForce;
        }
        if (balls[n].y > balls[n].origY) {
            balls[n].vy -= restoreForce;
        }
        else {
            balls[n].vy += restoreForce;
        }
 
        // floor friction
        if (balls[n].vx>0) {
            balls[n].vx-=floorFriction;
        }
        else if (balls[n].vx<0) {
            balls[n].vx+=floorFriction;
        }
        if (balls[n].vy>0) {
            balls[n].vy-=floorFriction;
        }
        else if (balls[n].vy<0) {
            balls[n].vy+=floorFriction;
        }
 
        // floor condition
        if (balls[n].y > (ctx.canvas.height-ballRadius)) {
            balls[n].y=ctx.canvas.height-ballRadius-2;
            balls[n].vy*=-1; 
            balls[n].vy*=(1-collisionDamper);
        }
 
        // ceiling condition
        if (balls[n].y < (ballRadius)) {
            balls[n].y=ballRadius+2;
            balls[n].vy*=-1; 
            balls[n].vy*=(1-collisionDamper);
        }
 
        // right wall condition
        if (balls[n].x > (ctx.canvas.width-ballRadius)) {
            balls[n].x=ctx.canvas.width-ballRadius-2;
            balls[n].vx*=-1;
            balls[n].vx*=(1-collisionDamper);
        }
 
        // left wall condition
        if (balls[n].x < (ballRadius)) {
            balls[n].x=ballRadius+2;
            balls[n].vx*=-1;
            balls[n].vx*=(1-collisionDamper);
        }	
    }
}

function clearCanvas() {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
}
 
