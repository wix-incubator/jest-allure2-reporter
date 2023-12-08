import fs from 'node:fs/promises';
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
import rimraf from 'rimraf';
import { AllureRuntime } from '@noomorph/allure-js-commons';
import type {
  AllureTestStepMetadata,
  GlobalExtractorContext,
  Plugin,
  PluginHookName,
  ReporterConfig,
  ReporterOptions,
  ResolvedTestStepCustomizer,
  TestCaseExtractorContext,
  TestStepExtractorContext,
  TestFileExtractorContext,
} from 'jest-allure2-reporter';
import type {
  Attachment,
  Category,
  ExecutableItemWrapper,
  Label,
  Link,
  Parameter,
  Stage,
  Status,
  StatusDetails,
} from '@noomorph/allure-js-commons';

import { resolveOptions } from '../options';
import { MetadataSquasher, StepExtractor } from '../metadata';
import { SHARED_CONFIG, START, STOP, WORKER_ID } from '../constants';
import type { SharedReporterConfig } from '../runtime';
import { ThreadService } from '../utils/ThreadService';
import md5 from '../utils/md5';

export class JestAllure2Reporter extends JestMetadataReporter {
  private _plugins: readonly Plugin[] = [];
  private _processMarkdown?: (markdown: string) => Promise<string>;
  private readonly _allure: AllureRuntime;
  private readonly _config: ReporterConfig;
  private readonly _globalConfig: Config.GlobalConfig;
  private readonly _threadService = new ThreadService();

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig);

    this._globalConfig = globalConfig;
    const pluginContext = { globalConfig };
    this._config = resolveOptions(pluginContext, options);
    this._allure = new AllureRuntime({
      resultsDir: this._config.resultsDir,
    });

    state.set(SHARED_CONFIG, {
      resultsDir: this._config.resultsDir,
      overwrite: this._config.overwrite,
      attachments: this._config.attachments,
      injectGlobals: this._config.injectGlobals,
    } as SharedReporterConfig);
  }

  async onRunStart(
    results: AggregatedResult,
    options: ReporterOnStartOptions,
  ): Promise<void> {
    this._plugins = await this._config.plugins;

    await super.onRunStart(results, options);

    if (this._config.overwrite) {
      await rimraf(this._config.resultsDir);
      await fs.mkdir(this._config.resultsDir, { recursive: true });
    }
  }

  onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    const testFileMetadata = JestAllure2Reporter.query.test(test);
    const threadId = this._threadService.allocateThread(test.path);
    testFileMetadata.set(WORKER_ID, String(1 + threadId));
    testFileMetadata.set(START, Date.now());
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    const now = Date.now();
    super.onTestCaseResult(test, testCaseResult);
    const metadata =
      JestAllure2Reporter.query.testCaseResult(testCaseResult).lastInvocation!;
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

    const testFileMetadata = JestAllure2Reporter.query.test(test);
    testFileMetadata.set(STOP, Date.now());

    return super.onTestFileResult(test, testResult, aggregatedResult);
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    results: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, results);

    const config = this._config;

    const globalContext: GlobalExtractorContext<any> = {
      globalConfig: this._globalConfig,
      config,
      value: undefined,
    };

    await this._callPlugins('globalContext', globalContext);

    const environment = config.environment(globalContext);
    if (environment) {
      this._allure.writeEnvironmentInfo(environment);
    }

    const executor = config.executor(globalContext);
    if (executor) {
      this._allure.writeExecutorInfo(executor);
    }

    const categories = config.categories(globalContext);
    if (categories) {
      this._allure.writeCategoriesDefinitions(categories as Category[]);
    }

    const squasher = new MetadataSquasher();
    const stepper = new StepExtractor();

    for (const testResult of results.testResults) {
      const beforeTestFileContext: Omit<
        TestFileExtractorContext,
        'testFileMetadata'
      > = {
        ...globalContext,
        filePath: path
          .relative(globalContext.globalConfig.rootDir, testResult.testFilePath)
          .split(path.sep),
        testFile: testResult,
      };

      await this._callPlugins('beforeTestFileContext', beforeTestFileContext);

      const testFileContext: TestFileExtractorContext<any> = {
        ...beforeTestFileContext,
        testFileMetadata: squasher.testFile(
          JestAllure2Reporter.query.testResult(testResult),
        ),
      };

      await this._callPlugins('testFileContext', testFileContext);
      this._processMarkdown = testFileContext.processMarkdown;

      if (!config.testFile.ignored(testFileContext)) {
        await this._createTest({
          containerName: `${testResult.testFilePath}`,
          test: {
            name: config.testFile.name(testFileContext),
            start: config.testFile.start(testFileContext),
            stop: config.testFile.stop(testFileContext),
            historyId: config.testFile.historyId(testFileContext),
            fullName: config.testFile.fullName(testFileContext),
            description: config.testFile.description(testFileContext),
            descriptionHtml: config.testFile.descriptionHtml(testFileContext),
            status: config.testFile.status(testFileContext) as string as Status,
            statusDetails: config.testFile.statusDetails(testFileContext),
            stage: config.testFile.stage(testFileContext) as string as Stage,
            links: config.testFile.links(testFileContext),
            labels: config.testFile.labels(testFileContext),
            parameters: config.testFile.parameters(testFileContext),
            attachments: config.testFile.attachments(testFileContext),
          },
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
          const testCaseContext: TestCaseExtractorContext<any> = {
            ...testFileContext,
            testCase: testCaseResult,
            testCaseMetadata,
          };

          await this._callPlugins('testCaseContext', testCaseContext);

          const invocationIndex = allInvocations.indexOf(
            testInvocationMetadata,
          );

          await this._createTest({
            containerName: `${testCaseResult.fullName} (${invocationIndex})`,
            test: {
              name: config.testCase.name(testCaseContext),
              start: config.testCase.start(testCaseContext),
              stop: config.testCase.stop(testCaseContext),
              historyId: config.testCase.historyId(testCaseContext),
              fullName: config.testCase.fullName(testCaseContext),
              description: config.testCase.description(testCaseContext),
              descriptionHtml: config.testCase.descriptionHtml(testCaseContext),
              status: config.testCase.status(
                testCaseContext,
              ) as string as Status,
              statusDetails: config.testCase.statusDetails(testCaseContext),
              stage: config.testCase.stage(testCaseContext) as string as Stage,
              links: config.testCase.links(testCaseContext),
              labels: config.testCase.labels(testCaseContext),
              parameters: config.testCase.parameters(testCaseContext),
              attachments: config.testCase.attachments(testCaseContext),
            },
            testCaseContext,
            beforeAll: testInvocationMetadata.beforeAll.map((m) =>
              stepper.extractFromInvocation(m),
            ),
            beforeEach: testInvocationMetadata.beforeEach.map((m) =>
              stepper.extractFromInvocation(m),
            ),
            testFn:
              testInvocationMetadata.fn &&
              stepper.extractFromInvocation(testInvocationMetadata.fn),
            afterEach: testInvocationMetadata.afterEach.map((m) =>
              stepper.extractFromInvocation(m),
            ),
            afterAll: testInvocationMetadata.afterAll.map((m) =>
              stepper.extractFromInvocation(m),
            ),
          });
        }
      }
    }
  }

  private async _createTest({
    test,
    testCaseContext,
    containerName,
    beforeAll = [],
    beforeEach = [],
    testFn,
    afterEach = [],
    afterAll = [],
  }: AllurePayload) {
    const allure = this._allure;
    const allureGroup = allure.startGroup(containerName);
    const allureTest = allureGroup.startTest(test.name, test.start);
    if (test.historyId) {
      allureTest.historyId = md5(test.historyId);
    }
    if (test.fullName) {
      allureTest.fullName = test.fullName;
    }

    if (!test.descriptionHtml && test.description && this._processMarkdown) {
      const newHTML = await this._processMarkdown(test.description);
      allureTest.descriptionHtml = newHTML;
    } else {
      allureTest.description = test.description;
      allureTest.descriptionHtml = test.descriptionHtml;
    }

    if (test.status) {
      allureTest.status = test.status;
    }

    if (test.statusDetails) {
      allureTest.statusDetails = test.statusDetails;
    }

    if (test.stage) {
      allureTest.stage = test.stage;
    }

    if (test.links) {
      for (const link of test.links) {
        allureTest.addLink(link.url, link.name, link.type);
      }
    }

    if (test.labels) {
      for (const label of test.labels) {
        allureTest.addLabel(label.name, label.value);
      }
    }

    allureTest.wrappedItem.parameters = test.parameters ?? [];
    allureTest.wrappedItem.attachments = (test.attachments ?? []).map(
      this._relativizeAttachment,
    );

    if (testCaseContext) {
      const befores = [...beforeAll, ...beforeEach].filter(
        Boolean,
      ) as AllureTestStepMetadata[];
      for (const testStepMetadata of befores) {
        await this._createStep(
          testCaseContext,
          allureGroup.addBefore(),
          testStepMetadata,
        );
      }

      if (testFn) {
        await this._createStep(testCaseContext, allureTest, testFn, true);
      }

      const afters = [...afterEach, ...afterAll].filter(
        Boolean,
      ) as AllureTestStepMetadata[];
      for (const testStepMetadata of afters) {
        await this._createStep(
          testCaseContext,
          allureGroup.addAfter(),
          testStepMetadata,
        );
      }
    }

    allureTest.endTest(test.stop);
    allureGroup.endGroup();
  }

  private async _createStep(
    testCaseContext: TestCaseExtractorContext<any>,
    executable: ExecutableItemWrapper,
    testStepMetadata: AllureTestStepMetadata,
    isTest = false,
  ) {
    const config = this._config;
    const customize: ResolvedTestStepCustomizer = config.testStep;
    const testStepContext = {
      ...testCaseContext,
      testStepMetadata,
    } as TestStepExtractorContext<any>;

    await this._callPlugins('testStepContext', testStepContext);

    if (!isTest) {
      executable.name = customize.name(testStepContext) ?? executable.name;
      executable.wrappedItem.start = customize.start(testStepContext);
      executable.wrappedItem.stop = customize.stop(testStepContext);
      executable.stage =
        (customize.stage(testStepContext) as string as Stage) ??
        executable.stage;
      executable.status =
        (customize.status(testStepContext) as string as Status) ??
        executable.status;
      executable.statusDetails = customize.statusDetails(testStepContext) ?? {};

      executable.wrappedItem.attachments = customize
        .attachments(testStepContext)!
        .map(this._relativizeAttachment);
      executable.wrappedItem.parameters =
        customize.parameters(testStepContext)!;
    }

    if (testStepMetadata.steps) {
      for (const innerStep of testStepMetadata.steps) {
        await this._createStep(
          testCaseContext,
          executable.startStep('', 0),
          innerStep,
          false,
        );
      }
    }
  }

  async _callPlugins(method: PluginHookName, context: any) {
    await Promise.all(
      this._plugins.map((p) => {
        return p[method]?.(context);
      }),
    );
  }

  _relativizeAttachment = (attachment: Attachment) => {
    return {
      ...attachment,
      source: path.relative(this._config.resultsDir, attachment.source),
    };
  };
}

type AllurePayload = {
  containerName: string;
  test: AllurePayloadTest;
  testCaseContext?: TestCaseExtractorContext<unknown>;
  testFn?: AllureTestStepMetadata | null;
  beforeAll?: (AllureTestStepMetadata | null)[];
  beforeEach?: (AllureTestStepMetadata | null)[];
  afterEach?: (AllureTestStepMetadata | null)[];
  afterAll?: (AllureTestStepMetadata | null)[];
};

type AllurePayloadStep = Partial<{
  name: string;
  start: number;
  stop: number;
  status: Status;
  statusDetails: StatusDetails;
  stage: Stage;
  steps: AllurePayloadStep[];
  attachments: Attachment[];
  parameters: Parameter[];
}>;

type AllurePayloadTest = Partial<{
  historyId: string;
  fullName: string;
  description: string;
  descriptionHtml: string;
  labels: Label[];
  links: Link[];
}> &
  AllurePayloadStep;
