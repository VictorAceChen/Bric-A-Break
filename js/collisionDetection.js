var Prize = require("./prize.js");

function CollisionDetection(balls, bricks, paddle, prizes, status, canvas) {
  this.balls = balls;
  this.bricks = bricks;
  this.prizes = prizes;
  this.paddle = paddle;
  this.stat = status;
  this.canvas = canvas;
}

CollisionDetection.prototype.checkBalls = function() {
  var balls = this.balls;
  var paddle = this.paddle;
  var stat = this.stat;
  var checkBricks = this.checkBricks.bind(this);
  var checkPaddle = this.checkPaddle.bind(this);

  canvas = this.canvas;

  balls.list.forEach(function(ball, index){
    // if(ball.y < canvas.height) return;
    checkBricks(ball);
    checkPaddle(ball);

    if(ball.y > canvas.height) {
      balls.list.splice(index,1);
    }

  });

  if(balls.list.length < 1) {
    stat.lives -= 1;
    balls.reset();
    paddle.width= 120;
  }
};

CollisionDetection.prototype.checkBricks = function(ball) {
  var bricks = this.bricks;
  var stat = this.stat;
  var isHit = false;
  var prizes = this.prizes;

  var isRectOverlap = this.isRectOverlap;

  bricks.list.forEach(function(row){
    row.forEach(function(brick, index){
      var isHit = false;
      // ball hits by left/right
      if(isRectOverlap(brick, ball.getLeftEdge()) ) {
        ball.shiftHorizontal();
        isHit = true;
        // ball hits by top/bottom
      } else if ( isRectOverlap(brick, ball.getRightEdge()) ) {
        ball.shiftHorizontal();
        isHit = true;
      }else if (isRectOverlap(brick, ball.getTopEdge()) ||
        isRectOverlap(brick, ball.getBottomEdge()) ) {
        ball.shiftVertical();
        isHit = true;
      }

      if(isHit){
        stat.scorePoint();
        brick.weaken();
        if (brick.isDead()) {
          row.splice(index, 1);
          var prize = new Prize(brick.canvas, brick.ctx);
          prize.setPosition(brick.x,brick.y);
          prizes.list.push(prize);
        }
        return;
      }
    });
  });
};

CollisionDetection.prototype.checkPrizes = function() {
    var paddle  = this.paddle;
    var prizes = this.prizes;
    var isOverlap = this.isOverlap;
    var stat = this.stat;
    var balls = this.balls;

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
          case "cherry":
            balls.addBall(paddle.x, paddle.y);
          break;
          case "inflate":
            balls.inflate();
          break;
          case "fire":
            balls.accelerate();
          break;
          case "beer":
            balls.reverse();
          break;
          case "question":
            prize.roulette();
            prizes.list.push(prize);
          break;
        }
      }
      else if(prize.isOutOfBound()){
        prizes.list.splice(index,1);
      }
    });
};

CollisionDetection.prototype.checkPaddle = function(ball) {
  // var ballRect = ball.toRect();
  var paddle = this.paddle;

      if(this.isOverlap(paddle, ball.toRect())) {
      // if(paddle.isHit(ball)) {
        // if(this.isRectOverlap(ballRect, paddle.getLeftEdge())){
        //     ball.setVelocity(-6,-2);
        // }else if(this.isRectOverlap(ballRect, paddle.getLeftCenter())){
        //     ball.setVelocity(-4,-4);
        // }else if(this.isRectOverlap(ballRect, paddle.getCenter())){
        //     ball.setVelocity(0,-6);
        // }else if(this.isRectOverlap(ballRect, paddle.getRightCenter())){
        //     ball.setVelocity(4,-4);
        // }else if(this.isRectOverlap(ballRect, paddle.getRightEdge())){
        //     ball.setVelocity(6,-2);
        // }
        // ball ricochet
        var ballPos = ball.x - paddle.x;
        if(ball.x < paddle.x + paddle.width/9){
            ball.setVelocity(-6,-2);
        }else if(ball.x < paddle.x + (paddle.width/9 * 4)){
            ball.setVelocity(-4,-4);
        }else if(ball.x < paddle.x + (paddle.width/9 * 5)){
            ball.setVelocity(0,-6);
        }else if(ball.x < paddle.x + (paddle.width/9 * 8)){
            ball.setVelocity(4,-4);
        }else if(ball.x < paddle.x + paddle.width){
            ball.setVelocity(6,-2);
        }else{ ball.reverse();}
      }
};



CollisionDetection.prototype.isRectOverlap = function(rect, point) {
  return point.x > rect.x &&
    point.x < rect.x + rect.width &&
    point.y > rect.y &&
    point.y < rect.y + rect.height;
};

CollisionDetection.prototype.isOverlap = function(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.height + rect1.y > rect2.y;
};



module.exports = CollisionDetection;
