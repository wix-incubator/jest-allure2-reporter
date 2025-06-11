import { describe, expect, it } from '@jest/globals';

import { compactObject } from './compactObject';

describe('compactObject', () => {
  it('should remove undefined values from the object', () => {
    const object = {
      a: 1,
      b: undefined,
      c: 'hello',
      d: null,
      e: {},
      f: [],
      g: undefined,
    };

    const result = compactObject(object);

    expect(result).toEqual({
      a: 1,
      c: 'hello',
      d: null,
      e: {},
      f: [],
    });
  });

  it('should remove also null values when excludeNulls is true', () => {
    const object = {
      a: 1,
      b: undefined,
      c: 'hello',
      d: null,
      e: {},
      f: [],
      g: undefined,
    };

    const result = compactObject(object, true);

    expect(result).toEqual({
      a: 1,
      c: 'hello',
      e: {},
      f: [],
    });
  });

  it('should return an empty object when all values are undefined', () => {
    const object = {
      a: undefined,
      b: undefined,
    };

    const result = compactObject(object);

    expect(result).toEqual({});
  });

  it('should preserve the original object type', () => {
    const record: Record<string, string | undefined> = {
      a: 'hello',
      b: undefined,
    };

    const compacted: Record<string, string> = compactObject(record);
    expect(compacted).toEqual({
      a: 'hello',
    });
  });
});
