import type { MetadataSquasherMapping } from '../MetadataSquasher';
import type { AllureTestCaseMetadata } from '../metadata';
import { PREFIX } from '../../constants';

export const getStop: MetadataSquasherMapping<
  AllureTestCaseMetadata,
  'stop'
> = ({ testEntry, testInvocation }) => {
  const last =
    (testInvocation &&
      (testInvocation.afterAll.at(-1) ??
        testInvocation.after.at(-1) ??
        testInvocation.fn)) ??
    testEntry;

  const stop: number = (last?.get([PREFIX, 'stop']) as number);
  return stop;
};
