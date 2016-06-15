var Entity = require("./entity.js");

function Ball(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  // position
  this.x = this.canvas.width/2 + 10;
  this.y = this.canvas.height-30;

  // velocity
  this.dx = 2;
  this.dy = -2;

  this.radius = 10;

  this.move = function() {
    this.ricochet();
    this.x += this.dx;
    this.y += this.dy;
  }.bind(this);

  this.ricochet = function() {
    // bounce off top or bottom
    if(this.y + this.dy > this.canvas.height
      || this.y + this.dy < 0) {
    this.dy = -this.dy;
    // bounce off left or right
    if(this.x + this.dx > canvas.width
      || this.x + this.dx < 0) {
        this.dx = -this.dx;
    }
}
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
