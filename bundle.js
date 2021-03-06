/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// requirements
	var Balls = __webpack_require__(1);
	var Paddle = __webpack_require__(4);
	var Bricks = __webpack_require__(5);
	var CollisionDetection = __webpack_require__(7);
	var Status = __webpack_require__(9);
	var Controller = __webpack_require__(10);
	var Prizes = __webpack_require__(11);
	var Prize = __webpack_require__(8);
	
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
	var start = false;
	
	var controller = new Controller(status, bricks, paddle, canvas);
	var collisionDetection = new CollisionDetection(balls, bricks, paddle, prizes, status, canvas);
	
	var checkGameover = function() {
	  if(status.lives < 1){
	    gameover();
	    balls.reset();
	    prizes.reset();
	    paddle.reset();
	  }else if(bricks.isEmpty()){
	    winner();
	    balls.reset();
	    prizes.reset();
	    paddle.reset();
	  }else{
	    start = true;
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
	  if(start) ctx.fillText("Game Over", 10, 50);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	var Ball = __webpack_require__(3);
	
	function Balls(canvas, ctx) {
	  Entity.call(this, canvas, ctx);
	  this.list = [new Ball(canvas, ctx)];
	}
	
	Balls.prototype = new Entity();
	Balls.prototype.constructor = Balls;
	
	Balls.prototype.addBall = function (x, y) {
	  var ball = new Ball(this.canvas, this.ctx);
	  ball.setPosition(x,y);
	  this.list.push(ball);
	};
	
	Balls.prototype.inflate = function () {
	  this.list.forEach(function(ball){
	      ball.inflate();
	  });
	};
	
	Balls.prototype.accelerate = function () {
	  this.list.forEach(function(ball){
	      ball.dx *= 2;
	      ball.dy *= 2;
	  });
	};
	
	
	Balls.prototype.reverse = function () {
	  this.list.forEach(function(ball){
	      ball.reverse();
	  });
	};
	
	Balls.prototype.reset = function () {
	  this.list = [new Ball(this.canvas, this.ctx)];
	};
	
	Balls.prototype.render = function () {
	  this.list.forEach(function(ball){
	      ball.render();
	  });
	};
	
	module.exports = Balls;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Entity(theCanvas, context) {
	  this.ctx = context;
	  this.canvas = theCanvas;
	
	}
	
	module.exports = Entity;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	
	function Ball(canvas, ctx) {
	  Entity.call(this, canvas, ctx);
	
	  this.setPosition(this.canvas.width/2, this.canvas.height-75);
	  this.setVelocity(2, -3);
	  this.radius = 8;
	  this.color = "#FFFFFF";
	}
	
	// inherit constructor
	Ball.prototype = new Entity();
	Ball.prototype.constructor = Ball;
	
	Ball.prototype.setPosition = function(x, y) {
	  this.x = x;
	  this.y = y;
	};
	
	Ball.prototype.setVelocity = function(dx, dy) {
	  this.dx = dx;
	  this.dy = dy;
	};
	
	Ball.prototype.getLeftEdge = function() {
	  // return this.x + this.dx;
	  return {x: this.x - this.radius, y: this.y};
	};
	
	Ball.prototype.getTopEdge = function() {
	  // return this.y + this.dy;
	  return {x: this.x, y: this.y - this.radius};
	};
	
	Ball.prototype.getRightEdge = function() {
	  // return this.x + this.dx + this.radius;
	  return {x: this.x + this.radius, y: this.y};
	};
	
	Ball.prototype.getBottomEdge = function() {
	  // return this.y + this.dy + this.radius;
	  return {x: this.x, y: this.y + this.radius};
	};
	
	Ball.prototype.shiftVertical = function() {
	  this.dy *= -1;
	};
	
	Ball.prototype.shiftHorizontal = function() {
	  this.dx *= -1;
	};
	
	Ball.prototype.goRight = function() {
	  this.dx = Math.abs(this.dx);
	};
	
	Ball.prototype.reverse = function() {
	  this.shiftVertical();
	  this.shiftHorizontal();
	};
	
	Ball.prototype.bounce = function() {
	  // bounce off top or bottom
	  if(
	    // this.getBottomEdge().y > this.canvas.height ||
	    this.getTopEdge().y < 0) {
	  this.shiftVertical();
	  }
	  // bounce off left or right
	  if(this.getRightEdge().x > this.canvas.width ||
	    this.getLeftEdge().x < 0) {
	      this.shiftHorizontal();
	  }
	};
	
	Ball.prototype.move = function() {
	  this.bounce();
	  this.x += this.dx;
	  this.y += this.dy;
	};
	
	Ball.prototype.inflate = function() {
	  if(this.radius>32) return;
	  this.radius += 5;
	};
	
	Ball.prototype.toRect = function () {
	  return {
	    x: this.x - this.radius,
	    y: this.y - this.radius,
	    width: this.radius * 2,
	    height: this.radius * 2
	  };
	};
	
	Ball.prototype.render = function () {
	  // draw
	  this.ctx.beginPath();
	  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	  this.ctx.fillStyle = this.color;
	  this.ctx.fill();
	  this.ctx.closePath();
	
	  this.move();
	};
	
	
	module.exports = Ball;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	
	function Paddle(canvas, ctx) {
	  Entity.call(this, canvas, ctx);
	
	  this.height = 15;
	  this.width= 120;
	  this.x = (canvas.width - this.width)/2;
	  this.y = canvas.height - this.height - 20;
	  this.color = "#FFFFFF";
	
	  this.isMovingLeft = false;
	  this.isMovingRight = false;
	}
	
	Paddle.prototype = new Entity();
	Paddle.prototype.constructor = Paddle;
	
	Paddle.prototype.reset = function() {
	  this.width= 120;
	};
	
	Paddle.prototype.moveLeft = function() {
	  if (this.x + this.width > this.canvas.width) return; //don't cross wall
	  this.x += 10;
	};
	
	Paddle.prototype.moveRight = function() {
	    if (this.x < 0) return; //don't cross wall
	    this.x -= 10;
	};
	
	Paddle.prototype.setPosition = function(x) {
	    this.x = x;
	};
	
	Paddle.prototype.resetPosition = function(x) {
	    this.x = (this.canvas.width - this.width)/2;
	};
	
	Paddle.prototype.move = function() {
	  if(this.isMovingLeft){
	    this.moveLeft();
	  }else if(this.isMovingRight){
	    this.moveRight();
	  }
	};
	
	Paddle.prototype.isHit = function(ball) {
	  return ball.x > this.x &&
	    ball.x < this.x + this.width &&
	    ball.y > this.y &&
	    ball.y < this.y + this.height;
	};
	
	Paddle.prototype.render = function() {
	  this.ctx.beginPath();
	  this.ctx.rect(
	    this.x,
	    this.y,
	    this.width,
	    this.height);
	  this.ctx.fillStyle = this.color;
	  this.ctx.fill();
	  this.ctx.closePath();
	
	  this.move();
	};
	
	Paddle.prototype.grow = function() {
	  if(this.width > 500) return;
	  this.width += 20;
	};
	
	Paddle.prototype.shrink = function() {
	  if(this.width < 40) return;
	  this.width -= 30;
	};
	
	Paddle.prototype.phase = function() {
	  this.color = this.color === "#FFFFFF" ? "#000000" : "#FFFFFF";
	};
	
	Paddle.prototype.getLeftEdge = function() {
	  return {
	    x: this.x,
	    y: this.y,
	    width: this.width/9,
	    height: this.height
	    };
	  };
	
	Paddle.prototype.getRightEdge = function() {
	  return {
	    x: this.x * 8 /9,
	    y: this.y,
	    width: this.width  /9,
	    height: this.height
	  };
	};
	
	Paddle.prototype.getLeftCenter = function() {
	  return {
	    x: this.x + this.width/9,
	    y: this.y,
	    width: this.width * 3 /9,
	    height: this.height
	  };
	};
	
	Paddle.prototype.getCenter = function() {
	  return {
	    x: this.x + this.width * 4/9,
	    y: this.y,
	    width: this.width * 1/9,
	    height: this.height
	  };
	};
	
	Paddle.prototype.getRightCenter = function() {
	  return {
	    x: this.x + this.width * 5/9,
	    y: this.y,
	    width: this.width * 3/9,
	    height: this.height
	  };
	};
	  // return paddle.x + paddle.width/9;
	
	
	module.exports = Paddle;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	var Brick = __webpack_require__(6);
	
	function Bricks(canvas, ctx) {
	  Entity.call(this, canvas, ctx);
	
	  this.rows = 8;
	  this.columns = 8;
	  this.padding = 1;
	  this.topMargin = 40;
	  this.leftMargin = 35;
	  this.canvas = canvas;
	  this.ctx = ctx;
	  this.restart();
	}
	
	// inherit constructor
	Bricks.prototype = new Entity();
	Bricks.prototype.constructor = Bricks;
	
	Bricks.prototype.restart = function () {
	  this.list = [];
	
	  for(i = 0; i < this.columns; i++) {
	      var row = [];
	      for(j = 0; j < this.rows; j++) {
	        var brick = new Brick(this.canvas, this.ctx);
	        var x = (i * (brick.width + this.padding)) + this.leftMargin;
	        var y = (j*(brick.height + this.padding)) + this.topMargin;
	        brick.setPosition(x,y);
	        brick.setStrength(7 - j);
	        row.push(brick);
	      }
	      this.list.push(row);
	  }
	};
	
	Bricks.prototype.isEmpty = function () {
	    return this.list.every(function(arr){
	      return arr.length === 0;
	    });
	};
	
	Bricks.prototype.render = function () {
	    this.list.forEach(function(row){
	      row.forEach(function(brick){
	        brick.render();
	      });
	    });
	};
	
	
	module.exports = Bricks;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	
	STRENGTH_DISPLAY = {
	  1: "#FF0000",
	  2: "#FFA500",
	  3: "#FFFF00",
	  4: "#008000",
	  5: "#0000FF",
	  6: "#800080",
	  7: "#A9A9A9"
	};
	
	function Brick(canvas, ctx) {
	  Entity.call(this, canvas, ctx);
	
	  this.x = 0;
	  this.y = 0;
	  this.width = 65;
	  this.height = 15;
	  this.strength = 1;
	}
	
	// inherit constructor
	Brick.prototype = new Entity();
	Brick.prototype.constructor = Brick;
	
	Brick.prototype.setPosition = function (x, y) {
	  this.x = x;
	  this.y = y;
	};
	
	Brick.prototype.setStrength = function (value) {
	  this.strength = value < 2 ? 1 : value;
	};
	
	Brick.prototype.weaken = function () {
	  this.strength -= 1;
	};
	
	Brick.prototype.isDead = function () {
	  return this.strength < 1;
	};
	
	Brick.prototype.getCenter = function() {
	  return {x: this.x+this.width/2,y: this.y+this.height/2 };
	};
	
	//
	// Brick.prototype.getLeftEdge = function() {
	//   return this.x - this.width;
	// };
	//
	// Brick.prototype.getTopEdge = function() {
	//   return this.y - this.height;
	// };
	//
	// Brick.prototype.getRightEdge = function() {
	//   return this.x + this.width;
	// };
	//
	// Brick.prototype.getBottomEdge = function() {
	//   return this.y + this.height;
	// };
	
	Brick.prototype.isHit = function(ball) {
	  return ball.x > this.x &&
	    ball.x < this.x + this.width &&
	    ball.y > this.y &&
	    ball.y < this.y + this.height;
	};
	
	
	Brick.prototype.render = function () {
	  var ctx = this.ctx;
	  ctx.beginPath();
	  ctx.rect(this.x, this.y, this.width, this.height);
	  ctx.fillStyle = STRENGTH_DISPLAY[this.strength];
	  ctx.fill();
	  ctx.closePath();
	};
	
	
	module.exports = Brick;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Prize = __webpack_require__(8);
	
	function CollisionDetection(balls, bricks, paddle, prizes, status, canvas) {
	  this.balls = balls;
	  this.bricks = bricks;
	  this.prizes = prizes;
	  this.paddle = paddle;
	  this.stat = status;
	  this.canvas = canvas;
	}
	
	CollisionDetection.prototype.checkBalls = function() {
	  var balls = this.balls;
	  var paddle = this.paddle;
	  var stat = this.stat;
	  var checkBricks = this.checkBricks.bind(this);
	  var checkPaddle = this.checkPaddle.bind(this);
	
	  canvas = this.canvas;
	
	  balls.list.forEach(function(ball, index){
	    // if(ball.y < canvas.height) return;
	    checkBricks(ball);
	    checkPaddle(ball);
	
	    if(ball.y > canvas.height) {
	      balls.list.splice(index,1);
	    }
	
	  });
	
	  if(balls.list.length < 1) {
	    stat.lives -= 1;
	    balls.reset();
	    paddle.width= 120;
	  }
	};
	
	CollisionDetection.prototype.checkBricks = function(ball) {
	  var bricks = this.bricks;
	  var stat = this.stat;
	  var isHit = false;
	  var prizes = this.prizes;
	
	  var isRectOverlap = this.isRectOverlap;
	
	  bricks.list.forEach(function(row){
	    row.forEach(function(brick, index){
	      var isHit = false;
	      // ball hits by left/right
	      if(isRectOverlap(brick, ball.getLeftEdge()) ) {
	        ball.shiftHorizontal();
	        isHit = true;
	        // ball hits by top/bottom
	      } else if ( isRectOverlap(brick, ball.getRightEdge()) ) {
	        ball.shiftHorizontal();
	        isHit = true;
	      }else if (isRectOverlap(brick, ball.getTopEdge()) ||
	        isRectOverlap(brick, ball.getBottomEdge()) ) {
	        ball.shiftVertical();
	        isHit = true;
	      }
	
	      if(isHit){
	        stat.scorePoint();
	        brick.weaken();
	        if (brick.isDead()) {
	          row.splice(index, 1);
	          var prize = new Prize(brick.canvas, brick.ctx);
	          prize.setPosition(brick.x,brick.y);
	          prizes.list.push(prize);
	        }
	        return;
	      }
	    });
	  });
	};
	
	CollisionDetection.prototype.checkPrizes = function() {
	    var paddle  = this.paddle;
	    var prizes = this.prizes;
	    var isOverlap = this.isOverlap;
	    var stat = this.stat;
	    var balls = this.balls;
	
	    prizes.list.forEach(function(prize, index){
	      if(isOverlap(paddle, prize)){
	        prizes.list.splice(index,1);
	        switch(prize.type){
	          case "1up":
	            stat.lives += 1;
	          break;
	          case "grow":
	            paddle.grow();
	          break;
	          case "poison":
	            paddle.shrink();
	          break;
	          case "cherry":
	            balls.addBall(paddle.x, paddle.y);
	          break;
	          case "inflate":
	            balls.inflate();
	          break;
	          case "fire":
	            balls.accelerate();
	          break;
	          case "beer":
	            balls.reverse();
	          break;
	          case "question":
	            prize.roulette();
	            prizes.list.push(prize);
	          break;
	        }
	      }
	      else if(prize.isOutOfBound()){
	        prizes.list.splice(index,1);
	      }
	    });
	};
	
	CollisionDetection.prototype.checkPaddle = function(ball) {
	  // var ballRect = ball.toRect();
	  var paddle = this.paddle;
	
	      if(this.isOverlap(paddle, ball.toRect())) {
	      // if(paddle.isHit(ball)) {
	        // if(this.isRectOverlap(ballRect, paddle.getLeftEdge())){
	        //     ball.setVelocity(-6,-2);
	        // }else if(this.isRectOverlap(ballRect, paddle.getLeftCenter())){
	        //     ball.setVelocity(-4,-4);
	        // }else if(this.isRectOverlap(ballRect, paddle.getCenter())){
	        //     ball.setVelocity(0,-6);
	        // }else if(this.isRectOverlap(ballRect, paddle.getRightCenter())){
	        //     ball.setVelocity(4,-4);
	        // }else if(this.isRectOverlap(ballRect, paddle.getRightEdge())){
	        //     ball.setVelocity(6,-2);
	        // }
	        // ball ricochet
	        var ballPos = ball.x - paddle.x;
	        if(ball.x < paddle.x + paddle.width/9){
	            ball.setVelocity(-6,-2);
	        }else if(ball.x < paddle.x + (paddle.width/9 * 4)){
	            ball.setVelocity(-4,-4);
	        }else if(ball.x < paddle.x + (paddle.width/9 * 5)){
	            ball.setVelocity(0,-6);
	        }else if(ball.x < paddle.x + (paddle.width/9 * 8)){
	            ball.setVelocity(4,-4);
	        }else if(ball.x < paddle.x + paddle.width){
	            ball.setVelocity(6,-2);
	        }else{ ball.reverse();}
	      }
	};
	
	
	
	CollisionDetection.prototype.isRectOverlap = function(rect, point) {
	  return point.x > rect.x &&
	    point.x < rect.x + rect.width &&
	    point.y > rect.y &&
	    point.y < rect.y + rect.height;
	};
	
	CollisionDetection.prototype.isOverlap = function(rect1, rect2) {
	  return rect1.x < rect2.x + rect2.width &&
	     rect1.x + rect1.width > rect2.x &&
	     rect1.y < rect2.y + rect2.height &&
	     rect1.height + rect1.y > rect2.y;
	};
	
	
	
	module.exports = CollisionDetection;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	
	PRIZE_IMAGE = {
	  "grow": "images/mushroom.png",
	  "poison": "images/poison_mushroom.gif",
	  "cherry": "images/cherry.png",
	  "1up": "images/1up.png",
	  "boo": "images/boo.gif",
	  "inflate": "images/dig_dug.png",
	  "fire": "images/fire.png",
	  "beer": "images/beer.png",
	  "question": "images/block.png"
	};
	
	function Prize(canvas, ctx) {
	  Entity.call(this, canvas, ctx);
	  this.setPosition(this.canvas.width/2, this.canvas.height-30);
	  this.img = new Image();   // Create new img element
	  this.width = 25;
	  this.height = 25;
	  this.roulette();
	}
	
	Prize.prototype.setPosition = function(x, y) {
	  this.x = x;
	  this.y = y;
	};
	
	Prize.prototype.roulette = function() {
	  var rand = Math.random();
	  if(rand>0.98){
	    this.setType("1up");
	  }else if(rand>0.95){
	    this.setType("fire");
	  }else if(rand>0.87){
	    this.setType("beer");
	  }else if(rand>0.67){
	    this.setType("inflate");
	  }else if(rand>0.55){
	    this.setType("question");
	  }else if(rand>0.35){
	    this.setType("cherry");
	  }else if(rand>0.10){
	    this.setType("grow");
	  }else{
	    this.setType("poison");
	  }
	};
	
	Prize.prototype.setType = function(type) {
	  this.type = type;
	  this.img.src = PRIZE_IMAGE[type]; // Set source path
	};
	
	Prize.prototype.getCenter = function() {
	  return {x: this.x+this.width/2, y: this.y+this.height/2 };
	};
	
	Prize.prototype.render = function(){
	  var ctx = this.ctx;
	  ctx.drawImage(this.img,this.x,this.y, this.width, this.height);
	
	  this.y += 1;
	};
	
	Prize.prototype.isOutOfBound = function() {
	  return this.y > this.canvas.height;
	};
	
	module.exports = Prize;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	
	function Status(canvas, ctx) {
	  Entity.call(this, canvas, ctx);
	  this.score = 0;
	  this.lives = 0;
	}
	
	Status.prototype = new Entity();
	Status.prototype.constructor = Status;
	
	Status.prototype.scorePoint = function() {
	  this.score += 1;
	};
	
	Status.prototype.render = function() {
	  var ctx = this.ctx;
	  ctx.font = "16px Arial";
	  ctx.fillStyle = "#0095DD";
	  ctx.fillText("Score: " + this.score,
	     8,
	     this.canvas.height - 10);
	  ctx.fillText("Lives: " + this.lives,
	    this.canvas.width-65,
	    this.canvas.height - 10);
	};
	
	Status.prototype.restart = function() {
	  if(this.lives > 0) return;
	  this.score = 0;
	  this.lives = 3;
	};
	
	Status.prototype.isOver = function() {
	  return this.lives === 0;
	};
	
	module.exports = Status;


/***/ },
/* 10 */
/***/ function(module, exports) {

	function Controller(status, bricks, paddle,canvas) {
	
	  document.addEventListener("keyup", keyUpHandler, false);
	  document.addEventListener("keydown", keyDownHandler, false);
	  document.addEventListener("mousemove", mouseMoveHandler, false);
	
	  function keyDownHandler(e) {
	    e.preventDefault();
	
	    switch(e.keyCode) {
	    case 13:
	      // document.location.reload();
	      if(status.isOver() || bricks.isEmpty()){
	        status.restart();
	        bricks.restart();
	      }
	        break;
	    case 39:
	      paddle.isMovingLeft = true;
	        break;
	    case 68:
	      paddle.isMovingLeft = true;
	        break;
	    case 37:
	      paddle.isMovingRight = true;
	        break;
	    case 65:
	      paddle.isMovingRight = true;
	        break;
	    }
	  }
	
	  function keyUpHandler(e) {
	    e.preventDefault();
	
	    switch(e.keyCode) {
	    case 39:
	      paddle.isMovingLeft = false;
	        break;
	    case 68:
	      paddle.isMovingLeft = false;
	        break;
	    case 37:
	      paddle.isMovingRight = false;
	        break;
	    case 65:
	      paddle.isMovingRight = false;
	        break;
	        }
	  }
	
	  function mouseMoveHandler(e) {
	    var relativeX = e.clientX - canvas.offsetLeft;
	    if(relativeX > 0 && relativeX < canvas.width - paddle.width) {
	        paddle.setPosition(relativeX);
	    }
	  }
	}
	module.exports = Controller;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	var Prize = __webpack_require__(8);
	
	function Prizes(canvas, ctx) {
	  Entity.call(this, canvas, ctx);
	  this.list = [];
	
	}
	
	Prizes.prototype = new Entity();
	Prizes.prototype.constructor = Prizes;
	
	Prizes.prototype.reset = function () {
	  this.list = [];
	};
	
	Prizes.prototype.render = function () {
	  this.list.forEach(function(prize){
	      prize.render();
	  });
	};
	module.exports = Prizes;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map