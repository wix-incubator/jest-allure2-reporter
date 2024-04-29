import type { Test, TestCaseResult } from '@jest/reporters';
import type { AllureTestItemMetadata, AllureTestFileMetadata } from 'jest-allure2-reporter';

import type { AllureMetadataProxy } from '../metadata';

import { ThreadService } from './ThreadService';

const threadService = new ThreadService();

export async function onTestFileStart(
  test: Test,
  testFileMetadata: AllureMetadataProxy<AllureTestFileMetadata>,
) {
  const threadId = threadService.allocateThread(test.path);

  testFileMetadata
    .assign({
      sourceLocation: { fileName: test.path },
      start: Date.now(),
    })
    .push('labels', [{ name: 'thread', value: String(1 + threadId).padStart(2, '0') }]);
}

export async function onTestCaseResult(
  test: Test,
  testCaseResult: TestCaseResult,
  testCaseMetadata: AllureMetadataProxy<AllureTestItemMetadata>,
) {
  const stop = testCaseMetadata.get('stop') ?? Number.NaN;
  if (Number.isNaN(stop)) {
    testCaseMetadata.set('stop', Date.now());
  }

  if (testCaseResult.location) {
    testCaseMetadata.defaults({
      sourceLocation: {
        fileName: test.path,
        lineNumber: testCaseResult.location.line,
        columnNumber: testCaseResult.location.column + 1,
      },
    });
  }
}

export async function onTestFileResult(
  test: Test,
  testFileMetadata: AllureMetadataProxy<AllureTestFileMetadata>,
) {
  testFileMetadata.set('stop', Date.now());
  threadService.freeThread(test.path);
}
