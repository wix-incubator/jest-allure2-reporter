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

  it('should return an empty object when all values are undefined', () => {
    const object = {
      a: undefined,
      b: undefined,
    };

    const result = compactObject(object);

    expect(result).toEqual({});
  });

  it('should preserve the original object type', () => {
    interface MyObject {
      a?: number;
      b?: string;
      c?: boolean;
    }

    const object: MyObject = {
      a: 1,
      b: undefined,
      c: true,
    };

    const result = compactObject(object);

    expect(result).toEqual({
      a: 1,
      c: true,
    });
    expect(result).toBeInstanceOf(Object);
  });
});
