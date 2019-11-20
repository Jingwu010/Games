import * as CONSTANTS from "/src/constants";
export default class Block {
  constructor(x, y) {
    this.size = CONSTANTS.BLOCK_SIZE;
    this.position = { x, y };
    this.headupimage = document.getElementById("img_headup");
    this.headdownimage = document.getElementById("img_headdown");
    this.headrightimage = document.getElementById("img_headright");
    this.headleftimage = document.getElementById("img_headleft");
  }

  draw(ctx) {
    ctx.fillStyle = CONSTANTS.GAME_BLACK;
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  drawHead(ctx, direction) {
    let img = null;
    switch (direction) {
      case CONSTANTS.DIRECTIONS.LEFT:
        img = this.headleftimage;
        break;
      case CONSTANTS.DIRECTIONS.RIGHT:
        img = this.headrightimage;
        break;
      case CONSTANTS.DIRECTIONS.DOWN:
        img = this.headdownimage;
        break;
      case CONSTANTS.DIRECTIONS.UP:
        img = this.headupimage;
        break;
      default:
        break;
    }
    ctx.fillStyle = CONSTANTS.GAME_BLACK;
    ctx.drawImage(img, this.position.x, this.position.y, this.size, this.size);
  }
}
