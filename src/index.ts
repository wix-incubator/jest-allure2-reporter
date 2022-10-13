import crypto from 'crypto';
import path from 'path';

import type {
  AggregatedResult,
  Config,
  Reporter,
  ReporterOnStartOptions,
  Test,
  TestContext,
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';
import { AllureGroup, AllureRuntime, LabelName, Stage, Status } from 'allure-js-commons';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import stripAnsi from 'strip-ansi';

import ParallelTimeline from './utils/ParallelTimeline';

export type JestAllure2ReporterOptions = {
  /**
   * @default <rootDir>/allure-results
   */
  resultsDir: string;
  /**
   * @default import('package.json').name
   */
  packageName: string;
};

export default class JestAllure2Reporter implements Reporter {
  private readonly _options: Required<JestAllure2ReporterOptions>;
  private readonly _rootDir: string;
  private readonly _runtime: AllureRuntime;
  private readonly _timeline: ParallelTimeline;
  private _startTime: number;

  constructor(globalConfig: Config.GlobalConfig, options: Partial<JestAllure2ReporterOptions>) {
    this._startTime = Number.NaN;
    this._timeline = new ParallelTimeline();
    this._rootDir = globalConfig.rootDir;
    this._options = {
      resultsDir: 'allure-results',
      packageName: 'TODO packageName',
      ...options,
    };

    if (path.isAbsolute(this._options.resultsDir)) {
      this._options.resultsDir = path.relative(this._rootDir, this._options.resultsDir);
    }

    this._runtime = new AllureRuntime({
      resultsDir: path.join(globalConfig.rootDir, this._options.resultsDir),
    });
  }

  getLastError(): Error | void {
    return undefined;
  }

  onRunStart(
    aggregatedResult: AggregatedResult,
    _options: ReporterOnStartOptions,
  ): Promise<void> | void {
    this._startTime = aggregatedResult.startTime;
    this._runtime.writeEnvironmentInfo({});
    this._runtime.writeCategoriesDefinitions([]);

    return undefined;
  }

  onTestResult(
    _test: Test,
    result: TestResult,
    _aggregatedResults: AggregatedResult,
  ): Promise<void> | void {
    const relativeTestPath = path.relative(this._rootDir, result.testFilePath);
    const testFileGroup = this._runtime.startGroup(relativeTestPath);

    if (result.testResults.length === 0 && result.testExecError) {
      const test = testFileGroup.startTest(
        '(generic failure)',
        result.perfStats.start || this._startTime,
      );
      test.fullName = relativeTestPath;
      test.stage = Stage.FINISHED;
      test.status = Status.BROKEN;
      test.statusDetails = {
        message:
          result.testExecError.message || result.testExecError.stack || `${result.testExecError}`,
        trace: result.failureMessage ? stripAnsi(result.failureMessage) : undefined,
      };
      test.description = `### Test\n\n\`\`\`typescript\n// TODO: insert test file contents\n\`\`\`\n`;
      test.historyId = crypto.createHash('md5').update(`${relativeTestPath}.`).digest('hex');
      test.addLabel(LabelName.TAG, 'unhandled-error');
      // test.addLabel(LabelName.PARENT_SUITE, relativeTestDirectory);
      test.addLabel(LabelName.PACKAGE, this._options.packageName);
      test.addLabel(LabelName.SUITE, relativeTestPath);
      test.addLabel(LabelName.THREAD, '1');
      test.endTest(result.perfStats.end || this._startTime);
    } else {
      const threadId = `${
        1 + this._timeline.allocate(result.perfStats.start, result.perfStats.end)
      }`;

      const padding =
        (result.perfStats.end -
          result.perfStats.start -
          result.testResults.reduce((sum, t) => sum + (t.duration ?? 0), 0)) /
        (result.testResults.length + 1);

      let timeStart = result.perfStats.start;
      const rootSuiteGroup = testFileGroup.startGroup('ROOT_DESCRIBE_BLOCK');

      let subSuiteGroup: AllureGroup = rootSuiteGroup;
      let ancestorTitles: string[] = [];

      const lastTestResult = last(result.testResults);

      for (const testResult of result.testResults) {
        if (!isEqual(ancestorTitles, testResult.ancestorTitles)) {
          if (subSuiteGroup !== rootSuiteGroup) {
            subSuiteGroup.endGroup();
          }

          ancestorTitles = testResult.ancestorTitles;
          subSuiteGroup =
            testResult.ancestorTitles.length > 0
              ? rootSuiteGroup.startGroup(testResult.ancestorTitles.join(' > '))
              : rootSuiteGroup;
        }

        const test = subSuiteGroup.startTest(testResult.title, (timeStart += padding));
        test.fullName = testResult.fullName;
        test.stage = Stage.FINISHED;
        test.status =
          testResult.status === 'failed'
            ? Status.FAILED
            : testResult === lastTestResult && result.testExecError
            ? Status.BROKEN
            : testResult.status === 'passed'
            ? Status.PASSED
            : Status.SKIPPED;

        if (test.status === Status.FAILED) {
          test.statusDetails = {
            message: testResult.failureMessages[0].split('\n', 1)[0],
            trace: testResult.failureMessages.join('\n\n'),
          };
        }

        if (test.status === Status.BROKEN && result.testExecError) {
          test.statusDetails = {
            message:
              result.testExecError.message ||
              result.testExecError.stack ||
              `${result.testExecError}`,
            trace: result.failureMessage ? stripAnsi(result.failureMessage) : undefined,
          };
        }

        test.historyId = crypto
          .createHash('md5')
          .update(
            [
              ...relativeTestPath.split(path.sep),
              ...testResult.ancestorTitles,
              testResult.title,
            ].join('.'),
          )
          .digest('hex');

        // test.addLabel(LabelName.PARENT_SUITE, relativeTestDirectory);
        test.addLabel(LabelName.PACKAGE, this._options.packageName);
        test.addLabel(LabelName.SUITE, relativeTestPath);
        if (testResult.ancestorTitles.length > 0) {
          test.addLabel(LabelName.SUB_SUITE, testResult.ancestorTitles.join(' » '));
        }

        test.addLabel(LabelName.THREAD, threadId);
        test.endTest((timeStart += testResult.duration ?? 0));
      }

      if (subSuiteGroup !== rootSuiteGroup) {
        subSuiteGroup.endGroup();
      }

      rootSuiteGroup.endGroup();
    }

    testFileGroup.endGroup();
  }

  onRunComplete(_testContexts: Set<TestContext>, _results: AggregatedResult): Promise<void> | void {
    return undefined;
  }
}
