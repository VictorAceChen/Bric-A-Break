function Controller(paddle) {

  document.addEventListener("keydown", keyDownHandler, false);

  function keyDownHandler(e) {
    e.preventDefault();
    if(e.keyCode == 39) {
      paddle.moveLeft();
    }
    else if(e.keyCode == 37) {
      paddle.moveRight();
    }
  }
}
module.exports = Controller;
