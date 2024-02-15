import type { TestInvocationMetadata } from 'jest-metadata';
import type { Stage } from 'jest-allure2-reporter';

import { STAGE } from '../constants';

export const getStage = (testInvocation: TestInvocationMetadata) => {
  for (const invocation of testInvocation.allInvocations()) {
    if (invocation.get(STAGE) === 'interrupted') {
      return 'interrupted';
    }
  }

  return testInvocation.get(STAGE) as Stage | undefined;
};
