import Game from "/src/game";
import * as CONSTANTS from "/src/constants";
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const game = new Game();

let lastTime = 0;
function gameLoop(timestamp) {
  requestAnimationFrame(gameLoop);

  let delta = timestamp - lastTime;
  if (delta > game.gameSpeed) {
    lastTime = timestamp;
    ctx.clearRect(0, 0, CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);
    game.update();
    game.draw(ctx);
  }
}

requestAnimationFrame(gameLoop);
