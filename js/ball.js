function Ball(x_pos, y_pos, canvas, context) {

  this.ctx = context;

  // position
  this.x = canvas.width/2 + 10;
  this.y = canvas.height-30;
  // velocity
  this.dx = 2;
  this.dy = -2;

  this.draw = function() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fill();
    this.ctx.closePath();
    this.x += this.dx;
    this.y += this.dy;
  }.bind(this)
}


module.exports = Ball;
