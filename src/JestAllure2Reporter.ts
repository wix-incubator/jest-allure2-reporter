import {
  AggregatedResult,
  Config,
  Reporter,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestContext,
  TestResult,
  // eslint-disable-next-line node/no-unpublished-import
} from '@jest/reporters';
import { AllureGroup, AllureRuntime, LabelName, Stage, Status } from 'allure-js-commons';
import path from 'path';
import stripAnsi from 'strip-ansi';
import crypto from 'crypto';
import last from 'lodash/last';
import isEqual from 'lodash/isEqual';

import { MetadataExtractor } from './metadata';
import type { JestAllure2ReporterOptions } from './JestAllure2ReporterOptions';

export default class JestAllure2Reporter implements Reporter {
  private readonly _options: Required<JestAllure2ReporterOptions>;
  private readonly _rootDir: string;
  private readonly _runtime: AllureRuntime;
  private readonly _metadata: MetadataExtractor;

  constructor(globalConfig: Config.GlobalConfig, options: Partial<JestAllure2ReporterOptions>) {
    this._metadata = new MetadataExtractor();
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
    _aggregatedResult: AggregatedResult,
    _options: ReporterOnStartOptions,
  ): Promise<void> | void {
    this._runtime.writeEnvironmentInfo({});
    this._runtime.writeCategoriesDefinitions([]);

    return undefined;
  }

  onTestFileStart(test: Test) {
    this._metadata.loadTest(test);
  }

  onTestCaseResult(_test: Test, _testCaseResult: TestCaseResult) {
    // TODO: move most of onTestFileResult here
  }

  onTestFileResult(
    _test: Test,
    result: TestResult,
    _aggregatedResults: AggregatedResult,
  ): Promise<void> | void {
    this._metadata.loadTestResult(result);

    const relativeTestPath = path.relative(this._rootDir, result.testFilePath);
    const testFileGroup = this._runtime.startGroup(relativeTestPath);

    if (result.testResults.length === 0 && result.testExecError) {
      const test = testFileGroup.startTest(
        '(generic failure)',
        this._metadata.chronograph.getStartTime(result),
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
      test.endTest(this._metadata.chronograph.getEndTime(result));
    } else {
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

        const test = subSuiteGroup.startTest(
          testResult.title,
          this._metadata.chronograph.getStartTime(testResult),
        );
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

        test.addLabel(LabelName.THREAD, `${this._metadata.thread.getThreadId(result)}`);
        test.endTest(this._metadata.chronograph.getEndTime(testResult));
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
