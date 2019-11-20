import Snake from "/src/snake";
import Fruit from "/src/fruit";
import InputHandler from "/src/input";

import * as CONSTANTS from "/src/constants";

const GAME_STATE = {
  MENU: 0,
  RUNNING: 1,
  PAUSED: 2,
  GAMEOVER: 3
};


export default class Game {
  constructor() {
    this.gameWidth = CONSTANTS.GAME_WIDTH;
    this.gameHeight = CONSTANTS.GAME_HEIGHT;
    this.gameState = GAME_STATE.MENU;
    this.gameSpeed = CONSTANTS.NORMAL_FRAME;
    this.score = 0;
    this.penaltyspeed = false;

    this.keymapimage = document.getElementById("img_keymap");
    this.initGame();
  }

  initGame() {
    this.snake = new Snake(this.gameWidth, this.gameHeight);
    this.fruit = new Fruit(this);
    this.inputHandler = new InputHandler(this.snake, this);
  }

  start() {
    if (
      this.gameState !== GAME_STATE.MENU &&
      this.gameState !== GAME_STATE.GAMEOVER
    )
      return;
    if (this.gameState === GAME_STATE.GAMEOVER) this.initGame();
    this.gameObjects = [this.snake, this.fruit];
    this.gameState = GAME_STATE.RUNNING;
  }

  update() {
    if (
      this.gameState === GAME_STATE.PAUSED ||
      this.gameState === GAME_STATE.MENU ||
      this.gameState === GAME_STATE.GAMEOVER
    )
      return;
    this.gameObjects.forEach(object => object.update());

    this.eatFruit();
    this.updateSpeed();

    if (this.snake.dead) this.gameState = GAME_STATE.GAMEOVER;
  }

  draw(ctx) {
    if (this.gameObjects) this.gameObjects.forEach(object => object.draw(ctx));

    switch (this.gameState) {
      case GAME_STATE.MENU:
        this.drawPlate(ctx, CONSTANTS.GAME_MENU_MESSAGE);
        break;
      case GAME_STATE.PAUSED:
        this.drawPlate(ctx, CONSTANTS.GAME_PAUSED_MESSAGE, CONSTANTS.GAME_GREY);
        break;
      case GAME_STATE.GAMEOVER:
        this.drawPlate(ctx, CONSTANTS.GAME_GAMEOVER_MESSAGE);
        break;
      default:
        break;
    }

    this.drawBorder(ctx);
    this.drawInstructionPanel(ctx);
  }

  updateSpeed() {
    if (this.penaltyspeed) {
      this.gameSpeed = CONSTANTS.GAME_PENALTYSPEED;
      return;
    }
    let accleration = false;
    if (this.starttime) {
      const endtime = new Date();
      const timeElapsed = (endtime - this.starttime) / 1000;
      if (timeElapsed > CONSTANTS.KEYPRESS_COOLDOWN) {
        accleration = true;
      }
    }
    this.gameSpeed = Math.max(
      CONSTANTS.MIN_SPEED,
      240 -
      CONSTANTS.BODY_PENALTY *
      (this.snake.length - CONSTANTS.SNAKE_INIT_LENGTH)
    );
    if (accleration) this.gameSpeed = CONSTANTS.MIN_SPEED;
  }

  accelerateSpeed(starttime) {
    if (!this.starttime) this.starttime = starttime;
  }

  restoreSpeed() {
    this.starttime = null;
  }

  eatFruit() {
    const head = this.snake.bodies[this.snake.length - 1];
    if (
      head.position.x === this.fruit.position.x &&
      head.position.y === this.fruit.position.y
    ) {
      this.snake.bodies.unshift(this.snake.bodies[0]);
      this.snake.length += 1;
      this.fruit.isEaten = true;
      this.score += 10;
      if (this.fruit.israinbow) {
        this.score += 20;
        this.penaltyspeed = true;
      } else {
        this.penaltyspeed = false;
      }
    }
  }

  togglePause() {
    if (this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
      this.gameSpeed = CONSTANTS.NORMAL_FRAME;
    } else if (this.gameState === GAME_STATE.RUNNING) {
      this.gameState = GAME_STATE.PAUSED;
      this.draw();
      this.gameSpeed = CONSTANTS.MAX_FRAME;
    }
  }

  drawPlate(
    ctx,
    text,
    style = CONSTANTS.GAME_BLACK,
    font = CONSTANTS.GAME_MESSAGE_SMALL_FONT
  ) {
    ctx.rect(
      CONSTANTS.X_OFFSET,
      CONSTANTS.Y_OFFSET,
      this.gameWidth,
      this.gameHeight
    );
    ctx.fillStyle = style;
    ctx.fill();

    ctx.font = font;
    ctx.fillStyle = CONSTANTS.GAME_MESSAGE_COLOR;
    ctx.textAlign = "center";
    ctx.fillText(
      text,
      CONSTANTS.X_OFFSET + this.gameWidth / 2,
      CONSTANTS.Y_OFFSET + this.gameHeight / 2
    );
  }

  drawInstructionPanel(ctx) {
    const x_base = 0;
    const y_base =
      CONSTANTS.Y_OFFSET + CONSTANTS.GAME_HEIGHT + CONSTANTS.STROKELINE_WIDTH;
    const x_width = CONSTANTS.SCREEN_WIDTH - x_base;
    const y_height = CONSTANTS.SCREEN_HEIGHT - y_base;

    ctx.fillStyle = CONSTANTS.GAME_LIGHTGREY;
    ctx.fillRect(x_base, y_base, x_width, y_height);
    ctx.fillStyle = CONSTANTS.GAME_BLACK;
    ctx.font = CONSTANTS.GAME_INSTRUCTION_PANEL_MEDIUM_FONT;
    ctx.fillText(
      "SCORE:" + this.score,
      x_base + x_width / 2,
      y_base + y_height / 3
    );
    ctx.font = CONSTANTS.GAME_INSTRUCTION_PANEL_SMALL_FONT;
    ctx.fillText(
      "ESC: PAUSE",
      x_base + x_width / 5,
      y_base + y_height / 3 * 2
    );
    ctx.fillText(
      "SPACE: START",
      x_base + x_width / 5 * 2.5,
      y_base + y_height / 3 * 2
    );
    ctx.fillText(
      "←↑→↓: CONTROL",
      x_base + x_width / 5 * 4,
      y_base + y_height / 3 * 2
    );

    // ctx.drawImage(this.keymapimage, x_base + x_width / 5 * 4, y_base + y_height / 2, 50, 50);
  }

  drawBorder(ctx) {
    ctx.beginPath();
    ctx.lineWidth = CONSTANTS.STROKELINE_WIDTH;
    ctx.strokeStyle = CONSTANTS.STROKELINE_COLOR;
    ctx.strokeRect(
      CONSTANTS.X_OFFSET - CONSTANTS.STROKELINE_WIDTH / 2,
      CONSTANTS.Y_OFFSET - CONSTANTS.STROKELINE_WIDTH / 2,
      CONSTANTS.GAME_WIDTH + CONSTANTS.STROKELINE_WIDTH,
      CONSTANTS.GAME_HEIGHT + CONSTANTS.STROKELINE_WIDTH
    );
  }
}
