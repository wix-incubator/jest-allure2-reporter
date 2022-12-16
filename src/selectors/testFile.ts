import path from 'path';

import stripAnsi from 'strip-ansi';
// eslint-disable-next-line node/no-unpublished-import
import type { TestResult } from '@jest/reporters';

import md5 from '../utils/md5';

import type { TimeService } from './fallbacks';

type Services = {
  config: {
    rootDir: string;
  };
  time: TimeService;
};

export class TestFileSelectors {
  public readonly labels = {
    suite: (testResult: TestResult): string => {
      return this.relativePath(testResult);
    },

    package: (_testCaseResult: TestResult): string => {
      return 'TODO';
    },
  };

  constructor(private readonly _services: Services) {}

  public start(testResult: TestResult) {
    return testResult.perfStats.end ?? this._services.time.getFileStartTime(testResult);
  }

  public end(testResult: TestResult) {
    return testResult.perfStats.end ?? this._services.time.getFileEndTime(testResult);
  }

  public description(_testResult: TestResult) {
    return `### Test\n\n\`\`\`typescript\n// TODO: insert test file contents\n\`\`\`\n`;
  }

  public relativePath(testResult: TestResult) {
    return path.relative(this._services.config.rootDir, testResult.testFilePath);
  }

  public fullName(testResult: TestResult) {
    return this.relativePath(testResult);
  }

  public historyId(testResult: TestResult) {
    return md5([...this.relativePath(testResult).split(path.sep), '']);
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
