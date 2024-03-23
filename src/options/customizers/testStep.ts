import type {
  AllureTestStepResult,
  TestStepExtractor,
  TestStepExtractorContext,
} from 'jest-allure2-reporter';

import type { TestStepCompositeExtractor } from '../types/compositeExtractors';
import { isDefined } from '../../utils';
import { novalue } from '../extractors';

export function testStepCustomizer(
  testStep: TestStepCompositeExtractor<TestStepExtractorContext>,
): TestStepExtractor<TestStepExtractorContext> {
  return async function testStepExtractor(context) {
    const result: Partial<AllureTestStepResult> = {};
    result.hidden = await testStep.hidden({
      ...context,
      value: false,
      result,
    });

    if (result.hidden) {
      return;
    }

    result.hookType = context.testStepMetadata.hookType;

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
          const stepResult = await testStepExtractor({
            ...context,
            testStepMetadata,
            value: novalue(),
            result,
          });

          return stepResult;
        }),
      );

      result.steps = allSteps.filter(isDefined);
    }

    return result as AllureTestStepResult;
  };
}
