import { describe, expect, it } from '@jest/globals';

import { flatMapAsync } from './flatMapAsync';

describe('flatMapAsync', () => {
  it('should flatten and map arrays asynchronously', async () => {
    const input = [1, 2, 3];
    const callback = async (value: number) => [value, value * 2];

    const result = await flatMapAsync(input, callback);

    expect(result).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it('should handle empty arrays', async () => {
    const input: number[] = [];
    const callback = async (value: number) => [value];

    const result = await flatMapAsync(input, callback);

    expect(result).toEqual([]);
  });

  it('should handle callbacks returning empty arrays', async () => {
    const input = [1, 2, 3];
    const callback = async () => [];

    const result = await flatMapAsync(input, callback);

    expect(result).toEqual([]);
  });
});
