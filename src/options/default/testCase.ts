import path from 'node:path';

import type { TestCaseResult } from '@jest/reporters';
import type {
  Stage,
  Status,
  TestCaseCustomizer,
  TestCaseExtractorContext,
} from 'jest-allure2-reporter';

import { compose2 } from '../common';
import * as custom from '../custom';
import { getStatusDetails, isNonNullish } from '../../utils';

export const testCase: TestCaseCustomizer<TestCaseExtractorContext> = {
  ignored: () => false,
  historyId: ({ testCase, testCaseMetadata }) => testCaseMetadata.historyId ?? testCase.fullName,
  displayName: ({ testCase, testCaseMetadata }) => testCaseMetadata.displayName ?? testCase.title,
  fullName: ({ testCase, testCaseMetadata }) => testCaseMetadata.fullName ?? testCase.fullName,
  description: async ({ $, testCaseMetadata }) => {
    const text = testCaseMetadata.description?.join('\n\n') ?? '';
    const codes = await $.extractSourceCode(testCaseMetadata, true);
    const snippets = codes.map($.source2markdown);
    return [text, ...snippets].filter(isNonNullish).join('\n\n');
  },
  descriptionHtml: async ({ $, result }) =>
    $.markdown2html?.((await result.description) ?? '') ?? '',
  start: ({ testCase, testCaseMetadata }) =>
    testCaseMetadata.start ?? (testCaseMetadata.stop ?? Date.now()) - (testCase.duration ?? 0),
  stop: ({ testCaseMetadata }) => testCaseMetadata.stop ?? Date.now(),
  stage: ({ testCase, testCaseMetadata }) => testCaseMetadata.stage ?? getTestCaseStage(testCase),
  status: ({ testCase, testCaseMetadata }) =>
    testCaseMetadata.status ?? getTestCaseStatus(testCase),
  statusDetails: ({ $, testCase, testCaseMetadata }) =>
    $.stripAnsi(
      testCaseMetadata.statusDetails ??
        getStatusDetails((testCase.failureMessages ?? []).join('\n')),
    ),
  attachments: ({ testCaseMetadata }) => testCaseMetadata.attachments ?? [],
  parameters: ({ testCaseMetadata }) => testCaseMetadata.parameters ?? [],
  labels: compose2(
    custom.labels<TestCaseExtractorContext>({
      suite: ({ testCase, testFile }) =>
        testCase.ancestorTitles[0] ?? path.basename(testFile.testFilePath),
      subSuite: ({ testCase }) => testCase.ancestorTitles.slice(1).join(' '),
      thread: ({ testCaseMetadata }) => testCaseMetadata.workerId,
    }),
    ({ testCaseMetadata }) => testCaseMetadata.labels ?? [],
  ),
  links: ({ testCaseMetadata }) => testCaseMetadata.links ?? [],
};

function getTestCaseStatus(testCase: TestCaseResult): Status {
  const hasErrors = testCase.failureMessages?.length > 0;
  const hasBuiltinErrors = hasErrors && testCase.failureMessages.some(looksLikeBroken);

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
