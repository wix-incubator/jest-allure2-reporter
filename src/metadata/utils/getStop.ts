import type { TestInvocationMetadata } from 'jest-metadata';

import { last } from '../../utils';
import { STOP } from '../constants';

export const getStop = (testInvocation: TestInvocationMetadata) => {
  const lastBlock =
    last(testInvocation.afterAll) ??
    last(testInvocation.afterEach) ??
    testInvocation.fn;

  const stop1 = testInvocation.get(STOP);
  const stop2 = lastBlock?.get(STOP);

  if (typeof stop1 === 'number') {
    return typeof stop2 === 'number' ? Math.max(stop1, stop2) : stop1;
  } else {
    return typeof stop2 === 'number' ? stop2 : undefined;
  }
};
