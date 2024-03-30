import type { Parameter, ParametersCustomizer, PropertyExtractor } from 'jest-allure2-reporter';

import * as extractors from '../../common';

import { parametersMap } from './parametersMap';

export function parameters<Context>(
  customizer: undefined | null | ParametersCustomizer<Context>,
): PropertyExtractor<Parameter[], never, Context> | undefined {
  if (customizer != null && typeof customizer === 'object') {
    return parametersMap(customizer);
  }

  return extractors.constant(customizer);
}
