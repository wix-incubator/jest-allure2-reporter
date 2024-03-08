export class LineNavigator {
  readonly #sourceCode: string;
  #cursor = 0;
  #line = 1;
  #lines: string[] | null = null;

  constructor(sourceCode: string) {
    this.#sourceCode = sourceCode;
  }

  get sourceCode() {
    return this.#sourceCode;
  }

  get lines() {
    if (this.#lines === null) {
      this.#lines = this.#sourceCode.split('\n');
    }

    return this.#lines;
  }

  jump(lineIndex: number): boolean {
    while (this.#line > lineIndex) {
      if (!this.prev()) return false;
    }

    while (this.#line < lineIndex) {
      if (!this.next()) return false;
    }

    return true;
  }

  next(): boolean {
    const next = this.#sourceCode.indexOf('\n', this.#cursor);
    if (next === -1) {
      return false;
    }

    this.#cursor = next + 1;
    this.#line++;
    return true;
  }

  prev(): boolean {
    if (this.#cursor === 0) return false;

    this.#cursor = this.#sourceCode.lastIndexOf('\n', this.#cursor - 2) + 1;
    this.#line--;
    return true;
  }

  read(): string {
    const nextIndex = this.#sourceCode.indexOf('\n', this.#cursor);
    if (nextIndex === -1) {
      return this.#sourceCode.slice(this.#cursor);
    }

    return this.#sourceCode.slice(this.#cursor, nextIndex);
  }
}
