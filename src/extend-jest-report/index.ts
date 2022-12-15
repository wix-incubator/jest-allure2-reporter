// eslint-disable-next-line node/no-unpublished-import
import type { TestResult, TestCaseResult, AggregatedResult } from '@jest/reporters';
// eslint-disable-next-line node/no-unpublished-import
import type { Circus } from '@jest/types';
import {
  isAggregatedResult,
  isTestCaseResult,
  isTestResult,
} from '../metadata/utils/reporterPredicates';
import { isDescribeBlock, isTestEntry } from '../metadata/utils/circusPredicates';

const EMPTY = Object.freeze({});

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

export function setMetadata(_item: Circus.DescribeBlock | Circus.TestEntry) {
  if (isDescribeBlock(_item) || isTestEntry(_item)) {
    console.log('TODO: set metadata');
  }
}
