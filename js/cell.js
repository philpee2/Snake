const Settings = require('./settings');

// The Cell class represents an individual cell on the board. These cells can
// represent the segments of the snake, or a piece of food. Cells store their
// position and their color.
class Cell {

  static get DIMENSION() {
    return 25;
  }

  static get DIR_DELTAS() {
    return Settings.cell.DIR_DELTAS;
  }

  // Converts an in-game position to a pixel position on the canvas.
  static mapToScreen(pos) {
    const [x, y] = pos;
    const pixelX = x * Cell.DIMENSION;
    const pixelY = Settings.game.DIM_Y - ((y + 1) * Cell.DIMENSION);
    return [pixelX, pixelY]
  }

  constructor(pos, color) {
    this.pos = pos;
    this.color = color;
  }

  move(dir) {
    this.pos = this.movedPosition(dir)
  }

  // Returns the position the cell would be if it were to move in the given dir.
  // Does not actually move the cell.
  movedPosition(dir) {
    const delta = Cell.DIR_DELTAS[dir];
    return [this.pos[0] + delta[0], this.pos[1] + delta[1]];
  }

  draw(ctx) {
    const pixelPos = Cell.mapToScreen(this.pos);
    const [x, y] = pixelPos;
    const dim = Cell.DIMENSION;
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, dim, dim);
  }

  getPos() {
    return this.pos;
  }

  setPos(newPos) {
    this.pos = newPos;
  }
}

module.exports = Cell;