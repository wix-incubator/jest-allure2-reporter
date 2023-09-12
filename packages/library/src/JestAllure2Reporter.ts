import path from 'node:path';

import type {
  AggregatedResult,
  Config,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
} from '@jest/reporters';
import { JestMetadataReporter, query } from 'jest-metadata/reporter';
import rimraf from 'rimraf';
import {
  AllureRuntime,
  LabelName,
  Stage,
  Status,
} from '@noomorph/allure-js-commons';

import type {
  AllureTestCaseMetadata,
  AllureTestStepMetadata,
  GlobalExtractorContext,
  ReporterOptions,
} from './options/ReporterOptions';
import { resolveOptions } from './options';

const ns = (key?: string) => (key ? ['allure2', key] : ['allure2']);

export class JestAllure2Reporter extends JestMetadataReporter {
  private readonly _allure: AllureRuntime;
  private readonly _options: ReporterOptions;
  private readonly _globalContext: GlobalExtractorContext<any>;

  constructor(
    globalConfig: Config.GlobalConfig,
    options: Partial<ReporterOptions>,
  ) {
    super(globalConfig, options);

    this._options = resolveOptions(options);
    if (this._options.overwrite) {
      rimraf.sync(this._options.resultsDir);
    }

    this._allure = new AllureRuntime({
      resultsDir: this._options.resultsDir,
    });

    this._globalContext = {
      cwd: process.cwd(),
      package: require(path.join(process.cwd(), 'package.json')),
      value: undefined,
    };
  }

  async onRunStart(
    aggregatedResult: AggregatedResult,
    options: ReporterOnStartOptions,
  ): Promise<void> {
    await super.onRunStart(aggregatedResult, options);

    const environment = this._options.environment(this._globalContext);
    if (environment) {
      this._allure.writeEnvironmentInfo(environment);
    }

    const executor = this._options.executor(this._globalContext);
    if (executor) {
      this._allure.writeExecutorInfo(executor);
    }

    this._allure.writeCategoriesDefinitions([
      {
        name: 'Flaky tests',
        matchedStatuses: [Status.BROKEN],
      },
    ]);
  }

  onTestFileStart(test: Test) {
    super.onTestFileStart(test);

    query.test(test)!.assign(ns(), {
      start: Date.now(),
      threadId: '1',
    });
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);

    const testEntry = query.testCaseResult(testCaseResult)!;
    const lastInvocation = testEntry.lastInvocation;
    if (lastInvocation) {
      const userTestMetadata = {
        ...(testEntry.get(ns()) as AllureTestCaseMetadata),
        ...(lastInvocation.get(ns()) as AllureTestCaseMetadata),
      } as AllureTestStepMetadata;

      const group = this._allure.startGroup(testCaseResult.fullName);

      const aTest = group.startTest(
        testCaseResult.title,
        userTestMetadata.start!,
      );
      aTest.fullName = testCaseResult.fullName;

      const allInvocations = [
        [() => group.addBefore(), lastInvocation.beforeAll],
        [() => group.addBefore(), lastInvocation.before],
        [
          () => aTest.startStep('test'),
          lastInvocation.fn ? [lastInvocation.fn] : [],
        ],
        [() => group.addAfter(), lastInvocation.after],
        [() => group.addAfter(), lastInvocation.afterAll],
      ] as const;

      for (const [createGroup, invocations] of allInvocations) {
        for (const invocation of invocations) {
          const definition = invocation.definition.get(
            ns(),
          )! as AllureTestStepMetadata;
          const executable = invocation.get(ns())! as AllureTestStepMetadata;
          const userMetadata: AllureTestStepMetadata = {
            ...userTestMetadata,
            ...definition,
            ...executable,
          };

          const step = createGroup();
          step.stage = userMetadata.stage ?? Stage.SCHEDULED;
          step.status = userMetadata.status ?? step.status;
          if (userMetadata.start != null) {
            step.wrappedItem.start = userMetadata.start;
          }
          if (userMetadata.stop != null) {
            step.wrappedItem.stop = userMetadata.stop;
          }
          if (userMetadata.statusDetails != null) {
            step.statusDetails = userMetadata.statusDetails;
          }
          if (userMetadata.name != null) {
            step.name = userMetadata.name;
          }
        }
      }

      let code = '';
      const attachCodeAs = (type: string, content: unknown) => {
        if (content) {
          code += `${type}(${content})\n`;
        }
      };
      for (const block of lastInvocation.beforeAll) {
        attachCodeAs('beforeAll', block.definition.get(ns('code')));
      }
      for (const block of lastInvocation.before) {
        attachCodeAs('beforeEach', block.definition.get(ns('code')));
      }
      attachCodeAs('test', lastInvocation.entry.get(ns('code')));
      for (const block of lastInvocation.after) {
        attachCodeAs('afterEach', block.definition.get(ns('code')));
      }
      for (const block of lastInvocation.afterAll) {
        attachCodeAs('afterAll', block.definition.get(ns('code')));
      }

      aTest.descriptionHtml =
        '<details><summary>Test code</summary><pre><code language="JavaScript">\n' +
        code +
        '\n</code></pre></details>';
      aTest.status = Status.BROKEN;
      aTest.statusDetails = {
        message: testCaseResult.failureMessages.join('\n'),
      };
      aTest.addLabel(LabelName.SEVERITY, 'critical');
      aTest.addLabel(LabelName.TAG, 'e2e');
      aTest.addLabel(LabelName.TAG, 'detox');
      aTest.addLabel(LabelName.EPIC, 'Epic 1');
      aTest.addLabel(LabelName.EPIC, 'Epic 2');
      aTest.addLabel(LabelName.FEATURE, 'Feature 1');
      aTest.addLabel(LabelName.FEATURE, 'Feature 2');
      aTest.addLabel(LabelName.STORY, testCaseResult.fullName);
      aTest.addLabel(LabelName.OWNER, 'John Doe <john.doe@example.com>');
      aTest.addLabel(LabelName.PACKAGE, 'jest-metadata');
      aTest.addLabel(LabelName.TAG, 'flaky');
      aTest.addLabel(LabelName.SUITE, 'Suite');
      aTest.addLabel(LabelName.PARENT_SUITE, 'Parent suite');
      aTest.addLabel(LabelName.SUB_SUITE, 'Sub-suite');
      aTest.addLabel(
        LabelName.TEST_METHOD,
        test.path + ':' + testCaseResult.fullName,
      );
      aTest.addTmsLink('https://tms.example.com/E2E-10100', 'E2E-10100');
      aTest.addIssueLink('https://jira-company.de/FEAT-10001', 'FEAT-10001');
      aTest.addLink('https://github.com/com/proj', 'FEAT-10001', 'github');
      aTest.endTest(userTestMetadata.stop!);
      group.endGroup();
    }
  }

  getLastError(): void {
    // TODO: investigate what this method is for
  }
}
