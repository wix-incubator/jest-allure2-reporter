import type { MaybePromise, PropertyExtractor } from 'jest-allure2-reporter';

import { composeExtractors3 } from './composeExtractors3';

describe('extractors', () => {
  describe('composeExtractors3', () => {
    const context = { value: undefined as never };

    it('should compose extractors correctly in a complex scenario', async () => {
      const one: PropertyExtractor<{}, void, MaybePromise<number>> = () => 1;
      const two: PropertyExtractor<{}, MaybePromise<number>, number | string> = ({ value }) =>
        String(assertNumber(value) * 2);
      const three: PropertyExtractor<{}, number | string, MaybePromise<number>> = async ({
        value,
      }) => {
        return Number(assertString(value));
      };

      const $one = jest.fn(one);
      const $two = jest.fn(two);
      const $three = jest.fn(three);
      const combined = composeExtractors3($three, $two, $one);
      const result = await combined(context);

      expect(result).toBe(2);
      expect($one).toHaveBeenCalledTimes(1);
      expect($two).toHaveBeenCalledTimes(1);
      expect($three).toHaveBeenCalledTimes(1);
    });

    it('should allow undefined extractors in the middle', async () => {
      const one: PropertyExtractor<{}, void, number> = () => 2;
      const two: PropertyExtractor<{}, number, number> = ({ value }) => value - 3;
      const combined = composeExtractors3(two, undefined, one);

      expect(combined(context)).toBe(-1);
    });
  });
});

function assertNumber(actual: unknown): number {
  expect(typeof actual).toBe('number');
  return actual as number;
}

function assertString(actual: unknown): string {
  expect(typeof actual).toBe('string');
  return actual as string;
}
