var Entity = require("./entity.js");
var Ball = require("./ball.js");

function Balls(canvas, ctx) {
  Entity.call(this, canvas, ctx);
  this.list = [new Ball(canvas, ctx)];
}

Balls.prototype = new Entity();
Balls.prototype.constructor = Balls;

Balls.prototype.render = function () {
      this.list.forEach(function(ball){
          ball.render();
      });
};

module.exports = Balls;
