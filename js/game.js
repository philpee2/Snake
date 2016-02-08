const Settings = require('./settings'),
  Snake = require('./snake'),
  Cell = require('./cell'),
  _ = require('lodash'),
  key = require('keymaster'),
  $ = require('jquery');

class Game {

  static get speed() {
    return Settings.game.speed;
  }

  static get DIM_X() {
    return Settings.game.DIM_X;
  }

  static get DIM_Y() {
    return Settings.game.DIM_Y;
  }

  static get FOOD_COLOR() {
    return Settings.game.FOOD_COLOR;
  }

  constructor(ctx) {
    this.ctx = ctx;

    // Constants representing the number of rows and columns
    this.WIDTH = Settings.game.WIDTH;
    this.HEIGHT = Settings.game.HEIGHT;

    this.snake = new Snake(this);
    this.food = this.placeFood();
    this.score = 0;

    this.bindKeyHandlers();
  }

  start() {
    // Begin running the 'step' logic 10 times per second.
    var interval = Math.floor(1000/Game.speed);
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
    this.score = 0;
    $("#score").html(this.score);
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
    if (this.paused){
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
    do {
      let randX = _.random(this.WIDTH - 1);
      let randY = _.random(this.HEIGHT - 1);
      var pos = [randX, randY]
    } while (this.snake.contains(pos))

    return new Cell(pos, Game.FOOD_COLOR);
  }

  foodEaten() {
    // Place a new food, increment the score, and update it on the page.
    this.food = this.placeFood();
    this.score++;
    $("#score").html(this.score);
  }

  outOfBounds(pos) {
    const [x, y] = pos;
    return (x < 0) || (x >= this.WIDTH) || (y < 0) || (y >= this.HEIGHT);
  }
}

module.exports = Game;
