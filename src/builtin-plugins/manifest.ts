/// <reference path="augs.d.ts" />

import fs from 'node:fs';

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';
import pkgUp from 'pkg-up';

export const manifestPlugin: PluginConstructor = (_1, { globalConfig }) => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/manifest',
    async globalContext(context) {
      const manifestPath = await pkgUp({
        cwd: globalConfig.rootDir,
      });

      context.manifest = null;
      if (manifestPath) {
        try {
          context.manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        } catch {
          console.warn(
            `[${plugin.name}] Failed to read package.json from ${manifestPath}`,
          );
        }
      }
    },
  };

  return plugin;
};
