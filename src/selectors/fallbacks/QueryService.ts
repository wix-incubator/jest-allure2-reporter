// eslint-disable-next-line node/no-unpublished-import
import type { Test, TestCaseResult } from '@jest/reporters';

import type { ReporterEmitter } from '../../ReporterEmitter';

export class QueryService {
  private _testMap = new Map<TestCaseResult, Test>();

  constructor(emitter: ReporterEmitter) {
    emitter.on('testCaseResult', (event) =>
      this._saveTestFilePath(event.test, event.testCaseResult),
    );
    emitter.on('testFileResult', (event) => {
      for (const testCaseResult of event.testResult.testResults) {
        this._saveTestFilePath(event.test, testCaseResult);
      }
    });
  }

  public getTest(testCaseResult: TestCaseResult): Test {
    return this._testMap.get(testCaseResult)!;
  }

  private _saveTestFilePath(test: Test, testCaseResult: TestCaseResult) {
    this._testMap.set(testCaseResult, test);
  }
}
