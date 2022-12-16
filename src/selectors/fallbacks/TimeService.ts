import type { EventEmitter } from 'events';
import type {
  Test,
  TestCaseResult,
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';

export class TimeService {
  private _testFileStarts = new Map<string, number>();
  private _testFileEnds = new Map<string, number>();
  private _testCaseTimes = new Map<TestCaseResult, [number, number]>();

  constructor(
    private readonly _emitter: EventEmitter,
    private readonly _nowProvider = () => Date.now(),
  ) {
    this._emitter.on('testFileStart', (event: any) => this._onTestFileStart(event.test));
    this._emitter.on('testFileResult', (event: any) => this._onTestFileResult(event.test));
    this._emitter.on('testCaseResult', (event: any) =>
      this._onTestCaseResult(event.testCaseResult),
    );
  }

  getCaseStartTime(testCaseResult: TestCaseResult): number {
    return this._testCaseTimes.get(testCaseResult)?.[0] ?? Number.NaN;
  }

  getCaseEndTime(testCaseResult: TestCaseResult): number {
    return this._testCaseTimes.get(testCaseResult)?.[1] ?? Number.NaN;
  }

  getFileStartTime(testResult: TestResult): number {
    return this._testFileStarts.get(testResult.testFilePath) ?? Number.NaN;
  }

  getFileEndTime(testResult: TestResult): number {
    return this._testFileStarts.get(testResult.testFilePath) ?? Number.NaN;
  }

  private _onTestFileStart(test: Test): void {
    const now = this._nowProvider();
    this._testFileStarts.set(test.path, now);
  }

  private _onTestFileResult(test: Test): void {
    const now = this._nowProvider();
    this._testFileEnds.set(test.path, now);
  }

  private _onTestCaseResult(testCaseResult: TestCaseResult): void {
    const now = this._nowProvider();
    const duration = testCaseResult.duration ?? 0;
    this._testCaseTimes.set(testCaseResult, [now - duration, now]);
  }
}
