import type { KeyedParameterCustomizer, Parameter, PropertyExtractor } from 'jest-allure2-reporter';

import { groupBy, uniq } from '../../../utils';

import { simplifyParametersMap } from './simplifyParametersMap';

export function parametersMap<Context>(
  customizer: Record<string, KeyedParameterCustomizer<Context>>,
): PropertyExtractor<Parameter[], never, Context> {
  const simplifiedCustomizer = simplifyParametersMap(customizer);
  const customizerKeys = Object.keys(simplifiedCustomizer);

  return async (context) => {
    const parameters = groupBy(await context.value, 'name');
    const keys = uniq([...customizerKeys, ...Object.keys(parameters)]);
    const batches: Parameter[][] = await Promise.all(
      keys.map((key) => {
        const keyedContext = { ...context, value: parameters[key] ?? [] };
        const keyedCustomizer = simplifiedCustomizer[key];
        return keyedCustomizer ? keyedCustomizer(keyedContext) : keyedContext.value;
      }),
    );

    return batches.flat();
  };
}
