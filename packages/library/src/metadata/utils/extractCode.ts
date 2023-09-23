import type { HookInvocationMetadata } from 'jest-metadata';
import type { Metadata } from 'jest-metadata';

import type { MetadataSquasherMapping } from '../MetadataSquasher';
import type { AllureTestCaseMetadata } from '../metadata';

export const extractCode: MetadataSquasherMapping<
  AllureTestCaseMetadata,
  'code'
> = ({ testInvocation }) => {
  if (!testInvocation) return [];

  const getHookDefinition = (metadata: HookInvocationMetadata) =>
    metadata.definition;
  const getCode = (functionName: string) => (metadata: Metadata) => {
    const code = metadata.get(['allure2', 'code']);
    return code ? `${functionName}(${code})` : '';
  };

  return [
    ...testInvocation.beforeAll
      .map(getHookDefinition)
      .map(getCode('beforeAll')),
    ...testInvocation.beforeEach
      .map(getHookDefinition)
      .map(getCode('beforeEach')),
    getCode('test')(testInvocation.definition),
    ...testInvocation.afterEach
      .map(getHookDefinition)
      .map(getCode('afterEach')),
    ...testInvocation.afterAll.map(getHookDefinition).map(getCode('afterAll')),
  ].filter(Boolean);
};
