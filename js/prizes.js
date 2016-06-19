var Entity = require("./entity.js");
var Prize = require("./prize.js");

function Prizes(canvas, ctx) {
  Entity.call(this, canvas, ctx);
  this.list = [];

}

Prizes.prototype = new Entity();
Prizes.prototype.constructor = Prizes;

Prizes.prototype.render = function () {
    this.list.forEach(function(prize){
        prize.render();
    });
};
module.exports = Prizes;
