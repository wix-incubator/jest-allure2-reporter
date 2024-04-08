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
import * as sourceCode from '../source-code';
import { stringifyValues } from '../utils';

import * as fallbacks from './fallbacks';
import { overwriteDirectory } from './overwriteDirectory';
import { postProcessMetadata } from './postProcessMetadata';
import { writeTest } from './allureCommons';
import { resolvePromisedItem, resolvePromisedTestCase } from './resolveTestItem';

export class JestAllure2Reporter extends JestMetadataReporter {
  private _globalContext: GlobalExtractorContext | null = null;
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

    const testRunMetadata = new AllureMetadataProxy<AllureTestRunMetadata>(state);
    testRunMetadata.set('config', {
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

    const config = this._config;

    const globalContext = {
      $: {} as Helpers,
      globalConfig: this._globalConfig,
      config,
      value: undefined,
    };

    globalContext.$ = await resolvePromisedItem(globalContext, config.helpers, '$');
    if (config.sourceCode?.enabled) {
      config.sourceCode.plugins.push(
        await sourceCode.typescript(globalContext),
        await sourceCode.javascript(globalContext),
      );
    }

    this._globalContext = globalContext;

    if (config.overwrite) {
      await overwriteDirectory(config.resultsDir);
    }

    const environment = await config.environment(globalContext);
    if (environment) {
      this._allure.writeEnvironmentInfo(stringifyValues(environment));
    }

    const executor = await config.executor(globalContext);
    if (executor) {
      this._allure.writeExecutorInfo(executor);
    }

    const categories = await config.categories(globalContext);
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

    fallbacks.onTestCaseResult(testCaseMetadata);
  }

  async onTestFileResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult) {
    await super.onTestFileResult(test, testResult, aggregatedResult);

    const rawMetadata = JestAllure2Reporter.query.test(test);
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(rawMetadata);

    fallbacks.onTestFileResult(test, testFileMetadata);
    await postProcessMetadata(this._globalContext!.$, rawMetadata);
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    aggregatedResult: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, aggregatedResult);

    const config = this._config;

    const testRunMetadata = JestAllure2Reporter.query.globalMetadata();
    const globalMetadataProxy = new AllureMetadataProxy<AllureTestRunMetadata>(testRunMetadata);

    const globalContext = this._globalContext!;
    const testRunContext: PropertyExtractorContext<TestRunExtractorContext, void> = {
      ...globalContext,
      aggregatedResult,
      testRunMetadata: globalMetadataProxy.get(),
      result: {},
      value: undefined,
    };

    const squasher = new MetadataSquasher();

    const allureRunTest = await resolvePromisedTestCase(
      testRunContext,
      config.testRun,
      config.testRunSteps,
    );
    if (allureRunTest) {
      writeTest({
        containerName: `Test Run (${process.pid})`,
        runtime: this._allure,
        test: allureRunTest,
      });
    }

    for (const testResult of aggregatedResult.testResults) {
      const testFileContext: PropertyExtractorContext<TestFileExtractorContext, void> = {
        ...testRunContext,
        filePath: path
          .relative(testRunContext.globalConfig.rootDir, testResult.testFilePath)
          .split(path.sep),
        testFile: testResult,
        testFileMetadata: squasher.testFile(JestAllure2Reporter.query.testResult(testResult)),
      };

      const allureFileTest = await resolvePromisedTestCase(
        testFileContext,
        config.testFile,
        config.testFileSteps,
      );
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

          const allureTest = await resolvePromisedTestCase(
            testCaseContext,
            config.testCase,
            config.testCaseSteps,
          );
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
  }
}
