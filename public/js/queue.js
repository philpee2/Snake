// A simple queue data structure implemented as a singly linked list. 
// Push, shift, first, and last are all O(1) operations. 


(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  
  // The ListNode structure that makes up the Queue. 
  var ListNode = function(item, next) {
    this.item = item; 
    this.next = next;
  };
  
  var Queue = SnakeGame.Queue = function() {
    this.first = null;
    this.last = null; 
    this.length = 0; 
  };
  
  Queue.prototype.isEmpty = function() {
    return this.length === 0; 
  }
  
  Queue.prototype.push = function(item) {
    var newNode = new ListNode(item, null);
    if (this.isEmpty()) {
      this.first = newNode; 
      this.last = newNode; 
    } else {
      this.last.next = newNode; 
      this.last = newNode; 
    }
    this.length++; 
  }; 
  
  Queue.prototype.shift = function() {
    if (this.isEmpty()) {
      return; 
    } else {
      var firstItem = this.first.item; 
      if (this.length === 1) {
        this.first = null; 
        this.last = null; 
      } else {
        this.first = this.first.next;  
      }
      this.length--;
      return firstItem;
    }  
  };
  
  // Applies fn to each item in the queue. 
  Queue.prototype.forEach = function(fn) {
    if (this.isEmpty()) {
      return;
    }
    
    var curr = this.first; 
    while (curr.next !== null) {
      fn(curr.item);
      curr = curr.next; 
    }
    fn(curr.item)
  };
  
  Queue.prototype.firstItem = function() {
    return this.first.item;
  };
  
  Queue.prototype.lastItem = function() {
    return this.last.item;
  };
  

  

})(this);