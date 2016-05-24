// @flow

import Settings from './settings';
import Snake from './snake';
import Cell from './cell';
import { random } from 'lodash';
import key from 'keymaster';
import $ from 'jquery';

class Game {

  ctx: CanvasRenderingContext2D;
  WIDTH: number;
  HEIGHT: number;
  snake: Snake;
  food: Cell;
  score: number;
  intervalID: ?number;
  hasTurned: boolean;
  paused: boolean;

  static speed: number = Settings.game.speed;
  static DIM_X: number = Settings.game.DIM_X;
  static DIM_Y: number = Settings.game.DIM_Y;
  static FOOD_COLOR: string = Settings.game.FOOD_COLOR;

  constructor(ctx: CanvasRenderingContext2D): void {
    this.ctx = ctx;

    // Constants representing the number of rows and columns
    this.WIDTH = Settings.game.WIDTH;
    this.HEIGHT = Settings.game.HEIGHT;

    this.snake = new Snake(this);
    this.food = this.placeFood();
    this.score = 0;
    this.setScore(this.score);
    this.intervalID = null;
    this.hasTurned = false;
    this.paused = false;

    this.bindKeyHandlers();
  }

  start(): void {
    // Begin running the 'step' logic 10 times per second.
    const interval: number = Math.floor(1000 / Game.speed);
    this.intervalID = window.setInterval(this.step.bind(this), interval);
  }

  step(): void {
    this.hasTurned = false;
    this.move();
    this.draw();
  }

  move(): void {
    this.snake.move();
  }

  draw(): void {
    // Every frame, the canvas is cleared, then the snake and food are re-drawn.
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);
  }

  stop(): void {
    if (this.intervalID != null) {
      clearInterval(this.intervalID);
    }
  }

  gameOver(): void {
    this.stop();

    const again: boolean = confirm(`Game Over! Your score is ${this.score}. Do you want to play again?`);
    if (again) {
      this.restart();
    }
  }

  restart(): void {
    this.snake = new Snake(this);
    this.food = this.placeFood();
    this.setScore(0);
    this.start();
  }

  bindKeyHandlers(): void {
    key("up", () => this.snake.turn("N"));
    key("down", () => this.snake.turn("S"));
    key("left", () => this.snake.turn("W"));
    key("right", () => this.snake.turn("E"));

    key("P", () => this.togglePause());
  }

  togglePause(): void {
    if (this.paused) {
      // Unpause
      this.start();
      this.paused = false;
    } else {
      // Pause
      this.stop();
      this.paused = true;
    }
  }

  placeFood(): Cell {
    // Continually pick a random position for food until one is found that the
    // snake does not contain.
    let pos: [number, number];
    do {
      let randX: number = random(this.WIDTH - 1);
      let randY: number = random(this.HEIGHT - 1);
      pos = [randX, randY];
    } while (this.snake.contains(pos))

    return new Cell(pos, Game.FOOD_COLOR);
  }

  setScore(score: number): void {
    this.score = score;
    $("#score").html(score);
  }

  foodEaten() {
    // Place a new food, increment the score, and update it on the page.
    this.food = this.placeFood();
    const newScore = this.score + 1;
    this.setScore(newScore);
  }

  outOfBounds(pos: [number, number]): boolean {
    const [x, y]: [number, number] = pos;
    return (x < 0) || (x >= this.WIDTH) || (y < 0) || (y >= this.HEIGHT);
  }
}

export default Game;
