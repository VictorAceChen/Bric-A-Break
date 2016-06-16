var Entity = require("./entity.js");
var Brick = require("./brick.js");

function Bricks(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.rows = 7;
  this.columns = 7;
  this.padding = 0;
  this.topMargin = 0;
  this.leftMargin = 20;
  // this.columns = 6;
  // this.padding = 10;
  // this.topMargin = 30;
  // this.leftMargin = 30;
  this.list = [];

  for(i = 0; i < this.columns; i++) {
      var row = [];
      for(j = 0; j < this.rows; j++) {
        var brick = new Brick(canvas, ctx);
        var x = (i * (brick.width + this.padding)) + this.leftMargin;
        var y = (j*(brick.height + this.padding)) + this.topMargin;
        brick.setPosition(x,y);
        brick.setStrength(7 - j);
        row.push(brick);
      }
      this.list.push(row);
  }
}

// inherit constructor
Bricks.prototype = new Entity();
Bricks.prototype.constructor = Bricks;

Bricks.prototype.render = function () {
    this.list.forEach(function(row){
      row.forEach(function(brick){
        brick.render();
      });
    });
};


module.exports = Bricks;
