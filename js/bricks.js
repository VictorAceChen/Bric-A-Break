var Entity = require("./entity.js");
var Brick = require("./brick.js");

function Bricks(canvas, ctx) {
  Entity.call(this, canvas, ctx);

  this.rows = 8;
  this.columns = 8;
  this.padding = 1;
  this.topMargin = 40;
  this.leftMargin = 35;
  this.canvas = canvas;
  this.ctx = ctx;
  this.restart();
}

// inherit constructor
Bricks.prototype = new Entity();
Bricks.prototype.constructor = Bricks;

Bricks.prototype.restart = function () {
  this.list = [];

  for(i = 0; i < this.columns; i++) {
      var row = [];
      for(j = 0; j < this.rows; j++) {
        var brick = new Brick(this.canvas, this.ctx);
        var x = (i * (brick.width + this.padding)) + this.leftMargin;
        var y = (j*(brick.height + this.padding)) + this.topMargin;
        brick.setPosition(x,y);
        brick.setStrength(7 - j);
        row.push(brick);
      }
      this.list.push(row);
  }
};

Bricks.prototype.isEmpty = function () {
    return this.list.every(function(arr){
      return arr.length === 0;
    });
};

Bricks.prototype.render = function () {
    this.list.forEach(function(row){
      row.forEach(function(brick){
        brick.render();
      });
    });
};


module.exports = Bricks;
