import { describe, expect, it, jest } from '@jest/globals';
import type { MaybePromise, PropertyExtractorContext } from 'jest-allure2-reporter';

import { mergerExtractor } from './mergerExtractor';

type TestValue = Record<string, number>;
type TestContext = PropertyExtractorContext<{}, MaybePromise<TestValue>>;

describe('extractors', () => {
  describe('mergerExtractor', () => {
    it('should return undefined when the extractor is undefined', () => {
      const result = mergerExtractor(void 0);
      expect(result).toBeUndefined();
    });

    it('should return undefined when the extractor is null', () => {
      const result = mergerExtractor(null);
      expect(result).toBeUndefined();
    });

    it('should replace context value with the extracted value (sync)', async () => {
      const extractor = jest.fn<any>().mockReturnValue({ c: 3, d: 4 });
      const context = { value: { a: 1, b: 2 } };

      const result = mergerExtractor<TestContext, TestValue>(extractor)!;
      const value = result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toEqual({ c: 3, d: 4 });
    });

    it('should replace context value with the extracted value (async)', async () => {
      const extractor = jest.fn<any>().mockResolvedValue({ c: 3, d: 4 });
      const context = { value: Promise.resolve({ a: 1, b: 2 }) };

      const result = mergerExtractor<TestContext, TestValue>(extractor)!;
      const value = await result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toEqual({ c: 3, d: 4 });
    });

    it('should merge the given values with the context value (sync)', async () => {
      const value: TestValue = { c: 3, d: 4 };
      const context: TestContext = { value: { a: 1, b: 2 } };

      const result = mergerExtractor(value)!;
      const extractedValue = result(context);

      expect(extractedValue).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    it('should merge the given values with the context value (async)', async () => {
      const value: TestValue = { c: 3, d: 4 };
      const context: TestContext = { value: Promise.resolve({ a: 1, b: 2 }) };

      const result = mergerExtractor(value)!;
      const extractedValue = await result(context);

      expect(extractedValue).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });
  });
});
