export default class InputHandler {
  constructor(snake, game) {
    document.addEventListener("keydown", e => {
      const starttime = new Date();
      switch (e.keyCode) {
        case 37:
          // move left
          snake.moveLeft();
          game.accelerateSpeed(starttime);
          break;
        case 38:
          // move up
          snake.moveUp();
          game.accelerateSpeed(starttime);
          break;
        case 39:
          // move right
          snake.moveRight();
          game.accelerateSpeed(starttime);
          break;
        case 40:
          // move down
          snake.moveDown();
          game.accelerateSpeed(starttime);
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", e => {
      switch (e.keyCode) {
        case 37:
        case 38:
        case 39:
        case 40:
          game.restoreSpeed();
          break;
        case 32:
          // start game
          game.start();
          break;
        case 27:
          // ESC pause game
          game.togglePause();
          break;
        default:
          break;
      }
    });
  }
}
