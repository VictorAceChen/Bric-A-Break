var Entity = require("./entity.js");

function Bricks(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.brickRowCount = 3;
  this.brickColumnCount = 5;
  this.brickWidth = 75;
  this.brickHeight = 25;
  this.brickPadding = 10;
  this.brickOffsetTop = 30;
  this.brickOffsetLeft = 30;

  this.bricks = [];
  for(c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for(r = 0; r < this.brickRowCount; r++) {
          this.bricks[c][r] = { x: 0, y: 0 };
      }
  }

}

// inherit constructor
Bricks.prototype = new Entity();
Bricks.prototype.constructor = Bricks;

Bricks.prototype.render = function () {
  var ctx = this.ctx;
    for(c=0; c<this.brickColumnCount; c++) {
        for(r=0; r<this.brickRowCount; r++) {
            this.brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
            this.brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
            this.bricks[c][r].x = this.brickX;
            this.bricks[c][r].y = this.brickY;
            ctx.beginPath();
            ctx.rect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
    }
};


module.exports = Bricks;
