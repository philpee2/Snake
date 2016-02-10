// The ListNode structure that makes up the Queue.
class ListNode {

  item : any;
  next : ListNode;

  constructor(item: any, next: ListNode) {
    this.item = item;
    this.next = next;
  }
}

// A simple queue data structure implemented as a singly linked list.
// Push, shift, firstItem, and lastItem are all O(1) operations.
class Queue {
  first : ListNode;
  last : ListNode;
  length : number;

  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  push(item: any): void {
    const newNode = new ListNode(item, null);
    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length++;
  }

  shift(): any {
    if (this.isEmpty()) {
      return;
    } else {
      const firstItem = this.firstItem();
      if (this.length === 1) {
        this.first = null;
        this.last = null;
      } else {
        this.first = this.first.next;
      }
      this.length--;
      return firstItem;
    }
  }

  forEach(fn): void {
    if (this.isEmpty()) {
      return;
    }

    var curr = this.first;
    while (curr.next !== null) {
      fn(curr.item);
      curr = curr.next;
    }
    fn(curr.item);
  }

  firstItem(): any {
    return this.first.item;
  }

  lastItem(): any {
    return this.last.item;
  }

}

export = Queue;
