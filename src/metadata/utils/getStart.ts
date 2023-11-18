import type { AllureTestCaseMetadata } from 'jest-allure2-reporter';

import type { MetadataSquasherMapping } from '../MetadataSquasher';
import { START } from '../../constants';

export const getStart: MetadataSquasherMapping<
  AllureTestCaseMetadata,
  'start'
> = ({ testEntry, testInvocation }) => {
  const firstBlock =
    testInvocation &&
    (testInvocation.beforeAll[0] ??
      testInvocation.beforeEach[0] ??
      testInvocation.fn);

  return (firstBlock?.get(START) ??
    testInvocation?.fn?.get(START) ??
    testEntry?.get(START)) as number;
};