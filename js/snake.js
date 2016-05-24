// @flow

import Settings from './settings';
import Cell from './cell';
import Queue from './queue';
import Game from './game';
import { isEqual } from 'lodash';

class Snake {

  dir: string;
  cells: Queue;
  game: Game;
  positionsSet: Object;

  static COLOR: string = Settings.snake.COLOR;
  static STARTING_POSITIONS: Array<[number, number]> = Settings.snake.STARTING_POSITIONS;
  static OPPOSITE_DIRECTIONS: Object = Settings.snake.OPPOSITE_DIRECTIONS;

  constructor(game: Game): void {
    this.dir = 'N'; // Direction, can be "N", "E", "S", "W"

    // The snake stores its cells in a queue. This allows the tail to be
    // shifted off and a new head to be pushed on in constant time.
    this.cells = new Queue();
    this.game = game;

    // Storing the positions of the snake as a Set allows you to determine
    // if the snake contains a given position in constant time.
    // TODO: Move this into the Queue structure instead of the Snake object
    this.positionsSet = {};

    for (let pos: [number, number] of Snake.STARTING_POSITIONS) {
      let cell: Cell = new Cell(pos, Snake.COLOR);
      this.cells.push(cell);
      this.positionsSet[pos] = true;
    }
  }

  move(): void {
    // The snake moves by shifting off its tail, and assigning this tail cell's
    // position to be where the new head should be. This means that no memory
    // is wasted, since cells are re-used.

    const game: Game = this.game;

    const head: Cell = this.head();
    // The position that the new head of the snake will be.
    const newHeadPos: [number, number] = head.movedPosition(this.dir);

    if (isEqual(newHeadPos, game.food.pos)) {
      // If the snake moves over food, create a new cell, rather than shifting the tail.
      this.cells.push(new Cell(newHeadPos, Snake.COLOR));
      this.game.foodEaten();
    } else if (game.outOfBounds(newHeadPos) || this.contains(newHeadPos)){
      // The game ends when the snake collides with the edge or itself.
      game.gameOver();
    } else {
      const oldTail: Cell = this.cells.shift();
      delete this.positionsSet[oldTail.pos];
      oldTail.setPos(newHeadPos);
      this.cells.push(oldTail);
    }
    this.positionsSet[newHeadPos] = true;
  }

  head(): Cell {
    // The head of the snake is always the last cell in the cells queue.
    return this.cells.lastItem();
  }

  turn(newDir: string): void {
    const game: Game = this.game;
    // The snake can only turn once per step
    if (!game.hasTurned) {
      // The snake cannot turn into the direction opposite of the one it is
      // currently moving in.
      if (newDir !== Snake.OPPOSITE_DIRECTIONS[this.dir]) {
        this.dir = newDir;
        game.hasTurned = true;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.cells.forEach(cell => cell.draw(ctx));
  }

  // Returns true if the snake contains a cell at pos.
  // Takes constant time thanks to the positions hash instance variable.
  contains(pos: [number, number]): boolean {
    return this.positionsSet[pos];
  }

}

export default Snake;
