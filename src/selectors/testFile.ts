import fs from 'fs';
import path from 'path';

import stripAnsi from 'strip-ansi';
// eslint-disable-next-line node/no-unpublished-import
import type { TestResult } from '@jest/reporters';

import md5 from '../utils/md5';

import type { ProjectService, TimeService } from './fallbacks';

type Services = {
  project: ProjectService;
  time: TimeService;
};

export class TestFileSelectors {
  public readonly labels = {
    suite: (testResult: TestResult): string => {
      return this._services.project.relative(testResult.testFilePath);
    },

    package: (): string | undefined => {
      return this._services.project.packageName;
    },
  };

  constructor(private readonly _services: Services) {}

  public start(testResult: TestResult) {
    return testResult.perfStats.end ?? this._services.time.getFileStartTime(testResult);
  }

  public end(testResult: TestResult) {
    return testResult.perfStats.end ?? this._services.time.getFileEndTime(testResult);
  }

  public description(testResult: TestResult) {
    const fileContents = fs.readFileSync(testResult.testFilePath, 'utf8');
    return '```typescript\n' + fileContents + '\n```';
  }

  public fullName(testResult: TestResult) {
    return this._services.project.relative(testResult.testFilePath);
  }

  public historyId(testResult: TestResult) {
    const relativePath = this._services.project.relative(testResult.testFilePath);
    return md5([...relativePath.split(path.sep), '']);
  }

  public statusDetails(testResult: TestResult) {
    if (!testResult.testExecError) {
      return;
    }

    return {
      message:
        testResult.testExecError.message ||
        testResult.testExecError.stack ||
        `${testResult.testExecError}`,
      trace: testResult.failureMessage ? stripAnsi(testResult.failureMessage) : undefined,
    };
  }
}
