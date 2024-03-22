import type {
  Helpers,
  HelpersCustomizer,
  HelpersExtractor,
} from 'jest-allure2-reporter';

import {
  asExtractor,
  isExtractorFn as isExtractorFunction,
} from '../extractors';
import { compactObject } from '../../utils';

export function helpersCustomizer(
  value: HelpersCustomizer | undefined,
): HelpersExtractor<Partial<Helpers>> | undefined {
  if (isExtractorFunction<HelpersExtractor<Partial<Helpers>>>(value)) {
    return value;
  }

  if (value == null) {
    return;
  }

  const compact = compactObject(value);
  if (Object.keys(compact).length === 0) {
    return;
  }

  return asExtractor<Helpers, Partial<Helpers>>(value);
}
