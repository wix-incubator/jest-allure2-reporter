import { describe, expect, it } from '@jest/globals';

import { stringifyValues } from './stringifyValues';

describe('stringifyValues', () => {
  it('should convert all values to strings', () => {
    const result = stringifyValues({
      name: 'John Doe',
      age: 42,
      isActive: true,
      score: 3.14,
    });

    expect(result).toEqual({
      name: 'John Doe',
      age: '42',
      isActive: 'true',
      score: '3.14',
    });
  });

  it('should compact an object with nullish values', () => {
    const result = stringifyValues({
      null: null,
      undefined: undefined,
    });

    expect(result).toEqual({});
  });
});
