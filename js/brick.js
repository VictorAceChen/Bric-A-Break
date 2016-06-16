var Entity = require("./entity.js");

function Brick(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.x = 0;
  this.y = 0;
  this.width = 65;
  this.height = 15;
}

// inherit constructor
Brick.prototype = new Entity();
Brick.prototype.constructor = Brick;

Brick.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
};


Brick.prototype.getLeftEdge = function() {
  return this.x - this.width;
};

Brick.prototype.getTopEdge = function() {
  return this.y - this.height;
};

Brick.prototype.getRightEdge = function() {
  return this.x + this.width;
};

Brick.prototype.getBottomEdge = function() {
  return this.y + this.height;
};

Brick.prototype.isHit = function(ball) {
  return ball.x > this.x &&
    ball.x < this.x + this.width &&
    ball.y > this.y &&
    ball.y < this.y + this.height;
};


Brick.prototype.render = function () {
  var ctx = this.ctx;
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
};


module.exports = Brick;
