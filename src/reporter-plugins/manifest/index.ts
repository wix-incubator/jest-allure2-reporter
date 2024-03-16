/// <reference path="../augs.d.ts" />

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';
import importFrom from 'import-from';

import { ManifestResolver } from './manifest';

export type { ManifestExtractorCallback, ManifestHelper } from './manifest';

export const manifestPlugin: PluginConstructor = (_1, { globalConfig }) => {
  const cwd = globalConfig.rootDir;
  const resolver = new ManifestResolver(
    cwd,
    (modulePath) => importFrom(cwd, modulePath) as Record<string, any>,
  );

  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/manifest',
    async helpers($) {
      $.manifest = resolver.extract;
    },
  };

  return plugin;
};
