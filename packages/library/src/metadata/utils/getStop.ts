import type { MetadataSquasherMapping } from '../MetadataSquasher';
import type { AllureTestCaseMetadata } from '../metadata';
import { STOP } from '../../constants';

export const getStop: MetadataSquasherMapping<
  AllureTestCaseMetadata,
  'stop'
> = ({ testEntry, testInvocation }) => {
  const lastBlock =
    testInvocation &&
    (testInvocation.afterAll.at(-1) ??
      testInvocation.afterEach.at(-1) ??
      testInvocation.fn);

  return (lastBlock?.get(STOP) ??
    testInvocation?.get(STOP) ??
    testEntry?.get(STOP)) as number;
};
