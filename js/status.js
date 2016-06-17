var Entity = require("./entity.js");

function Status(canvas, ctx) {
  Entity.call(this, canvas, ctx);
  this.score = 0;
  this.lives = 3;
}

Status.prototype = new Entity();
Status.prototype.constructor = Status;

Status.prototype.scorePoint = function() {
  this.score += 1;
};

Status.prototype.render = function() {
  var ctx = this.ctx;
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + this.score,
     8,
     this.canvas.height - 10);
  ctx.fillText("Lives: " + this.lives,
    this.canvas.width-65, 
    this.canvas.height - 10);
};

module.exports = Status;
