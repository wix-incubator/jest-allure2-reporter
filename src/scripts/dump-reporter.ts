// eslint-disable-next-line node/no-unpublished-import
import fs from 'fs-extra';
import path from 'path';

import type {
  AggregatedResult,
  Config,
  Reporter,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestResult,
  TestContext,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';

class DumpReporter implements Reporter {
  private readonly _rootDir: string;
  private readonly _outFile: string;

  constructor(globalConfig: Config.GlobalConfig) {
    this._rootDir = globalConfig.rootDir;
    this._outFile = path.join(this._rootDir, '__fixtures__/test-reporter-calls.json');
  }

  onRunStart(
    aggregatedResult: AggregatedResult,
    options: ReporterOnStartOptions,
  ): Promise<void> | void {
    console.log('Starting dump: %s', this._outFile);
    fs.ensureFileSync(this._outFile);
    fs.writeFileSync(this._outFile, '');

    this._append({ method: 'onRunStart', params: [aggregatedResult, options] });
  }

  onTestFileStart(test: Test): void {
    this._append({ method: 'onTestFileStart', params: [test] });
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult): void {
    this._append({ method: 'onTestCaseResult', params: [test, testCaseResult] });
  }

  onTestFileResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult): void {
    this._append({ method: 'onTestFileResult', params: [test, testResult, aggregatedResult] });
  }

  onRunComplete(_testContexts: Set<TestContext>, results: AggregatedResult): void {
    this._append({ method: 'onRunComplete', params: [{}, results] });
  }

  _append(payload: any): void {
    console.log('Append: %s', payload.method);
    fs.appendFileSync(this._outFile, JSON.stringify(payload) + '\n');
  }

  getLastError = () => {
    return void 0;
  };
}

module.exports = DumpReporter;
