import os from 'node:os';

import type { ExecutorInfo } from 'jest-allure2-reporter';

import { type ExecutorInfoProvider, getOSDetails } from '../common';

export class LocalInfoProvider implements ExecutorInfoProvider {
  constructor(public readonly enabled: boolean) {}

  async getExecutorInfo(): Promise<ExecutorInfo> {
    return {
      name: `${os.hostname()} (${getOSDetails()})`,
      type: `${os.platform()}-${os.arch()}`,
    };
  }
}
