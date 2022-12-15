import type {
  Test,
  TestCaseResult,
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';

import { InterpolationChronograph } from './InterpolationChronograph';
import { getMetadata } from '../../extend-jest-report';

export class MetadataChronograph {
  private readonly _fallback = new InterpolationChronograph();

  public loadTest(test: Test): void {
    this._fallback.loadTest(test);
  }

  public loadTestResult(result: TestResult): void {
    this._fallback.loadTestResult(result);
  }

  getStartTime(testResult: TestResult | TestCaseResult): number {
    const { allure2 } = getMetadata(testResult);
    if (!allure2) {
      return this._fallback.getStartTime(testResult);
    }

    return (allure2 as any).startTime;
  }

  getEndTime(testResult: TestResult | TestCaseResult): number {
    const { allure2 } = getMetadata(testResult);
    if (!allure2) {
      return this._fallback.getEndTime(testResult);
    }

    const { startTime, duration } = allure2 as any; // TODO: fix type
    return startTime + duration;
  }
}
