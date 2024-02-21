import { weakMemoize } from './weakMemoize';

describe('weakMemoize', () => {
  let random: (object?: object | null) => number;

  beforeEach(() => {
    random = weakMemoize(() => Math.random());
  });

  it('should not memoize on undefined', () => {
    expect(random()).not.toBe(random());
  });

  it('should not memoize on null', () => {
    expect(random(null)).not.toBe(random(null));
  });

  it('should not memoize on different objects', () => {
    expect(random({})).not.toBe(random({}));
  });

  it('should memoize on the same object', () => {
    const object = {};
    expect(random(object)).toBe(random(object));
  });
});
