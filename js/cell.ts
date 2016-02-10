import Settings = require('./settings');

// The Cell class represents an individual cell on the board. These cells can
// represent the segments of the snake, or a piece of food. Cells store their
// position and their color.
class Cell {

  pos : number[];
  private color : string;

  static DIMENSION: number = 25;
  static DIR_DELTAS: Object = Settings.cell.DIR_DELTAS;

  // Converts an in-game position to a pixel position on the canvas.
  static mapToScreen(pos: number[]): number[] {
    const [x, y]: number[] = pos;
    const pixelX: number = x * Cell.DIMENSION;
    const pixelY: number = Settings.game.DIM_Y - ((y + 1) * Cell.DIMENSION);
    return [pixelX, pixelY];
  }

  constructor(pos: number[], color: string) {
    this.pos = pos;
    this.color = color;
  }

  private move(dir: string): void {
    this.pos = this.movedPosition(dir)
  }

  // Returns the position the cell would be if it were to move in the given dir.
  // Does not actually move the cell.
  movedPosition(dir: string): number[] {
    const delta = Cell.DIR_DELTAS[dir];
    return [this.pos[0] + delta[0], this.pos[1] + delta[1]];
  }

  draw(ctx): void {
    const pixelPos = Cell.mapToScreen(this.pos);
    const [x, y] = pixelPos;
    const dim = Cell.DIMENSION;
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, dim, dim);
  }

  private getPos(): number[] {
    return this.pos;
  }

  setPos(newPos: number[]): void {
    this.pos = newPos;
  }
}

export = Cell;
