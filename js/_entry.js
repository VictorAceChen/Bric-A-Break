// requirements
var Ball = require("./ball.js");
var Balls = require("./balls.js");
var Paddle = require("./paddle.js");
var Bricks = require("./bricks.js");
var CollisionDetection = require("./collisionDetection.js");
var Status = require("./status.js");
var Controller = require("./controller.js");
var Prizes = require("./prizes.js");
var Prize = require("./prize.js");

// set canvas base
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set entities
var paddle = new Paddle(canvas, ctx);
var controller = new Controller(paddle, canvas);
var balls = new Balls(canvas, ctx);
var bricks = new Bricks(canvas, ctx);
var status = new Status(canvas, ctx);
var prizes = new Prizes(canvas, ctx);
var collisionDetection = new CollisionDetection(balls, bricks, paddle, prizes, status, canvas);
var prize = new Prize(canvas, ctx);
prize.setType("grow");
prize.setPosition(45,45);

var play = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionDetection.checkBalls();
  collisionDetection.checkPrizes();
  paddle.render();
  bricks.render();
  status.render();
  prizes.render();
  balls.render();
};

var gameover = function () {

};

var run = function(){

};

  setInterval(play, 15);
