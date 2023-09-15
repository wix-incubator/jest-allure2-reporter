import type {
  AggregatedResult,
  Config,
  Test,
  TestCaseResult,
} from '@jest/reporters';
import { JestMetadataReporter, query } from 'jest-metadata/reporter';
import rimraf from 'rimraf';
import type { ExecutableItemWrapper } from '@noomorph/allure-js-commons';
import { AllureRuntime } from '@noomorph/allure-js-commons';
import type { TestContext } from '@jest/reporters';

import type {
  GlobalExtractorContext,
  ReporterOptions,
  TestCaseExtractorContext,
  TestStepCustomizer,
  TestStepExtractorContext,
} from '../options/ReporterOptions';
import { resolveOptions } from '../options';
import type { AllureTestCaseMetadata } from '../runtime';

const ns = (key?: keyof AllureTestCaseMetadata) =>
  key ? ['allure2', key] : ['allure2'];

function flattenTestCaseMetadata(
  _testCaseResult: TestCaseResult,
): AllureTestCaseMetadata {
  return {} as any; // TODO: implement
}

function doBeforeMagic(
  _testCaseResult: TestCaseResult,
): TestStepExtractorContext<any>[] {
  return []; // TODO: implement
}

const doFunctionMagic = doBeforeMagic;
const doAfterMagic = doBeforeMagic;

export class JestAllure2Reporter extends JestMetadataReporter {
  private readonly _globalConfig: Config.GlobalConfig;
  private readonly _options: ReporterOptions;

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig, options);

    this._globalConfig = globalConfig;
    this._options = resolveOptions(options);
  }

  onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    // TODO: use Thread service fallback
    query.test(test).set(ns('$workerId'), '1');
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    const now = Date.now();
    super.onTestCaseResult(test, testCaseResult);
    const metadata = query.testCaseResult(testCaseResult).lastInvocation!;
    const { start, stop } = metadata.get(ns(), {}) as AllureTestCaseMetadata;

    // Polyfill for non-Circus configurations
    if (!(start && stop) && testCaseResult.duration) {
      metadata.assign(ns(), {
        start: now - testCaseResult.duration,
        stop: now,
      });
    }
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    results: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, results);

    const config = resolveOptions(this._options);
    if (config.overwrite) {
      await rimraf(config.resultsDir);
    }

    const allure = new AllureRuntime({
      resultsDir: config.resultsDir,
    });

    const globalContext: GlobalExtractorContext<any> = {
      globalConfig: this._globalConfig,
      config,
      value: undefined,
    };

    const environment = config.environment(globalContext);
    if (environment) {
      allure.writeEnvironmentInfo(environment);
    }

    const executor = config.executor(globalContext);
    if (executor) {
      allure.writeExecutorInfo(executor);
    }

    const categories = config.categories(globalContext);
    if (categories) {
      allure.writeCategoriesDefinitions(categories);
    }

    for (const testResult of results.testResults) {
      for (const testCaseResult of testResult.testResults) {
        const testCaseContext: TestCaseExtractorContext<any> = {
          ...globalContext,
          testFile: testResult,
          testCase: testCaseResult,
          testCaseMetadata: flattenTestCaseMetadata(testCaseResult),
        };

        const customize: Required<TestStepCustomizer> = config.testCase.steps;
        const foo = (
          testStepContext: TestStepExtractorContext<any>,
          allureStep: ExecutableItemWrapper,
        ) => {
          allureStep.name = customize.name(testStepContext) ?? allureStep.name;
          allureStep.wrappedItem.start = testStepContext.testStep.start;
          allureStep.wrappedItem.stop = testStepContext.testStep.stop;
          allureStep.stage =
            customize.stage(testStepContext) ?? allureStep.stage;
          allureStep.status =
            customize.status(testStepContext) ?? allureStep.status;
          allureStep.statusDetails =
            customize.statusDetails(testStepContext) ??
            allureStep.statusDetails;

          const parameters = customize.parameters(testStepContext) ?? [];
          for (const { name, value, ...options } of parameters) {
            allureStep.addParameter(name, value, options);
          }

          const attachments = customize.attachments(testStepContext) ?? [];
          for (const { name, source, type } of attachments) {
            allureStep.addAttachment(name, type, source);
          }
        };

        const allureGroup = allure.startGroup(testCaseResult.fullName);
        const allureTest = allureGroup.startTest(
          config.testCase.name(testCaseContext),
          testCaseContext.testCaseMetadata.start,
        );
        allureTest.description = config.testCase.description(testCaseContext);
        allureTest.descriptionHtml =
          config.testCase.descriptionHtml(testCaseContext);

        for (const link of config.testCase.links(testCaseContext) ?? []) {
          allureTest.addLink(link.url, link.name, link.type);
        }

        for (const label of config.testCase.labels(testCaseContext) ?? []) {
          allureTest.addLabel(label.name, label.value);
        }

        for (const testStepContext of doBeforeMagic(testCaseResult)) {
          foo(testStepContext, allureGroup.addBefore());
        }
        for (const testStepContext of doFunctionMagic(testCaseResult)) {
          foo(testStepContext, allureTest.startStep('', 0));
        }
        for (const testStepContext of doAfterMagic(testCaseResult)) {
          foo(testStepContext, allureGroup.addAfter());
        }

        allureTest.endTest(testCaseContext.testCaseMetadata.stop);
      }
    }
  }

  getLastError(): void {
    // TODO: investigate what this method is for
  }
}
