import { describe, expect, it } from '@jest/globals';

import { last } from './last';

describe('extractors', () => {
  describe('last', () => {
    it('should return the last element of an array', async () => {
      const result = await last({ value: [1, 2, 3] });
      expect(result).toBe(3);
    });

    it('should return the last element of a promised array', async () => {
      const result = await last({ value: Promise.resolve([3, 2, 1]) });
      expect(result).toBe(1);
    });

    it('should return undefined for a non-existent value', async () => {
      const result = await last({ value: undefined });
      expect(result).toBe(undefined);
    });
  });
});
