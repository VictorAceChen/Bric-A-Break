function Controller(status, bricks, paddle,canvas) {

  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
    e.preventDefault();

    switch(e.keyCode) {
    case 13:
      // document.location.reload();
      if(status.isOver() || bricks.isEmpty()){
        status.restart();
        bricks.restart();
      }
        break;
    case 39:
      paddle.isMovingLeft = true;
        break;
    case 68:
      paddle.isMovingLeft = true;
        break;
    case 37:
      paddle.isMovingRight = true;
        break;
    case 65:
      paddle.isMovingRight = true;
        break;
    }
  }

  function keyUpHandler(e) {
    e.preventDefault();

    switch(e.keyCode) {
    case 39:
      paddle.isMovingLeft = false;
        break;
    case 68:
      paddle.isMovingLeft = false;
        break;
    case 37:
      paddle.isMovingRight = false;
        break;
    case 65:
      paddle.isMovingRight = false;
        break;
        }
  }

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width - paddle.width) {
        paddle.setPosition(relativeX);
    }
  }
}
module.exports = Controller;
