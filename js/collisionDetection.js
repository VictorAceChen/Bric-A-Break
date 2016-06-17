function CollisionDetection(ball, bricks, paddle, status) {
  this.ball = ball;
  this.bricks = bricks;
  this.paddle = paddle;
  this.stat = status;
}

CollisionDetection.prototype.checkBricks = function() {
  var ball = this.ball;
  var bricks = this.bricks;
  var stat = this.stat;
  var isHit = false;

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
        if (brick.isDead()) row.splice(index, 1);
      }
      // if(brick.isHit(ball)) {
      //   stat.scorePoint();
      //   ball.shiftVertical();
      //   brick.weaken();
      //   if (brick.isDead()) row.splice(index, 1);
      // }
    });
  });
};

CollisionDetection.prototype.checkPaddle = function() {
  var ball = this.ball;
  var paddle = this.paddle;

      if(paddle.isHit(ball)) {
        var ballPos = ball.x - paddle.x;

        if(ball.x < paddle.x + paddle.width/9){
            ball.setVelocity(-4.2,-0.75);
        }else if(ball.x < paddle.x + (paddle.width/9 * 4)){
            ball.setVelocity(-2,-2);
        }else if(ball.x < paddle.x + (paddle.width/9 * 5)){
            ball.setVelocity(0,-2);
        }else if(ball.x < paddle.x + (paddle.width/9 * 8)){
            ball.setVelocity(2,-2);
        }else if(ball.x < paddle.x + paddle.width){
            ball.setVelocity(4.2,-0.75);
        }

      }
};

CollisionDetection.prototype.isRectOverlap = function(rect, point) {
  return point.x > rect.x &&
    point.x < rect.x + rect.width &&
    point.y > rect.y &&
    point.y < rect.y + rect.height;
};





module.exports = CollisionDetection;
