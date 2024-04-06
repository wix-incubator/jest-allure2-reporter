import type { KeyedLabelCustomizer, MaybePromise, PropertyExtractor } from 'jest-allure2-reporter';

import { appender, compose2, constant } from '../../common';
import { asArray, thruMaybePromise } from '../../../utils';

export function keyedLabel<Context>(
  value: KeyedLabelCustomizer<Context>,
): PropertyExtractor<Context, string[], MaybePromise<string[]>> | undefined {
  if (value == null) {
    return;
  }

  if (typeof value === 'function') {
    const extractor = value;
    return compose2(({ value }) => thruMaybePromise(value, asArray), extractor);
  }

  if (typeof value === 'string') {
    return constant([value]);
  }

  return appender(value);
}
