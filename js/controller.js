function Controller(paddle) {

  document.addEventListener("keydown", keyDownHandler, false);

  function keyDownHandler(e) {
    e.preventDefault();

    switch(e.keyCode) {
    case 39:
      paddle.moveLeft();
        break;
    case 65:
      paddle.moveLeft();
        break;
    case 37:
      paddle.moveRight();
        break;
    case 68:
      paddle.moveRight();
        break;
        }
  }
}
module.exports = Controller;
