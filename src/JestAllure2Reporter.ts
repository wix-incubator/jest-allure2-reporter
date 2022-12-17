import { EventEmitter } from 'events';
import path from 'path';

import {
  AggregatedResult,
  Config,
  Reporter,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestContext,
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';
import { AllureRuntime } from 'allure-js-commons';

import type { JestAllure2ReporterOptions } from './JestAllure2ReporterOptions';
import type { ReporterEmitter } from './ReporterEmitter';
import { TestRunContext } from './context';
import { Selectors } from './selectors';

export default class JestAllure2Reporter implements Reporter {
  private readonly _emitter = new EventEmitter() as ReporterEmitter;
  private readonly _testRunContext: TestRunContext;

  constructor(globalConfig: Config.GlobalConfig, options: Partial<JestAllure2ReporterOptions>) {
    this._testRunContext = new TestRunContext({
      allureRuntime: new AllureRuntime({
        resultsDir: path.resolve(options.resultsDir ?? 'allure-results'),
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
    this._emitter.emit('testFileResult', { test, testResult, aggregatedResult });

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
