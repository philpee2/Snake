(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var Settings = SnakeGame.Settings;
  var Snake = SnakeGame.Snake
  var Cell = SnakeGame.Cell; 

  var Game = SnakeGame.Game = function(ctx) {
    this.ctx = ctx;
    
    // Constants representing the number of rows and columns 
    this.WIDTH = Settings.game.WIDTH;
    this.HEIGHT = Settings.game.HEIGHT;
    
    // The grid is a 2D array containing either nulls, or cell 
    // objects. It represents
    // the game's grid of cells. 
    // this.grid = createEmptyGrid(this.WIDTH, this.HEIGHT);
    
    // This is the block that the player can currently control. 
    this.snake = new Snake();
    
    // The player's current score in the game. 
    this.score = 0;
    
    this.bindKeyHandlers();
  };
  
  Game.FPS = 5;
  Game.DIM_X = 500;
  Game.DIM_Y = 500;

  
  Game.prototype.getGridItem = function(pos) {
    return this.grid[pos[1]][pos[0]];
  };
  
  Game.prototype.setGridItem = function(pos, item) {
    this.grid[pos[1]][pos[0]] = item;
  };
  
  Game.prototype.isEmpty = function(pos) {
    return this.getGridItem(pos) === null;
  };
  
  Game.prototype.start = function() {
    // Begin running the 'step' logic 30 times per second. 
    
    var that = this;
    var interval = Math.floor(1000/Game.FPS);
    this.intervalID = window.setInterval(that.step.bind(that), interval);
  };
  
  Game.prototype.step = function() {
    this.move();
    this.draw();
  };
  
  Game.prototype.move = function() {
    this.snake.move();
  };
  
  Game.prototype.draw = function() {
    // Every frame, the canvas is cleared and both the block and grid are redrawn.
    
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.snake.draw(this.ctx);
    
  };
  
  
  
  Game.prototype.stop = function(){
    clearInterval(this.intervalID);
  };
  
  Game.prototype.gameOver = function() {
    this.stop();
    alert("Game Over! Your score is " + this.score);
  };
  
  Game.prototype.bindKeyHandlers = function() {
    var game = this; 
    key("up", function() {
      game.snake.turn("N");
    });
    
    key("down", function() {
      game.snake.turn("S");
    });
    
    key("left", function() {
      game.snake.turn("W");
    });
    
    key("right", function() {
      game.snake.turn("E");
    });
    
		key("P", function(){
			game.togglePause();
		});
  };
  
	Game.prototype.togglePause = function(){
		if (this.paused){
      // Unpause
			this.start();
			this.paused = false; 
		} else {
      // Pause
			this.stop(); 
			this.paused = true; 
		}
	};
  
  Game.prototype.validPosition = function(pos) {
    var x = pos[0];
    var y = pos[1];
    return (x >= 0) && (x < this.WIDTH) && (y >= 0) && (y < this.HEIGHT) 
      && (this.isEmpty(pos));
  }
  
  var createEmptyGrid = function(width, height) {
    var grid = new Array(height);
    for (var i = 0; i < grid.length; i++) {
      var row = new Array(width);
      for (var j = 0; j < row.length; j++) {
        row[j] = null;
      }
      grid[i] = row; 
    }
    
    return grid;
  };
})(this);