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
import { query, JestMetadataReporter } from 'jest-metadata/reporter';
import rimraf from 'rimraf';
import { AllureRuntime } from '@noomorph/allure-js-commons';

import type {
  GlobalExtractorContext,
  ReporterOptions,
  AllureRunMetadata,
  AllureTestCaseMetadata,
} from './ReporterOptions';
import { resolveOptions } from './options';

const NAMESPACE = 'allure2' as const;

export class JestAllure2Reporter extends JestMetadataReporter {
  private readonly _allure: AllureRuntime;
  private readonly _options: ReporterOptions;
  private readonly _globalContext: GlobalExtractorContext<any>;

  constructor(
    globalConfig: Config.GlobalConfig,
    options: Partial<ReporterOptions>,
  ) {
    super(globalConfig, options);

    this._options = resolveOptions(options);
    this._allure = new AllureRuntime({
      resultsDir: this._options.resultsDir,
    });

    this._globalContext = {
      cwd: process.cwd(),
      package: require(path.join(process.cwd(), 'package.json')),
      value: undefined,
    };
  }

  async onRunStart(
    aggregatedResult: AggregatedResult,
    options: ReporterOnStartOptions,
  ): Promise<void> {
    await super.onRunStart(aggregatedResult, options);

    if (this._options.overwrite) {
      rimraf.sync(this._options.resultsDir);
    }

    const environment = this._options.environment(this._globalContext);
    if (environment) {
      this._allure.writeEnvironmentInfo(environment);
    }

    const executor = this._options.executor(this._globalContext);
    if (executor) {
      this._allure.writeExecutorInfo(executor);
    }
  }

  onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    const run = query.test(test)!.get(NAMESPACE, {}) as AllureRunMetadata;
    run.startedAt = Date.now();
    run.threadId = '1';
  }

  onTestCaseStart(_test: unknown, _testCaseStartInfo: unknown) {
    super.onTestCaseStart(_test, _testCaseStartInfo);

    const testEntry = query.testCaseResult(testCaseResult)!;
    const metadata = testEntry.get(NAMESPACE, {}) as AllureTestCaseMetadata;

    metadata.start = Date.now();
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);

    const testEntry = query.testCaseResult(testCaseResult)!;
    const metadata = testEntry.get(NAMESPACE, {}) as AllureTestCaseMetadata;

    metadata.identifier = testEntry.id;
    metadata.start =
      metadata.start ?? Date.now() - (testCaseResult.duration ?? 0);
    metadata.stop = Date.now();
  }

  onTestFileResult(
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ): Promise<void> | void {
    super.onTestFileResult(test, testResult, aggregatedResult);

    const run = query.test(test)!.get(NAMESPACE, {}) as AllureRunMetadata;
    const fileContext = this._testRunContext.getFileContext(test.path)!;
    fileContext.handleTestFileResult(testResult);
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    aggregatedResult: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, aggregatedResult);
  }

  getLastError(): Error | void {
    // TODO: investigate what this method is for
  }
}
