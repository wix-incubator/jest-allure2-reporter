import { EventEmitter } from 'node:events';
import path from 'node:path';

import type {
  AggregatedResult,
  Config,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestContext,
  TestResult,
} from '@jest/reporters';
import { AllureRuntime } from '@noomorph/allure-js-commons';
import { JestMetadataReporter } from 'jest-metadata/reporter';
import rimraf from 'rimraf';

import type { ReporterOptions } from './ReporterOptions';
import type { ReporterEmitter } from './ReporterEmitter';
import { TestRunContext } from './context';
import { Selectors } from './selectors';

export class JestAllure2Reporter extends JestMetadataReporter {
  // eslint-disable-next-line unicorn/prefer-event-target
  private readonly _emitter = new EventEmitter() as ReporterEmitter;
  private readonly _options: Partial<ReporterOptions>;
  private readonly _testRunContext: TestRunContext;

  constructor(
    globalConfig: Config.GlobalConfig,
    options: Partial<ReporterOptions>,
  ) {
    super(globalConfig, options);

    this._options = options;
    this._options.resultsDir =
      this._options.resultsDir ??
      path.resolve(options.resultsDir ?? 'allure-results');
    if (this._options.overwriteResultsDir !== false) {
      rimraf.sync(this._options.resultsDir);
    }

    this._testRunContext = new TestRunContext({
      allureRuntime: new AllureRuntime({
        resultsDir: this._options.resultsDir,
      }),
      environmentInfo: options.environment ?? true,
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
    await super.onRunStart(aggregatedResult, options);

    this._emitter.emit('runStart', { aggregatedResult, options });
    await this._testRunContext.writeMetadata();
  }

  onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    this._emitter.emit('testFileStart', { test });
    this._testRunContext.registerFileContext(test);
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);
    this._emitter.emit('testCaseResult', { test, testCaseResult });

    const fileContext = this._testRunContext.getFileContext(test.path)!;
    fileContext.handleTestCaseResult(testCaseResult);
  }

  onTestFileResult(
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ): Promise<void> | void {
    super.onTestFileResult(test, testResult, aggregatedResult);
    this._emitter.emit('testFileResult', {
      test,
      testResult,
      aggregatedResult,
    });

    const fileContext = this._testRunContext.getFileContext(test.path)!;
    fileContext.handleTestFileResult(testResult);
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    aggregatedResult: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, aggregatedResult);
    this._emitter.emit('runComplete', { testContexts, aggregatedResult });
  }

  getLastError(): Error | void {
    // TODO: investigate what this method is for
  }
}
