import type { PromisedProperties, PropertyExtractorContext } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { compositeExtractor } from './compositeExtractor';

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
  const extractor = compositeExtractor<TestContext, TestShape>({
    number: ({ value }) => (isPromiseLike(value) ? value.then((v) => v + 2) : value + 2),
    string: ({ value }) =>
      isPromiseLike(value) ? value.then((v) => v + ' world') : value + ' world',
    boolean: ({ value }) => (isPromiseLike(value) ? value.then((v) => !v) : !value),
    null: ({ value }) => (isPromiseLike(value) ? value.then((v) => v && null) : value && null),
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
});
