import { weakMemoize } from './weakMemoize';

describe('weakMemoize', () => {
  let random: (object?: object | null | undefined) => number;

  beforeEach(() => {
    random = weakMemoize(() => Math.random());
  });

  it('should memoize on undefined', () => {
    expect(random()).toBe(random(void 0));
  });

  it('should memoize on null', () => {
    expect(random(null)).toBe(random(null));
  });

  it('should not memoize on different objects', () => {
    expect(random({})).not.toBe(random({}));
  });

  it('should memoize on the same object', () => {
    const object = {};
    expect(random(object)).toBe(random(object));
  });
});
