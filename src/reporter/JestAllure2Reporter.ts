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
import type {
  AllureGroup,
  Attachment,
  Category,
  ExecutableItemWrapper,
  Stage,
  Status,
} from '@noomorph/allure-js-commons';
import { AllureRuntime } from '@noomorph/allure-js-commons';
import type {
  AllureGlobalMetadata,
  AllureTestCaseMetadata,
  AllureTestCaseResult,
  AllureTestFileMetadata,
  AllureTestStepMetadata,
  AllureTestStepResult,
  ExtractorHelpers,
  GlobalExtractorContext,
  Plugin,
  PluginHookContexts,
  PluginHookName,
  ReporterConfig,
  ReporterOptions,
  TestCaseExtractorContext,
  TestFileExtractorContext,
  TestStepExtractorContext,
} from 'jest-allure2-reporter';

import { resolveOptions } from '../options';
import { AllureMetadataProxy, MetadataSquasher } from '../metadata';
import { md5 } from '../utils';

import * as fallbackHooks from './fallback';

export class JestAllure2Reporter extends JestMetadataReporter {
  private _plugins: readonly Plugin[] = [];
  private readonly _$: Partial<ExtractorHelpers> = {};
  private readonly _allure: AllureRuntime;
  private readonly _config: ReporterConfig;
  private readonly _globalConfig: Config.GlobalConfig;

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions) {
    super(globalConfig);

    this._globalConfig = globalConfig;
    const pluginContext = { globalConfig };
    this._config = resolveOptions(pluginContext, options);
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
    this._plugins = await this._config.plugins;

    await super.onRunStart(aggregatedResult, options);

    if (this._config.overwrite) {
      await rimraf(this._config.resultsDir);
      await fs.mkdir(this._config.resultsDir, { recursive: true });
    }

    await this._callPlugins('helpers', this._$);
  }

  async onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    const postProcessMetadata = JestAllure2Reporter.query.test(test);
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(
      postProcessMetadata,
    );

    fallbackHooks.onTestFileStart(test, testFileMetadata);
  }

  async onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);

    const testCaseMetadata = new AllureMetadataProxy<AllureTestCaseMetadata>(
      JestAllure2Reporter.query.testCaseResult(testCaseResult).lastInvocation!,
    );

    fallbackHooks.onTestCaseResult(testCaseMetadata);
  }

  async onTestFileResult(
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ) {
    const testFileMetadata = new AllureMetadataProxy<AllureTestFileMetadata>(
      JestAllure2Reporter.query.test(test),
    );

    fallbackHooks.onTestFileResult(test, testFileMetadata);

    return super.onTestFileResult(test, testResult, aggregatedResult);
  }

  async onRunComplete(
    testContexts: Set<TestContext>,
    results: AggregatedResult,
  ): Promise<void> {
    await super.onRunComplete(testContexts, results);

    const config = this._config;

    const globalContext: GlobalExtractorContext = {
      globalConfig: this._globalConfig,
      config,
      value: undefined,
      $: this._$ as ExtractorHelpers,
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

    await this._postProcessMetadata(); // Run before squashing

    const squasher = new MetadataSquasher();

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

      if (!config.testFile.hidden(testFileContext)) {
        // pseudo-test entity, used for reporting file-level errors and other obscure purposes
        const attachments = await config.testFile.attachments(testFileContext);
        const allureFileTest: AllurePayloadTest = {
          name: await config.testFile.name(testFileContext),
          start: await config.testFile.start(testFileContext),
          stop: await config.testFile.stop(testFileContext),
          historyId: await config.testFile.historyId(testFileContext),
          fullName: await config.testFile.fullName(testFileContext),
          description: await config.testFile.description(testFileContext),
          descriptionHtml:
            await config.testFile.descriptionHtml(testFileContext),
          // TODO: merge @noomorph/allure-js-commons into this package and remove casting
          stage: (await config.testFile.stage(
            testFileContext,
          )) as string as Stage,
          status: (await config.testFile.status(
            testFileContext,
          )) as string as Status,
          statusDetails: await config.testFile.statusDetails(testFileContext),
          links: await config.testFile.links(testFileContext),
          labels: await config.testFile.labels(testFileContext),
          parameters: await config.testFile.parameters(testFileContext),
          attachments: attachments?.map(this._relativizeAttachment),
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
              const attachments =
                await config.testStep.attachments(testStepContext);
              const result: AllurePayloadStep = {
                hookType: testStepContext.testStepMetadata.hookType,
                name: await config.testStep.name(testStepContext),
                start: await config.testStep.start(testStepContext),
                stop: await config.testStep.stop(testStepContext),
                stage: (await config.testStep.stage(
                  testStepContext,
                )) as string as Stage,
                status: (await config.testStep.status(
                  testStepContext,
                )) as string as Status,
                statusDetails:
                  await config.testStep.statusDetails(testStepContext),
                parameters: await config.testStep.parameters(testStepContext),
                attachments: attachments?.map(this._relativizeAttachment),
              };

              return result;
            }),
          );

          const attachments =
            await config.testCase.attachments(testCaseContext);
          const allureTest: AllurePayloadTest = {
            name: await config.testCase.name(testCaseContext),
            start: await config.testCase.start(testCaseContext),
            stop: await config.testCase.stop(testCaseContext),
            historyId: await config.testCase.historyId(testCaseContext),
            fullName: await config.testCase.fullName(testCaseContext),
            description: await config.testCase.description(testCaseContext),
            descriptionHtml:
              await config.testCase.descriptionHtml(testCaseContext),
            // TODO: merge @noomorph/allure-js-commons into this package and remove casting
            stage: (await config.testCase.stage(
              testCaseContext,
            )) as string as Stage,
            status: (await config.testCase.status(
              testCaseContext,
            )) as string as Status,
            statusDetails: await config.testCase.statusDetails(testCaseContext),
            links: await config.testCase.links(testCaseContext),
            labels: await config.testCase.labels(testCaseContext),
            parameters: await config.testCase.parameters(testCaseContext),
            attachments: attachments?.map(this._relativizeAttachment),
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
      executable.stage = step.stage as string as Stage;
    }
    if (step.status !== undefined) {
      executable.status = step.status as string as Status;
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
    const batch = state.testFiles.flatMap((testFile) => {
      const allDescribeBlocks = [...testFile.allDescribeBlocks()];
      const allHooks = allDescribeBlocks.flatMap((describeBlock) => [
        ...describeBlock.hookDefinitions(),
      ]);

      return [
        testFile,
        ...allDescribeBlocks,
        ...allHooks,
        ...testFile.allTestEntries(),
      ];
    });

    await Promise.all(
      batch.map(async (metadata) => {
        const allureProxy = new AllureMetadataProxy(metadata);
        await this._callPlugins('postProcessMetadata', {
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
}

type AllurePayload = {
  containerName: string;
  test: AllurePayloadTest;
  steps?: AllurePayloadStep[];
};

interface AllurePayloadStep
  extends Partial<Omit<AllureTestStepResult, 'steps'>> {
  hookType?: 'beforeAll' | 'beforeEach' | 'afterEach' | 'afterAll';
  steps?: AllurePayloadStep[];
}

interface AllurePayloadTest extends Partial<AllureTestCaseResult> {
  steps?: AllurePayloadStep[];
}
