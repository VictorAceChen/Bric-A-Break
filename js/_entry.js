// requirements
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
var balls = new Balls(canvas, ctx);
var bricks = new Bricks(canvas, ctx);
var status = new Status(canvas, ctx);
var prizes = new Prizes(canvas, ctx);
// var prize = new Prize(canvas, ctx);
window.bricks= bricks;

var controller = new Controller(status, paddle, canvas);
var collisionDetection = new CollisionDetection(balls, bricks, paddle, prizes, status, canvas);

var checkGameover = function() {
  if(status.lives < 1){
    gameover();
  }else if(bricks.isEmpty()){
    winner();
  }else{
    play();
  }
};

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

var gameover = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px serif";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Game Over", 10, 50);
  ctx.fillText("Press [Enter] to start", 10, 100);
};

var winner = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px serif";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Congratulations!", 10, 50);
  ctx.fillText("Press [Enter] to start again", 10, 100);
};



setInterval(checkGameover, 15);
