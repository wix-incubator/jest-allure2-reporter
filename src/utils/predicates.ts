// eslint-disable-next-line node/no-unpublished-import
import type { AggregatedResult, Test, TestCaseResult, TestResult } from '@jest/reporters';
// eslint-disable-next-line node/no-unpublished-import
import type { Circus } from '@jest/types';

//#region Jest Reporter

/**
 * Checks if the given item is an AggregatedResult.
 *
 * @param item unknown item
 * @returns {boolean} true if the item is an AggregatedResult
 */
export function isAggregatedResult(item: unknown): item is AggregatedResult {
  return isObject(item) && 'testResults' in item && !('perfStats' in item);
}

/**
 * Checks if the given item is a TestResult.
 *
 * @param item unknown item
 * @returns {boolean} true if the item is a TestResult
 */
export function isTestResult(item: unknown): item is TestResult {
  return isObject(item) && 'testResults' in item && 'perfStats' in item;
}

/**
 * Checks if the given item is a TestCaseResult.
 *
 * @param item unknown item
 * @returns {boolean} true if the item is a TestCaseResult
 */
export function isTestCaseResult(item: unknown): item is TestCaseResult {
  return isObject(item) && 'ancestorTitles' in item;
}

/**
 * Checks if the given item is a Test.
 *
 * @param item unknown item
 * @returns {boolean} true if the item is a Test
 */
export function isTest(item: unknown): item is Test {
  return isObject(item) && 'context' in item;
}
//#endregion

//#region Circus
/**
 * Checks if the given item is a DescribeBlock.
 *
 * @param item unknown item
 * @returns {boolean} true if the item is a DescribeBlock
 */
export function isDescribeBlock(item: unknown): item is Circus.DescribeBlock {
  return isObject(item) && (item as any).type === 'describeBlock';
}

/**
 * Checks if the given item is a TestEntry.
 *
 * @param item unknown item
 * @returns {boolean} true if the item is a TestEntry
 */
export function isTestEntry(item: unknown): item is Circus.TestEntry {
  return isObject(item) && (item as any).type === 'test';
}
//#endregion

/**
 * Checks if the given item is an object.
 *
 * @param item unknown item
 * @returns {boolean} true if the item is an object
 */
function isObject(item: unknown): item is object {
  return typeof item === 'object' && item !== null;
}
