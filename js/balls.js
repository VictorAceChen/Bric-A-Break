var Entity = require("./entity.js");
var Ball = require("./ball.js");

function Balls(canvas, ctx) {
  Entity.call(this, canvas, ctx);
  this.list = [new Ball(canvas, ctx)];
  // this.list.push(new Ball(canvas, ctx));
}

Balls.prototype = new Entity();
Balls.prototype.constructor = Balls;

Balls.prototype.addBall = function (x, y) {
  var ball = new Ball(this.canvas, this.ctx);
  ball.setPosition(x,y);
  this.list.push(ball);
};

Balls.prototype.inflate = function () {
  this.list.forEach(function(ball){
      ball.inflate();
  });
};

Balls.prototype.accelerate = function () {
  this.list.forEach(function(ball){
      ball.dy *= 2;
  });
};

Balls.prototype.render = function () {
  this.list.forEach(function(ball){
      ball.render();
  });
};

module.exports = Balls;
