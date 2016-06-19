var Entity = require("./entity.js");
var Ball = require("./ball.js");

function Balls(canvas, ctx) {
  Entity.call(this, canvas, ctx);
  this.list = [];
  
}

Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;

module.exports = Balls;
