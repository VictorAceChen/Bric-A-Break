function Controller(paddle,canvas) {

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
    e.preventDefault();

    switch(e.keyCode) {
    case 39:
      paddle.moveLeft();
        break;
    case 68:
      paddle.moveLeft();
        break;
    case 37:
      paddle.moveRight();
        break;
    case 65:
      paddle.moveRight();
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
