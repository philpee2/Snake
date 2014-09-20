(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var Settings = SnakeGame.Settings;
  var Cell = SnakeGame.Cell;
  
  
  
  var Snake = SnakeGame.Snake = function() {
    this.dir = "N"; // Direction, can be "N", "E", "S", "W"
    this.cells = Snake.STARTING_POSITIONS.map(function(pos) {
      return new Cell(pos, Snake.COLOR);
    })
  };
  
  Snake.COLOR = Settings.snake.COLOR;
  Snake.STARTING_POSITIONS = Settings.snake.STARTING_POSITIONS;
  
  Snake.prototype.move = function() {
    
    // The snake moves by shifting off its tail, and assigning this tail cell's position 
    // to be where the head should be. 
    var oldTail = this.cells.shift();
    var head = this.cells[this.cells.length - 1];
    var newHeadPos = head.movedPosition(this.dir);
    oldTail.setPos(newHeadPos);
    this.cells.push(oldTail);

  };
  
  Snake.prototype.turn = function(newDir) {
    this.dir = newDir; 
  };
  
  Snake.prototype.draw = function(ctx) {
    this.cells.forEach(function(cell) {
      cell.draw(ctx)
    })
  }
  
  
})(this);