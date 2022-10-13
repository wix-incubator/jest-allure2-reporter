// eslint-disable-next-line node/no-unpublished-import
import fs from 'fs-extra';
import path from 'path';

// eslint-disable-next-line node/no-unpublished-import
import type { AggregatedResult, Config, ReporterOnStartOptions, TestResult } from '@jest/reporters';

class DumpReporter {
  private readonly _rootDir: string;

  constructor(globalConfig: Config.GlobalConfig) {
    this._rootDir = globalConfig.rootDir;
  }

  onRunStart(
    aggregatedResult: AggregatedResult,
    _options: ReporterOnStartOptions,
  ): Promise<void> | void {
    const outFile = path.join(this._rootDir, '__fixtures__/results/_run-start.json');

    console.log('Dumping run start into: %s', outFile);
    fs.ensureFileSync(outFile);
    fs.writeFileSync(outFile, JSON.stringify(aggregatedResult, undefined, 2));
  }

  public onTestResult(_: unknown, testResult: TestResult) {
    const testsDirectory = path.join(this._rootDir, '__fixtures__/tests');
    const relativePath = path.relative(testsDirectory, testResult.testFilePath);
    const outFile = path.join(
      this._rootDir,
      '__fixtures__',
      'results',
      path.dirname(relativePath),
      path.basename(testResult.testFilePath, '.test.js') + '.json',
    );

    console.log('Dumping test result into: %s', outFile);
    fs.ensureFileSync(outFile);
    fs.writeFileSync(outFile, JSON.stringify(testResult, undefined, 2));
  }
}

module.exports = DumpReporter;
