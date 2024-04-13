import type { AllureTestCaseResult, PromisedProperties } from 'jest-allure2-reporter';

import { onceWithLoopDetection, resolvePromisedProperties } from '../utils';

import type { TestCaseExtractor, TestStepsExtractor } from './types';

export function combineTestCaseAndSteps<Context>(
  testCase: TestCaseExtractor<Context>,
  testSteps: TestStepsExtractor<Context>,
): TestCaseExtractor<Context, void> {
  return (context): PromisedProperties<AllureTestCaseResult> => {
    const test = testCase({ ...context, value: {} as PromisedProperties<AllureTestCaseResult> });
    const steps = testSteps({ ...context, value: [] });

    Object.defineProperty(test, 'steps', {
      enumerable: true,
      get: onceWithLoopDetection(async () => {
        const statuses = await Promise.all(steps.map((s) => s.ignored));
        const notIgnoredSteps = steps.filter((_step, index) => !statuses[index]);
        return Promise.all(notIgnoredSteps.map(resolvePromisedProperties));
      }),
    });

    return test;
  };
}
