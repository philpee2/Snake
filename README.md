## Snake

A browser version of Snake. Game logic is written in Javascript, while HTML canvas
draws the images. 

Use the arrow keys to move, and P to pause/unpause. 

### Rules

The aim of the game is to eat as much food as possible. Eating one piece of food earns 
one point. When the snake eats a piece of food, it grows in length, and another piece
of food is randomly placed on the screen. The game ends when the snake either 
collides with the edge of the screen, or with itself.  


### Future Todos

#### Fix fast turning bug

The game is rendered 10 times per second. It's possible to do a U-turn with the snake fast enough so that the reverses its direction before it is rendered. This means that the snake can turn in on itself, which results in losing the game. For example, if the snake is moving upwards, the player can press the left arrow key, and then the down arrow key before the snake renders in its new left direction.  This means the snake will attempt to move downwards, colliding with itself, and thus losing the game.   