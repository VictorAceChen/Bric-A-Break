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

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var Controller = __webpack_require__(5);


	var paddle = new Paddle(canvas, ctx);
	var controller = new Controller(paddle);
	var ball = new Ball(canvas, ctx);
	var bricks = new Bricks(canvas, ctx);
	var brick = new Brick(canvas, ctx);

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
	  if (this.x + this.width > this.canvas.width) return; //don't cross wall
	  this.x += 5;
	};

	Paddle.prototype.moveRight = function() {
	    if (this.x < 0) return; //don't cross wall
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
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);

	function Bricks(canvas, ctx) {
	  Entity.call(this, canvas, ctx);

	  this.x = 0;
	  this.y = 0;
	  this.width = 75;
	  this.height = 25;
	}

	// inherit constructor
	Bricks.prototype = new Entity();
	Bricks.prototype.constructor = Bricks;

	Bricks.prototype.setPosition = function (x, y) {
	  this.x = x;
	  this.y = y;
	};

	Bricks.prototype.render = function () {
	  var ctx = this.ctx;
	  ctx.beginPath();
	  ctx.rect(this.x, this.y, this.width, this.height);
	  ctx.fillStyle = "#FFFFFF";
	  ctx.fill();
	  ctx.closePath();
	};


	module.exports = Bricks;


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

	  this.bricks = [];
	  this.rows = 3;
	  this.column = 5;
	  this.brickWidth = 75;
	  this.brickHeight = 25;
	  this.padding = 10;
	  this.topMargin = 30;
	  this.leftMargin = 30;

	  for(i = 0; i < this.column; i++) {
	      var row = [];
	      for(j = 0; j < this.rows; j++) {
	        var brick = new Brick(canvas, ctx);
	        var x = (i*(brick.width+this.padding))+this.leftMargin;
	        var y = (j*(brick.height+this.padding))+this.topMargin;
	        brick.setPosition(x,y);
	        row.push(brick);
	      }
	      this.bricks.push(row);
	  }
	}

	// inherit constructor
	Bricks.prototype = new Entity();
	Bricks.prototype.constructor = Bricks;

	Bricks.prototype.render = function () {
	    for(i = 0; i < this.column; i++) {
	        for(j = 0; j < this.rows; j++) {
	            this.bricks[i][j].render();
	        }
	    }
	};


	module.exports = Bricks;


/***/ }
/******/ ]);