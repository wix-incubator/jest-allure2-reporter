import type {
  MaybeNullish,
  MaybePromise,
  Parameter,
  ParametersCustomizer,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import * as extractors from '../../common';

import { parametersMap } from './parametersMap';

export function parameters<Context>(
  customizer: MaybeNullish<ParametersCustomizer<Context>>,
): PropertyExtractor<Context, MaybePromise<Parameter[]>> | undefined {
  if (customizer == null) {
    return;
  }

  if (typeof customizer === 'function' || Array.isArray(customizer)) {
    return extractors.constant(customizer);
  }

  return parametersMap(customizer);
}
