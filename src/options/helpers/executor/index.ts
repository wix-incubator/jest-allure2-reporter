import type { ExecutorInfo, KeyedHelperCustomizer } from 'jest-allure2-reporter';

import {
  BuildkiteInfoProvider,
  type ExecutorInfoProvider,
  GitHubInfoProvider,
  LocalInfoProvider,
} from './providers';

const isEnabled = (provider: ExecutorInfoProvider) => provider.enabled;

async function getExecutorInfoImpl(): Promise<ExecutorInfo | undefined>;
async function getExecutorInfoImpl(includeLocal: true): Promise<ExecutorInfo>;
async function getExecutorInfoImpl(includeLocal = false) {
  const environment = process.env as Record<string, string>;

  const providers: ExecutorInfoProvider[] = [
    new BuildkiteInfoProvider(environment),
    new GitHubInfoProvider(environment),
    new LocalInfoProvider(includeLocal),
  ];

  return providers.find(isEnabled)?.getExecutorInfo();
}

export const getExecutorInfo: KeyedHelperCustomizer<'getExecutorInfo'> = () => getExecutorInfoImpl;
