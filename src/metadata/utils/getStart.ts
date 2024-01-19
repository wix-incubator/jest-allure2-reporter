import type { TestInvocationMetadata } from 'jest-metadata';

import { START } from '../constants';

export const getStart = (testInvocation: TestInvocationMetadata) => {
  const firstBlock =
    testInvocation.beforeAll[0] ??
    testInvocation.beforeEach[0] ??
    testInvocation.fn;

  const start1 = testInvocation.get(START);
  const start2 = firstBlock?.get(START);

  if (typeof start1 === 'number') {
    return typeof start2 === 'number' ? Math.min(start1, start2) : start1;
  } else {
    return typeof start2 === 'number' ? start2 : Number.NaN;
  }
};
