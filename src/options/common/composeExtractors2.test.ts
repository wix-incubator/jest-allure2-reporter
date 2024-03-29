import type { PropertyExtractor } from 'jest-allure2-reporter';

import { composeExtractors2 } from './composeExtractors2';

describe('extractors', () => {
  describe('composeExtractors', () => {
    it('should compose extractors correctly in a complex scenario', async () => {
      const one: PropertyExtractor<number, never, {}, never> = () => 1;
      const two = composeExtractors2(({ value }) => {
        assertEq(value, 1);
        return value * 2;
      }, one);
      const twoToo = composeExtractors2(undefined, two);
      const twoAlso = composeExtractors2(({ value }) => value, twoToo);
      const three = composeExtractors2(async ({ value }) => {
        assertEq(value, 2);
        return value * 3;
      }, twoAlso);
      const threeAlso = composeExtractors2(async ({ value }) => {
        expect(value).toBeInstanceOf(Promise);
        await expect(value).resolves.toBe(6);
        return value;
      }, three);
      const result = await threeAlso({ value: undefined as never });
      expect(result).toBe(6);
    });
  });
});

function assertEq<T>(actual: unknown, expected: T): asserts actual is T {
  expect(actual).toBe(expected);
}
