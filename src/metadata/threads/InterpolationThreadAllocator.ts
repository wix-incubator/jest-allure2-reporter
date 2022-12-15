import type {
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';

import ParallelTimeline from './ParallelTimeline';

export class InterpolationThreadAllocator {
  private readonly _timeline: ParallelTimeline;

  private readonly _threads = new Map<TestResult, number>();

  constructor() {
    this._timeline = new ParallelTimeline();
  }

  allocateThread(result: TestResult): void {
    const threadId = this._timeline.allocate(result.perfStats.start, result.perfStats.end);
    this._threads.set(result, 1 + threadId);
  }

  getThreadId(testResult: TestResult): number {
    return this._threads.get(testResult) ?? Number.NaN;
  }
}
