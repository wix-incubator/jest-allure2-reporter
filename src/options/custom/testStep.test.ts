import type {
  AllureTestStepResult,
  PromisedProperties,
  PropertyExtractorContext,
  TestStepExtractorContext,
} from 'jest-allure2-reporter';

import { testStep as testStepCustomizer } from './testStep';

describe('testStepCustomizer', () => {
  const createContext = (
    value?: any,
  ): PropertyExtractorContext<
    TestStepExtractorContext,
    PromisedProperties<AllureTestStepResult>
  > => ({
    value,
    result: {} as any,
    aggregatedResult: {} as any,
    testRunMetadata: {} as any,
    testStepMetadata: {} as any,
    testCase: {} as any,
    testCaseMetadata: {} as any,
    filePath: [],
    testFile: {} as any,
    testFileMetadata: {} as any,
    $: {} as any,
    globalConfig: {} as any,
    reporterConfig: {} as any,
  });

  test.each`
    property           | defaultValue   | customValue
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
    'should asynchronously customize $property with $customValue yet to be able to access the default value $defaultValue',
    async ({
      property,
      defaultValue,
      customValue,
    }: {
      property: keyof AllureTestStepResult;
      defaultValue: any;
      customValue: any;
    }) => {
      const asyncExtractor = jest.fn().mockResolvedValue(customValue);
      const testStep = testStepCustomizer({ [property]: asyncExtractor });
      const context = createContext({ [property]: defaultValue });
      const result = testStep(context) as AllureTestStepResult;

      expect(asyncExtractor).not.toHaveBeenCalled();
      await expect(result?.[property]).resolves.toEqual(customValue);
      expect(asyncExtractor).toHaveBeenCalledWith(
        expect.objectContaining({
          value: defaultValue,
          result: context.result,
        }),
      );
    },
  );

  test.each`
    property           | defaultValue   | customValue
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
    'should synchronously customize $property with $customValue yet to be able to access the default value $defaultValue',
    ({
      property,
      defaultValue,
      customValue,
    }: {
      property: keyof AllureTestStepResult;
      defaultValue: any;
      customValue: any;
    }) => {
      const syncExtractor = jest.fn().mockReturnValue(customValue);
      const testStep = testStepCustomizer({ [property]: syncExtractor });
      const context = createContext({ [property]: defaultValue });
      const result = testStep(context) as AllureTestStepResult;

      expect(syncExtractor).not.toHaveBeenCalled();
      expect(result?.[property]).toBe(customValue);
      expect(syncExtractor).toHaveBeenCalledWith(
        expect.objectContaining({
          value: defaultValue,
          result: context.result,
        }),
      );
    },
  );

  test.each`
    property      | defaultValue    | customValue
    ${'steps'}    | ${undefined}    | ${[]}
    ${'hookType'} | ${'beforeEach'} | ${'afterEach'}
  `(
    'should not be able to customize $property',
    async ({
      property,
      defaultValue,
      customValue,
    }: {
      property: keyof AllureTestStepResult;
      defaultValue: any;
      customValue: any;
    }) => {
      const extractor = jest.fn().mockResolvedValue(customValue);
      const testStep = testStepCustomizer({ [property]: extractor });
      const context = createContext({ [property]: defaultValue });
      const result = testStep(context) as AllureTestStepResult;

      expect(result?.[property]).toBe(defaultValue);
      expect(extractor).not.toHaveBeenCalled();
    },
  );
});
