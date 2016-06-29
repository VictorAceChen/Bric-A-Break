var Entity = require("./entity.js");

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
  this.radius += 4;
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
