import type { Metadata, TestInvocationMetadata } from 'jest-metadata';
import type {
  Status,
  StatusDetails,
  AllureTestItemMetadata,
} from 'jest-allure2-reporter';

import { PREFIX } from '../constants';

export const getStatusAndDetails = (testInvocation: TestInvocationMetadata) => {
  return getBadResult(testInvocation) ?? getInnerResult(testInvocation);
};

function getInnerResult(testInvocation: TestInvocationMetadata) {
  const allInvocations = [...testInvocation.allInvocations()].reverse();
  let status: Status | undefined;
  let statusDetails: StatusDetails | undefined;

  for (const invocation of allInvocations) {
    const result = getResult(invocation);
    if (result) {
      if (isBadStatus(result.status)) {
        return result;
      }

      status ??= result.status;
      statusDetails ??= result.statusDetails;
    }
  }

  return status ? { status, statusDetails } : {};
}

function getResult(metadata: Metadata): Result | undefined {
  const item = metadata.get<AllureTestItemMetadata>(PREFIX, {});
  const { status, statusDetails } = item;

  return status ? { status, statusDetails } : undefined;
}

function isBadStatus(status: Status | undefined) {
  return status === 'failed' || status === 'broken';
}

function getBadResult(metadata: Metadata): Result | undefined {
  const result = getResult(metadata);
  const status = result?.status;
  return isBadStatus(status) ? result : undefined;
}

type Result = Pick<AllureTestItemMetadata, 'status' | 'statusDetails'>;
