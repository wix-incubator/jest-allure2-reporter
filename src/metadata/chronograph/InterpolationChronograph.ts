import type {
  Test,
  TestCaseResult,
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';
import { isTestCaseResult } from '../utils/reporterPredicates';

export class InterpolationChronograph {
  private _testStarts = new Map<string, number>();
  private _testCaseStarts = new Map<TestCaseResult, number>();
  private _testCaseEnds = new Map<TestCaseResult, number>();

  loadTest(test: Test): void {
    this._testStarts.set(test.path, Date.now());
  }

  loadTestResult(result: TestResult): void {
    const nettoDuration = result.testResults.reduce((sum, t) => sum + (t.duration ?? 0), 0);
    const bruttoDuration = result.perfStats.end - result.perfStats.start;
    const testsCount = result.testResults.length;
    const padding = (bruttoDuration - nettoDuration) / (testsCount + 1);

    let time = result.perfStats.start;
    for (const testCase of result.testResults) {
      this._testCaseStarts.set(testCase, (time += padding));
      this._testCaseEnds.set(testCase, (time += testCase.duration ?? 0));
    }
  }

  getStartTime(testResult: TestResult | TestCaseResult): number {
    if (isTestCaseResult(testResult)) {
      return this._testCaseEnds.get(testResult) ?? Number.NaN;
    }

    return (
      testResult.perfStats.start ?? this._testStarts.get(testResult.testFilePath) ?? Number.NaN
    );
  }

  getEndTime(testResult: TestResult | TestCaseResult): number {
    if (isTestCaseResult(testResult)) {
      return this._testCaseEnds.get(testResult) ?? Number.NaN;
    }

    return testResult.perfStats.end ?? this._testStarts.get(testResult.testFilePath) ?? Number.NaN;
  }
}
