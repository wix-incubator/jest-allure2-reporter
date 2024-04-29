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
import type { Category } from '@noomorph/allure-js-commons';
import { AllureRuntime } from '@noomorph/allure-js-commons';
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
import { compactArray, stringifyValues } from '../utils';

import * as fallbacks from './fallbacks';
import { overwriteDirectory } from './overwriteDirectory';
import { postProcessMetadata } from './postProcessMetadata';
import { writeTest } from './allureCommons';
import { resolvePromisedItem, resolvePromisedTestCase } from './resolveTestItem';

export class JestAllure2Reporter extends JestMetadataReporter {
  private _globalContext: GlobalExtractorContext | null = null;
  private readonly _allure: AllureRuntime;
  private readonly _config: ReporterConfig<void>;
  private readonly _globalConfig: Config.GlobalConfig;
  private readonly _globalMetadataProxy: AllureMetadataProxy<AllureTestRunMetadata>;

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig);

    this._globalConfig = globalConfig;
    this._config = resolveOptions(options);
    this._allure = new AllureRuntime({
      resultsDir: this._config.resultsDir,
    });

    const testRunMetadata = JestAllure2Reporter.query.globalMetadata();
    this._globalMetadataProxy = new AllureMetadataProxy<AllureTestRunMetadata>(testRunMetadata);
    this._globalMetadataProxy.set('config', {
      resultsDir: this._config.resultsDir,
      overwrite: this._config.overwrite,
      attachments: this._config.attachments,
      injectGlobals: this._config.injectGlobals,
    });
  }

  async onRunStart(
    aggregatedResult: AggregatedResult,
    options: ReporterOnStartOptions,
  ): Promise<void> {
    await super.onRunStart(aggregatedResult, options);

    const reporterConfig = this._config;

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

    if (reporterConfig.overwrite) {
      await overwriteDirectory(reporterConfig.resultsDir);
    }

    const environment = await reporterConfig.environment(globalContext);
    if (environment) {
      this._allure.writeEnvironmentInfo(stringifyValues(environment));
    }

    const executor = await reporterConfig.executor(globalContext);
    if (executor) {
      this._allure.writeExecutorInfo(executor);
    }

    const categories = await reporterConfig.categories(globalContext);
    if (categories) {
      this._allure.writeCategoriesDefinitions(categories as Category[]);
    }
  }

  async onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    const rawMetadata = JestAllure2Reporter.query.test(test);
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(rawMetadata);

    fallbacks.onTestFileStart(test, testFileMetadata);
  }

  async onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);

    const testCaseMetadata = new AllureMetadataProxy<AllureTestCaseMetadata>(
      JestAllure2Reporter.query.testCaseResult(testCaseResult).lastInvocation!,
    );

    fallbacks.onTestCaseResult(test, testCaseResult, testCaseMetadata);
  }

  async onTestFileResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult) {
    await super.onTestFileResult(test, testResult, aggregatedResult);

    const rawMetadata = JestAllure2Reporter.query.test(test);
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(rawMetadata);

    fallbacks.onTestFileResult(test, testFileMetadata);
    await postProcessMetadata(this._globalContext!, rawMetadata);

    // ---

    const config = this._config;
    const squasher = new MetadataSquasher();

    const testFileContext: PropertyExtractorContext<TestFileExtractorContext, void> = {
      ...this._globalContext!,

      filePath: path.relative(this._globalConfig.rootDir, testResult.testFilePath).split(path.sep),
      result: {},
      testFile: testResult,
      testFileMetadata: squasher.testFile(JestAllure2Reporter.query.testResult(testResult)),
      testRunMetadata: this._globalMetadataProxy.get(),
      value: undefined,
    };

    const allureFileTest = await resolvePromisedTestCase(testFileContext, config.testFile);
    if (allureFileTest) {
      writeTest({
        containerName: `${testResult.testFilePath}`,
        runtime: this._allure,
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

        writeTest({
          containerName: `${testCaseResult.fullName} (${invocationIndex})`,
          runtime: this._allure,
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

    this._globalMetadataProxy.set('stop', Date.now());
    const config = this._config;
    const globalContext = this._globalContext!;
    const testRunContext: PropertyExtractorContext<TestRunExtractorContext, void> = {
      ...globalContext,
      aggregatedResult,
      result: {},
      testRunMetadata: this._globalMetadataProxy.get(),
      value: undefined,
    };

    const allureRunTest = await resolvePromisedTestCase(testRunContext, config.testRun);
    if (allureRunTest) {
      writeTest({
        containerName: `Test Run (${process.pid})`,
        runtime: this._allure,
        test: allureRunTest,
      });
    }
  }
}
