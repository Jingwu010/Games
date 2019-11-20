import Block from "/src/block";
import { detectCollision } from "/src/collisionDetection";

import * as CONSTANTS from "/src/constants";

export default class Snake {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.bodies = [];
    this.direction = CONSTANTS.DIRECTIONS.RIGHT;
    this.dead = false;

    const init_x =
      CONSTANTS.X_OFFSET +
      this.gameWidth / 2 -
      CONSTANTS.BLOCK_SIZE * (CONSTANTS.SNAKE_INIT_LENGTH / 2);
    const init_y = CONSTANTS.Y_OFFSET + this.gameHeight / 2;
    for (let i = 0; i < CONSTANTS.SNAKE_INIT_LENGTH; i++) {
      const x = init_x + CONSTANTS.BLOCK_SIZE * i;
      this.bodies.push(new Block(x, init_y));
    }
    this.length = this.bodies.length;
  }

  draw(ctx) {
    this.bodies.slice(0, this.length - 1).forEach(body => body.draw(ctx));
    this.bodies[this.length - 1].drawHead(ctx, this.getDirection());
  }

  update() {
    const head = this.bodies[this.length - 1];
    let newHead;
    switch (this.direction) {
      case CONSTANTS.DIRECTIONS.RIGHT:
        newHead = new Block(
          head.position.x + CONSTANTS.BLOCK_SIZE,
          head.position.y
        );
        break;
      case CONSTANTS.DIRECTIONS.LEFT:
        newHead = new Block(
          head.position.x - CONSTANTS.BLOCK_SIZE,
          head.position.y
        );
        break;
      case CONSTANTS.DIRECTIONS.UP:
        newHead = new Block(
          head.position.x,
          head.position.y - CONSTANTS.BLOCK_SIZE
        );
        break;
      case CONSTANTS.DIRECTIONS.DOWN:
        newHead = new Block(
          head.position.x,
          head.position.y + CONSTANTS.BLOCK_SIZE
        );
        break;
      default:
        break;
    }
    if (this.isDead(newHead)) return;
    this.bodies.push(newHead);
    this.bodies.shift();
  }

  isDead(head) {
    this.dead = true;
    if (
      head.position.x >= CONSTANTS.X_OFFSET + this.gameWidth ||
      head.position.x < CONSTANTS.X_OFFSET
    )
      return true;
    if (
      head.position.y >= CONSTANTS.Y_OFFSET + this.gameHeight ||
      head.position.y < CONSTANTS.Y_OFFSET
    )
      return true;
    if (detectCollision(head.position, this.bodies.slice(0, this.length - 1)))
      return true;
    this.dead = false;
    return false;
  }

  getDirection() {
    const dx =
      this.bodies[this.length - 1].position.x -
      this.bodies[this.length - 2].position.x;
    const dy =
      this.bodies[this.length - 1].position.y -
      this.bodies[this.length - 2].position.y;
    if (dx < 0) this.direction = CONSTANTS.DIRECTIONS.LEFT;
    else if (dx > 0) this.direction = CONSTANTS.DIRECTIONS.RIGHT;
    else if (dy < 0) this.direction = CONSTANTS.DIRECTIONS.UP;
    else if (dy > 0) this.direction = CONSTANTS.DIRECTIONS.DOWN;
    return this.direction;
  }

  moveLeft() {
    this.getDirection();
    if (this.direction === CONSTANTS.DIRECTIONS.RIGHT) return;
    this.direction = CONSTANTS.DIRECTIONS.LEFT;
  }

  moveRight() {
    this.getDirection();
    if (this.direction === CONSTANTS.DIRECTIONS.LEFT) return;
    this.direction = CONSTANTS.DIRECTIONS.RIGHT;
  }

  moveUp() {
    this.getDirection();
    if (this.direction === CONSTANTS.DIRECTIONS.DOWN) return;
    this.direction = CONSTANTS.DIRECTIONS.UP;
  }

  moveDown() {
    this.getDirection();
    if (this.direction === CONSTANTS.DIRECTIONS.UP) return;
    this.direction = CONSTANTS.DIRECTIONS.DOWN;
  }
}
