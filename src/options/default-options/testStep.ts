import type {
  AllureTestStepMetadata,
  Stage,
  Status,
  ResolvedTestStepCustomizer,
} from 'jest-allure2-reporter';

import { stripStatusDetails } from '../utils';

export const testStep: ResolvedTestStepCustomizer = {
  hidden: () => false,
  name: ({ testStepMetadata }) =>
    testStepMetadata.title ?? testStepMetadata.hookType,
  start: ({ testStepMetadata }) => testStepMetadata.start,
  stop: ({ testStepMetadata }) => testStepMetadata.stop,
  stage: ({ testStepMetadata }) => testStepMetadata.stage,
  status: ({ testStepMetadata }) =>
    testStepMetadata.status ?? inferStatus(testStepMetadata),
  statusDetails: ({ testStepMetadata }) =>
    stripStatusDetails(testStepMetadata.statusDetails),
  attachments: ({ testStepMetadata }) => testStepMetadata.attachments ?? [],
  parameters: ({ testStepMetadata }) => testStepMetadata.parameters ?? [],
};

function inferStatus({ stage }: AllureTestStepMetadata): Status {
  return (stage && statuses[stage]) || 'unknown';
}

const statuses: Partial<Record<Stage, Status>> = {
  finished: 'passed',
  interrupted: 'broken',
};
