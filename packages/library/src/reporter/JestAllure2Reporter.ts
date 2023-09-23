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
  ReporterConfig,
  ReporterOptions,
  ResolvedTestStepCustomizer,
  TestCaseExtractorContext,
} from '../options/ReporterOptions';
import { resolveOptions } from '../options';
import type { AllureTestStepMetadata } from '../metadata';
import { MetadataSquasher, StepExtractor } from '../metadata';
import { STOP, WORKER_ID } from '../constants';

export class JestAllure2Reporter extends JestMetadataReporter {
  private readonly _globalConfig: Config.GlobalConfig;
  private readonly _options: ReporterOptions;
  private _config?: ReporterConfig;

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig, options);

    this._globalConfig = globalConfig;
    this._options = resolveOptions(options);
  }

  onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    // TODO: use Thread service fallback
    query.test(test).set(WORKER_ID, '1');
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    const now = Date.now();
    super.onTestCaseResult(test, testCaseResult);
    const metadata = query.testCaseResult(testCaseResult).lastInvocation!;
    const stop = metadata.get(STOP, Number.NaN);
    if (Number.isNaN(stop)) {
      metadata.set(STOP, now);
    }
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    results: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, results);

    const config = (this._config = resolveOptions(this._options));
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

    const squasher = new MetadataSquasher(true);
    const stepper = new StepExtractor(true);

    for (const testResult of results.testResults) {
      for (const testCaseResult of testResult.testResults) {
        const allInvocations = query.testCaseResult(testCaseResult).invocations;

        for (const testInvocationMetadata of allInvocations) {
          const testCaseMetadata = squasher.testInvocation(
            testInvocationMetadata,
          );
          const testCaseContext: TestCaseExtractorContext<any> = {
            ...globalContext,
            testFile: testResult,
            testCase: testCaseResult,
            testCaseMetadata,
          };

          const invocationIndex = allInvocations.indexOf(
            testInvocationMetadata,
          );
          const allureContainerName = `${testCaseResult.fullName} (${invocationIndex})`;
          const allureGroup = allure.startGroup(allureContainerName);
          const allureTest = allureGroup.startTest(
            config.testCase.name(testCaseContext),
            config.testCase.start(testCaseContext),
          );
          allureTest.fullName = config.testCase.fullName(testCaseContext)!;
          allureTest.description = config.testCase.description(testCaseContext);
          allureTest.descriptionHtml =
            config.testCase.descriptionHtml(testCaseContext);

          allureTest.status = config.testCase.status(testCaseContext)!;
          allureTest.statusDetails =
            config.testCase.statusDetails(testCaseContext)!;
          allureTest.stage = config.testCase.stage(testCaseContext)!;

          for (const link of config.testCase.links(testCaseContext) ?? []) {
            allureTest.addLink(link.url, link.name, link.type);
          }

          for (const label of config.testCase.labels(testCaseContext) ?? []) {
            allureTest.addLabel(label.name, label.value);
          }

          allureTest.wrappedItem.parameters =
            config.testCase.parameters(testCaseContext)!;
          allureTest.wrappedItem.attachments =
            config.testCase.attachments(testCaseContext)!;

          const batches = [
            [() => allureGroup.addBefore(), testInvocationMetadata.beforeAll],
            [() => allureGroup.addBefore(), testInvocationMetadata.beforeEach],
            [
              () => allureTest.startStep('', 0),
              testInvocationMetadata.fn ? [testInvocationMetadata.fn] : [],
            ],
            [() => allureGroup.addAfter(), testInvocationMetadata.afterEach],
            [() => allureGroup.addAfter(), testInvocationMetadata.afterAll],
          ] as const;

          for (const [createExecutable, invocationMetadatas] of batches) {
            for (const invocationMetadata of invocationMetadatas) {
              this._createStep(
                testCaseContext,
                createExecutable(),
                stepper.extractFromInvocation(invocationMetadata),
              );
            }
          }

          allureTest.endTest(config.testCase.stop(testCaseContext));
          allureGroup.endGroup();
        }
      }
    }
  }

  _createStep(
    testCaseContext: TestCaseExtractorContext<any>,
    executable: ExecutableItemWrapper,
    testStep: AllureTestStepMetadata,
  ) {
    const customize: ResolvedTestStepCustomizer = this._config!.testStep;
    const testStepContext = {
      ...testCaseContext,
      testStep,
    };

    executable.name = customize.name(testStepContext) ?? executable.name;
    executable.wrappedItem.start = customize.start(testStepContext);
    executable.wrappedItem.stop = customize.stop(testStepContext);
    executable.stage = customize.stage(testStepContext) ?? executable.stage;
    executable.status = customize.status(testStepContext) ?? executable.status;
    executable.statusDetails =
      customize.statusDetails(testStepContext) ?? executable.statusDetails;

    executable.wrappedItem.attachments =
      customize.attachments(testStepContext)!;
    executable.wrappedItem.parameters = customize.parameters(testStepContext)!;

    if (testStep.steps) {
      for (const innerStep of testStep.steps) {
        this._createStep(
          testCaseContext,
          executable.startStep('', 0),
          innerStep,
        );
      }
    }
  }

  getLastError(): void {
    // TODO: investigate what this method is for
  }
}
