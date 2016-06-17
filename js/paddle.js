var Entity = require("./entity.js");

function Paddle(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.height = 15;
  this.width= 120;
  this.x = (canvas.width - this.width)/2;
  this.y = canvas.height - this.height - 20;
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

Paddle.prototype.setPosition = function(x) {
    this.x = x;
};

Paddle.prototype.resetPosition = function(x) {
    this.x = (this.canvas.width - this.width)/2;
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
