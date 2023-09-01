import type { TestEntryMetadata } from 'jest-metadata';

export function squash(test: TestEntryMetadata): unknown[] {
  return [test];
}
