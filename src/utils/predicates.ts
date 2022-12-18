// eslint-disable-next-line node/no-unpublished-import
import type { AggregatedResult, Test, TestCaseResult, TestResult } from '@jest/reporters';
// eslint-disable-next-line node/no-unpublished-import
import type { Circus } from '@jest/types';

//#region Jest Reporter

export function isAggregatedResult(item: unknown): item is AggregatedResult {
  return isObject(item) && 'testResults' in item && !('perfStats' in item);
}

export function isTestResult(item: unknown): item is TestResult {
  return isObject(item) && 'testResults' in item && 'perfStats' in item;
}

export function isTestCaseResult(item: unknown): item is TestCaseResult {
  return isObject(item) && 'ancestorTitles' in item;
}

export function isTest(item: unknown): item is Test {
  return isObject(item) && 'context' in item;
}
//#endregion

//#region Circus

export function isDescribeBlock(item: unknown): item is Circus.DescribeBlock {
  return isObject(item) && (item as Circus.DescribeBlock).type === 'describeBlock';
}

export function isTestEntry(item: unknown): item is Circus.TestEntry {
  return isObject(item) && (item as Circus.TestEntry).type === 'test';
}
//#endregion

function isObject(item: unknown): item is object {
  return typeof item === 'object' && item !== null;
}
