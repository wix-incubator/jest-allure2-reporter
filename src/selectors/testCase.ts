import path from 'path';

import { Status } from 'allure-js-commons';
import { isEmpty } from 'lodash';
import stripAnsi from 'strip-ansi';
// eslint-disable-next-line node/no-unpublished-import
import type { TestCaseResult } from '@jest/reporters';

import type { JestAllure2ReporterOptions } from '../JestAllure2ReporterOptions';
import md5 from '../utils/md5';

import type {
  MetadataService,
  QueryService,
  ProjectService,
  ThreadService,
  TimeService,
} from './fallbacks';

type Services = {
  reporterOptions: Partial<JestAllure2ReporterOptions>;
  meta: MetadataService;
  project: ProjectService;
  query: QueryService;
  thread: ThreadService;
  time: TimeService;
};

export class TestCaseSelectors {
  public readonly labels = {
    suite: (testCaseResult: TestCaseResult): string => {
      const test = this._services.query.getTest(testCaseResult);
      return this._services.project.relative(test.path);
    },

    subsuite: (testCaseResult: TestCaseResult): string => {
      return testCaseResult.ancestorTitles.join(' » ');
    },

    package: (): string | undefined => {
      return this._services.project.packageName;
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

  public description() {
    return 'Code preview is not available';
  }

  public relativePath(testCaseResult: TestCaseResult) {
    const testFilePath = this._services.query.getTest(testCaseResult).path;
    return this._services.project.relative(testFilePath);
  }

  public historyId(testCaseResult: TestCaseResult) {
    return md5([
      ...this.relativePath(testCaseResult).split(path.sep),
      ...testCaseResult.ancestorTitles,
      testCaseResult.title,
    ]);
  }

  public status(testCaseResult: TestCaseResult) {
    switch (testCaseResult.status) {
      case 'passed':
        return Status.PASSED;
      case 'failed':
        if (this._services.reporterOptions.errorsAsFailedAssertions) {
          return Status.FAILED;
        } else {
          const hasUnhandledErrors = testCaseResult.failureDetails.some((item) => isEmpty(item));
          return hasUnhandledErrors ? Status.BROKEN : Status.FAILED;
        }
      case 'pending':
      case 'todo':
      case 'skipped':
      case 'disabled':
        return Status.SKIPPED;
    }
  }

  public statusDetails(testCaseResult: TestCaseResult) {
    if (testCaseResult.status !== 'failed') {
      return;
    }

    const [message] = testCaseResult.failureMessages[0].split('\n', 1);
    const trace = testCaseResult.failureMessages.join('\n\n');

    return {
      message: stripAnsi(message),
      trace: stripAnsi(trace),
    };
  }
}
