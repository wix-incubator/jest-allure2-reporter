import type { ResolvedTestStepCustomizer } from 'jest-allure2-reporter';

import { stripStatusDetails } from '../utils';

export const testStep: ResolvedTestStepCustomizer = {
  name: ({ testStepMetadata }) => testStepMetadata.name,
  start: ({ testStepMetadata }) => testStepMetadata.start,
  stop: ({ testStepMetadata }) => testStepMetadata.stop,
  stage: ({ testStepMetadata }) => testStepMetadata.stage,
  status: ({ testStepMetadata }) => testStepMetadata.status,
  statusDetails: ({ testStepMetadata }) =>
    stripStatusDetails(testStepMetadata.statusDetails),
  attachments: ({ testStepMetadata }) => testStepMetadata.attachments ?? [],
  parameters: ({ testStepMetadata }) => testStepMetadata.parameters ?? [],
};
