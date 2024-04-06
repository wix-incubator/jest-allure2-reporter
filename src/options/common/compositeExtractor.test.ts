import type { PromisedProperties, PropertyExtractorContext } from 'jest-allure2-reporter';

import { thruMaybePromise } from '../../utils';

import { compositeExtractor } from './compositeExtractor';
import { composeExtractors2 } from './composeExtractors2';

interface TestShape {
  number: number;
  string: string;
  boolean: boolean;
  null: null;
  undefined: undefined;
  extra: RegExp;
}

type TestContext = PropertyExtractorContext<{}, PromisedProperties<TestShape>>;

describe('compositeExtractor', () => {
  const invert = (value: boolean) => !value;
  const nullify = (value: any): null => value && null;
  const worldify = (value: string) => value + ' world';
  const plusTwo = (value: number) => value + 2;

  const extractor = compositeExtractor<TestContext, TestShape>({
    number: ({ value }) => thruMaybePromise(value, plusTwo),
    string: ({ value }) => thruMaybePromise(value, worldify),
    boolean: ({ value }) => thruMaybePromise(value, invert),
    null: ({ value }) => thruMaybePromise(value, nullify),
    undefined: ({ value }) => value,
    extra: ({ value }) => value,
  });

  it('should return an object with the extracted properties (sync)', () => {
    expect(
      extractor({
        value: {
          number: 40,
          string: 'hello',
          boolean: false,
          null: null,
          undefined: undefined,
          extra: /test/,
        },
      }),
    ).toEqual({
      number: 42,
      string: 'hello world',
      boolean: true,
      null: null,
      undefined: undefined,
      extra: /test/,
    });
  });

  it('should return an object with the extracted properties (async)', async () => {
    const result = extractor({
      value: {
        number: Promise.resolve(40),
        string: Promise.resolve('hello'),
        boolean: Promise.resolve(true),
        null: Promise.resolve(null),
        undefined: Promise.resolve(void 0),
        extra: Promise.resolve(/test/),
      },
    });

    await expect(result.number).resolves.toBe(42);
    await expect(result.string).resolves.toBe('hello world');
    await expect(result.boolean).resolves.toBe(false);
    await expect(result.null).resolves.toBe(null);
    await expect(result.undefined).resolves.toBe(undefined);
    await expect(result.extra).resolves.toEqual(/test/);
  });

  it('should compose composite extractors correctly', async () => {
    const double = composeExtractors2(extractor, extractor);
    expect(
      double({
        value: {
          number: 40,
          string: 'hello',
          boolean: false,
          null: null,
          undefined: undefined,
          extra: /test/,
        },
      }),
    ).toEqual({
      number: 44,
      string: 'hello world world',
      boolean: false,
      null: null,
      undefined: undefined,
      extra: /test/,
    });
  });
});
