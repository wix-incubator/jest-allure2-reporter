import path from 'node:path';

import type { TestCaseResult } from '@jest/reporters';
import type {
  AllureTestStepMetadata,
  ExtractorContext,
  Label,
  ResolvedTestCaseCustomizer,
  Stage,
  Status,
  TestCaseCustomizer,
  TestCaseExtractorContext,
} from 'jest-allure2-reporter';

import {
  aggregateLabelCustomizers,
  composeExtractors,
  stripStatusDetails,
} from '../utils';
import { getStatusDetails } from '../../utils';

const identity = <T>(context: ExtractorContext<T>) => context.value;
const last = <T>(context: ExtractorContext<T[]>) => context.value?.at(-1);
const all = identity;

function extractCode(
  steps: AllureTestStepMetadata[] | undefined,
): string | undefined {
  return joinCode(steps?.map((step) => step.sourceCode));
}

function joinCode(
  code: undefined | (string | undefined)[],
): string | undefined {
  return code?.filter(Boolean).join('\n\n') || undefined;
}

export const testCase: ResolvedTestCaseCustomizer = {
  hidden: () => false,
  historyId: ({ testCase, testCaseMetadata }) =>
    testCaseMetadata.historyId ?? testCase.fullName,
  name: ({ testCase }) => testCase.title,
  fullName: ({ testCase }) => testCase.fullName,
  description: ({ testCaseMetadata }) => {
    const text = testCaseMetadata.description?.join('\n') ?? '';
    const before = extractCode(
      testCaseMetadata.steps?.filter(
        (step) =>
          step.hookType === 'beforeAll' || step.hookType === 'beforeEach',
      ),
    );
    const after = extractCode(
      testCaseMetadata.steps?.filter(
        (step) => step.hookType === 'afterAll' || step.hookType === 'afterEach',
      ),
    );
    const code = joinCode([before, testCaseMetadata.sourceCode, after]);
    const snippet = code ? '```javascript\n' + code + '\n```' : '';
    return [text, snippet].filter(Boolean).join('\n\n');
  },
  descriptionHtml: () => void 0,
  start: ({ testCase, testCaseMetadata }) =>
    testCaseMetadata.start ??
    (testCaseMetadata.stop ?? Date.now()) - (testCase.duration ?? 0),
  stop: ({ testCaseMetadata }) => testCaseMetadata.stop ?? Date.now(),
  stage: ({ testCase, testCaseMetadata }) =>
    testCaseMetadata.stage ?? getTestCaseStage(testCase),
  status: ({ testCase, testCaseMetadata }) =>
    testCaseMetadata.status ?? getTestCaseStatus(testCase),
  statusDetails: ({ testCase, testCaseMetadata }) =>
    stripStatusDetails(
      testCaseMetadata.statusDetails ??
        getStatusDetails((testCase.failureMessages ?? []).join('\n')),
    ),
  attachments: ({ testCaseMetadata }) => testCaseMetadata.attachments ?? [],
  parameters: ({ testCaseMetadata }) => testCaseMetadata.parameters ?? [],
  labels: composeExtractors<Label[], TestCaseExtractorContext<Label[]>>(
    aggregateLabelCustomizers({
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
      thread: ({ testFileMetadata }) => testFileMetadata.workerId,
      severity: last,
      tag: all,
      owner: last,
    } as TestCaseCustomizer['labels']),
    ({ testCaseMetadata }) => testCaseMetadata.labels ?? [],
  ),
  links: ({ testCaseMetadata }) => testCaseMetadata.links ?? [],
};

function getTestCaseStatus(testCase: TestCaseResult): Status {
  const hasErrors = testCase.failureMessages?.length > 0;
  const hasBuiltinErrors =
    hasErrors && testCase.failureMessages.some(looksLikeBroken);

  switch (testCase.status) {
    case 'passed': {
      return 'passed';
    }
    case 'failed': {
      return hasBuiltinErrors ? 'broken' : 'failed';
    }
    case 'skipped': {
      return 'skipped';
    }
    case 'pending':
    case 'todo':
    case 'disabled': {
      return 'skipped';
    }
    case 'focused': {
      return hasErrors ? 'failed' : 'passed';
    }
    default: {
      return 'unknown' as Status;
    }
  }
}

// TODO: include JestAllure2Error as well
function looksLikeBroken(errorMessage: string): boolean {
  return errorMessage
    ? errorMessage.startsWith('Error: \n') ||
        errorMessage.startsWith('EvalError:') ||
        errorMessage.startsWith('RangeError:') ||
        errorMessage.startsWith('ReferenceError:') ||
        errorMessage.startsWith('SyntaxError:') ||
        errorMessage.startsWith('TypeError:') ||
        errorMessage.startsWith('URIError:')
    : true;
}

function getTestCaseStage(testCase: TestCaseResult): Stage {
  switch (testCase.status) {
    case 'passed':
    case 'focused': {
      return 'finished';
    }
    case 'todo':
    case 'disabled':
    case 'pending':
    case 'skipped': {
      return 'pending';
    }
    default: {
      return 'interrupted';
    }
  }
}
