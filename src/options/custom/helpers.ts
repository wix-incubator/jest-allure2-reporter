import type {
  GlobalExtractorContext,
  Helpers,
  HelpersCustomizer,
  KeyedHelperCustomizer,
  PromisedProperties,
} from 'jest-allure2-reporter';

import type { HelpersExtractor } from '../types';
import { compactObject, mapValues } from '../../utils';

export function helpers(customizer: HelpersCustomizer | undefined): HelpersExtractor | undefined {
  if (customizer == null) {
    return undefined;
  }

  if (typeof customizer === 'function') {
    return customizer;
  }

  return (context: GlobalExtractorContext) => {
    function getProperty<K extends keyof Helpers>(factory: KeyedHelperCustomizer<K>, key: K) {
      return factory({ ...context, value: context.$[key] });
    }

    return mapValues(
      compactObject(customizer),
      getProperty,
    ) as unknown as PromisedProperties<Helpers>;
  };
}
