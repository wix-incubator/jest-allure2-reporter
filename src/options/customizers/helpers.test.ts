import type {
  GlobalExtractorContext,
  ExtractorContext,
  Helpers,
} from 'jest-allure2-reporter';

import { helpersCustomizer } from './helpers';

describe('helpersCustomizer', () => {
  it('should return undefined when the input is undefined or null', () => {
    expect(helpersCustomizer(void 0)).toBeUndefined();
    expect(helpersCustomizer(null as any)).toBeUndefined();
  });

  it('should return the input value if it is an extractor function', () => {
    const extractorFunction = jest.fn();
    expect(helpersCustomizer(extractorFunction)).toBe(extractorFunction);
  });

  it('should return undefined if the input is an empty object', () => {
    expect(helpersCustomizer({})).toBeUndefined();
  });

  it('should return an extractor function that merges the input shape with the existing value', async () => {
    const defaultHelpers: Partial<Helpers> = {
      getExecutorInfo: jest.fn(),
      extractSourceCode: jest.fn(),
    };

    const customHelpers: Partial<Helpers> = {
      extractSourceCode: undefined,
      stripAnsi: jest.fn(),
    };

    const context: ExtractorContext<Helpers> = {
      value: defaultHelpers as Helpers,
    };

    const extractor = helpersCustomizer(customHelpers)!;

    const result = await extractor(
      context as unknown as GlobalExtractorContext<Helpers>,
    );

    expect(result).toEqual(customHelpers);
  });
});
