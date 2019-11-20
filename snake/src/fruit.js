import * as CONSTANTS from "/src/constants";
import { detectCollision } from "/src/collisionDetection";
export default class fruit {
  constructor(game) {
    this.game = game;
    this.size = CONSTANTS.BLOCK_SIZE;
    this.isEaten = true;
    this.israinbow = false;
    this.apple = document.getElementById("img_apple");
    this.rainbowapple = document.getElementById("img_rainbowapple");
  }

  generate() {
    const x_range = this.game.gameWidth / CONSTANTS.BLOCK_SIZE;
    const y_range = this.game.gameHeight / CONSTANTS.BLOCK_SIZE;
    const x =
      Math.floor(Math.random() * x_range) * CONSTANTS.BLOCK_SIZE +
      CONSTANTS.X_OFFSET;
    const y =
      Math.floor(Math.random() * y_range) * CONSTANTS.BLOCK_SIZE +
      CONSTANTS.Y_OFFSET;
    if (detectCollision({ x, y }, this.game.snake.bodies))
      return this.generate();
    this.position = { x, y };
    this.isEaten = false;
    if (Math.random() > 0.8) this.israinbow = true;
    else this.israinbow = false;
  }

  draw(ctx) {
    let img = null;
    if (this.israinbow) img = this.rainbowapple;
    else img = this.apple;
    ctx.drawImage(img, this.position.x, this.position.y, this.size, this.size);
  }

  update() {
    if (this.isEaten) this.generate();
  }
}
