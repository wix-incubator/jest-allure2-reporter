import type {
  Test,
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';

import { MetadataThreadAllocator } from './threads/MetadataThreadAllocator';
import { MetadataChronograph } from './chronograph/MetadataChronograph';

export class MetadataExtractor {
  public readonly chronograph = new MetadataChronograph();
  public readonly thread = new MetadataThreadAllocator();

  public loadTest(test: Test) {
    this.chronograph.loadTest(test);
  }

  public loadTestResult(result: TestResult): void {
    this.chronograph.loadTestResult(result);
    this.thread.loadTestResult(result);
  }
}
