import type {
  AllureTestCaseResult,
  TestCaseExtractor,
  TestFileExtractor,
  TestRunExtractor,
  TestStepExtractor,
} from 'jest-allure2-reporter';

import type {
  TestCaseCompositeExtractor,
  TestFileCompositeExtractor,
  TestRunCompositeExtractor,
} from '../types/compositeExtractors';
import { isDefined } from '../../utils';

export function testItemCustomizer(
  testCase: TestCaseCompositeExtractor,
  testStep: TestStepExtractor,
  metadataKey?: 'testCaseMetadata' | 'testFileMetadata',
): TestCaseExtractor {
  const extractor: TestCaseExtractor = async (context) => {
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

    const steps = metadataKey ? context[metadataKey].steps : undefined;
    if (steps && steps.length > 0) {
      const allSteps = await Promise.all(
        steps.map(async (testStepMetadata) => {
          const stepResult = await testStep({
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

    return result as AllureTestCaseResult;
  };

  return extractor;
}

export function testCaseCustomizer(
  testCase: TestCaseCompositeExtractor,
  testStep: TestStepExtractor,
): TestCaseExtractor {
  return testItemCustomizer(testCase, testStep, 'testCaseMetadata');
}

export function testFileCustomizer(
  testFile: TestFileCompositeExtractor,
  testStep: TestStepExtractor,
): TestFileExtractor {
  return testItemCustomizer(
    testFile as unknown as TestCaseCompositeExtractor,
    testStep,
    'testFileMetadata',
  ) as unknown as TestFileExtractor;
}

export function testRunCustomizer(
  testRun: TestRunCompositeExtractor,
  testStep: TestStepExtractor,
): TestRunExtractor {
  return testItemCustomizer(
    testRun as unknown as TestCaseCompositeExtractor,
    testStep,
  ) as unknown as TestRunExtractor;
}
