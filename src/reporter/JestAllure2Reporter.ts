import path from 'node:path';

import type {
  AggregatedResult,
  Config,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestResult,
} from '@jest/reporters';
import { state } from 'jest-metadata';
import { JestMetadataReporter, query } from 'jest-metadata/reporter';
import pkgUp from 'pkg-up';
import rimraf from 'rimraf';
import type { ExecutableItemWrapper } from '@noomorph/allure-js-commons';
import { AllureRuntime } from '@noomorph/allure-js-commons';
import type { TestContext } from '@jest/reporters';

import type {
  GlobalExtractorContext,
  ReporterConfig,
  ReporterOptions,
  ResolvedTestStepCustomizer,
  SharedReporterConfig,
  TestCaseExtractorContext,
} from '../options';
import { resolveOptions } from '../options';
import type { AllureTestStepMetadata } from '../metadata';
import { MetadataSquasher, StepExtractor } from '../metadata';
import { SHARED_CONFIG, STOP, WORKER_ID } from '../constants';
import attempt from '../utils/attempt';
import isError from '../utils/isError';
import { ThreadService } from '../utils/ThreadService';
import md5 from '../utils/md5';

export class JestAllure2Reporter extends JestMetadataReporter {
  private readonly _globalConfig: Config.GlobalConfig;
  private readonly _config: ReporterConfig;
  private readonly _threadService = new ThreadService();

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig);

    this._globalConfig = globalConfig;
    this._config = resolveOptions(options);

    state.set(SHARED_CONFIG, {
      resultsDir: this._config.resultsDir,
      overwrite: this._config.overwrite,
      attachments: this._config.attachments,
    } as SharedReporterConfig);
  }

  async onRunStart(
    results: AggregatedResult,
    options: ReporterOnStartOptions,
  ): Promise<void> {
    await super.onRunStart(results, options);

    if (this._config.overwrite) {
      await rimraf(this._config.resultsDir);
    }
  }

  onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    const testFileMetadata = query.test(test);
    const threadId = this._threadService.allocateThread(test.path);
    testFileMetadata.set(WORKER_ID, String(1 + threadId));
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

  onTestFileResult(
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ) {
    this._threadService.freeThread(test.path);
    return super.onTestFileResult(test, testResult, aggregatedResult);
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    results: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, results);

    const config = this._config;
    const allure = new AllureRuntime({
      resultsDir: config.resultsDir,
    });

    const { rootDir } = this._globalConfig;
    const packageJsonPath = await pkgUp({ cwd: rootDir });
    let manifest: any = packageJsonPath
      ? attempt(() => require(packageJsonPath))
      : null;

    if (isError(manifest)) {
      manifest = null;
    }

    const globalContext: GlobalExtractorContext<any> = {
      globalConfig: this._globalConfig,
      config,
      manifest,
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

    const squasher = new MetadataSquasher();
    const stepper = new StepExtractor();

    for (const testResult of results.testResults) {
      for (const testCaseResult of testResult.testResults) {
        const allInvocations =
          query.testCaseResult(testCaseResult).invocations ?? [];

        for (const testInvocationMetadata of allInvocations) {
          const testCaseMetadata = squasher.testInvocation(
            testInvocationMetadata,
          );
          const testCaseContext: TestCaseExtractorContext<any> = {
            ...globalContext,
            filePath: path
              .relative(
                globalContext.globalConfig.rootDir,
                testResult.testFilePath,
              )
              .split(path.sep),
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
          allureTest.historyId = md5(
            config.testCase.historyId(testCaseContext)!,
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
              () => allureTest,
              testInvocationMetadata.fn ? [testInvocationMetadata.fn] : [],
            ],
            [() => allureGroup.addAfter(), testInvocationMetadata.afterEach],
            [() => allureGroup.addAfter(), testInvocationMetadata.afterAll],
          ] as const;

          for (const [createExecutable, invocationMetadatas] of batches) {
            for (const invocationMetadata of invocationMetadatas) {
              const testStepMetadata =
                stepper.extractFromInvocation(invocationMetadata);
              if (testStepMetadata) {
                const executable = createExecutable();
                this._createStep(
                  testCaseContext,
                  executable,
                  testStepMetadata,
                  executable === allureTest,
                );
              }
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
    isTest: boolean,
  ) {
    const customize: ResolvedTestStepCustomizer = this._config!.testStep;
    const testStepContext = {
      ...testCaseContext,
      testStep,
    };

    if (!isTest) {
      executable.name = customize.name(testStepContext) ?? executable.name;
      executable.wrappedItem.start = customize.start(testStepContext);
      executable.wrappedItem.stop = customize.stop(testStepContext);
      executable.stage = customize.stage(testStepContext) ?? executable.stage;
      executable.status =
        customize.status(testStepContext) ?? executable.status;
      executable.statusDetails =
        customize.statusDetails(testStepContext) ?? executable.statusDetails;

      executable.wrappedItem.attachments =
        customize.attachments(testStepContext)!;
      executable.wrappedItem.parameters =
        customize.parameters(testStepContext)!;
    }

    if (testStep.steps) {
      for (const innerStep of testStep.steps) {
        this._createStep(
          testCaseContext,
          executable.startStep('', 0),
          innerStep,
          false,
        );
      }
    }
  }
}
