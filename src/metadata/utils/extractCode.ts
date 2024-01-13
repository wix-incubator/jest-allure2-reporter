import type { Metadata } from 'jest-metadata';
import type { AllureTestCaseMetadata } from 'jest-allure2-reporter';

import type { MetadataSquasherMapping } from '../MetadataSquasher';
import { CODE } from '../../constants';

export const extractCode: MetadataSquasherMapping<
  AllureTestCaseMetadata,
  'code'
> = ({ testInvocation }) => {
  if (!testInvocation) return '';

  const getCode = (functionName: string) => (metadata: Metadata) => {
    const code = metadata.get(CODE);
    return code ? `${functionName}(${code})` : '';
  };

  // TODO: fix this when we can
  return getCode('test')(testInvocation.definition);
};
