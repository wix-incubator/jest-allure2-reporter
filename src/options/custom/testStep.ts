import type {
  AllureTestStepResult,
  PromisedProperties,
  PropertyExtractor,
  PropertyExtractorContext,
  TestStepCustomizer,
  TestStepExtractorContext,
} from 'jest-allure2-reporter';

import * as extractors from '../common';
import { onceSmart } from '../../utils';
import type {
  CompositeExtractor,
  MaybePromise,
  TestStepExtractor,
} from '../types';

import { parameters } from './parameters';

interface LazyAllureTestStepResultDescriptor<
  K extends keyof AllureTestStepResult,
> {
  readonly enumerable: true;
  readonly get: () => Partial<PromisedProperties<AllureTestStepResult[K]>>;
}

const fallback: PropertyExtractor<unknown> = (context) => context.value;

const getPropertyContext = <C, K extends keyof AllureTestStepResult>(
  context: PropertyExtractorContext<
    C,
    Partial<PromisedProperties<AllureTestStepResult>>
  >,
  key: K,
): PropertyExtractorContext<
  C,
  MaybePromise<AllureTestStepResult[K]> | undefined
> => {
  return {
    ...context,
    get value() {
      return context.value[key] as
        | MaybePromise<AllureTestStepResult[K]>
        | undefined;
    },
    get result() {
      return context.value;
    },
  };
};

export function testStep<Context>(
  customizer: TestStepCustomizer<Context>,
): TestStepExtractor<Context>;
export function testStep(customizer: null | undefined): undefined;
export function testStep<Context>(
  customizer: TestStepCustomizer<Context> | null | undefined,
): TestStepExtractor<Context> | undefined;
export function testStep<Context extends TestStepExtractorContext>(
  customizer: TestStepCustomizer<Context> | null | undefined,
): TestStepExtractor<Context> | undefined {
  if (customizer == null) {
    return;
  }

  const compositeExtractor = {
    hookType: fallback,
    steps: fallback,
    ignored: extractors.constant(customizer.ignored) ?? fallback,
    displayName: extractors.constant(customizer.displayName) ?? fallback,
    start: extractors.constant(customizer.start) ?? fallback,
    stop: extractors.constant(customizer.stop) ?? fallback,
    stage: extractors.constant(customizer.stage) ?? fallback,
    status: extractors.constant(customizer.status) ?? fallback,
    statusDetails: extractors.merger(customizer.statusDetails) ?? fallback,
    attachments: extractors.appender(customizer.attachments) ?? fallback,
    parameters: parameters(customizer.parameters) ?? fallback,
  } as CompositeExtractor<
    Partial<PromisedProperties<AllureTestStepResult>>,
    Context
  >;

  const propertyNames = Object.keys(
    compositeExtractor,
  ) as (keyof AllureTestStepResult)[];

  return async (context) => {
    const descriptors = Object.fromEntries(
      propertyNames.map(<K extends keyof AllureTestStepResult>(key: K) => {
        const descriptor: LazyAllureTestStepResultDescriptor<K> = {
          enumerable: true,
          get: onceSmart(() => {
            const pc = getPropertyContext<Context, K>(context, key);
            return compositeExtractor[key](pc);
          }),
        };

        return [key, descriptor] as const;
      }),
    );

    return Object.defineProperties(context.result, descriptors);
  };
}
