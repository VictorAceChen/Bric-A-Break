<<<<<<< HEAD
function CollisionDetection(ball, bricks, paddle, status) {
  this.ball = ball;
  this.bricks = bricks;
  this.paddle = paddle;
  this.stat = status;
=======
var Prize = require("./prize.js");

function CollisionDetection(ball, bricks, paddle, prizes, status, canvas) {
  this.ball = ball;
  this.bricks = bricks;
  this.prizes = prizes;
  this.paddle = paddle;
  this.stat = status;
  this.canvas = canvas;
>>>>>>> gh-pages
}

CollisionDetection.prototype.checkBricks = function() {
  var ball = this.ball;
  var bricks = this.bricks;
  var stat = this.stat;
  var isHit = false;
<<<<<<< HEAD
=======
  var prizes = this.prizes;
>>>>>>> gh-pages

  var isRectOverlap = this.isRectOverlap;

  bricks.list.forEach(function(row){
    row.forEach(function(brick, index){
      var isHit = false;
      // ball hits by left/right
      if(isRectOverlap(brick, ball.getLeftEdge()) ||
        isRectOverlap(brick, ball.getRightEdge()) ) {
        ball.shiftHorizontal();
        isHit = true;
        // ball hits by top/bottom
      } else if (isRectOverlap(brick, ball.getTopEdge()) ||
        isRectOverlap(brick, ball.getBottomEdge()) ) {
        ball.shiftVertical();
        isHit = true;
      }

      if(isHit){
        stat.scorePoint();
        brick.weaken();
<<<<<<< HEAD
        if (brick.isDead()) row.splice(index, 1);
      }
      // if(brick.isHit(ball)) {
      //   stat.scorePoint();
      //   ball.shiftVertical();
      //   brick.weaken();
      //   if (brick.isDead()) row.splice(index, 1);
      // }
=======
        if (brick.isDead()) {
          row.splice(index, 1);
          var prize = new Prize(brick.canvas, brick.ctx);
          prize.setPosition(brick.x,brick.y);
          prizes.list.push(prize);
        }
        return;
      }
>>>>>>> gh-pages
    });
  });
};

<<<<<<< HEAD
=======
CollisionDetection.prototype.checkPrizes = function() {
    var paddle  = this.paddle;
    var prizes = this.prizes;
    var isOverlap = this.isOverlap;
    var isOutOfBound = this.isOutOfBound;
    var stat = this.stat;

    prizes.list.forEach(function(prize, index){
      if(isOverlap(paddle, prize)){
        prizes.list.splice(index,1);
        switch(prize.type){
          case "1up":
            stat.lives += 1;
          break;
          case "grow":
            paddle.grow();
          break;
          case "poison":
            paddle.shrink();
          break;
        }
      }
      else if(prize.isOutOfBound()){
        prizes.list.splice(index,1);
      }
    });
};

>>>>>>> gh-pages
CollisionDetection.prototype.checkPaddle = function() {
  var ball = this.ball;
  var paddle = this.paddle;

      if(paddle.isHit(ball)) {
        var ballPos = ball.x - paddle.x;

        // ball ricochet
        if(ball.x < paddle.x + paddle.width/9){
<<<<<<< HEAD
            ball.setVelocity(-4.2,-0.75);
        }else if(ball.x < paddle.x + (paddle.width/9 * 4)){
            ball.setVelocity(-2,-2);
        }else if(ball.x < paddle.x + (paddle.width/9 * 5)){
            ball.setVelocity(0,-2);
        }else if(ball.x < paddle.x + (paddle.width/9 * 8)){
            ball.setVelocity(2,-2);
        }else if(ball.x < paddle.x + paddle.width){
            ball.setVelocity(4.2,-0.75);
=======
            ball.setVelocity(-6,-2);
        }else if(ball.x < paddle.x + (paddle.width/9 * 4)){
            ball.setVelocity(-4,-4);
        }else if(ball.x < paddle.x + (paddle.width/9 * 5)){
            ball.setVelocity(0,-6);
        }else if(ball.x < paddle.x + (paddle.width/9 * 8)){
            ball.setVelocity(4,-4);
        }else if(ball.x < paddle.x + paddle.width){
            ball.setVelocity(6,-2);
>>>>>>> gh-pages
        }

      }
};

<<<<<<< HEAD
=======


>>>>>>> gh-pages
CollisionDetection.prototype.isRectOverlap = function(rect, point) {
  return point.x > rect.x &&
    point.x < rect.x + rect.width &&
    point.y > rect.y &&
    point.y < rect.y + rect.height;
};

<<<<<<< HEAD

=======
CollisionDetection.prototype.isOverlap = function(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.height + rect1.y > rect2.y;
};
>>>>>>> gh-pages



module.exports = CollisionDetection;
