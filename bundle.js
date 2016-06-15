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

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	var Ball = __webpack_require__(1);

	var ball = new Ball(canvas, ctx);

	var render = function(){
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ball.render();
	};


	setInterval(render, 10);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(2);

	// inherit constructor
	Ball.prototype = new Entity();
	Ball.prototype.constructor = Ball;

	function Ball(canvas, ctx) {
	  Entity.call(this, canvas, ctx);

	  this.setPosition(this.canvas.width/2, this.canvas.height-30);
	  this.setVelocity(2, -2);
	  this.radius = 10;
	  this.color = "#FFFFFF";
	}

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


/***/ }
/******/ ]);