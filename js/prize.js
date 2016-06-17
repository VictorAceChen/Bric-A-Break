var Entity = require("./entity.js");

PRIZE_IMAGE = {
  "grow": "../images/mushroom.png",
  2: "#FFA500",
  3: "#FFFF00",
  4: "#008000",
  5: "#0000FF",
  6: "#800080",
  7: "#A9A9A9"
};

function Prize(canvas, ctx) {
  Entity.call(this, canvas, ctx);
  this.setPosition(this.canvas.width/2, this.canvas.height-30);

}

Prize.prototype.setPosition = function(x, y) {
  this.x = x || this.x;
  this.y = y || this.y;
};

Prize.prototype.setType = function(type) {
  this.type = type;
  this.img = new Image();   // Create new img element
  this.img.src = PRIZE_IMAGE[type]; // Set source path

};

Prize.prototype.render = function(){
  var ctx = this.ctx;
  ctx.drawImage(this.img,0,0);
  ctx.beginPath();
  ctx.moveTo(30,96);
  ctx.lineTo(70,66);
  ctx.lineTo(103,76);
  ctx.lineTo(170,15);
  ctx.stroke();
};

module.exports = Prize;
