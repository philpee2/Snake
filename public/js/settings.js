(function(root) {
  // Settings stores game constants. This makes them easy to change in one place, 
  // and makes them accessible to all other objects. 

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
      HEAD_COLOR: "blue",
      STARTING_POSITIONS: [[10, 0], [10, 1], [10, 2]],
      
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