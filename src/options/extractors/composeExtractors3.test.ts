import type { PropertyExtractor } from 'jest-allure2-reporter';

import { composeExtractors3 } from './composeExtractors3';
import { novalue } from './novalue';

describe('extractors', () => {
  describe('composeExtractors3', () => {
    const context = { value: novalue() };

    it('should compose extractors correctly in a complex scenario', async () => {
      const one: PropertyExtractor<number, never, {}, never> = () => 1;
      const two: PropertyExtractor<number, string, {}, number> = ({ value }) =>
        String(assertNumber(value) * 2);
      const three: PropertyExtractor<
        number,
        never,
        {},
        number | string
      > = async ({ value }) => {
        return Number(assertString(value));
      };

      const [$one, $two, $three] = [jest.fn(one), jest.fn(two), jest.fn(three)];
      const combined: PropertyExtractor<number, never, {}, never> =
        composeExtractors3($three, $two, $one);
      const result = await combined(context);

      expect(result).toBe(2);
      expect($one).toHaveBeenCalledTimes(1);
      expect($two).toHaveBeenCalledTimes(1);
      expect($three).toHaveBeenCalledTimes(1);
    });

    it('should allow undefined extractors in the middle', async () => {
      const one: PropertyExtractor<number, never, {}, never> = async () => 1;
      const two: PropertyExtractor<number, never, {}, number> = async () => 2;
      const combined = composeExtractors3(two, undefined, one);

      await expect(combined(context)).resolves.toBe(2);
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
