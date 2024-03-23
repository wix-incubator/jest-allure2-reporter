/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropertyExtractor } from 'jest-allure2-reporter';

export function isExtractor<T, Ta = never, Context = {}, V = T>(
  value: unknown,
): value is PropertyExtractor<T, Ta, Context, V> {
  return typeof value === 'function';
}

export function isExtractorFunction<T extends Function>(
  value: unknown,
): value is T {
  return typeof value === 'function';
}
