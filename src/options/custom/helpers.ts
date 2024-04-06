import type { GlobalExtractorContext, HelpersCustomizer } from 'jest-allure2-reporter';

import type { HelpersExtractor } from '../types';
import { mapValues } from '../../utils';

export function helpers(customizer: HelpersCustomizer | undefined): HelpersExtractor | undefined {
  if (customizer == null) {
    return undefined;
  }

  // TODO: Implement custom helpers
  const result = (context: GlobalExtractorContext) => {
    return mapValues(customizer as any, (factory) => factory({ ...context }));
  };

  return result as any;
}
