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
import type { Metadata } from 'jest-metadata';
import { state } from 'jest-metadata';
import { metadataRegistryEvents } from 'jest-metadata/debug';
import JestMetadataReporter from 'jest-metadata/reporter';
import rimraf from 'rimraf';
import type {
  AllureGroup,
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
import { AllureRuntime } from '@noomorph/allure-js-commons';
import type {
  AllureGlobalMetadata,
  AllureTestCaseMetadata,
  AllureTestFileMetadata,
  AllureTestStepMetadata,
  ExtractorHelpers,
  GlobalExtractorContext,
  Plugin,
  PluginHookName,
  PluginHookContexts,
  ReporterConfig,
  ReporterOptions,
  TestCaseExtractorContext,
  TestFileExtractorContext,
  TestStepExtractorContext,
} from 'jest-allure2-reporter';

import { resolveOptions } from '../options';
import { AllureMetadataProxy, MetadataSquasher } from '../metadata';
import { md5 } from '../utils';

export class JestAllure2Reporter extends JestMetadataReporter {
  private _plugins: readonly Plugin[] = [];
  private readonly _$: Partial<ExtractorHelpers> = {};
  private readonly _allure: AllureRuntime;
  private readonly _config: ReporterConfig;
  private readonly _globalConfig: Config.GlobalConfig;
  private readonly _newMetadata: Metadata[] = [];

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig);

    this._globalConfig = globalConfig;
    const pluginContext = { globalConfig };
    this._config = resolveOptions(pluginContext, options);
    this._allure = new AllureRuntime({
      resultsDir: this._config.resultsDir,
    });

    metadataRegistryEvents.on('register_metadata', this._registerMetadata);

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
    this._plugins = await this._config.plugins;

    await super.onRunStart(aggregatedResult, options);

    if (this._config.overwrite) {
      await rimraf(this._config.resultsDir);
      await fs.mkdir(this._config.resultsDir, { recursive: true });
    }

    await this._callPlugins('helpers', this._$);

    await this._callPlugins('onRunStart', {
      aggregatedResult,
      reporterConfig: this._config,
    });
  }

  async onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    const testFileMetadata = JestAllure2Reporter.query.test(test);
    const testFileProxy = new AllureMetadataProxy<AllureTestFileMetadata>(
      testFileMetadata,
    );
    await this._callPlugins('onTestFileStart', {
      reporterConfig: this._config,
      test,
      testFileMetadata: testFileProxy.defaults({}).get(),
    });
  }

  async onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);

    const testFileMetadata = JestAllure2Reporter.query.test(test);
    const testCaseMetadata =
      JestAllure2Reporter.query.testCaseResult(testCaseResult).lastInvocation!;
    const testFileProxy = new AllureMetadataProxy<AllureTestFileMetadata>(
      testFileMetadata,
    );
    const testCaseProxy = new AllureMetadataProxy<AllureTestCaseMetadata>(
      testCaseMetadata,
    );

    await this._callPlugins('onTestCaseResult', {
      reporterConfig: this._config,
      test,
      testCaseResult,
      testCaseMetadata: testCaseProxy.defaults({}).get(),
      testFileMetadata: testFileProxy.defaults({}).get(),
    });
  }

  async onTestFileResult(
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ) {
    const testFileMetadata = JestAllure2Reporter.query.test(test);
    const testFileProxy = new AllureMetadataProxy<AllureTestFileMetadata>(
      testFileMetadata,
    );

    await this._callPlugins('onTestFileResult', {
      reporterConfig: this._config,
      test,
      testResult,
      aggregatedResult,
      testFileMetadata: testFileProxy.defaults({}).get(),
    });

    return super.onTestFileResult(test, testResult, aggregatedResult);
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    results: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, results);

    metadataRegistryEvents.off('register_metadata', this._registerMetadata);

    await this._callPlugins('onRunComplete', {
      reporterConfig: this._config,
      testContexts,
      results,
    });

    const config = this._config;

    const globalContext: GlobalExtractorContext = {
      globalConfig: this._globalConfig,
      config,
      value: undefined,
      $: this._$ as ExtractorHelpers,
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

    await this._postProcessMetadata(); // Run before squashing

    const docblockParser: any = { find: () => void 0 }; // TODO: await initParser();
    const squasher = new MetadataSquasher({
      getDocblockMetadata: (metadata) =>
        metadata && docblockParser.find(metadata),
    });

    for (const testResult of results.testResults) {
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

      await this._callPlugins('testFileContext', testFileContext);

      if (!config.testFile.hidden(testFileContext)) {
        // pseudo-test entity, used for reporting file-level errors and other obscure purposes
        const allureFileTest: AllurePayloadTest = {
          name: config.testFile.name(testFileContext),
          start: config.testFile.start(testFileContext),
          stop: config.testFile.stop(testFileContext),
          historyId: config.testFile.historyId(testFileContext),
          fullName: config.testFile.fullName(testFileContext),
          description: config.testFile.description(testFileContext),
          descriptionHtml: config.testFile.descriptionHtml(testFileContext),
          // TODO: merge @noomorph/allure-js-commons into this package and remove casting
          stage: config.testFile.stage(testFileContext) as string as Stage,
          status: config.testFile.status(testFileContext) as string as Status,
          statusDetails: config.testFile.statusDetails(testFileContext),
          links: config.testFile.links(testFileContext),
          labels: config.testFile.labels(testFileContext),
          parameters: config.testFile.parameters(testFileContext),
          attachments: config.testFile
            .attachments(testFileContext)
            ?.map(this._relativizeAttachment),
        };

        await this._renderHtmlDescription(testFileContext, allureFileTest);
        await this._createTest({
          containerName: `${testResult.testFilePath}`,
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

          await this._callPlugins('testCaseContext', testCaseContext);

          if (config.testCase.hidden(testCaseContext)) {
            continue;
          }

          const testCaseSteps = testCaseMetadata.steps ?? [];
          const visibleTestStepContexts = testCaseSteps
            .map(
              (testStepMetadata) =>
                ({
                  ...testCaseContext,
                  testStepMetadata,
                }) as TestStepExtractorContext,
            )
            .filter((testStepMetadataContext) => {
              return !config.testStep.hidden(testStepMetadataContext);
            });

          if (testCaseMetadata.steps) {
            testCaseMetadata.steps = visibleTestStepContexts.map(
              (c) => c.testStepMetadata,
            );
          }

          let allureSteps: AllurePayloadStep[] = await Promise.all(
            visibleTestStepContexts.map(async (testStepContext) => {
              await this._callPlugins('testStepContext', testStepContext);

              const result: AllurePayloadStep = {
                hookType: testStepContext.testStepMetadata.hookType,
                name: config.testStep.name(testStepContext),
                start: config.testStep.start(testStepContext),
                stop: config.testStep.stop(testStepContext),
                stage: config.testStep.stage(
                  testStepContext,
                ) as string as Stage,
                status: config.testStep.status(
                  testStepContext,
                ) as string as Status,
                statusDetails: config.testStep.statusDetails(testStepContext),
                parameters: config.testStep.parameters(testStepContext),
                attachments: config.testStep
                  .attachments(testStepContext)
                  ?.map(this._relativizeAttachment),
              };

              return result;
            }),
          );

          const allureTest: AllurePayloadTest = {
            name: config.testCase.name(testCaseContext),
            start: config.testCase.start(testCaseContext),
            stop: config.testCase.stop(testCaseContext),
            historyId: config.testCase.historyId(testCaseContext),
            fullName: config.testCase.fullName(testCaseContext),
            description: config.testCase.description(testCaseContext),
            descriptionHtml: config.testCase.descriptionHtml(testCaseContext),
            // TODO: merge @noomorph/allure-js-commons into this package and remove casting
            stage: config.testCase.stage(testCaseContext) as string as Stage,
            status: config.testCase.status(testCaseContext) as string as Status,
            statusDetails: config.testCase.statusDetails(testCaseContext),
            links: config.testCase.links(testCaseContext),
            labels: config.testCase.labels(testCaseContext),
            parameters: config.testCase.parameters(testCaseContext),
            attachments: config.testCase
              .attachments(testCaseContext)
              ?.map(this._relativizeAttachment),
            steps: allureSteps.filter((step) => !step.hookType),
          };

          allureSteps = allureSteps.filter((step) => step.hookType);

          await this._renderHtmlDescription(testCaseContext, allureTest);

          const invocationIndex = allInvocations.indexOf(
            testInvocationMetadata,
          );

          await this._createTest({
            containerName: `${testCaseResult.fullName} (${invocationIndex})`,
            test: allureTest,
            steps: allureSteps,
          });
        }
      }
    }
  }

  private async _createTest({ test, containerName, steps }: AllurePayload) {
    const allure = this._allure;
    const allureGroup = allure.startGroup(containerName);
    const allureTest = allureGroup.startTest();

    this._fillStep(allureTest, test);

    if (test.historyId) {
      allureTest.historyId = md5(test.historyId);
    }
    if (test.fullName) {
      allureTest.fullName = test.fullName;
    }
    if (test.description) {
      allureTest.description = test.description;
    }
    if (test.descriptionHtml) {
      allureTest.descriptionHtml = test.descriptionHtml;
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
    if (steps) {
      for (const step of steps) {
        const executable = this._createStepExecutable(
          allureGroup,
          step.hookType,
        );
        await this._fillStep(executable, step);
      }
    }

    allureTest.endTest(test.stop);
    allureGroup.endGroup();
  }

  private async _renderHtmlDescription(
    context: GlobalExtractorContext,
    test: AllurePayloadTest,
  ) {
    if (test.description) {
      test.descriptionHtml =
        (test.descriptionHtml ? test.descriptionHtml + '\n' : '') +
        (await context.$.markdown2html(test.description));
    }
  }

  private _createStepExecutable(
    parent: AllureGroup,
    hookType: AllureTestStepMetadata['hookType'],
  ) {
    switch (hookType) {
      case 'beforeAll':
      case 'beforeEach': {
        return parent.addBefore();
      }
      case 'afterEach':
      case 'afterAll': {
        return parent.addAfter();
      }
      default: {
        throw new Error(`Cannot create step executable for ${hookType}`);
      }
    }
  }

  private _fillStep(
    executable: ExecutableItemWrapper,
    step: AllurePayloadStep,
  ) {
    if (step.name !== undefined) {
      executable.name = step.name;
    }
    if (step.start !== undefined) {
      executable.wrappedItem.start = step.start;
    }
    if (step.stop !== undefined) {
      executable.wrappedItem.stop = step.stop;
    }
    if (step.stage !== undefined) {
      executable.stage = step.stage;
    }
    if (step.status !== undefined) {
      executable.status = step.status;
    }
    if (step.statusDetails !== undefined) {
      executable.statusDetails = step.statusDetails;
    }
    if (step.attachments !== undefined) {
      executable.wrappedItem.attachments = step.attachments;
    }
    if (step.parameters) {
      executable.wrappedItem.parameters = step.parameters;
    }
    if (step.steps) {
      for (const innerStep of step.steps) {
        this._fillStep(
          executable.startStep(innerStep.name ?? '', innerStep.start),
          innerStep,
        );
      }
    }
  }

  private async _postProcessMetadata() {
    const newBatch = this._newMetadata.splice(0, this._newMetadata.length);

    await Promise.all(
      newBatch.map(async (metadata) => {
        const allureProxy = new AllureMetadataProxy(metadata);
        await this._callPlugins('rawMetadata', {
          $: this._$ as ExtractorHelpers,
          metadata: allureProxy.assign({}).get(),
        });
      }),
    );
  }

  private async _callPlugins<K extends PluginHookName>(
    methodName: K,
    context: PluginHookContexts[K],
  ) {
    await Promise.all(
      this._plugins.map((p) => {
        return p[methodName]?.(context as any);
      }),
    );
  }

  private _relativizeAttachment = (attachment: Attachment) => {
    const source = path.relative(this._config.resultsDir, attachment.source);
    if (source.startsWith('..')) {
      return attachment;
    }

    return {
      ...attachment,
      source,
    };
  };

  private readonly _registerMetadata = (event: { metadata: Metadata }) => {
    this._newMetadata.push(event.metadata);
  };
}

type AllurePayload = {
  containerName: string;
  test: AllurePayloadTest;
  steps?: AllurePayloadStep[];
};

type AllurePayloadStep = Partial<{
  hookType?: 'beforeAll' | 'beforeEach' | 'afterEach' | 'afterAll';

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
  hookType?: never;
  historyId: string;
  fullName: string;
  description: string;
  descriptionHtml: string;
  labels: Label[];
  links: Link[];
}> &
  AllurePayloadStep;
