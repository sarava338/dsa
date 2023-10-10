import Node from "./Node";
import { IList } from "../Interface";

export default class DoublyLinkedList<T> implements IList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;

  constructor();
  constructor(value: T);
  constructor(value: T[]);
  constructor(...value: T[]);
  constructor(value?: T | T[]) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        this.head = null;
        this.tail = null;
        this.size = 0;
      } else {
        let head = new Node(value[0]);
        let current = head;
        for (let i = 1; i < value.length; i++) {
          let node = new Node(value[i]);
          current.setNext(node);
          node.setPrev(current);
          current = node;
        }
        this.head = head;
        this.tail = current;
        this.size = value.length;
      }
    } else if (value !== undefined) {
      const node = new Node(value);
      this.head = node;
      this.tail = node;
      this.size = 1;
    } else {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
  }

  append(value: T): void {
    const node = new Node(value);
    if (this.isEmpty()) this.head = this.tail = node;
    else {
      node.prev = this.tail;
      if (this.tail) this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  prepend(value: T): void {
    const node = new Node(value);
    if (this.isEmpty()) this.head = this.tail = node;
    else {
      node.next = this.head;
      if (this.head) this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  insertAfter(after: T, value: T): void {
    const node = new Node(value);

    const insertNodeAfter = (thisNode: Node<T>) => {
      thisNode.insertAfter(node, this);
      this.size++;
    };

    if (this.isEmpty()) {
      this.head = this.tail = node;
      this.size++;
      return;
    } else {
      let head = this.head;
      let tail = this.tail;
      while (head && tail) {
        if (head.value === after) return insertNodeAfter(head);
        else if (tail.value === after) return insertNodeAfter(tail);

        head = head.next;
        tail = tail.prev;
      }
    }
  }

  insertBefore(before: T, value: T): void {
    const node = new Node(value);

    const insertNodeBefore = (thisNode: Node<T>) => {
      thisNode.insertBefore(node, this);
      this.size++;
    };

    if (this.isEmpty()) {
      this.head = this.tail = node;
      this.size++;
      return;
    } else {
      let head = this.head;
      let tail = this.tail;
      while (head && tail) {
        if (head.value === before) return insertNodeBefore(head);
        else if (tail.value === before) return insertNodeBefore(tail);

        head = head.next;
        tail = tail.prev;
      }
    }
  }

  find(value: T): Node<T> | null {
    if (this.isEmpty()) return null;
    let head = this.head;
    let tail = this.tail;
    while (head && tail) {
      if (head.value === value) return head;
      else if (tail.value === value) return tail;

      head = head.next;
      tail = tail.prev;
    }
    return null;
  }

  delete(value: T): void {
    if (this.isEmpty()) return;

    const removeNode = (node: Node<T>): void => {
      node.removeNode(this);
      this.size--;
    };

    let head = this.head;
    let tail = this.tail;

    while (head && tail) {
      if (head.value === value) return removeNode(head);
      else if (tail.value === value) return removeNode(tail);
      head = head.next;
      tail = tail.prev;
    }
  }

  clear(): void {
    this.head = this.tail = null;
    this.size = 0;
  }

  isEmpty = (): Boolean => this.head === null && this.tail === null;
  getHead = (): T | null | undefined => this.head?.value;
  getTail = (): T | null | undefined => this.tail?.value;

  toArray(): T[] {
    const array: T[] = [];
    if (this.isEmpty()) return array;
    else {
      let current = this.head;
      while (current) {
        array.push(current.value!);
        current = current.next;
      }
    }
    return array;
  }

  reverse(): void {
    let current = this.head;
    let temp: Node<T> | null = null;

    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;

      current = current.prev;
    }
    if (temp) this.head = temp.prev;
  }

  print(): void {
    console.log({ list: this.toArray(), size: this.size });
  }
}
