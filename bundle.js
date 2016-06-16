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
	var Bricks = __webpack_require__(5);

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var Controller = __webpack_require__(4);


	var paddle = new Paddle(canvas, ctx);
	var controller = new Controller(paddle);
	var ball = new Ball(canvas, ctx);
	var bricks = new Bricks(canvas, ctx);

	var render = function(){
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

	Ball.prototype.leftEdge = function() {
	  return this.x + this.dx;
	};

	Ball.prototype.topEdge = function() {
	  return this.y + this.dy;
	};

	Ball.prototype.rightEdge = function() {
	  return this.x + this.dx + this.radius;
	};

	Ball.prototype.bottomEdge = function() {
	  return this.y + this.dy + this.radius;
	};

	Ball.prototype.bounce = function() {
	  // bounce off top or bottom
	  if(this.bottomEdge() > this.canvas.height ||
	    this.topEdge() < 0) {
	  this.dy = -this.dy;
	  }
	  // bounce off left or right
	  if(this.rightEdge() > this.canvas.width ||
	    this.leftEdge() < 0) {
	      this.dx = -this.dx;
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

	  this.color = "#FFFFFF";
	}

	Paddle.prototype = new Entity();
	Paddle.prototype.constructor = Paddle;

	Paddle.prototype.moveLeft = function() {
	  if (this.x + this.width > this.canvas.width) return;
	  this.x += 5;
	};

	Paddle.prototype.moveRight = function() {
	    if (this.x < 0) return;
	    this.x -= 5;
	};

	Paddle.prototype.render = function() {
	  this.ctx.beginPath();
	  this.ctx.rect(
	    this.x,
	    this.canvas.height - this.height - 10,
	    this.width,
	    this.height);
	  this.ctx.fillStyle = this.color = "#FFFFFF";
	  this.ctx.fill();
	  this.ctx.closePath();
	};

	module.exports = Paddle;


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);

	function Bricks(canvas, ctx) {
	  Entity.call(this, canvas, ctx);

	  this.brickRowCount = 3;
	  this.brickColumnCount = 5;
	  this.brickWidth = 75;
	  this.brickHeight = 25;
	  this.brickPadding = 10;
	  this.brickOffsetTop = 30;
	  this.brickOffsetLeft = 30;

	  this.bricks = [];
	  for(c = 0; c < this.brickColumnCount; c++) {
	      this.bricks[c] = [];
	      for(r = 0; r < this.brickRowCount; r++) {
	          this.bricks[c][r] = { x: 0, y: 0 };
	      }
	  }

	}

	// inherit constructor
	Bricks.prototype = new Entity();
	Bricks.prototype.constructor = Bricks;

	Bricks.prototype.render = function () {
	  var ctx = this.ctx;
	    for(c=0; c<this.brickColumnCount; c++) {
	        for(r=0; r<this.brickRowCount; r++) {
	            this.brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
	            this.brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
	            this.bricks[c][r].x = this.brickX;
	            this.bricks[c][r].y = this.brickY;
	            ctx.beginPath();
	            ctx.rect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
	            ctx.fillStyle = "#FFFFFF";
	            ctx.fill();
	            ctx.closePath();
	        }
	    }
	};


	module.exports = Bricks;


/***/ }
/******/ ]);