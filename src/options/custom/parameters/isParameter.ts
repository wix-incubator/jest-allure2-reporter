import type { Parameter } from 'jest-allure2-reporter';

import { isObject } from '../../../utils';

export function isParameter(value: unknown): value is Partial<Parameter> {
  return isObject(value);
}
