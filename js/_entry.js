// requirements
var Ball = require("./ball.js");
var Paddle = require("./paddle.js");
var Bricks = require("./bricks.js");
var CollisionDetection = require("./collisionDetection.js");
var Status = require("./status.js");
var Controller = require("./controller.js");
var Prizes = require("./prizes.js");

// set canvas base
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set entities
var paddle = new Paddle(canvas, ctx);
var controller = new Controller(paddle, canvas);
var ball = new Ball(canvas, ctx);
var bricks = new Bricks(canvas, ctx);
var status = new Status(canvas, ctx);
var prizes = new Prizes(canvas, ctx);
var collisionDetection = new CollisionDetection(ball, bricks, paddle, prizes, status, canvas);
var prize = new Prize(canvas, ctx);

var play = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionDetection.checkBricks();
  collisionDetection.checkPaddle();
  collisionDetection.checkPrizes();
  ball.render();
  paddle.render();
  bricks.render();
  status.render();
};

var gameover = function () {
  prizes.render();
};

var run = function(){

};

  setInterval(play, 15);
