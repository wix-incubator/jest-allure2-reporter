import type {
  AllureTestCaseResult,
  TestCaseCustomizer,
} from 'jest-allure2-reporter';

import type { CompositeExtractor, TestCaseExtractor } from '../types';

export function testCase<Context>(
  testCase: TestCaseCustomizer<Context>,
): TestCaseExtractor<Context>;
export function testCase(testCase: null | undefined): undefined;
export function testCase<Context>(
  testCase: TestCaseCustomizer<Context> | null | undefined,
): TestCaseExtractor<Context> | undefined;
export function testCase<Context>(
  testCase: TestCaseCustomizer<Context> | null | undefined,
): TestCaseExtractor<Context> | undefined {
  if (testCase == null) {
    return;
  }

  const composite: CompositeExtractor<AllureTestCaseResult, Context> = {};

  return async (context) => {
    const result: Partial<AllureTestCaseResult> = {};
    result.ignored = await composite.ignored({
      ...context,
      value: false,
      result,
    });

    if (result.ignored) {
      return;
    }

    result.displayName = await composite.displayName({
      ...context,
      value: '',
      result,
    });

    result.start = await composite.start({
      ...context,
      value: Number.NaN,
      result,
    });

    result.stop = await composite.stop({
      ...context,
      value: Number.NaN,
      result,
    });

    result.fullName = await composite.fullName({
      ...context,
      value: '',
      result,
    });

    result.historyId = await composite.historyId({
      ...context,
      value: '',
      result,
    });

    result.stage = await composite.stage({
      ...context,
      value: 'scheduled',
      result,
    });

    result.status = await composite.status({
      ...context,
      value: 'unknown',
      result,
    });

    result.statusDetails = await composite.statusDetails({
      ...context,
      value: {},
      result,
    });

    result.labels = await composite.labels({
      ...context,
      value: [],
      result,
    });

    result.links = await composite.links({
      ...context,
      value: [],
      result,
    });

    result.attachments = await composite.attachments({
      ...context,
      value: [],
      result,
    });

    result.parameters = await composite.parameters({
      ...context,
      value: [],
      result,
    });

    result.description = await composite.description({
      ...context,
      value: '',
      result,
    });

    result.descriptionHtml = await composite.descriptionHtml({
      ...context,
      value: '',
      result,
    });

    return result as AllureTestCaseResult;
  };
}
