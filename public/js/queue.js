// A simple queue data structure. Push and Shift are both constant time operations. 
// However, this implementation is quite memory inefficient, as the internal hash can grow 
// endlessly large. 

(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  
  var Queue = SnakeGame.Queue = function() {
    this.newest = 0; 
    this.oldest = 0; 
    this.store = {};
  };
  
  Queue.prototype.push = function(val) {
    this.store[this.newest] = val;
    this.newest++; 
  }; 
  
  Queue.prototype.shift = function() {
    var val = this.store[this.oldest];
    this.store[this.oldest] = false; 
    this.oldest++; 
  };

})(this);