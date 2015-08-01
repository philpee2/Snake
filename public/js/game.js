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

    this.snake = new Snake(this);
    this.food = this.placeFood();
    this.score = 0;

    this.bindKeyHandlers();
  };

  Game.speed = Settings.game.speed;
  Game.DIM_X = Settings.game.DIM_X;
  Game.DIM_Y = Settings.game.DIM_Y;
  Game.FOOD_COLOR = Settings.game.FOOD_COLOR;

  Game.prototype.start = function() {
    // Begin running the 'step' logic 10 times per second.
    var that = this;
    var interval = Math.floor(1000/Game.speed);
    this.intervalID = window.setInterval(that.step.bind(that), interval);
  };

  Game.prototype.step = function() {
    this.hasTurned = false;
    this.move();
    this.draw();
  };

  Game.prototype.move = function() {
    this.snake.move();
  };

  Game.prototype.draw = function() {
    // Every frame, the canvas is cleared, then the snake and food are re-drawn.
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);
  };

  Game.prototype.stop = function(){
    clearInterval(this.intervalID);
  };

  Game.prototype.gameOver = function() {
    this.stop();

    var again = confirm("Game Over! Your score is " + this.score + ". Do you want to play again?");
    if (again) {
      this.restart();
    }
  };

  Game.prototype.restart = function() {
    this.snake = new Snake(this);
    this.food = this.placeFood();
    this.score = 0;
    $("#score").html(this.score);
    this.start();
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

  Game.prototype.placeFood = function() {
    // Continually pick a random position for food until one is found that the
    // snake does not contain.
    do {
      var randX = _.random(this.WIDTH - 1);
      var randY = _.random(this.HEIGHT - 1);
      var pos = [randX, randY]
    } while (this.snake.contains(pos))

    return new Cell(pos, Game.FOOD_COLOR);
  };

  Game.prototype.foodEaten = function() {
    // Place a new food, increment the score, and update it on the page.
    this.food = this.placeFood();
    this.score++;
    $("#score").html(this.score);
  };

  Game.prototype.outOfBounds = function(pos) {
    var x = pos[0];
    var y = pos[1];
    return (x < 0) || (x >= this.WIDTH) || (y < 0) || (y >= this.HEIGHT);
  };

})(this);
