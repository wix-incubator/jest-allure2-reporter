import type {
  AllureTestStepResult,
  TestStepExtractor,
} from 'jest-allure2-reporter';

import type { TestStepCompositeExtractor } from '../types/compositeExtractors';
import { isDefined } from '../../utils';

export function testStepCustomizer(
  testStep: TestStepCompositeExtractor,
): TestStepExtractor {
  const extractor: TestStepExtractor = async (context) => {
    const result: Partial<AllureTestStepResult> = {};
    result.hidden = await testStep.hidden({
      ...context,
      value: false,
      result,
    });

    if (result.hidden) {
      return;
    }

    result.hookType = await testStep.hookType({
      ...context,
      value: undefined,
      result,
    });

    result.displayName = await testStep.displayName({
      ...context,
      value: '',
      result,
    });

    result.start = await testStep.start({
      ...context,
      value: Number.NaN,
      result,
    });

    result.stop = await testStep.stop({
      ...context,
      value: Number.NaN,
      result,
    });

    result.stage = await testStep.stage({
      ...context,
      value: 'scheduled',
      result,
    });

    result.status = await testStep.status({
      ...context,
      value: 'unknown',
      result,
    });

    result.statusDetails = await testStep.statusDetails({
      ...context,
      value: {},
      result,
    });

    result.attachments = await testStep.attachments({
      ...context,
      value: [],
      result,
    });

    result.parameters = await testStep.parameters({
      ...context,
      value: [],
      result,
    });

    const steps = context.testStepMetadata?.steps;
    if (steps && steps.length > 0) {
      const allSteps = await Promise.all(
        steps.map(async (testStepMetadata) => {
          const stepResult = await extractor({
            ...context,
            testStepMetadata,
            value: {},
            result,
          });

          return stepResult;
        }),
      );

      result.steps = allSteps.filter(isDefined);
    }

    return result as AllureTestStepResult;
  };

  return extractor;
}
