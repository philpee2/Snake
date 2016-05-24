// @flow

import Settings from './settings';

// The Cell class represents an individual cell on the board. These cells can
// represent the segments of the snake, or a piece of food. Cells store their
// position and their color.
class Cell {

  pos: [number, number];
  color: string;

  static DIMENSION: number = Settings.cell.DIMENSION;
  static DIR_DELTAS: Object = Settings.cell.DIR_DELTAS;

  // Converts an in-game position to a pixel position on the canvas.
  static mapToScreen(pos: [number, number]): [number, number] {
    const [x, y]: [number, number] = pos;
    const pixelX: number = x * Cell.DIMENSION;
    const pixelY: number = Settings.game.DIM_Y - ((y + 1) * Cell.DIMENSION);
    return [pixelX, pixelY];
  }

  constructor(pos: [number, number], color: string): void {
    this.pos = pos;
    this.color = color;
  }

  // Returns the position the cell would be if it were to move in the given dir.
  // Does not actually move the cell.
  movedPosition(dir: string): [number, number] {
    const delta: [number, number] = Cell.DIR_DELTAS[dir];
    return [this.pos[0] + delta[0], this.pos[1] + delta[1]];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const pixelPos: [number, number] = Cell.mapToScreen(this.pos);
    const [x, y]: [number, number] = pixelPos;
    const dim: number = Cell.DIMENSION;
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, dim, dim);
  }

  setPos(newPos: [number, number]): void {
    this.pos = newPos;
  }
}

export default Cell;
