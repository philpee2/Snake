(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var Settings = SnakeGame.Settings;
  var Cell = SnakeGame.Cell;
  var Queue = SnakeGame.Queue; 
  
  
  
  var Snake = SnakeGame.Snake = function(game) {
    this.dir = "N"; // Direction, can be "N", "E", "S", "W"
    
    // The snake stores its cells in a queue. This allows the tail to be shifted off
    // and a new head to be pushed on in constant time. 
    this.cells = new Queue();
    this.game = game; 
    
    // Storing the positions of the snake as a hash allows you to determine
    // if the snake contains a given position in constant time.
    this.positionsHash = {}; 


    var snake = this; 
    var headPosition;
    Snake.STARTING_POSITIONS.forEach(function(pos) {
      var cell = new Cell(pos, Snake.COLOR);
      snake.cells.push(cell);
      snake.positionsHash[pos] = true;
    });
  };
  
  Snake.COLOR = Settings.snake.COLOR;
  Snake.STARTING_POSITIONS = Settings.snake.STARTING_POSITIONS;
  Snake.OPPOSITE_DIRECTIONS = Settings.snake.OPPOSITE_DIRECTIONS;

  
  Snake.prototype.move = function() {
    
    // The snake moves by shifting off its tail, and assigning this tail cell's position 
    // to be where the new head should be. It also keeps the positions hash updated. 
    // This means that each move step is constant time, and that no memory is wasted, 
    // since cells are re-used.

    var game = this.game; 
   
    var head = this.head();
    // The position that the new head of the snake will be. 
    var newHeadPos = head.movedPosition(this.dir); 

    
    // Convert positions to strings so that equality check works.
    if (newHeadPos.join() === game.food.pos.join()) {
      // If the snake moves over food, create a new cell, rather than shifting the tail.
      this.cells.push(new Cell(newHeadPos, Snake.COLOR));
      this.game.foodEaten();
    } else if (game.outOfBounds(newHeadPos) || this.contains(newHeadPos)){
      // The game ends when the snake collides with the edge or itself. 
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
    var game = this.game; 
    // The snake can only turn once per step
    if (!game.hasTurned)
      // The snake cannot turn into the direction opposite of the one it is
      // currently moving in. 
      if (newDir !== Snake.OPPOSITE_DIRECTIONS[this.dir]) {
        this.dir = newDir; 
        game.hasTurned = true;
      }
  };
  
  
  Snake.prototype.draw = function(ctx) {
    this.cells.forEach(function(cell) {
      cell.draw(ctx)
    })
  };
  
  // Returns true if the snake contains a cell at pos. 
  // Takes constant time thanks to the positions hash instance variable.
  Snake.prototype.contains = function(pos) {
    return this.positionsHash[pos];
  };
  
  
})(this);