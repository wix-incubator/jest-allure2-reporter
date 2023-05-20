import type { TestCaseResult, TestResult } from '@jest/reporters';
import type { AllureGroup } from 'allure-js-commons';
import { LabelName, Stage, Status } from 'allure-js-commons';

import shallowEqualArrays from '../utils/shallowEqualArrays';

import type { TestFileContextConfig } from './TestFileContextConfig';

export class TestFileContext {
  private _testFileGroup!: AllureGroup;
  private _rootSuiteGroup!: AllureGroup;
  private _subsuiteGroup!: AllureGroup;
  private _ancestorTitles: string[] = [];

  constructor(private readonly _config: TestFileContextConfig) {
    this._testFileGroup = this._config.testFileGroup;
    this._rootSuiteGroup = this._testFileGroup.startGroup(
      'ROOT_DESCRIBE_BLOCK',
    );
    this._subsuiteGroup = this._rootSuiteGroup;
    this._ancestorTitles = [];
  }

  handleTestCaseResult(testCaseResult: TestCaseResult) {
    if (
      !shallowEqualArrays(this._ancestorTitles, testCaseResult.ancestorTitles)
    ) {
      this._changeSubsuiteGroup(testCaseResult);
    }

    const { select } = this._config;
    const allureTest = this._subsuiteGroup.startTest(
      select.testCase.name(testCaseResult),
      select.testCase.start(testCaseResult),
    );
    allureTest.fullName = select.testCase.fullName(testCaseResult);
    allureTest.description = select.testCase.description();
    allureTest.stage = Stage.FINISHED;
    allureTest.status = select.testCase.status(testCaseResult);

    const statusDetails = select.testCase.statusDetails(testCaseResult);
    if (statusDetails) {
      allureTest.statusDetails = statusDetails;
    }

    allureTest.historyId = select.testCase.historyId(testCaseResult);

    const labelsToAdd: [string, string | undefined][] = [
      [LabelName.PACKAGE, select.testCase.labels.package()],
      [LabelName.SUITE, select.testCase.labels.suite(testCaseResult)],
      [LabelName.SUB_SUITE, select.testCase.labels.subsuite(testCaseResult)],
      [LabelName.THREAD, select.testCase.labels.thread(testCaseResult)],
    ];

    for (const [labelName, labelValue] of labelsToAdd) {
      if (labelValue) {
        allureTest.addLabel(labelName, labelValue);
      }
    }

    allureTest.endTest(select.testCase.end(testCaseResult));
  }

  handleTestFileResult(result: TestResult) {
    if (result.testResults.length === 0 && result.testExecError) {
      this._handleEarlyError(result);
    } else {
      this._handleSkippedTests(result);
    }

    if (this._subsuiteGroup !== this._rootSuiteGroup) {
      this._subsuiteGroup.endGroup();
    }

    this._rootSuiteGroup.endGroup();
    this._testFileGroup.endGroup();
  }

  _changeSubsuiteGroup(testCaseResult: TestCaseResult) {
    const rootSuiteGroup = this._rootSuiteGroup;
    if (this._subsuiteGroup !== rootSuiteGroup) {
      this._subsuiteGroup.endGroup();
    }

    this._ancestorTitles = testCaseResult.ancestorTitles;
    this._subsuiteGroup =
      testCaseResult.ancestorTitles.length > 0
        ? rootSuiteGroup.startGroup(testCaseResult.ancestorTitles.join(' > '))
        : rootSuiteGroup;
  }

  _handleEarlyError(result: TestResult) {
    const { select } = this._config;
    const allureTest = this._subsuiteGroup.startTest(
      '(generic failure)',
      select.testFile.start(result),
    );
    allureTest.fullName = select.testFile.fullName(result);
    allureTest.stage = Stage.FINISHED;
    allureTest.status = Status.BROKEN;
    const statusDetails = select.testFile.statusDetails(result);
    if (statusDetails) {
      allureTest.statusDetails = statusDetails;
    }
    allureTest.description = select.testFile.description(result);
    allureTest.historyId = select.testFile.historyId(result);
    allureTest.addLabel(LabelName.TAG, 'unhandled-error');
    const packageName = select.testFile.labels.package();
    if (packageName) {
      allureTest.addLabel(LabelName.PACKAGE, packageName);
    }
    allureTest.addLabel(LabelName.SUITE, select.testFile.labels.suite(result));
    allureTest.addLabel(LabelName.THREAD, '1');
    allureTest.endTest(select.testFile.end(result));
  }

  _handleSkippedTests(result: TestResult) {
    for (const testResult of result.testResults) {
      if (testResult.status !== 'passed' && testResult.status !== 'failed') {
        this.handleTestCaseResult(testResult);
      }
    }
  }
}
