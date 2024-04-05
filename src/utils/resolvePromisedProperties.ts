import type { MaybePromise, PromisedProperties } from 'jest-allure2-reporter';

import { log } from '../logger';

export async function resolvePromisedProperties<T>(
  maybePromised: MaybePromise<PromisedProperties<T>>,
): Promise<T | undefined> {
  try {
    const promised = await maybePromised;
    const entries = Object.entries(promised);
    const resolvedEntries = await Promise.all(
      entries.map(async ([key, value]) => [key, await value]),
    );
    return Object.fromEntries(resolvedEntries);
  } catch (error: unknown) {
    log.warn({ err: error }, 'Failed to resolve promised properties');
    return;
  }
}
