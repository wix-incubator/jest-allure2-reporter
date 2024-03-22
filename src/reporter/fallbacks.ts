import type { Test } from '@jest/reporters';
import type {
  AllureTestItemMetadata,
  AllureTestFileMetadata,
} from 'jest-allure2-reporter';

import type { AllureMetadataProxy } from '../metadata';

import { ThreadService } from './ThreadService';

const threadService = new ThreadService();

export async function onTestFileStart(
  test: Test,
  testFileMetadata: AllureMetadataProxy<AllureTestFileMetadata>,
) {
  const threadId = threadService.allocateThread(test.path);

  testFileMetadata.assign({
    sourceLocation: { fileName: test.path },
    start: Date.now(),
    workerId: String(1 + threadId),
  });
}

export async function onTestCaseResult(
  testCaseMetadata: AllureMetadataProxy<AllureTestItemMetadata>,
) {
  const stop = testCaseMetadata.get('stop') ?? Number.NaN;
  if (Number.isNaN(stop)) {
    testCaseMetadata.set('stop', Date.now());
  }
}

export async function onTestFileResult(
  test: Test,
  testFileMetadata: AllureMetadataProxy<AllureTestFileMetadata>,
) {
  testFileMetadata.set('stop', Date.now());
  threadService.freeThread(test.path);
}
