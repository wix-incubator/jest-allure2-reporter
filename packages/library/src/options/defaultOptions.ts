import path from 'node:path';

import type { TestCaseResult } from '@jest/reporters';
import type { StatusDetails } from '@noomorph/allure-js-commons';
import { Stage, Status } from '@noomorph/allure-js-commons';

import type {
  ExtractorContext,
  ReporterConfig,
  ResolvedTestCaseCustomizer,
  ResolvedTestStepCustomizer,
} from './ReporterOptions';
import { aggregateLabelCustomizers } from './aggregateLabelCustomizers';

const identity = <T>(context: ExtractorContext<T>) => context.value;
const last = <T>(context: ExtractorContext<T[]>) => context.value?.at(-1);
const all = identity;

export function defaultOptions(): ReporterConfig {
  const testCase: ResolvedTestCaseCustomizer = {
    historyId: ({ testCase }) => testCase.fullName,
    name: ({ testCase }) => testCase.title,
    fullName: ({ testCase }) => testCase.fullName,
    description: ({ testCaseMetadata }) => {
      return '```javascript\n' + testCaseMetadata.code + '\n```';
    },
    descriptionHtml: () => void 0,
    stage: ({ testCase }) => getTestCaseStage(testCase),
    status: ({ testCase }) => getTestCaseStatus(testCase),
    statusDetails: ({ testCase }) => getTestCaseStatusDetails(testCase),
    attachments: ({ testCaseMetadata }) => testCaseMetadata.attachments,
    parameters: ({ testCaseMetadata }) => testCaseMetadata.parameters,
    labels: aggregateLabelCustomizers({
      package: last,
      testClass: last,
      testMethod: last,
      parentSuite: last,
      suite: ({ testCase, testFile }) =>
        testCase.ancestorTitles[0] ?? path.basename(testFile.testFilePath),
      subSuite: ({ testCase }) => testCase.ancestorTitles.slice(1).join(' '),
      epic: all,
      feature: all,
      story: all,
      thread: ({ testCaseMetadata }) => testCaseMetadata.workerId,
      severity: last,
      tag: all,
      owner: last,
    })!,
    links: all,
  };

  const testStep: ResolvedTestStepCustomizer = {
    name: ({ testStep }) => testStep.name,
    stage: ({ testStep }) => testStep.stage,
    status: ({ testStep }) => testStep.status,
    statusDetails: ({ testStep }) => testStep.statusDetails,
    attachments: ({ testStep }) => testStep.attachments,
    parameters: ({ testStep }) => testStep.parameters,
  };

  return {
    overwrite: true,
    resultsDir: 'allure-results',
    testCase,
    testStep,
    environment: identity,
    executor: identity,
    categories: identity,
  };
}

function getTestCaseStatus(testCase: TestCaseResult): Status {
  const hasErrors = testCase.failureMessages?.length > 0;
  // TODO: Add support for 'broken' status
  switch (testCase.status) {
    case 'passed': {
      return Status.PASSED;
    }
    case 'failed': {
      return Status.FAILED;
    }
    case 'skipped': {
      return Status.SKIPPED;
    }
    case 'pending':
    case 'todo':
    case 'disabled': {
      return Status.SKIPPED;
    }
    case 'focused': {
      return hasErrors ? Status.FAILED : Status.PASSED;
    }
    default: {
      return 'unknown' as Status;
    }
  }
}

function getTestCaseStage(testCase: TestCaseResult): Stage {
  switch (testCase.status) {
    case 'passed':
    case 'focused':
    case 'failed': {
      return Stage.FINISHED;
    }
    case 'todo':
    case 'disabled':
    case 'pending':
    case 'skipped': {
      return Stage.PENDING;
    }
    default: {
      return Stage.INTERRUPTED;
    }
  }
}

function getTestCaseStatusDetails(
  testCase: TestCaseResult,
): StatusDetails | undefined {
  const message = (testCase.failureMessages ?? []).join('\n');
  return message
    ? {
        message: message.split('\n', 1)[0],
        trace: message,
      }
    : undefined;
}
