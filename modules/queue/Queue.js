const Node = require('../node/Node');


class Queue {
  constructor() {
    // Set initial data.
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new Node(data);

    if (this.first === null) this.first = node;
    if (this.last) this.last.next = node;

    this.last = node;
  }

  dequeue() {
    if (this.first === null) return;

    // if (this.first.next === null) return;
    let node = this.first;
    this.first = this.first.next;
    if (node === this.last) this.last = null;

    return node.value;
  }

  show() {
    // Return the next item in the queue.
    if (this.first.value !== null) return this.first.value;
    return null;
  }

  all() {
    // Return all items in the queue.
    if (this.first === null) return false;
    let current = this.first;
    const tempArray = [];
    while (current) {
      tempArray.push(current.value);
      current = current.next
    }
    return tempArray;
  }
}

module.exports = Queue;
