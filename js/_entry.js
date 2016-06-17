// requirements
var Ball = require("./ball.js");
var Paddle = require("./paddle.js");
var Bricks = require("./bricks.js");
var CollisionDetection = require("./collisionDetection.js");
var Status = require("./status.js");
var Controller = require("./controller.js");
var Prize = require("./prize.js");

// set canvas base
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set entities
var paddle = new Paddle(canvas, ctx);
var controller = new Controller(paddle, canvas);
var ball = new Ball(canvas, ctx);
var bricks = new Bricks(canvas, ctx);
var status = new Status(canvas, ctx);
var collisionDetection = new CollisionDetection(ball, bricks, paddle, status);
var prize = new Prize(canvas, ctx);
prize.setType("grow");


var play = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionDetection.checkBricks();
  collisionDetection.checkPaddle();
  ball.render();
  paddle.render();
  bricks.render();
  status.render();
  // prize.render();
};

var gameover = function () {
  this.img = new Image();   // Create new img element
  this.img.src = ""; // Set source path
  ctx.drawImage(this.img,0,0);
  ctx.beginPath();
  ctx.moveTo(30,96);
  ctx.lineTo(70,66);
  ctx.lineTo(103,76);
  ctx.lineTo(170,15);
  ctx.stroke();
};

var run = function(){

};

  setInterval(play, 10);
