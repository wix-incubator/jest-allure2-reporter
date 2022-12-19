import path from 'path';

// eslint-disable-next-line node/no-unpublished-import
import type { Test, TestResult } from '@jest/reporters';

import { isTestResult } from '../utils/predicates';

import type { TestRunContextConfig } from './TestRunContextConfig';
import TestFileContext from './TestFileContext';

export default class TestRunContext {
  private readonly _fileContexts = new Map<string, TestFileContext>();

  constructor(private readonly _config: TestRunContextConfig) {}

  getFileContext(test: Test | TestResult) {
    return isTestResult(test)
      ? this._fileContexts.get(test.testFilePath)
      : this._fileContexts.get(test.path);
  }

  async writeMetadata() {
    const runtime = this._config.allureRuntime;

    runtime.writeEnvironmentInfo(await this._getEnvironmentInfo());
    runtime.writeCategoriesDefinitions([]);
  }

  async _getEnvironmentInfo(): Promise<any> {
    const { getEnvironmentInfo } = this._config;

    if (typeof getEnvironmentInfo === 'boolean') {
      return getEnvironmentInfo ? process.env : {};
    }

    return getEnvironmentInfo();
  }

  registerFileContext(test: Test) {
    const testFilePath = path.relative(this._config.rootDir, test.path);

    this._fileContexts.set(
      test.path,
      new TestFileContext({
        ...this._config,

        testFileGroup: this._config.allureRuntime.startGroup(testFilePath),
      }),
    );
  }
}
