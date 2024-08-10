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
import JestMetadataReporter from 'jest-metadata/reporter';
import type {
  AllureTestRunMetadata,
  AllureTestCaseMetadata,
  AllureTestFileMetadata,
  Helpers,
  PropertyExtractorContext,
  ReporterOptions,
  TestCaseExtractorContext,
  TestFileExtractorContext,
  TestRunExtractorContext,
  GlobalExtractorContext,
} from 'jest-allure2-reporter';

import { type ReporterConfig, resolveOptions } from '../options';
import { AllureMetadataProxy, MetadataSquasher } from '../metadata';
import { compactArray, FileNavigatorCache, stringifyValues } from '../utils';
import { type AllureWriter, FileAllureWriter } from '../serialization';
import { log, optimizeForTracing } from '../logger';

import * as fallbacks from './fallbacks';
import { postProcessMetadata } from './postProcessMetadata';
import { writeTest } from './allureCommons';
import { resolvePromisedItem, resolvePromisedTestCase } from './resolveTestItem';

const NOT_INITIALIZED = null as any;

const __TID = optimizeForTracing((test?: Test) => ({
  tid: ['jest-allure2-reporter', test ? test.path : 'run'],
}));

const __TID_NAME = optimizeForTracing((test: Test, testCaseResult: TestCaseResult) => ({
  tid: ['jest-allure2-reporter', test.path],
  fullName: testCaseResult.fullName,
}));

