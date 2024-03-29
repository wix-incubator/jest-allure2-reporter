import type {
  AllureTestCaseResult,
  PropertyExtractorContext,
  TestCaseExtractorContext,
} from 'jest-allure2-reporter';

import type { CompositeExtractor } from '../types';

import { testCase as testCaseCustomizer } from './testCase';

describe('testCase', () => {
  const createContext = (): PropertyExtractorContext<
    TestCaseExtractorContext,
    never
  > => ({
    value: undefined as never,
    result: {},
    aggregatedResult: {} as any,
    testRunMetadata: {} as any,
    testCase: {} as any,
    testCaseMetadata: {} as any,
    filePath: [],
    testFile: {} as any,
    testFileMetadata: {} as any,
    $: {} as any,
    globalConfig: {} as any,
    reporterOptions: {} as any,
  });

  const defaultTestCaseExtractor: CompositeExtractor<
    AllureTestCaseResult,
    TestCaseExtractorContext
  > = {
    attachments: ({ value }) => value,
    description: ({ value }) => value,
    descriptionHtml: ({ value }) => value,
    displayName: ({ value }) => value,
    fullName: ({ value }) => value,
    ignored: ({ value }) => value,
    historyId: ({ value }) => value,
    labels: ({ value }) => value,
    links: ({ value }) => value,
    parameters: ({ value }) => value,
    stage: ({ value }) => value,
    start: ({ value }) => value,
    status: ({ value }) => value,
    statusDetails: ({ value }) => value,
    stop: ({ value }) => value,
  };

  test.each`
    property             | defaultValue   | extractedValue
    ${'ignored'}         | ${false}       | ${false}
    ${'displayName'}     | ${''}          | ${'Custom Test Case'}
    ${'fullName'}        | ${''}          | ${'Custom Full Name'}
    ${'historyId'}       | ${''}          | ${'custom-history-id'}
    ${'start'}           | ${Number.NaN}  | ${1_234_567_890}
    ${'stop'}            | ${Number.NaN}  | ${1_234_567_899}
    ${'stage'}           | ${'scheduled'} | ${'running'}
    ${'status'}          | ${'unknown'}   | ${'passed'}
    ${'statusDetails'}   | ${{}}          | ${{ message: 'Test case passed' }}
    ${'labels'}          | ${[]}          | ${[{ name: 'label1', value: 'value1' }, { name: 'label2', value: 'value2' }]}
    ${'links'}           | ${[]}          | ${[{ url: 'https://example.com', type: 'issue' }]}
    ${'attachments'}     | ${[]}          | ${[{ name: 'attachment1' }, { name: 'attachment2' }]}
    ${'parameters'}      | ${[]}          | ${[{ name: 'param1', value: 'value1' }, { name: 'param2', value: 'value2' }]}
    ${'description'}     | ${''}          | ${'Custom description'}
    ${'descriptionHtml'} | ${''}          | ${'<p>Custom description</p>'}
  `(
    'should extract $property with default value $defaultValue and extracted value $extractedValue',
    async ({
      property,
      defaultValue,
      extractedValue,
    }: {
      property: keyof AllureTestCaseResult;
      defaultValue: any;
      extractedValue: any;
    }) => {
      const extractor = jest.fn().mockResolvedValue(extractedValue);
      const testCase = testCaseCustomizer({
        ...defaultTestCaseExtractor,
        [property]: extractor,
      });

      const result = await testCase(createContext());

      expect(extractor).toHaveBeenCalledWith(
        expect.objectContaining({
          value: defaultValue,
          result: expect.any(Object),
        }),
      );

      expect(result?.[property]).toEqual(extractedValue);
    },
  );

  it('should return undefined when ignored is true', async () => {
    const ignoredExtractor = jest.fn().mockResolvedValue(true);
    const testCase = testCaseCustomizer({
      ...defaultTestCaseExtractor,
      ignored: ignoredExtractor,
    });
    const context = createContext();
    const result = await testCase(context);

    expect(ignoredExtractor).toHaveBeenCalledWith(
      expect.objectContaining({ value: false, result: { ignored: true } }),
    );
    expect(result).toBeUndefined();
  });
});
