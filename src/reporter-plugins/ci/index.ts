/// <reference path="../augs.d.ts" />

import type {
  ExecutorInfo,
  Plugin,
  PluginConstructor,
} from 'jest-allure2-reporter';

import { GitHubInfoProvider } from './GitHubInfoProvider';
import { BuildkiteInfoProvider } from './BuildkiteInfoProvider';
import { LocalInfoProvider } from './LocalInfoProvider';
import type { ExecutorInfoProvider } from './ExecutorInfoProvider';

export const ciPlugin: PluginConstructor = () => {
  const environment = process.env as Record<string, string>;
  const providers: ExecutorInfoProvider[] = [
    new BuildkiteInfoProvider(environment),
    new GitHubInfoProvider(environment),
  ];

  const isEnabled = (provider: ExecutorInfoProvider) => provider.enabled;

  async function getExecutorInfo(
    includeLocal: boolean,
  ): Promise<ExecutorInfo | undefined> {
    const local: ExecutorInfoProvider = new LocalInfoProvider(includeLocal);
    return [...providers, local].find(isEnabled)?.getExecutorInfo();
  }

  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/ci',
    async helpers($) {
      Object.assign($, { getExecutorInfo });
    },
  };

  return plugin;
};
