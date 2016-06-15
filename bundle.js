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
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	// position
	var x = canvas.width/2;
	var y = canvas.height-30;

	// velocity
	var dx = 2;
	var dy = -2;

	var ball = new Ball(10, 10, canvas, ctx);

	 
	setInterval(ball.draw, 10);
	// setInterval(draw, 10);

	ctx.beginPath();
	ctx.rect(20, 40, 50, 50);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(240, 160, 20, 0, Math.PI*2, false);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();


	ctx.beginPath();
	ctx.rect(160, 10, 100, 40);
	ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	ctx.stroke();
	ctx.closePath();


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Ball(x_pos, y_pos, canvas, context) {

	  this.ctx = context;

	  // position
	  this.x = canvas.width/2 + 10;
	  this.y = canvas.height-30;
	  // velocity
	  this.dx = 2;
	  this.dy = -2;

	  this.draw = function() {
	    this.ctx.beginPath();
	    this.ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
	    this.ctx.fillStyle = "#FFFFFF";
	    this.ctx.fill();
	    this.ctx.closePath();
	    this.x += this.dx;
	    this.y += this.dy;
	  }.bind(this)
	}


	module.exports = Ball;


/***/ }
/******/ ]);