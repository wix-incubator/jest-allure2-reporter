import type { PropertyExtractor } from 'jest-allure2-reporter';

import { composeExtractors, last, novalue } from '.';

describe('extractors', () => {
  describe('composeExtractors', () => {
    it('should compose extractors correctly in a complex scenario', async () => {
      const one: PropertyExtractor<number, never, {}, never> = () => 1;
      const two = composeExtractors(({ value }) => {
        assertEq(value, 1);
        return value * 2;
      }, one);
      const twoToo = composeExtractors(undefined, two);
      const twoAlso = composeExtractors(({ value }) => value, twoToo);
      const three = composeExtractors(async ({ value }) => {
        assertEq(value, 2);
        return value * 3;
      }, twoAlso);
      const threeAlso = composeExtractors(async ({ value }) => {
        expect(value).toBeInstanceOf(Promise);
        await expect(value).resolves.toBe(6);
        return value;
      }, three);
      const result = await threeAlso({ value: novalue() });
      expect(result).toBe(6);
    });
  });

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

function assertEq<T>(actual: unknown, expected: T): asserts actual is T {
  expect(actual).toBe(expected);
}
