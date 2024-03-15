import { LineNavigator } from './LineNavigator';

describe('LineNavigator', () => {
  let navigator: LineNavigator;

  beforeAll(() => {
    navigator = new LineNavigator('foo\nbar\nbaz');
  });

  describe('jump', () => {
    it('should jump to the first line', () => {
      expect(navigator.jump(1)).toBe(true);
      expect(navigator.read()).toBe('foo');
    });

    it('should jump to the second line', () => {
      expect(navigator.jump(2)).toBe(true);
      expect(navigator.read()).toBe('bar');
    });

    it('should jump to the third line', () => {
      expect(navigator.jump(3)).toBe(true);
      expect(navigator.read()).toBe('baz');
    });

    it('should not jump out of bounds', () => {
      expect(navigator.jump(4)).toBe(false);
      expect(navigator.read()).toBe('baz');
    });
  });

  describe('prev/next', () => {
    beforeEach(() => navigator.jump(1));

    it('should go down and up', () => {
      expect(navigator.next()).toBe(true);
      expect(navigator.read()).toBe('bar');
      expect(navigator.prev()).toBe(true);
      expect(navigator.read()).toBe('foo');
    });

    it('should not go up out of bounds', () => {
      expect(navigator.prev()).toBe(false);
      expect(navigator.read()).toBe('foo');
    });

    it('should not go down out of bounds', () => {
      expect(navigator.next()).toBe(true);
      expect(navigator.next()).toBe(true);
      expect(navigator.next()).toBe(false);
      expect(navigator.read()).toBe('baz');
    });
  });

  test('stress test', () => {
    // eslint-disable-next-line unicorn/new-for-builtins
    const bigString = 'abc\ndef\n'.repeat(500_000);
    const navigator = new LineNavigator(bigString);
    expect(navigator.jump(1e6)).toBe(true);
    expect(navigator.read()).toBe('def');
    expect(navigator.jump(3)).toBe(true);
    expect(navigator.read()).toBe('abc');
  }, 200);
});
