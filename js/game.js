import Settings from './settings';
import Snake from './snake';
import Cell from './cell';
import { random } from 'lodash';
import key from 'keymaster';
import $ from 'jquery';

class Game {

  static speed = Settings.game.speed;
  static DIM_X = Settings.game.DIM_X;
  static DIM_Y = Settings.game.DIM_Y;
  static FOOD_COLOR = Settings.game.FOOD_COLOR;

  constructor(ctx) {
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

  start() {
    // Begin running the 'step' logic 10 times per second.
    const interval = Math.floor(1000 / Game.speed);
    this.intervalID = window.setInterval(this.step.bind(this), interval);
  }

  step() {
    this.hasTurned = false;
    this.move();
    this.draw();
  }

  move() {
    this.snake.move();
  }

  draw() {
    // Every frame, the canvas is cleared, then the snake and food are re-drawn.
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);
  }

  stop() {
    clearInterval(this.intervalID);
  }

  gameOver() {
    this.stop();

    const again = confirm(`Game Over! Your score is ${this.score}. Do you want to play again?`);
    if (again) {
      this.restart();
    }
  }

  restart() {
    this.snake = new Snake(this);
    this.food = this.placeFood();
    this.setScore(0);
    this.start();
  }

  bindKeyHandlers() {
    key("up", () => this.snake.turn("N"));
    key("down", () => this.snake.turn("S"));
    key("left", () => this.snake.turn("W"));
    key("right", () => this.snake.turn("E"));

    key("P", () => this.togglePause());
  }

  togglePause() {
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

  placeFood() {
    // Continually pick a random position for food until one is found that the
    // snake does not contain.
    let pos;
    do {
      let randX = random(this.WIDTH - 1);
      let randY = random(this.HEIGHT - 1);
      pos = [randX, randY];
    } while (this.snake.contains(pos))

    return new Cell(pos, Game.FOOD_COLOR);
  }

  setScore(score) {
    this.score = score;
    $("#score").html(score);
  }

  foodEaten() {
    // Place a new food, increment the score, and update it on the page.
    this.food = this.placeFood();
    const newScore = this.score + 1;
    this.setScore(newScore);
  }

  outOfBounds(pos) {
    const [x, y] = pos;
    return (x < 0) || (x >= this.WIDTH) || (y < 0) || (y >= this.HEIGHT);
  }
}

export default Game;
