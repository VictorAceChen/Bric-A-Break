/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Ball = __webpack_require__(1);
	var Paddle = __webpack_require__(3);
	var Bricks = __webpack_require__(6);
	var CollisionDetection = __webpack_require__(7);

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var Controller = __webpack_require__(5);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);

	function Ball(canvas, ctx) {
	  Entity.call(this, canvas, ctx);

	  this.setPosition(this.canvas.width/2, this.canvas.height-30);
	  this.setVelocity(2, -2);
	  this.radius = 10;
	  this.color = "#FFFFFF";
	}

	// inherit constructor
	Ball.prototype = new Entity();
	Ball.prototype.constructor = Ball;

	Ball.prototype.setPosition = function(x, y) {
	  this.x = x || this.x;
	  this.y = y || this.y;
	};

	Ball.prototype.setVelocity = function(dx, dy) {
	  this.dx = dx || this.dx;
	  this.dy = dy || this.dy;
	};

	Ball.prototype.getLeftEdge = function() {
	  return this.x + this.dx;
	};

	Ball.prototype.getTopEdge = function() {
	  return this.y + this.dy;
	};

	Ball.prototype.getRightEdge = function() {
	  return this.x + this.dx + this.radius;
	};

	Ball.prototype.getBottomEdge = function() {
	  return this.y + this.dy + this.radius;
	};

	Ball.prototype.shiftVertical = function() {
	  this.dy = -this.dy;
	};

	Ball.prototype.shiftHorizontal = function() {
	  this.dx = -this.dx;
	};

	Ball.prototype.bounce = function() {
	  // bounce off top or bottom
	  if(this.getBottomEdge() > this.canvas.height ||
	    this.getTopEdge() < 0) {
	  this.shiftVertical();
	  }
	  // bounce off left or right
	  if(this.getRightEdge() > this.canvas.width ||
	    this.getLeftEdge() < 0) {
	      this.shiftHorizontal();
	  }
	};

	Ball.prototype.move = function() {
	  this.bounce();
	  this.x += this.dx;
	  this.y += this.dy;
	};

	Ball.prototype.render = function () {
	  this.ctx.beginPath();
	  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	  this.ctx.fillStyle = this.color;
	  this.ctx.fill();
	  this.ctx.closePath();
	  this.move();
	};


	module.exports = Ball;


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

	function Paddle(canvas, ctx) {
	  Entity.call(this, canvas, ctx);

	  this.height = 10;
	  this.width= 110;
	  this.x = (canvas.width - this.width)/2;
	  this.y = this.canvas.height - this.height - 20;
	  this.color = "#FFFFFF";
	}

	Paddle.prototype = new Entity();
	Paddle.prototype.constructor = Paddle;

	Paddle.prototype.moveLeft = function() {
	  if (this.x + this.width > this.canvas.width) return; //don't cross wall
	  this.x += 10;
	};

	Paddle.prototype.moveRight = function() {
	    if (this.x < 0) return; //don't cross wall
	    this.x -= 10;
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
	  this.ctx.fillStyle = this.color = "#FFFFFF";
	  this.ctx.fill();
	  this.ctx.closePath();
	};

	module.exports = Paddle;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);

	function Brick(canvas, ctx) {
	  Entity.call(this, canvas, ctx);

	  this.x = 0;
	  this.y = 0;
	  this.width = 65;
	  this.height = 15;
	}

	// inherit constructor
	Brick.prototype = new Entity();
	Brick.prototype.constructor = Brick;

	Brick.prototype.setPosition = function (x, y) {
	  this.x = x;
	  this.y = y;
	};


	Brick.prototype.getLeftEdge = function() {
	  return this.x - this.width;
	};

	Brick.prototype.getTopEdge = function() {
	  return this.y - this.height;
	};

	Brick.prototype.getRightEdge = function() {
	  return this.x + this.width;
	};

	Brick.prototype.getBottomEdge = function() {
	  return this.y + this.height;
	};

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
	  ctx.fillStyle = "#FFFFFF";
	  ctx.fill();
	  ctx.closePath();
	};


	module.exports = Brick;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Controller(paddle) {

	  document.addEventListener("keydown", keyDownHandler, false);

	  function keyDownHandler(e) {
	    e.preventDefault();
	    if(e.keyCode == 39) {
	      paddle.moveLeft();
	    }
	    else if(e.keyCode == 37) {
	      paddle.moveRight();
	    }
	  }
	}
	module.exports = Controller;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);
	var Brick = __webpack_require__(4);

	function Bricks(canvas, ctx) {
	  Entity.call(this, canvas, ctx);

	  this.rows = 4;
	  this.columns = 6;
	  this.padding = 10;
	  this.topMargin = 30;
	  this.leftMargin = 30;
	  this.list = [];

	  for(i = 0; i < this.columns; i++) {
	      var row = [];
	      for(j = 0; j < this.rows; j++) {
	        var brick = new Brick(canvas, ctx);
	        var x = (i * (brick.width + this.padding)) + this.leftMargin;
	        var y = (j*(brick.height + this.padding)) + this.topMargin;
	        brick.setPosition(x,y);
	        row.push(brick);
	      }
	      this.list.push(row);
	  }
	}

	// inherit constructor
	Bricks.prototype = new Entity();
	Bricks.prototype.constructor = Bricks;

	Bricks.prototype.render = function () {
	    this.list.forEach(function(row){
	      row.forEach(function(brick){
	        brick.render();
	      });
	    });
	};


	module.exports = Bricks;


/***/ },
/* 7 */
/***/ function(module, exports) {

	function CollisionDetection(ball, bricks, paddle) {
	  this.ball = ball;
	  this.bricks = bricks;
	  this.paddle = paddle;
	}

	CollisionDetection.prototype.checkBricks = function() {
	  var ball = this.ball;
	  var bricks = this.bricks;
	  var paddle = this.paddle;

	  bricks.list.forEach(function(row){
	    row.forEach(function(brick, index){
	      if(brick.isHit(ball)) {

	            ball.shiftVertical();
	            // ball.shiftHorizontal();

	          row.splice(index, 1);
	      }
	    });
	  });
	};

	CollisionDetection.prototype.checkPaddle = function() {
	  var ball = this.ball;
	  var paddle = this.paddle;

	      if(paddle.isHit(ball)) {
	            //needs
	            ball.shiftVertical();
	      }
	};

	module.exports = CollisionDetection;


/***/ }
/******/ ]);