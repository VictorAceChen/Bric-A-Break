var Entity = require("./entity.js");

function Paddle(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.height = 10;
  this.width= 75;
  this.x = (canvas.width - this.width)/2;

  this.color = "#FFFFFF";
}

Paddle.prototype = new Entity();
Paddle.prototype.constructor = Paddle;

Paddle.prototype.render = function() {
  this.ctx.beginPath();
  this.ctx.rect(
    this.x,
    canvas.height - this.height,
    this.width,
    this.height);
  this.ctx.fillStyle = this.color = "#FFFFFF";
  this.ctx.fill();
  this.ctx.closePath();
};

module.exports = Paddle;
