import type { ResolvedTestStepCustomizer } from 'jest-allure2-reporter';

import { stripStatusDetails } from '../utils';

export const testStep: ResolvedTestStepCustomizer = {
  hidden: ({ testStepMetadata }) =>
    testStepMetadata.sourceCode?.includes(
      "during setup, this cannot be null (and it's fine to explode if it is)",
    ),
  name: ({ testStepMetadata }) =>
    testStepMetadata.description?.at(-1) ?? testStepMetadata.hookType,
  start: ({ testStepMetadata }) => testStepMetadata.start,
  stop: ({ testStepMetadata }) => testStepMetadata.stop,
  stage: ({ testStepMetadata }) => testStepMetadata.stage,
  status: ({ testStepMetadata }) => testStepMetadata.status,
  statusDetails: ({ testStepMetadata }) =>
    stripStatusDetails(testStepMetadata.statusDetails),
  attachments: ({ testStepMetadata }) => testStepMetadata.attachments ?? [],
  parameters: ({ testStepMetadata }) => testStepMetadata.parameters ?? [],
};
