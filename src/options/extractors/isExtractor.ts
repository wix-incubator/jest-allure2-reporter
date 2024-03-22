/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Extractor } from 'jest-allure2-reporter';

export function isExtractor<T = unknown, Ta = never>(
  value: unknown,
): value is Extractor<T, Ta> {
  return typeof value === 'function';
}

export function isExtractorFn<T extends Function>(value: unknown): value is T {
  return typeof value === 'function';
}
