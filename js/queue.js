// @flow

// The ListNode structure that makes up the Queue.
class ListNode {

  item: any;
  next: ?ListNode;

  constructor(item : any, next : ?ListNode) {
    this.item = item;
    this.next = next;
  }
}

// A simple queue data structure implemented as a singly linked list.
// Push, shift, firstItem, and lastItem are all O(1) operations.
class Queue {

  first: ?ListNode;
  last: ?ListNode;
  length: number;

  constructor() {
    this.length = 0;
    this.first = null;
    this.last = null;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  push(item: any): void {
    const newNode: ListNode = new ListNode(item, null);
    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else if (this.last != null && this.last.next != null) {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length++;
  }

  shift(): any {
    if (this.isEmpty()) {
      return;
    } else {
      const firstItem : any = this.firstItem();
      if (this.length === 1) {
        this.first = null;
        this.last = null;
      } else if (this.first != null && this.first.next != null) {
        this.first = this.first.next;
      }
      this.length--;
      return firstItem;
    }
  }

  forEach(fn: Function): void {
    if (this.isEmpty() || this.first == null || this.last == null) {
      return;
    }

    let curr: ListNode = this.first;
    while (curr.next != null) {
      fn(curr.item);
      if (curr.next == null) {
        break;
      }
    }

    if (curr.next != null) {
      fn(curr.next.item);
    }
  }

  firstItem(): any {
    if (this.first == null) {
      return null;
    } else {
      return this.first.item;
    }
  }

  lastItem(): any {
    if (this.last == null) {
      return null;
    } else {
      return this.last.item;
    }
  }

}

export default Queue;
