var Ball = require("./ball.js");
var Paddle = require("./paddle.js");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var Controller = require("./controller.js");


var paddle = new Paddle(canvas, ctx);
var controller = new Controller(paddle);
var ball = new Ball(canvas, ctx);

var render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.render();
  paddle.render();
};


setInterval(render, 10);
