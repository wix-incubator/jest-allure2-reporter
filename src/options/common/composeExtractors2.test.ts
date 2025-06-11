import { describe, expect, it, jest } from '@jest/globals';
import type { PropertyExtractor } from 'jest-allure2-reporter';

import { composeExtractors2 } from './composeExtractors2';

describe('extractors', () => {
  describe('composeExtractors', () => {
    it('should compose extractors correctly in a complex scenario', async () => {
      const one: PropertyExtractor<{}, void> = () => 1;
      const two = composeExtractors2(({ value }) => {
        return assertEq(value, 1) * 2;
      }, one);
      const twoToo = composeExtractors2(undefined, two);
      const twoAlso = composeExtractors2(({ value }) => value, twoToo);
      const three = composeExtractors2(async ({ value }) => {
        return assertEq(value, 2) * 3;
      }, twoAlso);
      const threeAlso = composeExtractors2(async ({ value }) => {
        expect(value).toBeInstanceOf(Promise);
        await expect(value).resolves.toBe(6);
        return value;
      }, three);
      const result = await threeAlso({ value: void 0 });
      expect(result).toBe(6);
    });

    it('should allow omitting value evaluation in previous extractors', () => {
      const one = composeExtractors2(
        void 0,
        jest.fn(() => 1),
      );
      const two = composeExtractors2(
        jest.fn(() => 2),
        one,
      );
      const result = two({ value: void 0 });
      expect(result).toBe(2);
      expect(one).not.toHaveBeenCalled();
    });
  });
});

function assertEq<T>(actual: unknown, expected: T): T {
  expect(actual).toBe(expected);
  return expected;
}
