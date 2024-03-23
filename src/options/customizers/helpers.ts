import type {
  Helpers,
  HelpersCustomizer,
  HelpersExtractor,
} from 'jest-allure2-reporter';

import { asExtractor } from '../extractors';
import { compactObject } from '../../utils';

export function helpersCustomizer(
  value: HelpersCustomizer | undefined,
): HelpersExtractor<Partial<Helpers>> | undefined {
  if (value == null) {
    return;
  }

  if (typeof value === 'object') {
    const compact = compactObject(value);
    if (Object.keys(compact).length === 0) {
      return;
    }

    return asExtractor<Helpers, Partial<Helpers>>(compact);
  }

  return value;
}
