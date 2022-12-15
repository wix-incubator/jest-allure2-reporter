import isObject from './isObject';
// eslint-disable-next-line node/no-unpublished-import
import type { Circus } from '@jest/types';

export function isDescribeBlock(item: unknown): item is Circus.DescribeBlock {
  return isObject(item) && (item as any).type === 'describeBlock';
}

export function isTestEntry(item: unknown): item is Circus.TestEntry {
  return isObject(item) && (item as any).type === 'test';
}
