// eslint-disable-next-line node/no-unpublished-import
import type { TestResult, TestCaseResult, AggregatedResult } from '@jest/reporters';
// eslint-disable-next-line node/no-unpublished-import
import type { Circus } from '@jest/types';

const EMPTY = Object.freeze({});

/**
 *
 * @param item
 */
export function getMetadata(
  item: AggregatedResult | TestResult | TestCaseResult,
): Record<string, unknown> {
  if (isAggregatedResult(item)) {
    return { type: 'aggregated_result' };
  }

  if (isTestResult(item)) {
    return { type: 'test_result' };
  }

  if (isTestCaseResult(item)) {
    return { type: 'test_case_result' };
  }

  return EMPTY;
}

/**
 *
 * @param _item
 */
export function setMetadata(_item: Circus.DescribeBlock | Circus.TestEntry) {
  if (isDescribeBlock(_item) || isTestEntry(_item)) {
    console.log('TODO: set metadata');
  }
}

/**
 *
 * @param item
 */
function isAggregatedResult(item: unknown): item is AggregatedResult {
  return isObject(item) && 'testResults' in item && !('perfStats' in item);
}

/**
 *
 * @param item
 */
function isTestResult(item: unknown): item is TestResult {
  return isObject(item) && 'testResults' in item && 'perfStats' in item;
}

/**
 *
 * @param item
 */
function isTestCaseResult(item: unknown): item is TestCaseResult {
  return isObject(item) && 'ancestorTitles' in item;
}

/**
 *
 * @param item
 */
function isDescribeBlock(item: unknown): item is Circus.DescribeBlock {
  return isObject(item) && (item as any).type === 'describeBlock';
}

/**
 *
 * @param item
 */
function isTestEntry(item: unknown): item is Circus.TestEntry {
  return isObject(item) && (item as any).type === 'test';
}

/**
 *
 * @param item
 */
function isObject(item: unknown): item is object {
  return typeof item === 'object' && item !== null;
}
