import type { TestInvocationMetadata } from 'jest-metadata';

import { STOP } from '../constants';

export const getStop = (testInvocation: TestInvocationMetadata) => {
  const lastBlock =
    testInvocation.afterAll.at(-1) ??
    testInvocation.afterEach.at(-1) ??
    testInvocation.fn ??
    testInvocation;

  return lastBlock.get(STOP) as number;
};
