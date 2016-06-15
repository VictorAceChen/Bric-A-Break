var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var Ball = require("./ball.js");

var ball = new Ball(canvas, ctx);

var render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.render();
};


setInterval(render, 10);
