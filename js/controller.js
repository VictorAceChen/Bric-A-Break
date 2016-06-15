function Controller(paddle) {

  document.addEventListener("keydown", keyDownHandler, false);

  function keyDownHandler(e) {
      if(e.keyCode == 39) {
        paddle.x += 7;
      }
      else if(e.keyCode == 37) {
        paddle.x -= 7;
      }
  }
}
module.exports = Controller;
