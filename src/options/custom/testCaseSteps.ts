import type { TestCaseExtractorContext } from 'jest-allure2-reporter';

import type { TestCaseExtractor, TestStepExtractor } from '../types';
import { isNonNullish, maybePromiseAll, onceWithLoopDetection } from '../../utils';

interface HasMetadata {
  testCaseMetadata?: TestCaseExtractorContext['testCaseMetadata'];
  testFileMetadata?: TestCaseExtractorContext['testFileMetadata'];
  testRunMetadata?: TestCaseExtractorContext['testRunMetadata'];
}

export function testCaseSteps<Context extends HasMetadata>(
  testStep: TestStepExtractor<Context>,
  metadataKey: keyof HasMetadata,
): TestCaseExtractor<Context> {
  return (context) => {
    Object.defineProperty(context.value, 'steps', {
      enumerable: true,
      get: onceWithLoopDetection(() => {
        const steps = context[metadataKey]?.steps;
        if (steps && steps.length > 0) {
          return maybePromiseAll(
            steps.map((testStepMetadata) => {
              const stepContext = {
                ...context,
                testStepMetadata,
                result: {},
                value: undefined as never,
              };

              return testStep(stepContext);
            }),
            (allSteps) => allSteps.filter(isNonNullish),
          );
        }

        return;
      }),
    });

    return context.value;
  };
}
