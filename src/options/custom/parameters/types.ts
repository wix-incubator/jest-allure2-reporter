import type { Parameter, Primitive, PropertyExtractor } from 'jest-allure2-reporter';

import type { MaybeArray, MaybePromise } from '../../../utils';

export type SimplifiedParameterCustomizer<Context> = PropertyExtractor<Parameter[], never, Context>;

export type AmbiguousParameterCustomizer<Context> = PropertyExtractor<
  AmbiguousParameterValue,
  never,
  Context,
  MaybePromise<Parameter[]>
>;

export type AmbiguousParameterValue = MaybeArray<Primitive | Partial<Parameter>>;
