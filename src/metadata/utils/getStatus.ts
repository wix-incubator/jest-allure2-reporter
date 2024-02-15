import type { TestInvocationMetadata } from 'jest-metadata';
import type { Status, StatusDetails } from 'jest-allure2-reporter';

import { STATUS, STATUS_DETAILS } from '../constants';

export const getStatus = (testInvocation: TestInvocationMetadata) => {
  let status: Status | undefined;
  let statusDetails: StatusDetails | undefined;

  const items = [...testInvocation.allInvocations(), testInvocation].reverse();
  for (const item of items) {
    status ??= item.get(STATUS) as Status;
    statusDetails ??= item.get(STATUS_DETAILS) as StatusDetails;
    if (status && statusDetails) {
      break;
    }
  }

  return {
    status,
    statusDetails,
  };
};
