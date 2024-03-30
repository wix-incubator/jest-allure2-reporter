import type {
  PromisedProperties,
  PropertyExtractor,
  PropertyExtractorContext,
} from 'jest-allure2-reporter';

import type { CompositeExtractor, MaybePromise } from '../types';
import { onceSmart } from '../../utils';

interface ProxyPropertyDescriptor<Shape, K extends keyof Shape> {
  readonly enumerable: true;
  readonly get: () => Partial<PromisedProperties<Shape>>[K];
}

function getPropertyContext<Context, Shape, K extends keyof Shape>(
  context: PropertyExtractorContext<Context, Partial<PromisedProperties<Shape>>>,
  key: K,
): PropertyExtractorContext<Context, MaybePromise<Shape[K]> | undefined> {
  return {
    ...context,
    get value() {
      return context.value[key] as MaybePromise<Shape[K]> | undefined;
    },
    get result() {
      return context.value;
    },
  };
}

export function proxyObjectExtractor<Shape, Context>(
  customizer: CompositeExtractor<Partial<PromisedProperties<Shape>>, Context>,
): PropertyExtractor<PromisedProperties<Shape>, never, Context, PromisedProperties<Shape>> {
  const propertyNames = Object.keys(customizer) as (keyof Shape)[];

  return (context) => {
    const descriptors = Object.fromEntries(
      propertyNames.map(<K extends keyof Shape>(key: K) => {
        const descriptor: ProxyPropertyDescriptor<Shape, K> = {
          enumerable: true,
          get: onceSmart(() => {
            const propertyContext = getPropertyContext<Context, Shape, K>(context, key);
            const propertyCustomizer = customizer[key];
            return propertyCustomizer(propertyContext) as PromisedProperties<Shape>[K];
          }),
        };

        return [key, descriptor] as const;
      }),
    );

    return Object.defineProperties({}, descriptors) as PromisedProperties<Shape>;
  };
}
