import { isObject } from 'lodash';
// eslint-disable-next-line node/no-unpublished-import
import type { AggregatedResult, TestCaseResult, TestResult } from '@jest/reporters';

export function isAggregatedResult(item: unknown): item is AggregatedResult {
  return isObject(item) && 'testResults' in item && !('perfStats' in item);
}

export function isTestResult(item: unknown): item is TestResult {
  return isObject(item) && 'testResults' in item && 'perfStats' in item;
}

export function isTestCaseResult(item: unknown): item is TestCaseResult {
  return isObject(item) && 'ancestorTitles' in item;
}
