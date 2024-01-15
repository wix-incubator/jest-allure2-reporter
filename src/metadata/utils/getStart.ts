import type { TestInvocationMetadata } from 'jest-metadata';

import { START } from '../constants';

export const getStart = (testInvocation: TestInvocationMetadata) => {
  const firstBlock =
    testInvocation.beforeAll[0] ??
    testInvocation.beforeEach[0] ??
    testInvocation.fn ??
    testInvocation;

  return firstBlock.get(START) as number;
};
