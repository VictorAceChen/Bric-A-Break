var Ball = require("./ball.js");
var Paddle = require("./paddle.js");
var Bricks = require("./bricks.js");
var CollisionDetection = require("./collisionDetection.js");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var Controller = require("./controller.js");

var paddle = new Paddle(canvas, ctx);
var controller = new Controller(paddle);
var ball = new Ball(canvas, ctx);
var bricks = new Bricks(canvas, ctx);

var cDetection = new CollisionDetection(ball, bricks, paddle);

var render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cDetection.checkBricks();
  cDetection.checkPaddle();
  ball.render();
  paddle.render();
  bricks.render();
};


setInterval(render, 10);
