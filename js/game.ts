import Settings = require('./settings');
import Snake = require('./snake');
import Cell = require('./cell');
import _ = require('lodash');
import key = require('keymaster');
import $ = require('jquery');

class Game {
  private ctx : any;
  private WIDTH : number;
  private HEIGHT : number;
  food : Cell;
  private intervalID : number;
  hasTurned : boolean;
  private snake : Snake;
  private paused : boolean;
  private score : number;

  static speed: number = Settings.game.speed;
  static DIM_X: number = Settings.game.DIM_X
  static DIM_Y: number = Settings.game.DIM_Y
  static FOOD_COLOR: string = Settings.game.FOOD_COLOR;

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

  private step(): void {
    this.hasTurned = false;
    this.move();
    this.draw();
  }

  private move(): void {
    this.snake.move();
  }

  private draw(): void {
    // Every frame, the canvas is cleared, then the snake and food are re-drawn.
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);
  }

  private stop(): void {
    clearInterval(this.intervalID);
  }

  gameOver(): void {
    this.stop();

    const again: boolean = confirm(`Game Over! Your score is ${this.score}. Do you want to play again?`);
    if (again) {
      this.restart();
    }
  }

  private restart(): void {
    this.snake = new Snake(this);
    this.food = this.placeFood();
    this.setScore(0);
    this.start();
  }

  private bindKeyHandlers(): void {
    key("up", () => this.snake.turn("N"));
    key("down", () => this.snake.turn("S"));
    key("left", () => this.snake.turn("W"));
    key("right", () => this.snake.turn("E"));

    key("P", () => this.togglePause());
  }

  private togglePause(): void {
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

  private placeFood(): Cell {
    // Continually pick a random position for food until one is found that the
    // snake does not contain.
    do {
      let randX: number = _.random(this.WIDTH - 1);
      let randY: number = _.random(this.HEIGHT - 1);
      var pos: number[] = [randX, randY]
    } while (this.snake.contains(pos))

    return new Cell(pos, Game.FOOD_COLOR);
  }

  private setScore(score: number): void {
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
