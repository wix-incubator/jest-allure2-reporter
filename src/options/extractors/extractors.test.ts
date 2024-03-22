import { composeExtractors } from './composeExtractors';

describe('extractors', () => {
  describe('composeExtractors', () => {
    it('should compose extractors correctly in a complex scenario', async () => {
      const one = () => 1;
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
      const result = await threeAlso({ value: void 0 });
      expect(result).toBe(6);
    });
  });
});

function assertEq<T>(actual: unknown, expected: T): asserts actual is T {
  expect(actual).toBe(expected);
}
