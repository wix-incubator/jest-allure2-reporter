import path from 'node:path';

import type { Test } from '@jest/reporters';

import type { TestRunContextConfig } from './TestRunContextConfig';
import { TestFileContext } from './TestFileContext';

export class TestRunContext {
  private readonly _fileContexts = new Map<string, TestFileContext>();

  constructor(private readonly _config: TestRunContextConfig) {}

  getFileContext(testFilePath: string) {
    return this._fileContexts.get(testFilePath);
  }

  async writeMetadata() {
    const runtime = this._config.allureRuntime;

    runtime.writeEnvironmentInfo(await this._getEnvironmentInfo());
    runtime.writeCategoriesDefinitions([]);
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

  private async _getEnvironmentInfo(): Promise<any> {
    const { getEnvironmentInfo } = this._config;

    if (typeof getEnvironmentInfo === 'boolean') {
      return getEnvironmentInfo ? process.env : {};
    }

    return getEnvironmentInfo();
  }
}
