var Entity = require("./entity.js");

function Ball(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  // position
  this.x = this.canvas.width/2;
  this.y = this.canvas.height-30;

  // velocity
  this.dx = 2;
  this.dy = -2;

  this.radius = 10;

  this.leftEdge = function() {
    return this.x + this.dx;
  }.bind(this);

  this.topEdge = function() {
    return this.y + this.dy;
  }.bind(this);

  this.rightEdge = function() {
    return this.x + this.dx + this.radius;
  }.bind(this);

  this.bottomEdge = function() {
    return this.y + this.dy + this.radius;
  }.bind(this);

  this.bounce = function() {
    // bounce off top or bottom
    if(this.bottomEdge() > this.canvas.height
      || this.topEdge() < 0) {
    this.dy = -this.dy;
    }
    // bounce off left or right
    if(this.rightEdge() > canvas.width
      || this.leftEdge() < 0) {
        this.dx = -this.dx;
    }
  }.bind(this);

  this.move = function() {
    this.bounce();
    this.x += this.dx;
    this.y += this.dy;
  }.bind(this);

  this.render = function() {
    ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fill();
    this.ctx.closePath();
    this.move();
  }.bind(this);

}

// inherit constructor
Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;


module.exports = Ball;
