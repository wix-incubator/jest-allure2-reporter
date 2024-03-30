import type { AllureNestedTestStepMetadata, TestCaseExtractorContext } from 'jest-allure2-reporter';

import type { TestCaseExtractor, TestStepExtractor } from '../types';
import { isNonNullish, onceSmart } from '../../utils';

export function testCaseSteps<Context extends Partial<TestCaseExtractorContext>>(
  testStep: TestStepExtractor<Context>,
  metadataKey?: 'testCaseMetadata' | 'testFileMetadata' | 'testRunMetadata',
): TestCaseExtractor<Context> {
  const extractor: TestCaseExtractor<Context> = async (context) => {
    Object.defineProperty(context.value, 'steps', {
      enumerable: true,
      get: onceSmart(async () => {
        const steps: AllureNestedTestStepMetadata[] | undefined = metadataKey
          ? context[metadataKey]?.steps
          : undefined;

        if (steps && steps.length > 0) {
          const allSteps = await Promise.all(
            steps.map(async (testStepMetadata) => {
              const stepContext = {
                ...context,
                testStepMetadata,
                result: {},
                value: undefined as never,
              };

              return testStep(stepContext);
            }),
          );

          return allSteps.filter(isNonNullish);
        }

        return;
      }),
    });
    return context.value;
  };

  return extractor;
}
