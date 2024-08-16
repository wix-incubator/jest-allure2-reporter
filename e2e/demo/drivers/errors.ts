import {JestAssertionError} from "expect";

export class AssertionError extends JestAssertionError {
  constructor(message: string) {
    super(message);
    this.matcherResult = {
      pass: false,
      message,
    };
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}
