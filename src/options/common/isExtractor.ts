/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropertyExtractor } from 'jest-allure2-reporter';

export function isExtractor<R, Ra = never, Context = {}, V = R | Promise<R>>(
  value: unknown,
): value is PropertyExtractor<R, Ra, Context, V> {
  return typeof value === 'function';
}
