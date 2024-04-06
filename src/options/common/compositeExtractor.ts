import type {
  MaybePromise,
  PromisedProperties,
  PropertyExtractor,
  PropertyExtractorContext,
} from 'jest-allure2-reporter';

import type { CompositeExtractor } from '../types';
import { onceWithLoopDetection } from '../../utils';

interface ProxyPropertyDescriptor<Shape, K extends keyof Shape> {
  readonly enumerable: true;
  readonly get: () => MaybePromise<Shape[K]>;
}

function getPropertyContext<Context, Shape, K extends keyof Shape>(
  context: PropertyExtractorContext<Context, Partial<PromisedProperties<Shape>>>,
  key: K,
): PropertyExtractorContext<Context, MaybePromise<Shape[K]>> {
  return {
    ...context,
    get value() {
      return context.value[key] as MaybePromise<Shape[K]>;
    },
  };
}

export function compositeExtractor<Context, Shape>(
  customizer: CompositeExtractor<Context, Shape>,
): PropertyExtractor<Context, PromisedProperties<Shape>, PromisedProperties<Shape>> {
  const propertyNames = Object.keys(customizer) as (keyof Shape)[];
  return (context) => {
    const descriptors = Object.fromEntries(
      propertyNames.map(<K extends keyof Shape>(key: K) => {
        const propertyContext = getPropertyContext<Context, Shape, K>(context, key);
        const propertyCustomizer = customizer[key];
        const descriptor: ProxyPropertyDescriptor<Shape, K> = {
          enumerable: true,
          get: onceWithLoopDetection(computePropertyValue),
        };

        function computePropertyValue() {
          return propertyCustomizer(propertyContext);
        }

        return [key, descriptor] as const;
      }),
    );

    return Object.defineProperties({}, descriptors) as PromisedProperties<Shape>;
  };
}
