var Entity = require("./entity.js");

function Paddle(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.height = 10;
  this.width= 75;
  this.x = (canvas.width - this.width)/2;

  this.color = "#FFFFFF";

  this.render = function() {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = this.color = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
  }.bind(this);
}

// inherit constructor
Paddle.prototype = new Entity();
Paddle.prototype.constructor = Paddle;


module.exports = Paddle;
