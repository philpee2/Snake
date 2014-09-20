(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var Settings = SnakeGame.Settings = {
    game: {
      speed: 10,
      DIM_X: 500, 
      DIM_Y: 500, 
      WIDTH: 20,
      HEIGHT: 20,
      FOOD_COLOR: "green"
    }, 
    
    snake: {
      COLOR: "red",
      STARTING_POSITIONS: [[10, 8], [10, 9], [10, 10]],
      
      OPPOSITE_DIRECTIONS: {
        N: "S",
        S: "N", 
        E: "W", 
        W: "E"
      }
    },
    
    cell: {
      DIMENSION: 25,
      DIR_DELTAS: {
          N: [0, 1],
          E: [1, 0],
          S: [0, -1], 
          W: [-1, 0]
      }
    }
  };
  
  
})(this);