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
import { state } from 'jest-metadata';
import JestMetadataReporter from 'jest-metadata/reporter';
import type { Category } from '@noomorph/allure-js-commons';
import { AllureRuntime } from '@noomorph/allure-js-commons';
import type {
  AllureGlobalMetadata,
  AllureTestCaseMetadata,
  AllureTestFileMetadata,
  Helpers,
  ReporterConfig,
  ReporterOptions,
  TestCaseExtractorContext,
  TestFileExtractorContext,
  TestRunExtractorContext,
} from 'jest-allure2-reporter';

import { resolveOptions } from '../options';
import { AllureMetadataProxy, MetadataSquasher } from '../metadata';

import * as fallbacks from './fallbacks';
import { overwriteDirectory } from './overwriteDirectory';
import { postProcessMetadata } from './postProcessMetadata';
import { writeTest } from './allureCommons';

export class JestAllure2Reporter extends JestMetadataReporter {
  private readonly _$: Partial<Helpers> = {};
  private readonly _allure: AllureRuntime;
  private readonly _config: ReporterConfig;
  private readonly _globalConfig: Config.GlobalConfig;

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig);

    this._globalConfig = globalConfig;
    this._config = resolveOptions(options);
    this._allure = new AllureRuntime({
      resultsDir: this._config.resultsDir,
    });

    const globalMetadata = new AllureMetadataProxy<AllureGlobalMetadata>(state);
    globalMetadata.set('config', {
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

    if (this._config.overwrite) {
      await overwriteDirectory(this._config.resultsDir);
    }
  }

  async onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    const rawMetadata = JestAllure2Reporter.query.test(test);
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(
      rawMetadata,
    );

    fallbacks.onTestFileStart(test, testFileMetadata);
  }

  async onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);

    const testCaseMetadata = new AllureMetadataProxy<AllureTestCaseMetadata>(
      JestAllure2Reporter.query.testCaseResult(testCaseResult).lastInvocation!,
    );

    fallbacks.onTestCaseResult(testCaseMetadata);
  }

  async onTestFileResult(
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ) {
    await super.onTestFileResult(test, testResult, aggregatedResult);

    const rawMetadata = JestAllure2Reporter.query.test(test);
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(
      rawMetadata,
    );

    fallbacks.onTestFileResult(test, testFileMetadata);
    await postProcessMetadata(this._$ as Helpers, rawMetadata);
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    aggregatedResult: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, aggregatedResult);

    const config = this._config;

    const globalContext: TestRunExtractorContext = {
      $: this._$ as Helpers,
      aggregatedResult,
      config,
      globalConfig: this._globalConfig,
      get value() {
        return void 0;
      },
    };

    const environment = await config.environment(globalContext);
    if (environment) {
      this._allure.writeEnvironmentInfo(environment);
    }

    const executor = await config.executor(globalContext);
    if (executor) {
      this._allure.writeExecutorInfo(executor);
    }

    const categories = await config.categories(globalContext);
    if (categories) {
      this._allure.writeCategoriesDefinitions(categories as Category[]);
    }

    const squasher = new MetadataSquasher();

    const allureRunTest = await config.testRun(globalContext);
    if (allureRunTest) {
      writeTest({
        containerName: `Test Run (${process.pid})`,
        runtime: this._allure,
        test: allureRunTest,
      });
    }

    for (const testResult of aggregatedResult.testResults) {
      const testFileContext: TestFileExtractorContext = {
        ...globalContext,
        filePath: path
          .relative(globalContext.globalConfig.rootDir, testResult.testFilePath)
          .split(path.sep),
        testFile: testResult,
        testFileMetadata: squasher.testFile(
          JestAllure2Reporter.query.testResult(testResult),
        ),
      };

      const allureFileTest = await config.testFile(testFileContext);
      if (allureFileTest) {
        writeTest({
          containerName: `${testResult.testFilePath}`,
          runtime: this._allure,
          test: allureFileTest,
        });
      }

      for (const testCaseResult of testResult.testResults) {
        const allInvocations =
          JestAllure2Reporter.query.testCaseResult(testCaseResult)
            .invocations ?? [];

        for (const testInvocationMetadata of allInvocations) {
          const testCaseMetadata = squasher.testInvocation(
            testInvocationMetadata,
          );

          const testCaseContext: TestCaseExtractorContext = {
            ...testFileContext,
            testCase: testCaseResult,
            testCaseMetadata,
          };

          const allureTest = await config.testCase(testCaseContext);
          if (!allureTest) {
            continue;
          }

          const invocationIndex = allInvocations.indexOf(
            testInvocationMetadata,
          );

          writeTest({
            containerName: `${testCaseResult.fullName} (${invocationIndex})`,
            runtime: this._allure,
            test: allureTest,
          });
        }
      }
    }
  }
}
