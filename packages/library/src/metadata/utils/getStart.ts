import type { MetadataSquasherMapping } from '../MetadataSquasher';
import type { AllureTestCaseMetadata } from '../metadata';

export const getStart: MetadataSquasherMapping<
  AllureTestCaseMetadata,
  'start'
> = ({ testEntry, testInvocation }) => {
  const first =
    (testInvocation &&
      (testInvocation.beforeAll[0] ??
        testInvocation.before[0] ??
        testInvocation.fn)) ??
    testEntry;

  return (first?.get(['allure2', 'start']) as number) ?? Number.NaN;
};
