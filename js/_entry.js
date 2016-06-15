var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var Ball = require("./ball.js");
var Paddle = require("./paddle.js");

var ball = new Ball(canvas, ctx);
var paddle = new Paddle(canvas, ctx);

var render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.render();
  paddle.render();
};


setInterval(render, 10);
