var Entity = require("./entity.js");

function Paddle(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.height = 15;
  this.width= 120;
  this.x = (canvas.width - this.width)/2;
  this.y = canvas.height - this.height - 20;
  this.color = "#FFFFFF";

  this.isMovingLeft = false;
  this.isMovingRight = false;
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

Paddle.prototype.move = function() {
  if(this.isMovingLeft){
    this.moveLeft();
  }else if(this.isMovingRight){
    this.moveRight();
  }
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
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();

  this.move();
};

Paddle.prototype.grow = function() {
  if(this.width > 500) return;
  this.width += 20;
};

Paddle.prototype.shrink = function() {
  if(this.width < 40) return;
  this.width -= 30;
};

Paddle.prototype.phase = function() {
  this.color = this.color === "#FFFFFF" ? "#000000" : "#FFFFFF";
};

Paddle.prototype.getLeftEdge = function() {
  return {
    x: this.x,
    y: this.y,
    width: this.width/9,
    height: this.height
    };
  };

Paddle.prototype.getRightEdge = function() {
  return {
    x: this.x * 8 /9,
    y: this.y,
    width: this.width  /9,
    height: this.height
  };
};

Paddle.prototype.getLeftCenter = function() {
  return {
    x: this.x + this.width/9,
    y: this.y,
    width: this.width * 3 /9,
    height: this.height
  };
};

Paddle.prototype.getCenter = function() {
  return {
    x: this.x + this.width * 4/9,
    y: this.y,
    width: this.width * 1/9,
    height: this.height
  };
};

Paddle.prototype.getRightCenter = function() {
  return {
    x: this.x + this.width * 5/9,
    y: this.y,
    width: this.width * 3/9,
    height: this.height
  };
};
  // return paddle.x + paddle.width/9;


module.exports = Paddle;
