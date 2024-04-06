import type {
  AllureTestItemMetadata,
  AllureTestStepResult,
  TestStepExtractorContext,
  PromisedProperties,
} from 'jest-allure2-reporter';

import type { TestStepExtractor, TestStepsExtractor } from '../types';

type HasMetadata<Context, Key extends keyof Context> = Context & {
  [key in Key]: AllureTestItemMetadata;
};

export function testCaseSteps<
  BaseContext extends Partial<Omit<TestStepExtractorContext, 'testStepMetadata'>>,
  Key extends keyof BaseContext,
  Context extends HasMetadata<BaseContext, Key>,
>(
  testStep: TestStepExtractor<TestStepExtractorContext>,
  metadataKey: Key,
): TestStepsExtractor<Context, void> {
  return (context): PromisedProperties<AllureTestStepResult>[] => {
    const steps = context[metadataKey]?.steps;
    if (!steps || steps.length === 0) {
      return [];
    }

    return steps.map((testStepMetadata) => {
      const testStepContext: any = {
        ...context,
        testStepMetadata,
        result: {},
        value: {},
      };

      testStepContext.result = testStep(testStepContext);
      return testStep(testStepContext);
    });
  };
}
