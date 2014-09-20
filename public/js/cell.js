// The Cell class represents an individual cell on the board. These cells represent 
// both the segments of the snake, and a piece of food. Cells store their position
// and their color. 

(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var Settings = SnakeGame.Settings; 
  
  var Cell = SnakeGame.Cell = function(pos, color) {
    this.pos = pos; 
    this.color = color; 
  };
  
  Cell.DIMENSION = 25;
  
  Cell.DIR_DELTAS = Settings.cell.DIR_DELTAS;

  Cell.prototype.move = function(dir) {
    this.pos = this.movedPosition(dir)
  };
  
  // Returns the position the cell would be if it were to move in the given dir.
  // Does not actually move the cell. 
  Cell.prototype.movedPosition = function(dir) {
    var delta = Cell.DIR_DELTAS[dir]; 
    return [this.pos[0] + delta[0] , this.pos[1] + delta[1]];
  };
    
  Cell.prototype.draw = function(ctx) {
    var pixelPos = Cell.mapToScreen(this.pos);
    var x = pixelPos[0];
    var y = pixelPos[1];
    var dim = Cell.DIMENSION
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, dim, dim);
  };
  
  // Converts an in-game position to a pixel position on the canvas.
  Cell.mapToScreen = function(pos) {
    var x = pos[0];
    var y = pos[1];
    var pixelX = x * Cell.DIMENSION; 
    var pixelY = Settings.game.DIM_Y - ((y + 1) * Cell.DIMENSION);
    return [pixelX, pixelY]
  };
  
  Cell.prototype.getPos = function() {
    return this.pos; 
  };
  
  Cell.prototype.setPos = function(newPos) {
    this.pos = newPos;
  };
  
  
})(this);