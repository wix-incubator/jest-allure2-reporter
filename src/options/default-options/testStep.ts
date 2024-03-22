import type {
  AllureTestStepMetadata,
  ReporterConfig,
  Stage,
  Status,
} from 'jest-allure2-reporter';

export const testStep: ReporterConfig['testStep'] = {
  hidden: () => false,
  $: ({ $ }) => $,
  name: ({ testStepMetadata }) =>
    testStepMetadata.displayName ||
    testStepMetadata.hookType ||
    'Untitled step',
  start: ({ testStepMetadata }) => testStepMetadata.start,
  stop: ({ testStepMetadata }) => testStepMetadata.stop,
  stage: ({ testStepMetadata }) => testStepMetadata.stage,
  status: ({ testStepMetadata }) =>
    testStepMetadata.status ?? inferStatus(testStepMetadata),
  statusDetails: ({ $, testStepMetadata }) =>
    $.stripAnsi(testStepMetadata.statusDetails),
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
