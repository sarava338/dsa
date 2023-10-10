import Queue from ".";

export interface IQueue<T> {
  elements: T[];
  size: number;

  enqueue(element: T): void;
  dequeue(): T | undefined;
  enqueueMany(elements: T[]): void;
  dequeueMany(count: number): T[];
  peek(): T | undefined;
  isEmpty(): Boolean;
  isFull(): Boolean;
  getFront(): T | undefined;
  getBack(): T | undefined;
  clear(): void;
  concat(queue: Queue<T>): void;
  clone(): Queue<T>;
  toArray(): T[];
  toString(): string;
  print(): void;
  forEach(callback: (element: T) => void): void;
  filter(callback: (element: T) => Boolean): Queue<T>;
  // map(callback: (element: T) => U): Queue<T>;
  // reduce(callback: (accumulator: T) => void);
}