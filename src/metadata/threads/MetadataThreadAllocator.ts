import type {
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';

import { InterpolationThreadAllocator } from './InterpolationThreadAllocator';
import { getMetadata } from '../../extend-jest-report';

export class MetadataThreadAllocator {
  private readonly _fallback = new InterpolationThreadAllocator();

  loadTestResult(result: TestResult): void {
    this._fallback.allocateThread(result);
  }

  getThreadId(testResult: TestResult): number {
    const { allure2 } = getMetadata(testResult);
    if (!allure2) {
      return this._fallback.getThreadId(testResult);
    }

    return (allure2 as any).threadId; // TODO: fix type
  }
}
