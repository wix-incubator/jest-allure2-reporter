import type { ExecutorInfo } from 'jest-allure2-reporter';

import type { ExecutorInfoProvider } from './ExecutorInfoProvider';
import { getOSDetails } from './utils';

export interface BuildkiteEnvironment {
  BUILDKITE?: string;
  BUILDKITE_AGENT_NAME?: string;
  BUILDKITE_BUILD_URL?: string;
  BUILDKITE_BUILD_NUMBER?: string;
}

export class BuildkiteInfoProvider implements ExecutorInfoProvider {
  constructor(private readonly environment: Partial<BuildkiteEnvironment>) {}

  get enabled() {
    return !!this.environment.BUILDKITE;
  }

  async getExecutorInfo(): Promise<ExecutorInfo> {
    const {
      BUILDKITE_AGENT_NAME,
      BUILDKITE_BUILD_URL,
      BUILDKITE_BUILD_NUMBER,
    } = this.environment;
    const agentName = BUILDKITE_AGENT_NAME || 'Buildkite';

    return {
      name: `${agentName} (${getOSDetails()})`,
      type: 'buildkite',
      buildUrl: BUILDKITE_BUILD_URL,
      buildOrder: Number(BUILDKITE_BUILD_NUMBER),
      buildName: `#${BUILDKITE_BUILD_NUMBER}`,
    };
  }
}
