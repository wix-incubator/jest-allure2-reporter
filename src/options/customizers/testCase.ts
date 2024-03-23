import type {
  AllureTestCaseResult,
  PropertyExtractorContext,
  TestCaseExtractor,
  TestCaseExtractorContext,
  TestFileExtractorContext,
  TestRunExtractorContext,
  TestStepExtractorContext,
  TestStepExtractor,
} from 'jest-allure2-reporter';

import type { TestCaseCompositeExtractor } from '../types/compositeExtractors';
import { isDefined } from '../../utils';
import { novalue } from '../extractors';

export function testItemCustomizer<
  Context extends Partial<TestCaseExtractorContext>,
>(
  testCase: TestCaseCompositeExtractor<Context>,
  testStep: TestStepExtractor<TestStepExtractorContext>,
  metadataKey?: 'testCaseMetadata' | 'testFileMetadata' | 'testRunMetadata',
): TestCaseExtractor<Context> {
  return async (context) => {
    const result: Partial<AllureTestCaseResult> = {};
    result.hidden = await testCase.hidden({
      ...context,
      value: false,
      result,
    });

    if (result.hidden) {
      return;
    }

    result.displayName = await testCase.displayName({
      ...context,
      value: '',
      result,
    });

    result.start = await testCase.start({
      ...context,
      value: Number.NaN,
      result,
    });

    result.stop = await testCase.stop({
      ...context,
      value: Number.NaN,
      result,
    });

    result.fullName = await testCase.fullName({
      ...context,
      value: '',
      result,
    });

    result.historyId = await testCase.historyId({
      ...context,
      value: '',
      result,
    });

    result.stage = await testCase.stage({
      ...context,
      value: 'scheduled',
      result,
    });

    result.status = await testCase.status({
      ...context,
      value: 'unknown',
      result,
    });

    result.statusDetails = await testCase.statusDetails({
      ...context,
      value: {},
      result,
    });

    result.labels = await testCase.labels({
      ...context,
      value: [],
      result,
    });

    result.links = await testCase.links({
      ...context,
      value: [],
      result,
    });

    result.attachments = await testCase.attachments({
      ...context,
      value: [],
      result,
    });

    result.parameters = await testCase.parameters({
      ...context,
      value: [],
      result,
    });

    result.description = await testCase.description({
      ...context,
      value: '',
      result,
    });

    result.descriptionHtml = await testCase.descriptionHtml({
      ...context,
      value: '',
      result,
    });

    const steps = metadataKey ? context[metadataKey]?.steps : undefined;
    if (steps && steps.length > 0) {
      const allSteps = await Promise.all(
        steps.map(async (testStepMetadata) =>
          testStep({
            ...context,
            testStepMetadata,
            value: novalue(),
            result: {},
          } as PropertyExtractorContext<TestStepExtractorContext, never>),
        ),
      );

      result.steps = allSteps.filter(isDefined);
    }

    return result as AllureTestCaseResult;
  };
}

export function testCaseCustomizer(
  testCase: TestCaseCompositeExtractor<TestCaseExtractorContext>,
  testStep: TestStepExtractor<TestStepExtractorContext>,
): TestCaseExtractor<TestCaseExtractorContext> {
  return testItemCustomizer(testCase, testStep, 'testCaseMetadata');
}

export function testFileCustomizer(
  testFile: TestCaseCompositeExtractor<TestFileExtractorContext>,
  testStep: TestStepExtractor<TestStepExtractorContext>,
): TestCaseExtractor<TestFileExtractorContext> {
  return testItemCustomizer(testFile, testStep, 'testFileMetadata');
}

export function testRunCustomizer(
  testRun: TestCaseCompositeExtractor<TestRunExtractorContext>,
  testStep: TestStepExtractor<TestStepExtractorContext>,
): TestCaseExtractor<TestRunExtractorContext> {
  return testItemCustomizer(testRun, testStep, 'testRunMetadata');
}
