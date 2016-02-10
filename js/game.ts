import Settings = require('./settings');
import Snake = require('./snake');
import Cell = require('./cell');
import _ = require('lodash');
import key = require('keymaster');
import $ = require('jquery');

class Game {
  ctx : any;
  WIDTH : number;
  HEIGHT : number;
  food : Cell;
  intervalID : number;
  hasTurned : boolean;
  snake : Snake;
  paused : boolean;
  score : number;

  static get speed(): number {
    return Settings.game.speed;
  }

  static get DIM_X(): number {
    return Settings.game.DIM_X;
  }

  static get DIM_Y(): number {
    return Settings.game.DIM_Y;
  }

  static get FOOD_COLOR(): string {
    return Settings.game.FOOD_COLOR;
  }

  constructor(ctx) {
    this.ctx = ctx;

    // Constants representing the number of rows and columns
    this.WIDTH = Settings.game.WIDTH;
    this.HEIGHT = Settings.game.HEIGHT;

    this.snake = new Snake(this);
    this.food = this.placeFood();
    this.setScore(0);

    this.bindKeyHandlers();
  }

  start(): void {
    // Begin running the 'step' logic 10 times per second.
    const interval: number = Math.floor(1000/Game.speed);
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
    clearInterval(this.intervalID);
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

  placeFood(): Cell {
    // Continually pick a random position for food until one is found that the
    // snake does not contain.
    do {
      let randX: number = _.random(this.WIDTH - 1);
      let randY: number = _.random(this.HEIGHT - 1);
      var pos: number[] = [randX, randY]
    } while (this.snake.contains(pos))

    return new Cell(pos, Game.FOOD_COLOR);
  }

  setScore(score: number): void {
    this.score = score;
    $("#score").html(score + '');
  }

  foodEaten(): void {
    // Place a new food, increment the score, and update it on the page.
    this.food = this.placeFood();
    const newScore: number = this.score + 1;
    this.setScore(newScore);
  }

  outOfBounds(pos) {
    const [x, y]: number[] = pos;
    return (x < 0) || (x >= this.WIDTH) || (y < 0) || (y >= this.HEIGHT);
  }
}

export = Game;
