import { beforeAll, beforeEach, describe, expect, it, test } from '@jest/globals';

import { FileNavigator } from './FileNavigator';

describe('FileNavigator', () => {
  let navigator: FileNavigator;

  beforeAll(() => {
    navigator = new FileNavigator('foo\nbar\nbaz');
  });

  describe('getContent', () => {
    it('should return the entire content', () => {
      expect(navigator.getContent()).toBe('foo\nbar\nbaz');
    });
  });

  describe('readLine', () => {
    it('should return the content of the current line', () => {
      navigator.jump(2);
      expect(navigator.readLine()).toBe('bar');
    });

    it('should return the content of the specified line', () => {
      expect(navigator.readLine(1)).toBe('foo');
      expect(navigator.readLine(3)).toBe('baz');
    });

    it('should return an empty string if the line number is out of bounds', () => {
      expect(navigator.readLine(4)).toBe('');
    });
  });

  describe('getPosition', () => {
    it('should return the current position', () => {
      navigator.jump(2);
      expect(navigator.getPosition()).toEqual([2, 1, 4]);
    });
  });

  describe('getLines', () => {
    it('should return an array of lines', () => {
      expect(navigator.getLines()).toEqual(['foo', 'bar', 'baz']);
    });
  });

  describe('getLineCount', () => {
    it('should return the total number of lines', () => {
      expect(navigator.getLineCount()).toBe(3);
    });
  });

  describe('getCurrentLine', () => {
    it('should return the current line number', () => {
      navigator.jump(2);
      expect(navigator.getCurrentLine()).toBe(2);
    });
  });

  describe('jump', () => {
    it('should jump to the first line', () => {
      expect(navigator.jump(1)).toBe(true);
      expect(navigator.readLine()).toBe('foo');
    });

    it('should jump to the second line', () => {
      expect(navigator.jump(2)).toBe(true);
      expect(navigator.readLine()).toBe('bar');
    });

    it('should jump to the third line', () => {
      expect(navigator.jump(3)).toBe(true);
      expect(navigator.readLine()).toBe('baz');
    });

    it('should not jump out of bounds', () => {
      expect(navigator.jump(4)).toBe(false);
      expect(navigator.readLine()).toBe('baz');
    });
  });

  describe('jumpToPosition', () => {
    it('should jump to the first line', () => {
      expect(navigator.jumpToPosition(0)).toBe(true);
      expect(navigator.readLine()).toBe('foo');
      expect(navigator.jumpToPosition(2)).toBe(true);
      expect(navigator.readLine()).toBe('foo');
      expect(navigator.jumpToPosition(1)).toBe(true);
      expect(navigator.readLine()).toBe('foo');
      expect(navigator.jumpToPosition(3)).toBe(true);
      expect(navigator.readLine()).toBe('foo');
    });

    it('should jump to the second line', () => {
      expect(navigator.jumpToPosition(4)).toBe(true);
      expect(navigator.readLine()).toBe('bar');
      expect(navigator.jumpToPosition(6)).toBe(true);
      expect(navigator.readLine()).toBe('bar');
      expect(navigator.jumpToPosition(5)).toBe(true);
      expect(navigator.readLine()).toBe('bar');
      expect(navigator.jumpToPosition(7)).toBe(true);
      expect(navigator.readLine()).toBe('bar');
    });

    it('should jump to the third line', () => {
      expect(navigator.jumpToPosition(8)).toBe(true);
      expect(navigator.readLine()).toBe('baz');
      expect(navigator.jumpToPosition(10)).toBe(true);
      expect(navigator.readLine()).toBe('baz');
      expect(navigator.jumpToPosition(9)).toBe(true);
      expect(navigator.readLine()).toBe('baz');
    });

    it('should handle out of bounds', () => {
      expect(navigator.jumpToPosition(11)).toBe(false);
      expect(navigator.readLine()).toBe('baz');
      expect(navigator.jumpToPosition(-1)).toBe(false);
      expect(navigator.readLine()).toBe('foo');
    });
  });

  describe('moveUp/moveDown', () => {
    beforeEach(() => {
      navigator.jump(1);
    });

    it('should move down and up', () => {
      expect(navigator.moveDown()).toBe(true);
      expect(navigator.readLine()).toBe('bar');
      expect(navigator.moveUp()).toBe(true);
      expect(navigator.readLine()).toBe('foo');
    });

    it('should not move up out of bounds', () => {
      expect(navigator.moveUp()).toBe(false);
      expect(navigator.readLine()).toBe('foo');
    });

    it('should not move down out of bounds', () => {
      expect(navigator.moveDown()).toBe(true);
      expect(navigator.moveDown()).toBe(true);
      expect(navigator.moveDown()).toBe(false);
      expect(navigator.readLine()).toBe('baz');
    });
  });

  test('stress test', () => {
    const bigString = 'abc\ndef\n'.repeat(500_000);
    const navigator = new FileNavigator(bigString);
    expect(navigator.jump(1e6)).toBe(true);
    expect(navigator.readLine()).toBe('def');
    expect(navigator.jump(3)).toBe(true);
    expect(navigator.readLine()).toBe('abc');
  }, 200);
});
