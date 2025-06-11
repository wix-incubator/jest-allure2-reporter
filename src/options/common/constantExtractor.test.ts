import { describe, expect, it, jest } from '@jest/globals';

import { constantExtractor } from './constantExtractor';

describe('extractors', () => {
  describe('constantExtractor', () => {
    const context = {
      get value(): Promise<never> {
        throw new Error('Should not be called');
      },
    };

    it('should return the extractor function when the input is an extractor', () => {
      const extractor = jest.fn<any>().mockReturnValue(42);
      const result = constantExtractor(extractor);

      expect(result).toBe(extractor);
    });

    it('should return a constant extractor function when the input is a non-extractor value', () => {
      const value = { foo: 'bar' };
      const result = constantExtractor(value)!;

      expect(result).toBeInstanceOf(Function);

      const extractedValue = result(context);
      expect(extractedValue).toBe(value);
    });

    it('should return a constant extractor function that returns the original promise', async () => {
      const promise = Promise.resolve(42);
      const result = constantExtractor(promise)!;

      expect(result).toBeInstanceOf(Function);

      const extractedValue = result(context);

      expect(extractedValue).toBe(promise);
      await expect(extractedValue).resolves.toBe(42);
    });
  });
});
