import type {
  KeyedParameterCustomizer,
  Parameter,
  ParametersCustomizer,
  Primitive,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import * as extractors from '../common';
import {
  groupBy,
  uniq,
  mapValues,
  compactObject,
  isObject,
  compactArray,
  isPromiseLike,
} from '../../utils';
import type { MaybePromise } from '../types';

export function parameters<Context>(
  customizer: undefined | null | ParametersCustomizer<Context>,
): PropertyExtractor<Parameter[], never, Context> | undefined {
  if (customizer != null && typeof customizer === 'object') {
    return parametersMap(customizer);
  }

  return extractors.constant(customizer);
}

function parametersMap<Context>(
  customizer: Record<string, KeyedParameterCustomizer<Context>>,
): PropertyExtractor<Parameter[], never, Context> {
  const simplifiedCustomizer = simplifyCustomizer(customizer);
  const customizerKeys = Object.keys(simplifiedCustomizer);

  return async (context) => {
    const parameters = groupBy(await context.value, 'name');
    const keys = uniq([...Object.keys(parameters), ...customizerKeys]);
    const batches: Parameter[][] = await Promise.all(
      keys.map((key) => {
        const keyedContext = { ...context, value: parameters[key] ?? [] };
        const keyedCustomizer = simplifiedCustomizer[key];
        return keyedCustomizer(keyedContext);
      }),
    );

    return batches.flat();
  };
}

type SimplifiedParameterCustomizer<Context> = PropertyExtractor<
  Parameter[],
  never,
  Context
>;

type AmbiguousParameterCustomizer<Context> = PropertyExtractor<
  Array<Primitive | Partial<Parameter>>,
  Primitive | Partial<Parameter>,
  Context,
  Parameter[]
>;

type AmbigousValue =
  | Primitive
  | Partial<Parameter>
  | Array<Primitive | Partial<Parameter>>;

function simplifyCustomizer<Context>(
  customizer: Record<string, KeyedParameterCustomizer<Context>>,
): Record<string, SimplifiedParameterCustomizer<Context>> {
  const result = mapValues(
    customizer,
    (
      value: KeyedParameterCustomizer<Context>,
      key: string,
    ): SimplifiedParameterCustomizer<Context> | undefined => {
      const ambigousCustomizer = resolveAmbiguousCustomizer(value, key);
      if (!ambigousCustomizer) {
        return;
      }

      return extractors.compose2<
        Parameter[],
        never,
        AmbigousValue,
        Context,
        Parameter[]
      >(createFlattener(key), ambigousCustomizer);
    },
  );

  return compactObject(result) as Record<
    string,
    SimplifiedParameterCustomizer<Context>
  >;
}

function resolveAmbiguousCustomizer<Context>(
  value: KeyedParameterCustomizer<Context>,
  key: string,
): AmbiguousParameterCustomizer<Context> | undefined {
  if (value == null) {
    return;
  }

  if (typeof value === 'function') {
    return value as AmbiguousParameterCustomizer<Context>;
  }

  return extractors.appender([
    isParameter(value)
      ? {
          ...value,
          name: key,
        }
      : { name: key, value },
  ]);
}

function createFlattener<Context>(
  name: string,
): PropertyExtractor<Parameter[], never, Context, MaybePromise<AmbigousValue>> {
  function repair(
    value: Primitive | Partial<Parameter>,
  ): Parameter | undefined {
    if (value == null) {
      return;
    }

    if (isParameter(value)) {
      return value.value == null
        ? undefined
        : ({ ...value, name } as Parameter);
    }

    return { name, value };
  }

  function repairMaybeArray(value: AmbigousValue): Parameter[] {
    return Array.isArray(value)
      ? compactArray(value.map(repair))
      : compactArray([repair(value)]);
  }

  return ({ value }) =>
    isPromiseLike(value)
      ? value.then(repairMaybeArray)
      : repairMaybeArray(value);
}

function isParameter(value: unknown): value is Partial<Parameter> {
  return isObject(value);
}
