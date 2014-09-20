(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var Settings = SnakeGame.Settings;
  var Cell = SnakeGame.Cell;
  var Queue = SnakeGame.Queue; 
  
  
  
  var Snake = SnakeGame.Snake = function(game) {
    this.dir = "N"; // Direction, can be "N", "E", "S", "W"
    
    this.cells = new Queue();
    this.game = game; 
    
    // Storing the positions as a hash allows you to quickly determine if the snake
    // contains a given position.
    this.positionsHash = {}; 

    var snake = this; 
    Snake.STARTING_POSITIONS.forEach(function(pos) {
      var cell = new Cell(pos, Snake.COLOR);
      snake.cells.push(cell);
      snake.positionsHash[pos] = true;
    })
  };
  
  Snake.COLOR = Settings.snake.COLOR;
  Snake.STARTING_POSITIONS = Settings.snake.STARTING_POSITIONS;
  
  
  // TODO: REFACTOR THIS AND HANDLE FAILURE CASES 
  Snake.prototype.move = function() {
    
    // The snake moves by shifting off its tail, and assigning this tail cell's position 
    // to be where the new head should be. It also keeps the positions hash updated.  
   
    var head = this.head();
    var newHeadPos = head.movedPosition(this.dir);
    var game = this.game; 
    
    // Convert positions to strings so that equality check works.
    if (newHeadPos.join() === game.food.pos.join()) {
      this.cells.push(new Cell(newHeadPos, Snake.COLOR));
      this.game.foodEaten();
    } else if (game.outOfBounds(newHeadPos) || this.contains(newHeadPos)){
      game.gameOver();
    } else {
      var oldTail = this.cells.shift();
      delete this.positionsHash[oldTail.pos];
      oldTail.setPos(newHeadPos);
      this.cells.push(oldTail);
    }
    this.positionsHash[newHeadPos] = true;
    
  };
  
  Snake.prototype.head = function() {
    // The head of the snake is always the last cell in the cells queue.
    return this.cells.lastItem();
  }
  
  Snake.prototype.turn = function(newDir) {
    this.dir = newDir; 
  };
  
  Snake.prototype.draw = function(ctx) {
    this.cells.forEach(function(cell) {
      cell.draw(ctx)
    })
  };
  
  // Returns true if the snake contains a cell at pos. 
  // O(1) thanks to positions hash instance variable.
  Snake.prototype.contains = function(pos) {
    return this.positionsHash[pos];
  }
  
  
})(this);