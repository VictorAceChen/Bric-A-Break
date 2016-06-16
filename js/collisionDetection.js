function CollisionDetection(ball, bricks, paddle) {
  this.ball = ball;
  this.bricks = bricks;
  this.paddle = paddle;
}


CollisionDetection.prototype.check = function() {
  var ball = this.ball;
  var bricks = this.bricks;
  var paddle = this.paddle;

  bricks.list.forEach(function(row){
    row.forEach(function(brick, index){
      if(ball.x > brick.x &&
        ball.x < brick.x+brick.width &&
        ball.y > brick.y &&
        ball.y < brick.y+brick.height) {
          ball.shiftVertical();
          row.splice(index, 1);
          return;
      }
    });
  });
  // for(i = 0; i < bricks.columns; i++) {
  //     for(j = 0; j< bricks.rows; j++) {
  //         var brick = bricks.list[i][j];
  //         if(ball.x > brick.x &&
  //           ball.x < brick.x+brick.width &&
  //           ball.y > brick.y &&
  //           ball.y < brick.y+brick.height) {
  //             ball.shiftVertical();
  //             // bricks.list[i].splice(j);
  //             return;
  //         }
  //     }
  // }
};

module.exports = CollisionDetection;
