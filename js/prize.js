var Entity = require("./entity.js");

PRIZE_IMAGE = {
  "grow": "images/mushroom.png",
  2: "#FFA500",
  "ball": null,
  4: "#008000",
  5: "#0000FF",
  6: "#800080",
  7: "#A9A9A9"
};

function Prize(canvas, ctx) {
  Entity.call(this, canvas, ctx);
  this.setPosition(this.canvas.width/2, this.canvas.height-30);
  this.img = new Image();   // Create new img element
  this.width = 25;
  this.height = 25;
}

Prize.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
};

Prize.prototype.setType = function(type) {
  this.type = type;
  this.img.src = PRIZE_IMAGE[type]; // Set source path
};

Prize.prototype.getCenter = function() {
  return {x: this.x+this.width/2,y: this.y+this.height/2 };
};

Prize.prototype.render = function(){
  var ctx = this.ctx;
  ctx.drawImage(this.img,this.x,this.y, this.width, this.height);

  this.y += 1;
};

module.exports = Prize;
