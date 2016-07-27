var canvas = document.getElementById('the-canvas');
var canvasCtx=canvas.getContext('2d');

canvasCtx.fillRect(20,20,50,50);
canvasCtx.strokeStyle='green';
canvasCtx.lineWidth=4;
canvasCtx.strokeRect(20,20,50,50);