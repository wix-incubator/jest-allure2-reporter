import type {
  AllureTestCaseResult,
  AllureTestStepResult,
  PromisedProperties,
  PropertyExtractor,
  TestRunExtractorContext,
} from 'jest-allure2-reporter';

import { log } from '../logger';

export async function resolvePromisedTestCase<Context extends TestRunExtractorContext>(
  context: Context,
  extractor: PropertyExtractor<Context, PromisedProperties<AllureTestCaseResult>>,
  _stepsExtractor: PropertyExtractor<Context, PromisedProperties<AllureTestStepResult>[]>,
): Promise<AllureTestCaseResult | undefined> {
  const promised = preparePromisedItem(context, extractor, 'result');
  try {
    if (await promised.ignored) {
      return;
    }

    const item = await resolvePromisedProperties(promised);
    return item;
  } catch (error: unknown) {
    log.warn({ err: error }, 'Failed to resolve test case', error);
    return;
  }
}

export async function resolvePromisedItem<Context, ResultKey extends keyof Context, Result>(
  context: Context,
  extractor: PropertyExtractor<Context, PromisedProperties<Result>>,
  resultKey: ResultKey,
): Promise<Result> {
  return resolvePromisedProperties<Result>(preparePromisedItem(context, extractor, resultKey));
}

function preparePromisedItem<Context, ResultKey extends keyof Context, Result>(
  context: Context,
  extractor: PropertyExtractor<Context, PromisedProperties<Result>>,
  resultKey: ResultKey,
): PromisedProperties<Result> {
  const value = {} as Result;
  const firstPass = extractor({ ...context, value, [resultKey]: value });
  const secondPass = extractor({ ...context, value, [resultKey]: firstPass });

  return secondPass;
}

async function resolvePromisedProperties<T>(maybePromised: PromisedProperties<T>): Promise<T> {
  const promised = await maybePromised;
  const entries = Object.entries(promised);
  const resolvedEntries = await Promise.all(
    entries.map(async ([key, value]) => [key, await value]),
  );
  return Object.fromEntries(resolvedEntries);
}
