var Ball = require("./ball.js");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// position
var x = canvas.width/2;
var y = canvas.height-30;

// velocity
var dx = 2;
var dy = -2;

var ball = new Ball(10, 10, canvas, ctx);

 
setInterval(ball.draw, 10);
// setInterval(draw, 10);

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
