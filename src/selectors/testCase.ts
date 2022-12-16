import path from 'path';

import { Status } from 'allure-js-commons';
// eslint-disable-next-line node/no-unpublished-import
import type { TestCaseResult } from '@jest/reporters';

import type { MetadataService, QueryService, ThreadService, TimeService } from './fallbacks';
import md5 from '../utils/md5';

type Services = {
  config: {
    rootDir: string;
  };
  meta: MetadataService;
  query: QueryService;
  thread: ThreadService;
  time: TimeService;
};

export class TestCaseSelectors {
  public readonly labels = {
    suite: (testCaseResult: TestCaseResult): string => {
      const test = this._services.query.getTest(testCaseResult);
      return path.relative(this._services.config.rootDir, test.path);
    },

    subsuite: (testCaseResult: TestCaseResult): string => {
      return testCaseResult.ancestorTitles.join(' » ');
    },

    package: (_testCaseResult: TestCaseResult): string => {
      return 'TODO';
    },

    thread: (testCaseResult: TestCaseResult): string => {
      const metadata = this._services.meta.get(testCaseResult);
      if (!metadata) {
        const test = this._services.query.getTest(testCaseResult);
        return `${1 + this._services.thread.getThreadId(test)}`;
      }

      return metadata.testFile.workerId;
    },
  };

  constructor(private readonly _services: Services) {}

  public name(testCaseResult: TestCaseResult) {
    return testCaseResult.title;
  }

  public start(testCaseResult: TestCaseResult) {
    const metadata = this._services.meta.get(testCaseResult);
    return metadata ? metadata.startedAt : this._services.time.getCaseStartTime(testCaseResult);
  }

  public end(testCaseResult: TestCaseResult) {
    const metadata = this._services.meta.get(testCaseResult);

    return metadata && testCaseResult.duration != undefined
      ? metadata.startedAt + testCaseResult.duration
      : this._services.time.getCaseEndTime(testCaseResult);
  }

  public fullName(testCaseResult: TestCaseResult) {
    return testCaseResult.fullName;
  }

  public relativePath(testCaseResult: TestCaseResult) {
    const testFilePath = this._services.query.getTest(testCaseResult).path;
    return path.relative(this._services.config.rootDir, testFilePath);
  }

  public historyId(testCaseResult: TestCaseResult) {
    return md5([
      ...this.relativePath(testCaseResult).split(path.sep),
      ...testCaseResult.ancestorTitles,
      testCaseResult.title,
    ]);
  }

  public status(testCaseResult: TestCaseResult) {
    debugger; // investigate what is the difference between FAILED and BROKEN
    return testCaseResult.status === 'failed'
      ? Status.FAILED
      : false /* TODO */
      ? Status.BROKEN
      : testCaseResult.status === 'passed'
      ? Status.PASSED
      : Status.SKIPPED;
  }

  public statusDetails(testCaseResult: TestCaseResult) {
    if (this.status(testCaseResult) !== Status.FAILED) {
      return;
    }

    return {
      message: testCaseResult.failureMessages[0].split('\n', 1)[0],
      trace: testCaseResult.failureMessages.join('\n\n'),
    };
  }
}
