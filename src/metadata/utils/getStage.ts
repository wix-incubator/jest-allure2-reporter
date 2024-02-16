import type { TestInvocationMetadata } from 'jest-metadata';

import { STAGE } from '../constants';

export const getStage = (testInvocation: TestInvocationMetadata) => {
  let finished: boolean | undefined;
  for (const invocation of testInvocation.allInvocations()) {
    finished ??= true;

    const stage = invocation.get(STAGE);
    if (stage === 'interrupted') {
      return 'interrupted';
    }
    if (stage !== 'finished') {
      finished = false;
    }
  }

  return finished ? 'finished' : undefined;
};
