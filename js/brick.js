var Entity = require("./entity.js");

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
