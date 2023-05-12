import { EventEmitter } from 'node:events';
import path from 'node:path';

import type {
  AggregatedResult,
  Config,
  Reporter,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestContext,
  TestResult,
} from '@jest/reporters';
import { AllureRuntime } from 'allure-js-commons';
import rimraf from 'rimraf';

import type { JestAllure2ReporterOptions } from './JestAllure2ReporterOptions';
import type { ReporterEmitter } from './ReporterEmitter';
import { TestRunContext } from './context';
import { Selectors } from './selectors';

export default class JestAllure2Reporter implements Reporter {
  private readonly _emitter = new EventEmitter() as ReporterEmitter;
  private readonly _options: Partial<JestAllure2ReporterOptions>;
  private readonly _testRunContext: TestRunContext;

  constructor(
    globalConfig: Config.GlobalConfig,
    options: Partial<JestAllure2ReporterOptions>,
  ) {
    this._options = options;
    this._options.resultsDir ??= path.resolve(
      options.resultsDir ?? 'allure-results',
    );
    if (this._options.overwriteResultsDir !== false) {
      rimraf.sync(this._options.resultsDir);
    }

    this._testRunContext = new TestRunContext({
      allureRuntime: new AllureRuntime({
        resultsDir: this._options.resultsDir,
      }),
      getEnvironmentInfo: options.getEnvironmentInfo ?? true,
      select: new Selectors({
        emitter: this._emitter,
        reporterOptions: options,
        rootDir: globalConfig.rootDir,
      }),
      rootDir: globalConfig.rootDir,
    });
  }

  async onRunStart(
    aggregatedResult: AggregatedResult,
    options: ReporterOnStartOptions,
  ): Promise<void> {
    this._emitter.emit('runStart', { aggregatedResult, options });
    await this._testRunContext.writeMetadata();
  }

  onTestFileStart(test: Test) {
    this._emitter.emit('testFileStart', { test });
    this._testRunContext.registerFileContext(test);
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    this._emitter.emit('testCaseResult', { test, testCaseResult });

    const fileContext = this._testRunContext.getFileContext(test)!;
    fileContext.handleTestCaseResult(testCaseResult);
  }

  onTestFileResult(
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ): Promise<void> | void {
    this._emitter.emit('testFileResult', {
      test,
      testResult,
      aggregatedResult,
    });

    const fileContext = this._testRunContext.getFileContext(test)!;
    fileContext.handleTestFileResult(testResult);
  }

  onRunComplete(
    testContexts: Set<TestContext>,
    aggregatedResult: AggregatedResult,
  ): Promise<void> | void {
    this._emitter.emit('runComplete', { testContexts, aggregatedResult });
  }

  getLastError(): Error | void {
    // TODO: investigate what this method is for
  }
}