export class JestAllure2Reporter extends JestMetadataReporter {
  private readonly _globalConfig: Config.GlobalConfig;
  private readonly _options: ReporterOptions;
  private _globalContext: GlobalExtractorContext = NOT_INITIALIZED;
  private _writer: AllureWriter = NOT_INITIALIZED;
  private _config: ReporterConfig<void> = NOT_INITIALIZED;
  private _globalMetadataProxy: AllureMetadataProxy<AllureTestRunMetadata> = NOT_INITIALIZED;

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig);

    this._globalConfig = globalConfig;
    this._options = options;
  }

  async #init() {
    this._config = await resolveOptions(this._globalConfig.rootDir, this._options);
    this._writer = new FileAllureWriter({
      resultsDir: this._config.resultsDir,
      overwrite: this._config.overwrite,
    });

    await this._writer.init?.();

    const testRunMetadata = JestAllure2Reporter.query.globalMetadata();
    this._globalMetadataProxy = new AllureMetadataProxy<AllureTestRunMetadata>(testRunMetadata);
    this._globalMetadataProxy.set('config', {
      resultsDir: this._config.resultsDir,
      overwrite: this._config.overwrite,
      attachments: this._config.attachments,
      injectGlobals: this._config.injectGlobals,
    });
  }

  async #attempt(name: string, function_: () => unknown) {
    try {
      await function_.call(this);
    } catch (error: unknown) {
      log.error(error, `Caught unhandled error in JestAllure2Reporter#${name}`);
    }
  }

  async #attemptSync(name: string, function_: () => unknown) {
    try {
      function_.call(this);
    } catch (error: unknown) {
      log.error(error, `Caught unhandled error in JestAllure2Reporter#${name}`);
    }
  }

  async onRunStart(
    aggregatedResult: AggregatedResult,
    options: ReporterOnStartOptions,
  ): Promise<void> {
    await super.onRunStart(aggregatedResult, options);
    const attemptRunStart = this.#attempt.bind(this, 'onRunStart()', this.#onRunStart);

    await log.trace.begin(__TID(), 'jest-allure2-reporter');
    await log.trace.complete(__TID(), 'init', this.#init.bind(this));
    await log.trace.complete(__TID(), 'onRunStart', attemptRunStart);
  }

  async #onRunStart() {
    const reporterConfig = this._config;
    const allureWriter = this._writer;

    const globalContext = {
      $: {} as Helpers,
      globalConfig: this._globalConfig,
      reporterConfig,
      value: undefined,
    };

    globalContext.$ = await resolvePromisedItem(globalContext, reporterConfig.helpers, '$');

    if (reporterConfig.sourceCode.enabled) {
      const { factories, options, plugins } = reporterConfig.sourceCode;
      const maybePlugins = await Promise.all(
        Object.entries(factories).map(async ([key, factory]) =>
          factory({
            ...globalContext,
            value: options[key],
          }),
        ),
      );

      plugins.push(...compactArray(maybePlugins));
    }

    this._globalContext = globalContext;

    const environment = await reporterConfig.environment(globalContext);
    if (environment) {
      await allureWriter.writeEnvironmentInfo(stringifyValues(environment));
    }

    const executor = await reporterConfig.executor(globalContext);
    if (executor) {
      await allureWriter.writeExecutorInfo(executor);
    }

    const categories = await reporterConfig.categories(globalContext);
    if (categories) {
      await allureWriter.writeCategories(categories);
    }
  }

  async onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    const execute = this.#onTestFileStart.bind(this, test);
    const attempt = this.#attemptSync.bind(this, 'onTestFileStart()', execute);
    const testPath = path.relative(this._globalConfig.rootDir, test.path);
    log.trace.begin(__TID(test), testPath);
    await log.trace.complete(__TID(test), 'onTestFileStart', attempt);
  }

  async #onTestFileStart(test: Test) {
    await FileNavigatorCache.instance.scanSourcemap(test.path);

    const rawMetadata = JestAllure2Reporter.query.test(test);
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(rawMetadata);

    fallbacks.onTestFileStart(test, testFileMetadata);
  }

  async onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);

    const execute = this.#onTestCaseResult.bind(this, test, testCaseResult);
    const attempt = this.#attempt.bind(this, 'onTestCaseResult()', execute);
    log.trace.complete(__TID_NAME(test, testCaseResult), testCaseResult.title, attempt);
  }

  #onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    const testCaseMetadata = new AllureMetadataProxy<AllureTestCaseMetadata>(
      JestAllure2Reporter.query.testCaseResult(testCaseResult).lastInvocation!,
    );

    fallbacks.onTestCaseResult(test, testCaseResult, testCaseMetadata);
  }

  async onTestFileResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult) {
    await super.onTestFileResult(test, testResult, aggregatedResult);

    const execute = this.#onTestFileResult.bind(this, test, testResult);
    const attempt = this.#attempt.bind(this, 'onTestFileResult()', execute);
    await log.trace.complete(__TID(test), 'onTestFileResult', attempt);
    log.trace.end(__TID(test));
  }

  async #onTestFileResult(test: Test, testResult: TestResult) {
    const rawMetadata = JestAllure2Reporter.query.test(test);
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(rawMetadata);
    const globalMetadataProxy = this._globalMetadataProxy;

    for (const loadedFile of globalMetadataProxy.get('loadedFiles', [])) {
      await FileNavigatorCache.instance.scanSourcemap(loadedFile);
    }

    const allureWriter = this._writer;

    fallbacks.onTestFileResult(test, testFileMetadata);
    await postProcessMetadata(this._globalContext, rawMetadata);

    // ---

    const config = this._config;
    const squasher = new MetadataSquasher();

    const testFileContext: PropertyExtractorContext<TestFileExtractorContext, void> = {
      ...this._globalContext,

      filePath: path.relative(this._globalConfig.rootDir, testResult.testFilePath).split(path.sep),
      result: {},
      testFile: testResult,
      testFileMetadata: squasher.testFile(JestAllure2Reporter.query.testResult(testResult)),
      testRunMetadata: globalMetadataProxy.get(),
      value: undefined,
    };

    const allureFileTest = await resolvePromisedTestCase(testFileContext, config.testFile);
    if (allureFileTest) {
      await writeTest({
        resultsDir: config.resultsDir,
        containerName: `${testResult.testFilePath}`,
        writer: allureWriter,
        test: allureFileTest,
      });
    }

    for (const testCaseResult of testResult.testResults) {
      const allInvocations =
        JestAllure2Reporter.query.testCaseResult(testCaseResult).invocations ?? [];

      for (const testInvocationMetadata of allInvocations) {
        const testCaseMetadata = squasher.testInvocation(testInvocationMetadata);

        const testCaseContext: PropertyExtractorContext<TestCaseExtractorContext, void> = {
          ...testFileContext,
          testCase: testCaseResult,
          testCaseMetadata,
        };

        const allureTest = await resolvePromisedTestCase(testCaseContext, config.testCase);
        if (!allureTest) {
          continue;
        }

        const invocationIndex = allInvocations.indexOf(testInvocationMetadata);

        await writeTest({
          resultsDir: config.resultsDir,
          containerName: `${testCaseResult.fullName} (${invocationIndex})`,
          writer: allureWriter,
          test: allureTest,
        });
      }
    }
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    aggregatedResult: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, aggregatedResult);

    const execute = this.#onRunComplete.bind(this, aggregatedResult);
    const attempt = this.#attempt.bind(this, 'onRunComplete()', execute);
    await log.trace.complete(__TID(), 'onRunComplete', attempt);
    await log.trace.end(__TID());
  }

  async #onRunComplete(aggregatedResult: AggregatedResult) {
    const globalMetadataProxy = this._globalMetadataProxy;
    globalMetadataProxy.set('stop', Date.now());

    const allureWriter = this._writer;
    const config = this._config;
    const globalContext = this._globalContext;
    const testRunContext: PropertyExtractorContext<TestRunExtractorContext, void> = {
      ...globalContext,
      aggregatedResult,
      result: {},
      testRunMetadata: globalMetadataProxy.get(),
      value: undefined,
    };

    const allureRunTest = await resolvePromisedTestCase(testRunContext, config.testRun);
    if (allureRunTest) {
      await writeTest({
        resultsDir: config.resultsDir,
        containerName: `Test Run (${process.pid})`,
        writer: allureWriter,
        test: allureRunTest,
      });
    }

    await allureWriter.cleanup?.();
  }
}
