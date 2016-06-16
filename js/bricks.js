var Entity = require("./entity.js");
var Brick = require("./brick.js");

function Bricks(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.bricks = [];
  this.rows = 3;
  this.column = 5;
  this.brickWidth = 75;
  this.brickHeight = 25;
  this.padding = 10;
  this.topMargin = 30;
  this.leftMargin = 30;

  for(i = 0; i < this.column; i++) {
      var row = [];
      for(j = 0; j < this.rows; j++) {
        var brick = new Brick(canvas, ctx);
        var x = (i*(brick.width+this.padding))+this.leftMargin;
        var y = (j*(brick.height+this.padding))+this.topMargin;
        brick.setPosition(x,y);
        row.push(brick);
      }
      this.bricks.push(row);
  }
}

// inherit constructor
Bricks.prototype = new Entity();
Bricks.prototype.constructor = Bricks;

Bricks.prototype.render = function () {
    for(i = 0; i < this.column; i++) {
        for(j = 0; j < this.rows; j++) {
            this.bricks[i][j].render();
        }
    }
};


module.exports = Bricks;
