import type {
  KeyedLabelCustomizer,
  MaybeArray,
  MaybePromise,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import { appender, constant } from '../../common';

export function resolveKeyedLabelCustomizer<Context>(
  value: KeyedLabelCustomizer<Context>,
):
  | PropertyExtractor<Context, MaybePromise<string[]>, MaybePromise<MaybeArray<string>>>
  | undefined {
  if (value == null) {
    return;
  }

  if (typeof value === 'function') {
    return value;
  }

  if (typeof value === 'string') {
    return constant([value]);
  }

  return appender(value);
}
