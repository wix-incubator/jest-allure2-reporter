import type { MaybePromise, Parameter, Primitive, PropertyExtractor } from 'jest-allure2-reporter';

export type ParameterExtractor<Context> = PropertyExtractor<
  Context,
  MaybePromise<Parameter | undefined>
>;

export type ParameterOrPrimitiveExtractor<Context> = PropertyExtractor<
  Context,
  MaybePromise<Parameter | undefined>,
  MaybePromise<ParameterOrPrimitive>
>;

export type ParameterOrPrimitiveInflator<Context> = PropertyExtractor<
  Context,
  MaybePromise<ParameterOrPrimitive>,
  MaybePromise<Parameter | undefined>
>;

export type ParameterOrPrimitive = Primitive | Partial<Parameter>;
