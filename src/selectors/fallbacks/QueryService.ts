import type { EventEmitter } from 'events';
// eslint-disable-next-line node/no-unpublished-import
import type { Test, TestCaseResult } from '@jest/reporters';

export class QueryService {
  private _testMap = new Map<TestCaseResult, Test>();

  constructor(emitter: EventEmitter) {
    emitter.on('testCaseResult', (event: any) =>
      this._saveTestFilePath(event.test, event.testCaseResult),
    );
  }

  public getTest(testCaseResult: TestCaseResult): Test {
    return this._testMap.get(testCaseResult)!;
  }

  private _saveTestFilePath(test: Test, testCaseResult: TestCaseResult) {
    this._testMap.set(testCaseResult, test);
  }
}
