import { describe, expect, it, jest } from '@jest/globals';
import type {
  AllureTestStepResult,
  PromisedProperties,
  PropertyExtractorContext,
  TestCaseExtractorContext,
} from 'jest-allure2-reporter';

import { testStep } from './testStep';
import { testCaseSteps } from './testCaseSteps';
import { createTestCaseContext } from './__utils__/contexts';

describe('testCaseSteps', () => {
  it('should extract nested steps', async () => {
    let counter = 0;
    const displayName = jest.fn<any>().mockImplementation(() => `Step ${++counter}`);
    const testStepExtractor = testStep({ displayName });
    const testCase = testCaseSteps(testStepExtractor, 'testCaseMetadata');
    const context: PropertyExtractorContext<
      TestCaseExtractorContext,
      PromisedProperties<AllureTestStepResult>[]
    > = {
      ...createTestCaseContext(),
      value: [],
    };

    context.testCaseMetadata.steps = [{}, {}];

    const result = testCase(context);
    if (Array.isArray(result)) {
      expect(result).toHaveLength(2);
      expect(result[0].displayName).toBe('Step 1');
      expect(result[1].displayName).toBe('Step 2');
      // Testing memoization
      expect(result[0].displayName).toBe('Step 1');
      expect(result[1].displayName).toBe('Step 2');
    } else {
      expect(result).toBeInstanceOf(Array);
    }

    expect(displayName).toHaveBeenCalledTimes(2);
  });
});
