var Entity = require("./entity.js");

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
