var Entity = require("./entity.js");

PRIZE_IMAGE = {
  "grow": "images/mushroom.png",
  "poison": "images/poison_mushroom.gif",
  "cherry": "images/cherry.png",
  "1up": "images/1up.png",
  "boo": "images/boo.gif",
  "inflate": "images/dig_dug.png",
  "star": "images/star.png"
};

function Prize(canvas, ctx) {
  Entity.call(this, canvas, ctx);
  this.setPosition(this.canvas.width/2, this.canvas.height-30);
  this.img = new Image();   // Create new img element
  this.width = 25;
  this.height = 25;
  this.roulette();
}

Prize.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
};

Prize.prototype.roulette = function() {
  var rand = Math.random();
  if(rand>0.97){
    this.setType("1up");
  }else if(rand>0.92){
    this.setType("star");
  }else if(rand>0.75){
    this.setType("inflate");
  }else if(rand>0.5){
    this.setType("cherry");
  }else if(rand>0.25){
    this.setType("grow");
  }else{
    this.setType("poison");
  }
};

Prize.prototype.setType = function(type) {
  this.type = type;
  this.img.src = PRIZE_IMAGE[type]; // Set source path
};

Prize.prototype.getCenter = function() {
  return {x: this.x+this.width/2, y: this.y+this.height/2 };
};

Prize.prototype.render = function(){
  var ctx = this.ctx;
  ctx.drawImage(this.img,this.x,this.y, this.width, this.height);

  this.y += 1;
};

Prize.prototype.isOutOfBound = function() {
  return this.y > this.canvas.height;
};

module.exports = Prize;
