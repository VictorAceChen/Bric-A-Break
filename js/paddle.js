var Entity = require("./entity.js");

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
  this.x += 7;
};

Paddle.prototype.moveRight = function() {
    if (this.x < 0) return;
    this.x -= 7;
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
