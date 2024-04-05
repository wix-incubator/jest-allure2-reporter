import type { HelpersCustomizer } from 'jest-allure2-reporter';

import type { HelpersExtractor } from '../types';

export function helpers(_customizer: HelpersCustomizer | undefined): HelpersExtractor {
  throw new Error('Not implemented');
}
