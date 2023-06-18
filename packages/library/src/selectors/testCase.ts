import path from 'node:path';

import { Status } from 'allure-js-commons';
import stripAnsi from 'strip-ansi';
import type { TestCaseResult } from '@jest/reporters';

import type { JestAllure2ReporterOptions } from '../JestAllure2ReporterOptions';
import isEmptyObject from '../utils/isEmptyObject';
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

    testClass: (testCaseResult: TestCaseResult): string => {
      const test = this._services.query.getTest(testCaseResult);
      return this._services.project.relative(test.path);
    },

    testMethod: (testCaseResult: TestCaseResult): string => {
      return testCaseResult.fullName;
    },

    thread: (testCaseResult: TestCaseResult): string => {
      const workerId = this._services.meta.getWorkerId(testCaseResult);
      if (workerId == null) {
        const test = this._services.query.getTest(testCaseResult);
        return `${1 + this._services.thread.getThreadId(test)}`;
      } else {
        return workerId;
      }
    },
  };

  constructor(private readonly _services: Services) {}

  public name(testCaseResult: TestCaseResult) {
    return testCaseResult.title;
  }

  public start(testCaseResult: TestCaseResult) {
    return this._services.time.getCaseStartTime(testCaseResult);
  }

  public end(testCaseResult: TestCaseResult) {
    return this._services.time.getCaseEndTime(testCaseResult);
  }

  public fullName(testCaseResult: TestCaseResult) {
    return testCaseResult.fullName;
  }

  public description(testCaseResult: TestCaseResult) {
    const metadata = this._services.meta.getCode(testCaseResult);

    const toCodeBlock = (code: string) => '```javascript\n' + code + '\n```';
    const h2 = (text: string) => `## ${text}\n`;
    const codeBlocks = [
      ...metadata.beforeHooks.map((hook) =>
        [h2('beforeEach'), toCodeBlock(hook.code)].join('\n'),
      ),
      [h2('test'), toCodeBlock(metadata.testFn.code)].join('\n'),
      ...metadata.afterHooks.map((hook) =>
        [h2('afterEach'), toCodeBlock(hook.code)].join('\n'),
      ),
    ];

    return codeBlocks.join('\n\n');
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
      case 'passed': {
        return Status.PASSED;
      }
      case 'failed': {
        if (this._services.reporterOptions.errorsAsFailedAssertions) {
          return Status.FAILED;
        } else {
          const hasUnhandledErrors =
            // eslint-disable-next-line unicorn/no-array-callback-reference
            testCaseResult.failureDetails.some(isEmptyObject);
          return hasUnhandledErrors ? Status.BROKEN : Status.FAILED;
        }
      }
      // case 'pending':
      // case 'todo':
      // case 'skipped':
      // case 'disabled':
      default: {
        return Status.SKIPPED;
      }
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
