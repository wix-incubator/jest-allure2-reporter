import type {
  AllureTestStepResult,
  PropertyExtractorContext,
  TestStepExtractorContext,
} from 'jest-allure2-reporter';

import type { TestStepCompositeExtractor } from '../types';

import { testStepCustomizer } from './testStep';

describe('testStepCustomizer', () => {
  const createContext = (): PropertyExtractorContext<
    TestStepExtractorContext,
    void
  > => ({
    value: void 0,
    result: {},
    aggregatedResult: {} as any,
    testRunMetadata: {} as any,
    testStepMetadata: { hookType: 'beforeEach' } as any,
    testCase: {} as any,
    testCaseMetadata: {} as any,
    filePath: [],
    testFile: {} as any,
    testFileMetadata: {} as any,
    $: {} as any,
    globalConfig: {} as any,
    reporterOptions: {} as any,
  });

  const defaultCompositeExtractor: TestStepCompositeExtractor<TestStepExtractorContext> =
    {
      attachments: ({ value }) => value,
      displayName: ({ value }) => value,
      ignored: ({ value }) => value,
      parameters: ({ value }) => value,
      stage: ({ value }) => {
        return value;
      },
      start: ({ value }) => value,
      status: ({ value }) => value,
      statusDetails: ({ value }) => value,
      stop: ({ value }) => value,
    };

  test.each`
    property           | defaultValue   | extractedValue
    ${'ignored'}       | ${false}       | ${false}
    ${'displayName'}   | ${''}          | ${'Custom Step'}
    ${'start'}         | ${Number.NaN}  | ${1_234_567_890}
    ${'stop'}          | ${Number.NaN}  | ${1_234_567_899}
    ${'stage'}         | ${'scheduled'} | ${'running'}
    ${'status'}        | ${'unknown'}   | ${'passed'}
    ${'statusDetails'} | ${{}}          | ${{ message: 'Step passed' }}
    ${'attachments'}   | ${[]}          | ${[{ name: 'attachment1' }, { name: 'attachment2' }]}
    ${'parameters'}    | ${[]}          | ${[{ name: 'param1', value: 'value1' }, { name: 'param2', value: 'value2' }]}
  `(
    'should extract $property with default value $defaultValue and extracted value $extractedValue',
    async ({
      property,
      defaultValue,
      extractedValue,
    }: {
      property: keyof AllureTestStepResult;
      defaultValue: any;
      extractedValue: any;
    }) => {
      const extractor = jest.fn().mockResolvedValue(extractedValue);
      const testStep = testStepCustomizer({
        ...defaultCompositeExtractor,
        [property]: extractor,
      });

      const result = await testStep(createContext());

      expect(extractor).toHaveBeenCalledWith(
        expect.objectContaining({
          value: defaultValue,
          result: expect.any(Object),
        }),
      );

      expect(result?.[property]).toEqual(extractedValue);
    },
  );

  it('should return undefined when hidden is true', async () => {
    const hiddenExtractor = jest.fn().mockResolvedValue(true);
    const testStep = testStepCustomizer({
      ...defaultCompositeExtractor,
      hidden: hiddenExtractor,
    });
    const context = createContext();
    const result = await testStep(context);

    expect(hiddenExtractor).toHaveBeenCalledWith(
      expect.objectContaining({
        value: false,
        result: { hookType: 'beforeEach', hidden: true },
      }),
    );
    expect(result).toBeUndefined();
  });

  it('should extract hookType directly from testStepMetadata', async () => {
    const testStep = testStepCustomizer(defaultCompositeExtractor);
    const context = createContext();
    const result = await testStep(context);
    expect(result?.hookType).toBe('beforeEach');
  });

  it('should extract nested steps', async () => {
    let counter = 0;
    const testStep = testStepCustomizer({
      ...defaultCompositeExtractor,
      displayName: () => `Step ${++counter}`,
    });

    const context = createContext();
    context.testStepMetadata.steps = [{}, {}];

    const result = await testStep(context);

    expect(result?.displayName).toBe('Step 1');
    expect(result?.steps).toHaveLength(2);
    expect(result?.steps[0].displayName).toBe('Step 2');
    expect(result?.steps[1].displayName).toBe('Step 3');
  });
});
