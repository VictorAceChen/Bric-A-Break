function CollisionDetection(ball, bricks, paddle) {
  this.ball = ball;
  this.bricks = bricks;
  this.paddle = paddle;
}

CollisionDetection.prototype.checkBricks = function() {
  var ball = this.ball;
  var bricks = this.bricks;
  var paddle = this.paddle;

  bricks.list.forEach(function(row){
    row.forEach(function(brick, index){
      if(brick.isHit(ball)) {

            ball.shiftVertical();
            // ball.shiftHorizontal();

          row.splice(index, 1);
      }
    });
  });
};

CollisionDetection.prototype.checkPaddle = function() {
  var ball = this.ball;
  var paddle = this.paddle;

      if(paddle.isHit(ball)) {
            //needs
            ball.shiftVertical();
      }
};

module.exports = CollisionDetection;
